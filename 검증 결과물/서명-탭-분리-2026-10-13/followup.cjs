const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
const results=[];
async function check(r,name,fn){try{await fn();r.checks.push({name,passed:true});}catch(e){r.checks.push({name,passed:false,error:e.message});console.log('FAIL',r.engine,name,e.message);}}
(async()=>{for(const[engine,type]of Object.entries({chromium,webkit})){
 const browser=await type.launch();const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(5000);
 const r={engine,checks:[]};results.push(r);
 const modal=async text=>{await page.locator('#modalRoot button').filter({hasText:new RegExp('^'+text+'$')}).click();await page.waitForTimeout(150);};
 const signEdit=async()=>{await page.evaluate(()=>{setStage('tools');setSnap(90);switchSettingsTab(2);openSignEditV2(S.signatures[0].id);});await page.locator('#signMakerV2').fill('@초안');};
 try{
  await page.goto('http://127.0.0.1:8766',{waitUntil:'domcontentloaded'});
  await check(r,'이전 저장의 재부팅 멱등성',async()=>{
   await page.evaluate(()=>localStorage.setItem(KEY,JSON.stringify({v:16,blocks:[{id:'f',type:'footer',text:'**옛 서명**'}],themes:[{id:'t',name:'사용자',signChar:'이름',signMaker:'@old',signShow:true}],activeThemeId:'t'})));
   await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.evaluate(()=>activeSign().maker),'옛 서명');const first=await page.evaluate(()=>JSON.stringify(S.signatures));
   await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.evaluate(()=>JSON.stringify(S.signatures)),first);
  });
  await check(r,'선택과 삭제의 실행취소·재실행',async()=>{
   assert.equal(await page.evaluate(()=>{
    _histPrev=snapOf();_histAt=0;_undoS=[];_redoS=[];const id=S.activeSignId;
    S.activeSignId=null;save();histUndo();const a=S.activeSignId===id;histRedo();const b=S.activeSignId===null;
    _histAt=0;const count=S.signatures.length;S.signatures.splice(0,1);save();histUndo();const c=S.signatures.length===count;histRedo();const d=S.signatures.length===count-1;
    histUndo();return a&&b&&c&&d;
   }),true);
  });
  await check(r,'패널 닫기·Escape·NAV의 초안 보호',async()=>{
   for(const trigger of ['close','escape','nav']){
    await signEdit(page);
    if(trigger==='close')await page.evaluate(()=>closeSettingsPanel());
    if(trigger==='escape')await page.keyboard.press('Escape');
    if(trigger==='nav')await page.evaluate(()=>NAV_BTN.click());
    assert.equal(await page.locator('#modalRoot .modal-foot').count(),1);
    await modal('계속 편집');assert.equal(await page.locator('#signMakerV2').inputValue(),'@초안');
    await page.evaluate(()=>switchSettingsTab(2));await modal('나가기');
   }
  });
  await check(r,'블록 편집·이미지 추가 진입을 초안 확인 뒤에 실행',async()=>{
   await page.evaluate(()=>{S.blocks=[{id:'body',type:'text',text:'블록 회귀 검사',asBubble:false}];renderCanvas();});
   await signEdit(page);await page.evaluate(()=>editCanvasBlock('body'));await modal('계속 편집');
   assert.equal(await page.evaluate(()=>S.ui.stage),'tools');assert.equal(await page.evaluate(()=>S.ui.selectedBlockId),null);
   await page.evaluate(()=>editCanvasBlock('body'));await modal('저장');assert.equal(await page.evaluate(()=>S.ui.stage),'format');assert.equal(await page.evaluate(()=>S.ui.selectedBlockId),'body');
   await page.evaluate(()=>setStage('composer'));await signEdit(page);await page.locator('#signMakerV2').fill('@사진 초안');
   await page.evaluate(()=>startNew('image'));await modal('계속 편집');assert.equal(await page.evaluate(()=>S.ui.newKind),null);
   await page.evaluate(()=>startNew('image'));await modal('나가기');assert.equal(await page.evaluate(()=>S.ui.newKind),'image');
   assert.equal(await page.evaluate(()=>typeof buildEditHeader==='function'&&typeof buildMusicEditor==='function'&&typeof buildImageEditor==='function'),true);
  });
  await check(r,'테마 토글 요약·편집 연결의 초안 확인',async()=>{
   await page.evaluate(()=>{S.ui.newKind=null;setStage('tools');switchSettingsTab(1);openThemeEditV2(S.activeThemeId);S.ui.themeEditSections={sign:true};S.ui.themeDraft.signShow=false;S.themes.find(t=>t.id===S.activeThemeId).signShow=false;syncThemeEditFormV2();});
   assert.equal(await page.locator('.signature-summary').count(),0);
   await page.locator('.signature-settings .tgl').click();assert.equal(await page.locator('.signature-summary').count(),1);
   assert.ok((await page.locator('.signature-summary').textContent()).includes('[ 서명 없음 ]'));
   await page.locator('.signature-summary button').click();await modal('계속 편집');assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'3');
   await page.locator('.signature-summary button').click();await modal('저장');assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'4');
  });
  await check(r,'구 설정 파일 업로드와 서명만 덮어쓰기',async()=>{
   const before=await page.evaluate(()=>S.themes.length);
   const source={__type:'chat-excerpt/settings',__v:1,themes:[{id:'import-theme',name:'구 파일',signChar:'파일 이름',signMaker:'@file',signShow:true}],activeThemeId:'import-theme'};
   await page.locator('#settingsPick').setInputFiles({name:'old-settings.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(source))});
   await page.locator('#modalRoot input[value="themes"]').uncheck();assert.equal(await page.locator('#modalRoot input[value="signatures"]').isChecked(),true);
   await page.locator('#modalRoot .seg button').filter({hasText:'덮어쓰기'}).click();await modal('불러오기');
   assert.equal(await page.evaluate(()=>S.themes.length),before);assert.equal(await page.evaluate(()=>activeSign().charName),'파일 이름');
  });
  await check(r,'초기화 갈래 독립과 서명 시드',async()=>{
   const id=await page.evaluate(()=>S.activeSignId);
   await page.evaluate(()=>openResetModal());await page.locator('#modalRoot input[value="themes"]').check();await modal('초기화');assert.equal(await page.evaluate(()=>S.activeSignId),id);
   const themeId=await page.evaluate(()=>S.activeThemeId);
   await page.evaluate(()=>openResetModal());await page.locator('#modalRoot input[value="signatures"]').check();await modal('초기화');assert.equal(await page.evaluate(()=>S.activeThemeId),themeId);assert.equal(await page.evaluate(()=>signText(theme())),'해이 · @luvheil');
  });
  await check(r,'장식형·통합 제목의 효과 없는 서식 숨김',async()=>{
   for(const kind of ['paper','buddy','ebook-modern']){
    await page.evaluate(kind=>{setStage('tools');switchSettingsTab(1);openThemeEditV2(S.activeThemeId);S.ui.themeDraft.header=kind==='buddy'?'none':kind;S.ui.themeDraft.frame=kind==='buddy'?'buddy':'none';S.ui.themeDraft.signShow=true;S.ui.themeEditSections={sign:true};syncThemeEditFormV2();},kind);
    assert.equal(await page.locator('.signature-settings [aria-label="서명 정렬"]').count(),0);
    assert.equal(await page.locator('.signature-settings').getByText('서식',{exact:true}).count(),0);
    assert.equal(await page.locator('.signature-settings .tgl').count(),kind==='paper'?1:0);
    await page.evaluate(()=>switchSettingsTab(2));if(await page.locator('#modalRoot .modal-foot').count())await modal('나가기');
   }
  });
  await check(r,'한글 입력·높이 변경·폭 전환 중 폼 보존',async()=>{
   await signEdit(page);await page.locator('#signNameV2').fill('입력 유지');
   await page.evaluate(()=>{window.savedInput=document.querySelector('#signNameV2');savedInput.focus();});
   await page.setViewportSize({width:390,height:500});await page.waitForTimeout(200);
   assert.equal(await page.evaluate(()=>window.savedInput===document.querySelector('#signNameV2')&&savedInput.isConnected),true);
   await page.setViewportSize({width:1000,height:844});await page.waitForTimeout(300);assert.equal(await page.locator('#signNameV2').inputValue(),'입력 유지');
   await page.setViewportSize({width:390,height:844});await page.waitForTimeout(300);assert.equal(await page.locator('#signNameV2').inputValue(),'입력 유지');
   assert.equal(await page.evaluate(()=>document.activeElement===window.savedInput),true);
  });
  await check(r,'none ID 가져오기와 없음 카드의 선택 포커스 분리',async()=>{
   await page.evaluate(()=>{S.ui.signDraft=null;S.ui.editingSignId=null;applySettings({signatures:[{id:'none',charName:'ID 검사',maker:''}],activeSignId:'none'},new Set(['signatures']),'replace');renderSignListV2();setSettingsView(4);});
   await page.locator('#signListContainer [data-item-id="none"] .sign-choice').click();assert.equal(await page.evaluate(()=>document.activeElement.closest('.sign-card').dataset.itemId),'none');
   await page.locator('#signListContainer [data-item-id=""] .sign-choice').click();assert.equal(await page.evaluate(()=>S.activeSignId),null);
   await page.locator('#signListContainer [data-item-id="none"] .edit-btn').click();
  });
  await check(r,'특수문자는 HTML로 실행되지 않음',async()=>{
   await page.locator('#signNameV2').fill('<img src=x onerror=alert(1)> 🚬');await page.locator('#btnSignSaveV2').click();
   assert.equal(await page.locator('#signListContainer img').count(),0);assert.ok((await page.locator('#signListContainer').textContent()).includes('<img'));
  });
  await check(r,'긴 서명의 일반·통합 제목·이북 렌더 넘침 방지',async()=>{
   const data=await page.evaluate(()=>{
    S.ui.themeDraft=null;S.ui.editingThemeId=null;S.signatures=[{id:'long',charName:'가'.repeat(80),maker:'@'+'x'.repeat(100)}];S.activeSignId='long';
    const t=Object.assign(DEF_THEME(),{frame:'none',signShow:true});t.canvas={...DEF_CANVAS,mode:'fit',width:360};S.themes=[t];S.activeThemeId=t.id;S.blocks=[{id:'body',type:'text',text:'본문'}];
    return ['none','paper','ebook-modern'].map(header=>{t.header=header;renderCanvas();const node=document.querySelector(header==='paper'?'.paper-authors':header==='ebook-modern'?'.cv-foot-ebook-modern .hd-row':'.blk-footer');return {header,ok:!!node&&node.scrollWidth<=node.clientWidth+2};});
   });assert.ok(data.every(x=>x.ok),JSON.stringify(data));
  });
  await check(r,'콘솔 오류 없음',async()=>assert.deepEqual(errors,[]));
 }finally{await browser.close();}
}
fs.writeFileSync(path.join(__dirname,'followup-results.json'),JSON.stringify(results,null,2));const failed=results.flatMap(x=>x.checks).filter(x=>!x.passed);console.log('followup checks',results.reduce((n,x)=>n+x.checks.length,0),'failed',failed.length);if(failed.length)process.exitCode=1;
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'followup-results.json'),JSON.stringify(results,null,2));console.error(e);process.exitCode=1;});
