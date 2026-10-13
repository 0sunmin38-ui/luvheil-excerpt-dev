const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      const defaults = await page.evaluate(() => ({
        signatures: S.signatures.length, activeSignId: S.activeSignId,
        allJustified: PRESET_THEMES.every(t => t.fmt.align === 'justify'),
        fit: ['chapter', 'newspapers'].every(id => PRESET_THEMES.find(t => t.presetId === id).canvas.mode === 'fit')
      }));
      assert.deepEqual(defaults, { signatures: 0, activeSignId: null, allJustified: true, fit: true });
      await page.evaluate(() => {
        const old = ['chapter', 'newspapers'].map(id => structuredClone(PRESET_THEMES.find(t => t.presetId === id)));
        old[0].fmt.align = old[1].fmt.align = 'left';
        old[0].canvas.mode = old[1].canvas.mode = 'ratio';
        localStorage.setItem(KEY, JSON.stringify({ v: 17, themes: old, activeThemeId: old[0].id,
          signatures: [{ id: 'old-seed', charName: '해이', maker: '@luvheil' }], activeSignId: 'old-seed' }));
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      const migrated = await page.evaluate(() => ({
        allJustified: S.themes.every(t => t.fmt.align === 'justify'),
        fit: S.themes.every(t => t.canvas.mode === 'fit'),
        signatures: S.signatures.length, activeSignId: S.activeSignId
      }));
      assert.deepEqual(migrated, { allJustified: true, fit: true, signatures: 0, activeSignId: null });
      const result = await page.evaluate(async () => {
        const preset = PRESET_THEMES.find(t => t.presetId === 'newspapers');
        S.themes = [{ ...structuredClone(preset), id: 'test-news' }];
        S.activeThemeId = 'test-news';
        S.blocks = Array.from({ length: 22 }, (_, i) => ({ id: `text-${i}`, type: 'text',
          text: `제${i + 1}문단. 강남 진입로에서 차가 한 번 막혔다. 아침 햇살이 유리 위를 느리게 기어 올라와 대시보드 위에 얼룩을 만들었다. `.repeat(2) }));
        S.signatures = []; S.activeSignId = null;
        renderCanvas();
        await document.fonts.ready;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        renderCanvas();
        const cv = document.querySelector('#canvas');
        const measure = root => ({
          width: root.offsetWidth, height: root.offsetHeight, scrollWidth: root.scrollWidth,
          scrollHeight: root.scrollHeight, cols: getComputedStyle(root).columnCount,
          children: [...root.querySelectorAll(':scope > .blk')].map(node => ({
            id: node.dataset.id, x: Math.round(node.getBoundingClientRect().left - root.getBoundingClientRect().left),
            y: Math.round(node.getBoundingClientRect().top - root.getBoundingClientRect().top),
            w: Math.round(node.getBoundingClientRect().width) }))
        });
        const before = measure(cv);
        const snap = captureClone(cv);
        const after = measure(snap.clone);
        snap.host.remove();
        return { before, after };
      });
      console.log(engine.name(), '2단', result.before.scrollWidth, result.after.scrollWidth);
      assert.equal(result.before.scrollWidth, result.before.width);
      assert.equal(result.after.scrollWidth, result.after.width);
      const exports = await page.evaluate(async () => {
        const captured = [];
        const originalRenderExact = renderExact;
        let captureCalls = 0;
        renderExact = async (...args) => { captureCalls++; return originalRenderExact(...args); };
        window.__realDeliver = deliver;
        deliver = async items => {
          const image = new Image();
          image.src = items[0].url;
          await image.decode();
          const sample = document.createElement('canvas');
          sample.width = 128; sample.height = 128;
          const ctx = sample.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(image, 0, 0, sample.width, sample.height);
          const data = ctx.getImageData(0, 0, sample.width, sample.height).data;
          let nonwhite = 0;
          for (let i = 0; i < data.length; i += 4)
            if (Math.min(data[i], data[i + 1], data[i + 2]) < 215) nonwhite++;
          captured.push({ width: image.width, height: image.height, nonwhite, bytes: items[0].url.length,
            visible: await pngHasVisibleInk(items[0].url, '#FFFFFF') });
        };
        await buildPNG();
        await buildPNG();
        renderExact = originalRenderExact;
        return { captured, captureCalls };
      });
      console.log(engine.name(), 'exports', JSON.stringify(exports));
      assert.equal(exports.captured.length, 2);
      assert.ok(exports.captured.every(item => item.nonwhite > 100 && item.visible));
      assert.equal(exports.captureCalls, engine === webkit ? 3 : 2);
      const extra = await page.evaluate(async () => {
        const t = theme(); t.fmt.columns = 3; renderCanvas();
        await document.fonts.ready;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        renderCanvas();
        const cv = document.querySelector('#canvas');
        const originalThree = { scrollWidth: cv.scrollWidth, width: cv.offsetWidth, height: cv.offsetHeight };
        const three = captureClone(cv);
        const cols = [...three.clone.querySelectorAll(':scope > .blk')].map(n => Math.round(n.getBoundingClientRect().left - three.clone.getBoundingClientRect().left));
        const threeResult = { scrollWidth: three.clone.scrollWidth, width: three.clone.offsetWidth,
          height: three.clone.offsetHeight, columns: [...new Set(cols)], originalThree };
        three.host.remove();
        let exportThree = null;
        deliver = async items => {
          const image = new Image(); image.src = items[0].url; await image.decode();
          const sample = document.createElement('canvas'); sample.width = 192; sample.height = 320;
          const ctx = sample.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(image, 0, 0, 192, 320);
          const pixels = ctx.getImageData(0, 0, 192, 320).data;
          const ink = [0, 0, 0];
          for (let y = 0; y < 320; y++) for (let x = 0; x < 192; x++) {
            const p = (y * 192 + x) * 4;
            if (Math.min(pixels[p], pixels[p + 1], pixels[p + 2]) < 180) ink[Math.floor(x / 64)]++;
          }
          exportThree = { width: image.width, height: image.height, ink };
        };
        await buildPNG();
        Object.assign(t, structuredClone(PRESET_THEMES.find(p => p.presetId === 'chapter')), { id: t.id });
        const articleColumns = [];
        for (const count of [2, 3]) {
          t.fmt.columns = count;
          renderCanvas();
          const copy = captureClone(cv);
          articleColumns.push({ count, width: copy.clone.offsetWidth, scrollWidth: copy.clone.scrollWidth });
          copy.host.remove();
        }
        t.fmt.columns = 1;
        S.blocks = [{ id: 'article-text', type: 'text', text: '기사 본문 한 문장.' }];
        renderCanvas();
        const article = { top: document.querySelector('.hd-paper').offsetTop,
          padding: parseFloat(getComputedStyle(cv).paddingTop), height: cv.offsetHeight };
        const blank = document.createElement('canvas'); blank.width = blank.height = 2;
        blank.getContext('2d').fillStyle = '#FFFFFF'; blank.getContext('2d').fillRect(0, 0, 2, 2);
        const blankUrl = blank.toDataURL('image/png');
        blank.width = blank.height = 32;
        blank.getContext('2d').fillStyle = '#FFFFFF'; blank.getContext('2d').fillRect(0, 0, 32, 32);
        const validUrl = blank.toDataURL('image/png');
        const requested = [];
        download = url => requested.push(url.slice(0, 5));
        await window.__realDeliver([{ url: validUrl, name: 'test.png' }]);
        const saveSheetOpened = document.querySelector('#saveSheet').classList.contains('is-on');
        if (saveSheetOpened) [...document.querySelectorAll('#saveSheet .savesheet-acts button')]
          .find(button => button.textContent.includes('이미지 내려받기'))?.click();
        await new Promise(resolve => setTimeout(resolve, 50));
        return { threeResult, exportThree, articleColumns, article, blank: blankUrl, requested, saveSheetOpened };
      });
      console.log(engine.name(), '3단', JSON.stringify(extra.threeResult), 'Article', extra.article);
      assert.equal(extra.threeResult.scrollWidth, extra.threeResult.width);
      assert.equal(extra.threeResult.columns.length, 3);
      assert.ok(extra.exportThree?.ink.every(n => n > 50), JSON.stringify(extra.exportThree));
      assert.ok(extra.articleColumns.every(item => item.width === item.scrollWidth), JSON.stringify(extra.articleColumns));
      assert.ok(extra.article.top >= extra.article.padding);
      assert.equal(await page.evaluate(url => pngHasVisibleInk(url, '#FFFFFF'), extra.blank), false);
      assert.equal(extra.saveSheetOpened, engine === webkit);
      assert.deepEqual(extra.requested, [engine === webkit ? 'blob:' : 'data:']);
      console.log(engine.name(), '3단·Article 위 여백·빈 PNG 감지 확인');
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
