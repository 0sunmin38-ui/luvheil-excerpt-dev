from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json,sys
p=Path(__file__).parent / ('after' if '--after' in sys.argv else '')
data=json.loads((p/'results.json').read_text())
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',18)
small=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',14)
for env in dict.fromkeys(r['env'] for r in data['results']):
 rows=[r for r in data['results'] if r['env']==env and r['width']==560 and r['sample']=='spaced']
 sheet=Image.new('RGB',(1500,80+len(rows)*390),'#e4e8eb');d=ImageDraw.Draw(sheet);d.text((20,20),env+' | long text | preview / exported PNG',font=font,fill='#152027')
 for i,r in enumerate(rows):
  top=75+i*390;d.rounded_rectangle((10,top,1490,top+380),12,fill='white');d.text((25,top+10),r['label']+' | logical width '+str(r['logicalWidth']),font=font,fill='#152027')
  notes=[]
  for n in r['nodes']:
   if n['lines']>1:notes.append(n['selector']+': '+str(n['lines'])+' lines')
   elif n['outsideCanvas']:notes.append(n['selector']+': outside canvas')
  d.text((25,top+38),'; '.join(notes)[:170] or 'Single line (long text may be clipped / ellipsized)',font=small,fill='#b33232' if notes else '#34544d')
  files=[r['preview']]+r.get('exports',[])[:1]
  for j,name in enumerate(files):
   im=Image.open(p/name).convert('RGB');im.thumbnail((700,295));sheet.paste(im,(25+j*735,top+75))
 sheet.save(p/(env+'-overview.png'))
print('contact sheets ready')
