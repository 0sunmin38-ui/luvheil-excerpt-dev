const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');

(async () => {
  for (const engine of [chromium, webkit]) {
    for (const width of [390, 1440]) {
      const browser = await engine.launch({ headless: true });
      try {
        const page = await browser.newPage({ viewport: { width, height: 900 }, isMobile: width === 390, hasTouch: width === 390 });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto('http://127.0.0.1:8767/');
        const result = await page.evaluate(async () => {
          setStage('tools');
          openThemeEditV2(S.activeThemeId);
          const section = title => [...document.querySelectorAll('#themeEditContent .section')]
            .find(item => item.querySelector('h3')?.textContent === title);
          const decoration = section('장식').querySelector('select');
          decoration.focus();
          decoration.value = 'cyworld';
          decoration.dispatchEvent(new Event('change', { bubbles: true }));
          const newDecoration = section('장식').querySelector('select');
          const decor = {
            value: newDecoration.value,
            frame: S.ui.themeDraft.frame,
            replaced: newDecoration !== decoration,
            refocused: document.activeElement === newDecoration
          };
          const original = ensureFontCss;
          let finishFont;
          ensureFontCss = () => new Promise(resolve => { finishFont = resolve; });
          let changes = 0;
          const font = fontSelect(FONTS[0].name, () => { changes++; });
          document.body.appendChild(font);
          font.value = FONTS[1].name;
          font.dispatchEvent(new Event('change', { bubbles: true }));
          finishFont();
          await Promise.resolve();
          await Promise.resolve();
          font.remove();
          ensureFontCss = original;
          return { decor, fontChanges: changes, canvas: !!$('#canvas') };
        });
        if (errors.length || result.decor.value !== 'cyworld' || result.decor.frame !== 'cyworld' || !result.decor.replaced || result.decor.refocused || result.fontChanges !== 1 || !result.canvas) {
          throw new Error(JSON.stringify({ engine: engine.name(), width, result, errors }));
        }
        console.log(engine.name(), width, 'OK');
      } finally {
        await browser.close();
      }
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
