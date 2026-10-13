const fs = require('fs');
const path = require('path');
const {chromium, webkit} = require('../../../vbody-web/node_modules/@playwright/test');
const out = __dirname;
if (process.argv.includes('--verify')) require('./regression.cjs');
else if (process.argv.includes('--integration')) require('./integration.cjs');
else if (process.argv.includes('--pane-debug')) require('./pane-debug.cjs');
else (async () => {
  const results = [];
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({headless:true});
    for (const [width,height] of [[390,844],[844,390],[899,800],[900,800],[1440,900],[1500,900]]) {
      const context = await browser.newContext({viewport:{width,height},hasTouch:width<900,isMobile:width<900});
      const page = await context.newPage();
      const errors=[]; page.on('pageerror',e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
      await page.waitForTimeout(600);
      const tag=engine.name()+'-'+width;
      await page.screenshot({path:path.join(out,tag+'-initial.png')});
      const initial=await page.evaluate(()=>({grabHeight:document.querySelector('#sheetGrab').getBoundingClientRect().height, sheetTransition:getComputedStyle(document.querySelector('#sheet')).transition, horizontalOverflow:document.documentElement.scrollWidth>innerWidth, toastRole:document.querySelector('#toast').getAttribute('role')}));
      await page.evaluate(()=>{document.querySelector('#ta').focus();openExportModal();});
      const modal=await page.evaluate(()=>({focus:document.activeElement.id,role:document.querySelector('.modal-panel').getAttribute('role'),ariaModal:document.querySelector('.modal-panel').getAttribute('aria-modal')}));
      await page.keyboard.press('Enter');
      modal.afterEnter=await page.locator('.modal-panel').count();
      await page.keyboard.press('Tab');
      modal.tabInModal=await page.evaluate(()=>!!document.activeElement.closest('.modal'));
      await page.keyboard.press('Escape');
      modal.restoredFocus=await page.evaluate(()=>document.activeElement.id);
      await page.evaluate(()=>{S.characters=[{id:'ux-character',name:'점검 캐릭터'}];render();toggleSettingsPanel(true);openCharEditV2('ux-character');});
      await page.waitForTimeout(400);
      const charCopy=await page.evaluate(()=>{document.querySelector('#btnCharDupeV2').click();return {animation:getComputedStyle(document.querySelector('#charEditView')).animationName};});
      await page.waitForTimeout(400);
      await page.evaluate(()=>switchSettingsTab(1));
      await page.evaluate(()=>openThemeEditV2(S.themes[0].id));
      await page.waitForTimeout(400);
      await page.screenshot({path:path.join(out,tag+'-theme.png')});
      const themeCopy=await page.evaluate(()=>{const b=[...document.querySelectorAll('#themeEditContent button')].find(b=>b.title==='복제');b.click();return {animation:getComputedStyle(document.querySelector('#themeEditView')).animationName};});
      const focusLeaks=await page.evaluate(()=>[...document.querySelectorAll('#tabSlider input,#tabSlider button')].filter(e=>e.getClientRects().length&&!e.disabled&&e.tabIndex>=0&& (e.getBoundingClientRect().left>=innerWidth || e.getBoundingClientRect().right<0)).length);
      const reduced=await page.emulateMedia({reducedMotion:'reduce'}).then(()=>page.evaluate(()=>({slider:getComputedStyle(document.querySelector('#tabSlider')).transitionDuration,copy:getComputedStyle(document.querySelector('#charEditView')).animationName})));
      results.push({engine:engine.name(),width,height,initial,modal,charCopy,themeCopy,focusLeaks,reduced,errors});
      console.log(JSON.stringify(results.at(-1)));
      await context.close();
    }
    await browser.close();
  }
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
