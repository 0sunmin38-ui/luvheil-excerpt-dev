const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
const before=process.argv.includes('--before'),out=__dirname,results=[];
const pause=page=>page.waitForTimeout(120);
async function fresh(page){await page.evaluate(()=>{closeModal();closePop();closeActionMenu();S.ui.themeDraft=null;S.ui.charDraft=null;S.ui.editingThemeId=null;S.ui.selectedBlockId=null;setStage('composer');setSnap(null);S.blocks=[];render();});await pause(page);}
async function vv(page,height,offsetTop=0){await page.evaluate(({height,offsetTop})=>{if(!window.testVV){window.testVV=new EventTarget();Object.defineProperty(window,'visualViewport',{configurable:true,value:window.testVV});}Object.assign(window.testVV,{height,offsetTop,scale:1,width:innerWidth});syncViewportVars();},{height,offsetTop});await pause(page);}
async function check(record,name,fn){try{record.details[name]=await fn();record.checks.push({name,passed:true});}catch(e){record.checks.push({name,passed:false,error:e.message});}}
(async()=>{
for(const engine of [chromium,webkit]){
const browser=await engine.launch({headless:true});try{
for(const width of (before?[390,1440]:[320,390,768,900,1440,1500])){
const context=await browser.newContext({viewport:{width,height:844},isMobile:width<900,hasTouch:width<900});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
if(before)await page.route('http://127.0.0.1:8766/',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(path.join(out,'index-before.html'),'utf8')}));
await page.goto('http://127.0.0.1:8766/',{waitUntil:'domcontentloaded'});await pause(page);
const record={engine:engine.name(),width,checks:[],details:{}};results.push(record);
await check(record,'삭제 요청 컨트롤·모달 코드 없음',async()=>{
const data=await page.evaluate(()=>({size:$('#btnSheetSize')!==null,moving:typeof openBlockMoveModal,quick:$('#formatQuick')!==null,menu:$('#actionMenu').textContent}));assert.equal(data.size,false);assert.equal(data.moving,'undefined');assert.equal(data.quick,false);assert.ok(!data.menu.includes('패널 크기'));return data;
});
await fresh(page);
await check(record,'설정 버튼 실제 클릭·입력 초기화·버튼 상태',async()=>{
await page.locator('#ta').fill('작성 중인 문장');assert.equal(await page.locator('#btnAdd').evaluate(e=>e.classList.contains('is-send')),true);
await page.locator('#btnSettings').click();await page.waitForTimeout(300);
const state=await page.evaluate(()=>({stage:S.ui.stage,pane:S.ui.deskPane,snap:S.ui.snap,classPane:$('#sheet').classList.contains('pane-tools'),text:$('#ta').textContent,send:$('#btnAdd').classList.contains('is-send'),label:$('#btnAdd').getAttribute('aria-label'),open:$('#settingsPanel').classList.contains('is-open'),body:$('#sheetBody').getBoundingClientRect().height,sheet:$('#sheet').getBoundingClientRect().height}));
assert.equal(state.stage,'tools');assert.equal(state.open,true);assert.equal(state.text,'');assert.equal(state.send,false);assert.equal(state.label,'요소 추가');if(width<900)assert.equal(state.snap,70);if(width>=900&&width<1500){assert.equal(state.pane,'tools');assert.equal(state.classPane,true);assert.ok(state.body/state.sheet>.6);}return state;
});
await fresh(page);
await check(record,'작성 Enter 줄바꿈·Ctrl Enter 확정',async()=>{
await page.locator('#ta').fill('첫 줄');await page.keyboard.press('End');await page.keyboard.press('Enter');await page.keyboard.type('둘째 줄');
const line=await page.evaluate(()=>({text:$('#ta').value,blocks:S.blocks.length}));assert.equal(line.blocks,0);assert.ok(line.text.includes('\n'));await page.keyboard.press('Control+Enter');await pause(page);const sent=await page.evaluate(()=>({blocks:S.blocks.length,text:$('#ta').textContent,send:$('#btnAdd').classList.contains('is-send')}));assert.equal(sent.blocks,1);assert.equal(sent.text,'');assert.equal(sent.send,false);return {line,sent};
});
await fresh(page);
await check(record,'액션 메뉴 최상위 오버레이·화면 경계·선택',async()=>{
await page.evaluate(()=>setSnap(70));await pause(page);await page.locator('#btnAdd').click();await pause(page);
const data=await page.evaluate(()=>{const menu=$('#actionMenu'),r=menu.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+20);return {insideSheet:!!menu.closest('#sheet'),parent:menu.parentElement.tagName,hidden:menu.hidden,top:r.top,bottom:r.bottom,hit:menu.contains(hit),height:innerHeight};});assert.equal(data.hidden,false);assert.equal(data.insideSheet,false);assert.ok(data.hit);assert.ok(data.top>=0&&data.bottom<=data.height);await page.screenshot({path:path.join(out,`${before?'before':'after'}-${engine.name()}-${width}-menu.png`)});
await page.locator('#actionMenu [data-action="music"]').click();await pause(page);assert.equal(await page.locator('#actionMenu').isVisible(),false);assert.equal(await page.locator('#btnSheetSize').count(),0);return data;
});
await fresh(page);
await check(record,'미저장 확인 이름과 계속 편집',async()=>{
await page.evaluate(()=>{S.characters=[{id:'follow-character',name:'원본'}];render();setStage('tools');openCharEditV2('follow-character');});await page.locator('#charNameV2').fill('수정');await page.evaluate(()=>confirmDiscardCharDraft(()=>{}));await pause(page);const names=await page.locator('.modal-foot button').allTextContents();assert.deepEqual(names,['계속 편집','나가기','저장']);await page.getByRole('button',{name:'계속 편집',exact:true}).click();assert.equal(await page.locator('#charNameV2').inputValue(),'수정');return names;
});
await fresh(page);
await check(record,'서식 원래 위치·이동 버튼 제거·부분 선택 적용',async()=>{
await page.evaluate(()=>{S.blocks=[{id:'follow-block',type:'text',text:'선택할 문장을 확인합니다.'}];render();editCanvasBlock('follow-block');$('#ta').focus();});await pause(page);
assert.equal(await page.locator('#formatWrap .fmt-section').count(),1);assert.equal(await page.locator('#formatWrap button[title="블록 순서 이동"]').count(),0);
const order=await page.locator('.fmt-section .tool-line').allTextContents();assert.ok(order[0].includes('글꼴'));assert.ok(order[1].includes('정렬'));assert.ok(order[2].includes('서식'));
await page.evaluate(()=>{const ta=$('#ta'),r=document.createRange();r.setStart(ta.firstChild,0);r.setEnd(ta.firstChild,3);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);trackSel();});
await page.locator('#formatWrap button[title="굵게"]').click();await pause(page);const fmt=await page.evaluate(()=>({html:$('#ta').innerHTML,selection:getSelection().toString()}));assert.equal(fmt.selection.length,3);assert.ok(fmt.html.includes('<b>')||fmt.html.includes('font-weight'));return {order,fmt};
});
if(width<900){
 await fresh(page);
 await check(record,'키보드+패널 빈 영역·캔버스 터치·전환 오프셋',async()=>{
 await page.evaluate(()=>{S.blocks=[{id:'visible-block',type:'text',text:'터치 가능한 캔버스'}];render();setSnap(70);$('#ta').value='새로 작성할 내용';$('#ta').focus();});await vv(page,440,40);
 const writing=await page.evaluate(()=>{const stage=$('#stage').getBoundingClientRect(),sheet=$('#sheet').getBoundingClientRect(),head=$('#sheetHead').getBoundingClientRect(),header=$('.topbar').getBoundingClientRect();const hit=document.elementFromPoint(stage.left+stage.width/2,stage.top+stage.height/2);return {stage:{top:stage.top,bottom:stage.bottom,height:stage.height},sheet:{top:sheet.top,bottom:sheet.bottom,height:sheet.height},headBottom:head.bottom,headerTop:header.top,hit:hit?.id||hit?.className};});
 assert.ok(Math.abs(writing.stage.bottom-writing.sheet.top)<2);assert.equal(writing.headerTop,0);assert.equal(writing.sheet.bottom,844);assert.ok(writing.stage.height>=48);assert.ok(writing.sheet.bottom-writing.headBottom<20);assert.ok(!['sheet','sheetBody'].includes(writing.hit));
 await page.keyboard.press('Control+Enter');await pause(page);await vv(page,844,40); // 키보드 닫힘 중 height와 offsetTop 갱신 시점 불일치
 const closed=await page.evaluate(()=>({top:$('.topbar').getBoundingClientRect().top,bottom:$('#sheet').getBoundingClientRect().bottom,scrollY,docHeight:document.documentElement.scrollHeight,h:innerHeight}));assert.equal(closed.top,0);assert.equal(closed.bottom,844);assert.equal(closed.scrollY,0);assert.ok(closed.docHeight<=closed.h);
 await page.locator('#btnSettings').click();await pause(page);await vv(page,480,20);const settings=await page.evaluate(()=>{const stage=$('#stage').getBoundingClientRect(),sheet=$('#sheet').getBoundingClientRect();return {stageBottom:stage.bottom,stageHeight:stage.height,sheetTop:sheet.top,sheetBottom:sheet.bottom};});assert.ok(Math.abs(settings.stageBottom-settings.sheetTop)<2);assert.equal(settings.sheetBottom,844);assert.ok(settings.stageHeight>=48);
 await vv(page,844,20);assert.equal(await page.evaluate(()=>$('.topbar').getBoundingClientRect().top),0);await page.screenshot({path:path.join(out,`${before?'before':'after'}-${engine.name()}-${width}-settings.png`)});return {writing,closed,settings};
 });
 await fresh(page);await vv(page,844);
 await check(record,'블록 편집 시 캔버스 위치·키보드 전환 중 입력 높이 유지',async()=>{
 await page.evaluate(()=>{
  S.blocks=Array.from({length:32},(_,i)=>({id:'focus-'+i,type:'text',text:i===22?Array(20).fill('높이가 유지되는 편집 문장입니다.').join('\n'):'스크롤할 문장 '+i}));
  theme().canvas.mode='fit';render();$('#stage').scrollTop=0;editCanvasBlock('focus-22');$('#ta').focus();setSnap(70);
 });await pause(page);
 const measure=()=>page.evaluate(()=>{
  const r=[...$('#canvas').querySelectorAll('.blk')].find(row=>row.dataset.id==='focus-22').getBoundingClientRect(),stage=$('#stage').getBoundingClientRect();
  return {input:$('#ta').getBoundingClientRect().height,header:$('#sheetHead').getBoundingClientRect().height,blockTop:r.top,blockBottom:r.bottom,stageTop:stage.top,stageBottom:stage.bottom,stageHeight:stage.height,focus:document.activeElement.id};
 });
 const opened=await measure();assert.ok(opened.blockTop<opened.stageBottom&&opened.blockBottom>opened.stageTop,JSON.stringify(opened));
 await vv(page,480);const keyboard=await measure();assert.ok(Math.abs(opened.input-keyboard.input)<1,JSON.stringify({opened,keyboard}));assert.ok(keyboard.blockTop<keyboard.stageBottom&&keyboard.blockBottom>keyboard.stageTop,JSON.stringify(keyboard));assert.equal(keyboard.focus,'ta');
 const tap=await page.evaluate(()=>{const stage=$('#stage').getBoundingClientRect(),row=[...$('#canvas').querySelectorAll('.blk')].find(r=>r.dataset.id==='focus-22'),r=row.getBoundingClientRect();const hit=document.elementFromPoint(Math.max(stage.left+5,r.left+r.width/2),Math.min(stage.bottom-5,Math.max(stage.top+5,r.top+5)));return row.contains(hit);});assert.ok(tap);
 await vv(page,844);const closed=await measure();assert.ok(Math.abs(closed.input-opened.input)<1);return {opened,keyboard,closed,tap};
 });
 await fresh(page);await vv(page,480,20);
 await check(record,'키보드 열린 액션 메뉴·색상 오버레이 경계',async()=>{
 await page.evaluate(()=>setSnap(70));await pause(page);await page.locator('#btnAdd').click();await pause(page);const mr=await page.locator('#actionMenu').boundingBox();assert.ok(mr.y>=20&&mr.y+mr.height<=500);await page.locator('#actionMenu [data-action="divider"]').click();await pause(page);
 await page.evaluate(()=>{S.blocks=[{id:'color-block',type:'text',text:'색을 선택할 문장'}];render();editCanvasBlock('color-block');$('#ta').focus();setSnap(70);});await pause(page);await page.locator('#formatWrap button[title^="글자 색"]').click();await pause(page);const pr=await page.locator('.pop').boundingBox();assert.ok(pr.y>=20&&pr.y+pr.height<=500);const hit=await page.locator('.pop').evaluate(e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+15));});assert.ok(hit);await page.evaluate(()=>closePop());return {menu:mr,palette:pr};
 });
}
record.errors=errors;record.passed=record.checks.every(c=>c.passed)&&errors.length===0;fs.writeFileSync(path.join(out,before?'before-results.json':'results.json'),JSON.stringify(results,null,2));console.log(engine.name(),width,record.passed?'PASS':record.checks.filter(c=>!c.passed));await context.close();
}}finally{await browser.close();}
}
if(!before&&results.some(r=>!r.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
