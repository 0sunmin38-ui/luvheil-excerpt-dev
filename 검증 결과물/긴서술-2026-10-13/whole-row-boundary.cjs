const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      for (const columns of [1, 2]) for (const columnRatio of ['1:2', '1:1', '2:1']) {
        const result = await page.evaluate(({ columns, columnRatio }) => {
          const th = { ...DEF_THEME(), id: 'whole-row-test', header: 'none', signShow: false,
            canvas: { mode: 'ratio', ratio: '16:9', width: 560, mt: 24, mb: 24, ml: 24, mr: 24,
              marginDetail: true, marginLink: false },
            fmt: { ...S.format, columns, columnRatio, columnGap: 24, size: 19,
              lineHeight: 1.5, blockGap: 12, vAlign: 'top' } };
          S.themes = [th]; S.activeThemeId = th.id;
          S.blocks = [
            { id: 'before', type: 'text', text: Array(10).fill('앞 문장').join('\n') },
            { id: 'target', type: 'text', text: Array(10).fill('이어지는 문장').join('\n') }
          ];
          renderCanvas();
          const rows = [...document.querySelectorAll('#canvas .blk[data-id="target"]')];
          const before = document.querySelector('#canvas .blk[data-id="before"]');
          const source = renderBlock(S.blocks[1], th, th.fmt);
          const widths = columnWidths();
          const budget = pageBox().inner - headHold - footHold;
          const ranges = pageRanges();
          return { fragments: rows.length, text: rows.map(r => r.textContent).join(''),
            source: source.textContent, beforeHeight: before.offsetHeight,
            targetHeight: rows[0].offsetHeight, budget, widths, ranges,
            beforeCol: before.dataset.pageCol || '0', targetCol: rows[0].dataset.pageCol || '0',
            pages: document.querySelectorAll('#canvas .pagemark').length + 1,
            overflow: document.querySelector('#canvas').dataset.paginationOverflow || '' };
        }, { columns, columnRatio });
        assert.equal(result.text, result.source, JSON.stringify(result));
        assert.equal(result.fragments, 1, JSON.stringify({ engine: engine.name(), columns, columnRatio, ...result }));
        assert.equal(result.overflow, '', JSON.stringify(result));
        assert.ok(result.beforeHeight + result.targetHeight + 12 > result.budget, JSON.stringify(result));
        assert.ok(result.targetHeight <= result.budget, JSON.stringify(result));
        console.log(engine.name(), columns, columnRatio, JSON.stringify({
          fragments: result.fragments, pages: result.pages, ranges: result.ranges,
          beforeCol: result.beforeCol, targetCol: result.targetCol }));
      }
      for (const columnRatio of ['1:2', '2:1']) {
        const result = await page.evaluate(columnRatio => {
          const th = S.themes[0];
          th.fmt.columns = 2; th.fmt.columnRatio = columnRatio;
          const [left, right] = columnWidths();
          const wide = Math.max(left, right), narrow = Math.min(left, right);
          const line = '넓은 단에서는 통째로 들어가는 문장입니다. ';
          let count = 0, measured = null;
          for (let n = 4; n < 40; n++) {
            const block = { id: 'target', type: 'text', text: line.repeat(n) };
            S.blocks = [{ id: 'probe', type: 'text', text: '측정' }]; renderCanvas();
            const row = renderBlock(block, th, th.fmt);
            document.querySelector('#canvas').appendChild(row);
            row.style.width = narrow + 'px'; const narrowHeight = row.offsetHeight;
            row.style.width = wide + 'px'; const wideHeight = row.offsetHeight;
            row.remove();
            const budget = pageBox().inner - headHold - footHold;
            if (narrowHeight > budget && wideHeight <= budget) {
              count = n; measured = { narrowHeight, wideHeight, budget }; break;
            }
          }
          if (!count) return { count: 0 };
          S.blocks = columnRatio === '1:2'
            ? [{ id: 'before', type: 'text', text: Array(10).fill('앞 문장').join('\n') },
              { id: 'target', type: 'text', text: line.repeat(count) }]
            : [{ id: 'target', type: 'text', text: line.repeat(count) }];
          renderCanvas();
          const cv = document.querySelector('#canvas');
          const rows = [...cv.querySelectorAll('.blk[data-id="target"]')];
          return { count, ...measured, fragments: rows.length,
            col: rows[0]?.dataset.pageCol || '0', overflow: cv.dataset.paginationOverflow || '' };
        }, columnRatio);
        assert.ok(result.count > 0, JSON.stringify(result));
        assert.equal(result.fragments, 1, JSON.stringify({ engine: engine.name(), columnRatio, ...result }));
        assert.equal(result.overflow, '', JSON.stringify(result));
        assert.equal(result.col, columnRatio === '1:2' ? '1' : '0', JSON.stringify(result));
        console.log(engine.name(), 'unequal', columnRatio, JSON.stringify(result));
      }
      for (const columnRatio of ['1:2', '2:1']) {
        const result = await page.evaluate(columnRatio => {
          const th = S.themes[0]; th.fmt.columns = 2; th.fmt.columnRatio = columnRatio;
          const text = ('좁은 단에서도 이어져야 하는 긴 글입니다. ').repeat(80);
          S.blocks = columnRatio === '1:2'
            ? [{ id: 'long', type: 'text', text }]
            : [{ id: 'before', type: 'text', text: Array(10).fill('앞 문장').join('\n') },
              { id: 'long', type: 'text', text }];
          renderCanvas();
          const cv = document.querySelector('#canvas');
          const rows = [...cv.querySelectorAll('.blk[data-id="long"]')];
          return { fragments: rows.length, complete: rows.map(r => r.textContent).join('') === text,
            overflow: cv.dataset.paginationOverflow || '',
            widths: rows.map(r => r.offsetWidth), heights: rows.map(r => r.offsetHeight),
            slots: rows.map(r => `${Math.floor((r.offsetTop + 1) / pageBox().h)}:${r.dataset.pageCol || '0'}`),
            budget: pageBox().inner - headHold - footHold };
        }, columnRatio);
        assert.ok(result.fragments > 1 && result.complete && !result.overflow,
          JSON.stringify({ engine: engine.name(), columnRatio, ...result }));
        assert.ok(result.heights.every(h => h <= result.budget), JSON.stringify(result));
        assert.equal(new Set(result.slots).size, result.slots.length, JSON.stringify(result));
        console.log(engine.name(), 'oversize', columnRatio, JSON.stringify({ fragments: result.fragments }));
      }
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
