const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

async function run(engine, width) {
  const executablePath = process.env[engine === chromium ? 'CHROMIUM_EXECUTABLE_PATH' : 'WEBKIT_EXECUTABLE_PATH'];
  const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width, height: 852 }, isMobile: width < 900, hasTouch: width < 900 });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:8765/?fresh=' + Date.now(), { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(() => {
      const block = { id: 'text-layout-check', type: 'text', text: '정렬과 색 버튼의 줄 확인' };
      S.blocks = [block]; S.ui.selectedBlockId = block.id; S.ui.newKind = null;
      setStage('format'); if (innerWidth < 900) setSnap(95); render();
      const line = document.querySelector('#formatWrap .align-color-line');
      const previousLine = line.previousElementSibling;
      const groups = [...line.querySelectorAll(':scope > .tool-grp')];
      const box = node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
      const colorButtons = [...groups[1].querySelectorAll('.icb')];
      return { width: innerWidth, line: box(line), previousGroup: box(previousLine.querySelector('.tool-grp')),
        align: box(groups[0]), color: box(groups[1]),
        buttons: [...line.querySelectorAll('.icb')].map(box), colorButtonGap: box(colorButtons[1]).left - box(colorButtons[0]).right,
        scrollWidth: line.scrollWidth, clientWidth: line.clientWidth };
    });
    assert.deepEqual(errors, []);
    assert.equal(result.buttons.length, 6);
    assert.ok(Math.abs(result.align.top - result.color.top) < 2, JSON.stringify(result));
    assert.ok(result.color.right <= result.line.right + 1, JSON.stringify(result));
    assert.ok(result.align.left >= result.line.left - 1, JSON.stringify(result));
    assert.ok(Math.abs(result.align.left - result.previousGroup.left) < 1, JSON.stringify(result));
    assert.ok(result.scrollWidth <= result.clientWidth + 1, JSON.stringify(result));
    assert.ok(result.colorButtonGap >= (width < 360 ? 5 : 7), JSON.stringify(result));
    console.log(engine.name(), width, 'text align/color passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const width of [320, 360, 390, 402, 430, 1280]) await run(engine, width);
})().catch(error => { console.error(error); process.exitCode = 1; });
