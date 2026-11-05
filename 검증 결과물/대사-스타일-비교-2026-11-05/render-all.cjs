const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const outDir = __dirname;
const styles = [
  ['bubble-plain', 'bubble', 'plain'],
  ['bubble-modern', 'bubble', 'modern'],
  ['bubble-imessage', 'bubble', 'imessage'],
  ['bubble-kakaotalk', 'bubble', 'kakaotalk'],
  ['bubble-app', 'bubble', 'bubble'],
  ['quote', 'quote', 'imessage'],
  ['script', 'script', 'imessage'],
  ['notification', 'notif', 'imessage'],
  ['tweet', 'sns', 'imessage'],
  ['none', 'plain', 'imessage'],
];

async function setup(page) {
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const portrait = (bg, hair, skin) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${bg}"/><circle cx="50" cy="42" r="26" fill="${hair}"/><ellipse cx="50" cy="52" rx="21" ry="25" fill="${skin}"/><path d="M8 104q5-43 42-43t42 43" fill="${hair}"/><circle cx="43" cy="49" r="2"/><circle cx="57" cy="49" r="2"/><path d="M43 62q7 5 14 0" fill="none" stroke="#713e35" stroke-width="2"/></svg>`);
    S.characters = [
      { id: 'a', name: '하린', position: 'left', avatar: portrait('#E6C8C8', '#493339', '#F6D8BD') },
      { id: 'b', name: '서준', position: 'right', avatar: portrait('#C6D8E4', '#26384C', '#EBC5A9') },
    ];
    const th = DEF_THEME();
    th.name = '대사 스타일 비교'; th.showName = true; th.showAvatar = true;
    th.myName = true; th.myAvatar = true; th.groupRuns = true;
    th.header = 'none'; th.frame = 'none'; th.signShow = false;
    th.fmt = { ...S.format, font: 'Pretendard', size: 13, lineHeight: 1.55,
      blockGap: 18, runGap: 4, vAlign: 'top', align: 'left' };
    th.canvas = { mode: 'fit', width: 440, mt: 30, mb: 30, ml: 32, mr: 32,
      marginDetail: true, marginLink: false };
    S.themes = [th]; S.activeThemeId = th.id;
    window.__sheetTheme = th;
    const label = (i, text) => ({ id: `label-${i}`, type: 'text', text,
      asBubble: false, sizeLv: -1, color: '#777777' });
    const bubble = (i, text, speakerId) => ({ id: `sample-${i}`, type: 'text', text,
      asBubble: true, speakerId });
    S.blocks = [
      label(1, '01 · 3단어 이내'),
      bubble(1, 'Hello [-]안녕[/-]', 'a'),
      label(2, '02 · 한 줄을 채운 대사'),
      bubble(2, 'The evening train arrived as [-]비가 그쳤다[/-]', 'b'),
      label(3, '03 · 한 대사 안의 3줄'),
      bubble(3, 'The room fell quiet as the rain passed. I stayed by the door and listened for your steps. No one came back before the lights went out.', 'a'),
      label(4, '04 · 영어 자동 3줄 + 작은 한글 번역'),
      bubble(4, 'The last train had already left the station. We waited under the station sign in the rain. Then you said my name, softly enough for me to hear.\n[-]막차는 이미 역을 떠났다. 우리는 빗속에서 역 표지판 아래 기다렸다. 그때 너는 나지막이 내 이름을 불렀다.[/-]', 'b'),
      label(5, '05 · 같은 화자의 대사 3개 연속 묶기'),
      bubble(5, 'Did you see that?', 'a'),
      bubble(6, 'The lights went out.', 'a'),
      bubble(7, '[-]그리고 문이 열렸어.[/-]', 'a'),
      label(6, '06 · 한글 자동 줄바꿈 3줄'),
      bubble(8, '비가 그친 뒤에도 거리는 조용했다. 우리는 천천히 역으로 걸어갔다. 마지막 열차는 이미 떠난 뒤였다.', 'a'),
    ];
    renderCanvas();
  });
}

