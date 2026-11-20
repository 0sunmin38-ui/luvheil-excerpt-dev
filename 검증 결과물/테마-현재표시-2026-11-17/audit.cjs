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
    const result = await page.evaluate(async () => {
      setStage('tools'); toggleSettingsPanel(true); setSnap(95); setSettingsView(2); renderThemeGridV2();
      await new Promise(resolve => setTimeout(resolve, 350));
      const grid = document.querySelector('#themeGridContainer');
      const pinned = document.querySelector('#themeListPinned');
      const view = document.querySelector('#themeListView');
      const list = () => [...grid.querySelectorAll('.theme-card[data-item-id]')];
      const firstOrder = list().map(card => card.dataset.itemId);
      const initial = { firstIsCurrent: pinned.firstElementChild.classList.contains('is-current'),
        currentId: S.activeThemeId,
        currentName: pinned.querySelector('.is-current .nm')?.textContent,
        expectedName: S.themes.find(theme => theme.id === S.activeThemeId)?.name,
        activeListId: list().find(card => card.classList.contains('is-on'))?.dataset.itemId,
        listCount: list().length, themeCount: S.themes.length,
        summaryHasId: pinned.firstElementChild.hasAttribute('data-item-id'),
        summaryRole: pinned.firstElementChild.getAttribute('role'),
        ioCount: pinned.querySelectorAll('.io-row button').length,
        editCount: pinned.querySelectorAll('.is-current .edit-btn').length };
      const summary = pinned.querySelector('.is-current');
      const viewBounds = view.getBoundingClientRect();
      const viewPaddingTop = parseFloat(getComputedStyle(view).paddingTop) || 0;
      view.scrollTop = Math.min(220, view.scrollHeight - view.clientHeight);
      await raf2();
      const stickyTop = pinned.getBoundingClientRect().top;
      const scrolled = view.scrollTop;
      summary.click();
      const afterSummaryClick = S.activeThemeId;
      const next = list().find(card => card.dataset.itemId !== S.activeThemeId);
      const nextId = next.dataset.itemId;
      next.click();
      const afterSelect = { id: S.activeThemeId,
        summaryName: pinned.querySelector('.is-current .nm')?.textContent,
        expectedName: S.themes.find(theme => theme.id === S.activeThemeId)?.name,
        activeListId: list().find(card => card.classList.contains('is-on'))?.dataset.itemId,
        order: list().map(card => card.dataset.itemId) };
      const beforeEditCount = S.themes.length;
      pinned.querySelector('.is-current .edit-btn').click();
      const editResult = { view: Number(document.querySelector('#tabSlider').dataset.active), count: S.themes.length,
        activeId: S.activeThemeId, draftId: S.ui.themeDraft?.id,
        name: S.ui.themeDraft?.name };
      return { initial, firstOrder, afterSummaryClick, nextId, afterSelect,
        beforeEditCount, editResult, scrolled, stickyTop, viewTop: viewBounds.top, viewPaddingTop, viewHeight: view.clientHeight, contentHeight: view.scrollHeight,
        gridWidth: grid.getBoundingClientRect().width, gridHeight: grid.getBoundingClientRect().height,
        viewportWidth: innerWidth, panelClass: document.querySelector('.settings-panel')?.className };
    });
    assert.deepEqual(errors, []);
    assert.equal(result.initial.firstIsCurrent, true);
    assert.equal(result.initial.currentName, result.initial.expectedName);
    assert.equal(result.initial.activeListId, result.initial.currentId);
    assert.equal(result.initial.listCount, result.initial.themeCount);
    assert.equal(result.initial.summaryHasId, false);
    assert.equal(result.initial.summaryRole, 'status');
    assert.equal(result.initial.ioCount, 2);
    assert.equal(result.initial.editCount, 1);
    assert.ok(result.scrolled > 0, JSON.stringify(result));
    assert.ok(Math.abs(result.stickyTop - result.viewTop) <= 2, JSON.stringify(result));
    assert.equal(result.afterSummaryClick, result.initial.currentId);
    assert.equal(result.afterSelect.id, result.nextId);
    assert.equal(result.afterSelect.activeListId, result.nextId);
    assert.equal(result.afterSelect.summaryName, result.afterSelect.expectedName);
    assert.deepEqual(result.afterSelect.order, result.firstOrder);
    assert.equal(result.editResult.view, 3);
    assert.equal(result.editResult.count, result.beforeEditCount + 1);
    assert.equal(result.editResult.activeId, result.editResult.draftId);
    assert.match(result.editResult.name, /사본$/);
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'theme current passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
