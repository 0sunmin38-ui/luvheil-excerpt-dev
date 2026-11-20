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
    const result = await page.evaluate(async () => {
      const image = document.createElement('canvas'); image.width = 400; image.height = 600;
      image.getContext('2d').fillRect(0, 0, 400, 600);
      const th = { ...DEF_THEME(), id: 'align-test', header: 'none', signShow: false,
        canvas: { ...S.canvas, mode: 'ratio', ratio: '3:4', width: 560, mt: 30, mb: 30, ml: 30, mr: 30,
          marginDetail: true, marginLink: false },
        fmt: { ...S.format, columns: 1, size: 18, blockGap: 10, vAlign: 'top' } };
      S.themes = [th]; S.activeThemeId = th.id;
      const photo = { id: 'photo', type: 'image', src: image.toDataURL(), imagePlacement: 'side', imageSide: 'left' };
      const text = { id: 'text', type: 'text', text: '사진 옆의 짧은 문장입니다.' };
      const sample = () => {
        renderCanvas();
        const side = document.querySelector('#canvas .side-page');
        return { photo: side.querySelector('.side-page-photo').getBoundingClientRect().top,
          text: side.querySelector('.side-page-text .blk').getBoundingClientRect().top };
      };
      const cases = [];
      for (const header of ['none', 'kakao']) for (const preceding of [false, true]) {
        th.header = header; th.signShow = header !== 'none';
        S.signatures = th.signShow ? [{ id: 'align-sign', charName: '검증', maker: '@테스트' }] : [];
        S.activeSignId = th.signShow ? 'align-sign' : null;
        S.blocks = preceding ? [{ id: 'before', type: 'text', text: '사진 앞의 문장입니다.' }, photo, text] : [photo, text];
        th.fmt.vAlign = 'top'; const top = sample();
        th.fmt.vAlign = 'center'; const center = sample();
        cases.push({ header, preceding, top, center });
      }
      th.header = 'none'; th.signShow = false; S.signatures = []; S.activeSignId = null;
      S.blocks = [photo, text];
      const exportTop = async align => {
        th.fmt.vAlign = align; renderCanvas();
        let result = []; deliver = async images => { result = images; };
        await buildPNG();
        const decoded = new Image(); decoded.src = result[0].url; await whenDrawable(decoded);
        const surface = document.createElement('canvas');
        surface.width = decoded.naturalWidth; surface.height = decoded.naturalHeight;
        const context = surface.getContext('2d'); context.drawImage(decoded, 0, 0);
        const scale = decoded.naturalWidth / canvasW();
        const x = Math.round((padL() + 30) * scale);
        for (let y = 0; y < decoded.naturalHeight; y++) {
          const pixel = context.getImageData(x, y, 1, 1).data;
          if (pixel[0] < 80 && pixel[1] < 80 && pixel[2] < 80 && pixel[3] > 128) return y;
        }
        return -1;
      };
      return { cases, exportTop: await exportTop('top'), exportCenter: await exportTop('center') };
    });
    for (const item of result.cases) {
      assert.ok(Math.abs(item.center.photo - item.top.photo) < 2, JSON.stringify(item));
      assert.ok(item.center.text > item.top.text + 15, JSON.stringify(item));
    }
    assert.ok(result.exportTop >= 0 && Math.abs(result.exportCenter - result.exportTop) < 3,
      JSON.stringify(result));
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'side alignment passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
