const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      const metrics = await page.evaluate(async () => {
        S.characters = [{ id: 'char', name: '하늘', avatar: '', position: 'left' }];
        S.blocks = [{ id: 'body', type: 'text', asBubble: true, speakerId: 'char', text: '글자 크기를 바꿉니다.' }];
        S.signatures = [{ id: 'sig', charName: '작성자', maker: '@test' }];
        S.activeSignId = 'sig';
        await document.fonts.ready;
        const out = {};
        for (const id of ['mobile-reading', 'kakao', 'imessage-light', 'insta-dm']) {
          const th = S.themes.find(t => t.presetId === id);
          S.activeThemeId = th.id;
          out[id] = [];
          for (const size of [14, 18, 22]) {
            th.fmt.size = size;
            renderCanvas();
            const head = document.querySelector('#canvas .cv-head');
            const icon = head?.querySelector('svg');
            const title = head?.querySelector('.hd-title, .hd-name');
            const foot = document.querySelector('#canvas .blk-footer');
            const cs = head && getComputedStyle(head);
            out[id].push({ body: size, headFont: cs?.fontSize, titleFont: title && getComputedStyle(title).fontSize,
              iconHeight: icon?.getBoundingClientRect().height, headHeight: head?.getBoundingClientRect().height,
              headPadTop: cs?.paddingTop, footFont: foot && getComputedStyle(foot).fontSize,
              firstBubbleTop: document.querySelector('#canvas .bub')?.getBoundingClientRect().top });
          }
        }
        const kakao = S.themes.find(t => t.presetId === 'kakao');
        kakao.decorHeaderSize = 14;
        kakao.decorSignSize = 12;
        S.activeThemeId = kakao.id;
        out['kakao-fixed'] = [];
        for (const size of [14, 18, 22]) {
          kakao.fmt.size = size;
          renderCanvas();
          const head = document.querySelector('#canvas .cv-head');
          out['kakao-fixed'].push({ title: getComputedStyle(head.querySelector('.hd-title')).fontSize,
            icon: head.querySelector('svg').getBoundingClientRect().height,
            height: head.getBoundingClientRect().height,
            sign: getComputedStyle(document.querySelector('#canvas .blk-footer')).fontSize });
        }
        openThemeEditV2(kakao.id);
        const reset = [...document.querySelectorAll('#themeEditView button')]
          .find(n => n.textContent.includes('글씨 크기 기본값'));
        out.ui = { customBefore: S.ui.themeDraft?.decorHeaderSize, resetVisible: !!reset };
        reset.click();
        out.ui.customAfter = S.ui.themeDraft?.decorHeaderSize ?? null;
        out.ui.defaultAfter = getComputedStyle(document.querySelector('#canvas .cv-head')).fontSize;
        saveThemeEditV2();
        out.ui.saved = S.themes.find(t => t.presetId === 'kakao')?.decorHeaderSize ?? null;
        const mobileTheme = S.themes.find(t => t.presetId === 'mobile-reading');
        mobileTheme.header = 'insta-dm';
        S.activeThemeId = mobileTheme.id;
        S.blocks = [{ id: 'song', type: 'music', title: '제목', artist: '가수', scale: 80 }];
        out['mobile-other-decor'] = [];
        for (const size of [14, 22]) {
          mobileTheme.fmt.size = size;
          renderCanvas();
          const cv = document.querySelector('#canvas');
          out['mobile-other-decor'].push({
            headName: getComputedStyle(cv.querySelector('.hd-insta-dm .hd-name')).fontSize,
            headHeight: cv.querySelector('.hd-insta-dm').getBoundingClientRect().height,
            inputText: getComputedStyle(cv.querySelector('.cv-foot-insta-dm .ft-placeholder')).fontSize,
            musicTitle: getComputedStyle(cv.querySelector('.mu-title')).fontSize
          });
        }
        const all = {};
        S.blocks = [{ id: 'body', type: 'text', text: '헤더 높이 확인을 위한 본문입니다.' }];
        for (const side of [400, 560]) {
          mobileTheme.canvas.shortSide = side;
          mobileTheme.decorHeaderSize = side === 400 ? 14 : 20;
          mobileTheme.fmt.size = 18;
          all[side] = {};
          for (const kind of HEADS.filter(([key]) => key !== 'none').map(([key]) => key)) {
            mobileTheme.header = kind;
            renderCanvas();
            const head = document.querySelector('#canvas .cv-head');
            all[side][kind] = { h: head?.offsetHeight, fs: getComputedStyle(head).fontSize,
              children: [...head.children].map(n => [n.className, n.offsetHeight]) };
          }
        }
        out.allHeaders = all;
        mobileTheme.canvas.shortSide = 400;
        mobileTheme.decorHeaderSize = 14;
        mobileTheme.fmt.size = 18;
        mobileTheme.lockDate = '11월 5일 목요일';
        mobileTheme.lockTime = '10:52';
        mobileTheme.paperJournal = '대화의 기록';
        mobileTheme.paperTitle = '오늘의 이야기';
        mobileTheme.headerLayout = {};
        const adjusted = {};
        for (const kind of HEADS.filter(([key]) => key !== 'none').map(([key]) => key)) {
          mobileTheme.header = kind;
          const baseHeight = headerHeightPx(mobileTheme);
          mobileTheme.headerLayout[kind] = { height: Math.min(400, baseHeight + 30),
            fontSize: 16, svgScale: 1.25, top: 24 };
          adjusted[kind] = [];
          for (const size of [14, 22]) {
            mobileTheme.fmt.size = size;
            renderCanvas();
            const cv = document.querySelector('#canvas');
            const head = cv.querySelector('.cv-head');
            const scale = cv.getBoundingClientRect().width / cv.offsetWidth;
            adjusted[kind].push({ font: getComputedStyle(head).fontSize,
              height: head.offsetHeight, top: Math.round((head.getBoundingClientRect().top - cv.getBoundingClientRect().top) / scale),
              pages: pageRanges().length, overflow: cv.dataset.paginationOverflow || '' });
          }
        }
        out.adjusted = adjusted;
        out.pngCounts = {};
        for (const kind of Object.keys(adjusted)) {
          mobileTheme.header = kind;
          mobileTheme.fmt.size = 18;
          let count = 0;
          deliver = async items => { count = items.length; };
          await buildPNG();
          out.pngCounts[kind] = count;
        }
        mobileTheme.header = 'imessage';
        openThemeEditV2(mobileTheme.id);
        const stepInput = label => [...document.querySelectorAll('#themeEditView .steph')]
          .find(n => n.textContent.includes(label))?.querySelector('input');
        const heightInput = stepInput('헤더 높이');
        const fontInput = stepInput('장식 글씨 기준');
        const svgInput = stepInput('SVG 아이콘 크기');
        out.directInputs = { height: heightInput?.type, font: fontInput?.type, svg: svgInput?.type,
          top: [...document.querySelectorAll('#themeEditView .steph')]
            .some(n => n.querySelector('.lab')?.textContent === '아래로 이동(px)'),
          heightButtons: heightInput?.closest('.steph')?.querySelectorAll('button').length,
          fontButtons: fontInput?.closest('.steph')?.querySelectorAll('button').length,
          svgButtons: svgInput?.closest('.steph')?.querySelectorAll('button').length };
        heightInput.value = '130'; heightInput.dispatchEvent(new Event('change', { bubbles: true }));
        fontInput.value = '18'; fontInput.dispatchEvent(new Event('change', { bubbles: true }));
        svgInput.value = '150'; svgInput.dispatchEvent(new Event('change', { bubbles: true }));
        out.layoutUi = { height: S.ui.themeDraft.headerLayout.imessage.height,
          font: S.ui.themeDraft.headerLayout.imessage.fontSize,
          svg: S.ui.themeDraft.headerLayout.imessage.svgScale };
        saveThemeEditV2();
        const savedMobile = S.themes.find(t => t.presetId === 'mobile-reading');
        savedMobile.header = 'lock-clock';
        savedMobile.headerLayout['lock-clock'].fontSize = 14; renderCanvas();
        const lockSmall = getComputedStyle(document.querySelector('#canvas .lock-time')).fontSize;
        savedMobile.headerLayout['lock-clock'].fontSize = 20; renderCanvas();
        const lockLarge = getComputedStyle(document.querySelector('#canvas .lock-time')).fontSize;
        savedMobile.header = 'insta-dm';
        savedMobile.headerLayout['insta-dm'].fontSize = 14; renderCanvas();
        const instaSmall = { head: getComputedStyle(document.querySelector('#canvas .hd-name')).fontSize,
          foot: getComputedStyle(document.querySelector('#canvas .cv-foot-insta-dm')).getPropertyValue('--insta-u') };
        savedMobile.headerLayout['insta-dm'].fontSize = 20; renderCanvas();
        const instaLarge = { head: getComputedStyle(document.querySelector('#canvas .hd-name')).fontSize,
          foot: getComputedStyle(document.querySelector('#canvas .cv-foot-insta-dm')).getPropertyValue('--insta-u') };
        out.scaleDetails = { lockSmall, lockLarge, instaSmall, instaLarge };
        return out;
      });
      const mobile = metrics['mobile-reading'];
      assert.ok(mobile.every(m => m.headFont === '12px' && m.titleFont === mobile[0].titleFont));
      assert.ok(metrics.kakao.every(m => m.headFont === '12px' && m.titleFont === metrics.kakao[0].titleFont
        && m.headHeight === metrics.kakao[0].headHeight));
      assert.ok(metrics['insta-dm'].every(m => m.headFont === '12px' && m.titleFont === metrics['insta-dm'][0].titleFont
        && m.headHeight === metrics['insta-dm'][0].headHeight));
      assert.ok(metrics['kakao-fixed'].every(m => m.title === metrics['kakao-fixed'][0].title
        && m.icon === metrics['kakao-fixed'][0].icon && m.height === metrics['kakao-fixed'][0].height && m.sign === '12px'));
      assert.deepEqual(metrics.ui, { customBefore: 14, resetVisible: true, customAfter: null,
        defaultAfter: '12px', saved: null });
      assert.deepEqual(metrics['mobile-other-decor'][0], metrics['mobile-other-decor'][1]);
      for (const [kind, pair] of Object.entries(metrics.adjusted)) {
        assert.equal(pair[0].font, '16px', kind);
        assert.equal(pair[1].font, '16px', kind);
        assert.equal(pair[0].height, pair[1].height, kind);
        assert.equal(pair[0].top, pair[1].top, kind);
        if (kind !== 'paper') assert.equal(pair[0].top, 0, kind);
        assert.ok(pair.every(m => !m.overflow && m.pages >= 1), kind);
      }
      assert.deepEqual(metrics.layoutUi, { height: 130, font: 18, svg: 1.5 });
      assert.deepEqual(metrics.directInputs, { height: 'number', font: 'number', svg: 'number',
        top: false, heightButtons: 0, fontButtons: 0, svgButtons: 0 });
      assert.ok(parseFloat(metrics.scaleDetails.lockLarge) > parseFloat(metrics.scaleDetails.lockSmall));
      assert.ok(parseFloat(metrics.scaleDetails.instaLarge.head) > parseFloat(metrics.scaleDetails.instaSmall.head));
      assert.ok(parseFloat(metrics.scaleDetails.instaLarge.foot) > parseFloat(metrics.scaleDetails.instaSmall.foot));
      assert.ok(Object.values(metrics.pngCounts).every(n => n >= 1), JSON.stringify(metrics.pngCounts));
      const imessageLayout = await page.evaluate(() => {
        const th = S.themes.find(t => t.presetId === 'mobile-reading');
        S.activeThemeId = th.id; th.header = 'imessage';
        const measure = (height, iconScale) => {
          th.headerLayout.imessage = { height, fontSize: 18, svgScale: iconScale, top: 24 };
          renderCanvas();
          const head = document.querySelector('#canvas .hd-imessage');
          const row = head.querySelector('.hd-row'), rule = head.querySelector('.hd-rule');
          const icon = head.querySelector('.hd-side svg');
          const h = head.getBoundingClientRect(), r = row.getBoundingClientRect();
          const line = rule.getBoundingClientRect();
          const scale = document.querySelector('#canvas').getBoundingClientRect().width / document.querySelector('#canvas').offsetWidth;
          return { top: (r.top - h.top) / scale, bottom: (line.top - r.bottom) / scale,
            ruleBottom: (h.bottom - line.bottom) / scale, icon: icon.getBoundingClientRect().height / scale };
        };
        return { small: measure(110, 1), tall: measure(170, 1.5) };
      });
      assert.ok(Math.abs((imessageLayout.tall.top - imessageLayout.small.top) - 30) < 2, JSON.stringify(imessageLayout));
      assert.ok(Math.abs((imessageLayout.tall.bottom - imessageLayout.small.bottom) - 30) < 2, JSON.stringify(imessageLayout));
      assert.ok(Math.abs(imessageLayout.tall.ruleBottom) < 1, JSON.stringify(imessageLayout));
      assert.ok(imessageLayout.tall.icon > imessageLayout.small.icon * 1.4, JSON.stringify(imessageLayout));
      const exactHeight = await page.evaluate(() => {
        const th = S.themes.find(t => t.presetId === 'mobile-reading');
        S.activeThemeId = th.id;
        th.header = 'kakao';
        th.headerLayout.kakao = { height: 40, top: 24 };
        renderCanvas();
        return document.querySelector('#canvas .cv-head').offsetHeight;
      });
      assert.equal(exactHeight, 40);
      if (engine === chromium) {
        await page.evaluate(() => {
          const th = S.themes.find(t => t.presetId === 'mobile-reading');
          S.activeThemeId = th.id;
          th.header = 'imessage';
          th.headerLayout.imessage = { height: 170, fontSize: 18, svgScale: 1.5 };
          S.blocks = [{ id: 'body', type: 'text', text: '헤더 위치와 본문 간격을 확인합니다.', asBubble: true }];
          renderCanvas();
        });
        await page.locator('#canvas').screenshot({ path: path.join(__dirname, 'header-adjusted-preview.png') });
        await page.evaluate(() => {
          setStage('tools');
          openThemeEditV2(S.themes.find(t => t.presetId === 'mobile-reading').id);
        });
        await page.screenshot({ path: path.join(__dirname, 'header-controls-mobile.png') });
      }
      await page.reload({ waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => S.themes.find(t => t.presetId === 'kakao').decorHeaderSize ?? null), null);
      assert.deepEqual(await page.evaluate(() => {
        const { height, fontSize, svgScale } = S.themes.find(t => t.presetId === 'mobile-reading').headerLayout.imessage;
        return { height, fontSize, svgScale };
      }), { height: 130, fontSize: 18, svgScale: 1.5 });
      console.log(engine.name(), JSON.stringify({ mobile: metrics['mobile-reading'], kakao: metrics.kakao,
        insta: metrics['insta-dm'], fixed: metrics['kakao-fixed'], ui: metrics.ui,
        other: metrics['mobile-other-decor'], allHeaders: metrics.allHeaders,
        adjusted: metrics.adjusted }));
      await page.close();
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
