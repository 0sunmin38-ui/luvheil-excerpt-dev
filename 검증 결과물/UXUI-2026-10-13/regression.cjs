const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const {chromium, webkit} = require('../../../vbody-web/node_modules/@playwright/test');
const out = path.join(__dirname, '수정후');
fs.mkdirSync(out, {recursive:true});
const results = [];
const quick = process.argv.includes('--quick');
async function check(page, label, callback) {
  await callback();
  return label;
}
(async () => {
 for (const engine of [chromium, webkit]) {
  const browser = await engine.launch({headless:true});
  try {
   for (const [width,height] of (quick ? [[390,844],[1440,900],[1500,900]] : [[320,740],[390,844],[768,1024],[900,800],[1440,900],[1500,900],[1920,1080]])) {
    const context = await browser.newContext({viewport:{width,height},isMobile:width<900,hasTouch:width<900});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',msg=>{if(msg.type()==='error' && !msg.text().includes('Failed to load resource')) errors.push(msg.text());});
    await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
    await page.waitForTimeout(150);
    const done = [];
    const record={engine:engine.name(),width,height,checks:done};
    results.push(record);
    try {
     await page.evaluate(()=>{
      S.characters=[{id:'ux-person',name:'검토 캐릭터',position:'left'}];
      S.blocks=[{id:'ux-a',type:'text',text:'첫 번째 문장'}, {id:'ux-b',type:'text',text:'두 번째 문장'}, {id:'ux-c',type:'text',text:'세 번째 문장'}, {id:'ux-footer',type:'footer',text:'서명'}];
      S.ui.charDraft=null;S.ui.themeDraft=null;S.ui.selectedBlockId=null;render();
      _histPrev=snapOf();_undoS=[];_redoS=[];
     });
     done.push(await check(page,'모달 포커스·Tab 순환·복원·Enter',async()=>{
      await page.locator('#btnReset').focus();
      await page.evaluate(()=>{window.uxApply=false;pickerModal('키보드 점검','안전한 확인',[['themes','테마','점검',true]],'확인','btn-primary',()=>{window.uxApply=true;closeModal();});});
      assert.equal(await page.evaluate(()=>!!document.activeElement.closest('.modal')),true);
      for(let i=0;i<9;i++) {await page.keyboard.press(i%2?'Shift+Tab':'Tab');assert.equal(await page.evaluate(()=>!!document.activeElement.closest('.modal')),true);}
      await page.locator('.modal input').focus();await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(()=>window.uxApply),true);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'btnReset');
     }));
     done.push(await check(page,'삭제 기본 취소·배경 단축키 차단·IME',async()=>{
      await page.evaluate(()=>{window.uxDeleted=false;confirmDelete('삭제 점검','진행하지 않아야 합니다',()=>window.uxDeleted=true);});
      assert.equal(await page.evaluate(()=>document.activeElement.textContent),'취소');
      await page.keyboard.press('Control+Enter');await page.keyboard.press('Control+z');
      assert.equal(await page.locator('.modal-panel').count(),1);
      assert.equal(await page.evaluate(()=>window.uxDeleted),false);
      await page.evaluate(()=>document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',isComposing:true,bubbles:true})));
      assert.equal(await page.locator('.modal-panel').count(),1);
      await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>window.uxDeleted),false);
      assert.equal(await page.locator('.modal-panel').count(),0);
     }));
     done.push(await check(page,'캐릭터 추가 키보드·Ctrl+Enter 저장·비활성 뷰 inert',async()=>{
      await page.evaluate(()=>setStage('tools'));await page.waitForTimeout(260);
      await page.locator('.char-add').focus();await page.keyboard.press('Enter');
      await page.locator('#charNameV2').fill('키보드 추가');await page.keyboard.press('Control+Enter');
      assert.equal(await page.evaluate(()=>S.characters.some(c=>c.name==='키보드 추가')),true);
      assert.equal(await page.evaluate(()=>$('#tabSlider').dataset.active),'0');
      assert.equal(await page.evaluate(()=>document.activeElement.closest('.char-card')?.dataset.itemId===S.characters.find(c=>c.name==='키보드 추가').id),true);
      await page.evaluate(()=>openCharEditV2('ux-person'));
      assert.equal(await page.evaluate(()=>[...$('#tabSlider').children].every((v,i)=>v.inert===(i!==1))),true);
     }));
     if(width>=900 && width<1500) done.push(await check(page,'PC 클릭 확정 후 영역 확장',async()=>{
      await page.evaluate(()=>{S.ui.charDraft=null;setSettingsView(0);});
      await page.waitForTimeout(10);
      await page.evaluate(()=>{document.activeElement.blur();setDeskPane('dock');});await page.waitForTimeout(250);
      assert.equal(await page.evaluate(()=>S.ui.deskPane),'dock','포인터 조작 전');
      const tab=await page.locator('#settingsPanel .tab-line').first().boundingBox();
      await page.mouse.move(tab.x+tab.width/2,tab.y+tab.height/2);await page.mouse.down();
      assert.equal(await page.evaluate(()=>S.ui.deskPane),'dock','포인터를 누르는 동안');
      await page.mouse.up();assert.equal(await page.evaluate(()=>S.ui.deskPane),'tools');
      await page.evaluate(()=>openCharEditV2('ux-person'));
     }));
     done.push(await check(page,'캐릭터·테마 복사 모션·사본 값·중복 방지',async()=>{
      const chars=await page.evaluate(()=>S.characters.length);
      await page.locator('#btnCharDupeV2').click();
      assert.equal(await page.evaluate(()=>getComputedStyle($('#charEditView')).animationName),'slide-copy');
      await page.evaluate(()=>$('#btnCharDupeV2').click());
      assert.equal(await page.evaluate(()=>S.characters.length),chars+1);
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(()=>$('#charNameV2').value),'검토 캐릭터 사본');
      await page.evaluate(()=>{S.ui.charDraft=null;switchSettingsTab(1);openThemeEditV2(S.themes[0].id);});await page.waitForTimeout(280);
      const themes=await page.evaluate(()=>S.themes.length);
      await page.locator('#themeEditContent button[title="복제"]').click();
      assert.equal(await page.evaluate(()=>getComputedStyle($('#themeEditView')).animationName),'slide-copy');
      await page.evaluate(()=>$('#themeEditContent button[title="복제"]').click());
      assert.equal(await page.evaluate(()=>S.themes.length),themes+1);
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(()=>$('#themeEditContent input').value.endsWith(' 사본')),true);
      assert.equal(await page.evaluate(()=>$('#themeEditView').dataset.copyBusy),undefined);
     }));
     done.push(await check(page,'명시적 계속 편집·초안 보존·설정 저장 단축키',async()=>{
      const input=page.locator('#themeEditContent input').first();await input.fill('수정한 테마');
      await page.evaluate(()=>confirmDiscardThemeDraft(()=>{}));
      assert.deepEqual(await page.locator('.modal-foot button').allTextContents(),['계속 편집','버리고 나가기','저장하고 나가기']);
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.modal-panel').count(),0);
      assert.equal(await input.inputValue(),'수정한 테마');
      await input.focus();await page.keyboard.press('Control+Enter');
      assert.equal(await page.evaluate(()=>S.themes.some(t=>t.name==='수정한 테마')),true);
      assert.equal(await page.evaluate(()=>$('#tabSlider').dataset.active),'2');
      assert.equal(await page.evaluate(()=>$('#settingsPanel .tab-line.is-on').dataset.tab),'1');
     }));
     done.push(await check(page,'아코디언 키보드·재렌더 시 스크롤/커서 보존',async()=>{
      await page.evaluate(()=>{openThemeEditV2(S.activeThemeId);S.ui.themeEditSections={frame:true,canvas:true,bg:true,bubble:true,text:true,sign:true};syncThemeEditFormV2();if(!isWide())setSnap(70);});
      const preservation=await page.evaluate(()=>{
       const input=$('#themeEditContent input');input.focus({preventScroll:true});input.setSelectionRange(1,3);
       $('#themeEditView').scrollTop=130;
       const before=$('#themeEditView').scrollTop;syncThemeEditFormV2();
       return {before,after:$('#themeEditView').scrollTop,start:document.activeElement.selectionStart,end:document.activeElement.selectionEnd,label:document.activeElement.getAttribute('aria-label')};
      });
      assert.equal(preservation.after,preservation.before);assert.equal(preservation.start,1);assert.equal(preservation.end,3);
      assert.equal(preservation.label,'테마 이름');
      const header=page.locator('#themeEditContent .section-header').first();await header.focus();await page.keyboard.press('Space');
      assert.equal(await header.getAttribute('aria-expanded'),'false');
      await page.keyboard.press('Enter');assert.equal(await header.getAttribute('aria-expanded'),'true');
     }));
     if(width<900) done.push(await check(page,'40px 손잡이·드래그 정착 모션·취소·키보드 높이 선택',async()=>{
      await page.evaluate(()=>{S.ui.themeDraft=null;setStage('tools');setSnap(45);});
      const grab=await page.locator('#sheetGrab').boundingBox();assert.equal(grab.height,40);
      await page.mouse.move(grab.x+grab.width/2,grab.y+grab.height/2);await page.mouse.down();
      await page.mouse.move(grab.x+grab.width/2,grab.y-115,{steps:8});await page.waitForTimeout(30);
      const dragged=await page.locator('#sheet').evaluate(e=>e.getBoundingClientRect().height);
      await page.mouse.up();
      const settling=await page.evaluate(()=>({running:!!sheetMotion,height:$('#sheet').getBoundingClientRect().height,snap:S.ui.snap}));
      assert.equal(settling.running,true);assert.ok(Math.abs(settling.height-dragged)<25);
      await page.waitForTimeout(260);
      assert.equal(await page.evaluate(()=>!!sheetMotion),false);
      await page.locator('#sheetGrab').focus();await page.keyboard.press('End');await page.waitForTimeout(260);
      assert.equal(await page.evaluate(()=>S.ui.snap),70);
      await page.keyboard.press('Home');await page.waitForTimeout(260);assert.equal(await page.evaluate(()=>S.ui.snap),null);
      await page.keyboard.press('ArrowUp');await page.waitForTimeout(260);assert.equal(await page.evaluate(()=>S.ui.snap),45);
      const cancel=await page.evaluate(()=>{
       const g=$('#sheetGrab'),r=g.getBoundingClientRect();
       g.dispatchEvent(new PointerEvent('pointerdown',{pointerId:99,clientY:r.top+20,button:0,bubbles:true}));
       g.dispatchEvent(new PointerEvent('pointermove',{pointerId:99,clientY:r.top-100,bubbles:true}));
       g.dispatchEvent(new PointerEvent('pointercancel',{pointerId:99,bubbles:true}));
       return S.ui.snap;
      });assert.equal(cancel,45);
      await page.locator('#btnSheetSize').click();
      await page.getByRole('button',{name:'큰 크기 · 70%',exact:true}).click();await page.waitForTimeout(260);
      assert.equal(await page.evaluate(()=>S.ui.snap),70);
     }));
     done.push(await check(page,'동작 줄이기·테마 복사 즉시 완료',async()=>{
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.evaluate(()=>openThemeEditV2(S.activeThemeId));
      await page.locator('#themeEditContent button[title="복제"]').click();
      assert.equal(await page.evaluate(()=>getComputedStyle($('#themeEditView')).animationName),'none');
      assert.equal(await page.evaluate(()=>$('#themeEditView').dataset.copyBusy),undefined);
      assert.equal(await page.evaluate(()=>getComputedStyle($('#tabSlider')).transitionDuration),'0s');
      await page.emulateMedia({reducedMotion:'no-preference'});
     }));
     done.push(await check(page,'드래그 없는 블록 이동·서명 마지막 유지·실행취소',async()=>{
      await page.evaluate(()=>{S.ui.themeDraft=null;S.ui.editingThemeId=null;setStage('composer');_histPrev=snapOf();_undoS=[];_redoS=[];});
      await page.locator('#canvas .blk').first().focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(()=>S.ui.selectedBlockId),'ux-b');
      await page.locator('#formatWrap button[title="블록 순서 이동"]').click();
      await page.getByRole('button',{name:'맨 위로',exact:true}).click();
      assert.equal(await page.evaluate(()=>S.blocks[0].id),'ux-b');
      assert.equal(await page.evaluate(()=>S.blocks.at(-1).type),'footer');
      await page.evaluate(()=>histUndo());assert.equal(await page.evaluate(()=>S.blocks[0].id),'ux-a');
     }));
     done.push(await check(page,'저장 결과창 포커스·지속 경고·닫기 복원',async()=>{
      await page.locator('#btnSave').focus();
      await page.evaluate(()=>{const blob=new Blob(['sample'],{type:'image/png'});openSaveSheet([{blob,url:URL.createObjectURL(blob),name:'점검.png'}]);reportExportWarning('누락된 이미지가 있습니다 · 결과를 확인해주세요');});
      assert.equal(await page.evaluate(()=>!!document.activeElement.closest('#saveSheet')),true);
      assert.equal(await page.locator('.savesheet-warning').count(),1);
      await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>!!document.activeElement.closest('#saveSheet')),true);
      await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'btnSave');
      assert.equal(await page.evaluate(()=>$('.shell').inert),false);
      await page.getByRole('button',{name:'알림 닫기'}).click();
     }));
     done.push(await check(page,'PNG 중복 실행 차단·진행 표시·실패 복구',async()=>{
      const exportState=await page.evaluate(async()=>{
       const original=buildPNG;let runs=0;let release;
       buildPNG=()=>{runs++;return new Promise(resolve=>{release=resolve;});};
       const pending=exportPNG();exportPNG();
       const during={runs,disabled:$('#btnSave').disabled,busy:$('#btnSave').getAttribute('aria-busy'),locked:$('.shell').inert};
       release();await pending;
       const after={disabled:$('#btnSave').disabled,locked:$('.shell').inert};buildPNG=original;
       return {during,after};
      });assert.deepEqual(exportState,{during:{runs:1,disabled:true,busy:'true',locked:true},after:{disabled:false,locked:false}});
      const failure=await page.evaluate(async()=>{
       const original=buildPNG, log=console.error;
       buildPNG=async()=>{throw new Error('점검용 저장 실패');};console.error=()=>{};
       try {await exportPNG();return {busy:exportBusy,disabled:$('#btnSave').disabled,inert:$('.shell').inert,warning:$('#toast').classList.contains('is-persistent')};}
       finally {buildPNG=original;console.error=log;}
      });assert.deepEqual(failure,{busy:false,disabled:false,inert:false,warning:true});
      await page.getByRole('button',{name:'알림 닫기'}).click();
     }));
     assert.deepEqual(errors,[]);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
     await page.evaluate(()=>{S.ui.charDraft=null;S.ui.themeDraft=null;S.ui.editingThemeId=null;setStage('tools');openThemeEditV2(S.activeThemeId);});
     await page.waitForTimeout(280);
     await page.screenshot({path:path.join(out,engine.name()+'-'+width+'-theme.png'),animations:'disabled',timeout:10000});
     record.passed=true;console.log(JSON.stringify(record));
    } catch(error) {
     record.passed=false;record.failure=error.message;record.errors=errors;
     console.error(JSON.stringify(record));
     await page.screenshot({path:path.join(out,engine.name()+'-'+width+'-failure.png'),timeout:5000}).catch(()=>{});
    } finally {await context.close();fs.writeFileSync(path.join(out,quick?'results.quick.json':'results.json'),JSON.stringify(results,null,2));}
   }
  } finally {await browser.close();}
 }
 if(results.some(record=>!record.passed)) process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
