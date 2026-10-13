const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('assert/strict');
(async () => {
  for (const browserType of [chromium, webkit]) {
    const browser = await browserType.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
    const hardBreaks = await page.evaluate(() => {
      const root = document.createElement('div');
      root.innerHTML = '가<br><b>👩‍👩‍👧‍👧나</b><br>';
      document.body.appendChild(root);
      const points = proseSplitPoints(root), range = document.createRange();
      const parts = [];
      for (let i = 1; i < points.length; i++) {
        range.setStart(points[i - 1].node, points[i - 1].offset);
        range.setEnd(points[i].node, points[i].offset);
        parts.push(cloneProseContents(range, root));
      }
      const output = document.createElement('div');
      parts.forEach(part => output.appendChild(part));
      const result = { text: output.textContent === root.textContent,
        breaks: output.querySelectorAll('br').length,
        bold: [...output.querySelectorAll('b')].map(node => node.textContent).join('') };
      root.remove();
      return result;
    });
    assert.ok(hardBreaks.text && hardBreaks.breaks === 2 && hardBreaks.bold.includes('👩‍👩‍👧‍👧'), JSON.stringify(hardBreaks));
    for (const columns of [1, 2, 3]) {
      const result = await page.evaluate(columns => {
        const t = theme();
        t.canvas = { ...DEF_CANVAS, mode: 'ratio', ratio: '16:9', mt: 24, mb: 24, ml: 24, mr: 24 };
        t.fmt = { ...S.format, font: 'KoPubWorld Dotum', size: 19, columns, blockGap: 12, vAlign: 'top' };
        t.header = 'none'; t.frame = 'none'; t.signShow = false;
        S.blocks = [{ id: 'long', type: 'text', asBubble: false,
          text: '\n  서두 👩‍👩‍👧‍👧 é 한글\n' + ('**굵게** 안녕하세요   👩🏽‍🚀 길게이어지는문장\n\n').repeat(55) + '  마지막\n\n' }];
        S.ui.selectedBlockId = null;
        renderCanvas();
        const source = renderBlock(S.blocks[0], theme(), fmt()).querySelector('.blk-text');
        const rows = [...document.querySelectorAll('#canvas .blk[data-id="long"]')];
        const joined = rows.map(r => r.querySelector('.blk-text').textContent).join('');
        const full = source.textContent;
        const budget = pageBox().inner - headHold - footHold;
        const repeatPages = renderPageMarks();
        const repeatRows = document.querySelectorAll('#canvas .blk[data-id="long"]').length;
        const bold = rows.flatMap(r => [...r.querySelectorAll('b')].map(b => b.textContent)).join('');
        const sourceBold = [...source.querySelectorAll('b')].map(b => b.textContent).join('');
        return { columns, rows: rows.length, repeatRows, repeatPages, complete: joined === full,
          boldComplete: bold === sourceBold,
          gap: rows.map((r, i) => ({ start: +r.dataset.sourceStart, end: +r.dataset.sourceEnd, height: r.offsetHeight })),
          budget, pages: document.querySelectorAll('#canvas .pagemark').length + 1 };
      }, columns);
      assert.ok(result.rows > 1, JSON.stringify(result));
      assert.ok(result.complete, JSON.stringify(result));
      assert.ok(result.boldComplete, JSON.stringify(result));
      assert.equal(result.repeatRows, result.rows, JSON.stringify(result));
      assert.equal(result.repeatPages, result.pages, JSON.stringify(result));
      assert.ok(result.gap.every((g, i) => i === 0 || g.start === result.gap[i - 1].end), JSON.stringify(result));
      assert.ok(result.gap.every(g => g.height <= result.budget), JSON.stringify(result));
      console.log(browserType.name(), JSON.stringify({ columns, rows: result.rows, pages: result.pages, budget: result.budget, max: Math.max(...result.gap.map(g => g.height)) }));
    }
    await page.evaluate(() => { window.splitDeliveries = []; deliver = async items => { window.splitDeliveries.push(...items); }; });
    await page.evaluate(() => exportPNG());
    const exported = await page.evaluate(() => ({ count: window.splitDeliveries.length, busy: exportBusy,
      pngs: window.splitDeliveries.every(item => item.url.startsWith('data:image/png;base64,')),
      restored: !document.querySelector("#canvas .row-off"), rows: document.querySelectorAll("#canvas .blk[data-id=long]").length }));
    assert.ok(exported.count > 1, JSON.stringify(exported));
    assert.ok(exported.pngs, JSON.stringify(exported));
    assert.equal(exported.busy, false);
    assert.equal(exported.restored, true);
    console.log(browserType.name(), 'export', JSON.stringify(exported));
    const fill = await page.evaluate(() => {
      const t = theme(); t.fmt.columns = 1; t.fmt.size = 19;
      S.blocks = [
        { id: 'before', type: 'text', text: ('앞 문장\n').repeat(8), asBubble: false },
        { id: 'continue', type: 'text', text: ('이어서 배치할 문장\n').repeat(14), asBubble: false }
      ];
      renderCanvas();
      const rows = [...document.querySelectorAll('#canvas .blk[data-id="continue"]')];
      const expected = renderBlock(S.blocks[1], theme(), fmt()).querySelector('.blk-text').textContent;
      const actual = rows.map(row => row.querySelector('.blk-text').textContent).join('');
      const ranges = pageRanges();
      const flow = flowRows();
      return { fragments: rows.length, complete: expected === actual,
        firstPageHasBoth: flow.slice(...ranges[0]).some(n => n.dataset.id === 'before')
          && flow.slice(...ranges[0]).some(n => n.dataset.id === 'continue'),
        ranges: ranges.length };
    });
    assert.ok(fill.fragments > 1 && fill.complete && fill.firstPageHasBoth, JSON.stringify(fill));
    console.log(browserType.name(), 'fill', JSON.stringify(fill));
    const interaction = await page.evaluate(() => {
      syncCanvasKeyboard();
      const pieces = [...document.querySelectorAll('#canvas .blk[data-id="continue"]')];
      const a = pieces[0].getBoundingClientRect(), b = pieces[1].getBoundingClientRect();
      const x = a.left + a.width / 2, y = a.top + a.height / 2;
      pieces[0].dispatchEvent(new PointerEvent('pointerdown', { pointerId: 91, pointerType: 'mouse', clientX: x, clientY: y, button: 0, bubbles: true }));
      $('#canvas').dispatchEvent(new PointerEvent('pointermove', { pointerId: 91, pointerType: 'mouse',
        clientX: b.left + b.width / 2, clientY: b.top + b.height / 2, bubbles: true }));
      const target = document.querySelector('#canvas .drop-before, #canvas .drop-after')?.dataset.id || '';
      $('#canvas').dispatchEvent(new PointerEvent('pointercancel', { pointerId: 91, bubbles: true }));
      return { label: pieces[1].getAttribute('aria-label'), target,
        sourceStart: +(pieces[1].dataset.sourceStart || 0) };
    });
    assert.ok(interaction.label.includes('이어지는 부분 2/2'), JSON.stringify(interaction));
    assert.equal(interaction.target, 'before', JSON.stringify(interaction));
    console.log(browserType.name(), 'interaction', JSON.stringify(interaction));
    const decorated = await page.evaluate(() => {
      const t = theme(); t.header = 'paper'; t.signShow = true; t.signMaker = '분할 검증';
      t.fmt.columns = 2;
      S.blocks = [{ id: 'decorated', type: 'text', asBubble: false,
        text: ('제목과 서명이 있는 장문 👩‍👩‍👧‍👧\n\n').repeat(45) }];
      renderCanvas();
      return { rows: document.querySelectorAll('#canvas .blk[data-id="decorated"]').length,
        pages: document.querySelectorAll('#canvas .pagemark').length + 1, overflow: $('#canvas').dataset.paginationOverflow || '',
        head: !!document.querySelector('.cv-head.head-flow') };
    });
    assert.ok(decorated.rows > 1 && decorated.head && !decorated.overflow, JSON.stringify(decorated));
    await page.evaluate(() => { window.splitDeliveries = []; });
    await page.evaluate(() => exportPNG());
    const decoratedAfter = await page.evaluate(() => ({ exported: window.splitDeliveries.length,
      preview: document.querySelectorAll('#canvas .pagemark').length + 1,
      overflow: $('#canvas').dataset.paginationOverflow || '' }));
    assert.equal(decoratedAfter.exported, decoratedAfter.preview, JSON.stringify({ decorated, decoratedAfter }));
    console.log(browserType.name(), 'decorated', JSON.stringify({ ...decorated, after: decoratedAfter }));
    for (const header of ['ebook-modern', 'insta-dm']) {
      const layout = await page.evaluate(header => {
        const t = theme(); t.header = header; t.signShow = true; t.fmt.columns = 2;
        S.blocks = [{ id: 'footer-long', type: 'text', asBubble: false,
          text: ('하단 장식이 있는 긴 서술 👩‍👩‍👧‍👧\n').repeat(55) }];
        renderCanvas();
        return { header, pages: document.querySelectorAll('#canvas .pagemark').length + 1,
          overflow: $('#canvas').dataset.paginationOverflow || '' };
      }, header);
      assert.ok(layout.pages > 1 && !layout.overflow, JSON.stringify(layout));
      await page.evaluate(() => { window.splitDeliveries = []; });
      await page.evaluate(() => exportPNG());
      const exported = await page.evaluate(() => window.splitDeliveries.length);
      assert.equal(exported, layout.pages, JSON.stringify({ layout, exported }));
      console.log(browserType.name(), 'footer', JSON.stringify({ ...layout, exported }));
    }
    assert.deepEqual(errors, []);
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
