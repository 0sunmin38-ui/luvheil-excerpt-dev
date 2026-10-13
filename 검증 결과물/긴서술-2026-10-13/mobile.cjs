const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('assert/strict');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const userAgent = engine === webkit
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36';
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      const preview = await page.evaluate(() => {
        const t = theme();
        t.canvas = { ...DEF_CANVAS, mode: 'ratio', ratio: '16:9', mt: 24, mb: 24, ml: 24, mr: 24 };
        t.fmt = { ...S.format, size: 18, columns: 2, font: 'KoPubWorld Dotum', vAlign: 'top' };
        t.header = 'none'; t.signShow = false;
        S.blocks = [{ id: 'mobile-long', type: 'text', asBubble: false,
          text: ('모바일 서술 👩‍👩‍👧‍👧 é\n다음 줄과 **굵게**를 확인합니다.\n').repeat(35) }];
        renderCanvas();
        const rows = [...document.querySelectorAll('#canvas .blk[data-id="mobile-long"]')];
        const original = renderBlock(S.blocks[0], theme(), fmt()).querySelector('.blk-text').textContent;
        return { rows: rows.length, complete: rows.map(row => row.querySelector('.blk-text').textContent).join('') === original,
          pages: document.querySelectorAll('#canvas .pagemark').length + 1, overflow: $('#canvas').dataset.paginationOverflow || '' };
      });
      assert.ok(preview.rows > 1 && preview.complete && !preview.overflow, JSON.stringify(preview));
      await page.evaluate(() => { window.savedPages = []; deliver = async items => window.savedPages.push(...items); });
      await page.evaluate(() => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 20);
        return exportPNG();
      });
      const result = await page.evaluate(() => ({
        exported: window.savedPages.length,
        preview: document.querySelectorAll('#canvas .pagemark').length + 1,
        pngs: window.savedPages.every(item => item.url.startsWith('data:image/png;base64,')),
        busy: exportBusy
      }));
      assert.equal(result.exported, result.preview, JSON.stringify({ preview, result }));
      assert.ok(result.pngs && !result.busy, JSON.stringify(result));
      assert.deepEqual(errors, []);
      console.log(engine.name(), JSON.stringify({ preview, result }));
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
