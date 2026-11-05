const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

const url = 'http://127.0.0.1:8766/';

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        const old = S.themes.find(t => t.presetId === 'kakao');
        old.fmt.size = 17;
        old.canvas.ml = 37;
        S.activeThemeId = old.id;
        save();
        const stored = JSON.parse(localStorage.getItem(KEY));
        stored.v = 21;
        stored.themes = stored.themes.filter(t => t.presetId !== 'mobile-reading');
        localStorage.setItem(KEY, JSON.stringify(stored));
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      const migrated = await page.evaluate(() => {
        const old = S.themes.find(t => t.presetId === 'kakao');
        const mobile = S.themes.find(t => t.presetId === 'mobile-reading');
        const oldWidth = ratioCanvasW();
        S.activeThemeId = mobile.id;
        const mobileWidth = ratioCanvasW();
        S.activeThemeId = old.id;
        return { oldSize: old.fmt.size, oldMargin: old.canvas.ml, oldWidth,
          active: S.activeThemeId === old.id, mobileCount: S.themes.filter(t => t.presetId === 'mobile-reading').length,
          mobileWidth, mobileSize: mobile.fmt.size,
          bubbleSize: S.themes.find(t => t.presetId === 'bubble').fmt.size,
          savedVersion: JSON.parse(localStorage.getItem(KEY)).v };
      });
      assert.deepEqual(migrated, { oldSize: 17, oldMargin: 37, oldWidth: 560,
        active: true, mobileCount: 1, mobileWidth: 400, mobileSize: 13,
        bubbleSize: 13, savedVersion: 24 });

      const compat = await page.evaluate(() => {
        const old = S.themes.find(t => t.presetId === 'kakao');
        old.canvas.mode = 'fit'; old.canvas.width = 430;
        S.activeThemeId = old.id; renderCanvas();
        const fitWidth = document.querySelector('#canvas').offsetWidth;
        const cyworld = S.themes.find(t => t.presetId === 'cyworld');
        S.activeThemeId = cyworld.id; renderCanvas();
        const framed = { width: document.querySelector('#canvas').offsetWidth,
          ratio: ratioKey(), shortSide: cyworld.canvas.shortSide ?? null };
        return { fitWidth, framed };
      });
      assert.deepEqual(compat, { fitWidth: 430, framed: { width: 747, ratio: '4:3', shortSide: null } });
      const settingsImport = await page.evaluate(() => {
        const old = S.themes.find(t => t.presetId === 'kakao');
        const incoming = JSON.parse(JSON.stringify(old));
        incoming.id = 'imported-kakao';
        incoming.presetId = '';
        incoming.name = '가져온 카카오';
        incoming.canvas = { ...incoming.canvas, mode: 'ratio', ratio: '3:4' };
        delete incoming.canvas.shortSide;
        incoming.fmt.size = 19;
        incoming.decorHeaderSize = 14;
        const before = S.activeThemeId;
        const result = applySettings({ __type: SETTINGS_TYPE, themes: [incoming] }, new Set(['themes']), 'merge');
        const imported = S.themes.find(t => t.id === 'imported-kakao');
        S.activeThemeId = imported.id;
        const width = ratioCanvasW();
        S.activeThemeId = before;
        return { count: result.length, activeKept: S.activeThemeId === before,
          width, body: imported.fmt.size, header: imported.decorHeaderSize };
      });
      assert.deepEqual(settingsImport, { count: 1, activeKept: true, width: 560, body: 19, header: 14 });

      const multi = await page.evaluate(async () => {
        const chosen = S.themes.find(t => t.presetId === 'mobile-reading');
        S.activeThemeId = chosen.id;
        S.characters = [
          { id: 'a', name: '하늘', avatar: '', position: 'left' },
          { id: 'b', name: '나', avatar: '', position: 'right' }
        ];
        S.blocks = Array.from({ length: 9 }, (_, i) => ({ id: `line-${i}`, type: 'text', asBubble: true,
          speakerId: i % 2 ? 'b' : 'a', text: `대화 ${i + 1}. 비가 그친 뒤 골목을 걸으며 나눈 이야기입니다. 다음 장에도 문장이 순서대로 이어져야 합니다.` }));
        await document.fonts.ready;
        renderCanvas();
        const pages = pageRanges().length;
        let files = [];
        deliver = async items => { files = items.map(item => ({ bytes: item.url.length, name: item.name })); };
        await buildPNG();
        const afterText = document.querySelector('#canvas').innerText;
        const overflow = document.querySelector('#canvas').dataset.paginationOverflow || '';
        return { pages, files, afterText, overflow };
      });
      assert.ok(multi.pages >= 2, JSON.stringify(multi));
      assert.equal(multi.files.length, multi.pages, JSON.stringify(multi));
      assert.ok(multi.files.every(f => f.bytes > 1000));
      assert.equal(multi.overflow, '');
      for (let i = 1; i <= 9; i++) assert.ok(multi.afterText.includes(`대화 ${i}.`));

      const legacyPages = await page.evaluate(async () => {
        const old = S.themes.find(t => t.presetId === 'kakao');
        old.canvas.mode = 'ratio'; old.canvas.ratio = '3:4';
        old.headerLayout = { kakao: { height: 120, top: 24 } };
        S.activeThemeId = old.id;
        renderCanvas();
        const pages = pageRanges().length;
        const headerSize = getComputedStyle(document.querySelector('#canvas .cv-head')).fontSize;
        const headerHeight = document.querySelector('#canvas .cv-head').offsetHeight;
        const headReserve = headHold;
        const ghostTops = [...document.querySelectorAll('#canvas .head-ghost')].map(n => parseInt(n.style.top, 10));
        const pageHeight = pageBox().h;
        let count = 0;
        deliver = async items => { count = items.length; };
        await buildPNG();
        return { pages, count, headerSize, headerHeight, headReserve, ghostTops, pageHeight,
          overflow: document.querySelector('#canvas').dataset.paginationOverflow || '' };
      });
      assert.ok(legacyPages.pages >= 1 && legacyPages.count === legacyPages.pages, JSON.stringify(legacyPages));
      assert.equal(legacyPages.headerSize, '12px');
      assert.equal(legacyPages.headerHeight, 120);
      assert.equal(legacyPages.headReserve, 120);
      assert.deepEqual(legacyPages.ghostTops, Array.from({ length: legacyPages.pages - 1 }, (_, i) => (i + 1) * legacyPages.pageHeight));
      assert.equal(legacyPages.overflow, '');

      const image = await page.evaluate(async () => {
        S.activeThemeId = S.themes.find(t => t.presetId === 'mobile-reading').id;
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="480"><rect width="240" height="480" fill="#dfebdd"/></svg>';
        S.blocks = [{ id: 'image', type: 'image', src: 'data:image/svg+xml,' + encodeURIComponent(svg),
          size: 60, imageRatio: 'original', round: false }];
        renderCanvas();
        const img = document.querySelector('#canvas .blk-image img');
        await img.decode();
        const box = img.getBoundingClientRect();
        let files = [];
        deliver = async items => { files = items.map(item => item.url.length); };
        await buildPNG();
        return { ratio: S.blocks[0].imageRatio, crop: !!S.blocks[0].imageCrop,
          aspect: box.width / box.height, files };
      });
      assert.equal(image.ratio, 'original');
      assert.equal(image.crop, false);
      assert.ok(Math.abs(image.aspect - .5) < .01, JSON.stringify(image));
      assert.ok(image.files.length && image.files.every(bytes => bytes > 1000));
      const landscape = await page.evaluate(async () => {
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="240"><rect width="480" height="240" fill="#dfebdd"/></svg>';
        S.blocks[0].src = 'data:image/svg+xml,' + encodeURIComponent(svg);
        renderCanvas();
        const img = document.querySelector('#canvas .blk-image img');
        await img.decode();
        const box = img.getBoundingClientRect();
        let count = 0;
        deliver = async items => { count = items.length; };
        await buildPNG();
        return { aspect: box.width / box.height, count };
      });
      assert.ok(Math.abs(landscape.aspect - 2) < .01, JSON.stringify(landscape));
      assert.equal(landscape.count, 1);
      await page.evaluate(() => {
        save();
        const stored = JSON.parse(localStorage.getItem(KEY));
        stored.v = 22;
        delete stored.themes.find(t => t.presetId === 'mobile-reading').decorMusicSize;
        localStorage.setItem(KEY, JSON.stringify(stored));
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => S.themes.find(t => t.presetId === 'mobile-reading').decorMusicSize), 14);
      assert.deepEqual(errors, []);
      console.log(engine.name(), JSON.stringify({ migrated, compat, settingsImport, multi: { pages: multi.pages, pngs: multi.files.length }, legacyPages, image, landscape, v22MusicMigration: true }));
      await page.close();
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
