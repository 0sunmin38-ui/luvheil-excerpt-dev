const { chromium, webkit, firefox } = require('/Users/vbody/Desktop/Git source/vbody-web/node_modules/.pnpm/@playwright+test@1.62.1/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const report = [];
  for (const engine of [chromium, webkit, firefox]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 },
        userAgent: engine === webkit ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/130.0 Mobile/15E148 Safari/604.1' : undefined });
      await page.goto('http://127.0.0.1:8774/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(async () => {
        const fonts = ['Chosun Myungjo', 'KoPubWorld Dotum', 'Bookk Myungjo'];
        const loadedFonts = [];
        for (const font of fonts) {
          await ensureFontCss(font);
          const faces = await document.fonts.load('16px "' + font + '"', '그것은 꿈이었다.');
          loadedFonts.push({font, loaded: faces.length > 0 && faces.every(f => f.status === 'loaded')});
          _fontSeen.add(font);
        }
        const th = { ...DEF_THEME(), id: 'regression', header: 'kakao', signShow: true,
          canvas: { mode: 'ratio', ratio: '3:4', width: 560, mt: 30, mb: 30, ml: 30, mr: 30,
            marginDetail: true, marginLink: false },
          fmt: { ...S.format, columns: 2, columnGap: 24, blockGap: 20, columnRatio: '1:2', vAlign: 'top', size: 14 } };
        S.themes = [th]; S.activeThemeId = th.id;
        S.signatures = [{ id: 'sign', charName: '테스트', maker: '@작성자' }]; S.activeSignId = 'sign';
        const source = document.createElement('canvas'); source.width = 100; source.height = 200;
        const ctx = source.getContext('2d'); ctx.fillStyle = '#339999'; ctx.fillRect(0, 0, 100, 200);
        const src = source.toDataURL();
        const cases = [], failures = []; let baselineFailures = 0;
        for (const font of fonts) for (const sign of [true, false]) for (const align of ['top', 'center'])
          for (const ratio of ['1:1', '1:2', '2:1']) for (const order of ['image-first', 'image-after']) {
            th.fmt.font = font; th.signShow = sign; th.fmt.vAlign = align; th.fmt.columnRatio = ratio;
            const image = { id: 'img', type: 'image', src, imageRatio: 'fill' };
            const short = { id: 'short', type: 'text', text: '꿈이었다.' };
            const paragraph = { id: 'long', type: 'text', text: '인지보다 먼저 감각이 왔다. 사지가 짧았고 시야가 낮았다. '.repeat(3) };
            S.blocks = order === 'image-first' ? [image, short, paragraph] : [short, image, paragraph];
            renderCanvas();
            const cv = document.querySelector('#canvas'), rows = flowRows();
            const preview = rows.map(n => Number(n.dataset.pageCol || 0));
            clearPageOffsets(cv);
            const budget = pageRangeHold;
            pageRangeHold = headHold + footHold; // 수정 전 저장의 기본 예약값
            const old = pageRanges();
            pageRangeHold = budget;
            const current = pageRanges();
            const sides = ranges => rows.map((_, i) => ranges.findIndex(([a, b]) => a <= i && i < b) % 2);
            if (JSON.stringify(sides(old)) !== JSON.stringify(preview)) baselineFailures++;
            const same = JSON.stringify(sides(current)) === JSON.stringify(preview);
            const item = { font, sign, align, ratio, order, same };
            cases.push(item); if (!same) failures.push(item);
          }
        // 실제 저장: 한 줄 글 + 채우기 + 서명, iOS UA에서는 모바일 저장 분기도 사용.
        th.fmt.font = fonts[0]; th.signShow = true; th.fmt.vAlign = 'top'; th.fmt.columnRatio = '1:2';
        S.blocks = [{ id: 'img', type: 'image', src, imageRatio: 'fill' },
          { id: 'short', type: 'text', text: '그것은, 꿈이었다.' },
          { id: 'long', type: 'text', text: '인지보다 먼저 감각이 왔다. 사지가 짧았고 시야가 낮았다. '.repeat(3) }];
        let delivered; deliver = async items => { delivered = items; };
        const originalRenderExact = renderExact; let exportedRows;
        renderExact = async (...args) => {
          exportedRows = [...args[1].querySelectorAll(':scope > .blk')].map(n => ({ id: n.dataset.id,
            top: n.offsetTop, left: n.offsetLeft, height: n.offsetHeight }));
          return originalRenderExact(...args);
        };
        const originalPageRanges = pageRanges;
        exportBusy = true;
        pageRanges = (hold = headHold + footHold) => originalPageRanges(hold);
        let beforePng, beforeRows;
        try {
          await buildPNG(); beforePng = delivered?.[0]?.url; beforeRows = exportedRows;
          pageRanges = originalPageRanges; delivered = null;
          await buildPNG();
        } finally { exportBusy = false; pageRanges = originalPageRanges; renderExact = originalRenderExact; }
        return { cases: cases.length, failures, baselineFailures,
          loadedFonts,
          exportedRows, beforePng, beforeRows, png: delivered?.[0]?.url, images: delivered?.length || 0 };
      });

      assert.deepEqual(result.failures, []);
      assert.ok(result.baselineFailures > 0);
      assert.ok(result.loadedFonts.every(x => x.loaded));
      assert.equal(result.images, 1);
      const image = result.exportedRows.find(x => x.id === 'img');
      const short = result.exportedRows.find(x => x.id === 'short');
      assert.ok(short.left > image.left && Math.abs(short.top - image.top) <= 1);
      const oldImage = result.beforeRows.find(x => x.id === 'img');
      const oldShort = result.beforeRows.find(x => x.id === 'short');
      assert.equal(oldShort.left, oldImage.left);
      assert.ok(oldShort.top >= oldImage.top + oldImage.height);
      fs.writeFileSync(__dirname + '/' + engine.name() + '-before.png', Buffer.from(result.beforePng.split(',')[1], 'base64'));
      delete result.beforePng;
      fs.writeFileSync(__dirname + '/' + engine.name() + '-fixed.png', Buffer.from(result.png.split(',')[1], 'base64'));
      delete result.png; report.push({ engine: engine.name(), ...result });
      console.log(engine.name(), JSON.stringify(result));
    } finally { await browser.close(); }
  }
  fs.writeFileSync(__dirname + '/regression.json', JSON.stringify(report, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
