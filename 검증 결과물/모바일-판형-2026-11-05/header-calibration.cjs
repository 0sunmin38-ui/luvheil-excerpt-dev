const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(async () => {
        const presetBodySizes = PRESET_THEMES.map(p => p.fmt?.size);
        const th = S.themes.find(t => t.presetId === 'mobile-reading');
        S.activeThemeId = th.id;
        th.decorHeaderSize = 14;
        th.headerLayout = {};
        S.blocks = [{ id: 'sample', type: 'text', text: '헤더 비율 검증을 위한 대화입니다.', asBubble: true }];
        th.headerTitle = '대화상대';
        const avatarSizes = {};
        for (const style of ['bubble', 'notif', 'sns']) {
          th.bubbleStyle = style; th.bubblePreset = 'kakaotalk';
          renderCanvas();
          avatarSizes[style] = parseFloat(getComputedStyle(document.querySelector('#canvas .av')).width);
        }
        th.bubbleStyle = 'bubble'; th.bubblePreset = 'kakaotalk';
        const bubbleTheme = S.themes.find(t => t.presetId === 'bubble');
        S.activeThemeId = bubbleTheme.id; renderCanvas();
        avatarSizes.bubbleTheme = parseFloat(getComputedStyle(document.querySelector('#canvas .av')).width);
        S.activeThemeId = th.id;
        th.lockDate = '11월 5일 목요일'; th.lockTime = '10:52';
        th.paperJournal = '기록'; th.paperTitle = '오늘의 이야기';
        await document.fonts.ready;
        const expected = { kakao: [60, 12, .9], imessage: [90, 12, 1.3],
          'insta-dm': [70, 12, 1], bubble: [80, 12, 1],
          'ebook-modern': [60, 13, 1], 'lock-clock': [240, 16, 1], paper: [112, 20, 1] };
        const actual = {};
        for (const kind of Object.keys(expected)) {
          th.header = kind; renderCanvas();
          const head = document.querySelector('#canvas .cv-head');
          actual[kind] = [head.offsetHeight, parseFloat(getComputedStyle(head).fontSize), headerSvgScale(th)];
        }
        const rect = n => n.getBoundingClientRect();
        th.header = 'kakao'; renderCanvas();
        let head = document.querySelector('#canvas .cv-head');
        const kakao = { pad: parseFloat(getComputedStyle(head).paddingLeft),
          center: rect(head.querySelector('.hd-title')).left + rect(head.querySelector('.hd-title')).width / 2,
          canvasCenter: rect(document.querySelector('#canvas')).left + rect(document.querySelector('#canvas')).width / 2 };
        th.headerLayout.kakao = { fontSize: 20 }; renderCanvas();
        const kakaoPadAfterFont = parseFloat(getComputedStyle(document.querySelector('#canvas .cv-head')).paddingLeft);
        th.header = 'imessage'; renderCanvas();
        head = document.querySelector('#canvas .cv-head');
        const row = head.querySelector('.hd-row');
        const imessage = { left: rect(head.querySelector('.hd-side')).left - rect(head).left,
          right: rect(head).right - rect(head.querySelector('.hd-side.right')).right,
          padding: parseFloat(getComputedStyle(head).paddingLeft),
          avatar: head.querySelector('.hd-av').offsetWidth,
          iconCenterY: rect(head.querySelector('.hd-side svg')).top + rect(head.querySelector('.hd-side svg')).height / 2,
          headerCenterY: rect(head).top + rect(head).height / 2,
          avatarCenterY: rect(head.querySelector('.hd-av')).top + rect(head.querySelector('.hd-av')).height / 2,
          stroke: getComputedStyle(head.querySelector('.hd-side svg')).strokeWidth,
          shadow: getComputedStyle(head).boxShadow,
          lineLeft: rect(head.querySelector('.hd-rule')).left - rect(head).left,
          lineBottom: rect(head).bottom - rect(head.querySelector('.hd-rule')).bottom };
        th.headerLayout.imessage = { avatarSize: 50, contentY: 9 }; renderCanvas();
        const avatarChanged = document.querySelector('#canvas .hd-av').offsetWidth;
        th.header = 'insta-dm'; renderCanvas();
        head = document.querySelector('#canvas .cv-head');
        const ring = head.querySelector('.hd-story-ring');
        const ringBefore = [ring.offsetWidth, ring.querySelector('.hd-av-inner').offsetWidth];
        const footBefore = getComputedStyle(document.querySelector('#canvas .cv-foot-insta-dm')).getPropertyValue('--insta-u');
        th.headerLayout['insta-dm'] = { fontSize: 20, svgScale: 1.5 }; renderCanvas();
        head = document.querySelector('#canvas .cv-head');
        const ringAfter = [head.querySelector('.hd-story-ring').offsetWidth,
          head.querySelector('.hd-av-inner').offsetWidth];
        const footAfter = getComputedStyle(document.querySelector('#canvas .cv-foot-insta-dm')).getPropertyValue('--insta-u');
        th.header = 'lock-clock'; renderCanvas();
        const gap = getComputedStyle(document.querySelector('#canvas .lock-date')).marginBottom;
        const dateSize = getComputedStyle(document.querySelector('#canvas .lock-date')).fontSize;
        th.headerLayout['lock-clock'] = { dateFontSize: 24 }; renderCanvas();
        const dateChanged = getComputedStyle(document.querySelector('#canvas .lock-date')).fontSize;
        th.header = 'imessage'; th.headerLayout.imessage = { height: 90 };
        renderCanvas();
        let pngCount = 0; deliver = async items => {
          pngCount = items.length; window._calibrationPng = items[0]?.url;
        };
        await buildPNG();
        th.headerLayout.imessage = { height: 170, fontSize: 22, svgScale: 1.5,
          avatarSize: 60, contentY: 10, top: 24 };
        openThemeEditV2(th.id);
        [...document.querySelectorAll('#themeEditView button')]
          .find(n => n.textContent.includes('이 헤더에 새 기본값 적용')).click();
        const appliedDefault = S.ui.themeDraft.headerLayout.imessage;
        S.ui.themeDraft.header = 'lock-clock'; syncThemeEditFormV2();
        const dateInput = [...document.querySelectorAll('#themeEditView .steph')]
          .find(n => n.querySelector('.lab')?.textContent === '날짜 글씨(px)')?.querySelector('input');
        const clockInput = [...document.querySelectorAll('#themeEditView .steph')]
          .find(n => n.querySelector('.lab')?.textContent === '시계 크기 기준(px)')?.querySelector('input');
        dateInput.value = '24'; dateInput.dispatchEvent(new Event('change', { bubbles: true }));
        const dateUi = { type: dateInput.type, date: S.ui.themeDraft.headerLayout['lock-clock'].dateFontSize,
          clock: Number(clockInput.value) };
        return { presetBodySizes, avatarSizes, expected, actual, kakao, kakaoPadAfterFont, imessage, avatarChanged,
          ringBefore, ringAfter, footBefore, footAfter, gap, dateSize, dateChanged, pngCount, appliedDefault, dateUi };
      });
      assert.deepEqual(result.actual, result.expected);
      assert.ok(result.presetBodySizes.every(size => size === 13));
      assert.ok(Math.abs(result.avatarSizes.bubble - 33.88) < .1);
      assert.ok(Math.abs(result.avatarSizes.notif - 50.82) < .1);
      assert.ok(Math.abs(result.avatarSizes.sns - 58.08) < .1);
      assert.ok(Math.abs(result.avatarSizes.bubbleTheme - 41.8) < .1);
      assert.equal(result.kakao.pad, 28);
      assert.equal(result.kakaoPadAfterFont, 28);
      assert.ok(Math.abs(result.kakao.center - result.kakao.canvasCenter) < 1);
      assert.ok(result.imessage.left < 40 && result.imessage.right < 40, JSON.stringify(result.imessage));
      assert.equal(result.imessage.avatar, 40);
      assert.equal(result.imessage.padding, 30);
      assert.ok(Math.abs(result.imessage.iconCenterY - result.imessage.headerCenterY) < 1);
      assert.ok(Math.abs(result.imessage.iconCenterY - result.imessage.avatarCenterY) > 3);
      assert.equal(result.imessage.stroke, '2.4px');
      assert.equal(result.imessage.shadow, 'none');
      assert.ok(Math.abs(result.imessage.lineLeft) < 1);
      assert.ok(Math.abs(result.imessage.lineBottom) < 1);
      assert.equal(result.avatarChanged, 50);
      assert.deepEqual(result.ringBefore, [42, 38]);
      assert.deepEqual(result.ringAfter, [42, 38]);
      assert.ok(parseFloat(result.footAfter) > parseFloat(result.footBefore));
      assert.equal(result.gap, '8px');
      assert.equal(result.dateSize, '20px');
      assert.equal(result.dateChanged, '24px');
      assert.ok(result.pngCount >= 1);
      assert.deepEqual(result.appliedDefault, { height: 90, fontSize: 12, svgScale: 1.3,
        avatarSize: 40, contentY: 4, sidePadding: 30 });
      assert.deepEqual(result.dateUi, { type: 'number', date: 24, clock: 16 });
      if (engine === chromium) {
        const png = await page.evaluate(() => window._calibrationPng);
        fs.writeFileSync(path.join(__dirname, 'calibrated-imessage-export.png'),
          Buffer.from(png.slice(png.indexOf(',') + 1), 'base64'));
        for (const kind of ['kakao', 'imessage', 'insta-dm']) {
          await page.evaluate(value => {
            S.ui.themeDraft = null; S.ui.editingThemeId = null;
            const th = S.themes.find(t => t.presetId === 'mobile-reading');
            S.activeThemeId = th.id; th.header = value; th.headerLayout = {};
            renderCanvas();
          }, kind);
          await page.locator('#canvas').screenshot({ path: path.join(__dirname, `calibrated-${kind}.png`) });
        }
      }
      console.log(engine.name(), JSON.stringify(result));
      await page.close();
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
