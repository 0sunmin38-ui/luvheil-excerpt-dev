const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:8767/');
      const result = await page.evaluate(async () => {
        S.blocks = [{ id: 'dead-code-png', type: 'text', text: '죽은 코드 정리 후 PNG 확인', asBubble: false }];
        render();
        window.captured = [];
        deliver = async items => { window.captured.push(...items); };
        await exportPNG();
        return { count: window.captured.length, png: window.captured.every(item => item.url.startsWith('data:image/png;base64,')), busy: exportBusy };
      });
      if (errors.length || result.count < 1 || !result.png || result.busy) throw new Error(JSON.stringify({ engine: engine.name(), result, errors }));
      console.log(engine.name(), 'PNG OK');
    } finally {
      await browser.close();
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