async function checkDefaults(page) {
  return page.evaluate(() => {
    const th = window.__sheetTheme;
    const originalBlocks = S.blocks;
    const result = {};
    for (const style of ['bubble', 'quote', 'script', 'notif', 'sns', 'plain']) {
      th.bubbleStyle = style; th.groupRuns = false; renderCanvas();
      openThemeEditV2(th.id);
      const button = [...document.querySelectorAll('#themeEditView .seg button')]
        .find(b => b.textContent.trim() === ({ bubble: '말풍선', quote: '인용', script: '각본',
          notif: '알림', sns: '트윗', plain: '없음' }[style]));
      if (!button) throw new Error(`style button missing: ${style}`);
      button.click();
      result[style] = { grouped: S.ui.themeDraft.groupRuns,
        toggleVisible: !![...document.querySelectorAll('#themeEditView .setting-assist')]
          .find(n => n.textContent.includes('대사 묶기')),
        avatarControls: style === 'script' ? ['좌측 프로필', '우측 프로필'].every(label =>
          [...document.querySelectorAll('#themeEditView *')].some(n => n.textContent?.trim() === label)) : true };
      S.ui.themeDraft = null; S.ui.editingThemeId = null;
      th.groupRuns = true;
      S.blocks = [
        { id: 'run-a', type: 'text', text: 'First [-]첫째[/-]', asBubble: true, speakerId: 'a' },
        { id: 'run-b', type: 'text', text: 'Second [-]둘째[/-]', asBubble: true, speakerId: 'a' },
      ];
      renderCanvas();
      result[style].runApplied = !!document.querySelector('#canvas .blk[data-id="run-b"].is-run');
    }
    S.blocks = originalBlocks;
    renderCanvas();
    return result;
  });
}

