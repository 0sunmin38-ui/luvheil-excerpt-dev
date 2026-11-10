const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{
  const all=[];
  for(const engine of [chromium,webkit]){
    const browser=await engine.launch();
    try{
      const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
      await page.goto('http://127.0.0.1:8775/',{waitUntil:'domcontentloaded'});
      const result=await page.evaluate(async()=>{
        S.signatures=[{id:'s',charName:'해이',maker:'@luvheil'}];S.activeSignId='s';
        S.blocks=[{id:'b',type:'text',text:'중첩된 장식에서 서명과 하단 입력창이 어떻게 놓이는지 확인합니다.'}];
        const out=[];
        for(const c of [{frame:'none',header:'paper',slot:'header'},
          {frame:'none',header:'insta-dm',slot:'footer',dm:true},
          {frame:'cyworld',header:'paper',slot:'footer'},
          {frame:'cyworld',header:'insta-dm',slot:'footer'},
          {frame:'buddy',header:'paper',slot:'frame'}]){
          const t={...DEF_THEME(),id:'role',frame:c.frame,header:c.header,signShow:true,
            canvas:{...DEF_CANVAS,mode:'ratio',ratio:'4:3',width:560,mt:20,mb:20,ml:20,mr:20},
            fmt:{...S.format,font:'KoPubWorld Dotum',size:14,columns:1,vAlign:'top'}};
          S.themes=[t];S.activeThemeId='role';renderCanvas();
          const cv=document.querySelector('#canvas');
          const before={heads:cv.querySelectorAll('.cv-head:not(.head-ghost)').length,
            footers:cv.querySelectorAll('.blk-footer').length,
            authors:cv.querySelectorAll('.paper-authors').length,
            makers:cv.querySelectorAll('.fb-status').length,
            dm:cv.querySelectorAll('.cv-foot-insta-dm:not(.eb-foot-ghost)').length};
          let files=[];deliver=async x=>{files=x};
          await exportPNG();if(!files.length)await exportPNG();
          out.push({...c,before,files:files.map(x=>({png:x.url?.startsWith('data:image/png;base64,'),size:x.url?.length||0}))});
        }
        return out;
      });
      for(const r of result){
        assert.equal(r.before.heads,r.frame==='none'?1:0);
        assert.equal(r.before.footers,r.slot==='footer'?1:0);
        assert.equal(r.before.authors,r.slot==='header'?1:0);
        assert.equal(r.before.makers,r.slot==='frame'?1:0);
        assert.equal(r.before.dm,r.dm?1:0);
        assert.ok(r.files.length>0&&r.files.every(f=>f.png&&f.size>1000));
      }
      console.log(engine.name(),result.map(r=>`${r.frame}+${r.header}:${r.slot}/${r.files.length}장`).join(' '));
      all.push({engine:engine.name(),result});
    }finally{await browser.close()}
  }
  fs.writeFileSync(__dirname+'/decoration-roles.json',JSON.stringify(all,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
