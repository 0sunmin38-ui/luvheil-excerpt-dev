const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium, webkit } = require('../../../vbody-web/node_modules/@playwright/test');

(async () => {
  const all = [];
  const chrome = { name: () => 'chrome', launch: () => chromium.launch({ channel: 'chrome' }) };
  for (const engine of [chromium, chrome, webkit]) {
    const browser = await engine.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:8775/', { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(async () => {
        S.signatures = [{ id: 'audit', charName: '해이', maker: '@luvheil' }]; S.activeSignId = 'audit';
        const cases = [
          { mode:'fit', placement:'page', ratio:'1:1', count:10 },
          { mode:'fit', placement:'column', ratio:'1:1', count:10 },
          { mode:'fit', placement:'page', ratio:'1:2', count:10 },
          { mode:'ratio', placement:'page', ratio:'1:1', count:8 },
          { mode:'ratio', placement:'page', ratio:'1:1', count:8, vAlign:'center' },
          { mode:'ratio', placement:'column', ratio:'1:1', count:8 },
          { mode:'ratio', placement:'page', ratio:'2:1', count:32 }
        ];
        const out=[];
        for (const c of cases) {
          const t = { ...DEF_THEME(), id:'article-audit', header:'paper', signShow:true,
            paperJournal:'장식 소제목', paperTitle:'Article 제목', paperPlacement:c.placement,
            canvas:{...DEF_CANVAS, mode:c.mode, width:560, ratio:'3:4', mt:32, mb:32, ml:32, mr:32},
            fmt:{...S.format, font:'KoPubWorld Dotum', size:14, columns:2, columnRatio:c.ratio,
              blockGap:20, vAlign:c.vAlign||'top'} };
          S.themes=[t]; S.activeThemeId=t.id;
          S.blocks=Array.from({length:c.count},(_,i)=>({id:`b${i}`,type:'text',text:`본문 ${i+1} ${'긴 문장과 한글 줄바꿈을 확인합니다. '.repeat(2)}`}));
          renderCanvas();
          const root=document.querySelector('#canvas'), head=root.querySelector('.hd-paper:not(.head-ghost)');
          const preview={ pages:c.mode==='fit'?1:Math.round(root.offsetHeight/pageBox().h),
            width:head.offsetWidth, inner:Math.round(root.clientWidth-padL()-padR()),
            col:Math.round(Math.min(...columnWidths())), x:head.offsetLeft,
            first:root.querySelector('.blk').offsetTop,
            headBottom:head.offsetTop+head.offsetHeight, ghosts:root.querySelectorAll('.head-ghost').length };
          let files=[], captures=[];
          deliver=async items=>{files=items};
          const original=renderExact;
          renderExact=async (...args)=>{
            const node=args[1], h=node.querySelector('.hd-paper:not(.head-ghost)');
            captures.push({ title:h?.querySelector('.paper-title')?.textContent,
              headerWidth:Math.round(h?.getBoundingClientRect().width||0),
              headerCount:node.querySelectorAll('.hd-paper:not(.head-ghost)').length,
              bodyCount:node.querySelectorAll('.blk:not(.is-footer):not(.row-off)').length });
            return original(...args);
          };
          try { await exportPNG(); if (!files.length) await exportPNG(); }
          finally { renderExact=original; }
          out.push({ ...c, preview, captures, files:files.map(f=>({
            prefix:f.url?.slice(0,22), length:f.url?.length||0, png:f.url?.startsWith('data:image/png;base64,') })),
            sample:c.mode==='ratio' && c.ratio==='2:1' ? files[0]?.url : undefined,
            columnSample:c.mode==='fit' && c.placement==='column' ? files[0]?.url : undefined });
        }
        return out;
      });
      assert.deepEqual(errors, []);
      for (const r of result) {
        console.log(engine.name(), r.mode, r.placement, r.ratio, JSON.stringify(r.preview));
        assert.equal(r.files.length, r.preview.pages, `${engine.name()} ${r.mode} ${r.placement} page count`);
        assert.ok(r.files.every(f=>f.png && f.length>1000), `${engine.name()} PNG`);
        assert.ok(r.captures.every(c=>c.title==='Article 제목' && c.headerCount===1), `${engine.name()} header capture`);
        if (r.placement==='page') assert.ok(Math.abs(r.preview.width-r.preview.inner)<=2, `${engine.name()} page width`);
        else assert.ok(Math.abs(r.preview.width-r.preview.col)<=2, `${engine.name()} column width`);
      }
      const sample=result.find(r=>r.sample);
      fs.writeFileSync(__dirname+'/'+engine.name()+'-article-page.png', Buffer.from(sample.sample.split(',')[1],'base64'));
      const columnSample=result.find(r=>r.columnSample);
      fs.writeFileSync(__dirname+'/'+engine.name()+'-article-column.png', Buffer.from(columnSample.columnSample.split(',')[1],'base64'));
      result.forEach(r=>{delete r.sample;delete r.columnSample});
      await page.evaluate(()=>{S.themes[0].paperPlacement='column';save()});
      await page.reload({waitUntil:'domcontentloaded'});
      const persisted=await page.evaluate(()=>S.themes.find(t=>t.id==='article-audit')?.paperPlacement);
      assert.equal(persisted,'column');
      all.push({ engine:engine.name(), result, errors });
      console.log(engine.name(), result.map(r=>`${r.mode}/${r.placement}/${r.ratio}:${r.files.length}`).join(' '));
    } finally { await browser.close(); }
  }
  fs.writeFileSync(__dirname+'/results.json', JSON.stringify(all,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
