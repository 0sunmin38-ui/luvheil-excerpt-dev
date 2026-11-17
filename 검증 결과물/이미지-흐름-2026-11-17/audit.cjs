const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');

async function audit(engine, mobile) {
  const executablePath = process.env[engine === chromium ? 'CHROMIUM_EXECUTABLE_PATH' : 'WEBKIT_EXECUTABLE_PATH'];
  const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage(mobile
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
      : { viewport: { width: 1280, height: 900 } });
    await page.goto('http://127.0.0.1:8765/?fresh=' + Date.now(), { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(async () => {
      const image = document.createElement('canvas');
      image.width = 400; image.height = 200;
      const g = image.getContext('2d');
      g.fillStyle = '#f00'; g.fillRect(0, 0, 200, 200);
      g.fillStyle = '#00f'; g.fillRect(200, 0, 200, 200);
      const src = image.toDataURL('image/png');

      let removed = 'pending';
      openAvatarModal(src, value => { removed = value; });
      document.querySelector('#modalRoot .crop-stage .btn-danger').click();
      document.querySelector('#modalRoot .modal-foot .btn-primary').click();
      await new Promise(resolve => setTimeout(resolve, 100));

      let cropped = '';
      openAvatarModal('', value => { cropped = value; });
      const crop = document.querySelector('#modalRoot .crop');
      crop._setSrc(src); crop._onPick();
      await whenDrawable(crop.querySelector('img'));
      document.querySelector('#modalRoot .modal-foot .btn-primary').click();
      for (let i = 0; i < 30 && !cropped; i++) await new Promise(resolve => setTimeout(resolve, 50));
      const decoded = new Image(); decoded.src = cropped;
      await whenDrawable(decoded);

      const old = { id: 'old-image', type: 'image', src, imageRatio: 'original',
        imageSizeMode: 'width', imageCrop: { x: 0, y: 0, width: 1, height: 1, ratio: 2 } };
      S.blocks = [old]; S.ui.stage = 'format'; S.ui.selectedBlockId = old.id;
      const host = document.createElement('div'); document.body.appendChild(host);
      buildImageEditor(host, old);
      const originalSelected = [...host.querySelectorAll('.crop-ratios button')]
        .some(button => button.textContent === '원본' && button.classList.contains('on'));
      host.remove(); S.ui.imagePreview = null;
      S.blocks = [{ ...old, src: cropped, imageCrop: { x: 0, y: 0, width: 1, height: 1, ratio: 1 } }];
      renderCanvas();
      let exported = [];
      deliver = async items => { exported = items; };
      await buildPNG();
      const exportOk = exported.length > 0 && exported.every(item => item.url?.startsWith('data:image/png'));

      const th = { ...DEF_THEME(), id: 'bg-audit', bgImage: src,
        canvas: { ...S.canvas, mode: 'ratio', ratio: '3:4' } };
      S.themes = [th]; S.activeThemeId = th.id;
      S.ui.editingThemeId = th.id; S.ui.themeDraft = th;
      const before = { ratio: th.canvas.ratio, bgImage: th.bgImage, bgSize: th.bgSize };
      openBgImageModal(src, () => {}, th);
      [...document.querySelectorAll('#modalRoot .crop-ratios button')]
        .find(button => button.textContent.includes('1:1')).click();
      document.querySelector('#modalRoot .bg-image-preview .rm-btn').click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const after = { ratio: th.canvas.ratio, bgImage: th.bgImage, bgSize: th.bgSize };

      return { removed, crop: [decoded.naturalWidth, decoded.naturalHeight], exportOk,
        originalSelected, before, after, modalClosed: !document.querySelector('#modalRoot').firstChild };
    });
    assert.equal(result.removed, '');
    assert.deepEqual(result.crop, [256, 256]);
    assert.equal(result.exportOk, true);
    assert.equal(result.originalSelected, true);
    assert.deepEqual(result.after, result.before);
    assert.equal(result.modalClosed, true);
    console.log(engine.name(), mobile ? 'mobile' : 'desktop', 'passed');
  } finally { await browser.close(); }
}

(async () => {
  for (const engine of [chromium, webkit]) {
    for (const mobile of [false, true]) await audit(engine, mobile);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
