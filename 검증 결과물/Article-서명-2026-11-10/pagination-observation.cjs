const fs = require('node:fs');
const { chromium, webkit } = require('../../../vbody-web/node_modules/@playwright/test');

(async () => {
  const report = [];
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8775/', { waitUntil: 'domcontentloaded' });
      const cases = await page.evaluate(() => {
        S.signatures = [{ id: 's', charName: '해이', maker: '@luvheil' }]; S.activeSignId = 's';
        const out = [];
        for (const columns of [1]) for (const signShow of [false, true]) {
          const t = { ...DEF_THEME(), id: 'pagination-observation', header: 'none', signShow,
            canvas: { ...DEF_CANVAS, mode: 'ratio', ratio: '3:4', width: 560, mt: 32, mb: 32, ml: 32, mr: 32 },
            fmt: { ...S.format, font: 'KoPubWorld Dotum', size: 19, lineHeight: 1.5,
              columns, blockGap: 20, vAlign: 'top' } };
          S.themes = [t]; S.activeThemeId = t.id;
          S.blocks = Array.from({ length: 8 }, (_, i) => ({ id: `b${i}`, type: 'text',
            text: Array.from({ length: 6 }, (_, j) => `${i + 1}번 본문 ${j + 1}번째 줄`).join('\n') }));
          renderCanvas();
          const rows = flowRows(), ranges = pageRanges(), box = pageBox();
          const units = ranges.map((range, i) => {
            const group = rows.slice(...range), last = group.at(-1);
            return { unit: i + 1, ids: group.map(x => x.dataset.id),
              lastBottom: Math.round(last.offsetTop + last.offsetHeight),
              unused: Math.round((Math.floor(i / columns) + 1) * box.h - padB() - footHold
                - (last.offsetTop + last.offsetHeight)) };
          });
          out.push({ columns, signShow, pageHeight: box.h, contentBudget: box.inner - pageRangeHold,
            rowHeights: rows.map(x => x.offsetHeight), splitCount: rows.filter(x => x.dataset.split).length,
            units });
        }
        return out;
      });
      report.push({ engine: engine.name(), cases });
      console.log(engine.name(), JSON.stringify(cases));
    } finally { await browser.close(); }
  }
  fs.writeFileSync(__dirname + '/pagination-observation.json', JSON.stringify(report, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; });
