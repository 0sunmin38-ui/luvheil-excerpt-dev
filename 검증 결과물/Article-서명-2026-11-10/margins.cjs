const fs=require('node:fs');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{
 const all=[];
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch();
  try{
   const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
   await page.goto('http://127.0.0.1:8775/',{waitUntil:'domcontentloaded'});
   const result=await page.evaluate(()=>{
    S.blocks=[{id:'b',type:'text',text:'본문 여백 측정'}];
    S.signatures=[];S.activeSignId=null;
    const out=[];
    for(const kind of ['imessage','kakao','bubble','lock-clock','insta-dm','paper','cyworld','buddy'])
     for(const margin of [20,60]){
      const isFrame=kind==='cyworld'||kind==='buddy';
      const t={...DEF_THEME(),id:'margin-test',header:isFrame?'none':kind,frame:isFrame?kind:'none',
       headerTitle:'헤더 이름',paperTitle:'기사 제목',paperJournal:'소제목',
       canvas:{...DEF_CANVAS,mode:'ratio',ratio:'3:4',width:560,mt:margin,mb:margin,ml:margin,mr:margin,marginDetail:true},
       fmt:{...S.format,font:'KoPubWorld Dotum',size:14,columns:1,vAlign:'top'}};
      S.themes=[t];S.activeThemeId='margin-test';renderCanvas();
      const cv=document.querySelector('#canvas'), head=cv.querySelector('.cv-head'), frame=cv.querySelector('.cv-frame');
      const box=head||frame, body=cv.querySelector('.blk');
      const a=cv.getBoundingClientRect(), b=box?.getBoundingClientRect(), text=box?.querySelector('.hd-row,.bubble-head-row,.lock-date,.paper-journal,.mh-book,.fb-body');
      const c=text?.getBoundingClientRect(), d=body?.getBoundingClientRect(),scale=a.width/cv.offsetWidth;
      const style=box?getComputedStyle(box):null;
      out.push({kind,margin,frame:isFrame,canvas:{pt:padT(),pl:padL(),pr:padR(),pb:padB()},
       box:{x:b?Math.round((b.left-a.left)/scale):null,y:b?Math.round((b.top-a.top)/scale):null,
        w:b?Math.round(b.width/scale):null,h:b?Math.round(b.height/scale):null,
        padding:style?[style.paddingTop,style.paddingRight,style.paddingBottom,style.paddingLeft]:null},
       content:{x:c?Math.round((c.left-a.left)/scale):null,y:c?Math.round((c.top-a.top)/scale):null},
       body:{x:d?Math.round((d.left-a.left)/scale):null,y:d?Math.round((d.top-a.top)/scale):null},
       dmFoot:!!cv.querySelector('.cv-foot-insta-dm')});
     }
    return out;
   });
   all.push({engine:engine.name(),result});
   console.log(engine.name(),result.map(x=>`${x.kind}/${x.margin}:box(${x.box.x},${x.box.y}) content(${x.content.x},${x.content.y}) body(${x.body.x},${x.body.y}) pad(${x.box.padding?.join(',')})`).join('\n'));
  }finally{await browser.close()}
 }
 fs.writeFileSync(__dirname+'/margins.json',JSON.stringify(all,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
