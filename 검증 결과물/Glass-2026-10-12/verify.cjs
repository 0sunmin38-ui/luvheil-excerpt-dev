const {webkit,chromium}=require('/Users/vbody/Desktop/Git source/vbody-web/node_modules/@playwright/test');
const fs=require('fs');
(async()=>{
const engine=process.argv[2]||'webkit',label=process.argv[3]||'before';
const browser=await ({webkit,chromium}[engine]).launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1440/560,userAgent:label==='android'?'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36':'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'});
const page=await context.newPage();page.on('pageerror',e=>console.log('ERROR',e.message));
await page.goto('http://localhost:8765/',{waitUntil:'domcontentloaded'});
console.log('ENGINE',engine,await browser.version());
await page.evaluate(`S.ui.themeDraft=null;S.characters=[{id:'p',name:'윤도',color:'#6a7885'}];S.blocks=['왜 깨어 있어.','메모 봤냐.','케이크 냉장고에 넣어 뒀으니까 우유랑 같이 먹어.','...눈 좀 더 붙여.','...일곱 시야. 두 시간은 더 자야 할 거 아니냐.'].map(text=>({id:uid(),type:'text',asBubble:true,speakerId:'p',text}));deliver=async items=>{window.testExports=items};const c=document.createElement('canvas');c.width=800;c.height=1000;const g=c.getContext('2d');for(let y=0;y<1000;y+=100)for(let x=0;x<800;x+=100){g.fillStyle=['#f06060','#40acdd','#70bf40','#ffd34a'][(x/100+y/100)%4];g.fillRect(x,y,100,100)}window.testBackground=c.toDataURL('image/png');`);
await page.evaluate(`window.paintChecks=[];const original=renderExact;renderExact=async function(...args){const root=args[1],shadows=root._exportShadows||[];const previous=shadows.map(item=>getComputedStyle(item.node).boxShadow);const record={background:!!root._exportBackground,shadowCount:shadows.length,uniqueShadows:new Set(shadows.map(item=>item.surface)).size};const result=await original(...args);record.cleaned=!root._exportBackground&&!root._exportShadows;record.restored=shadows.every(item=>getComputedStyle(item.node).boxShadow!=='none');window.paintChecks.push(record);return result}`);
const cases=[{id:'ios',tag:'glass-bg'}, {id:'ios',tag:'glass-solid',solid:true}, {id:'ios',tag:'cyan',color:'#8ce5fa'}, {id:'ios',tag:'purple',color:'#d7baff'}, {id:'ios',tag:'rotation',rotate:true,color:'#8ce5fa'}];
const baseBlocks=await page.evaluate('JSON.parse(JSON.stringify(S.blocks))');
const bases=await page.evaluate(`Object.fromEntries(['ios','insta-dm','square-black'].map(id=>[id,JSON.parse(JSON.stringify(S.themes.find(t=>t.presetId===id)))]))`);
const results=[];
for(const item of (label==='policy'?[]:label==='smoke'?cases.filter(c=>['glass-bg','glass-solid','paper'].includes(c.tag)):label==='android'?cases.filter(c=>['glass-bg','glass-solid','multi','columns'].includes(c.tag)):cases)){
await page.evaluate(({item,baseBlocks,bases})=>{
S.activeThemeId=S.themes.find(t=>t.presetId===item.id).id;
Object.assign(theme(),JSON.parse(JSON.stringify(bases[item.id])));
S.blocks=item.long?Array.from({length:18},(_,i)=>({...baseBlocks[i%5],id:uid()})):JSON.parse(JSON.stringify(baseBlocks));
theme().bgImage=item.solid?'':window.testBackground;theme().lockGlass=!item.off;theme().lockFg=item.color||'';
if(item.rotate)Object.assign(theme(),{bgRotation:20,bgSize:135,bgX:20,bgY:75,bgBlur:3,bgOverlay:30});
if(item.fit)theme().canvas.mode='fit';if(item.columns)theme().fmt.columns=item.columns;
if(item.paper)theme().paper=50;if(item.frame)theme().frame='cyworld';
window.testExports=[];renderCanvas();
},{item,baseBlocks,bases});
await page.evaluate(`ensureFontsLoaded($('#canvas')).then(()=>syncCanvasBackgrounds($('#canvas'),1))`);
await page.locator('#canvas').screenshot({path:'/private/tmp/'+engine+'-'+label+'-'+item.tag+'-preview.png'});const start=Date.now();await page.evaluate('exportPNG()');
const data=await page.evaluate(`({paint:window.paintChecks.splice(0),urls:window.testExports,clock:!!$('#canvas .lock-time.is-raster'),shadow:getComputedStyle($('#canvas .n-row')||$('#canvas .hd-btn-circle')||$('#canvas')).boxShadow,tint:$('#canvas .n-row')?.style.background,cache:_glassBackgrounds.size})`);
if(!data.urls.length)throw new Error('No export: '+JSON.stringify(item));
for(let i=0;i<data.urls.length;i++)fs.writeFileSync('/private/tmp/'+engine+'-'+label+'-'+item.id+'-'+item.tag+'-'+i+'.png',Buffer.from(data.urls[i].url.split(',')[1],'base64'));
if(data.paint.some(p=>!p.cleaned||!p.restored))throw new Error('Temporary export styles not restored');
const record={...item,paint:data.paint,pages:data.urls.length,ms:Date.now()-start,clock:data.clock,restoredShadow:data.shadow,restoredTint:data.tint,cache:data.cache};results.push(record);console.log(JSON.stringify(record));
}
fs.writeFileSync('/private/tmp/'+engine+'-'+label+'-results.json',JSON.stringify(results,null,2));
if(label==='policy'){
 const png=Buffer.from((await page.evaluate('window.testBackground')).split(',')[1],'base64');
 await page.route('https://export-policy.invalid/bg.png',route=>route.fulfill({status:404,contentType:'text/plain',body:'missing image'}));
 const policy=[];
 for(const src of ['https://export-policy.invalid/bg.png','data:image/png;base64,bad']){
 await page.evaluate(({src,baseBlocks})=>{S.activeThemeId=S.themes.find(t=>t.presetId==='square-black').id;S.blocks=JSON.parse(JSON.stringify(baseBlocks));theme().bgImage=src;window.testExports=[];renderCanvas();},{src,baseBlocks});
 console.log('BEFORE_POLICY',await page.evaluate(`({css:getComputedStyle($('#canvas .cv-bg i')).backgroundImage,blocked:typeof blockedImages})`));await page.evaluate('exportPNG()');
 const record=await page.evaluate(`({pages:window.testExports.length,toast:$('#toast').textContent})`);policy.push(record);console.log('POLICY',JSON.stringify(record));
 }
 if(policy[0].pages!==1||!policy[0].toast.includes('담기지'))throw new Error('CORS omission policy changed');
 if(policy[1].pages!==0||!policy[1].toast.includes('실패'))throw new Error('Invalid local background silently exported');
 fs.writeFileSync('/private/tmp/'+engine+'-policy.json',JSON.stringify(policy,null,2));
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
