const {chromium}=require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>{
  S.characters=[{id:'ux-person',name:'검토 캐릭터'}];setStage('tools');openCharEditV2('ux-person');
  window.events=[];
  for(const kind of ['pointerdown','pointerup','mousedown','mouseup','click','focusin'])document.addEventListener(kind,e=>events.push({kind,target:e.target.id||e.target.className,pane:S.ui.deskPane,y:e.clientY,bodyScroll:$('#sheetBody').scrollLeft,panelScroll:$('#settingsPanel').scrollLeft}),true);
 });
 await page.evaluate(()=>{S.ui.charDraft=null;setSettingsView(0);});await page.waitForTimeout(10);
 await page.evaluate(()=>{document.activeElement.blur();setDeskPane('dock');});await page.waitForTimeout(300);
 const box=await page.locator('#settingsPanel .tab-line').first().boundingBox();
 console.log('BEFORE',JSON.stringify(await page.evaluate(()=>({pane:S.ui.deskPane,tab:$('#settingsPanel .tab-line').getBoundingClientRect().toJSON(),body:$('#sheetBody').getBoundingClientRect().toJSON(),panel:$('#settingsPanel').getBoundingClientRect().toJSON(),scroll:$('#sheetBody').scrollLeft,panelScroll:$('#settingsPanel').scrollLeft,hit:document.elementFromPoint(1110,754)?.outerHTML.slice(0,100)}))));
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
 console.log('DOWN',JSON.stringify(await page.evaluate(()=>({pane:S.ui.deskPane,tab:$('#settingsPanel .tab-line').getBoundingClientRect().toJSON(),events}))));
 await page.mouse.up();await page.waitForTimeout(300);
 console.log('UP',JSON.stringify(await page.evaluate(()=>({pane:S.ui.deskPane,events}))));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
