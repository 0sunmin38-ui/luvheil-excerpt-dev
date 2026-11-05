const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

(async () => {
  for (const [name, engine, options] of [['webkit', webkit, {}], ['chrome', chromium, { channel: 'chrome' }]]) {
    const browser = await engine.launch({ headless: true, ...options });
    try {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        S.blocks = [{ id: 'desktop-format', type: 'text', text: '앞 테스트 뒤', asBubble: false }];
        S.ui.selectedBlockId = 'desktop-format';
        S.ui.stage = 'format';
        document.querySelector('#ta').value = S.blocks[0].text;
        render();
        const ta = document.querySelector('#ta');
        const n = textNodesIn(ta)[0], r = document.createRange(), sel = getSelection();
        r.setStart(n, 2); r.setEnd(n, 5);
        sel.removeAllRanges(); sel.addRange(r); trackSel(); renderFormat();
      });
      await page.locator('#formatWrap button[title="크게"]').click();
      const size = await page.evaluate(() => ({
        text: S.blocks[0].text,
        active: document.querySelector('#formatWrap button[title="크게"]')?.getAttribute('aria-pressed')
      }));
      assert.equal(size.text, '앞 [+]테스트[/+] 뒤');
      assert.equal(size.active, 'true');
      await page.locator('#formatWrap button[title="테마 설정 따르기"]').click();
      const reset = await page.evaluate(() => ({ text: S.blocks[0].text, composer: document.querySelector('#ta').value }));
      assert.deepEqual(reset, { text: '앞 테스트 뒤', composer: '앞 테스트 뒤' });
      await page.evaluate(() => {
        const ta = document.querySelector('#ta'), n = textNodesIn(ta)[0], r = document.createRange(), sel = getSelection();
        r.setStart(n, 2); r.setEnd(n, 5);
        sel.removeAllRanges(); sel.addRange(r); trackSel(); renderFormat();
      });
      await page.locator('#formatWrap button[title^="형광펜 —"]').click();
      await page.locator('#popRoot .pop-sw[title="#FFF9C4"]').click();
      const highlight = await page.evaluate(() => ({ text: S.blocks[0].text, visible: document.querySelector('#ta').textContent }));
      assert.equal(highlight.visible, '앞 테스트 뒤');
      assert.match(highlight.text, /^앞 ==\[#(?:[0-9A-F]{6})\]테스트== 뒤$/);
      await page.locator('#formatWrap button[title^="형광펜 —"]').click();
      await page.locator('#popRoot .pop-sw[title="#FFCDD2"]').click();
      const recolored = await page.evaluate(() => ({ text: S.blocks[0].text, visible: document.querySelector('#ta').textContent }));
      assert.equal(recolored.visible, '앞 테스트 뒤');
      assert.match(recolored.text, /^앞 ==\[#(?:[0-9A-F]{6})\]테스트== 뒤$/);
      assert.equal((recolored.text.match(/==/g) || []).length, 2);
      assert.deepEqual(errors, []);
      console.log(name, JSON.stringify({ size, reset, highlight, recolored }));
    } finally {
      await browser.close();
    }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
