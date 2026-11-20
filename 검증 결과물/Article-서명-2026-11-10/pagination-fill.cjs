const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium, webkit } = require('../../../vbody-web/node_modules/@playwright/test');

(async () => {
  const report = [];
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8775/', { waitUntil: 'domcontentloaded' });
      const cases = await page.evaluate(async () => {
        S.signatures = [{ id: 's', charName: '해이', maker: '@luvheil' }]; S.activeSignId = 's';
        const out = [];
        for (const columns of [1, 2]) for (const signShow of [false, true]) for (const lines of [4, 5, 6]) {
          const t = { ...DEF_THEME(), id: 'pagination-fill', header: 'none', signShow,
            canvas: { ...DEF_CANVAS, mode: 'ratio', ratio: '3:4', width: 560, mt: 32, mb: 32, ml: 32, mr: 32 },
            fmt: { ...S.format, font: 'KoPubWorld Dotum', size: 19, lineHeight: 1.5,
              columns, blockGap: 20, vAlign: 'top' } };
          S.themes = [t]; S.activeThemeId = t.id;
          S.blocks = Array.from({ length: 8 }, (_, i) => ({ id: `b${i}`, type: 'text',
            text: Array.from({ length: lines }, (_, j) => `${i + 1}번 본문 ${j + 1}번째 줄`).join('\n') }));
          renderCanvas();
          const cv = document.querySelector('#canvas'), rows = flowRows();
          const groups = S.blocks.map(b => {
            const pieces = rows.filter(r => r.dataset.id === b.id);
            const original = renderBlock(b, t, t.fmt).querySelector('.blk-text');
            return { id: b.id, pieces: pieces.length,
              complete: pieces.map(r => r.querySelector('.blk-text')?.textContent).join('') === original.textContent,
              heights: pieces.map(r => r.offsetHeight) };
          });
          const pages = cv.querySelectorAll('.pagemark').length + 1;
          const unfilled = columns === 1 ? pageRanges().slice(0, -1).map((range, i) => {
            const last = rows[range[1] - 1];
            return Math.round((i + 1) * pageBox().h - padB() - footHold - last.offsetTop - last.offsetHeight);
          }) : [];
          const firstSplit = groups.find(g => g.pieces > 1);
          let files = [], captures = [];
          deliver = async x => { files = x; };
          const old = renderExact;
          renderExact = async (...args) => {
            captures.push({ text: args[1].textContent.includes('본문'),
              footerCount: args[1].querySelectorAll('.blk-footer').length,
              visible: [...args[1].querySelectorAll('.blk[data-id]:not(.row-off)')]
                .map(r => ({ id: r.dataset.id, text: r.querySelector('.blk-text')?.textContent || '' })) });
            return old(...args);
          };
          try { await exportPNG(); if (!files.length) await exportPNG(); } finally { renderExact = old; }
          out.push({ columns, signShow, lines, pages, firstSplit, groups, unfilled,
            overflow: cv.dataset.paginationOverflow || '', captures: captures.slice(-files.length),
            files: files.map(x => ({ png: x.url?.startsWith('data:image/png;base64,'), size: x.url?.length || 0 })) });
        }
        return out;
      });
      for (const c of cases) {
        assert.equal(c.files.length, c.pages, JSON.stringify(c));
        assert.ok(c.files.every(x => x.png && x.size > 1000), JSON.stringify(c));
        assert.ok(c.groups.every(g => g.complete), JSON.stringify(c));
        assert.equal(c.overflow, '', JSON.stringify(c));
        assert.ok(c.captures.every(x => x.text && x.footerCount === Number(c.signShow)), JSON.stringify(c));
        for (const g of c.groups) {
          const saved = c.captures.flatMap(x => x.visible).filter(x => x.id === g.id).map(x => x.text).join('');
          const source = Array.from({ length: c.lines }, (_, j) => `${Number(g.id.slice(1)) + 1}번 본문 ${j + 1}번째 줄`).join('\n');
          assert.equal(saved, source, JSON.stringify({ case: c, id: g.id }));
        }
        assert.ok(c.groups.flatMap(g => g.pieces > 1 ? g.heights : []).every(h => h >= 20), JSON.stringify(c));
        assert.ok(c.unfilled.every(px => px >= 0 && px < 51), JSON.stringify(c));
        if (c.lines === 6 && c.columns === 1) {
          assert.ok(c.firstSplit, JSON.stringify(c));
          assert.ok(c.firstSplit.heights.every(h => h >= 50), JSON.stringify(c));
        }
      }
      report.push({ engine: engine.name(), cases });
      console.log(engine.name(), cases.map(c => `${c.columns}단/${c.signShow ? '서명' : '없음'}/${c.lines}줄:${c.groups.filter(g => g.pieces > 1).length}분할/${c.pages}장`).join(' '));
    } finally { await browser.close(); }
  }
  fs.writeFileSync(__dirname + '/pagination-fill.json', JSON.stringify(report, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; });
