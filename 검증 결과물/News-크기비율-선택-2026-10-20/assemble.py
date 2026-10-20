from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json,html,zipfile,sys
p=Path(__file__).parent / ('헤더90-220-80-행간130-20종' if '--header130-all' in sys.argv else '헤더90-220-80-행간140-20종' if '--header220-all' in sys.argv else '');data=json.loads((p/'results.json').read_text());rows=data['results'];fontfile='/System/Library/Fonts/AppleSDGothicNeo.ttc';font=ImageFont.truetype(fontfile,24);small=ImageFont.truetype(fontfile,18);title=ImageFont.truetype(fontfile,32)
cellw=530;short=270;groups=[[r for r in rows if r['id'].startswith(letter)]for letter in 'ABCDE'];heights=[max(round(Image.open(p/r['files'][0]).height*short/min(Image.open(p/r['files'][0]).size))for r in g)+95 for g in groups];sheet=Image.new('RGB',(cellw*4+40,160+sum(heights)),'#e8edf0');d=ImageDraw.Draw(sheet);d.text((30,22),'News 테마 · 글씨 크기 × 화면 비율',font=title,fill='#202d35');d.text((30,70),'왼쪽부터 12 / 14 / 16 / 18px · 같은 짧은 변 배율로 비교 · B2 = 기준안',font=font,fill='#50616b');d.text((30,110),'동일한 본문 5문단 · 2단 · 본문 행간 150% · 2장인 후보는 첫 장 표시 (전체 원본은 비교 페이지에서 확인)',font=small,fill='#50616b');y=155
for group,h in zip(groups,heights):
 local=Image.new('RGB',(cellw*4+40,h+20),'#e8edf0');ld=ImageDraw.Draw(local)
 for col,r in enumerate(group):
  x=20+col*cellw;accent='#2c7b70'if r['default']else'#c8d2d7';d.rounded_rectangle((x,y,x+cellw-12,y+h-12),14,fill='white',outline=accent,width=3 if r['default']else 1);ld.rounded_rectangle((x,10,x+cellw-12,h+8),14,fill='white',outline=accent,width=3 if r['default']else 1)
  label=f"{r['id']} · {r['size']}px · {r['ratio']}"+('  기준안'if r['default']else'');sub=f"{r['width']} × {r['pageHeight']} / {r['pages']}장"
  for dr,yy in [(d,y),(ld,10)]:dr.text((x+15,yy+10),label,font=font,fill='#263a42');dr.text((x+15,yy+42),sub,font=small,fill='#b16b27'if r['pages']>1 else'#63747b')
  im=Image.open(p/r['files'][0]).convert('RGB');scale=short/min(im.size);im=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS);xx=x+(cellw-12-im.width)//2;sheet.paste(im,(xx,y+73));local.paste(im,(xx,83))
 local.save(p/(group[0]['id'][0]+'-비율-'+group[0]['ratio'].replace(':','x')+'.png'));y+=h
sheet.save(p/'전체-20종-비교.png')
s=['<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>News 테마 후보 20종</title><style>body{font:16px system-ui;background:#edf1f3;color:#24333b;margin:25px}header{max-width:1100px;margin:auto}img{max-width:100%;height:auto}section{background:white;padding:20px;border-radius:16px;margin:24px auto;max-width:1500px}.previews{display:flex;gap:15px;overflow:auto}.previews img{max-width:480px;max-height:750px;object-fit:contain;object-position:top}a{color:#226b61}nav{display:flex;gap:15px;flex-wrap:wrap}small{color:#66767e}</style><header><h1>News 테마 · 후보 20종</h1><p>번호로 선택: 예) B3 = 16px · 3:4. 기준안은 B2 = 14px · 3:4.</p><p>Chromium 한 환경에서 실제 exportPNG를 실행했습니다. 글꼴 Pretendard, 2단 구성·본문 행간 150%·기본 흰색 배경·여백(위아래 40 / 좌우 30px), 제목·본문 5문단은 동일합니다. News 기본 글씨 크기는 14px이며, 기본 캔버스는 내용 맞춤입니다. 이번 비교본만 비율 지정으로 바꿨습니다. 짧은 변은 논리 560px 기준입니다. 제목 크기도 테마의 기존 비례 규칙에 따라 본문 글씨 크기와 함께 변합니다.</p><p>전체 비교 PNG는 모든 후보의 짧은 변 배율을 같게 맞췄습니다. 2장으로 나뉘는 후보는 첫 장만 표시하고, 아래 개별 후보에서 모든 장을 볼 수 있습니다. 앱의 테마 설정은 변경하지 않았습니다.</p><nav><a href="전체-20종-비교.png">전체 비교 PNG</a><a href="News-후보-20종.zip">원본 ZIP</a>']
for r in rows:s.append(f'<a href="#{r["id"]}">{r["id"]}</a>')
s.append('</nav></header>')
for r in rows:
 s.append(f'<section id="{r["id"]}"><h2>{r["id"]} · {r["size"]}px · {r["ratio"]}'+(' · 기준안'if r['default']else'')+f'</h2><p>{r["width"]} × {r["pageHeight"]} 논리 px / {r["pages"]}장</p><div class="previews">')
 for f in r['files']:s.append(f'<a href="{f}"><img loading="lazy" src="{f}"></a>')
 s.append('</div></section>')
(p/'index.html').write_text(''.join(s))
with zipfile.ZipFile(p/'News-후보-20종.zip','w',zipfile.ZIP_DEFLATED)as z:
 for f in p.iterdir():
  if f.suffix in ['.png','.html','.json','.cjs','.py']:z.write(f,f.name)
print('20 candidates,',sum(r['pages']for r in rows),'exported pages; sheets and gallery ready')
