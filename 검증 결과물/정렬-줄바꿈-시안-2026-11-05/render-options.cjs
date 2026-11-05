const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const styles = [
  ['bubble', 'bubble', 'imessage'], ['quote', 'quote', 'imessage'],
  ['script', 'script', 'imessage'], ['none', 'plain', 'imessage'],
  ['notification', 'notif', 'imessage'], ['tweet', 'sns', 'imessage'],
];
const modes = [
  ['alignment', [
    ['왼쪽 · 단어 유지', 'left', 'keep-all'],
    ['오른쪽 · 단어 유지', 'right', 'keep-all'],
    ['가운데 · 단어 유지', 'center', 'keep-all'],
    ['양쪽 · 단어 유지', 'justify', 'keep-all'],
  ]],
  ['wrapping', [
    ['글자 · 영어와 한글 모두 끊을 수 있음', 'left', 'break-all'],
    ['혼합 · 영어는 단어, 한글은 글자', 'left', 'normal'],
    ['단어 · 영어와 한글 모두 띄어쓰기 우선', 'left', 'keep-all'],
  ]],
];

function picture(bg, fg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${bg}"/><circle cx="50" cy="39" r="22" fill="${fg}"/><circle cx="50" cy="45" r="17" fill="#F1C9AD"/><path d="M8 101q5-43 42-43t42 43" fill="${fg}"/></svg>`);
}

async function setup(page) {
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(([a, b]) => {
    S.characters = [
      { id: 'left', name: '하린', position: 'left', avatar: a },
      { id: 'right', name: '서준', position: 'right', avatar: b },
    ];
    const th = DEF_THEME();
    th.showName = th.showAvatar = th.myName = th.myAvatar = true;
    th.groupRuns = false; th.header = 'none'; th.frame = 'none'; th.signShow = false;
    th.fmt = { ...S.format, font: 'Pretendard', size: 13, lineHeight: 1.55,
      blockGap: 14, vAlign: 'top', align: 'left' };
    th.canvas = { mode: 'fit', width: 440, mt: 26, mb: 26, ml: 30, mr: 30,
      marginDetail: true, marginLink: false };
    S.themes = [th]; S.activeThemeId = th.id;
    window.__optionsTheme = th;
    renderCanvas();
  }, [picture('#E7CBCD', '#4A3540'), picture('#C8DBE7', '#24394A')]);
}

const samples = [
  ['짧은 한·영', 'I missed you. [-]보고 싶었어.[/-]', 'left'],
  ['긴 영어', 'The last train had already left the station, but we stayed beneath the bright sign and listened to the rain. When the lights finally went out, you called my name as if you had been waiting all night.', 'right'],
  ['긴 한글', '비가 완전히 그친 뒤에도 좁은 거리는 조용했다. 우리는 젖은 가로등 아래를 지나 골목 끝의 역으로 천천히 걸어갔다. 마지막 열차는 우리가 오래된 승강장에 도착하기 전에 이미 떠난 뒤였다.', 'left'],
];

async function render(page, [slug, style, preset], [mode, options]) {
  const rules = options.map(([, align, wrap], i) =>
    `#canvas .blk[data-id^="${mode}-${i}-"] .bub {text-align:${align} !important;word-break:${wrap} !important;overflow-wrap:anywhere !important}`
  ).join('\n');
  const sheet = await page.addStyleTag({ content: rules });
  const data = await page.evaluate(async ({ style, preset, mode, options, samples }) => {
    const th = window.__optionsTheme;
    th.bubbleStyle = style; th.bubblePreset = preset;
    S.blocks = options.flatMap(([label], i) => [
      { id: `${mode}-${i}-label`, type: 'text', asBubble: false,
        text: `${String(i + 1).padStart(2, '0')} · ${label}`, sizeLv: -1, color: '#777777' },
      ...samples.map(([sampleLabel, sampleText, speakerId], j) => ({
        id: `${mode}-${i}-${j}`, type: 'text', asBubble: true,
        text: sampleText, speakerId,
      })),
    ]);
    renderCanvas();
    await document.fonts.ready;
    const computed = options.map(([, align, wrap], i) => {
      const el = document.querySelector(`#canvas .blk[data-id="${mode}-${i}-1"] .bub`);
      const cs = getComputedStyle(el);
      return { align: cs.textAlign, wrap: cs.wordBreak };
    });
    let items;
    deliver = async value => { items = value; };
    await buildPNG();
    return { computed, pngs: items?.map(item => item.url) || [] };
  }, { style, preset, mode, options, samples });
  assert.equal(data.pngs.length, 1, `${slug}-${mode}`);
  options.forEach(([, align, wrap], i) => {
    assert.equal(data.computed[i].align, align, `${slug}-${mode} align ${i}`);
    assert.equal(data.computed[i].wrap, wrap, `${slug}-${mode} wrap ${i}`);
  });
  const png = data.pngs[0];
  fs.writeFileSync(path.join(__dirname, `${slug}-${mode}.png`),
    Buffer.from(png.slice(png.indexOf(',') + 1), 'base64'));
  await sheet.evaluate(el => el.remove());
  return data.computed;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await setup(page);
    const results = {};
    for (const style of styles) for (const mode of modes) {
      const key = `${style[0]}-${mode[0]}`;
      results[key] = await render(page, style, mode);
      console.log(key, JSON.stringify(results[key]));
    }
    fs.writeFileSync(path.join(__dirname, 'measurements.json'), JSON.stringify(results, null, 2));
    await page.close();
  } finally { await browser.close(); }
  const safari = await webkit.launch({ headless: true });
  try {
    const page = await safari.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await setup(page);
    await page.evaluate(() => { S.blocks = [{ id: 'probe', type: 'text', asBubble: true,
      speakerId: 'left', text: 'English word [-]한국어 어절[/-]' }]; renderCanvas(); });
    for (const [align, wrap] of [['left', 'keep-all'], ['justify', 'normal'], ['right', 'break-all']]) {
      const rule = await page.addStyleTag({ content: `#canvas .bub{text-align:${align} !important;word-break:${wrap} !important}` });
      const actual = await page.evaluate(() => {
        const s = getComputedStyle(document.querySelector('#canvas .bub'));
        return [s.textAlign, s.wordBreak];
      });
      assert.deepEqual(actual, [align, wrap]);
      await rule.evaluate(el => el.remove());
    }
    console.log('webkit typography CSS: passed');
    await page.close();
  } finally { await safari.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
