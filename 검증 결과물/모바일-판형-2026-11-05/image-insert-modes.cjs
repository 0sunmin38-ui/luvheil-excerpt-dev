const { chromium, webkit } = require(process.cwd() + '/../vbody-web/node_modules/@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        const c = document.createElement('canvas'); c.width = 360; c.height = 640;
        const g = c.getContext('2d');
        g.fillStyle = '#E76F51'; g.fillRect(0, 0, 180, 640);
        g.fillStyle = '#457B9D'; g.fillRect(180, 0, 180, 640);
        g.fillStyle = '#F4C95D'; g.fillRect(90, 220, 180, 200);
        window.testImage = c.toDataURL();
        S.ui.stage = 'format'; S.ui.newKind = 'image'; S.ui.newSrc = window.testImage;
        const host = document.createElement('div'); host.id = 'imageModeTest';
        host.style.cssText = 'position:fixed;inset:0;overflow:auto;background:white;z-index:99999';
        document.body.append(host); buildImageEditor(host, null, window.testImage);
      });
      const host = page.locator('#imageModeTest');
      assert.deepEqual(await host.locator('.crop-ratios button').allTextContents(),
        ['채우기', '19:6', '4:3', '1:1', '3:4', '6:19']);
      assert.equal(await host.locator('.crop-ratios button.on').textContent(), '채우기');
      assert.equal(await host.locator('.image-size-modes').isVisible(), false);
      for (const label of ['19:6', '4:3', '1:1', '3:4', '6:19']) {
        await host.locator('.crop-ratios button', { hasText: label }).click();
        assert.equal(await host.locator('.crop-ratios button.on').textContent(), label);
        assert.equal(await host.locator('.image-size-modes').isVisible(), true);
      }
      await host.locator('.crop-ratios button').nth(2).click();
      assert.equal(await host.locator('.image-size-modes').isVisible(), true);
      assert.deepEqual(await host.locator('.image-size-modes button').allTextContents(),
        ['화면 좌우 맞춤', '직접 지정']);
      assert.equal(await host.locator('.image-size-modes button.on').textContent(), '화면 좌우 맞춤');
      assert.equal(await host.locator('.image-editor > .slideh').isVisible(), false);
      assert.equal(await host.locator('[aria-label="이미지 정렬"]').isVisible(), false);
      await host.locator('.image-size-modes button').nth(1).click();
      assert.equal(await host.locator('.image-editor > .slideh').isVisible(), true);
      assert.equal(await host.locator('[aria-label="이미지 정렬"]').isVisible(), true);
      await host.locator('.image-editor > .slideh input').fill('35');
      assert.equal(await host.locator('.crop-stage > div').first().evaluate(e => e.style.width), '35%');
      await host.locator('.crop-ratios button').first().click();
      assert.equal(await host.locator('.crop-ratios button.on').textContent(), '채우기');
      assert.equal(await host.locator('.image-size-modes').isVisible(), false);
      assert.equal(await host.locator('.image-editor > .slideh').isVisible(), false);
      assert.equal(await host.locator('[aria-label="이미지 정렬"]').isVisible(), false);
      const result = await page.evaluate(() => {
        const b = { type: 'image', src: window.testImage, imageRatio: '4:3',
          imageCrop: { x: 0, y: 0, width: 1, height: 1, ratio: 4 / 3 }, imageSizeMode: 'width' };
        const width = imageDisplaySize(b);
        b.imageSizeMode = 'custom'; b.size = 35; const custom = imageDisplaySize(b);
        return { width, custom };
      });
      assert.equal(result.width, 100);
      assert.equal(result.custom, 35);
      await host.locator('button[title="확인"]').click();
      await page.waitForFunction(() => S.blocks.some(b => b.type === 'image' && b.imageRatio === 'fill'));
      const saved = await page.evaluate(() => {
        const b = S.blocks.find(x => x.type === 'image');
        renderCanvas();
        const view = document.querySelector('#canvas .image-fill');
        return { mode: b.imageSizeMode, ratio: b.imageRatio, cropRatio: b.imageCrop?.ratio,
          width: view?.offsetWidth, height: view?.offsetHeight,
          rowWidth: view?.closest('.blk')?.offsetWidth };
      });
      assert.equal(saved.mode, 'custom');
      assert.equal(saved.ratio, 'fill');
      assert.ok(saved.cropRatio > 0);
      assert.equal(saved.width, saved.rowWidth);
      assert.ok(saved.height > 100);
      const png = await page.evaluate(async () => {
        let images;
        deliver = async items => { images = items; };
        await buildPNG();
        return { count: images?.length || 0, png: images?.[0]?.url?.startsWith('data:image/png') || false,
          url: images?.[0]?.url || null };
      });
      assert.equal(png.count, 1);
      assert.equal(png.png, true);
      if (engine === chromium) fs.writeFileSync(path.join(__dirname, 'image-fill-export.png'),
        Buffer.from(png.url.slice(png.url.indexOf(',') + 1), 'base64'));
      console.log(engine.name(), 'image ratios and size modes: passed');
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
