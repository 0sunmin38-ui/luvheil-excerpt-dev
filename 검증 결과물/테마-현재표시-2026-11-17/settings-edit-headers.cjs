const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

async function run(engine, mobile) {
  const executablePath = process.env[engine === chromium ? 'CHROMIUM_EXECUTABLE_PATH' : 'WEBKIT_EXECUTABLE_PATH'];
  const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage(mobile
      ? { viewport: { width: 390, height: 667 }, isMobile: true, hasTouch: true }
      : { viewport: { width: 1280, height: 900 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:8765/?fresh=' + Date.now(), { waitUntil: 'domcontentloaded' });
    for (const kind of ['character', 'sign', 'theme']) {
      const result = await page.evaluate(async kind => {
        S.ui.charDraft = null; S.ui.signDraft = null; S.ui.themeDraft = null;
        setStage('tools'); toggleSettingsPanel(true); if (innerWidth < 900) setSnap(95);
        if (kind === 'character') openCharEditV2('new');
        else if (kind === 'sign') openSignEditV2('new');
        else {
          const custom = JSON.parse(JSON.stringify(S.themes[0]));
          custom.id = uid(); custom.name = '헤더 검사'; delete custom.presetId;
          S.themes.push(custom); openThemeEditV2(custom.id);
        }
        await new Promise(resolve => setTimeout(resolve, 350));
        const view = document.querySelector(kind === 'character' ? '#charEditView' : kind === 'sign' ? '#signEditView' : '#themeEditView');
        const header = view.querySelector('.edit-header');
        const next = header.nextElementSibling;
        const initialGap = next.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
        const headerPosition = getComputedStyle(header).position;
        const headerMarginBottom = getComputedStyle(header).marginBottom;
        const spacer = document.createElement('div'); spacer.style.height = '1200px';
        (kind === 'theme' ? document.querySelector('#themeEditContent') : view).appendChild(spacer);
        view.scrollTop = 220;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const viewRect = view.getBoundingClientRect(), headerRect = header.getBoundingClientRect();
        return { scroll: view.scrollTop, viewTop: viewRect.top, viewLeft: viewRect.left, viewRight: viewRect.right,
          headerTop: headerRect.top, headerLeft: headerRect.left, headerRight: headerRect.right,
          background: getComputedStyle(header).backgroundColor, initialGap, headerPosition, headerMarginBottom,
          buttons: header.querySelectorAll('button').length };
      }, kind);
      assert.ok(result.scroll > 0, kind + ': no scroll ' + JSON.stringify(result));
      if (kind === 'theme') {
        assert.ok(Math.abs(result.headerTop - result.viewTop) <= 2, kind + ': header not pinned ' + JSON.stringify(result));
        assert.ok(Math.abs(result.headerLeft - result.viewLeft) <= 2, kind + ': left gap ' + JSON.stringify(result));
        assert.ok(Math.abs(result.headerRight - result.viewRight) <= 2, kind + ': right gap ' + JSON.stringify(result));
        assert.notEqual(result.background, 'rgba(0, 0, 0, 0)', kind + ': transparent header');
      } else {
        assert.equal(result.headerPosition, 'static');
        assert.equal(result.headerMarginBottom, '12px');
        assert.ok(result.initialGap >= 11 && result.initialGap <= 13, kind + ': field spacing changed ' + JSON.stringify(result));
      }
      assert.ok(result.buttons >= 3, kind + ': buttons missing');
    }
    assert.deepEqual(errors, []);
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'settings editor headers passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
