const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

async function run(engine, mobile) {
  const executablePath = process.env[engine === chromium ? 'CHROMIUM_EXECUTABLE_PATH' : 'WEBKIT_EXECUTABLE_PATH'];
  const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage(mobile
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
      : { viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:8765/?fresh=' + Date.now(), { waitUntil: 'domcontentloaded' });
    const out = await page.evaluate(async () => {
      const photo = document.createElement('canvas'); photo.width = 400; photo.height = 600;
      const context = photo.getContext('2d'); context.fillStyle = '#e02020';
      context.fillRect(0, 0, photo.width, photo.height);
      const src = photo.toDataURL('image/png');
      const th = { ...DEF_THEME(), id: 'side-test', header: 'none', signShow: false,
        canvas: { ...S.canvas, mode: 'ratio', ratio: '3:4', width: 560, mt: 30, mb: 30, ml: 30, mr: 30,
          marginDetail: true, marginLink: false },
        fmt: { ...S.format, columns: 1, size: 18, blockGap: 10 } };
      S.themes = [th]; S.activeThemeId = th.id;
      S.signatures = []; S.activeSignId = null;
      S.blocks = [
        { id: 'before', type: 'text', text: '사진 앞의 문장입니다.' },
        { id: 'photo', type: 'image', src, imagePlacement: 'side', imageSide: 'left', round: false },
        { id: 'beside', type: 'text', text: '사진 옆에 놓이는 문장입니다. '.repeat(20) },
        { id: 'after', type: 'text', text: '뒤이어 나오는 문장입니다.' }
      ];
      renderCanvas();
      const cv = document.querySelector('#canvas');
      const side = cv.querySelector('.side-page');
      const pageHeight = pageBox().h;
      const left = { pages: cv.querySelectorAll('.pagemark').length + 1,
        sidePage: Math.floor(side.offsetTop / pageHeight),
        photoWidth: side.querySelector('.side-page-photo').offsetWidth,
        textWidth: side.querySelector('.side-page-text').offsetWidth,
        innerWidth: canvasW() - padL() - padR(),
        textInSide: !!side.querySelector('.side-page-text .blk[data-id="beside"]'),
        overflow: cv.dataset.paginationOverflow || '' };
      S.blocks[1].imageSide = 'right'; renderCanvas();
      const right = cv.querySelector('.side-page');
      const photoRect = right.querySelector('.side-page-photo').getBoundingClientRect();
      const textRect = right.querySelector('.side-page-text').getBoundingClientRect();
      const rightOnRight = photoRect.left > textRect.left;
      const rightPhotoWidth = right.querySelector('.side-page-photo').offsetWidth;
      S.blocks.shift();
      th.header = 'kakao'; th.signShow = true;
      S.signatures = [{ id: 'side-sign', charName: '검증', maker: '@테스트' }]; S.activeSignId = 'side-sign';
      renderCanvas();
      const decorated = cv.querySelector('.side-page');
      const head = cv.querySelector('.cv-head:not(.head-ghost)');
      const foot = cv.querySelector('.blk.is-footer');
      const decor = { headClear: decorated.getBoundingClientRect().top >= head.getBoundingClientRect().bottom - 2,
        footClear: decorated.getBoundingClientRect().bottom <= foot.getBoundingClientRect().top + 2 };
      S.blocks.unshift({ id: 'before', type: 'text', text: '사진 앞의 문장입니다.' });
      th.header = 'none'; th.signShow = false; S.signatures = []; S.activeSignId = null;
      S.blocks[1].imageSide = 'left';
      S.blocks[2].text = '긴 문장으로 사진 옆과 다음 페이지의 분할을 확인합니다. '.repeat(160);
      renderCanvas();
      const allText = [...cv.querySelectorAll('.blk[data-id="beside"] .blk-text')]
        .map(node => node.textContent).join('');
      const long = { pages: cv.querySelectorAll('.pagemark').length + 1,
        preserved: allText === S.blocks[2].text,
        sidePart: !!cv.querySelector('.side-page-text .blk[data-id="beside"]'),
        tailPart: !!cv.querySelector(':scope > .blk[data-id="beside"]'),
        overflow: cv.dataset.paginationOverflow || '' };
      let images = [];
      deliver = async items => { images = items; };
      await buildPNG();
      const samplePhoto = async url => {
        const image = new Image(); image.src = url; await whenDrawable(image);
        const surface = document.createElement('canvas'); surface.width = image.naturalWidth; surface.height = image.naturalHeight;
        const g = surface.getContext('2d'); g.drawImage(image, 0, 0);
        const k = image.naturalWidth / canvasW();
        const pixel = g.getImageData(Math.round((padL() + 15) * k), Math.round((padT() + 15) * k), 1, 1).data;
        return pixel[0] > 160 && pixel[1] < 90 && pixel[2] < 90;
      };
      const exportResult = { count: images.length, png: images.every(item => item.url?.startsWith('data:image/png')),
        firstPhoto: await samplePhoto(images[0].url), secondPhoto: await samplePhoto(images[1].url) };
      th.canvas.mode = 'fit'; renderCanvas();
      const fitFallback = { sidePages: cv.querySelectorAll('.side-page').length,
        image: !!cv.querySelector('.blk[data-id="photo"] img') };
      th.canvas.mode = 'ratio'; th.fmt.columns = 2; renderCanvas();
      const columnsFallback = { sidePages: cv.querySelectorAll('.side-page').length,
        image: !!cv.querySelector('.blk[data-id="photo"] img') };
      th.fmt.columns = 1;
      S.blocks = [{ id: 'inline', type: 'image', src, imagePlacement: 'inline', imageRatio: 'fill',
        imageSizeMode: 'custom', size: 50, imageAlign: 'right' }];
      renderCanvas();
      const view = cv.querySelector('.image-fill');
      const inline = { width: view.offsetWidth, inner: canvasW() - padL() - padR(),
        align: view.parentElement.style.textAlign };
      S.blocks = [{ id: 'edit-photo', type: 'image', src, imageRatio: 'fill',
        imageSizeMode: 'custom', size: 50, imageAlign: 'right' },
        { id: 'edit-text', type: 'text', text: '사진 옆에 놓일 글입니다.' }];
      renderCanvas(); editCanvasBlock('edit-photo');
      const editor = document.querySelector('.image-editor');
      const cards = [...editor.querySelectorAll('.image-placement-options button')];
      const fields = [...editor.querySelectorAll(':scope > .field')];
      const initial = { inlineSelected: cards[0].classList.contains('on'),
        sizeVisible: !fields[3].hidden, alignVisible: !fields[4].hidden,
        size: editor.querySelector('.field .slideh input.rng').value };
      const sizeInput = fields[3].querySelector('input.rng');
      sizeInput.value = '65'; sizeInput.dispatchEvent(new Event('input', { bubbles: true }));
      await raf2();
      const resized = { width: cv.querySelector('.image-fill').offsetWidth,
        inner: canvasW() - padL() - padR() };
      cards[1].click();
      const sideControls = { sizeHidden: fields[3].hidden, alignHidden: fields[4].hidden,
        ratioHidden: fields[2].hidden, sideVisible: !fields[1].hidden };
      [...editor.querySelectorAll('.image-side-options button')][1].click();
      await raf2();
      const zoom = editor.querySelector('.image-content .slideh input.rng');
      zoom.value = String(Number(zoom.min) * 1.3);
      zoom.dispatchEvent(new Event('input', { bubbles: true }));
      await raf2();
      const cropField = editor.querySelector('.crop');
      const cropBeforeMove = cropField._snapshot();
      cropField.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 77, clientX: 120, clientY: 120 }));
      cropField.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 77, clientX: 130, clientY: 130 }));
      cropField.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 77, clientX: 130, clientY: 130 }));
      const cropAfterMove = cropField._snapshot();
      const panned = Math.abs(cropAfterMove.x - cropBeforeMove.x) > .0001
        || Math.abs(cropAfterMove.y - cropBeforeMove.y) > .0001;
      document.querySelector('#formatWrap button[title="확인"]').click();
      for (let i = 0; i < 30 && S.ui.stage === 'format'; i++) await new Promise(resolve => setTimeout(resolve, 50));
      const saved = { placement: S.blocks[0].imagePlacement, side: S.blocks[0].imageSide,
        size: S.blocks[0].size, align: S.blocks[0].imageAlign,
        crop: !!S.blocks[0].sideCrop && S.blocks[0].sideCrop.width < 1 };
      editCanvasBlock('edit-photo');
      const reopened = document.querySelector('.image-editor');
      [...reopened.querySelectorAll('.image-placement-options button')][0].click();
      const restored = { size: reopened.querySelector('.field .slideh input.rng').value,
        align: [...reopened.querySelector('[aria-label="이미지 정렬"]').children]
          .findIndex(button => button.getAttribute('aria-pressed') === 'true') };
      return { left, rightOnRight, rightPhotoWidth, decor, long, exportResult, fitFallback, columnsFallback,
        inline, initial, resized, sideControls, panned, saved, restored };
    });
    assert.equal(errors.length, 0, errors.join('\n'));
    assert.ok(out.left.pages >= 2);
    assert.equal(out.left.sidePage, 1);
    assert.ok(out.left.photoWidth > 0 && out.left.textWidth > 0);
    assert.ok(Math.abs(out.left.photoWidth - out.left.innerWidth * .32) <= 1);
    assert.ok(Math.abs(out.rightPhotoWidth - out.left.innerWidth * .32) <= 1);
    assert.equal(out.left.textInSide, true);
    assert.equal(out.left.overflow, '');
    assert.equal(out.rightOnRight, true);
    assert.deepEqual(out.decor, { headClear: true, footClear: true });
    assert.equal(out.long.preserved, true);
    assert.equal(out.long.sidePart, true);
    assert.equal(out.long.tailPart, true);
    assert.equal(out.long.overflow, '');
    assert.equal(out.exportResult.count, out.long.pages);
    assert.equal(out.exportResult.png, true);
    assert.equal(out.exportResult.firstPhoto, false);
    assert.equal(out.exportResult.secondPhoto, true);
    assert.deepEqual(out.fitFallback, { sidePages: 0, image: true });
    assert.deepEqual(out.columnsFallback, { sidePages: 0, image: true });
    assert.ok(Math.abs(out.inline.width - out.inline.inner / 2) <= 2);
    assert.equal(out.inline.align, 'right');
    assert.deepEqual(out.initial, { inlineSelected: true, sizeVisible: true, alignVisible: true, size: '50' });
    assert.ok(Math.abs(out.resized.width - out.resized.inner * .65) <= 2);
    assert.deepEqual(out.sideControls, { sizeHidden: true, alignHidden: true, ratioHidden: true, sideVisible: true });
    assert.equal(out.panned, true);
    assert.equal(out.saved.placement, 'side');
    assert.equal(out.saved.side, 'right');
    assert.equal(out.saved.size, 65);
    assert.equal(out.saved.align, 'right');
    assert.equal(out.saved.crop, true);
    assert.deepEqual(out.restored, { size: '65', align: 2 });
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'side layout passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) for (const mobile of [false, true]) await run(engine, mobile);
})().catch(error => { console.error(error); process.exitCode = 1; });
