const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium, webkit } = require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{
  const report=[];
  for(const engine of [chromium,webkit]){
    const browser=await engine.launch();
    try{
      const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
      await page.goto('http://127.0.0.1:8775/',{waitUntil:'domcontentloaded'});
      const results=await page.evaluate(async()=>{
        S.signatures=[{id:'s',charName:'해이',maker:'@luvheil'}];S.activeSignId='s';
        const cases=[
          {count:3,columns:1}, {count:3,columns:1,vAlign:'center'},
          {count:3,columns:2}, {count:3,columns:2,vAlign:'center'},
          {count:24,columns:2},
          {count:3,columns:1,header:'kakao'},
          {count:3,columns:1,header:'imessage'},
          {count:24,columns:2,header:'insta-dm'}
        ];
        const out=[];
        for(const c of cases){
          const t={...DEF_THEME(),id:'sign-audit',header:c.header||'none',signShow:true,
            canvas:{...DEF_CANVAS,mode:'ratio',ratio:'3:4',width:560,mt:32,mb:32,ml:32,mr:32},
            fmt:{...S.format,font:'KoPubWorld Dotum',size:14,columns:c.columns,columnRatio:'1:1',blockGap:20,vAlign:c.vAlign||'top'}};
          S.themes=[t];S.activeThemeId=t.id;
          S.blocks=Array.from({length:c.count},(_,i)=>({id:`b${i}`,type:'text',text:`서명 여백 검증 ${i+1} ${'본문을 확인합니다. '.repeat(2)}`}));
          renderCanvas();
          const cv=document.querySelector('#canvas'),foot=cv.querySelector('.blk.is-footer');
          const blocks=[...cv.querySelectorAll('.blk:not(.is-footer)')];
          const preview={pages:Math.round(cv.offsetHeight/pageBox().h),gap:Math.round(foot.getBoundingClientRect().top-blocks.at(-1).getBoundingClientRect().bottom),
            pinned:cv.classList.contains('foot-pinned'),ghosts:cv.querySelectorAll('.foot-ghost').length};
          let files=[],captures=[];deliver=async x=>{files=x};
          const old=renderExact;renderExact=async(...args)=>{
            const root=args[1],sig=root.querySelector('.blk-footer');
            const body=[...root.querySelectorAll('.blk:not(.is-footer):not(.row-off)')];
            const gap=root.querySelector('.blk.is-footer')?.getBoundingClientRect().top-body.at(-1)?.getBoundingClientRect().bottom;
            captures.push({signature:sig?.textContent, count:root.querySelectorAll('.blk-footer').length,
              gap:Math.round(gap)});
            return old(...args);
          };
          try{await exportPNG();if(!files.length)await exportPNG()}finally{renderExact=old}
          out.push({...c,preview,captures,files:files.map(x=>({png:x.url?.startsWith('data:image/png;base64,'),size:x.url?.length||0}))});
        }
        return out;
      });
      for(const r of results){
        assert.equal(r.files.length,r.preview.pages,JSON.stringify(r));
        assert.ok(r.files.every(x=>x.png&&x.size>1000));
        assert.ok(r.captures.every(x=>x.signature?.includes('해이')&&x.count===1));
      }
      assert.ok(results[0].preview.gap>50);
      report.push({engine:engine.name(),results});
      console.log(engine.name(),results.map(x=>`${x.columns}단/${x.count}개:${x.preview.gap}px/${x.files.length}장`).join(' '));
    }finally{await browser.close()}
  }
  fs.writeFileSync(__dirname+'/signature-results.json',JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
