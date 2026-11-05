const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      for (const width of [390, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: 844 }, isMobile: width < 500, hasTouch: width < 500 });
        await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => { setStage('tools'); toggleSettingsPanel(true); });
        const tabs = page.locator('#settingsPanel > .tabs-line .tab-line');
        assert.deepEqual(await tabs.allTextContents(), ['캐릭터', '서명', '테마']);
        for (const [label, index, view] of [
          ['캐릭터', 0, '#charListView'], ['서명', 4, '#signListView'], ['테마', 2, '#themeListView']
        ]) {
          await tabs.getByText(label, { exact: true }).click();
          await page.waitForTimeout(250);
          const state = await page.evaluate(selector => {
            const panel = document.querySelector('#settingsPanel');
            const target = document.querySelector(selector);
            const p = panel.getBoundingClientRect(), t = target.getBoundingClientRect();
            return { active: Number(document.querySelector('#tabSlider').dataset.active),
              selected: panel.querySelector('.tabs-line .tab-line.is-on')?.textContent,
              visible: !target.inert && t.right > p.left && t.left < p.right,
              indicator: parseFloat(document.querySelector('#tabIndicator').style.left) };
          }, view);
          assert.equal(state.active, index);
          assert.equal(state.selected, label);
          assert.equal(state.visible, true, JSON.stringify(state));
          assert.ok(Math.abs(state.indicator - (label === '캐릭터' ? 0 : label === '서명' ? 100 / 3 : 200 / 3)) < .001);
        }
        const editors = await page.evaluate(() => {
          const theme = S.themes[0];
          openThemeEditV2(theme.id);
          const themeState = { active: Number($('#tabSlider').dataset.active),
            selected: $('#settingsPanel .tabs-line .tab-line.is-on')?.textContent };
          setSettingsView(2);
          openSignEditV2('new');
          const signState = { active: Number($('#tabSlider').dataset.active),
            selected: $('#settingsPanel .tabs-line .tab-line.is-on')?.textContent };
          return { themeState, signState };
        });
        assert.deepEqual(editors, { themeState: { active: 3, selected: '테마' },
          signState: { active: 5, selected: '서명' } });
        console.log(engine.name(), width, '캐릭터 → 서명 → 테마', editors);
        await page.close();
      }
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
