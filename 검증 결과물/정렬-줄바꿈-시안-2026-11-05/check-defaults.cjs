const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const styles = [
  ['bubble', 'bubble'], ['quote', 'quote'], ['script', 'script'],
  ['none', 'plain'], ['notification', 'notif'], ['tweet', 'sns'],
];
const longEnglish = 'The last train had already left the station, but we stayed beneath the bright sign and listened to the rain. When the lights finally went out, you called my name as if you had been waiting all night.';
const longKorean = '비가 완전히 그친 뒤에도 좁은 거리는 조용했다. 우리는 젖은 가로등 아래를 지나 골목 끝의 역으로 천천히 걸어갔다. 마지막 열차는 우리가 오래된 승강장에 도착하기 전에 이미 떠난 뒤였다.';
function picture(bg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${bg}"/><circle cx="50" cy="50" r="27" fill="#fff"/></svg>`);
}
async function setup(page) {
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(([left, right]) => {
    S.characters = [
      { id: 'left', name: '하린', position: 'left', avatar: left },
      { id: 'right', name: '서준', position: 'right', avatar: right },
    ];
    const th = DEF_THEME();
    th.showName = th.showAvatar = th.myName = th.myAvatar = true;
    th.groupRuns = false; th.header = 'none'; th.frame = 'none'; th.signShow = false;
    th.fmt = { ...S.format, font: 'Pretendard', size: 13, lineHeight: 1.55,
      blockGap: 14, vAlign: 'top', align: 'center' };
    th.canvas = { mode: 'fit', width: 440, mt: 26, mb: 26, ml: 30, mr: 30,
      marginDetail: true, marginLink: false };
    S.themes = [th]; S.activeThemeId = th.id;
    window.__defaultTheme = th;
    renderCanvas();
  }, [picture('#E7CBCD'), picture('#C8DBE7')]);
}
async function check(page, slug, style, exportPNG) {
  const data = await page.evaluate(async ({ style, longEnglish, longKorean, exportPNG }) => {
    window.__defaultTheme.bubbleStyle = style;
    S.blocks = [
      { id: 'short-left', type: 'text', asBubble: true, speakerId: 'left', text: 'I missed you. 보고 싶었어.' },
      { id: 'english-right', type: 'text', asBubble: true, speakerId: 'right', text: longEnglish },
      { id: 'korean-left', type: 'text', asBubble: true, speakerId: 'left', text: longKorean },
    ];
    renderCanvas();
    await document.fonts.ready;
    const computed = S.blocks.map(b => {
      const row = document.querySelector(`#canvas .blk[data-id="${b.id}"] .blk-bubble`);
      const bub = row.querySelector('.bub');
      const avatar = row.querySelector('.av');
      const css = getComputedStyle(bub);
      return { align: css.textAlign, break: css.wordBreak, overflow: css.overflowWrap,
        right: row.classList.contains('is-me'),
        overflowed: bub.scrollWidth > bub.clientWidth + 1,
        bubbleHeight: bub.getBoundingClientRect().height,
        avatarHeight: avatar?.getBoundingClientRect().height };
    });
    let pngs = [];
    if (exportPNG) {
      deliver = async items => { pngs = items.map(item => item.url); };
      await buildPNG();
    }
    return { computed, pngs };
  }, { style, longEnglish, longKorean, exportPNG });
  const expected = style === 'script' ? ['justify', 'justify', 'justify']
    : style === 'plain' ? ['left', 'right', 'left']
      : ['left', 'left', 'left'];
  assert.deepEqual(data.computed.map(x => x.align), expected, `${slug}: text alignment`);
  assert.deepEqual(data.computed.map(x => x.break), ['normal', 'normal', 'normal'], `${slug}: line breaking`);
  assert.deepEqual(data.computed.map(x => x.overflow), ['break-word', 'break-word', 'break-word'], `${slug}: long token fallback`);
  if (style !== 'bubble') assert.ok(data.computed.every(x => !x.overflowed),
    `${slug}: text overflow ${JSON.stringify(data.computed)}`);
  if (style === 'quote') assert.ok(data.computed[0].bubbleHeight < data.computed[0].avatarHeight,
    `${slug}: single-line quote bar should follow text height`);
  assert.deepEqual(data.computed.map(x => x.right),
    ['quote', 'script', 'notif', 'sns'].includes(style) ? [false, false, false] : [false, true, false],
    `${slug}: speaker position`);
  if (exportPNG) {
    assert.equal(data.pngs.length, 1, `${slug}: PNG count`);
    const uri = data.pngs[0];
    fs.writeFileSync(path.join(__dirname, `applied-${slug}.png`),
      Buffer.from(uri.slice(uri.indexOf(',') + 1), 'base64'));
  }
  return data.computed;
}
(async () => {
  for (const [engine, launch] of [['chromium', chromium], ['webkit', webkit]]) {
    const browser = await launch.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await setup(page);
      for (const [slug, style] of styles) {
        const result = await check(page, slug, style, engine === 'chromium');
        console.log(engine, slug, JSON.stringify(result));
      }
      await page.close();
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
