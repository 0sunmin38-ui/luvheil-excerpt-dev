const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const {chromium,webkit} = require('../../../vbody-web/node_modules/@playwright/test');
const out=__dirname, results=[];
async function settle(page){await page.waitForTimeout(100);}
async function viewport(page, height, offsetTop=0, scale=1){
 await page.evaluate(({height,offsetTop,scale})=>{
  if(!window.testVV){window.testVV=new EventTarget();Object.defineProperty(window,'visualViewport',{configurable:true,value:window.testVV});}
  Object.assign(window.testVV,{height,offsetTop,scale,width:innerWidth});syncViewportVars();
 },{height,offsetTop,scale});await settle(page);
}
async function geometry(page){return page.evaluate(()=>{
 const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height};};
 const wrap=$('#formatWrap'),stage=$('.stage');
 return {sheet:rect('#sheet'),stage:rect('.stage'),quick:rect('#formatQuick'),foot:rect('#sheetFoot'),head:rect('#sheetHead'),dock:rect('#dock'),wrap:rect('#formatWrap'),grab:rect('#sheetGrab'),vv:{height:visualViewport.height,offsetTop:visualViewport.offsetTop},padding:getComputedStyle(wrap).paddingBottom,snap:S.ui.snap,stagePadding:getComputedStyle(stage).paddingBottom,docHeight:document.documentElement.scrollHeight,windowHeight:innerHeight};
});}
(async()=>{
 for(const engine of [chromium,webkit]){
 const browser=await engine.launch({headless:true});
 try{for(const width of [320,390,768]){
 const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8766/',{waitUntil:'domcontentloaded'});await settle(page);
 await page.evaluate(()=>{S.blocks=[{id:'mobile-text',type:'text',text:Array(30).fill('키보드 아래쪽까지 확인하는 긴 문장입니다.').join('\n')}];render();editCanvasBlock('mobile-text');$('#ta').focus();setSnap(70);});await settle(page);
 const checks=[];
 for(const [name,h,top] of [['keyboard',480,0],['pan',440,40],['small',360,0]]){
 await viewport(page,h,top);const g=await geometry(page);
 assert.ok(Math.abs(g.sheet.bottom-(h+top))<2,JSON.stringify(g));
 assert.ok(g.sheet.top>=top+24,JSON.stringify(g));
 assert.ok(Math.abs(g.stage.bottom-g.sheet.top)<2,JSON.stringify(g));
 assert.ok(g.quick.height>=30 && g.quick.bottom<=g.dock.bottom+1,JSON.stringify(g));assert.ok(g.wrap.height>=40,JSON.stringify(g));
 assert.ok(g.foot.bottom<=g.sheet.bottom+1,JSON.stringify(g));assert.equal(g.padding,'16px');assert.equal(g.stagePadding,'20px');assert.equal(g.snap,70);
 await page.evaluate(()=>{const e=$('#formatWrap');e.scrollTop=e.scrollHeight;const s=$('.stage');s.scrollTop=s.scrollHeight;});
 const end=await page.evaluate(()=>{const w=$('#formatWrap'),last=w.lastElementChild,stage=$('.stage'),canvas=$('.canvas-fit');return {lastBottom:last.getBoundingClientRect().bottom,wrapBottom:w.getBoundingClientRect().bottom,canvasBottom:canvas.getBoundingClientRect().bottom,stageBottom:stage.getBoundingClientRect().bottom};});
 assert.ok(end.lastBottom<=end.wrapBottom+1,JSON.stringify(end));assert.ok(end.canvasBottom<=end.stageBottom+1,JSON.stringify(end));assert.ok(end.stageBottom-end.canvasBottom<=22,JSON.stringify(end));
 checks.push({name,geometry:g,end});
 if(name==='keyboard')await page.screenshot({path:path.join(out,`${engine.name()}-${width}-keyboard.png`),clip:{x:0,y:0,width,height:480}});
 }
 // 선택한 일부에 서식을 적용하고 키보드가 여전히 보이는 동안 blur 보정이 유지되는지 확인.
 await viewport(page,480,0);
 await page.evaluate(()=>{const ta=$('#ta');ta.focus();const r=document.createRange();r.setStart(ta.firstChild,0);r.setEnd(ta.firstChild,3);const s=getSelection();s.removeAllRanges();s.addRange(r);trackSel();});
 await page.locator('#formatQuick button').filter({hasText:/^B$/}).dispatchEvent('pointerdown',{pointerId:55,pointerType:'touch',clientX:20,clientY:20,button:0});
 await page.locator('#formatQuick button').filter({hasText:/^B$/}).dispatchEvent('pointerup',{pointerId:55,pointerType:'touch',clientX:20,clientY:20,button:0});await settle(page);
 const formatted=await page.evaluate(()=>({html:$('#ta').innerHTML,selected:getSelection().toString(),text:S.blocks[0].text,focus:document.activeElement.id}));assert.ok(formatted.html.includes('<b>')||formatted.html.includes('font-weight'),JSON.stringify(formatted));assert.equal(formatted.selected.length,3);assert.equal(formatted.focus,'ta');
 await page.evaluate(()=>{$('#sheetGrab').focus();syncViewportVars();});await settle(page);assert.ok(Math.abs((await geometry(page)).sheet.bottom-480)<2);
 // 키보드 위에서 드래그 상한과 취소 복원.
 await page.evaluate(()=>{const g=$('#sheetGrab'),r=g.getBoundingClientRect();g.dispatchEvent(new PointerEvent('pointerdown',{pointerId:77,clientY:r.top+20,button:0,bubbles:true}));g.dispatchEvent(new PointerEvent('pointermove',{pointerId:77,clientY:-1000,bubbles:true}));});await settle(page);
 assert.ok((await geometry(page)).sheet.top>=24);
 await page.evaluate(()=>$('#sheetGrab').dispatchEvent(new PointerEvent('pointercancel',{pointerId:77,bubbles:true})));await page.waitForTimeout(260);assert.equal(await page.evaluate(()=>S.ui.snap),70);
 // 색상 선택창도 가시 영역 내부에 머물고 선택한 조각에 적용.
 await page.evaluate(()=>{const ta=$('#ta');ta.focus();const r=document.createRange();r.selectNodeContents(ta.querySelector('b')||ta.firstChild);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);trackSel();});
 await page.locator('#formatQuick button[title^="글자 색"]').click();await settle(page);
 const pop=await page.locator('.pop').boundingBox();assert.ok(pop.y>=0 && pop.y+pop.height<=480,JSON.stringify(pop));
 await viewport(page,400,30);const popMoved=await page.locator('.pop').boundingBox();assert.ok(popMoved.y>=30 && popMoved.y+popMoved.height<=430,JSON.stringify(popMoved));
 await page.locator('.pop-sw:not(.none)').nth(2).click();await settle(page);assert.equal(await page.locator('.pop').count(),0);
 // 레이아웃 높이도 함께 줄어드는 브라우저 동작: 하단 보정을 두 번 더하지 않음.
 await page.evaluate(()=>{getSelection().removeAllRanges();document.activeElement.blur();});await settle(page);
 await page.setViewportSize({width,height:480});await viewport(page,480);
 assert.ok(Math.abs((await geometry(page)).sheet.bottom-480)<2);assert.equal(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--viewport-bottom')),'0px');
 await page.setViewportSize({width,height:844});
 // 확대를 키보드로 간주하지 않음, 닫힌 뒤 사용자가 선택한 스냅 복원.
 await viewport(page,422,30,2);assert.equal(await page.evaluate(()=>$('#sheet').classList.contains('has-keyboard')),false);
 await viewport(page,844);let restored=await geometry(page);assert.equal(restored.snap,70);assert.ok(Math.abs(restored.sheet.bottom-844)<2);
 // 설정 폼의 키보드: 작성창 포커스가 없어도 실제 가시 영역 안에서 단일 본문 스크롤.
 await page.evaluate(()=>{S.ui.selectedBlockId=null;setStage('composer');toggleSettingsPanel(true);switchSettingsTab(1);openThemeEditV2(S.themes[0].id);setSnap(70);});await settle(page);await viewport(page,480,20);
 const settings=await page.evaluate(()=>{const e=$('#themeEditView');e.scrollTop=e.scrollHeight;const r=e.getBoundingClientRect(),last=e.lastElementChild.getBoundingClientRect();return {height:r.height,bottom:r.bottom,lastBottom:last.bottom,sheetBottom:$('#sheet').getBoundingClientRect().bottom,overflow:getComputedStyle(e).overflowY};});assert.ok(settings.height>40,JSON.stringify(settings));assert.ok(settings.bottom<=500+1,JSON.stringify(settings));assert.ok(settings.lastBottom<=settings.bottom+1,JSON.stringify(settings));
 // 기본 작성·HTML 입력은 큰 여백 없이 키보드 위에서 확정 버튼 접근.
 await page.evaluate(()=>{S.ui.themeDraft=null;S.ui.editingThemeId=null;setStage('composer');setSnap(null);$('#ta').value='새 글';$('#ta').focus();});await viewport(page,480);
 const composer=await geometry(page);assert.ok(Math.abs(composer.sheet.bottom-480)<2);assert.ok(composer.head.bottom<=composer.sheet.bottom+1);
 await page.evaluate(()=>{S.ui.insertMode='html';render();$('#ta').value='<p>HTML 입력</p>';$('#ta').focus();});await settle(page);const html=await geometry(page);assert.ok(html.head.bottom<=html.sheet.bottom+1);
 await page.evaluate(()=>modal('가시 영역 확인','키보드 위 모달'));await settle(page);const modal=await page.locator('.modal-panel').boundingBox();assert.ok(modal.y>=0 && modal.y+modal.height<=480);await page.keyboard.press('Escape');

 assert.deepEqual(errors,[]);results.push({engine:engine.name(),width,checks,formatted,restored,settings,composer,html,pop,popMoved,modal,errors});fs.writeFileSync(path.join(out,'mobile-results.json'),JSON.stringify(results,null,2));console.log(engine.name(),width,'PASS');await context.close();
 }}finally{await browser.close();}
 }
 fs.writeFileSync(path.join(out,'mobile-results.json'),JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
