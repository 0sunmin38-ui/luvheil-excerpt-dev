const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

async function run(engine, mobile) {
  const executablePath = process.env[engine === chromium ? 'CHROMIUM_EXECUTABLE_PATH' : 'WEBKIT_EXECUTABLE_PATH'];
  const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage(mobile
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
      : { viewport: { width: 1280, height: 900 } });
    await page.goto('http://127.0.0.1:8765/?fresh=' + Date.now(), { waitUntil: 'domcontentloaded' });
    const results = await page.evaluate(async () => {
      const th = { ...DEF_THEME(), id: 'footer-test', header: 'none', signShow: true,
        canvas: { ...S.canvas, mode: 'ratio', ratio: '3:4', width: 560, mt: 30, mb: 20, ml: 30, mr: 30,
          marginDetail: true, marginLink: false },
        fmt: { ...S.format, columns: 1, size: 18, blockGap: 10, vAlign: 'center' } };
      S.themes = [th]; S.activeThemeId = th.id;
      S.signatures = [{ id: 'footer-sign', charName: '검증', maker: '@테스트' }]; S.activeSignId = 'footer-sign';
      const image = document.createElement('canvas'); image.width = 400; image.height = 600;
      image.getContext('2d').fillRect(0, 0, 400, 600);
      const photo = { id: 'photo', type: 'image', src: image.toDataURL(), imagePlacement: 'side' };
      const short = { id: 'text', type: 'text', text: '짧은 문장입니다.' };
      const scenarios = [
        ['ratio', [short]],
        ['ratio', [photo, short]],
        ['fit', [short]],
        ['ratio', [{ ...short, text: '여러 페이지의 긴 문장입니다. '.repeat(150) }]],
        ['ratio', [short], 'insta-dm'],
        ['fit', [short], 'insta-dm'],
        ['fit', [short], 'none', '1:1'],
        ['fit', [short], 'none', '1:2']
      ];
      const measurements = scenarios.map(([mode, blocks, header = 'none', columns = null]) => {
        th.canvas.mode = mode; th.header = header;
        th.fmt.columns = columns ? 2 : 1; th.fmt.columnRatio = columns || '1:1';
        S.blocks = blocks;
        const sample = mb => {
          th.canvas.mb = mb; renderCanvas();
          const cv = document.querySelector('#canvas');
          const foot = cv.querySelector('.blk.is-footer');
          const dm = cv.querySelector('.cv-foot-insta-dm');
          const content = cv.querySelector('.side-page') || cv.querySelector('.blk[data-id="text"]');
          const rect = cv.getBoundingClientRect();
          const ghost = cv.querySelector('.foot-ghost');
          const scale = rect.width / cv.offsetWidth;
          return { bottom: (rect.bottom - foot.getBoundingClientRect().bottom) / scale,
            gap: (foot.querySelector('.blk-footer').getBoundingClientRect().top - content.getBoundingClientRect().bottom) / scale,
            bodyBudget: mode === 'ratio' ? pageBox().inner - pageRangeHold : null,
            height: cv.offsetHeight, footTop: foot.offsetTop, footHeight: foot.offsetHeight,
            textTop: foot.querySelector('.blk-footer').offsetTop,
            footRectTop: foot.getBoundingClientRect().top,
            textRectTop: foot.querySelector('.blk-footer').getBoundingClientRect().top,
            contentBottom: content.getBoundingClientRect().bottom,
            footPadding: getComputedStyle(foot).paddingTop,
            dmGap: dm ? (dm.getBoundingClientRect().top - foot.getBoundingClientRect().bottom) / scale : null,
            pages: cv.querySelectorAll('.pagemark').length + 1,
            ghostEdge: ghost ? (rect.top + pageBox().h * scale - ghost.getBoundingClientRect().bottom) / scale : null };
        };
        return { mode, header, columns, side: blocks[0].type === 'image', zero: sample(0), low: sample(20), high: sample(60) };
      });
      const exports = [];
      for (const [mode, columns, header = 'none'] of [['ratio', null], ['fit', '1:1'], ['fit', null, 'insta-dm']]) {
        th.canvas.mode = mode; th.canvas.mb = 60; th.header = header;
        th.fmt.columns = columns ? 2 : 1; th.fmt.columnRatio = columns || '1:1';
        S.blocks = [short]; renderCanvas();
        let files = [], captures = [];
        deliver = async images => { files = images; };
        const oldRenderExact = renderExact;
        renderExact = async (...args) => {
          const root = args[1];
          const foot = root.querySelector('.blk.is-footer');
          const content = root.querySelector('.blk[data-id="text"]');
          const dm = root.querySelector('.cv-foot-insta-dm');
          captures.push({ bottom: root.getBoundingClientRect().bottom - foot.getBoundingClientRect().bottom,
            gap: foot.querySelector('.blk-footer').getBoundingClientRect().top - content.getBoundingClientRect().bottom,
            dmGap: dm ? dm.getBoundingClientRect().top - foot.getBoundingClientRect().bottom : null });
          return oldRenderExact(...args);
        };
        try { await buildPNG(); } finally { renderExact = oldRenderExact; }
        exports.push({ mode, columns, header, files: files.map(file => file.url?.startsWith('data:image/png')),
          captures });
      }
      return { measurements, exports };
    });
    for (const result of results.measurements) {
      assert.ok(Math.abs(result.zero.bottom - result.low.bottom) < 2, JSON.stringify(result));
      assert.ok(Math.abs(result.high.bottom - result.low.bottom) < 2, JSON.stringify(result));
      assert.ok(result.high.gap > result.low.gap + 8, JSON.stringify(result));
      if (result.mode === 'ratio')
        assert.ok(Math.abs(result.zero.bodyBudget - result.high.bodyBudget - 60) <= 1,
          JSON.stringify(result));
      if (result.header === 'insta-dm')
        assert.ok(Math.abs(result.low.dmGap - 16) < 2 && Math.abs(result.high.dmGap - 16) < 2,
          JSON.stringify(result));
      else assert.ok(Math.abs(result.low.bottom - 16) < 2, JSON.stringify(result));
      if (result.low.pages > 1 && result.high.pages > 1)
        assert.ok(Math.abs(result.low.ghostEdge - 16) < 2 && Math.abs(result.high.ghostEdge - 16) < 2,
          JSON.stringify(result));
    }
    for (const item of results.exports) {
      assert.deepEqual(item.files, [true], JSON.stringify(item));
      assert.ok(item.captures.length > 0, JSON.stringify(item));
      assert.ok(item.captures.every(capture => capture.gap > 40 && (item.header === 'insta-dm'
        ? Math.abs(capture.dmGap - 16) < 2 : Math.abs(capture.bottom - 16) < 2)),
        JSON.stringify(item));
    }
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'footer margin passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
