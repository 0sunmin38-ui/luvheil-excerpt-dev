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
        S.signatures = [{ id: 's', charName: '해이', maker: '@luvheil' }];
        S.activeSignId = 's';
        const out = [];
        for (const mode of ['fit', 'ratio']) for (const columns of [1, 2]) for (const signShow of [false, true]) {
          const t = { ...DEF_THEME(), id: 'dm-spacing', header: 'insta-dm', signShow,
            canvas: { ...DEF_CANVAS, mode, ratio: '3:4', width: 560, mt: 32, mb: 60, ml: 32, mr: 32 },
            fmt: { ...S.format, font: 'KoPubWorld Dotum', size: 14, columns, blockGap: 20, vAlign: 'top' } };
          S.themes = [t]; S.activeThemeId = t.id;
          S.blocks = Array.from({ length: mode === 'ratio' && columns === 2 ? 24 : 3 }, (_, i) =>
            ({ id: `b${i}`, type: 'text', text: `DM 저장 검증 ${i + 1} 본문을 확인합니다. 본문을 확인합니다.` }));
          renderCanvas();
          const cv = document.querySelector('#canvas');
          const foot = cv.querySelector('.blk.is-footer');
          const dm = cv.querySelector('.cv-foot-insta-dm');
          const body = [...cv.querySelectorAll('.blk:not(.is-footer)')].at(-1);
          const scale = cv.getBoundingClientRect().width / cv.offsetWidth;
          const gap = foot ? Math.round((dm.getBoundingClientRect().top - foot.getBoundingClientRect().bottom) / scale) : null;
          const bodyGap = !foot && body ? Math.round((dm.getBoundingClientRect().top - body.getBoundingClientRect().bottom) / scale) : null;
          const pages = mode === 'fit' ? 1 : Math.round(cv.offsetHeight / pageBox().h);
          let files = [], captures = [];
          deliver = async x => { files = x; };
          const old = renderExact;
          renderExact = async (...args) => {
            const root = args[1];
            const savedFoot = root.querySelector('.blk.is-footer');
            const savedDm = root.querySelector('.cv-foot-insta-dm');
            captures.push({ footCount: root.querySelectorAll('.blk.is-footer').length,
              dmCount: root.querySelectorAll('.cv-foot-insta-dm').length,
              gap: savedFoot && savedDm ? Math.round(savedDm.getBoundingClientRect().top - savedFoot.getBoundingClientRect().bottom) : null });
            return old(...args);
          };
          try { await exportPNG(); if (!files.length) await exportPNG(); } finally { renderExact = old; }
          out.push({ mode, columns, signShow, pages, gap, bodyGap, captures,
            files: files.map(x => ({ png: x.url?.startsWith('data:image/png;base64,'), size: x.url?.length || 0 })) });
        }
        return out;
      });
      for (const c of cases) {
        assert.equal(c.files.length, c.pages, JSON.stringify(c));
        assert.ok(c.files.every(f => f.png && f.size > 1000), JSON.stringify(c));
        assert.ok(c.captures.every(x => x.dmCount === 1 && x.footCount === Number(c.signShow)), JSON.stringify(c));
        if (c.signShow) {
          assert.ok(Math.abs(c.gap - 60) <= 1, JSON.stringify(c));
          assert.ok(c.captures.every(x => Math.abs(x.gap - 60) <= 1), JSON.stringify(c));
        } else assert.ok(c.bodyGap >= 60, JSON.stringify(c));
      }
      report.push({ engine: engine.name(), cases });
      console.log(engine.name(), cases.map(c => `${c.mode}/${c.columns}/${c.signShow ? 'sign' : 'no-sign'}:${c.gap ?? '-'}px/${c.files.length}장`).join(' '));
    } finally { await browser.close(); }
  }
  fs.writeFileSync(__dirname + '/dm-spacing.json', JSON.stringify(report, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; });
