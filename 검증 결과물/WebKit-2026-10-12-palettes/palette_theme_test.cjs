const {webkit}=require('/Users/vbody/Desktop/Git source/vbody-web/node_modules/@playwright/test');
const fs=require('fs');
(async()=>{
 const browser=await webkit.launch({headless:true}),page=await browser.newPage({viewport:{width:1300,height:1100}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8765/',{waitUntil:'domcontentloaded'});
 const ids=await page.evaluate(()=>PRESET_THEMES.filter(p=>p.presetId.startsWith('palette-')).map(p=>p.presetId));
 if(ids.length!==6)throw Error('Missing palettes');
 // An existing edited theme and custom theme survive the one-time upgrade.
 await page.evaluate(()=>{const old=JSON.parse(JSON.stringify(S.themes.filter(t=>!t.presetId.startsWith('palette-'))));old[0].bg='#FEDCBA';old.push({...DEF_THEME(),id:'custom-preserve',name:'내 테마',bg:'#ABCDEF'});localStorage.setItem(KEY,JSON.stringify({v:13,themes:old,activeThemeId:old[0].id,blocks:[],characters:[]}));});
 await page.reload({waitUntil:'domcontentloaded'});
 const migration=await page.evaluate(()=>({count:S.themes.filter(t=>t.presetId?.startsWith('palette-')).length,edited:S.themes[0].bg,custom:S.themes.find(t=>t.id==='custom-preserve').bg}));
 if(migration.count!==6||migration.edited!=='#FEDCBA'||migration.custom!=='#ABCDEF')throw Error(JSON.stringify(migration));
 await page.evaluate(()=>{const t=S.themes.find(t=>t.presetId==='palette-mint');S.themes=S.themes.filter(x=>x.id!==t.id);save()});await page.reload({waitUntil:'domcontentloaded'});
 if(await page.evaluate(()=>S.themes.some(t=>t.presetId==='palette-mint')))throw Error('Deleted preset resurrected');
 await page.evaluate(()=>{localStorage.removeItem(KEY)});await page.reload({waitUntil:'domcontentloaded'});
 await page.evaluate(()=>{S.characters=[{id:'a',name:'해이',position:'left'},{id:'b',name:'윤도',position:'right'}];S.blocks=[{id:uid(),type:'text',asBubble:true,speakerId:'a',text:'오늘은 어떤 색이 좋아? 🌿'},{id:uid(),type:'text',asBubble:true,speakerId:'b',text:'차분하고 편안한 색이면 좋겠어.'},{id:uid(),type:'text',asBubble:true,speakerId:'a',text:'조금 더 오래 이야기하고 싶은 날.'}];deliver=async items=>window.paletteExport=items;window.palettePreviews=[];});
 const results=[];
 for(const id of ids){
 await page.evaluate(id=>{S.activeThemeId=S.themes.find(t=>t.presetId===id).id;renderCanvas()},id);
 await page.evaluate(()=>ensureFontsLoaded(document.querySelector('#canvas')));
 const record=await page.evaluate(()=>{const t=theme();return {name:t.name,preset:resolvePreset(t),bg:getComputedStyle(document.querySelector('#canvas')).backgroundColor,bubbles:document.querySelectorAll('#canvas .bub').length,reset:freshPreset(t).bg===t.bg}});
 if(record.bubbles!==3||!record.reset)throw Error(JSON.stringify(record));
 const preview=await page.locator('#canvas').screenshot({path:'/private/tmp/'+id+'.png'});
 await page.evaluate(({name,url})=>window.palettePreviews.push({name,url}),{name:record.name,url:'data:image/png;base64,'+preview.toString('base64')});
 await page.evaluate('exportPNG()');const exports=await page.evaluate('window.paletteExport');if(!exports?.length)throw Error('No PNG '+id);
 fs.writeFileSync('/private/tmp/'+id+'-export.png',Buffer.from(exports[0].url.split(',')[1],'base64'));results.push({...record,pages:exports.length});
 }
 // Readable overview, composed from the actual app canvases.
 await page.evaluate(()=>{const items=window.palettePreviews;document.body.replaceChildren();document.body.style.cssText='margin:0;padding:24px;background:#e4e4e8;display:grid;grid-template-columns:repeat(3, 350px);gap:24px;font-family:sans-serif;';for(const item of items){const box=document.createElement('div');box.innerHTML='<div style="font-size:20px;font-weight:700;margin-bottom:10px"></div><img style="display:block;width:350px;border-radius:10px"/>';box.firstChild.textContent=item.name;box.lastChild.src=item.url;document.body.append(box)}});
 await page.screenshot({path:'/private/tmp/palette-overview.png',fullPage:true});
 console.log(JSON.stringify({migration,deletedPreserved:true,results,errors}));if(errors.length)throw Error(errors.join('\n'));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
