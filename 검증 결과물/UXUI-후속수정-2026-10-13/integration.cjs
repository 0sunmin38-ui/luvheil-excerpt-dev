const fs=require('fs');
const path=require('path');
const assert=require('assert/strict');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
const out=path.join(__dirname,'수정후');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const results=[];
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true});
  try{
   const userAgent=engine===webkit
    ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'
    : 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36';
   const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,userAgent});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:8766/',{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>{
    S.ui.themeDraft=null;S.ui.editingThemeId=null;
    S.blocks=[{id:'actual-png',type:'text',text:'저장 경로 확인',asBubble:false},{id:'actual-png2',type:'text',text:'키보드와 패널 수정 후 이미지 생성',asBubble:false}];
    const t=theme();t.canvas={mode:'ratio',ratio:'9:16',width:360,mt:30,mb:30,ml:30,mr:30};
    t.fmt={...t.fmt,font:'KoPubWorld Dotum',size:16};t.useFont=true;render();
    window.uxDeliveries=[];
    const original=deliver;deliver=async items=>{window.uxDeliveries.push(...items);await original(items);};
   });
   await page.evaluate(()=>{
    window.uxBeforeDrag={blocks:JSON.parse(JSON.stringify(S.blocks)),canvas:{...theme().canvas}};
    S.blocks=Array.from({length:50},(_,i)=>({id:'drag-'+i,type:'text',text:'자동 스크롤 점검 '+i,asBubble:false}));
    theme().canvas.mode='fit';setStage('composer');$('#stage').scrollTop=0;
   });
   await page.waitForTimeout(100);
   const dragStart=await page.evaluate(()=>{
    const row=$('#canvas .blk'),rect=row.getBoundingClientRect();
    const stage=$('#stage'),bottom=Math.min(stage.getBoundingClientRect().bottom,$('#sheet').getBoundingClientRect().top);
    const x=rect.left+rect.width/2,y=rect.top+rect.height/2;
    row.dispatchEvent(new PointerEvent('pointerdown',{pointerId:88,pointerType:'mouse',clientX:x,clientY:y,button:0,bubbles:true}));
    $('#canvas').dispatchEvent(new PointerEvent('pointermove',{pointerId:88,pointerType:'mouse',clientX:x,clientY:bottom-2,bubbles:true}));
    return {scroll:stage.scrollTop,first:S.blocks[0].id};
   });
   await page.waitForTimeout(180);
   const autoScroll=await page.evaluate(()=>{
    const scroll=$('#stage').scrollTop;
    $('#canvas').dispatchEvent(new PointerEvent('pointercancel',{pointerId:88,bubbles:true}));
    const first=S.blocks[0].id;
    S.blocks=window.uxBeforeDrag.blocks;theme().canvas=window.uxBeforeDrag.canvas;render();$('#stage').scrollTop=0;
    return {scroll,first};
   });
   assert.ok(autoScroll.scroll>dragStart.scroll,JSON.stringify({dragStart,autoScroll}));assert.equal(autoScroll.first,dragStart.first);
   await page.locator('#btnSave').focus();
   await page.evaluate(()=>exportPNG());
   const result=await page.evaluate(()=>({pages:window.uxDeliveries.length,urls:window.uxDeliveries.map(item=>item.url),busy:exportBusy,locked:$('.shell').inert,overlay:$('#saveSheet').classList.contains('is-on'),focus:!!document.activeElement.closest('#saveSheet'),toast:$('#toast').textContent}));
   assert.ok(result.pages>0,JSON.stringify(result));assert.equal(result.busy,false);assert.equal(result.overlay,true,JSON.stringify(result));assert.equal(result.focus,true,JSON.stringify(result));
   for(let i=0;i<result.urls.length;i++){
    assert.ok(result.urls[i].startsWith('data:image/png;base64,'));
    fs.writeFileSync(path.join(out,engine.name()+'-export-'+i+'.png'),Buffer.from(result.urls[i].split(',')[1],'base64'));
   }
   await page.keyboard.press('Escape');
   const after=await page.evaluate(()=>({focus:document.activeElement.id,inert:$('.shell').inert,selection:S.ui.selectedBlockId}));
   assert.equal(after.focus,'btnSave');assert.equal(after.inert,false);assert.deepEqual(errors,[]);
   delete result.urls;results.push({engine:engine.name(),...result,after,autoScroll,errors});console.log(JSON.stringify(results.at(-1)));
  }finally{await browser.close();}
 }
 fs.writeFileSync(path.join(out,'integration.json'),JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
