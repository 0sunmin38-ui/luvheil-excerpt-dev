const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
const out=__dirname,results=[];
(async()=>{
for(const [engine,type]of Object.entries({chromium,webkit})){
 const browser=await type.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8766',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>{
   window.pngOutputs=[];window.signCaptures=[];
   deliver=async items=>window.pngOutputs.push(...items);
   const original=renderExact;
   renderExact=async(hti,node,...args)=>{
    window.signCaptures.push([...node.querySelectorAll('.blk-footer,.paper-authors,.cv-foot-ebook-modern .hd-sign,.fb-status')].map(x=>x.textContent));
    return original(hti,node,...args);
   };
   S.signatures=[{id:'png-sign',charName:'해이',maker:'@luvheil'}];S.activeSignId='png-sign';
   S.ui.themeDraft=null;S.ui.editingThemeId=null;
  });
  for(const scenario of [
   {name:'normal-multi',header:'none',frame:'none',cols:1,count:24,ratio:'3:4'},
   {name:'columns',header:'none',frame:'none',cols:2,count:14,ratio:'3:4'},
   {name:'paper',header:'paper',frame:'none',cols:1,count:3,ratio:'3:4'},
   {name:'buddy',header:'none',frame:'buddy',cols:1,count:2,ratio:'3:4'},
   {name:'ebook',header:'ebook-modern',frame:'none',cols:1,count:3,ratio:'3:4'},
   {name:'insta-dm',header:'insta-dm',frame:'none',cols:1,count:3,ratio:'3:4'}
  ]){
   const record={engine,scenario:scenario.name};results.push(record);
   try{
    await page.evaluate(s=>{
     window.pngOutputs=[];window.signCaptures=[];
     const t=Object.assign(DEF_THEME(),{name:'PNG 검사',header:s.header,frame:s.frame,signShow:true,signAlign:'right',signSep:'·',signBold:false,signItalic:false});
     t.canvas={...DEF_CANVAS,mode:'ratio',width:360,ratio:s.ratio,mt:24,mb:24,ml:24,mr:24};
     t.fmt={...S.format,font:'KoPubWorld Dotum',size:16,columns:s.cols,blockGap:24,vAlign:'center'};
     S.themes=[t];S.activeThemeId=t.id;S.blocks=Array.from({length:s.count},(_,i)=>({id:'png'+i,type:'text',text:'서명 탭 분리 후 이미지 저장 확인 '+(i+1)+'\n페이지 바닥과 서명 문구를 확인합니다.',asBubble:false}));
     S.ui.selectedBlockId=null;renderCanvas();
    },scenario);
    await page.waitForTimeout(150);
    record.preview=await page.evaluate(()=>({pages:renderPageMarks(),text:signText(theme()),foot:!!document.querySelector('.blk-footer'),ghosts:document.querySelectorAll('.foot-ghost').length}));
    await page.evaluate(()=>exportPNG());
    if(!await page.evaluate(()=>window.pngOutputs.length))await page.evaluate(()=>exportPNG());
    const data=await page.evaluate(()=>({urls:window.pngOutputs.map(x=>x.url),captures:window.signCaptures,busy:exportBusy,warnings:document.querySelector('#toast').textContent}));
    assert.ok(data.urls.length>0,data.warnings);assert.equal(data.busy,false);
    assert.ok(data.captures.length>0);assert.ok(data.captures.every(c=>c.some(t=>t.includes('해이 · @luvheil'))),JSON.stringify(data.captures));
    record.pages=data.urls.length;record.captures=data.captures;record.pngs=[];
    for(let i=0;i<data.urls.length;i++){
     const buf=Buffer.from(data.urls[i].split(',')[1],'base64');assert.equal(buf.subarray(1,4).toString(),'PNG');
     const name=`${engine}-${scenario.name}-${i+1}.png`;fs.writeFileSync(path.join(out,name),buf);
     record.pngs.push({name,width:buf.readUInt32BE(16),height:buf.readUInt32BE(20),bytes:buf.length});
    }
    if(scenario.name==='normal-multi')assert.ok(record.pages>1);
    record.passed=true;console.log('PNG',engine,scenario.name,record.pages,'passed');
   }catch(e){record.passed=false;record.error=e.message;console.log('FAIL PNG',engine,scenario.name,e.message);}
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();fs.writeFileSync(path.join(out,'export-results.json'),JSON.stringify(results,null,2));}
}
if(results.some(x=>!x.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