async function renderSheet(page, [slug, style, preset]) {
  const result = await page.evaluate(async ({ style, preset }) => {
    const th = window.__sheetTheme;
    th.bubbleStyle = style; th.bubblePreset = preset; th.groupRuns = true;
    renderCanvas();
    await document.fonts.ready;
    const englishLines = id => {
      const bub = document.querySelector(`#canvas .blk[data-id="${id}"] .bub`);
      const node = [...bub.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (!node) throw new Error(`English text missing: ${id}`);
      const range = document.createRange();
      range.setStart(node, 0);
      range.setEnd(node, node.textContent.endsWith('\n') ? node.length - 1 : node.length);
      return new Set([...range.getClientRects()].filter(r => r.width > 0)
        .map(r => Math.round(r.top * 10) / 10)).size;
    };
    const chooseThreeLines = (id, groups, translated) => {
      const block = S.blocks.find(b => b.id === id);
      let best = null;
      for (const a of groups[0]) for (const b of groups[1]) for (const c of groups[2]) {
        const parts = [a, b, c];
        const english = parts.map(p => translated ? p[0] : p).join(' ');
        const korean = translated ? parts.map(p => p[1]).join(' ') : '';
        block.text = english + (translated ? `\n[-]${korean}[/-]` : '');
        renderCanvas();
        const count = englishLines(id);
        if (count === 3 && (!best || english.length > best.english.length))
          best = { text: block.text, english, korean };
      }
      if (!best) throw new Error(`No automatic three-line sample: ${id} / ${style} / ${preset}`);
      block.text = best.text;
      renderCanvas();
      return { english: best.english, korean: best.korean, lines: englishLines(id),
        manualBreaks: (best.text.match(/\n/g) || []).length };
    };
    const case3 = chooseThreeLines('sample-3', [
      ['The room fell quiet.', 'The room fell quiet as the rain passed.',
        'The room fell quiet as the last rain passed over the windows.'],
      ['I stayed by the door.', 'I stayed by the door and listened for your steps.',
        'I stayed by the door and listened for your steps in the hall.'],
      ['No one came back.', 'No one came back before the lights went out.',
        'No one came back before the lights went out across the street.'],
    ], false);
    const case4 = chooseThreeLines('sample-4', [
      [['The last train had left.', '막차는 떠났다.'],
        ['The last train had already left the station.', '막차는 이미 역을 떠났다.'],
        ['The last train had already left the quiet station.', '막차는 이미 조용한 역을 떠났다.']],
      [['We waited under the sign.', '우리는 표지판 아래서 기다렸다.'],
        ['We waited under the station sign in the rain.', '우리는 빗속에서 역 표지판 아래 기다렸다.'],
        ['We waited beneath the bright station sign as the rain stopped.', '비가 그칠 때 우리는 밝은 역 표지판 아래 기다렸다.']],
      [['Then you said my name.', '그때 너는 내 이름을 불렀다.'],
        ['Then you said my name, softly enough for only me to hear.', '그때 너는 나만 들을 만큼 나지막이 내 이름을 불렀다.'],
        ['Then you said my name, softly enough for me to hear over the distant traffic.',
          '그때 너는 멀리 차 소리가 들리는 가운데 내가 들을 만큼 나지막이 내 이름을 불렀다.']],
    ], true);
    const case6 = chooseThreeLines('sample-8', [
      ['비가 그친 뒤에도 거리는 조용했다.', '비가 완전히 그친 뒤에도 좁은 거리는 조용했다.',
        '비가 완전히 그친 뒤에도 창가의 좁은 거리는 오래도록 조용했다.'],
      ['우리는 천천히 역으로 걸어갔다.', '우리는 젖은 가로등 아래를 지나 천천히 역으로 걸어갔다.',
        '우리는 젖은 가로등 아래를 지나 조용해진 골목 끝의 역으로 천천히 걸어갔다.'],
      ['마지막 열차는 이미 떠난 뒤였다.', '마지막 열차는 우리가 도착하기 전에 이미 떠난 뒤였다.',
        '마지막 열차는 우리가 오래된 승강장에 도착하기 전에 이미 떠난 뒤였다.'],
    ], false);
    const oneLine = englishLines('sample-2');
    const row = document.querySelector('#canvas .blk-bubble');
    const av = row.querySelector('.av');
    const col = row.querySelector('.col');
    const avatar = av ? Number.parseFloat(getComputedStyle(av).width) : null;
    const gap = Number.parseFloat(getComputedStyle(row).gap);
    const quoteGap = style === 'quote' ? Number.parseFloat(getComputedStyle(row).columnGap) : null;
    const nameGap = style === 'plain' ? Number.parseFloat(getComputedStyle(col).rowGap) : null;
    const notificationGap = style === 'notif' ? Number.parseFloat(getComputedStyle(col).rowGap) : null;
    const separatorGap = style === 'script'
      ? Number.parseFloat(getComputedStyle(row.querySelector('.who-sep')).marginRight) : null;
    const quoteWidth = style === 'quote' ? {
      row: row.clientWidth,
      avatar: av.offsetWidth,
      col: col.offsetWidth,
      gap: Number.parseFloat(getComputedStyle(row).columnGap),
    } : null;
    const korean = [...document.querySelectorAll('#canvas .bub .sz-dn')];
    const small = korean.every(n => Number.parseFloat(getComputedStyle(n).fontSize)
      < Number.parseFloat(getComputedStyle(n.parentElement).fontSize));
    const labels = [...document.querySelectorAll('#canvas .blk:not(:has(.blk-bubble))')]
      .map(n => n.textContent.trim());
    const run = ['sample-5', 'sample-6', 'sample-7'].map(id =>
      !!document.querySelector(`#canvas .blk[data-id="${id}"].is-run`));
    const avatarAnchors = (style === 'plain' || style === 'script')
      ? ['sample-1', 'sample-3', 'sample-5', 'sample-6', 'sample-7', 'sample-8'].map(id => {
        const sampleRow = document.querySelector(`#canvas .blk[data-id="${id}"] .blk-bubble`);
        const sampleAvatar = sampleRow.querySelector('.av');
        const scale = sampleRow.getBoundingClientRect().height / sampleRow.offsetHeight;
        return { id, top: Math.round((sampleAvatar.getBoundingClientRect().top
          - sampleRow.getBoundingClientRect().top) / scale * 10) / 10,
          visible: getComputedStyle(sampleAvatar).visibility !== 'hidden' };
      }) : null;
    let captured;
    deliver = async items => { captured = items; };
    await buildPNG();
    return { avatar, gap, quoteGap, nameGap, notificationGap, separatorGap,
      koreanCount: korean.length, small, labels, run, oneLine, case3, case4, case6,
      quoteWidth, avatarAnchors,
      pngs: captured?.map(item => item.url) || [] };
  }, { style, preset });
  assert.equal(result.koreanCount, 4, `${slug}: Korean spans`);
  assert.ok(result.small, `${slug}: Korean size`);
  assert.equal(result.pngs.length, 1, `${slug}: PNG count`);
  assert.equal(result.labels.length, 6, `${slug}: section labels`);
  assert.deepEqual(result.run, [false, true, true], `${slug}: grouped sample`);
  assert.equal(result.oneLine, 1, `${slug}: one full line`);
  assert.deepEqual([result.case3.lines, result.case3.manualBreaks], [3, 0], `${slug}: three automatic lines`);
  assert.deepEqual([result.case4.lines, result.case4.manualBreaks], [3, 1], `${slug}: translation break only`);
  assert.deepEqual([result.case6.lines, result.case6.manualBreaks], [3, 0], `${slug}: Korean automatic lines`);
  assert.ok(result.avatar >= (preset === 'bubble' ? 41.7 : style === 'notif' ? 50.7 : style === 'sns' ? 58 : 33.8),
    `${slug}: avatar ${result.avatar}`);
  if (style === 'quote') {
    assert.ok(result.quoteGap >= 12);
    assert.ok(Math.abs(result.quoteWidth.col - (result.quoteWidth.row
      - result.quoteWidth.avatar - result.quoteWidth.gap)) < 2,
      `${slug}: full text width ${JSON.stringify(result.quoteWidth)}`);
  }
  if (style === 'plain') {
    assert.equal(result.gap, 12);
    assert.equal(result.nameGap, 5);
  }
  if (result.avatarAnchors) {
    const [short, long, first, second, third, korean] = result.avatarAnchors;
    assert.ok(Math.abs(short.top - long.top) < 1, `${slug}: avatar length shift`);
    assert.ok(Math.abs(short.top - korean.top) < 1, `${slug}: Korean avatar length shift`);
    assert.deepEqual([first.visible, second.visible, third.visible], [true, false, false],
      `${slug}: grouped avatar placement`);
  }
  if (style === 'notif') assert.equal(result.notificationGap, 4);
  if (style === 'script') assert.ok(result.separatorGap >= 2);
  const png = result.pngs[0];
  fs.writeFileSync(path.join(outDir, `${slug}.png`), Buffer.from(png.slice(png.indexOf(',') + 1), 'base64'));
  delete result.pngs;
  return result;
}

async function checkQuoteWidths(page) {
  return page.evaluate(() => {
    const th = window.__sheetTheme;
    th.bubbleStyle = 'quote'; th.bubblePreset = 'imessage';
    th.showAvatar = true; th.myAvatar = true;
    S.blocks = [
      { id: 'quote-left', type: 'text', text: 'A long quotation can use the full available text area.',
        asBubble: true, speakerId: 'a' },
      { id: 'quote-right', type: 'text', text: 'A long quotation can use the full available text area.',
        asBubble: true, speakerId: 'b' },
    ];
    renderCanvas();
    const measure = id => {
      const row = document.querySelector(`#canvas .blk[data-id="${id}"] .q-row`);
      return { row: row.clientWidth, avatar: row.querySelector('.av')?.offsetWidth || 0,
        col: row.querySelector('.col').offsetWidth,
        gap: Number.parseFloat(getComputedStyle(row).columnGap),
        side: row.classList.contains('is-me') ? 'right' : 'left' };
    };
    const left = measure('quote-left'), right = measure('quote-right');
    th.showAvatar = false; th.myAvatar = false; renderCanvas();
    const withoutAvatar = measure('quote-left');
    return { left, right, withoutAvatar };
  });
}

function assertQuoteWidths(result) {
  for (const side of ['left', 'right']) {
    const v = result[side];
    assert.equal(v.side, 'left');
    assert.ok(Math.abs(v.col - (v.row - v.avatar - v.gap)) < 2,
      `${side}: ${JSON.stringify(v)}`);
  }
  assert.ok(Math.abs(result.withoutAvatar.col - result.withoutAvatar.row) < 2,
    `no avatar: ${JSON.stringify(result.withoutAvatar)}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await setup(page);
    const defaults = await checkDefaults(page);
    for (const [style, entry] of Object.entries(defaults))
      assert.deepEqual(entry, { grouped: true, toggleVisible: true, avatarControls: true,
        runApplied: true }, style);
    const results = {};
    for (const def of styles) {
      results[def[0]] = await renderSheet(page, def);
      console.log(def[0], JSON.stringify(results[def[0]]));
    }
    fs.writeFileSync(path.join(outDir, 'measurements.json'), JSON.stringify({ defaults, results }, null, 2));
    assertQuoteWidths(await checkQuoteWidths(page));
    await page.close();
  } finally { await browser.close(); }
  const safari = await webkit.launch({ headless: true });
  try {
    const page = await safari.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await setup(page);
    const defaults = await checkDefaults(page);
    for (const [style, entry] of Object.entries(defaults))
      assert.deepEqual(entry, { grouped: true, toggleVisible: true, avatarControls: true,
        runApplied: true }, `WebKit ${style}`);
    assertQuoteWidths(await checkQuoteWidths(page));
    console.log('webkit defaults', JSON.stringify(defaults));
    await page.close();
  } finally { await safari.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
