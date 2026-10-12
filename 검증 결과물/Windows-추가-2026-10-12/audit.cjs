// Windows에 설치된 Chromium 브라우저를 별도 임시 프로필로 검사한다.
// 실행: node "검증 결과물/Windows-2026-10-12/audit.cjs" edge|chrome
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');
const os = require('node:os');
const assert = require('node:assert/strict');
const verify = process.argv.includes('--verify');
const browser = process.argv[2] || 'edge';
const binary = browser === 'edge' ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' : 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const extended = process.argv.includes('--extended');
const root = process.cwd(), out = path.join(__dirname, extended ? '추가확인' : verify ? '수정후' : '기본');
fs.mkdirSync(out, { recursive: true });
const delay = ms => new Promise(r => setTimeout(r, ms));
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname === '/' ? '/index.html' : new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.woff2': 'font/woff2' };
  fs.readFile(file, (error, data) => { res.writeHead(error ? 404 : 200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(error ? 'Not found' : data); });
});
let child, ws;
(async () => {
  await new Promise(r => server.listen(8765, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'excerpt-audit-'));
  child = spawn(binary, ['--headless=new', '--remote-debugging-port=9229', '--remote-debugging-address=127.0.0.1', '--no-first-run', '--no-default-browser-check', '--user-data-dir=' + profile, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 20; i++) { try { targets = await fetch('http://127.0.0.1:9229/json', { signal: AbortSignal.timeout(1000) }).then(r => r.json()); if (targets.some(t => t.type === 'page')) break; } catch {} await delay(200); }
  if (!targets?.some(t => t.type === 'page')) throw new Error('Browser debugging endpoint unavailable');
  ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r, reject) => { ws.onopen = r; ws.onerror = reject; });
  let seq = 0; const pending = new Map(), errors = [], failedRequests = [];
  ws.onmessage = event => {
    const m = JSON.parse(event.data);
    if (m.id) { const p = pending.get(m.id); if (!p) return; pending.delete(m.id); m.error ? p.reject(m.error) : p.resolve(m.result); }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
    if (m.method === 'Network.loadingFailed') failedRequests.push(m.params);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const r = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
  await call('Runtime.enable'); await call('Network.enable'); await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await call('Page.navigate', { url: 'http://127.0.0.1:8765/' });
  for (let i = 0; i < 60; i++) { await delay(250); if (await evaluate("document.readyState==='complete' && typeof S!=='undefined'")) break; }
  await delay(1500);
  const report = { browser, version: await call('Browser.getVersion'), initial: await evaluate(`({blocks:S.blocks.length,themes:S.themes.length,fonts:FONTS.length,canvas:document.querySelector('#canvas').getBoundingClientRect().toJSON(),secure:isSecureContext,handheld:isHandheld(),freeze:shouldFreezeSoftBreaks(),fontStatus:document.fonts.status})`) };
  report.layout = [];
  for (const width of [800, 900, 1024, 1440]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false }); await delay(400);
    report.layout.push(await evaluate(`({width:innerWidth,bodyScroll:document.body.scrollWidth,viewport:document.documentElement.clientWidth,composer:document.querySelector('#ta').getBoundingClientRect().toJSON(),save:document.querySelector('#btnSave').getBoundingClientRect().toJSON()})`));
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false }); await delay(400);
  // 브라우저의 실제 입력 이벤트로 신규 초안 및 Ctrl+Z 동작을 관찰한다.
  await evaluate(`S.ui.selectedBlockId=null;setStage('composer');document.querySelector('#ta').focus()`);
  await call('Input.insertText', { text: '신규 초안 실행취소 검사' });
  report.undoBefore = await evaluate(`({draft:document.querySelector('#ta').value,blocks:S.blocks.length,canUndo:canUndo()})`);
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'z', code: 'KeyZ', modifiers: 2, windowsVirtualKeyCode: 90 });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'z', code: 'KeyZ', modifiers: 2, windowsVirtualKeyCode: 90 });
  report.undoAfter = await evaluate(`({draft:document.querySelector('#ta').value,blocks:S.blocks.length})`);
  if (verify) {
    assert.equal(report.undoAfter.draft, '', '신규 초안 Ctrl+Z');
    assert.equal(report.undoAfter.blocks, report.undoBefore.blocks, '초안 취소가 문서 블록을 변경하면 안 됨');
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'y', code: 'KeyY', modifiers: 2, windowsVirtualKeyCode: 89 });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'y', code: 'KeyY', modifiers: 2, windowsVirtualKeyCode: 89 });
    report.draftRedo = await evaluate(`document.querySelector('#ta').value`);
    assert.equal(report.draftRedo, report.undoBefore.draft, '신규 초안 Ctrl+Y');
    report.compositionLifecycle = await evaluate(`(async()=>{const ta=document.querySelector('#ta');ta.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));ta.innerHTML='<font size="4">조합 중</font>';ta.dispatchEvent(new InputEvent('input',{bubbles:true,isComposing:true}));const during=ta.innerHTML;const count=S.blocks.length;commit();commitWithCleanup();const protectedCount=S.blocks.length;ta.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true}));await Promise.resolve();return {during,after:ta.innerHTML,count,protectedCount,composing:_composerComposing,pending:_composerPendingInput}})()`);
    assert.equal(report.compositionLifecycle.count, report.compositionLifecycle.protectedCount);
    assert.ok(report.compositionLifecycle.during.includes('<font'), '조합 중 DOM 정규화 방지');
    assert.equal(report.compositionLifecycle.composing, false);
    assert.equal(report.compositionLifecycle.pending, false);
    report.historyOwnership = await evaluate(`(()=>{const ta=document.querySelector('#ta');ta.value='초안 유지';_histAt=0;S.blocks.push({id:uid(),type:'text',text:'문서 히스토리 검사'});save();const before=S.blocks.length;const input=document.createElement('input');document.body.appendChild(input);const event=new KeyboardEvent('keydown',{key:'z',ctrlKey:true,bubbles:true,cancelable:true});input.dispatchEvent(event);const afterInput=S.blocks.length;input.remove();const z=new KeyboardEvent('keydown',{key:'z',ctrlKey:true,bubbles:true,cancelable:true});document.body.dispatchEvent(z);const afterUndo=S.blocks.length;const y=new KeyboardEvent('keydown',{key:'y',ctrlKey:true,bubbles:true,cancelable:true});document.body.dispatchEvent(y);return {before,afterInput,afterUndo,afterRedo:S.blocks.length,inputPrevented:event.defaultPrevented,draft:ta.value}})()`);
    assert.equal(report.historyOwnership.before, report.historyOwnership.afterInput);
    assert.equal(report.historyOwnership.inputPrevented, false);
    assert.equal(report.historyOwnership.afterUndo, report.historyOwnership.before - 1);
    assert.equal(report.historyOwnership.afterRedo, report.historyOwnership.before);
    assert.equal(report.historyOwnership.draft, '초안 유지');
    await evaluate(`S.ui.selectedBlockId=null;document.querySelector('#ta').value='';document.querySelector('#ta').focus()`);
    report.paste = await evaluate(`(()=>{const ta=document.querySelector('#ta');const dt=new DataTransfer();dt.setData('text/plain','붙여넣기 첫 줄\\n둘째 줄');ta.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));return ta.value})()`);
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'z', code: 'KeyZ', modifiers: 2, windowsVirtualKeyCode: 90 });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'z', code: 'KeyZ', modifiers: 2, windowsVirtualKeyCode: 90 });
    report.pasteUndo = await evaluate(`document.querySelector('#ta').value`);
    assert.equal(report.paste, '붙여넣기 첫 줄\n둘째 줄'); assert.equal(report.pasteUndo, '');
    report.blockEditBefore = await evaluate(`(()=>{setStage('composer');const b={id:uid(),type:'text',text:'기존 블록 실행취소 기준'};S.blocks=[b];save();_histPrev=snapOf();_undoS=[];_redoS=[];S.ui.selectedBlockId=b.id;S.ui.stage='format';renderComposer();document.querySelector('#ta').value=b.text;focusComposerEnd();_histAt=0;return b.text})()`);
    await call('Input.insertText', { text: ' 편집검사' });
    report.blockEdit = await evaluate(`selBlock().text`);
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'z', code: 'KeyZ', modifiers: 2, windowsVirtualKeyCode: 90 });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'z', code: 'KeyZ', modifiers: 2, windowsVirtualKeyCode: 90 });
    report.blockUndo = await evaluate(`({block:selBlock().text,composer:document.querySelector('#ta').value})`);
    assert.equal(report.blockUndo.block, report.blockEditBefore);
    assert.equal(report.blockUndo.composer, report.blockEditBefore);
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'y', code: 'KeyY', modifiers: 2, windowsVirtualKeyCode: 89 });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'y', code: 'KeyY', modifiers: 2, windowsVirtualKeyCode: 89 });
    report.blockRedo = await evaluate(`selBlock().text`);
    assert.equal(report.blockRedo, report.blockEdit);
    await evaluate(`S.ui.selectedBlockId=null;setStage('composer')`);
  }
  report.compositionShortcut = await evaluate(`(()=>{const ta=document.querySelector('#ta');ta.value='조합 중 검사';const before=S.blocks.length;const e=new KeyboardEvent('keydown',{key:'Enter',ctrlKey:true,isComposing:true,bubbles:true,cancelable:true});ta.dispatchEvent(e);return {before,after:S.blocks.length,prevented:e.defaultPrevented,draft:ta.value}})()`);
  if (verify) { assert.equal(report.compositionShortcut.before, report.compositionShortcut.after); assert.equal(report.compositionShortcut.draft, '조합 중 검사'); }
  report.themeSmoke = await evaluate(`(async()=>{const results=[];for(const t of S.themes){S.activeThemeId=t.id;renderCanvas();await raf2();const cv=document.querySelector('#canvas');results.push({name:t.name,preset:t.presetId,width:cv.offsetWidth,height:cv.offsetHeight,rows:cv.querySelectorAll('.blk').length});}return results})()`);
  report.exports = [];
  await evaluate(`window.__auditItems=[];window.__auditDeliver=deliver;deliver=async items=>{window.__auditItems=items};`);
  if (verify) await evaluate(`window.__auditCaptures=[];window.__auditRender=renderExact;renderExact=async(...args)=>{
    const node=args[1],head=node.querySelector('.cv-head.head-flow'),rootRect=node.getBoundingClientRect();
    const rows=[...node.querySelectorAll('.blk:not(.is-footer):not(.row-off)')].filter(n=>getComputedStyle(n).display!=='none');
    const bodyBottom=Math.max(0,...rows.map(n=>n.getBoundingClientRect().bottom-rootRect.top));
    const footer=node.querySelector('.cv-foot-ebook,.cv-foot-ebook-modern,.cv-foot-insta-dm,.blk.is-footer');
    const footerTop=footer?footer.getBoundingClientRect().top-rootRect.top:null;
    const inkBottom=Math.max(0,...rows.flatMap(n=>{const range=document.createRange();range.selectNodeContents(n);return [...range.getClientRects()].map(r=>r.bottom-rootRect.top)}));
    window.__auditCaptures.push({header:!!head,off:head?.classList.contains('row-off'),display:head?getComputedStyle(head).display:null,
      height:args[3],bodyBottom,inkBottom,footerTop,bottomMargin:args[3]-Math.max(bodyBottom,inkBottom)});
    window.__auditCaptures[window.__auditCaptures.length-1].blockIds=rows.map(n=>n.dataset.id);
    return await window.__auditRender(...args);
  };`);
  const cases = [
    ['square-white', 'Noto Sans KR'], ['square-white', 'Nanum Kyuri'],
    ['square-white', 'Nanum Summer'], ['square-white', 'Nanum Chulpil'],
    ['square-white', 'Pretendard'], ['square-white', 'Bookk Myungjo'],
    ['ios', 'Pretendard'], ['insta-dm', 'Pretendard'], ['newspapers', 'Pretendard'],
    ['newspapers', 'Pretendard', 'multi'], ['newspapers', 'Pretendard', 'columns'],
    ['square-white', 'Pretendard', 'fit'],
    ...(verify ? [['insta-dm', 'Pretendard', 'fit'], ['square-white', 'Pretendard', 'fit-columns'],
      ['chapter', 'Pretendard', 'multi'], ['ios', 'Pretendard', 'glass-bg'], ['insta-dm', 'Pretendard', 'glass-bg']] : []),
  ];
  for (let i = 0; i < cases.length; i++) {
    const [preset, font, mode] = cases[i];
    const result = await evaluate(`(async()=>{
      const t=S.themes.find(t=>t.presetId===${JSON.stringify(preset)});S.activeThemeId=t.id;
      t.fmt.font=${JSON.stringify(font)};t.fmt.columns=${mode === 'columns' || mode === 'fit-columns' ? 2 : 1};t.canvas.mode=${mode?.startsWith('fit') ? "'fit'" : "'ratio'"};
      if(${mode === 'glass-bg'}){const bg=document.createElement('canvas');bg.width=560;bg.height=560;const g=bg.getContext('2d');const gradient=g.createLinearGradient(0,0,560,560);gradient.addColorStop(0,'#74b6d9');gradient.addColorStop(1,'#e5bf84');g.fillStyle=gradient;g.fillRect(0,0,560,560);t.bgImage=bg.toDataURL();t.bgRotation=20;t.bgSize=135;t.bgBlur=4;t.lockGlass=true;}
      S.ui.selectedBlockId=null;S.blocks=[{id:uid(),type:'text',text:'카페 안은 오후의 나른함으로 가득했다. 가나다 각 값 꽃 뷁 ABC 0123456789 “인용” 🙂👨‍👩‍👧‍👦'},
        {id:uid(),type:'text',text:'오늘 할 말이 있어. 눈 좀 더 붙여.',asBubble:true,speakerId:S.characters[0]?.id},
        {id:uid(),type:'text',text:'강제 개행 첫 줄\\n둘째 줄 **굵게**'}];
      if(${mode === 'multi' || mode === 'columns'}) for(let n=0;n<24;n++) S.blocks.push({id:uid(),type:'text',text:'여러 장의 하단과 서명을 확인합니다. 긴 문장을 이어 쓰고 페이지 분할을 관찰합니다. '.repeat(2)});
      render();await ensureFontsLoaded(document.querySelector('#canvas'));await raf2();
      window.__auditItems=[];window.__auditCaptures=[];const start=performance.now();await exportPNG();
      const items=window.__auditItems;const dimensions=[];for(const it of items){const image=new Image();image.src=it.url;await image.decode();dimensions.push({width:image.naturalWidth,height:image.naturalHeight,name:it.name});}
      return {preset:${JSON.stringify(preset)},font:${JSON.stringify(font)},mode:${JSON.stringify(mode || 'single')},pages:items.length,dimensions,captures:window.__auditCaptures,expectedBlockIds:S.blocks.map(b=>b.id),ms:Math.round(performance.now()-start),fontStyleRemoved:!document.querySelector('[data-export-fonts]'),hiddenRows:document.querySelectorAll('#canvas .row-off').length,toast:document.querySelector('#toast')?.textContent};
    })()`);
    const items = await evaluate('window.__auditItems');
    if (items.length > 1) await evaluate('window.__auditMultiItems=window.__auditItems');
    for (let p = 0; p < items.length; p++) fs.writeFileSync(path.join(out, `${browser}-${i}-${p}.png`), Buffer.from(items[p].url.split(',')[1], 'base64'));
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(out, `${browser}-${i}-screen.png`), Buffer.from(shot.data, 'base64'));
    report.exports.push(result); console.log('export', browser, i, result.pages, result.ms);
    if (verify) {
      assert.ok(result.pages > 0, 'PNG 생성'); assert.ok(result.fontStyleRemoved); assert.equal(result.hiddenRows, 0);
      assert.deepEqual(result.captures.flatMap(c=>c.blockIds).sort(), result.expectedBlockIds.slice().sort(), '모든 본문 블록을 중복/누락 없이 저장');
      for (const capture of result.captures) if (capture.off) assert.equal(capture.display, 'none', '장 범위 밖 흐름 제목 숨김');
      for (const capture of result.captures) {
        assert.ok(capture.bottomMargin >= -1, '본문/글자 하단이 출력 캔버스 밖으로 잘림: '+JSON.stringify(capture));
        if (capture.footerTop !== null) assert.ok(Math.max(capture.bodyBottom,capture.inkBottom) <= capture.footerTop + 1,
          '본문/푸터 겹침: '+JSON.stringify(capture));
      }
      if (mode === 'multi' || mode === 'columns') { assert.equal(result.captures[0].off, false); assert.ok(result.captures.slice(1).every(c => c.off && c.display === 'none')); }
    }
  }
  report.partialFontCheck = await evaluate(`exportMissing(document.querySelector('#canvas'),'@font-face{font-family:Pretendard;src:url(data:font/woff2;base64,invalid)}')`);
  if (verify) {
    assert.ok(report.partialFontCheck);
    report.fontFailures = await evaluate(`(async()=>{
      const cv=document.querySelector('#canvas'),original=window.fetch,cache=_fontCSS;
      let invalid=0,requests=0;const scenarios=[];
      try { for(const mode of ['partial','http','decode']) {
        window.fetch=async(url,options)=>{
          const u=String(url);
          if(u===new URL(fontOf('Pretendard').embedCss,location.href).href) {
            requests++;
            if(mode==='http')return new Response('error',{status:503});
            const file=location.origin+(mode==='decode'?'/invalid-font.woff2':'/font/web/BookkMyungjo-400.woff2');
            return new Response('@font-face{font-family:Pretendard;font-weight:400;src:url('+file+')}'+
              (mode==='partial'?'@font-face{font-family:Pretendard;font-weight:400;src:url('+location.origin+'/invalid-font.woff2)}':''));
          }
          if(u.includes('invalid-font.woff2')){invalid++;return new Response('<html>not a font</html>',{status:200});}
          return original(url,options);
        };
        _fontCSS=null;
        const css=await fontEmbedCSS('가나다',[400]);const first=exportMissing(cv,css);
        const before=invalid,beforeRequests=requests;await fontEmbedCSS('가나다',[400]);
        scenarios.push({mode,first,missing:_fontCSS.missing,bytes:css.length,
          retried:mode==='http'?requests>beforeRequests:invalid>before});
      }} finally {window.fetch=original;_fontCSS=cache;}
      return scenarios;
    })()`);
    fs.writeFileSync(path.join(out, browser + '-font-failures.json'), JSON.stringify(report.fontFailures, null, 2));
    for (const failure of report.fontFailures) { assert.ok(failure.first); assert.ok(failure.missing.includes('Pretendard')); assert.ok(failure.retried); }
    assert.ok(report.fontFailures.find(f => f.mode === 'partial').bytes > 0, '부분 성공에서도 누락 탐지');
    assert.equal(report.fontFailures.find(f => f.mode === 'http').bytes, 0);
    assert.equal(report.fontFailures.find(f => f.mode === 'decode').bytes, 0);
    report.fontFallback = await evaluate(`(async()=>{const node=document.createElement('div');node.style.cssText='width:10px;height:10px';document.body.appendChild(node);const status={fontFallback:false};let calls=0;try{const hti={toPng:async(n,opt)=>{calls++;if(opt.fontEmbedCSS)throw new Error('injected font render failure');return BLANK_PX}};const png=await window.__auditRender(hti,node,10,10,1,'@font-face{}','#fff',status);return {calls,fallback:status.fontFallback,png:png===BLANK_PX}}finally{node.remove()}})()`);
    assert.equal(report.fontFallback.calls, 3);assert.equal(report.fontFallback.fallback,true);assert.equal(report.fontFallback.png,true);
  }
  await evaluate(`S.activeThemeId=S.themes[0].id;render();`);
  const screenshot = await call('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(out, browser + '-screen.png'), Buffer.from(screenshot.data, 'base64'));
  if (extended) {
    report.pixelRatios = [];
    for (const scale of [1.25, 1.5, 2]) {
      await call('Emulation.setDeviceMetricsOverride', { width: 1024, height: 800, deviceScaleFactor: scale, mobile: false });
      await delay(200);
      const metric = await evaluate(`({dpr:devicePixelRatio,width:innerWidth,scroll:document.body.scrollWidth,save:document.querySelector('#btnSave').getBoundingClientRect().toJSON()})`);
      assert.ok(metric.scroll <= metric.width, 'DPR 모의 검사에서 가로 넘침');
      assert.ok(metric.save.x >= 0 && metric.save.right <= metric.width, '저장 버튼이 화면 밖으로 이동');
      report.pixelRatios.push(metric);
    }
    const downloadPath = path.join(out, browser + '-downloads');
    fs.mkdirSync(downloadPath, {recursive:true});
    await call('Browser.setDownloadBehavior', {behavior:'allow',downloadPath,eventsEnabled:true});
    await evaluate(`(async()=>{const one=window.__auditItems[0];const multi=window.__auditMultiItems.slice(0,3);await window.__auditDeliver([{url:one.url,name:'single.png'}]);await window.__auditDeliver(multi.map((it,i)=>({url:it.url,name:'multi-'+(i+1)+'.png'})))})()`);
    let downloads = [];
    for (let i=0;i<30;i++) { await delay(200); downloads=fs.readdirSync(downloadPath).filter(n=>n.endsWith('.png')); if(downloads.length===4)break; }
    assert.equal(downloads.length,4,'다운로드 허용 상태에서 단일·다중 PNG 실제 파일 수');
    report.downloads = downloads.map(name=>{const data=fs.readFileSync(path.join(downloadPath,name));assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a');return {name,bytes:data.length}});
    report.downloadPolicy = 'CDP allow 설정에서 실제 a[download] 전달 및 PNG 4개 저장 확인. 사용자 권한 UI/차단 정책 미검증.';
    report.pixelRatioLimit = '브라우저 DPR 모의 설정이며 Windows OS 배율 직접 검증이 아님.';
  }
  report.errors = errors; report.failedRequests = failedRequests;
  fs.writeFileSync(path.join(out, browser + '-results.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ browser, version: report.version.product, scenarios: report.exports.length, pngs: report.exports.reduce((n, x) => n + x.pages, 0), exceptions: errors.length, failedRequests: failedRequests.length, report: path.join(out, browser + '-results.json') }, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => { ws?.close(); child?.kill(); server.close(); });
