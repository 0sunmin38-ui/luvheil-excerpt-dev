const { webkit, chromium } = require('/Users/vbody/Desktop/Git source/vbody-web/node_modules/.pnpm/@playwright+test@1.62.1/node_modules/@playwright/test');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const report = [];
  for (const engine of [webkit, chromium]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/130.0.0.0 Mobile/15E148 Safari/604.1' });
      await page.goto('http://127.0.0.1:8774/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(async () => {
        const th = { ...DEF_THEME(), id: 'vertical', header: 'kakao', headerTitle: '대화', signShow: false,
          showAvatar: false, myAvatar: false, showName: false, myName: false, bubbleStyle: 'bubble', bubblePreset: 'kakaotalk',
          bubbleBg: '#ffffff', myBubbleBg: '#ffffff', bubbleFg: '#202020', myBubbleFg: '#202020', bg: '#f4f4f2',
          fmt: { ...S.format, font: 'Pretendard', size: 14, lineHeight: 1.6, vAlign: 'top', columns: 2, columnRatio: '2:1', blockGap: 30 },
          canvas: { mode: 'ratio', ratio: '3:4', width: 560, mt: 32, mb: 32, ml: 32, mr: 32, marginDetail: true } };
        S.themes = [th]; S.activeThemeId = th.id;
        S.characters = [{ id: 'a', name: '화자', position: 'left' }];
        const c = document.createElement('canvas'); c.width = 100; c.height = 400;
        const g = c.getContext('2d'); g.fillStyle = '#cb7b66'; g.fillRect(0, 0, 100, 400);
        g.fillStyle = '#70a8a6'; g.fillRect(40, 0, 60, 180); const photo = c.toDataURL();
        const english = 'Where have you been, you dummy.';
        const korean = '어디 갔던 거야, 이 바보.';
        let items = [], warnings = [], captureBoxes = [];
        deliver = async files => { items = files; };
        reportExportWarning = message => warnings.push(message);
        const hti = await loadHTI(), toCanvas = hti.toCanvas, originalPreserve = preserveIOSBubbleLines;
        const realRender = renderExact;
        renderExact = async (...args) => {
          const root = args[1], origin = root.getBoundingClientRect(), bub = root.querySelector('.bub');
          const r = bub.getBoundingClientRect();
          const next = root.querySelector('[data-id="prose"]')?.getBoundingClientRect();
          captureBoxes.push({ x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height,
            next: next ? next.top - origin.top : r.bottom - origin.top + 30, wRoot: args[2], hRoot: args[3] });
          return realRender(...args);
        };
        // 실제 iOS 글꼴 차이를 재현한 것이 아니라, 저장 시에만 폭이 조금 증가하는 조건을 주입한다.
        hti.toCanvas = async (root, opts) => {
          const bubbles = [...root.querySelectorAll('.bub')];
          const saved = bubbles.map(b => b.getAttribute('style'));
          try {
            bubbles.forEach(b => b.style.setProperty('letter-spacing', '.25px', 'important'));
            return await toCanvas(root, opts);
          } finally {
            bubbles.forEach((b, i) => saved[i] === null ? b.removeAttribute('style') : b.setAttribute('style', saved[i]));
          }
        };
        const runs = [];
        for (const mode of ['fit', 'ratio']) for (const [columns, ratio] of [[1, '1:1'], [2, '1:1'], [2, '1:2'], [2, '2:1']])
          for (const translation of [korean, '[-]' + korean + '[/-]']) {
            th.canvas.mode = mode; th.fmt.columns = columns; th.fmt.columnRatio = ratio;
            S.blocks = [{ id: 'dialogue', type: 'text', asBubble: true, speakerId: 'a', text: english + '\n' + translation },
              { id: 'prose', type: 'text', text: '조이의 목소리는 웃음과 안도를 동시에 머금고 있었다. 그리고 그녀의 입술이 내려와 단테의 코끝에 닿았다. 작고 정확한 입맞춤.' },
              { id: 'more', type: 'text', text: '올리브 그린이 완전히 감겼다. 까만 꼬리가 조이의 손목을 한 바퀴 감았다. 검은 고양이가 발밑에서 야옹거리고 있었다.' },
              { id: 'photo', type: 'image', src: photo, imageRatio: 'fill' }];
            for (const fixed of [false, true]) {
              preserveIOSBubbleLines = fixed ? originalPreserve : () => {};
              items = []; warnings = []; captureBoxes = [];
              await exportPNG();
              let outside = 0;
              for (let i = 0; i < items.length; i++) {
                const box = captureBoxes[i], im = new Image(); im.src = items[i].url; await im.decode();
                const cv = document.createElement('canvas'); cv.width = im.naturalWidth; cv.height = im.naturalHeight;
                const ctx = cv.getContext('2d'); ctx.drawImage(im, 0, 0);
                const kx = cv.width / box.wRoot, ky = cv.height / box.hRoot;
                const pixels = ctx.getImageData(0, 0, cv.width, cv.height).data;
                const y1 = Math.ceil((box.y + box.h + 1) * ky), y2 = Math.min(cv.height, Math.floor(Math.min(box.next - 1, box.y + box.h + 25) * ky));
                for (let y = y1; y < y2; y++) for (let x = Math.max(0, Math.ceil(box.x * kx)); x < Math.min(cv.width, (box.x + box.w) * kx); x++) {
                  const p = (y * cv.width + x) * 4;
                  if (pixels[p + 3] > 200 && pixels[p] < 100 && pixels[p + 1] < 100 && pixels[p + 2] < 100) outside++;
                }
                cv.width = cv.height = 1;
              }
              runs.push({ mode, columns, ratio, small: translation !== korean, fixed, outside,
                delivered: items.length, warnings, png: mode === 'ratio' && columns === 2 && ratio === '2:1' && translation === korean ? items[0]?.url : undefined });
            }
          }
        preserveIOSBubbleLines = originalPreserve; hti.toCanvas = toCanvas;
        // 자동 줄바꿈이 인라인 서식의 첫 글자에서 발생하는 경우도 보존한다.
        const inline = document.createElement('div');
        inline.style.cssText = 'font:14px/21px Pretendard;width:90px;white-space:pre-wrap;word-break:normal;padding:0';
        inline.innerHTML = 'ABCDEFGHIJ <b>KLMNOP</b>'; document.body.appendChild(inline);
        const inlineClone = inline.cloneNode(true); document.body.appendChild(inlineClone);
        originalPreserve(inline, inlineClone);
        const inlineBoundary = !!inlineClone.querySelector('b br') && inline.offsetHeight === inlineClone.offsetHeight;
        inline.remove(); inlineClone.remove();
        return { runs, inlineBoundary };
      });
      for (const r of result.runs) if (r.png) {
        fs.writeFileSync(__dirname + '/' + engine.name() + (r.fixed ? '-fixed.png' : '-before.png'), Buffer.from(r.png.split(',')[1], 'base64'));
        delete r.png;
      }
      report.push({ engine: engine.name(), ...result });
      fs.writeFileSync(__dirname + '/audit.json', JSON.stringify(report, null, 2));
      const before = result.runs.filter(r => !r.fixed && r.outside > 0);
      const failures = result.runs.filter(r => r.fixed && (r.outside > 0 || !r.delivered));
      console.log(engine.name(), JSON.stringify({ runs: result.runs.length, before: before.length, failures }));
      assert.ok(before.length > 0); assert.deepEqual(failures, []); assert.ok(result.inlineBoundary);
    } finally { await browser.close(); }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
