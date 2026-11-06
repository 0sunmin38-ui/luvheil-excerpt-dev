const { webkit, chromium } = require('/Users/vbody/Desktop/Git source/vbody-web/node_modules/.pnpm/@playwright+test@1.62.1/node_modules/@playwright/test');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const report = [];
  for (const engine of [webkit, chromium]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/130.0.0.0 Mobile/15E148 Safari/604.1' });
      await page.goto('http://127.0.0.1:8774/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(async () => {
        const texts = ['The evening train arrived as the rain stopped.',
          'The last train had already left the station. We waited under the station sign in the rain. Then you said my name, softly enough for me to hear.',
          '비가 그친 뒤에도 거리는 조용했다. 우리는 천천히 역으로 걸어갔다. 마지막 열차는 이미 떠난 뒤였다.',
          '회사 가기 싫다 그래도 가야지…',
          '아주긴단어가공백없이계속이어지는문장입니다ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
          'One line.\nTwo lines.\n세 번째 줄이에요.',
          'The train finally arrived.\n[-]기다리던 열차가 도착했다.[/-]'];
        const th = { ...DEF_THEME(), id: 'probe', showAvatar: false, myAvatar: false, showName: false,
          myName: false, signShow: false, header: 'none', frame: 'none', bubbleStyle: 'bubble', bubblePreset: 'imessage',
          bubbleBg: '#efb4c2', myBubbleBg: '#efb4c2', bubbleFg: '#111111', myBubbleFg: '#111111', bg: '#ffffff',
          fmt: { ...S.format, font: 'Pretendard', size: 14, lineHeight: 1.5, vAlign: 'top', columns: 1 },
          canvas: { mode: 'fit', width: 440, mt: 20, mb: 20, ml: 20, mr: 20, marginDetail: true } };
        S.themes = [th]; S.activeThemeId = th.id;
        S.characters = [{ id: 'a', name: '화자', position: 'left' }, { id: 'b', name: '나', position: 'right' }];
        S.blocks = texts.map((text, i) => ({ id: 'b' + i, type: 'text', asBubble: true, speakerId: i % 2 ? 'a' : 'b', text }));
        renderCanvas(); await ensureFontsLoaded(document.querySelector('#canvas'));
        const css = await fontEmbedCSS(document.querySelector('#canvas').innerText, [400, 800]);
        installExportFontCSS(css); await ensureFontsLoaded(document.querySelector('#canvas'));
        const metrics = root => [...root.querySelectorAll('.bub')].filter(b => b.getClientRects().length).map(b => {
          const r = b.getBoundingClientRect(), parent = b.closest('.col').getBoundingClientRect(), s = getComputedStyle(b);
          const ys = [];
          for (const p of flatChars(b)) {
            const range = document.createRange(); range.setStart(p.node, p.off); range.setEnd(p.node, p.off + 1);
            const q = range.getBoundingClientRect();
            if (q.width && q.height) ys.push(Math.round(q.bottom * 10) / 10);
          }
          return { width: r.width, parentWidth: parent.width, height: r.height, lines: [...new Set(ys)].length,
            overflow: r.left < parent.left - .6 || r.right > parent.right + .6,
            white: s.whiteSpace, word: s.wordBreak, wrap: s.overflowWrap };
        });
        const cases = [], pngs = [], exports = [];
        let exportConfig;
        const realRender = renderExact;
        renderExact = async (...args) => {
          const root = args[1], origin = root.getBoundingClientRect();
          const boxes = [...root.querySelectorAll('.bub')].filter(b => b.getClientRects().length).map(b => {
            const r = b.getBoundingClientRect(); return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
          });
          const url = await realRender(...args), im = new Image(); im.src = url; await im.decode();
          const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
          const g = c.getContext('2d'); g.drawImage(im, 0, 0);
          const d = g.getImageData(0, 0, c.width, c.height).data, kx = c.width / args[2], ky = c.height / args[3];
          let outside = 0, ink = 0;
          for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
            const i = (y * c.width + x) * 4;
            if (d[i + 3] > 200 && d[i] < 90 && d[i + 1] < 90 && d[i + 2] < 90) {
              ink++;
              if (!boxes.some(b => x / kx >= b.x - 1 && x / kx <= b.x + b.w + 1
                && y / ky >= b.y - 1 && y / ky <= b.y + b.h + 1)) outside++;
            }
          }
          exports.push({ ...exportConfig, ink, outside, boxes });
          if (pngs.length < 4) pngs.push(url);
          c.width = c.height = 1; return url;
        };
        let deliveries = 0;
        deliver = async items => { deliveries += items.length; };
        const styles = [['bubble', 'imessage'], ['bubble', 'modern'], ['bubble', 'kakaotalk'],
          ['bubble', 'bubble'], ['plain', 'imessage'], ['quote', 'imessage']];
        for (const [style, preset] of styles) for (const mode of ['fit', 'ratio'])
          for (const [columns, ratio] of [[1, '1:1'], [2, '1:1'], [2, '1:2'], [2, '2:1']]) for (const size of [14, 20]) {
            th.bubbleStyle = style; th.bubblePreset = preset; th.fmt.columns = columns;
            th.fmt.columnRatio = ratio; th.fmt.size = size; th.canvas.mode = mode; th.canvas.ratio = '3:4';
            renderCanvas(); await ensureFontsLoaded(document.querySelector('#canvas')); await raf2();
            const cv = document.querySelector('#canvas'), keep = cv.style.transform; cv.style.transform = 'none';
            const oldCSS = document.createElement('style'); oldCSS.textContent = '.blk-bubble .bub{min-width:auto;max-width:none}';
            document.head.appendChild(oldCSS); const before = metrics(cv); oldCSS.remove();
            const source = metrics(cv), snap = captureClone(cv), clone = metrics(snap.clone); snap.host.remove(); cv.style.transform = keep;
            const changedLines = source.some((s, i) => s.lines !== clone[i].lines);
            cases.push({ style, preset, mode, columns, ratio, size, before, source, clone, changedLines });
            if (style === 'bubble' && preset === 'imessage' && ratio === '1:1' && size === 14) {
              exportConfig = { style, preset, mode, columns, ratio, size }; await buildPNG();
            }
          }
        return { cssBytes: css.length, missingFonts: _fontCSS?.missing, cases, exports, pngs, deliveries };
      });
      result.pngs.forEach((url, i) => fs.writeFileSync(__dirname + '/' + engine.name() + '-' + i + '.png', Buffer.from(url.split(',')[1], 'base64')));
      delete result.pngs; report.push({ engine: engine.name(), ...result });
      fs.writeFileSync(__dirname + '/audit.json', JSON.stringify(report, null, 2));
      const failures = result.cases.filter(c => c.changedLines || c.source.some(b => b.overflow) || c.clone.some(b => b.overflow));
      console.log(engine.name(), JSON.stringify({ cases: result.cases.length, failures: failures.slice(0, 2),
        baselineFailures: result.cases.filter(c => c.before.some(b => b.overflow)).length, exports: result.exports.length,
        pngOutside: result.exports.map(e => e.outside), missingFonts: result.missingFonts }));
      assert.deepEqual(result.missingFonts, []); assert.ok(result.cssBytes > 1000);
      assert.equal(failures.length, 0); assert.ok(result.cases.some(c => c.before.some(b => b.overflow)));
      assert.ok(result.exports.length >= 4 && result.deliveries >= 4);
      assert.ok(result.exports.every(e => e.outside === 0 && e.ink > 100));
    } finally { await browser.close(); }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
