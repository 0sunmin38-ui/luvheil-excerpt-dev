const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(() => {
        const b = { id: 'format-check', type: 'text', text: '앞 테스트 뒤', asBubble: false };
        S.blocks = [b];
        S.ui.selectedBlockId = b.id;
        S.ui.stage = 'format';
        const ta = document.querySelector('#ta');
        ta.value = b.text;
        render();
        const select = (start, end) => {
          const n = textNodesIn(ta)[0], r = document.createRange(), sel = getSelection();
          r.setStart(n, start); r.setEnd(n, end);
          sel.removeAllRanges(); sel.addRange(r); trackSel();
        };
        const sizeButton = title => [...document.querySelectorAll('#formatWrap button')].find(x => x.title === title);
        select(2, 5);
        renderFormat();
        sizeButton('크게').click();
        const afterSize = { text: b.text, active: sizeButton('크게')?.getAttribute('aria-pressed'), outside: b.text.includes('앞 ') && b.text.includes(' 뒤') };
        const reset = [...document.querySelectorAll('#formatWrap button')].find(x => x.title === '테마 설정 따르기');
        reset?.click();
        const afterReset = { sizeLv: b.sizeLv ?? null, text: b.text, composer: ta.value };
        b.sizeLv = 1; save(); renderFormat();
        const sizeOnlyResetVisible = !![...document.querySelectorAll('#formatWrap button')].find(x => x.title === '테마 설정 따르기');
        b.sizeLv = 0;
        ta.value = b.text;
        restoreComposerSelection({ start: 2, end: 5 });
        formatSelection(() => applyRich('mark', '#FFE79A'));
        restoreComposerSelection({ start: 3, end: 5 });
        formatSelection(() => applyRich('mark', '#FFAAAA'));
        restoreComposerSelection({ start: 2, end: 5 });
        formatSelection(() => applyRich('mark', '#FFE79A'));
        const highlights = { markup: b.text, visible: ta.textContent };
        ta.value = '앞 **테스트** 뒤'; b.text = ta.value;
        restoreComposerSelection({ start: 2, end: 5 });
        renderFormat();
        const bold = [...document.querySelectorAll('#formatWrap button')].find(x => x.title === '굵게');
        const boldActive = bold?.getAttribute('aria-pressed');
        restoreComposerSelection({ start: 0, end: 5 });
        renderFormat();
        const mixedBold = [...document.querySelectorAll('#formatWrap button')].find(x => x.title === '굵게')?.getAttribute('aria-pressed');
        ta.value = '**가** 나'; b.text = ta.value;
        const nodes = textNodesIn(ta);
        const range = document.createRange(), sel = getSelection();
        range.setStart(nodes[0], 0); range.setEnd(nodes[0], 1);
        sel.removeAllRanges(); sel.addRange(range);
        const firstSig = selectionSig();
        range.setStart(nodes[1], 0); range.setEnd(nodes[1], 1);
        sel.removeAllRanges(); sel.addRange(range);
        const distinctNodeSignature = firstSig !== selectionSig();
        return { afterSize, afterReset, sizeOnlyResetVisible, highlights, boldActive, mixedBold, distinctNodeSignature };
      });
      assert.equal(errors.length, 0, errors.join('\n'));
      assert.equal(result.afterSize.outside, true);
      assert.equal(result.afterSize.active, 'true');
      assert.equal(result.afterReset.text, '앞 테스트 뒤');
      assert.equal(result.afterReset.composer, result.afterReset.text);
      assert.equal(result.sizeOnlyResetVisible, true);
      assert.equal(result.highlights.visible, '앞 테스트 뒤');
      assert.equal(result.highlights.markup.includes('== {{'), false);
      assert.equal(result.boldActive, 'true');
      assert.equal(result.mixedBold, 'mixed');
      assert.equal(result.distinctNodeSignature, true);
      console.log(engine.name(), JSON.stringify(result));
    } finally {
      await browser.close();
    }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
