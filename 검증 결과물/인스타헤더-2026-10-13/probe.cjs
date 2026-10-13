const fs = require('fs');
const path = require('path');
const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      page.on('pageerror', error => console.error(engine.name(), 'pageerror', error.message));
      await page.goto('http://127.0.0.1:8767/');
      const metrics = await page.evaluate(async () => {
        const t = S.themes.find(item => item.presetId === 'insta-dm');
        S.activeThemeId = t.id;
        t.fmt.font = 'Bookk Myungjo';
        t.fmt.size = 14;
        S.blocks = [{ id: 'name-probe', type: 'text', text: '인스타그램 헤더 이름 확인', asBubble: true }];
        await ensureFontCss('Bookk Myungjo');
        render();
        await ensureFontsLoaded($('#canvas'));
        renderCanvas();
        const measure = root => {
          const head = root.querySelector('.hd-insta-dm');
          const row = head.querySelector('.hd-row');
          const info = head.querySelector('.hd-user-info');
          const name = head.querySelector('.hd-name');
          const cs = getComputedStyle(name);
          return { width: head.getBoundingClientRect().width, rowWidth: row.getBoundingClientRect().width,
            infoWidth: info.getBoundingClientRect().width, nameWidth: name.getBoundingClientRect().width,
            nameScroll: name.scrollWidth, nameClient: name.clientWidth, text: name.textContent,
            family: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight };
        };
        const preview = measure($('#canvas'));
        const snap = captureClone($('#canvas'));
        const clone = measure(snap.clone);
        const shortOverflow = getComputedStyle(snap.clone.querySelector('.hd-name')).overflow;
        snap.host.remove();
        window.captured = [];
        deliver = async items => { window.captured.push(...items); };
        await exportPNG();
        t.headerTitle = '아주 긴 인스타그램 대화상대 이름을 입력했을 때 정상적인 말줄임을 확인합니다';
        renderCanvas();
        const longSnap = captureClone($('#canvas'));
        const longName = longSnap.clone.querySelector('.hd-name');
        const longCase = { scroll: longName.scrollWidth, client: longName.clientWidth,
          overflow: getComputedStyle(longName).overflow,
          textOverflow: getComputedStyle(longName).textOverflow };
        longSnap.host.remove();
        return { preview, clone, shortOverflow, longCase, count: window.captured.length, png: window.captured[0]?.url };
      });
      if (metrics.png?.startsWith('data:image/png;base64,')) {
        fs.writeFileSync(path.join(__dirname, engine.name() + '-product.png'), Buffer.from(metrics.png.split(',')[1], 'base64'));
      }
      delete metrics.png;
      console.log(engine.name(), JSON.stringify(metrics));
      if (metrics.preview.text !== '대화상대' || metrics.shortOverflow !== 'visible'
          || metrics.longCase.scroll <= metrics.longCase.client
          || metrics.longCase.textOverflow !== 'ellipsis') throw new Error(engine.name() + ' name overflow regression');
    } finally {
      await browser.close();
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
