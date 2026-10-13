const path=require('path');const {chromium,webkit}=require('../../../vbody-web/node_modules/@playwright/test');
(async()=>{for(const[engine,type]of Object.entries({chromium,webkit})){
 const b=await type.launch();try{for(const width of[320,390,1000,1500]){
  const p=await b.newPage({viewport:{width,height:1000},hasTouch:width<900,isMobile:width<900});
  await p.goto('http://127.0.0.1:8766',{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>{setStage('tools');if(!isWide())setSnap(90);switchSettingsTab(2);openSignEditV2(S.activeSignId);});
  await p.waitForTimeout(450);await p.screenshot({path:path.join(__dirname,`${engine}-${width}-edit.png`)});
  await p.locator('#btnSignBack').click();await p.waitForTimeout(450);await p.screenshot({path:path.join(__dirname,`${engine}-${width}-list.png`)});
  await p.evaluate(()=>{switchSettingsTab(1);openThemeEditV2(S.themes.find(t=>t.name==='simple(white)')?.id||S.activeThemeId);S.ui.themeEditSections={sign:true};syncThemeEditFormV2();});
  await p.waitForTimeout(450);const section=p.locator('.signature-settings');await section.scrollIntoViewIfNeeded();
  await p.screenshot({path:path.join(__dirname,`${engine}-${width}-theme.png`)});await p.close();
 }}finally{await b.close();}
}})().catch(e=>{console.error(e);process.exitCode=1});
