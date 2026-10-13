const fs=require('fs');
const {chromium}=require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{
 const browser=await chromium.launch({headless:true});const results=[];
 for(const [width,height] of [[320,740],[768,1024],[1920,1080]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:width<900,isMobile:width<900});const page=await context.newPage();
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>{S.characters=[{id:'ux',name:'검토'}];setStage('tools');openThemeEditV2(S.themes[0].id);});await page.waitForTimeout(350);
  const state=await page.evaluate(()=>({width:innerWidth,grab:document.querySelector('#sheetGrab').getBoundingClientRect().height,sheet:document.querySelector('#sheet').getBoundingClientRect().height, inactiveFocusables:[...document.querySelectorAll('#tabSlider button,#tabSlider input')].filter(e=>!e.disabled&&e.tabIndex>=0&&!e.closest('#themeEditView')).length,buttons:[...document.querySelectorAll('#themeEditContent .edit-header button')].map(b=>({title:b.title,label:b.getAttribute('aria-label'),height:b.getBoundingClientRect().height})),inputFont:getComputedStyle(document.querySelector('#themeEditContent input')).fontSize}));
  await page.screenshot({path:__dirname+'/chromium-'+width+'-theme.png'});
  await page.evaluate(()=>{document.querySelector('#charNameV2').value='';S.ui.themeDraft.name+=' 수정';confirmDiscardThemeDraft(()=>{});});
  state.discardActions=await page.locator('.modal-foot button').allTextContents();
  await page.keyboard.press('Escape');
  if(width<900){
   await page.evaluate(()=>{S.ui.themeDraft=null;setStage('tools');setSnap(45);});
   const grab=await page.locator('#sheetGrab').boundingBox();
   await page.mouse.move(grab.x+grab.width/2,grab.y+grab.height/2);await page.mouse.down();await page.mouse.move(grab.x+grab.width/2,grab.y-100,{steps:10});
   state.dragHeight=await page.locator('#sheet').evaluate(e=>e.getBoundingClientRect().height);await page.mouse.up();
   state.releasedHeight=await page.locator('#sheet').evaluate(e=>e.getBoundingClientRect().height);state.snap=await page.evaluate(()=>S.ui.snap);
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  state.reducedCopy=await page.evaluate(()=>{openCharEditV2('ux');document.querySelector('#btnCharDupeV2').click();return getComputedStyle(document.querySelector('#charEditView')).animationName;});
  results.push({width,height,...state});await context.close();
 }
 fs.writeFileSync(__dirname+'/details.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
