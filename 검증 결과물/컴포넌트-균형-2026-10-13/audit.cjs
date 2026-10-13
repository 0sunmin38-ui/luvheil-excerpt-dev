const fs = require('fs'), path = require('path'), assert = require('assert/strict');
const { chromium, webkit } = require('../../../vbody-web/node_modules/@playwright/test');
const out = __dirname, results = [];
async function sectionShot(page, section, filename) {
  const viewport = page.viewportSize();
  await page.setViewportSize({...viewport,height:2000});
  await page.waitForTimeout(250);
  await section.scrollIntoViewIfNeeded();
  await section.screenshot({path:path.join(out,filename)});
  await page.setViewportSize(viewport);
  await page.waitForTimeout(250);
}
async function check(record, name, fn) {
  try { await fn(); record.checks.push({name, passed:true}); }
  catch(e) { record.checks.push({name, passed:false, error:e.message}); console.log('FAIL',record.engine,record.width,name,e.message); }
}
async function themeEditor(page) {
  await page.evaluate(() => {
    S.ui.selectedBlockId = null; S.ui.newKind = null;
    setStage('tools'); if (innerWidth < 900) setSnap(90);
    S.ui.themeEditSections = {canvas:true, bubble:true};
    openThemeEditV2(S.themes.find(t => t.name === 'simple(white)').id);
    S.ui.themeDraft.frame = 'none'; S.ui.themeDraft.canvas.mode = 'ratio';
    syncThemeEditFormV2();
  });
  await page.waitForTimeout(250);
}
async function layout(page) {
  const bad = await page.evaluate(() => {
    const root = document.querySelector('#themeEditContent');
    return [...root.querySelectorAll('.settings-flow,.setting-grid,.setting-side,.steph,.seg')]
      .filter(e => e.getBoundingClientRect().width && e.scrollWidth > e.clientWidth + 2)
      .map(e => ({class:e.className,text:e.textContent.slice(0,60),width:e.clientWidth,scroll:e.scrollWidth}));
  });
  assert.deepEqual(bad, []);
}
(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({headless:true});
    try {
      for (const width of [320,390,900,1440,1500]) {
        const context = await browser.newContext({viewport:{width,height:1000},hasTouch:width<900,isMobile:width<900});
        const page = await context.newPage(), errors = [];
        page.setDefaultTimeout(5000);
        page.on('pageerror', e => errors.push(e.message));
        const record = {engine:engine.name(),width,checks:[]}; results.push(record);
        await page.goto('http://127.0.0.1:8767/', {waitUntil:'domcontentloaded'});
        await themeEditor(page);
        const canvas = page.locator('#themeEditContent .section').filter({has:page.locator('h3', {hasText:'캔버스'})});
        const bubble = page.locator('#themeEditContent .section').filter({has:page.locator('h3', {hasText:'대사'})});
        await check(record, '여백 연동·분리·비율·정렬·내용맞춤', async () => {
          const top = canvas.locator('.steph').filter({has:page.locator('.lab',{hasText:/^위$/})});
          const link = canvas.getByRole('switch', {name:'상하·좌우 함께',exact:true});
          await page.evaluate(() => {S.ui.themeDraft.canvas.marginLink=true; syncThemeEditFormV2();});
          await top.locator('input').fill('24'); await top.locator('input').press('Tab');
          assert.deepEqual(await page.evaluate(()=>[S.ui.themeDraft.canvas.mt,S.ui.themeDraft.canvas.mb]),[24,24]);
          await link.click();
          await top.locator('input').fill('26'); await top.locator('input').press('Tab');
          assert.deepEqual(await page.evaluate(()=>[S.ui.themeDraft.canvas.mt,S.ui.themeDraft.canvas.mb]),[26,24]);
          await canvas.getByRole('button',{name:/^1:1/}).click();
          await canvas.getByRole('button',{name:'중앙 정렬',exact:true}).click();
          assert.equal(await page.evaluate(()=>S.ui.themeDraft.fmt.vAlign),'center');
          await layout(page);
          if ([390,1440].includes(width)) await canvas.screenshot({path:path.join(out,`${engine.name()}-${width}-canvas.png`)});
          await canvas.getByRole('button',{name:'내용 맞춤',exact:true}).click();
          assert.equal(await canvas.getByRole('button',{name:'중앙 정렬',exact:true}).count(),0);
          await layout(page);
          await canvas.getByRole('button',{name:'페이지 분할',exact:true}).click();
        });
        await check(record, '6개 대사 스타일·5개 말풍선 형태·조건별 넘침', async () => {
          for (const style of ['bubble','quote','script','notif','sns','plain']) {
            await page.evaluate(style => {S.ui.themeDraft.bubbleStyle=style;syncThemeEditFormV2();},style);
            await layout(page);
            assert.equal(await bubble.getByText('추가 옵션',{exact:true}).count(),0);
            if(style==='sns'||style==='notif') assert.equal(await bubble.getByText('프로필 / 이름',{exact:true}).count(),0);
            if(style==='plain') assert.equal(await bubble.getByText('대사 흐름',{exact:true}).count(),0);
          }
          await page.evaluate(()=>{S.ui.themeDraft.bubbleStyle='bubble';syncThemeEditFormV2();});
          for (const name of ['Plain','Modern','iMessage','Kakaotalk','Bubble']) {
            await bubble.getByRole('button',{name,exact:true}).click();
            await layout(page);
            const titles = await bubble.evaluate(e=>[...e.querySelector('.settings-flow').children].map(n=>n.querySelector('.setting-title,.setting-single > .lab')?.textContent).filter(Boolean));
            assert.deepEqual(titles,name==='Bubble'?['스타일','색상','프로필 / 이름','효과']:['스타일','모서리 둥글기','색상','프로필 / 이름','효과']);
            assert.equal(await bubble.getByText('좌측',{exact:true}).count(),0);
            if(name!=='Bubble') {
              const effects=bubble.locator('.setting-group').filter({has:page.locator(':scope > .setting-title',{hasText:'효과',exact:true})});
              assert.equal(await effects.getByRole('switch',{name:'라운드 프로필',exact:true}).count(),1);
              assert.deepEqual(await effects.locator(':scope > .setting-grid > .tgl-inline > .lab').allTextContents(),['라운드 프로필','그림자']);
            }
            if ([390,1440].includes(width)) await sectionShot(page,bubble,`${engine.name()}-${width}-${name}.png`);
          }
        });
        await check(record, '스타일 옆 대사 묶기·6개 스타일·키보드 조작·포커스 유지', async () => {
          const names=['말풍선','인용','각본','알림','트윗','없음'];
          for(const name of names) {
            await bubble.getByRole('button',{name,exact:true}).click();
            const grouping=bubble.getByRole('switch',{name:'대사 묶기',exact:true});
            if(name==='없음') {assert.equal(await grouping.count(),0);continue;}
            assert.equal(await grouping.evaluate(e=>!!e.closest('.setting-head')),true);
            const before=await page.evaluate(()=>S.ui.themeDraft.groupRuns!==false);
            await grouping.focus(); await grouping.press('Space');
            assert.equal(await page.evaluate(()=>S.ui.themeDraft.groupRuns!==false),!before);
            assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'대사 묶기');
            await layout(page);
          }
          await bubble.getByRole('button',{name:'말풍선',exact:true}).click();
          assert.equal(await bubble.getByText('대사 흐름',{exact:true}).count(),0);
        });
        await check(record, '개별 모서리·Modern 말꼬리·좌우 프로필·태그·색상', async () => {
          await bubble.getByRole('button',{name:'Plain',exact:true}).click();
          await bubble.getByRole('switch',{name:'함께',exact:true}).click();
          const corner = bubble.locator('.steph').filter({has:page.locator('.lab',{hasText:'좌상',exact:true})});
          await corner.locator('input').fill('12'); await corner.locator('input').press('Tab');
          assert.equal(await page.evaluate(()=>S.ui.themeDraft.brTL),12);
          await bubble.getByRole('switch',{name:'함께',exact:true}).click();
          assert.equal(await bubble.locator('.steph input').count(),1);
          await bubble.getByRole('button',{name:'Modern',exact:true}).click();
          const tail = bubble.locator('.steph').filter({has:page.locator('.lab',{hasText:'말꼬리',exact:true})});
          await tail.locator('input').fill('5'); await tail.locator('input').press('Tab');
          assert.equal(await page.evaluate(()=>S.ui.themeDraft.brBL),5);
          await bubble.getByRole('button',{name:'Bubble',exact:true}).click();
          const before = await page.evaluate(()=>!!S.ui.themeDraft.myAvatar);
          await bubble.getByRole('switch',{name:'우측 프로필',exact:true}).click();
          assert.equal(await page.evaluate(()=>!!S.ui.themeDraft.myAvatar),!before);
          assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'우측 프로필');
          await bubble.getByRole('switch',{name:'아티스트 태그',exact:true}).click();
          assert.equal(await bubble.getByText('태그 색',{exact:true}).count(),0);
          await bubble.getByRole('switch',{name:'아티스트 태그',exact:true}).click();
          const rightText = bubble.getByRole('textbox',{name:'우측 글자',exact:true});
          await rightText.fill('#123456'); await rightText.press('Tab');
          assert.equal(await page.evaluate(()=>S.ui.themeDraft.myBubbleFg),'#123456');
          await layout(page);
        });
        await check(record, '테마 저장·재열기 후 설정 유지', async () => {
          const read = () => page.evaluate(() => {
            const t=S.ui.themeDraft;
            return {brBL:t.brBL,brTL:t.brTL,preset:t.bubblePreset,rightText:t.myBubbleFg,
              myAvatar:t.myAvatar,artistTag:t.artistTag,margin:t.canvas.mt,groupRuns:t.groupRuns};
          });
          const expected = await read();
          await page.evaluate(()=>saveThemeEditV2());
          await page.evaluate(()=>openThemeEditV2(S.activeThemeId));
          assert.deepEqual(await read(),expected);
        });
        await check(record, '아티클·서명 글 정렬 SVG와 캔버스 세로 정렬 SVG 구분', async () => {
          await page.evaluate(()=>{
            S.ui.themeDraft.header='paper';S.ui.themeDraft.signShow=true;
            S.ui.themeEditSections.frame=true;S.ui.themeEditSections.sign=true;
            syncThemeEditFormV2();
          });
          for(const name of ['article 정렬','서명 정렬']) {
            const align=page.getByRole('group',{name,exact:true});
            const left=align.getByRole('button',{name:'좌측 정렬',exact:true});
            assert.equal(await left.locator('path').getAttribute('d'),await page.evaluate(()=>ALIGN_ICON.left));
            await left.click();
            assert.equal(await left.getAttribute('aria-pressed'),'true');
          }
          assert.deepEqual(await page.evaluate(()=>[S.ui.themeDraft.paperAlign,S.ui.themeDraft.signAlign]),['left','left']);
          const vertical=page.getByRole('group',{name:'캔버스 세로 정렬',exact:true});
          assert.equal(await vertical.getByRole('button',{name:'상단 정렬',exact:true}).locator('svg').count(),1);
          await vertical.getByRole('button',{name:'상단 정렬',exact:true}).click();
          assert.equal(await page.evaluate(()=>S.ui.themeDraft.fmt.vAlign),'top');
          assert.notEqual(await vertical.getByRole('button',{name:'중앙 정렬',exact:true}).locator('path').getAttribute('d'),await page.evaluate(()=>ALIGN_ICON.center));
          const backgrounds=await canvas.locator('.seg').evaluateAll(nodes=>nodes.map(n=>getComputedStyle(n).backgroundColor));
          assert.ok(backgrounds.every(color=>color==='rgb(255, 255, 255)'));
          if([390,1440].includes(width)) await sectionShot(page,page.locator('#themeEditContent .section').filter({has:page.locator('h3',{hasText:'장식'})}),`${engine.name()}-${width}-article.png`);
        });
        await check(record, '이미지 비율·모서리·정렬·크기·확정', async () => {
          await page.evaluate(()=>{
            S.ui.themeDraft=null;S.ui.editingThemeId=null;
            const c=document.createElement('canvas');c.width=400;c.height=300;
            const ctx=c.getContext('2d');ctx.fillStyle='#d5b8a4';ctx.fillRect(0,0,400,300);
            startNew('image',c.toDataURL());
          });
          const host = page.locator('#formatWrap');
          await host.locator('.crop-ratios button').filter({hasText:'1:1'}).click();
          const before = await host.getByRole('switch',{name:'모서리 둥글게',exact:true}).getAttribute('aria-checked');
          await host.getByRole('switch',{name:'모서리 둥글게',exact:true}).click();
          await host.getByRole('button',{name:'우측 정렬',exact:true}).click();
          await host.locator('.image-editor > .slideh input[type=range]').evaluate(e=>{e.value='75';e.dispatchEvent(new Event('input',{bubbles:true}));});
          const order = await host.evaluate(e=>[...e.querySelector('.image-editor').children].map(n=>n.className));
          assert.deepEqual(order,['panel-heading','field','field','image-content','slideh']);
          assert.equal(await host.getByRole('heading',{name:'삽입 이미지',exact:true}).count(),1);
          if ([390,1440].includes(width)) await host.screenshot({path:path.join(out,`${engine.name()}-${width}-image.png`)});
          await host.locator('button[title="확인"]').click();
          await page.waitForFunction(()=>S.blocks.some(b=>b.type==='image'));
          const image = await page.evaluate(()=>S.blocks.findLast(b=>b.type==='image'));
          assert.equal(image.imageAlign,'right');assert.equal(image.imageRatio,'1:1');assert.equal(image.size,75);assert.equal(image.round,before!=='true');
        });
        await check(record, 'HTML 패널 제목·입력·확정', async () => {
          await page.evaluate(()=>{S.ui.selectedBlockId=null;startNew('html');});
          const host=page.locator('#formatWrap');
          assert.equal(await host.getByRole('heading',{name:'HTML',exact:true}).count(),1);
          await host.locator('textarea').fill('<strong>제목 있는 입력</strong>');
          if([390,1440].includes(width)) await host.screenshot({path:path.join(out,`${engine.name()}-${width}-html.png`)});
          await host.locator('button[title="확인"]').click();
          assert.equal(await page.evaluate(()=>S.blocks.findLast(b=>b.type==='html').src),'<strong>제목 있는 입력</strong>');
        });
        await check(record, '구분선 접근성 이름·종류 변경·확정', async () => {
          await page.evaluate(()=>{S.ui.selectedBlockId=null;startNew('divider');});
          const host=page.locator('#formatWrap');
          assert.equal(await host.getByText('구분선 종류',{exact:true}).count(),0);
          assert.equal(await host.getByRole('heading',{name:'구분선',exact:true}).count(),1);
          const seg=host.getByRole('group',{name:'구분선 종류',exact:true});
          await seg.getByRole('button',{name:/별/}).click();
          if ([390,1440].includes(width)) await host.screenshot({path:path.join(out,`${engine.name()}-${width}-divider.png`)});
          await host.locator('button[title="확인"]').click();
          assert.equal(await page.evaluate(()=>S.blocks.findLast(b=>b.type==='divider').dividerStyle),'star');
        });
        await check(record, '팔레트 삭제 확인창의 레이어·취소·Escape·기본/사용자 색 삭제·저장', async () => {
          await themeEditor(page);
          await page.evaluate(()=>{
            S.ui.themeDraft.bubbleStyle='bubble'; syncThemeEditFormV2();
            userPalette=[...new Set([...userPalette,'#102938'])];savePalette();
          });
          const chip=bubble.getByRole('button',{name:'좌측 말풍선 선택',exact:true});
          await chip.click();
          const base=await page.evaluate(()=>PALETTE_BASE.find(c=>!hiddenPalette.includes(c.toUpperCase())));
          const colorBefore=await page.evaluate(()=>S.ui.themeDraft.bubbleBg);
          const rm=page.locator('#popRoot').getByRole('button',{name:base+' 삭제',exact:true});
          await rm.click();
          const dialog=page.getByRole('dialog',{name:'팔레트 색상을 삭제할까요?',exact:true});
          const stack=await dialog.evaluate(panel=>({modal:+getComputedStyle(panel.parentElement).zIndex,pop:+getComputedStyle(document.querySelector('.pop')).zIndex,inert:document.querySelector('#popRoot').inert}));
          assert.ok(stack.modal>stack.pop);assert.equal(stack.inert,true);
          if([390,1440].includes(width)) await page.screenshot({path:path.join(out,`${engine.name()}-${width}-palette-delete.png`)});
          await dialog.getByRole('button',{name:'취소',exact:true}).click();
          assert.equal(await rm.count(),1);assert.equal(await page.locator('#popRoot').evaluate(e=>e.inert),false);
          await rm.click(); await page.keyboard.press('Escape');
          assert.equal(await dialog.count(),0);assert.equal(await rm.count(),1);
          await rm.click();await dialog.getByRole('button',{name:'삭제',exact:true}).click();
          assert.equal(await rm.count(),0);
          assert.equal(await page.evaluate(c=>hiddenPalette.includes(c.toUpperCase()),base),true);
          const userRm=page.locator('#popRoot').getByRole('button',{name:'#102938 삭제',exact:true});
          await userRm.click();await dialog.getByRole('button',{name:'삭제',exact:true}).click();
          assert.equal(await userRm.count(),0);
          assert.equal(await page.evaluate(()=>S.ui.themeDraft.bubbleBg),colorBefore);
          await page.reload({waitUntil:'domcontentloaded'});
          assert.equal(await page.evaluate(c=>hiddenPalette.includes(c.toUpperCase()),base),true);
          assert.equal(await page.evaluate(()=>userPalette.includes('#102938')),false);
        });
        await check(record, '모달 안 색상 팝오버의 레이어 유지', async () => {
          await page.evaluate(()=>{
            const panel=modal('색상 레이어 확인');
            const chip=document.createElement('button');chip.textContent='색상 열기';
            chip.onclick=()=>openColorPop(chip,'#123456','확인',()=>{});
            panel.appendChild(chip);
          });
          await page.getByRole('button',{name:'색상 열기',exact:true}).click();
          const levels=await page.evaluate(()=>({modal:+getComputedStyle(document.querySelector('.modal')).zIndex,pop:+getComputedStyle(document.querySelector('.pop')).zIndex}));
          assert.ok(levels.pop>levels.modal);
          await page.evaluate(()=>{closePop();closeModal();});
        });
        await check(record, '테마 서명 세그먼트·복수 서식·부모 토글·저장', async () => {
          await themeEditor(page);
          await page.evaluate(()=>{S.ui.themeEditSections.sign=true;S.ui.themeDraft.signShow=true;syncThemeEditFormV2();});
          const sign=page.locator('#themeEditContent .section').filter({has:page.locator('h3',{hasText:'서명',exact:true})});
          await sign.getByRole('group',{name:'구분 기호',exact:true}).getByRole('button',{name:'세로선',exact:true}).click();
          for(const name of ['볼드','이탤릭']) {
            const button=sign.getByRole('group',{name:'서식',exact:true}).getByRole('button',{name,exact:true});
            if(await button.getAttribute('aria-pressed')!=='true') await button.click();
          }
          assert.deepEqual(await page.evaluate(()=>[S.ui.themeDraft.signSep,S.ui.themeDraft.signBold,S.ui.themeDraft.signItalic]),['|',true,true]);
          const heights=await sign.locator('.seg button').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().height));
          assert.ok(heights.every(n=>n===heights[0]));
          const parent=sign.getByRole('switch',{name:'서명 표시',exact:true});
          await parent.click();assert.equal(await sign.getByRole('group',{name:'서식',exact:true}).count(),0);
          await parent.click();assert.equal(await sign.getByRole('button',{name:'볼드',exact:true}).getAttribute('aria-pressed'),'true');
          await layout(page);
          if([390,1440].includes(width)) await sectionShot(page,sign,`${engine.name()}-${width}-signature.png`);
          await page.evaluate(()=>saveThemeEditV2());await page.evaluate(()=>openThemeEditV2(S.activeThemeId));
          assert.deepEqual(await page.evaluate(()=>[S.ui.themeDraft.signSep,S.ui.themeDraft.signBold,S.ui.themeDraft.signItalic]),['|',true,true]);
        });
        await check(record, '캐릭터 말풍선 개별 설정·하위 색 입력·부모 위계·저장', async () => {
          await page.evaluate(()=>{S.ui.themeDraft=null;S.ui.editingThemeId=null;openCharEditV2('new');});
          const view=page.locator('#charEditView');
          await view.locator('#charNameV2').fill('위계 확인');
          await view.getByRole('switch',{name:'말풍선 개별 설정',exact:true}).click();
          await view.locator('#charBubbleBgV2').fill('#234567');
          assert.equal(await page.evaluate(()=>S.ui.charDraft.bubbleBg),'#234567');
          const weights=await view.evaluate(e=>({parent:+getComputedStyle(e.querySelector('.setting-trigger > .lab')).fontWeight,child:+getComputedStyle(e.querySelector('#charBubbleOptsV2 .lab')).fontWeight}));
          assert.ok(weights.parent>weights.child);
          const overflow=await view.locator('#charBubbleOptsV2 .setting-grid').evaluate(e=>e.scrollWidth>e.clientWidth+2);
          assert.equal(overflow,false);
          if([390,1440].includes(width)) await sectionShot(page,view,`${engine.name()}-${width}-character.png`);
          await page.evaluate(()=>saveCharEditV2());
          assert.equal(await page.evaluate(()=>S.characters.findLast(c=>c.name==='위계 확인').bubbleBg),'#234567');
        });
        await check(record, '재생 음악 공통 슬라이더·숫자 입력·상하한·서명 블록 세그먼트', async () => {
          await page.evaluate(()=>{S.ui.charDraft=null;S.ui.editingCharacterId=null;S.ui.selectedBlockId=null;startNew('music');});
          const host=page.locator('#formatWrap');
          const values=[['카드 불투명도',40,'cardOpacity'],['카드 흐림',4,'cardBlur'],['들은 만큼',60,'progress'],['크기',75,'scale']];
          for(const [label,value,key] of values) {
            const slider=host.getByRole('slider',{name:label,exact:true});
            await slider.evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));},value);
            assert.equal(await host.getByRole('textbox',{name:label+' 값',exact:true}).inputValue(),String(value));
            assert.equal(await page.evaluate(key=>selBlock()[key],key),value);
          }
          await host.getByRole('textbox',{name:'크기 값',exact:true}).fill('999');
          await host.getByRole('textbox',{name:'크기 값',exact:true}).press('Tab');
          assert.equal(await page.evaluate(()=>selBlock().scale),100);
          assert.equal(await host.getByRole('slider',{name:'크기',exact:true}).inputValue(),'100');
          if([390,1440].includes(width)) await sectionShot(page,host,`${engine.name()}-${width}-music.png`);
          await page.evaluate(()=>{const b={id:uid(),type:'footer',align:'right',sep:'·',charName:'서명 확인',maker:'검증'};S.blocks.push(b);setStage('format');S.ui.selectedBlockId=b.id;render();});
          await host.getByRole('group',{name:'구분 기호',exact:true}).getByRole('button',{name:'세로선',exact:true}).click();
          await host.getByRole('group',{name:'서식',exact:true}).getByRole('button',{name:'볼드',exact:true}).click();
          await host.getByRole('group',{name:'서식',exact:true}).getByRole('button',{name:'이탤릭',exact:true}).click();
          assert.deepEqual(await page.evaluate(()=>[selBlock().sep,selBlock().bold,selBlock().italic]),['|',true,true]);
        });
        await check(record, '배경 이미지 모달 위계·비율·위치·효과·취소 복원·확정', async () => {
          await themeEditor(page);
          await page.evaluate(()=>{
            const c=document.createElement('canvas');c.width=400;c.height=300;
            c.getContext('2d').fillRect(0,0,400,300);
            S.ui.themeDraft.bgImage=c.toDataURL();S.ui.themeEditSections.bg=true;syncThemeEditFormV2();
          });
          const read=()=>page.evaluate(()=>{const t=S.ui.themeDraft;return {ratio:t.canvas.ratio,image:t.bgImage,size:t.bgSize,x:t.bgX,y:t.bgY,rotation:t.bgRotation,blur:t.bgBlur,overlay:t.bgOverlay,color:t.bgOverlayColor};});
          const before=await read();
          const bg=page.locator('#themeEditContent .section').filter({has:page.locator('h3',{hasText:'배경',exact:true})});
          await bg.getByRole('button',{name:'이미지 변경',exact:true}).click();
          const dialog=page.getByRole('dialog',{name:'배경 이미지',exact:true});
          await dialog.locator('.crop-ratios button').filter({hasText:'1:1'}).click();
          await dialog.getByRole('textbox',{name:'확대 값',exact:true}).fill('140');await dialog.getByRole('textbox',{name:'확대 값',exact:true}).press('Tab');
          await dialog.getByRole('button',{name:'↖',exact:true}).click();
          await dialog.getByRole('textbox',{name:'회전',exact:true}).fill('90');await dialog.getByRole('textbox',{name:'회전',exact:true}).press('Tab');
          await dialog.getByRole('textbox',{name:'흐림',exact:true}).fill('5');await dialog.getByRole('textbox',{name:'흐림',exact:true}).press('Tab');
          assert.equal(await dialog.locator('.setting-title').filter({hasText:'비율'}).count(),0);
          const cover=dialog.locator('.bg-cover-toggle .tgl');
          if(!await cover.evaluate(e=>e.classList.contains('is-on'))) await cover.click();
          await dialog.getByRole('textbox',{name:'색',exact:true}).fill('#345678');await dialog.getByRole('textbox',{name:'색',exact:true}).press('Tab');
          await dialog.getByRole('textbox',{name:'불투명도 값',exact:true}).fill('35');await dialog.getByRole('textbox',{name:'불투명도 값',exact:true}).press('Tab');
          await cover.click();assert.equal((await read()).overlay,0);
          assert.equal(await dialog.getByRole('textbox',{name:'색',exact:true}).isVisible(),false);
          await cover.click();assert.equal((await read()).overlay,35);
          const changed=await read();assert.deepEqual([changed.ratio,changed.size,changed.x,changed.y,changed.rotation,changed.blur,changed.overlay,changed.color],['1:1',140,0,0,90,5,35,'#345678']);
          const dimensions=await dialog.locator('.bg-image-preview').evaluate(e=>{const r=e.getBoundingClientRect();return {w:r.width,h:r.height};});
          assert.ok(Math.abs(dimensions.w-dimensions.h)<1);assert.ok(dimensions.h<=261);
          const overflow=await dialog.evaluate(e=>[...e.querySelectorAll('.settings-stack,.setting-group,.slideh')].filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.className));assert.deepEqual(overflow,[]);
          if([390,1440].includes(width)) await sectionShot(page,dialog,`${engine.name()}-${width}-background-modal.png`);
          await dialog.getByRole('button',{name:'취소',exact:true}).click();assert.deepEqual(await read(),before);
          await bg.getByRole('button',{name:'이미지 변경',exact:true}).click();
          await dialog.getByRole('textbox',{name:'확대 값',exact:true}).fill('150');await dialog.getByRole('textbox',{name:'확대 값',exact:true}).press('Tab');
          await dialog.getByRole('button',{name:'확인',exact:true}).click();assert.equal((await read()).size,150);
          await page.evaluate(()=>saveThemeEditV2());await page.evaluate(()=>openThemeEditV2(S.activeThemeId));assert.equal((await read()).size,150);
        });
        await check(record,'브라우저 스크립트 오류 없음',()=>assert.deepEqual(errors,[]));
        await context.close();
        console.log(engine.name(),width,record.checks.filter(x=>x.passed).length+'/'+record.checks.length);
      }
    } finally {await browser.close();}
  }
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
  const failed=results.flatMap(r=>r.checks.filter(x=>!x.passed).map(x=>({engine:r.engine,width:r.width,...x})));
  console.log(JSON.stringify({contexts:results.length,checks:results.reduce((n,r)=>n+r.checks.length,0),failed},null,2));
  if(failed.length) process.exitCode=1;
})();
