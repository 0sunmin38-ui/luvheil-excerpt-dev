const fs=require('node:fs');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{
 const report=[];
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch();
  try{
   const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
   await page.goto('http://127.0.0.1:8775/',{waitUntil:'domcontentloaded'});
   const result=await page.evaluate(()=>{
    S.signatures=[{id:'s',charName:'해이',maker:'@luvheil'}];S.activeSignId='s';
    S.blocks=[{id:'b',type:'text',text:'본문 여백 확인'}];
    const out=[];
    for(const kind of ['none','imessage','insta-dm','paper','cyworld','buddy'])for(const margin of [20,60]){
     const frame=kind==='cyworld'||kind==='buddy';
     const t={...DEF_THEME(),id:'signature-margins',header:frame?'none':kind,frame:frame?kind:'none',signShow:true,
      canvas:{...DEF_CANVAS,mode:'ratio',ratio:'3:4',width:560,mt:margin,mb:margin,ml:margin,mr:margin,marginDetail:true},
      fmt:{...S.format,font:'KoPubWorld Dotum',size:14,columns:1,vAlign:'top'}};
     S.themes=[t];S.activeThemeId=t.id;renderCanvas();
     const cv=document.querySelector('#canvas'), sign=cv.querySelector('.blk-footer,.paper-authors,.fb-status');
     const dm=cv.querySelector('.cv-foot-insta-dm');
     const a=cv.getBoundingClientRect(),s=sign?.getBoundingClientRect(),d=dm?.getBoundingClientRect();
     const scale=a.width/cv.offsetWidth;
     out.push({kind,margin,slot:signatureSlot(t),x:s?Math.round((s.left-a.left)/scale):null,
      right:s?Math.round((a.right-s.right)/scale):null,bottom:s?Math.round((a.bottom-s.bottom)/scale):null,
      gapToDm:d&&s?Math.round((d.top-s.bottom)/scale):null,
      bodyPad:{top:padT(),right:padR(),bottom:padB(),left:padL()}});
    }
    return out;
   });
   report.push({engine:engine.name(),result});
   console.log(engine.name(),result.map(r=>`${r.kind}/${r.margin}:slot=${r.slot} x=${r.x} right=${r.right} bottom=${r.bottom} gapDM=${r.gapToDm}`).join('\n'));
  }finally{await browser.close()}
 }
 fs.writeFileSync(__dirname+'/signature-margins.json',JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
