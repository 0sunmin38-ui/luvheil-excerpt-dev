const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      const results = await page.evaluate(async () => {
        const th = { ...DEF_THEME(), id: 'column-test', header: 'none', signShow: false,
          canvas: { mode: 'ratio', ratio: '3:4', width: 560, mt: 30, mb: 30, ml: 30, mr: 30,
            marginDetail: true, marginLink: false },
          fmt: { ...S.format, columns: 2, columnGap: 24, blockGap: 12, columnRatio: '1:1' } };
        S.themes = [th]; S.activeThemeId = th.id; S.signatures = []; S.activeSignId = null;
        S.blocks = Array.from({ length: 18 }, (_, i) => ({ id: 'col-' + i, type: 'text',
          text: '영어와 한글을 섞어 단 폭과 줄바꿈을 확인합니다. The paragraph flows. ' + i }));
        const out = {};
        for (const mode of ['ratio', 'fit']) for (const pattern of ['1:2', '1:1', '2:1']) {
          th.canvas.mode = mode; th.fmt.columnRatio = pattern; renderCanvas();
          const cv = document.querySelector('#canvas');
          const rows = [...cv.querySelectorAll(':scope > .blk:not(.is-footer)')];
          const widths = columnWidths();
          const right = mode === 'ratio'
            ? rows.find(r => r.dataset.pageCol === '1')
            : rows.find(r => r.getBoundingClientRect().left > cv.getBoundingClientRect().left + padL() + 2);
          out[mode + ':' + pattern] = { widths, rightWidth: right?.offsetWidth || 0,
            height: cv.offsetHeight, scroll: cv.scrollWidth, canvasWidth: cv.offsetWidth,
            pages: cv.querySelectorAll('.pagemark').length + 1 };
        }
        th.canvas.mode = 'ratio'; th.fmt.columnRatio = '1:2'; renderCanvas();
        let images; deliver = async items => { images = items; };
        await buildPNG();
        out.png = images?.every(x => x.url?.startsWith('data:image/png')) && images.length > 0;
        out.firstPng = images?.[0]?.url || null;
        th.canvas.mode = 'fit'; th.fmt.columnRatio = '2:1'; th.header = 'kakao';
        S.signatures = [{ id: 'test-sign', charName: '테스트', maker: '@작성자' }];
        S.activeSignId = 'test-sign'; th.signShow = true; renderCanvas();
        const canvas = document.querySelector('#canvas');
        const head = canvas.querySelector('.cv-head');
        const foot = canvas.querySelector('.blk.is-footer');
        const bodyRows = [...canvas.querySelectorAll(':scope > .blk:not(.is-footer)')];
        out.fitDecor = { headBottom: head?.offsetTop + head?.offsetHeight,
          bodyTop: Math.min(...bodyRows.map(r => parseFloat(r.style.top))),
          bodyBottom: Math.max(...bodyRows.map(r => parseFloat(r.style.top) + r.offsetHeight)),
          footTop: foot && parseFloat(foot.style.top), footBottom: foot && parseFloat(foot.style.top) + foot.offsetHeight,
          canvasHeight: canvas.offsetHeight };
        const source = document.createElement('canvas'); source.width = 240; source.height = 400;
        source.getContext('2d').fillRect(0, 0, 240, 400);
        const textBlocks = S.blocks;
        S.blocks = [{ id: 'fill-image', type: 'image', src: source.toDataURL(), imageRatio: 'fill', round: false }];
        th.header = 'none'; th.signShow = false; th.canvas.mode = 'ratio';
        out.fill = {};
        for (const count of [1, 2]) {
          th.fmt.columns = count; th.fmt.columnRatio = '1:2'; renderCanvas();
          const view = document.querySelector('#canvas .image-fill');
          out.fill[count] = { width: view.offsetWidth, height: view.offsetHeight,
            rowWidth: view.closest('.blk').offsetWidth, expectedHeight: imageFillHeight(document.querySelector('#canvas')),
            overflow: document.querySelector('#canvas').dataset.paginationOverflow || '' };
        }
        th.fmt.columns = 2;
        S.blocks.unshift({ id: 'before-fill', type: 'text', text: '사진 앞의 문장입니다.' });
        renderCanvas();
        const rightView = document.querySelector('#canvas .image-fill');
        out.fillRight = { side: rightView?.closest('.blk')?.dataset.pageCol,
          width: rightView?.offsetWidth, expected: columnWidths()[1] };
        S.blocks.shift();
        th.header = 'kakao'; th.signShow = true; S.signatures = [{ id: 'fill-sign', charName: '테스트', maker: '@작가' }];
        S.activeSignId = 'fill-sign'; renderCanvas();
        const fillCanvas = document.querySelector('#canvas');
        const fillHead = fillCanvas.querySelector('.cv-head');
        const fillView = fillCanvas.querySelector('.image-fill');
        const fillFoot = fillCanvas.querySelector('.blk.is-footer');
        out.fillDecor = { headBottom: fillHead?.getBoundingClientRect().bottom - fillCanvas.getBoundingClientRect().top,
          imageTop: fillView?.getBoundingClientRect().top - fillCanvas.getBoundingClientRect().top,
          imageBottom: fillView?.getBoundingClientRect().bottom - fillCanvas.getBoundingClientRect().top,
          footTop: fillFoot?.getBoundingClientRect().top - fillCanvas.getBoundingClientRect().top };
        let fillImages; deliver = async items => { fillImages = items; };
        await buildPNG();
        out.fillPng = fillImages?.every(x => x.url?.startsWith('data:image/png')) && fillImages.length > 0;
        out.fillFirstPng = fillImages?.[0]?.url || null;
        S.blocks = textBlocks; th.fmt.columns = 2;
        return out;
      });
      for (const mode of ['ratio', 'fit']) for (const pattern of ['1:2', '1:1', '2:1']) {
        const r = results[mode + ':' + pattern];
        assert.ok(r.widths[0] > 0 && r.widths[1] > 0, `${mode}:${pattern} widths`);
        if (pattern === '1:2') assert.ok(r.widths[0] < r.widths[1]);
        if (pattern === '1:1') assert.ok(Math.abs(r.widths[0] - r.widths[1]) <= 1);
        if (pattern === '2:1') assert.ok(r.widths[0] > r.widths[1]);
        assert.ok(r.rightWidth > 0, `${mode}:${pattern} right column missing`);
        assert.ok(r.height > 0 && r.scroll <= r.canvasWidth + 2, `${mode}:${pattern} overflow`);
      }
      assert.equal(results.png, true);
      assert.ok(results.fitDecor.headBottom < results.fitDecor.bodyTop);
      assert.ok(results.fitDecor.bodyBottom < results.fitDecor.footTop);
      assert.ok(results.fitDecor.footBottom <= results.fitDecor.canvasHeight);
      for (const count of [1, 2]) {
        const fill = results.fill[count];
        assert.equal(fill.width, fill.rowWidth);
        assert.equal(fill.height, fill.expectedHeight);
        assert.equal(fill.overflow, '');
      }
      assert.equal(results.fillRight.side, '1');
      assert.equal(results.fillRight.width, results.fillRight.expected);
      assert.ok(results.fillDecor.headBottom <= results.fillDecor.imageTop + 2);
      assert.ok(results.fillDecor.imageBottom <= results.fillDecor.footTop + 2);
      assert.equal(results.fillPng, true);
      if (engine === chromium) fs.writeFileSync(path.join(__dirname, 'image-fill-two-column.png'),
        Buffer.from(results.fillFirstPng.slice(results.fillFirstPng.indexOf(',') + 1), 'base64'));
      if (engine === chromium) fs.writeFileSync(path.join(__dirname, 'two-column-export.png'),
        Buffer.from(results.firstPng.slice(results.firstPng.indexOf(',') + 1), 'base64'));
      const controls = await page.evaluate(() => {
        openThemeEditV2('column-test');
        const section = [...document.querySelectorAll('#themeEditContent .section')]
          .find(x => x.querySelector('.section-header h3')?.textContent === '서식');
        return { count: [...section.querySelectorAll('.field')]
            .find(x => x.querySelector('.lab')?.textContent === '단 수')?.textContent,
          ratios: [...section.querySelectorAll('.column-ratios button')].map(x => x.textContent.trim()) };
      });
      assert.ok(controls.count.includes('1단') && controls.count.includes('2단'));
      assert.ok(!controls.count.includes('3단'));
      assert.deepEqual(controls.ratios, ['1:2', '1:1', '2:1']);
      if (engine === chromium) {
        await page.evaluate(() => {
          const th = S.themes[0]; th.canvas.mode = 'fit'; th.fmt.columnRatio = '1:2'; renderCanvas();
        });
        await page.locator('#canvas').screenshot({ path: path.join(__dirname, 'two-column-fit.png') });
      }
      console.log(engine.name(), 'two column ratios, fit layout and PNG: passed');
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
