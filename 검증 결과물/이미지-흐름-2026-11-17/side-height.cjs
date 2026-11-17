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
    const output = await page.evaluate(async () => {
      const image = document.createElement('canvas'); image.width = 400; image.height = 600;
      image.getContext('2d').fillRect(0, 0, 400, 600);
      const th = { ...DEF_THEME(), id: 'side-height', signShow: true, paperTitle: '제목',
        canvas: { ...S.canvas, mode: 'ratio', ratio: '3:4', width: 560, mt: 30, mb: 0, ml: 30, mr: 30,
          marginDetail: true, marginLink: false },
        fmt: { ...S.format, columns: 1, size: 18, blockGap: 10, vAlign: 'center' } };
      S.themes = [th]; S.activeThemeId = th.id;
      S.signatures = [{ id: 'side-sign', charName: '검증', maker: '@테스트' }]; S.activeSignId = 'side-sign';
      S.blocks = [{ id: 'photo', type: 'image', src: image.toDataURL(), imagePlacement: 'side' },
        { id: 'text', type: 'text', text: '사진 옆의 문장입니다.' }];
      const results = ['none', 'kakao', 'imessage', 'insta-dm', 'paper'].map(header => {
        th.header = header;
        const sample = mb => {
          th.canvas.mb = mb; renderCanvas();
          const cv = document.querySelector('#canvas');
          const photo = cv.querySelector('.side-page-photo');
          const foot = cv.querySelector('.blk.is-footer');
          const side = cv.querySelector('.side-page');
          const scale = cv.getBoundingClientRect().width / cv.offsetWidth;
          const page = Math.floor(side.offsetTop / pageBox().h);
          const bound = foot ? foot.getBoundingClientRect().top
            : cv.getBoundingClientRect().top + (page + 1) * pageBox().h * scale;
          return { page, gap: (bound - photo.getBoundingClientRect().bottom) / scale,
            photoHeight: photo.offsetHeight, pages: cv.querySelectorAll('.pagemark').length + 1 };
        };
        return { header, zero: sample(0), high: sample(60) };
      });
      th.header = 'paper'; th.canvas.mb = 0; renderCanvas();
      let files = []; deliver = async images => { files = images; };
      await buildPNG();
      const last = new Image(); last.src = files.at(-1)?.url || ''; await whenDrawable(last);
      const surface = document.createElement('canvas');
      surface.width = last.naturalWidth; surface.height = last.naturalHeight;
      const context = surface.getContext('2d'); context.drawImage(last, 0, 0);
      const scale = last.naturalWidth / canvasW();
      const pixel = context.getImageData(Math.round((padL() + 20) * scale),
        Math.round(last.naturalHeight - 5 * scale), 1, 1).data;
      const paperExportPages = files.length;
      th.header = 'kakao'; th.canvas.mb = 0; renderCanvas();
      files = [];
      const captures = [], oldRenderExact = renderExact;
      renderExact = async (...args) => {
        const root = args[1];
        captures.push(root.querySelector('.blk.is-footer').getBoundingClientRect().top
          - root.querySelector('.side-page-photo').getBoundingClientRect().bottom);
        return oldRenderExact(...args);
      };
      try { await buildPNG(); } finally { renderExact = oldRenderExact; }
      return { results, paperExportPages, pinnedExportPages: files.length,
        photoAtBottom: pixel[0] < 80 && pixel[1] < 80 && pixel[2] < 80 && pixel[3] > 128,
        pinnedCaptures: captures };
    });
    for (const item of output.results) {
      assert.ok(Math.abs(item.zero.gap) <= 2, JSON.stringify(output.results));
      assert.ok(Math.abs(item.zero.photoHeight - item.high.photoHeight - 60) <= 2, JSON.stringify(output.results));
      assert.ok(Math.abs(item.high.gap - item.zero.gap - 60) <= 2, JSON.stringify(output.results));
    }
    assert.equal(output.paperExportPages, 2);
    assert.equal(output.pinnedExportPages, 1);
    assert.equal(output.photoAtBottom, true);
    assert.ok(output.pinnedCaptures.length > 0 && output.pinnedCaptures.every(gap => Math.abs(gap) <= 2),
      JSON.stringify(output.pinnedCaptures));
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'side height passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
