const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const expected = {
  kakao: [60, 12, .9], imessage: [90, 12, 1.3],
  'insta-dm': [70, 12, 1], bubble: [80, 12, 1],
  'lock-clock': [240, 16, 1], paper: [112, 20, 1],
};

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(async expected => {
        const presetKinds = ['square-white', 'square-black', 'script'].map(id =>
          S.themes.find(t => t.presetId === id)?.header);
        S.signatures = [{ id: 'test-sign', charName: '테스트', maker: '@작가' }];
        S.activeSignId = 'test-sign';
        S.blocks = [{ id: 'sample', type: 'text', text: '헤더 고정값 검증을 위한 대화입니다.', asBubble: true }];
        const presetMarkup = ['square-white', 'square-black', 'script'].map(id => {
          S.activeThemeId = S.themes.find(t => t.presetId === id).id;
          renderCanvas();
          return { head: !!document.querySelector('#canvas .hd-kakao'),
            ebookFooter: !!document.querySelector('#canvas .cv-foot-ebook-modern'),
            sign: !!document.querySelector('#canvas .blk-footer') };
        });
        const hasEbookOption = HEADS.some(([kind]) => kind.includes('ebook'));
        const th = DEF_THEME();
        th.name = '헤더 고정 확인'; th.headerTitle = '대화상대';
        th.lockDate = '11월 5일 목요일'; th.lockTime = '10:52';
        th.paperJournal = '기록'; th.paperTitle = '오늘의 이야기';
        th.canvas = { mode: 'fit', width: 400, mt: 30, mb: 30, ml: 30, mr: 30,
          marginDetail: true, marginLink: false };
        S.themes.push(th); S.activeThemeId = th.id;
        const metrics = {};
        for (const [kind] of Object.entries(expected)) {
          th.header = kind;
          th.headerLayout = { [kind]: { height: 390, fontSize: 38, svgScale: 2.2,
            sidePadding: 70, avatarSize: 75, contentY: 18, dateFontSize: 35, dateGap: 32 } };
          th.decorHeaderSize = 35;
          for (const bodySize of [13, 24]) {
            th.fmt = { ...S.format, size: bodySize };
            renderCanvas();
            await document.fonts.ready;
            const head = document.querySelector('#canvas .cv-head');
            const s = getComputedStyle(head);
            (metrics[kind] ||= []).push([head.offsetHeight, parseFloat(s.fontSize), headerSvgScale(th)]);
          }
        }
        th.header = 'kakao'; th.fmt.size = 13; renderCanvas();
        const pad = parseFloat(getComputedStyle(document.querySelector('#canvas .cv-head')).paddingLeft);
        const legacy = { ...th, header: 'ebook-modern', headerLayout: { kakao: { height: 350 } }, decorHeaderSize: 35 };
        normalizeHeaderSettings(legacy);
        delete th.headerLayout; delete th.decorHeaderSize;
        openThemeEditV2(th.id);
        const editText = document.querySelector('#themeEditContent').textContent;
        const select = document.querySelector('#themeEditContent select.sel');
        const options = [...select.options].map(x => x.value);
        S.ui.themeDraft = null; S.ui.editingThemeId = null;
        th.header = 'kakao'; renderCanvas();
        let pngs;
        deliver = async items => { pngs = items.map(item => item.url); };
        await buildPNG();
        return { presetKinds, presetMarkup, hasEbookOption, metrics, pad,
          legacy: { header: legacy.header, headerLayout: legacy.headerLayout, decorHeaderSize: legacy.decorHeaderSize },
          controlsGone: !['헤더 높이(px)', '장식 글씨 기준(px)', 'SVG 아이콘 크기(%)',
            '시계 크기 기준(px)', '프로필 이미지 크기(px)', '프로필 링 크기(px)',
            '날짜 글씨(px)', '날짜·시간 간격(px)', '이 헤더에 새 기본값 적용'].some(s => editText.includes(s)),
          options, pngs };
      }, expected);
      assert.deepEqual(result.presetKinds, ['kakao', 'kakao', 'kakao']);
      assert.deepEqual(result.presetMarkup, Array(3).fill(null).map(() => ({
        head: true, ebookFooter: false, sign: true })));
      assert.equal(result.hasEbookOption, false);
      for (const [kind, value] of Object.entries(expected)) {
        assert.deepEqual(result.metrics[kind], [value, value], `${engine.name()}: ${kind}`);
      }
      assert.equal(result.pad, 28);
      assert.equal(result.legacy.header, 'kakao');
      assert.equal(result.legacy.headerLayout, undefined);
      assert.equal(result.legacy.decorHeaderSize, undefined);
      assert.equal(result.controlsGone, true);
      assert.ok(!result.options.includes('ebook-modern'));
      assert.equal(result.pngs.length, 1);
      if (engine === chromium) fs.writeFileSync(path.join(__dirname, 'header-fixed-kakao.png'),
        Buffer.from(result.pngs[0].slice(result.pngs[0].indexOf(',') + 1), 'base64'));

      await page.evaluate(() => {
        const saved = { ...DEF_THEME(), id: 'legacy-ebook', name: '옛 이북',
          header: 'ebook-modern', headerLayout: { 'ebook-modern': { height: 120 } },
          decorHeaderSize: 25 };
        localStorage.setItem(KEY, JSON.stringify({ v: 25, themes: [saved], activeThemeId: saved.id,
          blocks: [], characters: [], signatures: [], format: S.format, canvas: S.canvas, colors: S.colors }));
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      const migrated = await page.evaluate(() => ({
        schema: SCHEMA, header: S.themes[0].header,
        layout: S.themes[0].headerLayout, size: S.themes[0].decorHeaderSize,
        hasEbookFooter: !!document.querySelector('#canvas .cv-foot-ebook-modern'),
      }));
      assert.equal(migrated.schema, 26);
      assert.equal(migrated.header, 'kakao');
      assert.equal(migrated.layout, undefined);
      assert.equal(migrated.size, undefined);
      assert.equal(migrated.hasEbookFooter, false);
      await page.evaluate(() => {
        const preset = { ...DEF_THEME(), presetId: 'square-white', id: 'kept-preset-id',
          name: '옛 제공 테마', header: 'ebook-modern', bg: '#123456', fmt: { ...S.format, size: 31 } };
        const custom = { ...DEF_THEME(), id: 'kept-custom-id', name: '직접 만든 테마',
          header: 'kakao', bg: '#654321' };
        localStorage.setItem(KEY, JSON.stringify({ v: SCHEMA, themes: [custom, preset],
          activeThemeId: preset.id, blocks: [], characters: [], signatures: [],
          format: S.format, canvas: S.canvas, colors: S.colors }));
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      const synced = await page.evaluate(() => {
        const preset = S.themes[1], custom = S.themes[0];
        const current = PRESET_THEMES.find(t => t.presetId === 'square-white');
        openResetModal();
        const resetText = [...document.querySelectorAll('.reset-option')].map(x => x.textContent).join(' ');
        return { order: S.themes.map(t => t.id), active: S.activeThemeId,
          preset: { name: preset.name, header: preset.header, bg: preset.bg, size: preset.fmt.size },
          current: { name: current.name, header: current.header, bg: current.bg, size: current.fmt.size },
          custom: { name: custom.name, bg: custom.bg }, resetHasThemes: resetText.includes('테마 프리셋'),
          resetHasCharacters: resetText.includes('캐릭터 프리셋') };
      });
      assert.deepEqual(synced.order, ['kept-custom-id', 'kept-preset-id']);
      assert.equal(synced.active, 'kept-preset-id');
      assert.deepEqual(synced.preset, synced.current);
      assert.deepEqual(synced.custom, { name: '직접 만든 테마', bg: '#654321' });
      assert.equal(synced.resetHasThemes, false);
      assert.equal(synced.resetHasCharacters, true);
      const downloadPromise = page.waitForEvent('download');
      await page.evaluate(() => exportSettings(new Set(['themes'])));
      const exported = JSON.parse(fs.readFileSync(await (await downloadPromise).path(), 'utf8'));
      assert.deepEqual(exported.themes.map(t => t.id), ['kept-custom-id']);
      assert.equal(exported.activeThemeId, null);
      const imported = await page.evaluate(() => {
        const oldPreset = { ...DEF_THEME(), presetId: 'square-black', id: 'imported-preset-id',
          name: '지난 버전', header: 'ebook-modern', fmt: { ...S.format, size: 29 } };
        const own = { ...DEF_THEME(), id: 'imported-own-id', name: '가져온 사용자 테마', bg: '#abcdef' };
        const oldCopy = { ...DEF_THEME(), presetId: 'square-black', id: 'old-copy-id',
          name: '검은 정사각 사본', bg: '#fedcba' };
        applySettings({ themes: [own, oldPreset, oldCopy], activeThemeId: oldPreset.id,
          format: S.format, canvas: S.canvas }, new Set(['themes']), 'replace');
        const current = PRESET_THEMES.find(t => t.presetId === 'square-white');
        return { ids: S.themes.map(t => t.id), active: S.activeThemeId,
          header: S.themes[0].header, size: S.themes[0].fmt.size,
          currentHeader: current.header, currentSize: current.fmt.size,
          ownBg: S.themes[1].bg, copyBg: S.themes[2].bg,
          copyPresetId: S.themes[2].presetId };
      });
      assert.deepEqual(imported.ids, ['kept-preset-id', 'imported-own-id', 'old-copy-id']);
      assert.equal(imported.active, 'kept-preset-id');
      assert.equal(imported.header, imported.currentHeader);
      assert.equal(imported.size, imported.currentSize);
      assert.equal(imported.ownBg, '#abcdef');
      assert.equal(imported.copyBg, '#fedcba');
      assert.equal(imported.copyPresetId, undefined);
      console.log(engine.name(), 'fixed headers, preset import/export exclusion, reset menu, legacy migration, PNG: passed');
      await page.close();
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
