const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      for (const count of [100, 300, 600]) {
        const result = await page.evaluate(count => {
          const t = theme();
          t.canvas = { ...DEF_CANVAS, mode: 'ratio', ratio: '16:9', mt: 24, mb: 24, ml: 24, mr: 24 };
          t.fmt = { ...S.format, size: 18, columns: 2, font: 'KoPubWorld Dotum', vAlign: 'top' };
          t.header = 'none'; t.signShow = false;
          S.blocks = [{ id: 'perf', type: 'text', asBubble: false, text: ('성능 측정 문장과 긴 글의 분할을 확인합니다.\n').repeat(count) }];
          const start = performance.now(); renderCanvas();
          return { count, ms: Math.round(performance.now() - start), fragments: document.querySelectorAll('#canvas .blk[data-id="perf"]').length,
            pages: document.querySelectorAll('#canvas .pagemark').length + 1 };
        }, count);
        console.log(engine.name(), JSON.stringify(result));
      }
    } finally { await browser.close(); }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
