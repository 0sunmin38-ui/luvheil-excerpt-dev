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
        const result = await page.evaluate(() => {
          BTN_ADD.click();
          const actionMenuOpened = !ACTION_MENU.hidden;
          BTN_ADD.click();
          setStage('tools');
          openCharEditV2('new');
          const charView = $('#tabSlider').dataset.active;
          S.ui.charDraft.name = '검증 인물';
          saveCharEditV2();
          const charSaved = S.characters.find(char => char.name === '검증 인물');
          openCharEditV2(charSaved.id);
          $('#btnCharDupeV2').click();
          const charCopy = S.characters.find(char => char.name === '검증 인물 사본');
          deleteCharEditV2();
          $('#modalRoot .btn-danger').click();
          const charCopyDeleted = !S.characters.some(char => char.id === charCopy.id);
          switchSettingsTab(1);
          const themeView = $('#tabSlider').dataset.active;
          openThemeEditV2(S.activeThemeId);
          const themeEditView = $('#tabSlider').dataset.active;
          const themeCount = S.themes.length;
          $('#themeEditContent button[title="복제"]').click();
          const themeCopied = S.themes.length === themeCount + 1;
          deleteThemeEditV2();
          $('#modalRoot .btn-danger').click();
          const themeCopyDeleted = S.themes.length === themeCount;
          return { actionMenuOpened, charView, charSaved: !!charSaved, charCopied: !!charCopy, charCopyDeleted, themeView, themeEditView, themeCopied, themeCopyDeleted, legacyPanel: !!$('#toolsWrap'), legacyNav: !!$('#btnNav'), canvas: !!$('#canvas') };
        });
        if (errors.length || !result.actionMenuOpened || result.charView !== '1' || !result.charSaved || !result.charCopied || !result.charCopyDeleted || result.themeView !== '2' || result.themeEditView !== '3' || !result.themeCopied || !result.themeCopyDeleted || result.legacyPanel || result.legacyNav || !result.canvas) {
          throw new Error(JSON.stringify({ engine: engine.name(), width, result, errors }));
        }
        console.log(engine.name(), width, 'OK');
      } finally {
        await browser.close();
      }
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
