const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
const out=__dirname, results=[];
async function check(rec,name,fn){try{await fn();rec.checks.push({name,passed:true});}catch(e){rec.checks.push({name,passed:false,error:e.message});console.log('FAIL',rec.engine,rec.width,name,e.message);}}
async function fresh(browser,width=390,seed){
 const ctx=await browser.newContext({viewport:{width,height:1000},hasTouch:width<900,isMobile:width<900});
 if(seed)await ctx.addInitScript(d=>localStorage.setItem('chat-excerpt/v1',JSON.stringify(d)),seed);
 const page=await ctx.newPage();page.setDefaultTimeout(6000);const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8766',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(150);
 return {ctx,page,errors};
}
async function readySign(page){
 await page.evaluate(()=>{setStage('tools');if(!isWide())setSnap(90);switchSettingsTab(2);});
 await page.waitForTimeout(350);
}
async function modalChoice(page,text){await page.locator('#modalRoot button').filter({hasText:new RegExp('^'+text+'$')}).click();await page.waitForTimeout(100);}
(async()=>{
 for(const [engine,browserType]of Object.entries({chromium,webkit})){
  const browser=await browserType.launch({headless:true});
  try{
   for(const width of [320,390,1000,1500]){
    const rec={engine,width,checks:[]};results.push(rec);
    const {ctx,page,errors}=await fresh(browser,width);
    await readySign(page);
    await check(rec,'탭 순서와 기본 서명 선택',async()=>{
     assert.deepEqual(await page.locator('#settingsPanel .tab-line').allTextContents(),['캐릭터','테마','서명']);
     assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'4');
     assert.equal(await page.locator('#signListContainer .is-on').count(),1);
     assert.equal(await page.locator('#signListContainer .is-on .sign-choice').getAttribute('aria-pressed'),'true');
    });
    await check(rec,'서명 추가 및 확정 전 내용 보호',async()=>{
     await page.locator('#btnAddSignV2').click();
     await page.locator('#signNameV2').fill('서명 테스트 이름');await page.locator('#signMakerV2').fill('@제작자');
     assert.equal(await page.evaluate(()=>S.signatures.length),1);
     await page.locator('#btnSignSaveV2').click();
     assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'4');
     assert.equal(await page.locator('#signListContainer .is-on .sign-choice').textContent(),'서명 테스트 이름 · @제작자');
    });
    await check(rec,'선택 없음 및 테마 요약의 편집 이동',async()=>{
     await page.locator('#signListContainer [data-item-id=""] .sign-choice').click();
     await page.evaluate(()=>{switchSettingsTab(1);openThemeEditV2(S.themes.find(t=>t.name==='simple(white)')?.id||S.activeThemeId);S.ui.themeEditSections={sign:true};S.ui.themeDraft.signShow=true;syncThemeEditFormV2();});
     assert.equal(await page.locator('.signature-summary .sign-value').textContent(),'[ 서명 없음 ]');
     await page.locator('.signature-summary button').click();
     if(await page.locator('#modalRoot button').filter({hasText:/^저장$/}).count())await modalChoice(page,'저장');
     assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'4');
     await page.locator('#signListContainer .sign-card').nth(2).locator('.sign-choice').click();
    });
    await check(rec,'서명 편집 초안 이탈 취소/버리기/저장',async()=>{
     await page.locator('#signListContainer .is-on .edit-btn').click();
     await page.locator('#signMakerV2').fill('@미저장');
     await page.locator('#settingsPanel [data-tab="1"]').click();await modalChoice(page,'계속 편집');
     assert.equal(await page.locator('#signMakerV2').inputValue(),'@미저장');
     await page.locator('#settingsPanel [data-tab="1"]').click();await modalChoice(page,'나가기');
     assert.equal(await page.evaluate(()=>activeSign().maker),'@제작자');
     await readySign(page);await page.locator('#signListContainer .is-on .edit-btn').click();
     await page.locator('#signMakerV2').fill('@저장됨');
     await page.locator('#btnSignBack').click();await modalChoice(page,'저장');
     assert.equal(await page.evaluate(()=>activeSign().maker),'@저장됨');
    });
    await check(rec,'빈 편집 저장 차단 및 확인창 유지',async()=>{
     await page.locator('#signListContainer .is-on .edit-btn').click();
     await page.locator('#signNameV2').fill('');await page.locator('#signMakerV2').fill('  ');
     await page.locator('#btnSignBack').click();await modalChoice(page,'저장');
     assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'5');
     assert.equal(await page.locator('#modalRoot .modal-foot').count(),1);
     await modalChoice(page,'나가기');
    });
    await check(rec,'복사 즉시 선택·삭제·포커스 복귀',async()=>{
     await page.locator('#signListContainer .is-on .edit-btn').click();
     const before=await page.evaluate(()=>S.signatures.length);
     await page.locator('#btnSignDupeV2').click();await page.waitForTimeout(450);
     assert.equal(await page.evaluate(()=>S.signatures.length),before+1);
     assert.equal(await page.evaluate(()=>S.activeSignId===S.ui.editingSignId),true);
     await page.locator('#btnSignDeleteV2').click();await modalChoice(page,'삭제');
     assert.equal(await page.evaluate(()=>S.activeSignId),null);
     assert.equal(await page.evaluate(()=>document.activeElement.closest('#signListView')!==null),true);
    });
    await check(rec,'단축키 저장·IME 저장 방지',async()=>{
     await page.locator('#btnAddSignV2').click();await page.locator('#signNameV2').fill('키보드');
     await page.locator('#signNameV2').dispatchEvent('keydown',{key:'Enter',ctrlKey:true,isComposing:true});
     assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'5');
     await page.locator('#signNameV2').press('Control+Enter');
     assert.equal(await page.locator('#tabSlider').getAttribute('data-active'),'4');
    });
    await check(rec,'좁은 배치·숨은 뷰 inert·긴 문자열',async()=>{
     await page.evaluate(()=>{activeSign().charName='가'.repeat(100);activeSign().maker='@'+'x'.repeat(100);renderSignListV2();});
     const bad=await page.evaluate(()=>[...document.querySelectorAll('#signListView,.sign-card,.sign-choice,#settingsPanel .tab-line')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.className));
     assert.deepEqual(bad,[]);
     assert.equal(await page.evaluate(()=>[...document.querySelector('#tabSlider').children].filter(x=>!x.inert).length),1);
     await page.screenshot({animations:'disabled',path:path.join(out,`${engine}-${width}-list.png`)});
     await page.locator('#signListContainer .is-on .edit-btn').click();
     await page.screenshot({animations:'disabled',path:path.join(out,`${engine}-${width}-edit.png`)});
     assert.equal(await page.evaluate(()=>document.querySelector('#signEditView').scrollWidth<=document.querySelector('#signEditView').clientWidth+2),true);
    });
    await check(rec,'콘솔 오류 없음',async()=>assert.deepEqual(errors,[]));await ctx.close();
   }
   const rec={engine,width:'data-render-export',checks:[]};results.push(rec);
   const {ctx,page,errors}=await fresh(browser,1500);
   await check(rec,'구 설정 파일 이전과 선택 독립·ID 충돌',async()=>{
    const data=await page.evaluate(()=>{
     const old={themes:[{id:'old-theme',signChar:'옛 이름',signMaker:'@old',signShow:false}],activeThemeId:'old-theme'};
     const normalized=normalizeSettingsSignatures(old);
     const saved=S.activeSignId;
     applySettings(old,new Set(['themes']),'merge');const kept=S.activeSignId===saved;
     applySettings(old,new Set(['signatures']),'replace');const chosen=activeSign().charName;
     const id=S.activeSignId,n=S.signatures.length;
     applySettings({signatures:[{id,charName:'충돌',maker:'@new'}],activeSignId:id},new Set(['signatures']),'merge');
     const collision=S.signatures.length===n+1&&S.signatures.at(-1).id!==id&&S.activeSignId===id;
     S.activeSignId=null;applySettings({signatures:[{id:'other',charName:'다른 이름',maker:''}],activeSignId:'other'},new Set(['signatures']),'merge');
     const nullKept=S.activeSignId===null;
     applySettings({signatures:[],activeSignId:null},new Set(['signatures']),'replace');
     return {kept,chosen,collision,nullKept,empty:S.signatures.length===0,sourceUntouched:!!old.themes[0].signChar,normalized:normalized.themes[0].signChar===undefined};
    });
    assert.deepEqual(data,{kept:true,chosen:'옛 이름',collision:true,nullKept:true,empty:true,sourceUntouched:true,normalized:true});
   });
   await check(rec,'실행취소·재실행 목록과 선택 복원',async()=>{
    assert.equal(await page.evaluate(()=>{
     S.signatures=[{id:'history',charName:'전',maker:''}];S.activeSignId='history';save();
     _histPrev=snapOf();_histAt=0;_undoS=[];_redoS=[];
     S.signatures[0].charName='후';save();histUndo();const undo=signText(theme())==='전';histRedo();
     return undo&&signText(theme())==='후';
    }),true);
   });
   await check(rec,'일반·paper·buddy·ebook 서명과 서식',async()=>{
    const data=await page.evaluate(()=>{
     S.signatures=[{id:'render',charName:'내용',maker:'@서명'}];S.activeSignId='render';S.ui.themeDraft=null;S.ui.editingThemeId=null;
     const t=Object.assign(DEF_THEME(),{name:'렌더 검사',frame:'none',header:'none',signShow:true,signAlign:'left',signSep:'|',signBold:true,signItalic:true,canvas:{...DEF_CANVAS,mode:'fit'}});
     S.themes.push(t);S.activeThemeId=t.id;S.blocks=[{id:'body',type:'text',text:'본문',asBubble:false}];renderCanvas();
     const foot=document.querySelector('.blk-footer');
     const normal=foot.textContent==='내용 | @서명'&&foot.style.textAlign==='left'&&foot.style.fontStyle==='italic'&&foot.style.fontWeight==='bold';
     t.signShow=false;renderCanvas();const off=!document.querySelector('.blk-footer');
     t.headerEnabled=true;t.header='paper';t.signShow=true;renderCanvas();const paper=!!document.querySelector('.paper-authors')&&document.querySelector('.paper-authors').textContent==='내용 | @서명';
     t.frame='buddy';t.header='none';t.signShow=false;renderCanvas();const buddy=document.querySelector('.fb-status')?.textContent.includes('내용 | @서명');
     S.activeSignId=null;renderCanvas();const buddyEmpty=document.querySelector('.fb-status')?.textContent.includes('만든이 : ');
     t.frame='none';t.header='ebook-modern';S.activeSignId='render';renderCanvas();const ebook=document.querySelector('.cv-foot-ebook-modern .hd-sign')?.textContent==='내용 | @서명';
     S.activeSignId=null;renderCanvas();const ebookEmpty=document.querySelector('.cv-foot-ebook-modern .hd-sign')?.textContent==='';
     return {normal,off,paper,buddy,buddyEmpty,ebook,ebookEmpty};
    });
    assert.deepEqual(data,{normal:true,off:true,paper:true,buddy:true,buddyEmpty:true,ebook:true,ebookEmpty:true});
   });
   await check(rec,'다중 장·단·이미지 미리보기 서명 배치',async()=>{
    const data=await page.evaluate(()=>{
     const t=theme();t.frame='none';t.header='none';t.signShow=true;t.signSep='·';S.activeSignId='render';
     t.canvas={...DEF_CANVAS,width:360,ratio:'3:4',mode:'ratio'};t.fmt={...fmt(),columns:1,size:18,blockGap:20,vAlign:'center'};
     S.blocks=Array.from({length:24},(_,i)=>({id:'page-'+i,type:'text',text:'본문 '+i+' 여러 장 확인',asBubble:false}));renderCanvas();
     const many=document.querySelectorAll('.foot-ghost').length>0&&!!document.querySelector('.foot-pin');
     t.fmt.columns=2;renderCanvas();const cols=!!document.querySelector('#canvas.has-colpage > .blk.is-footer');
     S.ui.stage='format';S.ui.newKind='image';S.ui.imagePreview={block:{id:'preview',type:'image',src:BLANK_PX,size:20}};renderCanvas();const preview=!!document.querySelector('.blk-footer')&&!!document.querySelector('[data-id="preview"]');S.ui.imagePreview=null;
     return {many,cols,preview};
    });assert.deepEqual(data,{many:true,cols:true,preview:true});
   });
   await check(rec,'설정 JSON 내보내기 갈래와 새 버전',async()=>{
    const event=page.waitForEvent('download');await page.evaluate(()=>exportSettings(new Set(['signatures','themes'])));
    const file=await event;const target=path.join(out,`${engine}-settings.json`);await file.saveAs(target);
    const data=JSON.parse(fs.readFileSync(target,'utf8'));
    assert.equal(data.__v,2);assert.equal(data.activeSignId,'render');assert.equal(data.signatures[0].charName,'내용');
    assert.equal(data.themes.some(t=>'signChar'in t||'signMaker'in t),false);
   });
   await check(rec,'콘솔 오류 없음',async()=>assert.deepEqual(errors,[]));await ctx.close();
   const fixtures=[
    {name:'v16 복수 footer·중복·우선 선택',seed:{v:16,blocks:[{id:'one',type:'footer',charName:'첫째',maker:'@one'},{id:'two',type:'footer',charName:'둘째',maker:'@two'}],themes:[{id:'t',name:'사용자 테마',signChar:'첫째',signMaker:'@one',signShow:true}],activeThemeId:'t'},expected:['첫째','둘째'],active:'둘째'},
    {name:'공백 footer의 text 보존',seed:{v:16,blocks:[{id:'old',type:'footer',charName:'  ',maker:'',text:'옛 한 줄'}],themes:[{id:'t',name:'사용자',signShow:true}],activeThemeId:'t'},expected:[''],active:''},
    {name:'숨긴 테마의 문구 선택 유지',seed:{v:16,blocks:[],themes:[{id:'t',name:'사용자',signChar:'숨긴 문구',signMaker:'@old',signShow:false}],activeThemeId:'t'},expected:['숨긴 문구'],active:'숨긴 문구'},
    {name:'v13 프리셋 덮어쓰기 전 원문 보존',seed:{v:13,blocks:[],themes:[{id:'t',presetId:'bubble',name:'simple(white)',signChar:'원본 이름',signMaker:'@원본',signShow:true}],activeThemeId:'t'},expected:['원본 이름'],active:'원본 이름'},
    {name:'v17 빈 목록 재시드 방지',seed:{v:17,blocks:[],signatures:[],activeSignId:null},expected:[],active:null},
    {name:'미래 버전 기존 목록 보존',seed:{v:18,blocks:[],signatures:[{id:'s',charName:'미래',maker:''}],activeSignId:'s'},expected:['미래'],active:'미래'},
    {name:'잘못된 서명 타입·선택 정규화',seed:{v:17,blocks:[],signatures:[null,{id:'same',charName:'정상',maker:123},{id:'same',charName:12,maker:'@정상'}],activeSignId:'missing'},expected:['정상',''],active:null}
   ];
   for(const fixture of fixtures){
    const {ctx:fc,page:fp,errors:fe}=await fresh(browser,390,fixture.seed);
    await check(rec,fixture.name,async()=>{
     const got=await fp.evaluate(()=>({names:S.signatures.map(x=>x.charName),active:activeSign()?.charName??null,footers:S.blocks.filter(x=>x.type==='footer').length,v:JSON.parse(localStorage.getItem(KEY)).v,legacy:S.themes.some(t=>'signChar'in t||'signMaker'in t)}));
     assert.deepEqual(got,{names:fixture.expected,active:fixture.active,footers:0,v:17,legacy:false});assert.deepEqual(fe,[]);
    });await fc.close();
   }
  }finally{await browser.close();}
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
 const failed=results.flatMap(x=>x.checks).filter(x=>!x.passed);console.log('checks',results.reduce((n,x)=>n+x.checks.length,0),'failed',failed.length);
 if(failed.length)process.exitCode=1;
})().catch(e=>{fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.error(e);process.exitCode=1;});
