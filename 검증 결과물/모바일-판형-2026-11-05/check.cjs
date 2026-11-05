const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const url = 'http://127.0.0.1:8766/';

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      for (const width of [320, 360, 390, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: 844 }, isMobile: width < 500, hasTouch: width < 500 });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const initial = await page.evaluate(() => ({
          schema: SCHEMA,
          mobile: S.themes.find(t => t.presetId === 'mobile-reading')?.canvas.shortSide,
          legacy: S.themes.find(t => t.presetId === 'kakao')?.canvas.shortSide ?? null
        }));
        assert.equal(initial.schema, 24);
        assert.equal(initial.mobile, 400);
        assert.equal(initial.legacy, null);

        const measure = await page.evaluate(async () => {
          const chosen = S.themes.find(t => t.presetId === 'mobile-reading');
          S.activeThemeId = chosen.id;
          S.characters = [
            { id: 'left', name: '하늘', avatar: '', position: 'left' },
            { id: 'right', name: '나', avatar: '', position: 'right' }
          ];
          S.signatures = [{ id: 'sign', charName: '테스트', maker: '@example' }];
          S.activeSignId = 'sign';
          S.blocks = [
            { id: 'a', type: 'text', text: '조용한 오후에 나눈 대화를 다시 읽습니다. 이 문장은 말풍선과 글자 크기를 확인하기 위한 문장입니다.', asBubble: true, speakerId: 'left' },
            { id: 'b', type: 'text', text: '두 번째 대화도 읽기 쉬워야 합니다.', asBubble: true, speakerId: 'right' }
          ];
          await document.fonts.ready;
          const output = [];
          for (const ratio of ['3:4', '9:16', '1:1']) {
            chosen.canvas.ratio = ratio;
            renderCanvas();
            const cv = document.querySelector('#canvas');
            output.push({ ratio, width: cv.offsetWidth, height: cv.offsetHeight,
              body: parseFloat(getComputedStyle(cv).fontSize),
              previewScale: getComputedStyle(cv).transform,
              header: parseFloat(getComputedStyle(cv.querySelector('.cv-head')).fontSize),
              signature: parseFloat(getComputedStyle(cv.querySelector('.blk-footer')).fontSize),
              overflow: cv.dataset.paginationOverflow || '' });
          }
          const decors = [];
          chosen.canvas.ratio = '3:4';
          for (const size of [14, 18, 22]) {
            chosen.fmt.size = size;
            renderCanvas();
            const cv = document.querySelector('#canvas');
            decors.push({ size, header: parseFloat(getComputedStyle(cv.querySelector('.cv-head')).fontSize),
              signature: parseFloat(getComputedStyle(cv.querySelector('.blk-footer')).fontSize),
              name: cv.querySelector('.who') ? parseFloat(getComputedStyle(cv.querySelector('.who')).fontSize) : null });
          }
          chosen.fmt.size = 18;
          renderCanvas();
          const legacy = S.themes.find(t => t.presetId === 'kakao');
          S.activeThemeId = legacy.id;
          renderCanvas();
          const legacyWidth = document.querySelector('#canvas').offsetWidth;
          S.activeThemeId = chosen.id;
          renderCanvas();
          let png = null;
          deliver = async items => {
            const image = new Image();
            image.src = items[0].url;
            await image.decode();
            png = { width: image.width, height: image.height, bytes: items[0].url.length,
              url: items[0].url };
          };
          await buildPNG();
          return { output, decors, legacyWidth, png };
        });
        assert.deepEqual(measure.output.map(x => [x.width, x.height]), [[400, 533], [400, 711], [400, 400]]);
        assert.ok(measure.output.every(x => x.body === 13 && x.header === 12 && x.signature === 12 && !x.overflow));
        assert.ok(measure.decors.every(x => x.header === 12 && x.signature === 12));
        assert.ok(measure.decors.every(x => x.name >= 13 && x.name <= 18));
        assert.equal(measure.legacyWidth, 560);
        assert.equal(measure.png?.width, 1440);
        assert.ok(Math.abs(measure.png?.height - 1920) <= 2, JSON.stringify(measure.png));
        assert.ok(measure.png.bytes > 1000);
        if (width === 1440 && engine === chromium) {
          await page.locator('#canvas').screenshot({ path: path.join(__dirname, 'preview-3x4.png') });
          fs.writeFileSync(path.join(__dirname, 'export-3x4.png'),
            Buffer.from(measure.png.url.slice(measure.png.url.indexOf(',') + 1), 'base64'));
        }
        delete measure.png.url;
        assert.deepEqual(errors, []);
        console.log(engine.name(), width, JSON.stringify(measure));
        await page.close();
      }
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
