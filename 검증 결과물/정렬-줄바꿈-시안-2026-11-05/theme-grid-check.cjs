const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => { setStage('tools'); toggleSettingsPanel(true); setSnap(95); switchSettingsTab(1); renderThemeGridV2(); });
      await page.waitForTimeout(350);
      const state = await page.evaluate(() => {
        const first = S.themes[0];
        const card = document.querySelector('#themeGridContainer .theme-card[data-item-id]');
        return { firstId: first.id, preset: !!presetOf(first),
          action: card.querySelector('.edit-btn').title,
          className: card.className };
      });
      assert.equal(state.preset, true);
      assert.equal(state.action, '복제');
      await page.evaluate(() => openThemeEditV2(S.themes[0].id));
      assert.notEqual(await page.locator('#tabSlider').getAttribute('data-active'), '3', 'preset editor blocked');
      await page.locator(`#themeGridContainer .theme-card[data-item-id="${state.firstId}"] .edit-btn`).evaluate(el => el.click());
      const copy = await page.evaluate(() => ({ active: S.activeThemeId,
        name: S.themes.find(t => t.id === S.activeThemeId)?.name,
        presetId: S.themes.find(t => t.id === S.activeThemeId)?.presetId,
        view: $('#tabSlider').dataset.active }));
      assert.equal(copy.view, '3');
      assert.equal(copy.presetId, undefined);
      assert.match(copy.name, / 사본$/);
      await page.evaluate(() => { S.ui.themeDraft = null; S.ui.editingThemeId = null; setSettingsView(2); renderThemeGridV2(); });
      const custom = page.locator(`#themeGridContainer .theme-card[data-item-id="${copy.active}"]`);
      assert.match(await custom.getAttribute('class'), /is-custom/);
      assert.equal(await custom.locator('.edit-btn').getAttribute('title'), '수정');
      if (engine === chromium) await page.locator('#themeListView').screenshot({
        path: path.join(__dirname, 'applied-theme-grid.png') });

      /* 이동 대상이 화면에 보이도록 한 뒤, 길게 눌러 옆 카드 뒤로 끈다. */
      const before = await page.evaluate(() => S.themes.map(t => t.id));
      const source = page.locator(`#themeGridContainer .theme-card[data-item-id="${state.firstId}"]`);
      const target = page.locator(`#themeGridContainer .theme-card[data-item-id="${before[1]}"]`);
      await source.scrollIntoViewIfNeeded();
      const a = await source.boundingBox(), b = await target.boundingBox();
      await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(450);
      await page.mouse.move(b.x + b.width * .8, b.y + b.height / 2, { steps: 5 });
      await page.mouse.up();
      const after = await page.evaluate(() => S.themes.map(t => t.id));
      assert.equal(after[1], state.firstId, `${engine.name()}: moved preset`);
      await page.reload({ waitUntil: 'domcontentloaded' });
      const persisted = await page.evaluate(() => S.themes.map(t => t.id));
      assert.deepEqual(persisted, after, `${engine.name()}: order persisted`);
      await page.evaluate(() => { setStage('tools'); toggleSettingsPanel(true); setSnap(95); switchSettingsTab(1); renderThemeGridV2(); });
      await page.waitForTimeout(350);
      const touchOrder = await page.evaluate(async () => {
        const cards = [...document.querySelectorAll('#themeGridContainer .theme-card[data-item-id]')];
        const source = cards[1], target = cards[0];
        source.scrollIntoView({ block: 'nearest' });
        const a = source.getBoundingClientRect(), b = target.getBoundingClientRect();
        const send = (el, type, points) => {
          const event = new Event(type, { bubbles: true, cancelable: true });
          Object.defineProperty(event, 'touches', { value: points });
          el.dispatchEvent(event);
        };
        send(source, 'touchstart', [{ clientX: a.left + a.width / 2,
          clientY: a.top + a.height / 2 }]);
        await new Promise(resolve => setTimeout(resolve, 440));
        const activated = source.classList.contains('is-reordering');
        const end = { clientX: b.left + b.width * .2, clientY: b.top + b.height / 2 };
        send(document, 'touchmove', [end]);
        const hit = document.elementFromPoint(end.clientX, end.clientY)?.closest('.theme-card')?.dataset.itemId;
        const marked = target.className;
        send(document, 'touchend', []);
        return { order: S.themes.map(t => t.id), activated, hit, marked,
          source: [a.x, a.y, a.width, a.height], target: [b.x, b.y, b.width, b.height], viewport: [innerWidth, innerHeight] };
      });
      assert.equal(touchOrder.order[0], state.firstId, `${engine.name()}: touch reorder ${JSON.stringify(touchOrder)}`);
      const autoScrolled = await page.evaluate(async () => {
        const view = document.querySelector('#themeListView');
        view.scrollTop = 0;
        const source = view.querySelector('.theme-card[data-item-id]');
        const a = source.getBoundingClientRect(), v = view.getBoundingClientRect();
        const send = (el, type, points) => {
          const event = new Event(type, { bubbles: true, cancelable: true });
          Object.defineProperty(event, 'touches', { value: points });
          el.dispatchEvent(event);
        };
        send(source, 'touchstart', [{ clientX: a.left + a.width / 2, clientY: a.top + a.height / 2 }]);
        await new Promise(resolve => setTimeout(resolve, 440));
        send(document, 'touchmove', [{ clientX: a.left + a.width / 2, clientY: v.bottom - 5 }]);
        await new Promise(resolve => setTimeout(resolve, 160));
        const scrolled = view.scrollTop;
        send(document, 'touchcancel', []);
        return scrolled;
      });
      assert.ok(autoScrolled > 0, `${engine.name()}: edge auto-scroll`);
      console.log(engine.name(), 'preset copy, custom edit, mouse/touch long press reorder, reload: passed');
      await page.close();
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
