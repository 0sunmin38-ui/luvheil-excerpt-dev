const { chromium, webkit, firefox } = require('/Users/vbody/Desktop/Git source/vbody-web/node_modules/.pnpm/@playwright+test@1.62.1/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
let responsePng;
const imageServer = http.createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' });
  response.end(responsePng);
});
const profiles = [
  ['chromium', chromium, {}], ['webkit', webkit, {}], ['firefox', firefox, {}],
  ['android-branch', chromium, { viewport: { width: 412, height: 915 }, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36' }],
  ['ios-branch', webkit, { viewport: { width: 390, height: 844 }, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1' }]
];
(async () => {
  await new Promise(resolve => imageServer.listen(0, '127.0.0.1', resolve));
  const noCorsUrl = `http://127.0.0.1:${imageServer.address().port}/no-cors.png`;
  const report = [];
  for (const [name, engine, options] of profiles) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, ...options });
      await page.goto('http://127.0.0.1:8774/', { waitUntil: 'domcontentloaded' });
      const routePng = await page.evaluate(() => {
        const c = document.createElement('canvas'); c.width = c.height = 40;
        const g = c.getContext('2d'); g.fillStyle = '#be2048'; g.fillRect(0, 0, 40, 40);
        return c.toDataURL().split(',')[1];
      });
      responsePng = Buffer.from(routePng, 'base64');
      await page.route('https://image-audit.invalid/**', async route => {
        const url = route.request().url();
        if (url.includes('slow')) await new Promise(resolve => setTimeout(resolve, 250));
        await route.fulfill({ contentType: 'image/png', body: Buffer.from(routePng, 'base64'),
          headers: url.includes('no-cors') ? {} : { 'access-control-allow-origin': '*' } });
      });
      const result = await page.evaluate(async noCorsUrl => {
        const hti = await loadHTI(), checks = [];
        // 이미지 검증은 실제 html-to-image를 쓴다. 글꼴 네트워크는 이 별도 검사에서 제외한다.
        usedFonts = () => [];
        fontEmbedCSS = async () => '';
        ensureFontsLoaded = async () => {};
        const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 120;
        const g = canvas.getContext('2d');
        g.fillStyle = '#d93025'; g.fillRect(0, 0, 160, 120);
        g.fillStyle = '#16a4bb'; g.fillRect(70, 0, 90, 70);
        g.fillStyle = '#f7dc36'; g.fillRect(0, 70, 70, 50);
        const png = canvas.toDataURL(), webp = canvas.toDataURL('image/webp'), jpeg = canvas.toDataURL('image/jpeg');
        const th = { ...DEF_THEME(), id: 'image-audit', header: 'none', signShow: false, paper: 0,
          bg: '#ffffff', fmt: { ...S.format, columns: 1, vAlign: 'top', font: 'Arial', size: 14 },
          canvas: { mode: 'fit', width: 400, mt: 20, mb: 20, ml: 20, mr: 20, marginDetail: true } };
        S.themes = [th]; S.activeThemeId = th.id;
        S.signatures = []; S.activeSignId = null;
        let delivered = [], warnings = [];
        deliver = async items => { delivered = items; };
        const originalWarning = reportExportWarning;
        reportExportWarning = message => { warnings.push(message); originalWarning(message); };
        const image = (src = png) => ({ id: 'photo', type: 'image', src, imageSize: 80 });
        const text = { id: 'text', type: 'text', text: '사진과 함께 저장되는 문장입니다.' };
        const run = async (label, blocks, expected, before) => {
          S.blocks = blocks; delivered = []; warnings = []; _exportMissLast = '';
          renderCanvas();
          const state = JSON.stringify(S.blocks);
          const started = performance.now();
          if (before) before();
          await exportPNG();
          const ok = expected ? delivered.length > 0 : delivered.length === 0 && warnings.length > 0;
          const check = { label, ok, count: delivered.length, warnings,
            ms: Math.round(performance.now() - started),
            restored: !exportBusy && !document.querySelector('#btnSave').disabled && JSON.stringify(S.blocks) === state };
          checks.push(check);
          if (expected && delivered[0]) {
            const im = new Image(); im.src = delivered[0].url; await im.decode();
            check.output = [im.naturalWidth, im.naturalHeight];
          }
          return delivered[0]?.url;
        };
        const samplePng = await run('png-with-text', [image(), text], true);
        await run('webp', [image(webp), text], true);
        await run('jpeg', [image(jpeg), text], true);
        const blobUrl = URL.createObjectURL(await (await fetch(png)).blob());
        await run('blob-image', [image(blobUrl), text], true);
        URL.revokeObjectURL(blobUrl);
        // Firefox는 이미 디코딩한 blob을 revoke 뒤에도 재사용할 수 있다.
        // 한 번도 표시하지 않은 별도의 만료 URL로 실제 복구 불가 조건을 만든다.
        const expiredBlob = URL.createObjectURL(await (await fetch(png)).blob());
        URL.revokeObjectURL(expiredBlob);
        await run('expired-blob', [image(expiredBlob), text], false);
        S.characters = [{ id: 'speaker', name: '사진 화자', avatar: png, position: 'left' }];
        const bubble = { ...text, asBubble: true, speakerId: 'speaker' };
        await run('profile-photo', [bubble, { ...bubble, id: 'bubble-2' }, image()], true);
        th.header = 'insta-dm'; th.headerAvatar = png; th.bgImage = png;
        await run('header-profile-and-glass', [bubble, image()], true);
        th.header = 'none'; th.headerAvatar = ''; th.bubbleStyle = 'notif';
        await run('notification-profile-and-glass', [bubble, image()], true);
        th.bubbleStyle = 'bubble'; delete th.bgImage;
        await run('text-only', [text], true);
        th.bgImage = png;
        await run('direct-background', [text], true);
        delete th.bgImage;
        await run('html-background', [{ id: 'html', type: 'html', text:
          `<div style="height:120px;width:150px;background-image:url('${png}');background-size:cover"></div>` }, text], true);
        await run('html-srcset', [{ id: 'html', type: 'html', text:
          `<img src="${png}" srcset="${webp} 1x" style="width:150px;height:100px;object-fit:cover">` }, text], true);
        await run('crop', [{ ...image(), imageCrop: { x: .2, y: .1, width: .5, height: .5, ratio: 1 } }, text], true);
        await run('slow-cors-image', [image('https://image-audit.invalid/slow.png'), text], true);
        await run('cors-blocked', [image(noCorsUrl), text], false);
        const bad = 'data:image/png;base64,AAAA';
        await run('broken-first-click', [image(bad), text], false);
        // 같은 실패를 두 번 눌러도 우회할 수 없다.
        delivered = []; warnings = []; await exportPNG();
        checks.push({ label: 'broken-second-click', ok: !delivered.length && !!warnings.length, restored: !exportBusy });
        const realToCanvas = hti.toCanvas;
        let omit = true, omitOnce = false, renderCalls = 0;
        hti.toCanvas = async (root, opts) => {
          renderCalls++;
          if (!omit) return realToCanvas(root, opts);
          if (omitOnce) omit = false;
          const imgs = [...root.querySelectorAll('img')].filter(img => img.closest('.blk-image')).slice(0, 1);
          const attrs = imgs.map(img => [img, img.src, img.getAttribute('style')]);
          try {
            for (const [img] of attrs) {
              const cs = getComputedStyle(img);
              img.style.width = cs.width; img.style.height = cs.height;
              img.src = BLANK_PX; await decodeExportImage(img);
            }
            return await realToCanvas(root, opts);
          } finally {
            for (const [img, src, style] of attrs) {
              img.src = src;
              if (style === null) img.removeAttribute('style'); else img.setAttribute('style', style);
              await decodeExportImage(img);
            }
          }
        };
        try {
          await run('silent-photo-omission', [image(), text], false);
          await run('one-of-two-photos-omitted', [image(), { ...image(), id: 'second-photo' }, text], false);
          omitOnce = true; renderCalls = 0;
          await run('transient-omission-retried', [image(), text], true);
          checks.push({ label: 'retry-render-used', ok: renderCalls >= 4, restored: true });
        }
        finally { hti.toCanvas = realToCanvas; }
        hti.toCanvas = async (root, opts) => {
          const target = root.querySelector('.blk-html > div');
          if (!target) return realToCanvas(root, opts);
          const style = target.getAttribute('style');
          try {
            target.style.setProperty('background-image', 'none', 'important');
            return await realToCanvas(root, opts);
          } finally {
            if (style === null) target.removeAttribute('style'); else target.setAttribute('style', style);
          }
        };
        try {
          await run('silent-css-image-omission', [{ id: 'html', type: 'html', text:
            `<div style="height:120px;width:150px;background-image:url('${png}');background-size:cover"></div>` }, text], false);
        } finally { hti.toCanvas = realToCanvas; }
        const realBake = bakeFromSrc, realPng = pngDataURL;
        pngDataURL = () => ''; bakeFromSrc = async () => '';
        try { await run('png-conversion-failure', [image(), text], false); }
        finally { pngDataURL = realPng; bakeFromSrc = realBake; }
        await run('recovery-after-failure', [image(), text], true);
        th.canvas = { ...th.canvas, mode: 'ratio', ratio: '1:1', width: 400 };
        await run('fill-photo', [{ ...image(), imageRatio: 'fill' }, text], true);
        const realBakeImages = bakeImagesForExport; let liveRestored = true;
        bakeImagesForExport = async root => {
          // 루트 transform은 bake에 진입하기 전 이미 저장용으로 풀려 있다.
          // shoot 진입 직전 상태로 되돌아가는 루트는 이 시점의 스냅샷에서 제외한다.
          const nodes = [...root.querySelectorAll('*')];
          const attrs = ['style', 'src', 'srcset', 'sizes', 'loading'];
          const before = nodes.map(n => attrs.map(a => n.getAttribute(a)));
          await realBakeImages(root);
          // Android shoot의 finally가 실행된 뒤 같은 DOM의 속성을 확인한다.
          setTimeout(() => {
            if (isAndroid()) liveRestored = nodes.every((n, i) => attrs.every((a, j) => n.getAttribute(a) === before[i][j]));
          }, 0);
          throw new Error('injected after image preparation');
        };
        try { await run('preparation-failure', [image(webp), text], false); }
        finally { bakeImagesForExport = realBakeImages; }
        await new Promise(resolve => setTimeout(resolve, 20));
        checks.push({ label: 'android-live-attributes-restored', ok: liveRestored, restored: true });
        // 한 페이지라도 실패하면 전체 deliver를 호출하지 않는다.
        const realRender = renderExact; let pages = 0;
        renderExact = async (...args) => {
          if (++pages === 2) throw new Error('injected second-page failure');
          return realRender(...args);
        };
        try { await run('multi-page-atomic-failure', Array.from({ length: 6 }, (_, i) => ({ ...image(), id: 'photo-' + i })), false); }
        finally { renderExact = realRender; }
        checks.push({ label: 'multi-page-reached-second', ok: pages >= 2, restored: true });
        return { checks, samplePng };
      }, noCorsUrl);
      fs.writeFileSync(__dirname + '/' + name + '.png', Buffer.from(result.samplePng.split(',')[1], 'base64'));
      delete result.samplePng;
      report.push({ profile: name, ...result });
      fs.writeFileSync(__dirname + '/audit.json', JSON.stringify(report, null, 2));
      console.log(name, JSON.stringify({ checks: result.checks.length,
        failures: result.checks.filter(c => !c.ok || !c.restored) }));
      assert.ok(result.checks.every(c => c.ok && c.restored), name + ' failed');
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => imageServer.close());
