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
    for (const type of ['image', 'html', 'music', 'divider', 'text']) {
      const result = await page.evaluate(async type => {
        const block = { id: 'header-test', type, text: '테스트', src: '', title: '노래', artist: '가수', html: '<p>테스트</p>' };
        S.blocks = [block]; S.ui.selectedBlockId = block.id; S.ui.newKind = null;
        setStage('format'); if (innerWidth < 900) setSnap(95); render();
        await new Promise(resolve => setTimeout(resolve, 150));
        const wrap = document.querySelector('#formatWrap');
        const header = wrap.querySelector('.edit-header');
        if (!header) return { missing: true };
        const input = document.querySelector('#composerRow');
        const head = document.querySelector('#sheetHead');
        const before = { inputBottom: input.getBoundingClientRect().bottom,
          headBottom: head.getBoundingClientRect().bottom,
          wrapTop: wrap.getBoundingClientRect().top,
          headerTop: header.getBoundingClientRect().top,
          headPaddingBottom: getComputedStyle(head).paddingBottom,
          headBackground: getComputedStyle(head).backgroundColor,
          sectionPaddingTop: getComputedStyle(wrap.querySelector('.sec')).paddingTop,
          headerCapBackground: getComputedStyle(header, '::before').backgroundColor,
          headerCapHeight: getComputedStyle(header, '::before').height };
        const spacer = document.createElement('div'); spacer.style.height = '1200px';
        wrap.querySelector('.sec').appendChild(spacer);
        wrap.scrollTop = 180;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const background = getComputedStyle(header).backgroundColor;
        return { before, scroll: wrap.scrollTop, top: header.getBoundingClientRect().top,
          wrapTop: wrap.getBoundingClientRect().top, secTop: wrap.querySelector('.sec').getBoundingClientRect().top,
          wrapBorder: getComputedStyle(wrap).borderTopWidth, wrapPadding: getComputedStyle(wrap).paddingTop,
          headerStickyTop: getComputedStyle(header).top, headerMargin: getComputedStyle(header).marginTop, background,
          buttons: [...header.querySelectorAll('button')].map(button => button.title) };
      }, type);
      assert.ok(!result.missing, type + ': no header');
      assert.equal(result.before.headPaddingBottom, '8px');
      assert.equal(result.before.sectionPaddingTop, '6px');
      assert.notEqual(result.before.headBackground, 'rgba(0, 0, 0, 0)');
      assert.notEqual(result.before.headerCapBackground, 'rgba(0, 0, 0, 0)');
      assert.ok(parseFloat(result.before.headerCapHeight) >= parseFloat(result.before.sectionPaddingTop) + parseFloat(result.wrapPadding));
      assert.ok(result.scroll > 0, type + ': no scroll ' + JSON.stringify(result));
      assert.ok(Math.abs(result.top - result.wrapTop - parseFloat(result.wrapBorder) - parseFloat(result.wrapPadding)) <= 2, type + ': header moved ' + JSON.stringify(result));
      assert.equal(result.headerMargin, '0px', type + ': transparent gap below header');
      assert.notEqual(result.background, 'rgba(0, 0, 0, 0)', type + ': transparent header');
      assert.ok(result.buttons.includes('확인'), type + ': confirm missing');
    }
    assert.deepEqual(errors, []);
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'composer headers passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
