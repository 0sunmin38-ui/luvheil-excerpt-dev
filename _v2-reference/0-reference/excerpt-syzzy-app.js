
const TYPES = {
  title:       { n: "제목", fs: 19, fw: 700, lh: 1.22, ls: -0.04, tone: "main", kind: "plain" },
  subtitle:    { n: "부제", fs: 7.5, fw: 400, lh: 1.6, ls: 0.02, tone: "accent", kind: "plain" },
  body:        { n: "서술", fs: 7.5, fw: 300, lh: 1.3, ls: 0, tone: "main", kind: "plain", al: "justify" },
  narration:   { n: "나레이션", fs: 7.5, fw: 300, lh: 1.3, ls: 0.06, tone: "sub", kind: "plain", al: "center" },
  quote:       { n: "인용", fs: 11, fw: 400, lh: 1.8, ls: -0.01, tone: "main", kind: "plain", al: "center" },
  bidialogue:  { n: "번역 대사", fs: 8, fw: 400, lh: 1.7, ls: 0, tone: "main", kind: "bidlg" },
  dialogue:    { n: "대사", fs: 8, fw: 400, lh: 1.75, ls: 0, tone: "main", kind: "dialogue" },
  bubble:      { n: "말풍선", fs: 7.5, fw: 400, lh: 1.6, ls: 0, tone: "main", kind: "bubble" },
  avatar:      { n: "아바타", fs: 7.5, fw: 400, lh: 1.6, ls: 0, tone: "main", kind: "avatar" },
  character:   { n: "캐릭터", fs: 9, fw: 600, lh: 1.4, ls: -0.01, tone: "main", kind: "char" },
  translation: { n: "번역", fs: 7.5, fw: 400, lh: 1.55, ls: 0, tone: "main", kind: "trans" },
  stamp:       { n: "장소·시각", fs: 6.5, fw: 500, lh: 1.6, ls: 0.16, tone: "sub", kind: "stamp" },
  section:     { n: "소제목", fs: 6.5, fw: 500, lh: 1.6, ls: 0.2, tone: "sub", kind: "section" },
  list:        { n: "목록", fs: 7.5, fw: 400, lh: 1.85, ls: 0, tone: "main", kind: "list" },
  photo:       { n: "사진", fs: 7, fw: 400, lh: 1.5, ls: 0, tone: "sub", kind: "photo" },
  divider:     { n: "구분선", fs: 8, fw: 400, lh: 1, ls: 0, tone: "sub", kind: "divider" },
  credit:      { n: "크레딧", fs: 6, fw: 400, lh: 1.6, ls: 0.14, tone: "sub", kind: "plain", al: "right" },
  book:        { n: "책 정보", fs: 8, fw: 700, lh: 1.35, ls: -0.02, tone: "main", kind: "book" },
  html:        { n: "HTML", fs: 7.5, fw: 400, lh: 1.5, ls: 0, tone: "main", kind: "html" },
  lyric:       { n: "가사", fs: 11, fw: 700, lh: 1.3, ls: -0.02, tone: "main", kind: "lyric", al: "left" },
  track:       { n: "곡 정보", fs: 7.5, fw: 600, lh: 1.35, ls: -0.01, tone: "main", kind: "track" },
  player:      { n: "재생 바", fs: 5.5, fw: 500, lh: 1.2, ls: 0.02, tone: "sub", kind: "player" },
  caption:     { n: "자막", fs: 7.5, fw: 500, lh: 1.45, ls: 0, tone: "main", kind: "caption", al: "center" },
  scene:       { n: "장면", fs: 7.5, fw: 500, lh: 1.45, ls: 0, tone: "main", kind: "scene", al: "center" },
  clock:       { n: "시계", fs: 7.5, fw: 600, lh: 1, ls: -0.02, tone: "main", kind: "clock" },
  notif:       { n: "알림", fs: 7, fw: 400, lh: 1.4, ls: 0, tone: "main", kind: "notif" },
  post:        { n: "게시물", fs: 7.5, fw: 400, lh: 1.5, ls: 0, tone: "main", kind: "post" },
  search:      { n: "검색창", fs: 7.5, fw: 400, lh: 1.3, ls: 0, tone: "main", kind: "search" },
  history:     { n: "검색 기록", fs: 7.5, fw: 400, lh: 1.3, ls: 0, tone: "main", kind: "history" },
  call:        { n: "통화 기록", fs: 7.5, fw: 500, lh: 1.3, ls: 0, tone: "main", kind: "call" },
  vn:          { n: "대화창", fs: 7.5, fw: 400, lh: 1.6, ls: 0, tone: "main", kind: "vn" }
};
const SINGLE = { plain: 1, quote: 1, list: 1 };
const PALETTES = {
  text:   ["#111111", "#4a4a48", "#8a8a88", "#c2c2c0", "#ffffff", "#8f2020", "#2f4858", "#7a9bd8"],
  hilite: ["#e9e7dd", "#bfb786", "#f0e2c0", "#f3d2d6", "#d9e4f0", "#cfe8d8", "#dcdcda", "#1a1a1a"],
  bubble: ["#1a1a1a", "#4a4a48", "#f1f1ef", "#d9d9d6", "#3b7cf6", "#7a9bd8", "#f3b8bd", "#2f4858"]
};
const CATS = {
  "글": ["title", "subtitle", "section", "body", "narration", "quote"],
  "대화": ["dialogue", "bidialogue", "bubble", "avatar", "character", "caption", "scene"],
  "자료": ["translation", "list", "photo", "stamp", "html"],
  "장식": ["divider", "credit", "book"],
  "음악": ["lyric", "track", "player"],
  "화면": ["clock", "notif", "post", "search", "history", "call", "vn"]
};
const CAT_KEYS = ["글", "대화", "자료", "장식", "음악", "화면"];
const SLOTS = {
  caption:     [{ k: 1, n: "둘째 줄" }],
  scene:       [{ k: 1, n: "둘째 줄" }],
  dialogue:    [{ k: 1, n: "화자" }],
  bubble:      [{ k: 1, n: "이름" }, { k: 3, n: "시간" }],
  avatar:      [{ k: 1, n: "이름" }, { k: 3, n: "시간" }],
  character:   [{ k: 1, n: "설명" }],
  stamp:       [{ k: 1, n: "시각" }],
  translation: [{ k: 1, n: "원문" }],
  photo:       [{ k: 1, n: "설명" }],
  book:        [{ k: 1, n: "지은이" }],
  bidialogue:  [{ k: 2, n: "화자" }, { k: 1, n: "번역" }],
  track:       [{ k: 1, n: "아티스트" }],
  clock:       [{ k: 1, n: "날짜" }],
  notif:       [{ k: 1, n: "앱 이름" }, { k: 2, n: "제목" }, { k: 3, n: "시각" }],
  post:        [{ k: 1, n: "이름" }, { k: 2, n: "아이디·시각" }, { k: 4, n: "반응" }],
  call:        [{ k: 1, n: "설명" }, { k: 3, n: "시각" }],
  vn:          [{ k: 1, n: "이름" }]
};
const TAB_KEYS = ["블록", "글자", "색", "테마", "판형"];
const TAB_LABEL = { 블록: "블록", 글자: "글자", 색: "색", 테마: "테마", 판형: "판형" };
const TAB_ICON = { 블록: "tblock", 글자: "ttext", 색: "tcolor", 테마: "ttheme", 판형: "tframe" };

const ICONS = {
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  zoom: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  up: '<path d="M6 15l6-6 6 6"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/>',
  redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 000 11H13"/>',
  save: '<path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/>',
  pic: '<rect x="4" y="5" width="16" height="14" rx="1.5"/><circle cx="9" cy="10" r="1.5"/><path d="M20 16l-5-5-8 8"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M15 9V5.5A1.5 1.5 0 0013.5 4h-8A1.5 1.5 0 004 5.5v8A1.5 1.5 0 005.5 15H9"/>',
  share: '<path d="M12 15V4"/><path d="M8 8l4-4 4 4"/><path d="M5 12v6.5A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5V12"/>',
  text: '<path d="M5 6h14"/><path d="M5 11h14"/><path d="M5 16h9"/>',
  code: '<path d="M8.5 7L3.5 12l5 5"/><path d="M15.5 7l5 5-5 5"/>',
  more: '<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  swap: '<path d="M7 8h11l-3-3"/><path d="M17 16H6l3 3"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  wide: '<path d="M4 12h16"/><path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/>',
  minus: '<path d="M6 12h12"/>',
  plus: '<path d="M6 12h12"/><path d="M12 6v12"/>',
  eraser: '<path d="M16 4l4 4-9.5 9.5H6.5L4 15z"/><path d="M11 9l4 4"/><path d="M13 20h7"/>',
  clip: '<rect x="8" y="4" width="8" height="4" rx="1"/><path d="M8 6H6.5A1.5 1.5 0 005 7.5v11A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0017.5 6H16"/>',
  flag: '<path d="M6 21V4"/><path d="M6 4h11l-2 4 2 4H6"/>',
  reset: '<path d="M4.5 12a7.5 7.5 0 107.5-7.5H8.5"/><path d="M11 1.5L8 4.5l3 3"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  brush: '<path d="M14.5 4.5l5 5-8 8H6.5v-5z"/><path d="M12 7l5 5"/><path d="M6.5 17.5L4 20"/>',
  lib: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  vfull: '<path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/>',
  vwin: '<path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/>',
  tblock: '<rect x="4" y="4" width="16" height="6" rx="1.2"/><rect x="4" y="14" width="16" height="6" rx="1.2"/>',
  ttext: '<path d="M5 7V4.5h14V7"/><path d="M12 4.5V19.5"/><path d="M9 19.5h6"/>',
  tcolor: '<path d="M12 3.5c3.2 4.2 6 7.3 6 10.6a6 6 0 01-12 0c0-3.3 2.8-6.4 6-10.6z"/>',
  ttheme: '<path d="M11 3.5l1.8 4.9 4.9 1.8-4.9 1.8L11 16.9l-1.8-4.9-4.9-1.8 4.9-1.8z"/><path d="M18 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  tframe: '<path d="M7 3v12.5A1.5 1.5 0 008.5 17H21"/><path d="M3 7h12.5A1.5 1.5 0 0117 8.5V21"/>',
  chev: '<path d="M7 10l5 5 5-5"/>',
  alleft: '<path d="M4 6h16"/><path d="M4 10h10"/><path d="M4 14h16"/><path d="M4 18h10"/>',
  alcenter: '<path d="M4 6h16"/><path d="M7 10h10"/><path d="M4 14h16"/><path d="M7 18h10"/>',
  alright: '<path d="M4 6h16"/><path d="M10 10h10"/><path d="M4 14h16"/><path d="M10 18h10"/>',
  aljustify: '<path d="M4 6h16"/><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h9"/>',
  aldistribute: '<path d="M4 6h16"/><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h3"/><path d="M10.5 18h3"/><path d="M17 18h3"/>'
};
const VIEW_STORE = "excerpt-view-v1";
let viewMode = "window";
try { if (localStorage.getItem(VIEW_STORE) === "full") viewMode = "full"; } catch (e) {}
const viewBtn = () => '<button class="iconbtn viewtog" data-act="viewmode" aria-label="' + (viewMode === "full" ? "창으로 보기" : "전체화면으로 보기") +
  '" title="' + (viewMode === "full" ? "창으로 보기" : "전체화면으로 보기") + '">' + ic(viewMode === "full" ? "vwin" : "vfull", 19) + "</button>";
const MAKER = '<a class="maker" href="https://syzzy.xyz" target="_blank" rel="noopener">made by <b>syzzy</b></a>';
const ic = (k, size) => '<svg class="ic" width="' + (size || 18) + '" height="' + (size || 18) +
  '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  ICONS[k] + "</svg>";
const MARK = '<svg class="mark" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#111"/>' +
  '<path d="M9 5.5H5.5v9M15 18.5h3.5v-9" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="square"/>' +
  '<path d="M9.5 12h5" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/></svg>';

const cdnFace = (fam, url) =>
  "data:text/css," + encodeURIComponent("@font-face{font-family:'" + fam + "';src:url(" + url + ");font-display:swap}");
const FONTS = [
  { k: "pretendard", use: ["자막", "가사"], n: "프리텐다드", f: "Pretendard Variable", w: "100;200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 2, u: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css" },
  { k: "noto-sans", use: ["자막", "가사"],  n: "본고딕",     f: "Noto Sans KR",        w: "100;200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 2 },
  { k: "wanted", use: ["가사"],     n: "원티드",     f: "Wanted Sans Variable", w: "400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 2, u: "https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.css" },
  { k: "gothic-a1",  n: "고딕A1",     f: "Gothic A1",           w: "100;200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 1 },
  { k: "nanum-code", n: "고딕코딩",   f: "Nanum Gothic Coding", w: "400;700",         g: "monospace",  c: "고딕", j: 1 },
  { k: "plex",       n: "플렉스",     f: "IBM Plex Sans KR",    w: "100;200;300;400;500;600;700", g: "sans-serif", c: "고딕", j: 0 },
  { k: "asta",       n: "아스타",     f: "Asta Sans",           w: "300;400;500;600;700;800", g: "sans-serif", c: "고딕", j: 0 },
  { k: "suit", use: ["가사"],       n: "수트",       f: "SUIT", w: "100;200;300;400;500;600;700;800;900",                g: "sans-serif", c: "고딕", j: 0, u: "https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css", heavy: 1 },
  { k: "spoqa", use: ["자막", "가사"],      n: "스포카",     f: "Spoqa Han Sans Neo", w: "100;300;400;500;700",  g: "sans-serif", c: "고딕", j: 0, u: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/css/SpoqaHanSansNeo.css", heavy: 1 },
  { k: "nanum-g",    n: "나눔고딕",   f: "Nanum Gothic",        w: "400;700;800",         g: "sans-serif", c: "고딕", j: 0 },
  { k: "kopub-d", use: ["소설"],    n: "KoPub돋움",  f: "KoPubWorld Dotum",    w: "300;400;700",     g: "sans-serif", c: "고딕", j: 1, heavy: 1,
    u: "https://cdn.jsdelivr.net/npm/font-kopubworld@1.0/css/dotum.css" },
  { k: "gowun-d", use: ["가사"],    n: "고운돋움",   f: "Gowun Dodum",         w: "400",             g: "sans-serif", c: "고딕", j: 0 },
  { k: "dohyeon", use: ["자막"],    n: "도현",       f: "Do Hyeon",            w: "400",             g: "sans-serif", c: "고딕", j: 0 },
  { k: "jua", use: ["자막"],        n: "주아",       f: "Jua",                 w: "400",             g: "sans-serif", c: "고딕", j: 0 },
  { k: "blackhan", use: ["자막"],   n: "검은고딕",   f: "Black Han Sans",      w: "400",             g: "sans-serif", c: "고딕", j: 0 },
  { k: "gasoek",     n: "가석",       f: "Gasoek One",          w: "400",             g: "sans-serif", c: "고딕", j: 0 },
  { k: "nanum-sq-round", use: ["가사"], n: "나눔스퀘어 라운드", f: "나눔스퀘어라운드", w: "300;400;700;800", g: "sans-serif", c: "고딕", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-square-round@0.2.0/index.css" },
  { k: "orbit", n: "오르빗", f: "Orbit", w: "400", g: "sans-serif", c: "고딕", j: 0 },
  { k: "sunflower", n: "해바라기", f: "Sunflower", w: "300;500;700", g: "sans-serif", c: "고딕", j: 0 },

  { k: "nanum-barun", n: "나눔바른고딕", f: "나눔바른고딕", w: "200;300;400;700", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-barun-gothic@0.3.0/index.css" },
  { k: "nanum-sq", n: "나눔스퀘어", f: "나눔스퀘어", w: "300;400;700;800", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-square@0.2.0/index.css" },
  { k: "nanum-sq-ac", n: "나눔스퀘어 ac", f: "나눔스퀘어_ac", w: "300;400;700;800", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-square-ac@0.2.0/index.css" },
  { k: "nexon1", n: "넥슨 Lv1고딕", f: "넥슨Lv1고딕", w: "300;400;700", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nexon-lv1-gothic@0.2.0/index.css" },
  { k: "nexon2", n: "넥슨 Lv2고딕", f: "넥슨Lv2고딕", w: "300;400;500;700", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nexon-lv2-gothic@0.2.0/index.css" },
  { k: "hanna-pro", n: "배민 한나 Pro", f: "배달의민족 한나체 Pro", w: "400", g: "sans-serif", c: "자막", j: 0, u: "https://cdn.jsdelivr.net/npm/@kfonts/bm-hanna-pro@0.2.0/index.css" },
  { k: "hanna-air", n: "배민 한나 Air", f: "배달의민족 한나체 Air", w: "400", g: "sans-serif", c: "자막", j: 0, u: "https://cdn.jsdelivr.net/npm/@kfonts/bm-hanna-air@0.2.0/index.css" },
  { k: "bm-euljiro", n: "배민 을지로", f: "배달의민족 을지로체 TTF", w: "400", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/bm-euljiro@0.2.1/index.css" },
  { k: "maple", n: "메이플스토리", f: "메이플스토리", w: "300;700", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nexon-maplestory@0.2.0/index.css" },
  { k: "line-seed", use: ["가사"], n: "라인 시드", f: "LINE Seed Sans KR", w: "200;400;700", g: "sans-serif", c: "자막", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/line-seed-sans-kr@0.1.0/index.css" },
  { k: "noto-sans-jp", n: "고딕 日本語", f: "Noto Sans JP",      w: "100;200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 2, h: "jp", kb: "noto-sans" },
  { k: "noto-sans-sc", n: "고딕 简体",   f: "Noto Sans SC",      w: "100;200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 0, h: "sc", kb: "noto-sans" },
  { k: "noto-sans-tc", n: "고딕 繁體",   f: "Noto Sans TC",      w: "100;200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 0, h: "tc", kb: "noto-sans" },
  { k: "zen-kaku",   n: "젠 각고딕 角ゴ", f: "Zen Kaku Gothic New", w: "300;400;500;700;900", g: "sans-serif", c: "고딕", j: 2, h: "jp", kb: "noto-sans" },
  { k: "mplus-round", n: "M+ 둥근 丸ゴ", f: "M PLUS Rounded 1c", w: "100;300;400;500;700;800;900", g: "sans-serif", c: "고딕", j: 2, h: "jp", kb: "noto-sans" },
  { k: "chiron-hei", n: "치론 黑體",    f: "Chiron Hei HK",     w: "200;300;400;500;600;700;800;900", g: "sans-serif", c: "고딕", j: 0, h: "tc", kb: "noto-sans" },
  { k: "huninn",     n: "후닌 圓體",    f: "Huninn",            w: "400",             g: "sans-serif", c: "고딕", j: 0, h: "tc", kb: "noto-sans" },

  { k: "noto-serif", use: ["소설"], n: "본명조",     f: "Noto Serif KR",       w: "200;300;400;500;600;700;800;900",     g: "serif",      c: "명조", j: 2 },
  { k: "nanum-m", use: ["소설"],    n: "나눔명조",   f: "Nanum Myeongjo",      w: "400;700;800",     g: "serif",      c: "명조", j: 0 },
  { k: "gowun-b", use: ["소설", "가사"],    n: "고운바탕",   f: "Gowun Batang",        w: "400;700",         g: "serif",      c: "명조", j: 0 },
  { k: "ridi", use: ["소설"],       n: "RIDI바탕",   f: "RIDIBatang",          g: "serif",      c: "명조", j: 1, heavy: 1,
    u: cdnFace("RIDIBatang", "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff") },
  { k: "maruburi", use: ["소설", "가사"],   n: "마루부리",   f: "Maru Buri",           w: "200;300;400;600;700", g: "serif", c: "명조", j: 0, heavy: 1,
    u: "https://cdn.jsdelivr.net/gh/fonts-archive/MaruBuri/MaruBuri.css" },
  { k: "song", use: ["소설"],       n: "송명",       f: "Song Myung",          w: "400",             g: "serif",      c: "명조", j: 0 },
  { k: "hahmlet", use: ["소설"],    n: "함렛",       f: "Hahmlet",             w: "100;200;300;400;500;600;700;800;900",     g: "serif",      c: "명조", j: 0 },
  { k: "diphylleia", n: "디필레이아", f: "Diphylleia",          w: "400",             g: "serif",      c: "명조", j: 0 },
  { k: "grandiflora",n: "그란디플로라", f: "Grandiflora One",   w: "400",             g: "serif",      c: "명조", j: 0 },
  { k: "noto-serif-jp", n: "명조 日本語", f: "Noto Serif JP",    w: "200;300;400;500;600;700;800;900",     g: "serif",      c: "명조", j: 2, h: "jp", kb: "noto-serif" },
  { k: "noto-serif-sc", n: "명조 简体",   f: "Noto Serif SC",    w: "200;300;400;500;600;700;800;900",     g: "serif",      c: "명조", j: 0, h: "sc", kb: "noto-serif" },
  { k: "noto-serif-tc", n: "명조 繁體",   f: "Noto Serif TC",    w: "200;300;400;500;600;700;800;900",     g: "serif",      c: "명조", j: 0, h: "tc", kb: "noto-serif" },
  { k: "shippori",   n: "시포리 明朝",  f: "Shippori Mincho",   w: "400;500;600;700;800",         g: "serif",      c: "명조", j: 2, h: "jp", kb: "noto-serif" },
  { k: "zen-old",    n: "젠 올드 明朝", f: "Zen Old Mincho",    w: "400;500;600;700;900",         g: "serif",      c: "명조", j: 2, h: "jp", kb: "noto-serif" },
  { k: "biz-mincho", n: "BIZ 明朝",     f: "BIZ UDPMincho",     w: "400;700",         g: "serif",      c: "명조", j: 2, h: "jp", kb: "noto-serif" },
  { k: "kaisei-decol", n: "카이세이 明朝", f: "Kaisei Decol",   w: "400;500;700",     g: "serif",      c: "명조", j: 2, h: "jp", kb: "noto-serif" },
  { k: "xiaowei",    n: "샤오웨이 小薇", f: "ZCOOL XiaoWei",    w: "400",             g: "serif",      c: "명조", j: 0, h: "sc", kb: "noto-serif" },
  { k: "cactus",     n: "칵투스 明體",  f: "Cactus Classical Serif", w: "400",        g: "serif",      c: "명조", j: 0, h: "tc", kb: "noto-serif" },
  { k: "chiron-sung", n: "치론 宋體",   f: "Chiron Sung HK",    w: "200;300;400;500;600;700;800;900", g: "serif",      c: "명조", j: 0, h: "tc", kb: "noto-serif" },

  { k: "kyobo21",  n: "교보 성지영", f: "KyoboHandwriting2021Seongjiyoung", g: "cursive", c: "손글씨", j: 0,
    u: cdnFace("KyoboHandwriting2021Seongjiyoung", "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KyoboHandwriting2021sjy.woff2") },
  { k: "kyobo19", hide: 1,  n: "교보 2019",   f: "KyoboHandwriting2019", g: "cursive", c: "손글씨", j: 0, heavy: 1,
    u: cdnFace("KyoboHandwriting2019", "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff") },
  { k: "ownpdh", hide: 1,   n: "박다현체",    f: "OngleipParkDahyeon",   g: "cursive", c: "손글씨", j: 0, heavy: 1,
    u: cdnFace("OngleipParkDahyeon", "https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2") },
  { k: "pen",        n: "나눔펜",     f: "Nanum Pen Script",    w: "400",             g: "cursive",    c: "손글씨", j: 0 },
  { k: "brush",      n: "나눔붓",     f: "Nanum Brush Script",  w: "400",             g: "cursive",    c: "손글씨", j: 0 },
  { k: "dokdo", hide: 1,      n: "동해독도",   f: "East Sea Dokdo",      w: "400",             g: "cursive",    c: "손글씨", j: 0 },
  { k: "barun-pen", n: "나눔바른펜", f: "나눔바른펜", w: "400;700", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-barun-pen@0.2.0/index.css" },
  { k: "magoche", hide: 1, n: "나눔 마고체", f: "나눔손글씨 마고체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-magoche@0.2.0/index.css" },
  { k: "hippie", hide: 1, n: "나눔 바른히피", f: "나눔손글씨 바른히피", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-baleunhipi@0.2.0/index.css" },
  { k: "amsterdam", hide: 1, n: "나눔 암스테르담", f: "나눔손글씨 암스테르담", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-amseuteleudam@0.2.0/index.css" },
  { k: "godeung", hide: 1, n: "고딕 아니고 고딩", f: "나눔손글씨 고딕 아니고 고딩", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-godig-anigo-goding@0.2.0/index.css" },
  { k: "bunpil", hide: 1, n: "학교안심 분필", f: "학교안심 분필", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-bunpil@0.1.0/index.css" },
  { k: "dokdo-g", hide: 1, n: "독도", f: "Dokdo", w: "400", g: "cursive", c: "손글씨", j: 0 },
  { k: "klee",       n: "클레 手書き",  f: "Klee One",          w: "400;600",         g: "cursive",    c: "손글씨", j: 2, h: "jp", kb: "noto-sans" },
  { k: "wenkai",     n: "문해 文楷",    f: "LXGW WenKai TC",    w: "300;400;700",     g: "cursive",    c: "손글씨", j: 0, h: "tc", kb: "noto-sans" },
  { k: "mashan",     n: "마산정 毛笔",  f: "Ma Shan Zheng",     w: "400",             g: "cursive",    c: "손글씨", j: 0, h: "sc", kb: "noto-sans" },
  { k: "yuji-syuku", n: "유지 筆文字",  f: "Yuji Syuku",        w: "400",             g: "cursive",    c: "손글씨", j: 2, h: "jp", kb: "noto-sans" },
  { k: "yomogi",     n: "요모기 手書き", f: "Yomogi",           w: "400",             g: "cursive",    c: "손글씨", j: 2, h: "jp", kb: "noto-sans" },
  { k: "longcang",   n: "룽창 手写",    f: "Long Cang",         w: "400",             g: "cursive",    c: "손글씨", j: 0, h: "sc", kb: "noto-sans" },
  { k: "zhimang",    n: "즈망싱 行草",  f: "Zhi Mang Xing",     w: "400",             g: "cursive",    c: "손글씨", j: 0, h: "sc", kb: "noto-sans" },
  { k: "iansui",     n: "옌수이 手寫",  f: "Iansui",            w: "400",             g: "cursive",    c: "손글씨", j: 0, h: "tc", kb: "noto-sans" },

  { k: "gamja",      n: "감자꽃",     f: "Gamja Flower",        w: "400",             g: "cursive",    c: "개성", j: 1 },
  { k: "himelody",   n: "하이멜로디", f: "Hi Melody",           w: "400",             g: "cursive",    c: "개성", j: 1 },
  { k: "gaegu",      n: "개구",       f: "Gaegu",               w: "300;400;700",     g: "cursive",    c: "개성", j: 0 },
  { k: "dongle",     n: "동글",       f: "Dongle",              w: "300;400;700",     g: "cursive",    c: "개성", j: 0 },
  { k: "kirang",     n: "기랑해랑",   f: "Kirang Haerang",      w: "400",             g: "cursive",    c: "개성", j: 0 },
  { k: "gugi",       n: "구기",       f: "Gugi",                w: "400",             g: "sans-serif", c: "개성", j: 0 },
  { k: "stylish",    n: "스타일리시", f: "Stylish",             w: "400",             g: "sans-serif", c: "개성", j: 0 },
  { k: "hanna-11", n: "한나는 열한살", f: "배달의민족 한나는 열한살", w: "400", g: "sans-serif", c: "개성", j: 0, u: "https://cdn.jsdelivr.net/npm/@kfonts/bm-hanna-11yrs@0.2.1/index.css" },
  { k: "bm-yeonsung", n: "배민 연성", f: "배달의민족 연성", w: "400", g: "cursive", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/bm-yeonsung@0.2.0/index.css" },
  { k: "bazzi", n: "배찌체", f: "배찌체", w: "400", g: "sans-serif", c: "개성", j: 0, u: "https://cdn.jsdelivr.net/npm/@kfonts/nexon-bazzi@0.3.0/index.css" },
  { k: "monggeul", n: "학교안심 몽글몽글", f: "학교안심 몽글몽글", w: "400", g: "cursive", c: "개성", j: 0, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-monggeulmonggeul@0.1.0/index.css" },
  { k: "neodgm", n: "Neo둥근모", f: "Neo둥근모", w: "400", g: "monospace", c: "개성", j: 0, u: "https://cdn.jsdelivr.net/npm/@kfonts/neodgm@0.5.0/index.css" },
  { k: "d2coding", n: "D2코딩", f: "D2Coding", w: "400;700", g: "monospace", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/d2coding@0.2.0/index.css" },
  { k: "bagel", n: "베이글", f: "Bagel Fat One", w: "400", g: "sans-serif", c: "개성", j: 0 },
  { k: "bwpicture", n: "흑백사진", f: "Black And White Picture", w: "400", g: "sans-serif", c: "개성", j: 0 },
  { k: "poorstory", n: "푸어스토리", f: "Poor Story", w: "400", g: "cursive", c: "개성", j: 0 },
  { k: "singleday", n: "싱글데이", f: "Single Day", w: "400", g: "cursive", c: "개성", j: 0 },
  { k: "cutefont", n: "큐트", f: "Cute Font", w: "400", g: "cursive", c: "개성", j: 0 },
  { k: "zen-maru",   n: "젠 마루 丸ゴ", f: "Zen Maru Gothic",   w: "300;400;500;700;900",         g: "sans-serif", c: "개성", j: 2, h: "jp", kb: "noto-sans" },
  { k: "dela",       n: "델라 太字",    f: "Dela Gothic One",   w: "400",             g: "sans-serif", c: "개성", j: 2, h: "jp", kb: "noto-sans" },
  { k: "zcool",      n: "쿨 快乐",      f: "ZCOOL KuaiLe",      w: "400",             g: "sans-serif", c: "개성", j: 0, h: "sc", kb: "noto-sans" },
  { k: "dotgothic",  n: "도트 ドット",  f: "DotGothic16",       w: "400",             g: "sans-serif", c: "개성", j: 2, h: "jp", kb: "noto-sans" },
  { k: "reggae",     n: "레게 ポップ",  f: "Reggae One",        w: "400",             g: "sans-serif", c: "개성", j: 2, h: "jp", kb: "noto-sans" },
  { k: "qingke",     n: "칭커 黄油体",  f: "ZCOOL QingKe HuangYou", w: "400",         g: "sans-serif", c: "개성", j: 0, h: "sc", kb: "noto-sans" },
  { k: "kf-nhw-dahaengche", n: "나눔 다행체", f: "나눔손글씨 다행체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-dahaengche@0.2.0/index.css" },
  { k: "kf-nhw-gomsinche", hide: 1, n: "나눔 곰신체", f: "나눔손글씨 곰신체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-gomsinche@0.2.0/index.css" },
  { k: "kf-nhw-mongdol", hide: 1, n: "나눔 몽돌", f: "나눔손글씨 몽돌", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-mongdol@0.2.0/index.css" },
  { k: "kf-nhw-jangmiche", hide: 1, n: "나눔 장미체", f: "나눔손글씨 장미체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-jangmiche@0.2.0/index.css" },
  { k: "kf-nhw-yeonjiche", hide: 1, n: "나눔 연지체", f: "나눔손글씨 연지체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-yeonjiche@0.2.0/index.css" },
  { k: "kf-nhw-kkochnae-eum", hide: 1, n: "나눔 꽃내음", f: "나눔손글씨 꽃내음", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-kkochnae-eum@0.2.0/index.css" },
  { k: "kf-nhw-sonpyeonjiche", n: "나눔 손편지체", f: "나눔손글씨 손편지체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-sonpyeonjiche@0.2.0/index.css" },
  { k: "kf-nhw-huimangnuli", hide: 1, n: "나눔 희망누리", f: "나눔손글씨 희망누리", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-huimangnuli@0.2.0/index.css" },
  { k: "kf-nhw-baleunjeongsin", n: "나눔 바른정신", f: "나눔손글씨 바른정신", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-baleunjeongsin@0.2.0/index.css" },
  { k: "kf-nhw-kokoche", hide: 1, n: "나눔 코코체", f: "나눔손글씨 코코체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-kokoche@0.2.0/index.css" },
  { k: "kf-nhw-dajinche", hide: 1, n: "나눔 다진체", f: "나눔손글씨 다진체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-dajinche@0.2.0/index.css" },
  { k: "kf-nhw-hyejunche", hide: 1, n: "나눔 혜준체", f: "나눔손글씨 혜준체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-hyejunche@0.2.0/index.css" },
  { k: "kf-nhw-eommasalang", hide: 1, n: "나눔 엄마사랑", f: "나눔손글씨 엄마사랑", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-eommasalang@0.2.0/index.css" },
  { k: "kf-nhw-gyuli-ui-ilgi", n: "나눔 규리의 일기", f: "나눔손글씨 규리의 일기", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-gyuli-ui-ilgi@0.2.0/index.css" },
  { k: "kf-nhw-ogbiche", hide: 1, n: "나눔 옥비체", f: "나눔손글씨 옥비체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-ogbiche@0.2.0/index.css" },
  { k: "kf-nhw-somiche", hide: 1, n: "나눔 소미체", f: "나눔손글씨 소미체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-somiche@0.2.0/index.css" },
  { k: "kf-nhw-sehwache", hide: 1, n: "나눔 세화체", f: "나눔손글씨 세화체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-sehwache@0.2.0/index.css" },
  { k: "kf-nhw-mugunghwa", hide: 1, n: "나눔 무궁화", f: "나눔손글씨 무궁화", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-mugunghwa@0.2.0/index.css" },
  { k: "kf-nhw-tta-tteushan-jagbyeol", hide: 1, n: "나눔 따뜻한 작별", f: "나눔손글씨 따뜻한 작별", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-tta-tteushan-jagbyeol@0.2.0/index.css" },
  { k: "kf-nhw-jalhago-iss-eo", hide: 1, n: "나눔 잘하고 있어", f: "나눔손글씨 잘하고 있어", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-jalhago-iss-eo@0.2.0/index.css" },
  { k: "kf-nhw-dasi-sijaghae", hide: 1, n: "나눔 다시 시작해", f: "나눔손글씨 다시 시작해", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-dasi-sijaghae@0.2.0/index.css" },
  { k: "kf-nhw-ban-jjagban-jjag-byeol", hide: 1, n: "나눔 반짝반짝 별", f: "나눔손글씨 반짝반짝 별", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-ban-jjagban-jjag-byeol@0.2.0/index.css" },
  { k: "kf-nhw-yuni-ttingttangttingttang", hide: 1, n: "나눔 유니 띵땅띵땅", f: "나눔손글씨 유니 띵땅띵땅", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-yuni-ttingttangttingttang@0.2.0/index.css" },
  { k: "kf-nhw-agisalangche", hide: 1, n: "나눔 아기사랑체", f: "나눔손글씨 아기사랑체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-agisalangche@0.2.0/index.css" },
  { k: "kf-nhw-jeong-eunche", hide: 1, n: "나눔 정은체", f: "나눔손글씨 정은체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-jeong-eunche@0.2.0/index.css" },
  { k: "kf-nhw-gim-yu-iche", hide: 1, n: "나눔 김유이체", f: "나눔손글씨 김유이체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-gim-yu-iche@0.2.0/index.css" },
  { k: "kf-nhw-ye-ppeun-mingyeongche", hide: 1, n: "나눔 예쁜 민경체", f: "나눔손글씨 예쁜 민경체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-ye-ppeun-mingyeongche@0.2.0/index.css" },
  { k: "kf-nhw-seongsilche", hide: 1, n: "나눔 성실체", f: "나눔손글씨 성실체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-seongsilche@0.2.0/index.css" },
  { k: "kf-nhw-neulisneulische", hide: 1, n: "나눔 느릿느릿체", f: "나눔손글씨 느릿느릿체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-neulisneulische@0.2.0/index.css" },
  { k: "kf-nhw-bisangche", hide: 1, n: "나눔 비상체", f: "나눔손글씨 비상체", w: "400", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-handwritting-bisangche@0.2.0/index.css" },
  { k: "kf-hga-butpen", n: "학교안심 붓펜", f: "학교안심 붓펜", w: "300;500;700", g: "cursive", c: "손글씨", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-butpen@0.1.0/index.css" },
  { k: "kf-hga-bareonbatang", use: ["소설"], n: "학교안심 바른바탕", f: "학교안심 바른바탕", w: "400;700", g: "serif", c: "명조", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-bareonbatang@0.1.0/index.css" },
  { k: "kf-hga-santteutbatang", use: ["소설"], n: "학교안심 산뜻바탕", f: "학교안심 산뜻바탕", w: "300;500", g: "serif", c: "명조", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-santteutbatang@0.1.0/index.css" },
  { k: "kf-nanum-myeongjo-eco", use: ["소설"], n: "나눔명조 에코", f: "나눔명조 에코", w: "400;700;800", g: "serif", c: "명조", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-myeongjo-eco@0.2.0/index.css" },
  { k: "kf-hga-bareondotum", n: "학교안심 바른돋움", f: "학교안심 바른돋움", w: "400;700", g: "sans-serif", c: "고딕", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-bareondotum@0.1.0/index.css" },
  { k: "kf-hga-santteutdotum", use: ["가사"], n: "학교안심 산뜻돋움", f: "학교안심 산뜻돋움", w: "300;500", g: "sans-serif", c: "고딕", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-santteutdotum@0.1.0/index.css" },
  { k: "kf-daehwa-nanum", n: "대화나눔", f: "대화나눔", w: "300;400;700", g: "sans-serif", c: "고딕", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/daehwa-nanum@0.1.0/index.css" },
  { k: "kf-nanum-gothic-eco", n: "나눔고딕 에코", f: "나눔고딕 에코", w: "400;700;800", g: "sans-serif", c: "고딕", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/nanum-gothic-eco@0.2.0/index.css" },
  { k: "kf-kcc-hanbit", n: "KCC 한빛", f: "KCC-한빛", w: "400", g: "sans-serif", c: "고딕", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/kcc-hanbit@0.1.0/index.css" },
  { k: "kf-hga-moheomga", n: "학교안심 모험가", f: "학교안심 모험가", w: "400;700", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-moheomga@0.1.0/index.css" },
  { k: "kf-hga-malgeunnal", n: "학교안심 맑은날", f: "학교안심 맑은날", w: "500;700", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-malgeunnal@0.1.0/index.css" },
  { k: "kf-hga-gaeulsopung", n: "학교안심 가을소풍", f: "학교안심 가을소풍", w: "300;700", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-gaeulsopung@0.1.0/index.css" },
  { k: "kf-hga-dotbogi", n: "학교안심 돋보기", f: "학교안심 돋보기", w: "400", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-dotbogi@0.1.0/index.css" },
  { k: "kf-hga-undongjang", n: "학교안심 운동장", f: "학교안심 운동장", w: "300", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-undongjang@0.1.0/index.css" },
  { k: "kf-hga-wooju", n: "학교안심 우주", f: "학교안심 우주", w: "400", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-wooju@0.1.0/index.css" },
  { k: "kf-hga-kkokkoma", n: "학교안심 꼬꼬마", f: "학교안심 꼬꼬마", w: "400", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-kkokkoma@0.1.0/index.css" },
  { k: "kf-hga-gureum", n: "학교안심 꾸러기", f: "학교안심 꾸러기", w: "400", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-gureum@0.1.0/index.css" },
  { k: "kf-hga-yeohaeng", n: "학교안심 여행", f: "학교안심 여행", w: "400", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/hakgyoansim-yeohaeng@0.1.0/index.css" },
  { k: "kf-bm-euljiro-10years-later", n: "을지로10년후", f: "배민 을지로10년후체", w: "400", g: "sans-serif", c: "개성", j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@kfonts/bm-euljiro-10years-later@0.2.1/index.css" },
  { k: "nn-gmarket", n: "G마켓 산스", f: "GmarketSansMedium", w: "400", g: "sans-serif", c: "고딕", use: ["자막", "가사"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/gmarket-sans-medium@0.1.0/index.css" },
  { k: "nn-scdream", n: "에스코어드림", f: "S-CoreDream-3Light", w: "400", g: "sans-serif", c: "고딕", use: ["자막", "가사"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/s-core-dream-3-light@0.1.0/index.css" },
  { k: "nn-aggro", n: "어그로체", f: "SBAggroB", w: "400", g: "sans-serif", c: "개성", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/sb-aggro-b@0.1.0/index.css" },
  { k: "nn-ssurround", n: "카페24 써라운드", f: "Cafe24Ssurround", w: "400", g: "sans-serif", c: "개성", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/cafe24-ssurround@0.1.0/index.css" },
  { k: "nn-jalnan", n: "잘난체", f: "yg-jalnan", w: "400", g: "sans-serif", c: "개성", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/yg-jalnan@0.1.0/index.css" },
  { k: "nn-onetitle", n: "원스토어 제목", f: "ONE-Mobile-Title", w: "400", g: "sans-serif", c: "고딕", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/one-mobile-title@0.1.0/index.css" },
  { k: "nn-gonggothic", n: "공고딕", f: "GongGothicMedium", w: "400", g: "sans-serif", c: "고딕", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/gong-gothic-medium@0.1.0/index.css" },
  { k: "nn-namsan", n: "서울남산", f: "SeoulNamsanM", w: "400", g: "sans-serif", c: "고딕", use: ["자막", "가사"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/seoul-namsan-m@0.1.0/index.css" },
  { k: "nn-tmoney", n: "티머니 둥근바람", f: "TmoneyRoundWindExtraBold", w: "400", g: "sans-serif", c: "개성", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/tmoney-round-wind-extra-bold@0.1.0/index.css" },
  { k: "nn-cookierun", n: "쿠키런", f: "CookieRun-Regular", w: "400", g: "sans-serif", c: "개성", use: ["자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/cookie-run-regular@0.1.0/index.css" },
  { k: "nn-chosun", n: "조선일보명조", f: "Chosunilbo_myungjo", w: "400", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/chosunilbo-myungjo@0.1.0/index.css" },
  { k: "nn-iropke", n: "이롭게바탕", f: "Iropke Batang", w: "400", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/iropke-batang@0.1.0/index.css" },
  { k: "nn-kopub-b", n: "KoPub바탕", f: "KoPubWorld Batang", w: "300;400;700", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/font-kopubworld@1.0/css/batang.css" },
  { k: "nn-jeju-m", n: "제주명조", f: "Jeju Myeongjo", w: "400", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/jeju-myeongjo@0.1.0/index.css" },
  { k: "nn-eulyoo", n: "을유1945", f: "Eulyoo1945-Regular", w: "400", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/eulyoo1945-regular@0.1.0/index.css" },
  { k: "nn-aritaburi", n: "아리따부리", f: "Arita-buri-SemiBold", w: "400", g: "serif", c: "명조", use: ["소설", "가사"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/arita-buri-semi-bold@0.1.0/index.css" },
  { k: "nn-hangang", n: "서울한강", f: "SeoulHangangM", w: "400", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/seoul-hangang-m@0.1.0/index.css" },
  { k: "nn-gg-batang", n: "경기바탕", f: "GyeonggiBatang", w: "400", g: "serif", c: "명조", use: ["소설"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/gyeonggi-batang@0.1.0/index.css" },
  { k: "nn-aritadotum", n: "아리따돋움", f: "Arita-dotum-Medium", w: "400", g: "sans-serif", c: "고딕", use: ["가사"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/arita-dotum-medium@0.1.0/index.css" },
  { k: "nn-sqneo", n: "나눔스퀘어 네오", f: "NanumSquareNeo-Variable", w: "400", g: "sans-serif", c: "고딕", use: ["가사", "자막"], j: 0, heavy: 1, u: "https://cdn.jsdelivr.net/npm/@noonnu/nanum-square-neo-variable@0.1.0/index.css" },
];
const FONT_CATS = ["자막", "소설", "가사", "고딕", "명조", "손글씨", "개성"];
const FONT_CAT_NAME = { 소설: "소설·책" };
const inFontCat = (x, c) => x.c === c || (x.use || []).indexOf(c) >= 0;
const FONT_BY = {};
const FONT_BY_FAMILY = {};
FONTS.forEach(x => { FONT_BY[x.k] = x; FONT_BY_FAMILY[x.f] = x; });
const FONT_LEGACY = { sans: "noto-sans", serif: "noto-serif" };
const fontOf = (k) => FONT_BY[FONT_LEGACY[k] || k] || FONT_BY["noto-sans"];
const hanFB = (f) => (f.g === "serif" ? ["noto-serif-tc", "noto-serif-sc"] : ["noto-sans-tc", "noto-sans-sc"]).filter(k => k !== f.k);
const HAN_RE = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]|[\ud840-\ud87f][\udc00-\udfff]/;
const korFB = (f) => f.g === "serif" ? "noto-serif" : "noto-sans";
const fontStack = (k) => {
  const f = fontOf(k), kf = korFB(f);
  return "'" + f.f + "', " + (f.kb ? "'" + fontOf(f.kb).f + "', " : "") +
    (kf !== f.k && kf !== f.kb ? "'" + fontOf(kf).f + "', " : "") +
    hanFB(f).map(x => "'" + fontOf(x).f + "', ").join("") + f.g;
};
const hanOK = (x) => x.j >= 1 || !!x.h;
const HAN_NAME = { jp: "일본어(가나+한자)", sc: "중국어 간체", tc: "중국어 번체" };
const HAN_LANGS = [["", "모두"], ["jp", "일본어"], ["sc", "간체"], ["tc", "번체"]];
const hanIn = (x, l) => !l ? hanOK(x) : l === "jp" ? x.j >= 1 && (!x.h || x.h === "jp") : x.h === l;
const hanBadge = (x) => x.h === "sc" ? '<i class="jb full">简</i>' : x.h === "tc" ? '<i class="jb full">繁</i>' :
  x.j ? '<i class="jb' + (x.j === 2 ? " full" : "") + '">日</i>' : "";
const wsOf = (f) => f.w ? f.w.split(";").map(Number).sort((a, b) => a - b) : [];
const FW_NAME = { 100: "얇게", 200: "더 가늘게", 300: "가늘게", 400: "보통", 500: "중간", 600: "약간 굵게", 700: "굵게", 800: "아주 굵게", 900: "검게" };
function snapW(f, w) {
  const ws = wsOf(f);
  w = Math.max(1, Math.min(1000, Math.round(w)));
  if (!ws.length || ws.indexOf(w) >= 0) return w;
  const lo = ws.filter(x => x < w), hi = ws.filter(x => x > w);
  if (w >= 400 && w <= 500) {
    const mid = hi.filter(x => x <= 500);
    return mid.length ? mid[0] : lo.length ? lo[lo.length - 1] : hi[0];
  }
  if (w < 400) return lo.length ? lo[lo.length - 1] : hi[0];
  return hi.length ? hi[0] : lo[lo.length - 1];
}
function fwOf(base, k, tfw, bw) {
  const f = fontOf(k || S.famKey);
  if (tfw == null) tfw = base;
  const W = bw >= 100 ? bw : S.fw >= 100 ? S.fw : 0;
  let out;
  if (W) {
    const m = bw >= 100 ? bw : tfw >= 600 ? Math.max(tfw, W + 200) : W;
    out = snapW(f, Math.max(100, Math.min(900, m + (base - tfw))));
  } else {
    const d = S.fw | 0;
    if (!d || d > 1 || d < -1) out = base;
    else if (!f.w) out = Math.max(100, Math.min(900, base + d * 100));
    else {
      const ws = wsOf(f);
      let i = 0;
      for (let j = 1; j < ws.length; j++) if (Math.abs(ws[j] - base) < Math.abs(ws[i] - base)) i = j;
      out = ws[Math.max(0, Math.min(ws.length - 1, i + d))];
    }
  }
  needW(f, out);
  return out;
}
function boldOf(k, m) {
  const f = fontOf(k || S.famKey), ws = wsOf(f);
  const c = ws.filter(x => x >= Math.max(600, m + 100));
  const out = c.indexOf(700) >= 0 ? 700 : c.length ? c[0] : Math.max(700, m);
  needW(f, out);
  return out;
}
const fontURL = (f, w) => f.u ? f.u :
  "https://fonts.googleapis.com/css2?family=" + f.f.replace(/ /g, "+") +
  ":wght@" + (w || f.w) + "&display=swap";

const fontLoaded = {};
const fontW = { "Noto Sans KR": new Set([300, 400, 500, 700]) };
const FW_BASE = [400, 700];
function ensureFont(k, ws) {
  const f = fontOf(k);
  if (f.kb) ensureFont(f.kb, ws);
  const kf = korFB(f);
  if (kf !== f.k && kf !== f.kb) ensureFont(kf, ws);
  const add = (href) => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  };
  if (f.u || !f.w) {
    if (fontLoaded[f.f]) return;
    fontLoaded[f.f] = true;
    add(fontURL(f));
    return;
  }
  const have = fontW[f.f] || (fontW[f.f] = new Set());
  const miss = [...new Set((ws && ws.length ? ws : FW_BASE).map(w => snapW(f, w)))].filter(w => !have.has(w)).sort((a, b) => a - b);
  if (!miss.length) return;
  miss.forEach(w => have.add(w));
  add(fontURL(f, miss.join(";")));
}
const fwPend = new Map(), fwAll = new Set([400]);
let fwPendOn = false;
function needW(f, w) {
  fwAll.add(w);
  if (f.u || !f.w) return;
  const sw = snapW(f, w);
  if (fontW[f.f] && fontW[f.f].has(sw)) return;
  if (!fwPend.has(f.k)) fwPend.set(f.k, new Set());
  fwPend.get(f.k).add(sw);
  if (fwPendOn) return;
  fwPendOn = true;
  Promise.resolve().then(() => {
    fwPendOn = false;
    const jobs = [...fwPend];
    fwPend.clear();
    jobs.forEach(([k, s]) => ensureFont(k, [...s]));
  });
}
let fwSpanSeen = "";
function fwSpanNeed() {
  const all = Object.keys(txt).map(k => txt[k] || "").join("");
  const ws = new Set();
  (all.match(/font-weight:\s*\d+/g) || []).forEach(m => ws.add(+m.replace(/\D/g, "")));
  const memo = [...ws].join() + "|" + S.famKey + S.blocks.map(b => b.fam || "").join();
  if (memo === fwSpanSeen || !ws.size) return;
  fwSpanSeen = memo;
  const ks = new Set([S.famKey]);
  S.blocks.forEach(b => { if (b.fam) ks.add(b.fam); });
  ks.forEach(k => ws.forEach(w => needW(fontOf(k), w)));
}

let hanSeen = "";
function hanNeed() {
  const all = Object.keys(txt).map(k => txt[k] || "").join("");
  const ks = new Set([S.famKey]);
  S.blocks.forEach(b => { if (b.fam) ks.add(b.fam); });
  if (/font-family/.test(all)) { ks.add("noto-sans"); ks.add("noto-serif"); }
  const memo = [...ks].join() + "|" + [...fwAll].join() + "|" + all;
  if (memo === hanSeen) return;
  hanSeen = memo;
  if (!HAN_RE.test(all)) return;
  ks.forEach(k => hanFB(fontOf(k)).forEach(x => ensureFont(x, [...fwAll])));
}

let fontPreviewLoaded = false;
function loadFontPreviews() {
  if (fontPreviewLoaded) return;
  fontPreviewLoaded = true;
  setTimeout(() => {
    const text = Array.from(new Set(FONTS.map(x => x.n).join(""))).join("");
    const fams = FONTS.filter(x => !x.u).map(x => {
      const ws = x.w.split(";");
      return "family=" + x.f.replace(/ /g, "+") + ":wght@" + (ws.indexOf("400") >= 0 ? "400" : ws[0]);
    }).join("&");
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?" + fams + "&text=" + encodeURIComponent(text) + "&display=swap";
    document.head.appendChild(l);
    FONTS.forEach(x => { if (x.u && !x.heavy) ensureFont(x.k); });
  }, 350);
}
const S = {
  screen: "input",
  tab: "블록", cat: "글", gapScope: "block",
  blocks: [
    { id: "b2", type: "title" },
    { id: "b1", type: "subtitle" },
    { id: "b4", type: "body" },
    { id: "b7", type: "credit" }
  ],
  active: "b2",
  bg: "#ffffff", bgImage: false, bgHide: false, overlay: 0.36, ovColor: "#000000", bgBlur: 0,
  bgScale: 1, bgX: 0, bgY: 0,
  side: null,
  bgGrad: 0, bg2: "#ebe3d4", bg3: "#dfb09c", bgDir: "v",
  tsh: 0, tshC: "auto",
  capSt: "shadow",
  lbox: "",
  capPos: "bottom",
  cw: 100,
  tgrad: false, tg1: "#6f807a", tg2: "#141414",
  artBg: "",
  qmark: 0,
  pfx: "",
  pfxT: {},
  info: { on: false, pos: "top", date: true, page: true, dateText: "", scene: "" },
  accent: "#a8a8a6", bub: "#1a1a1a",
  quoteOn: false, quoteC: "", parenOn: false, parenC: "", inkOpen: "",
  bubNoName: false, bubNoFace: false, bubNoQuote: false, bubW: 76,
  bubPY: null, bubPX: null,
  bubR: null,
  avBub: false,
  avR: null, avSize: null, avGap: null,
  lyDim: null,
  decoC: null, decoImg: null,
  htmlK: 1.5,
  msgTime: false, msgT0: "오후 2:14",
  bsheet: false, toastAct: null, typeOffer: null, typeJust: "",
  qStyle: "「」",
  famKey: "noto-sans", fontCat: "고딕", jaOnly: false, hanLang: "", famScope: "auto", pickOn: false, picks: [], kbFit: "width", scale: 1, scaleBase: 1, fsUnit: "%", fw: 0, ls: 0, lh: 1, gap: 9, padX: 32,
  wordBreak: "keep-all",
  indent: 0,
  padY: null, colGap: null,
  cpkFold: false,
  vpos: "",
  hpos: "left", textW: 100,
  ratio: "4:5", autoH: 388, cardW: 310, sheet: false, guide: false, preview: false, target: "text",
  zoom: "fit", fold: false, zoomK: 1,
  lib: false,
  brush: null,
  tplpv: "", tplRaw: true,
  tplSel: "t-basic", tplId: "t-basic",
  tplCat: "",
  advOn: {},
  recent: { text: [], hilite: [], bubble: [] },
  custom: { text: "#8f2020", hilite: "#ffe680", bubble: "#3b7cf6" },
  calpha: { text: 1, hilite: 1, bubble: 1 },
  cast: {},
  castColor: {}, castOn: false, castName: true, castText: false, castBub: false,
  dlgBar: false, dlgBarK: "line", dlgBarBi: false, dlgBarQ: false,
  dlgName: "label", biItal: "auto", biMain: "orig",
  biGap: null,
  ratioBox: "card",
  colFill: "balance",
  autoMinH: null,
  skin: "",
  skinC: {},
  frame: "", frameC: "",
  flow: "pages", fit: 1, over: false,
  page: 0, pages: 1, offsets: [0], clips: [0], presets: [], pedit: false, pdlg: null,
  dragging: null, overId: null, overPos: null, toast: ""
};

const S0 = JSON.parse(JSON.stringify(S));

const PRESET_KEYS = [
  "bg", "bgImage", "overlay", "ovColor", "bgScale", "bgX", "bgY", "bgBlur",
  "bgGrad", "bg2", "bg3", "bgDir", "tsh", "tshC", "qmark", "pfx", "pfxT",
  "accent", "bub", "bubNoName", "bubNoFace", "bubNoQuote", "bubW", "bubR", "avBub", "avR", "avSize", "avGap", "lyDim",
  "quoteOn", "quoteC", "parenOn", "parenC",
  "castOn", "castName", "castText", "castBub",
  "dlgBar", "dlgBarK", "dlgBarBi", "dlgBarQ",
  "famKey", "jaOnly", "scale", "fw", "ls", "lh", "wordBreak", "indent",
  "gap", "padX", "padY", "colGap", "ratio", "vpos", "hpos", "textW", "cardW", "autoMinH", "flow", "skin", "skinC", "frame", "frameC",
  "dlgName", "biItal", "biMain", "biGap", "colFill", "capSt", "lbox", "capPos", "cw", "tgrad", "tg1", "tg2", "artBg"
];
const PRESET_STORE = "excerpt-presets-v2";
const PRESET_MAX = 12;
const PNAME_MAX = 14;

function pickPreset(src) {
  const v = {};
  PRESET_KEYS.forEach(k => { if (src && src[k] !== undefined) v[k] = src[k]; });
  return v;
}
const PBS_KEYS = ["align", "fam", "fw", "tc", "tcA", "ls", "lh", "bub", "bubA", "nobar", "dv", "nx", "ny", "ar", "pw", "fill", "gapA"];
function pickBS() {
  return (S.blocks || []).map(b => {
    const o = { t: b.type };
    PBS_KEYS.forEach(k => { if (b[k] != null) o[k] = b[k]; });
    return o;
  });
}
function cleanBS(a) {
  if (!Array.isArray(a)) return undefined;
  const out = a.slice(0, 80).map(x => {
    if (!x || typeof x !== "object" || typeof x.t !== "string" || x.t.length > 20) return null;
    const o = { t: x.t };
    PBS_KEYS.forEach(k => {
      const v = x[k];
      if (typeof v === "number" && isFinite(v)) o[k] = Math.max(-2000, Math.min(2000, v));
      else if (typeof v === "boolean" || (typeof v === "string" && v.length <= 40)) o[k] = v;
    });
    return o;
  }).filter(Boolean);
  return out.length ? out : undefined;
}
function pickSideP() {
  if (!S.side || typeof S.side !== "object") return undefined;
  const o = Object.assign({}, S.side);
  delete o.m;
  return o;
}
function cleanSideP(x) {
  if (!x || typeof x !== "object" || Array.isArray(x)) return undefined;
  let j = "";
  try { j = JSON.stringify(x); } catch (e) { return undefined; }
  if (j.length > 800) return undefined;
  const o = JSON.parse(j);
  delete o.m;
  return o;
}
function presetOf(id, name) {
  const p = { id: id, name: name, v: pickPreset(S) };
  const bs = cleanBS(pickBS()), sd = cleanSideP(pickSideP());
  if (bs) p.bs = bs;
  if (sd) p.side = sd;
  return p;
}
const biPreset = (id, name, over) => ({ id: id, name: name, built: 1, v: Object.assign(pickPreset(S0), over) });
const BUILTIN_PRESETS = [
  biPreset("bi-basic", "기본", {}),
  biPreset("bi-note", "필사 노트", { bg: "#fbf8f3", accent: "#8f2020", famKey: "noto-serif", ls: 0.01, lh: 1.25, gap: 18, padX: 40, ratio: "3:4" }),
  biPreset("bi-dark", "다크", { bg: "#2a2a28", accent: "#7a9bd8", bub: "#f1f1ef", famKey: "pretendard", lh: 1.15, gap: 16, ratio: "1:1" }),
  biPreset("bi-hand", "손글씨", { bg: "#fbf8f3", accent: "#e08a95", famKey: "kyobo21", scale: 1.15, lh: 1.15, gap: 14, padX: 34 }),
  biPreset("bi-chat", "대화", { bg: "#f2f0eb", accent: "#8a8a88", bub: "#2f6fe4", famKey: "pretendard", gap: 8, padX: 30 }),
  biPreset("bi-long", "긴 글", { accent: "#7a9bd8", famKey: "pretendard", scale: 0.95, lh: 1.25, gap: 13, padX: 30, ratio: "auto", cardW: 340 }),
  biPreset("bi-dusk", "해질녘", { bgGrad: 2, bg: "#2f2a2e", bg2: "#7a4a3e", bgDir: "d", accent: "#e08a95", famKey: "noto-serif", tsh: 1, lh: 1.25, gap: 16, padX: 36 })
];

const ROW_NAV_F = () => '<button class="cfade l" data-act="hs" data-d="-1" aria-label="앞으로 넘기기" tabindex="-1"><span class="cfbtn">' + ic("back", 16) + "</span></button>" +
  '<button class="cfade r" data-act="hs" data-d="1" aria-label="뒤로 넘기기" tabindex="-1"><span class="cfbtn">' + ic("next", 16) + "</span></button>";
const dAbs = (st, inner) => '<i style="position:absolute;display:block;pointer-events:none;font-style:normal;' + st + '">' + (inner || "") + "</i>";
const STAR4 = "M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z";
const dStar = (x, y, sz, fill, glow) => dAbs("left:" + x.toFixed(1) + "px;top:" + y.toFixed(1) + "px;width:" + sz + "px;height:" + sz + "px" +
  (glow ? ";filter:drop-shadow(0 0 " + glow + "px " + fill + ")" : ""),
  '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" style="display:block"><path d="' + STAR4 + '" fill="' + fill + '"/></svg>');
const seeded = (n, seed) => { let t = seed; return Array.from({ length: n }, () => { t = (t * 9301 + 49297) % 233280; return t / 233280; }); };
let skinCnow = null;
let chatPeer = null;
function findPeer() {
  const b = S.blocks.find(x => (x.type === "avatar" || (x.type === "bubble" && x.side !== "right")) && speakerOf(x));
  if (!b) return { name: "", url: "" };
  const name = speakerOf(b);
  return { name: name, url: mediaURL((S.cast || {})[name] || b.img || "") };
}
const peerFace = (x, y, sz, bg) => {
  const pe = chatPeer || {};
  return dAbs("left:" + x + "px;top:" + y + "px;width:" + sz + "px;height:" + sz + "px;border-radius:50%;overflow:hidden;background:" + bg +
    (pe.url ? " url(" + pe.url + ") center/cover no-repeat" : ""),
    pe.url ? "" : dAbs("left:" + sz * 0.33 + "px;top:" + sz * 0.2 + "px;width:" + sz * 0.34 + "px;height:" + sz * 0.34 + "px;border-radius:50%;background:rgba(255,255,255,0.7)") +
      dAbs("left:" + sz * 0.18 + "px;top:" + sz * 0.62 + "px;width:" + sz * 0.64 + "px;height:" + sz * 0.6 + "px;border-radius:50%;background:rgba(255,255,255,0.7)"));
};
const peerName = (st) => (chatPeer && chatPeer.name) ? dAbs(st + ";font-style:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis", esc(chatPeer.name)) : "";
const scol = (slot, d) => (skinCnow && normHex(skinCnow[slot])) || d;
const SKINS = {
  angel: {
    slot: "후광", n: "엔젤코어", ink: "#6e5a78", sub: "#a08cb0", rule: "rgba(170,140,190,0.4)",
    layers: ["radial-gradient(90% 55% at 50% 0%, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)",
             "radial-gradient(70% 45% at 100% 100%, rgba(255,210,232,0.75), rgba(255,210,232,0) 70%)"],
    deco: (w, h) =>
      dAbs("inset:10px;border:1px solid rgba(255,255,255,0.95);border-radius:14px") +
      dAbs("inset:14px;border:0.6px solid rgba(190,160,210,0.55);border-radius:11px") +
      dAbs("left:" + (w / 2 - 17) + "px;top:18px;width:34px;height:9px;border:1.4px solid " + scol("deco", "#e6c68a") + ";border-radius:50%;box-shadow:0 0 6px rgba(255,228,168,0.95),inset 0 0 3px rgba(255,228,168,0.8)") +
      dStar(20, 26, 11, "#ffffff", 3) + dStar(w - 32, 34, 7, "#f5c9dd", 2) +
      dStar(w - 34, h - 58, 12, "#ffffff", 3) + dStar(18, h - 44, 6, "#e9d6ff", 2) + dStar(w - 52, h - 30, 5, "#f5c9dd", 0),
    v: { bgGrad: 3, bg: "#fde7f0", bg2: "#efe5fb", bg3: "#e1effd", bgDir: "v", accent: "#df8fb3", bub: "#f6d3e4",
         famKey: "gowun-b", lh: 1.3, ls: 0.01, gap: 16, padX: 40, padY: 50 }
  },
  diary: {
    slot: "테이프", n: "다이어리", ink: "#3a3834", sub: "#8c8577", rule: "rgba(110,150,200,0.45)",
    layers: ["linear-gradient(to right, transparent 27px, rgba(222,104,104,0.55) 27px, rgba(222,104,104,0.55) 28px, transparent 28px)",
             "repeating-linear-gradient(to bottom, transparent 0 21px, rgba(110,150,200,0.26) 21px 22px) 0 12px"],
    deco: (w) =>
      dAbs("left:22px;top:-3px;width:66px;height:19px;transform:rotate(-8deg);opacity:0.85;" +
        "background:repeating-linear-gradient(45deg,rgba(255,255,255,0.4) 0 4px,transparent 4px 8px)," + scol("deco", "#f2b39c") + "") +
      dAbs("left:" + (w - 84) + "px;top:1px;width:62px;height:18px;transform:rotate(7deg);opacity:0.85;" +
        "background:repeating-linear-gradient(90deg,rgba(255,255,255,0.35) 0 3px,transparent 3px 9px),#a8d3c0"),
    v: { bg: "#fffdf6", accent: "#d9826a", bub: "#fbe3d6", famKey: "kyobo21", scale: 1.1, lh: 1.2, gap: 14, padX: 40, padY: 42 }
  },
  terminal: {
    slot: "제목줄", n: "터미널", ink: "#3fdc6a", sub: "#7d8894", rule: "rgba(63,220,106,0.35)",
    layers: ["repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)"],
    deco: (w) =>
      dAbs("left:0;top:0;width:" + w + "px;height:22px;background:" + scol("deco", "#161b22") + ";border-bottom:1px solid #30363d") +
      ["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => dAbs("left:" + (10 + i * 12) + "px;top:7.5px;width:7px;height:7px;border-radius:50%;background:" + c)).join(""),
    v: { bg: "#0d1117", accent: "#58a6ff", bub: "#1b3a26", famKey: "nanum-code", lh: 1.2, gap: 12, padX: 26, padY: 40, tsh: 1, tshC: "#0f5a26" }
  },
  paper: {
    slot: "괘선", n: "신문", ink: "#1d1b16", sub: "#6d675a", rule: "#1d1b16",
    layers: ["repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0 1px, transparent 1px 3px)"],
    deco: (w, h) =>
      dAbs("left:22px;right:22px;top:18px;height:0;border-top:2.5px solid " + scol("deco", "#1d1b16") + "") +
      dAbs("left:22px;right:22px;top:23px;height:0;border-top:0.8px solid " + scol("deco", "#1d1b16") + "") +
      dAbs("left:22px;right:22px;top:" + (h - 20) + "px;height:0;border-top:0.8px solid " + scol("deco", "#1d1b16") + ""),
    v: { bg: "#f3efe4", accent: "#a3342a", bub: "#e6dfcd", famKey: "noto-serif", lh: 1.2, gap: 14, padX: 30, padY: 44, ratio: "3:4" }
  },
  letter: {
    slot: "우표", n: "편지지", ink: "#4a3b2a", sub: "#8a7560", rule: "rgba(138,117,96,0.45)",
    layers: ["repeating-linear-gradient(115deg, rgba(120,90,50,0.035) 0 2px, transparent 2px 6px)"],
    deco: (w, h) => {
      const air = "background:repeating-linear-gradient(45deg,#cf5549 0 7px,transparent 7px 11px,#3b6fb5 11px 18px,transparent 18px 22px)";
      return dAbs("left:0;top:0;width:" + w + "px;height:6px;" + air) + dAbs("left:0;top:" + (h - 6) + "px;width:" + w + "px;height:6px;" + air) +
        dAbs("left:0;top:0;width:6px;height:" + h + "px;" + air) + dAbs("left:" + (w - 6) + "px;top:0;width:6px;height:" + h + "px;" + air) +
        dAbs("left:" + (w - 46) + "px;top:16px;width:28px;height:34px;background:#fbf5e8;outline:1.5px dotted #c9b596;outline-offset:1px",
          dAbs("left:3px;top:3px;right:3px;bottom:3px;background:" + scol("deco", "#b5523f") + "",
            dAbs("left:6px;top:7px;width:10px;height:10px;border-radius:50%;background:#f3d58a")));
    },
    v: { bg: "#eee2ca", accent: "#b5523f", bub: "#f8f1e2", famKey: "nanum-m", lh: 1.25, gap: 15, padX: 34, padY: 56 }
  },
  night: {
    slot: "달·별", n: "별밤", ink: "#f3f0e6", sub: "rgba(243,240,230,0.66)", rule: "rgba(243,213,138,0.4)",
    layers: [],
    deco: (w, h) => {
      const r = seeded(120, 7);
      let st = "";
      for (let i = 0; i < 40; i++) {
        const x = r[i * 3] * w, y = r[i * 3 + 1] * h, z = r[i * 3 + 2], d = z > 0.8 ? 2 : 1.2;
        if (x > w * 0.14 && x < w * 0.86 && y > h * 0.2 && y < h * 0.8) continue;
        st += dAbs("left:" + x.toFixed(1) + "px;top:" + y.toFixed(1) + "px;width:" + d + "px;height:" + d +
          "px;border-radius:50%;background:#fff;opacity:" + (0.35 + z * 0.6).toFixed(2));
      }
      return st + dStar(14, h - 34, 9, scol("deco", "#f3d58a"), 3) +
        dAbs("left:" + (w - 50) + "px;top:18px;width:26px;height:26px;filter:drop-shadow(0 0 5px rgba(243,213,138,0.7))",
          '<svg viewBox="0 0 24 24" width="26" height="26" style="display:block"><path d="M15.5 2.5a9.5 9.5 0 1 0 6 16.9A8 8 0 1 1 15.5 2.5z" fill="' + scol("deco", "#f3d58a") + '"/></svg>');
    },
    v: { bgGrad: 2, bg: "#0b1330", bg2: "#27366e", bgDir: "v", accent: "#f3d58a", bub: "#2c3b73", famKey: "noto-serif", lh: 1.25, gap: 16, padX: 36, padY: 48 }
  },
  y2k: {
    n: "Y2K", ink: "#1b2270", sub: "#5b60a3", rule: "rgba(27,34,112,0.3)",
    layers: ["linear-gradient(rgba(40,50,140,0.08) 1px, transparent 1px) 0 0 / 16px 16px",
             "linear-gradient(90deg, rgba(40,50,140,0.08) 1px, transparent 1px) 0 0 / 16px 16px"],
    deco: (w, h) => {
      const chrome = (x, y, sz, id) => dAbs("left:" + x.toFixed(1) + "px;top:" + y.toFixed(1) + "px;width:" + sz + "px;height:" + sz + "px;filter:drop-shadow(0 1px 2px rgba(27,34,112,0.35))",
        '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" style="display:block"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#b9c2ff"/><stop offset="1" stop-color="#ff9ad0"/></linearGradient></defs>' +
        '<path d="' + STAR4 + '" fill="url(#' + id + ')"/></svg>');
      return chrome(6, 6, 22, "y2ka" + w) + chrome(w - 30, 20, 13, "y2kb" + w) + chrome(w - 28, h - 30, 22, "y2kc" + w) +
        dAbs("left:12px;right:12px;top:12px;bottom:12px;border:1px solid rgba(255,255,255,0.8);border-radius:18px");
    },
    v: { bgGrad: 3, bg: "#dde8ff", bg2: "#c9c8ff", bg3: "#f6d5ff", bgDir: "d", accent: "#ff4fa3", bub: "#ffffff", famKey: "wanted", fw: 1, ls: -0.01, lh: 1.15, gap: 14, padX: 34, padY: 46 }
  },
  game: {
    slot: "테두리", n: "레트로 게임", ink: "#0f380f", sub: "#306230", rule: "rgba(15,56,15,0.4)",
    layers: ["linear-gradient(rgba(15,56,15,0.07) 1px, transparent 1px) 0 0 / 3px 3px",
             "linear-gradient(90deg, rgba(15,56,15,0.07) 1px, transparent 1px) 0 0 / 3px 3px"],
    deco: (w, h) =>
      dAbs("inset:8px;border:4px solid " + scol("deco", "#306230") + "") + dAbs("inset:15px;border:1px solid rgba(15,56,15,0.5)") +
      [[8, 8], [w - 16, 8], [8, h - 16], [w - 16, h - 16]].map(q => dAbs("left:" + q[0] + "px;top:" + q[1] + "px;width:8px;height:8px;background:" + scol("deco", "#0f380f") + "")).join(""),
    v: { bg: "#9bbc0f", accent: "#306230", bub: "#8bac0f", famKey: "dohyeon", lh: 1.15, gap: 13, padX: 34, padY: 40 }
  }
};
const zigzag = (w, y, up, fill) => {
  let d = "M0 " + (up ? 6 : 0);
  for (let x = 0; x <= w + 8; x += 8) d += " L" + (x + 4) + " " + (up ? 0 : 6) + " L" + (x + 8) + " " + (up ? 6 : 0);
  d += " L" + (w + 8) + " " + (up ? 7 : -1) + " L0 " + (up ? 7 : -1) + "Z";
  return dAbs("left:0;top:" + y + "px;width:" + w + "px;height:6px",
    '<svg width="' + w + '" height="6" viewBox="0 0 ' + w + ' 6" style="display:block;overflow:hidden"><path d="' + d + '" fill="' + fill + '"/></svg>');
};
Object.assign(SKINS, {
  simple: {
    slot: "점·선", n: "심플", ink: "#1a1a1a", sub: "#9a9a98", rule: "#e2e2e0",
    layers: [],
    deco: (w, h) => dAbs("left:26px;top:26px;width:7px;height:7px;background:" + scol("deco", "#1a1a1a") + "") +
      dAbs("left:26px;right:26px;top:" + (h - 26) + "px;height:0;border-top:1px solid " + scol("deco", "#e2e2e0") + ""),
    v: { bg: "#ffffff", accent: "#1a1a1a", bub: "#f1f1ef", famKey: "pretendard", lh: 1.2, gap: 14, padX: 32, padY: 46 }
  },
  minimal: {
    slot: "선", n: "미니멀", ink: "#2b2b2b", sub: "#a3a19b", rule: "#dcdad4",
    layers: [],
    deco: (w, h) => dAbs("left:" + (w / 2 - 10) + "px;top:" + (h - 34) + "px;width:20px;height:0;border-top:0.8px solid " + scol("deco", "#a3a19b") + ""),
    v: { bg: "#f5f4f0", accent: "#a3a19b", bub: "#ebe9e3", famKey: "noto-serif", scale: 0.92, ls: 0.02, lh: 1.35, gap: 18, padX: 52, padY: 70 }
  },
  magazine: {
    slot: "빨간 표지", n: "매거진", ink: "#111111", sub: "#6a6a68", rule: "#111111",
    layers: [],
    deco: (w, h) =>
      dAbs("left:0;top:0;width:" + w + "px;height:6px;background:#111") +
      dAbs("left:24px;top:24px;width:26px;height:6px;background:" + scol("deco", "#e0301e") + "") +
      dAbs("left:24px;right:24px;top:" + (h - 24) + "px;height:0;border-top:0.8px solid #111") +
      dAbs("left:" + (w - 30) + "px;top:" + (h - 27) + "px;width:6px;height:6px;background:#111"),
    v: { bg: "#ffffff", accent: "#e0301e", bub: "#f1f1ef", famKey: "hahmlet", fw: 1, ls: -0.01, lh: 1.2, gap: 14, padX: 26, padY: 44 }
  },
  swiss: {
    slot: "원", n: "스위스", ink: "#111111", sub: "#5c5c5a", rule: "#111111",
    layers: [],
    deco: (w, h) =>
      dAbs("left:" + (w - 62) + "px;top:-42px;width:96px;height:96px;border-radius:50%;background:" + scol("deco", "#e3000f") + "") +
      dAbs("left:18px;top:0;width:0;height:" + h + "px;border-left:1px solid #111"),
    v: { bg: "#efeee8", accent: "#e3000f", bub: "#ffffff", famKey: "pretendard", fw: 1, ls: -0.02, lh: 1.1, gap: 12, padX: 30, padY: 62 }
  },
  brutal: {
    slot: "테두리", n: "브루탈리즘", ink: "#111111", sub: "#333333", rule: "#111111",
    layers: [],
    deco: (w, h) =>
      dAbs("left:14px;top:14px;width:" + (w - 36) + "px;height:" + (h - 36) + "px;background:#ffffff;border:3px solid " + scol("deco", "#111") + ";box-shadow:8px 8px 0 " + scol("deco", "#111") + ""),
    v: { bg: "#ffe45c", accent: "#ff3b30", bub: "#ffe45c", famKey: "plex", fw: 1, ls: -0.01, lh: 1.15, gap: 12, padX: 34, padY: 38 }
  },
  oldbook: {
    slot: "테두리", n: "고서", ink: "#3d2b17", sub: "#7d6446", rule: "rgba(61,43,23,0.45)",
    layers: ["radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(90,60,20,0.28) 100%)"],
    deco: (w, h) =>
      dAbs("inset:14px;border:1px solid " + scol("deco", "rgba(61,43,23,0.55)") + "") + dAbs("inset:18px;border:0.6px solid " + scol("deco", "rgba(61,43,23,0.4)") + "") +
      dAbs("left:" + (w / 2 - 4) + "px;top:10px;width:8px;height:8px;background:#e9dcc0;border:1px solid " + scol("deco", "rgba(61,43,23,0.6)") + ";transform:rotate(45deg)") +
      dAbs("left:" + (w / 2 - 4) + "px;top:" + (h - 18) + "px;width:8px;height:8px;background:#e9dcc0;border:1px solid " + scol("deco", "rgba(61,43,23,0.6)") + ";transform:rotate(45deg)"),
    v: { bg: "#e9dcc0", accent: "#8b2e1a", bub: "#f3ead6", famKey: "song", lh: 1.3, gap: 15, padX: 38, padY: 48 }
  },
  sticky: {
    n: "포스트잇", ink: "#333026", sub: "#7a7560", rule: "rgba(51,48,38,0.3)",
    layers: ["linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0) 26px)",
             "linear-gradient(315deg, rgba(0,0,0,0.12) 0, rgba(0,0,0,0.04) 18px, rgba(0,0,0,0) 34px)"],
    deco: (w) => dAbs("left:" + (w / 2 - 34) + "px;top:-4px;width:68px;height:20px;transform:rotate(-2deg);background:rgba(255,255,255,0.55);box-shadow:0 1px 2px rgba(0,0,0,0.08)"),
    v: { bg: "#fff29a", accent: "#e0703a", bub: "#fffbd6", famKey: "ownpdh", scale: 1.15, lh: 1.15, gap: 12, padX: 32, padY: 42 }
  },
  receipt: {
    n: "영수증", ink: "#2a2a2a", sub: "#8a8a88", rule: "#2a2a2a",
    layers: [],
    deco: (w, h) =>
      dAbs("left:20px;top:20px;width:" + (w - 40) + "px;height:" + (h - 40) + "px;background:#fffefa;box-shadow:0 1px 3px rgba(0,0,0,0.08)") +
      dAbs("left:20px;top:14px;width:" + (w - 40) + "px;height:6px", zigzag(w - 40, 0, true, "#fffefa")) +
      dAbs("left:20px;top:" + (h - 20) + "px;width:" + (w - 40) + "px;height:6px", zigzag(w - 40, 0, false, "#fffefa")) +
      dAbs("left:34px;right:34px;top:36px;height:0;border-top:1px dashed #9a9a98") +
      dAbs("left:34px;right:34px;top:" + (h - 36) + "px;height:0;border-top:1px dashed #9a9a98"),
    v: { bg: "#e5e3de", accent: "#2a2a2a", bub: "#f1f1ef", famKey: "nanum-code", lh: 1.2, gap: 12, padX: 38, padY: 48 }
  },
  neon: {
    slot: "네온 관", n: "네온", ink: "#ffffff", sub: "rgba(255,255,255,0.72)", rule: "rgba(47,243,255,0.6)",
    layers: ["radial-gradient(80% 50% at 50% 100%, rgba(255,47,180,0.22), rgba(255,47,180,0) 70%)"],
    deco: () =>
      dAbs("inset:14px;border:2px solid " + scol("deco", "#ff2fb4") + ";border-radius:16px;box-shadow:0 0 8px #ff2fb4,inset 0 0 8px rgba(255,47,180,0.6)") +
      dAbs("left:30px;top:24px;width:28px;height:0;border-top:2px solid #2ff3ff;border-radius:2px;box-shadow:0 0 6px #2ff3ff"),
    v: { bg: "#0b0a14", accent: "#2ff3ff", bub: "#2a1233", famKey: "jua", lh: 1.2, gap: 14, padX: 34, padY: 46, tsh: 2, tshC: "#ff2fb4" }
  },
  film: {
    n: "필름", ink: "#f1efe6", sub: "rgba(241,239,230,0.62)", rule: "rgba(233,180,76,0.5)",
    layers: [],
    deco: (w, h) => {
      let holes = "";
      for (let y = 8; y < h - 8; y += 18) {
        holes += dAbs("left:6px;top:" + y + "px;width:9px;height:11px;border-radius:2px;background:#d9d4c7") +
          dAbs("left:" + (w - 15) + "px;top:" + y + "px;width:9px;height:11px;border-radius:2px;background:#d9d4c7");
      }
      return dAbs("left:0;top:0;width:21px;height:" + h + "px;background:#050505") +
        dAbs("left:" + (w - 21) + "px;top:0;width:21px;height:" + h + "px;background:#050505") + holes;
    },
    v: { bg: "#1a1917", accent: "#e9b44c", bub: "#2c2a26", famKey: "noto-sans", lh: 1.25, gap: 15, padX: 38, padY: 40 }
  },
  blueprint: {
    slot: "재단선", n: "청사진", ink: "#ffffff", sub: "rgba(255,255,255,0.72)", rule: "rgba(255,255,255,0.45)",
    layers: ["linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px) 0 0 / 60px 60px",
             "linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px) 0 0 / 60px 60px",
             "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px) 0 0 / 12px 12px",
             "linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px) 0 0 / 12px 12px"],
    deco: (w, h) => {
      const L = (x, y, sx, sy) => dAbs("left:" + x + "px;top:" + y + "px;width:14px;height:14px;" +
        "border-" + (sy > 0 ? "top" : "bottom") + ":1.5px solid " + scol("deco", "#fff") + ";border-" + (sx > 0 ? "left" : "right") + ":1.5px solid " + scol("deco", "#fff") + "");
      return L(12, 12, 1, 1) + L(w - 26, 12, -1, 1) + L(12, h - 26, 1, -1) + L(w - 26, h - 26, -1, -1);
    },
    v: { bg: "#1d4f8f", accent: "#bfe0ff", bub: "#2a63a8", famKey: "plex", lh: 1.2, gap: 13, padX: 34, padY: 42 }
  },
  chalk: {
    slot: "나무틀", n: "칠판", ink: "#f4f1e8", sub: "rgba(244,241,232,0.7)", rule: "rgba(244,241,232,0.4)",
    layers: ["radial-gradient(60% 40% at 30% 30%, rgba(255,255,255,0.07), rgba(255,255,255,0) 70%)",
             "radial-gradient(50% 35% at 75% 75%, rgba(255,255,255,0.05), rgba(255,255,255,0) 70%)"],
    deco: (w, h) =>
      dAbs("inset:0;border:9px solid " + scol("deco", "#7a4e2a") + ";box-shadow:inset 0 0 0 1px rgba(0,0,0,0.35),inset 0 2px 6px rgba(0,0,0,0.35)") +
      dAbs("left:" + (w - 70) + "px;top:" + (h - 16) + "px;width:28px;height:5px;border-radius:2px;background:#f4f1e8;opacity:0.9"),
    v: { bg: "#2f3d34", accent: "#f7d774", bub: "#3c4c42", famKey: "pen", scale: 1.25, lh: 1.1, gap: 12, padX: 32, padY: 40 }
  }
});
const GRAIN = (() => {
  try {
    const n = 96, cv = document.createElement("canvas"); cv.width = cv.height = n;
    const x = cv.getContext("2d"), d = x.createImageData(n, n), r = seeded(n * n, 11);
    for (let i = 0; i < n * n; i++) {
      const v = r[i] > 0.5 ? 255 : 0;
      d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = Math.round(Math.abs(r[i] - 0.5) * 34);
    }
    x.putImageData(d, 0, 0);
    return "url(" + cv.toDataURL() + ") 0 0 / 96px 96px";
  } catch (e) { return ""; }
})();
function bleedLines(x0, y0, wd, rows, lineH, color, seed) {
  const r = seeded(rows * 8, seed);
  let out = "";
  for (let i = 0; i < rows; i++) {
    let x = x0 + (i === 0 ? wd * 0.1 : 0);
    const end = x0 + wd * (i === rows - 1 ? 0.45 : 0.85 + r[i * 8] * 0.15);
    for (let k = 1; k < 8 && x < end; k++) {
      const ww = Math.min(end - x, 12 + r[i * 8 + k] * 30);
      out += dAbs("left:" + x.toFixed(1) + "px;top:" + (y0 + i * lineH).toFixed(1) + "px;width:" + ww.toFixed(1) + "px;height:4px;border-radius:2px;background:" + color + ";box-shadow:0 0 3px 1px " + color);
      x += ww + 5;
    }
  }
  return out;
}
Object.assign(SKINS, {
  page: {
    slot: "비침", n: "책 종이", ink: "#1f1e1c", sub: "#77746e", rule: "rgba(31,30,28,0.25)",
    layers: [GRAIN, "linear-gradient(90deg, rgba(0,0,0,0) 90%, rgba(0,0,0,0.07))",
             "radial-gradient(90% 80% at 40% 42%, rgba(255,255,255,0.35), rgba(255,255,255,0) 75%)"].filter(Boolean),
    deco: (w, h) => {
      const c = rgba(scol("deco", "#000000"), 0.028);
      return bleedLines(w * 0.18, h * 0.07, w * 0.64, 4, 16, c, 3) + bleedLines(w * 0.14, h * 0.7, w * 0.7, 4, 16, c, 5);
    },
    v: { bg: "#e4e1db", accent: "#6d6a64", bub: "#d8d4cc", famKey: "nanum-m", ls: 0.04, lh: 1.3, gap: 16, padX: 40, padY: 48, ratio: "1:1" }
  },
  monitor: {
    slot: "모니터 테", n: "모니터", ink: "#2a2c2f", sub: "#666a70", rule: "rgba(42,44,47,0.3)",
    layers: ["repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 3px)",
             "repeating-linear-gradient(90deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 3px)",
             "radial-gradient(120% 90% at 30% 55%, rgba(255,255,255,0.28), rgba(255,255,255,0) 80%)"],
    deco: (w) => dAbs("left:" + Math.round(w * 0.08) + "px;top:-16px;width:" + w + "px;height:34px;border-radius:12px;background:" + scol("deco", "#1a1b1d")),
    stage: "fx-caret",
    v: { bg: "#c9ccce", accent: "#55595e", bub: "#bfc3c6", famKey: "noto-sans", ls: 0.02, lh: 1.15, gap: 12, padX: 26, padY: 52, ratio: "1:1" }
  },
  ghost: {
    n: "잔상 글씨", ink: "#f2f2f2", sub: "rgba(242,242,242,0.7)", rule: "rgba(242,242,242,0.3)",
    layers: [],
    deco: () => "",
    tfx: ";text-shadow:2.4px 0 1.6px rgba(255,255,255,0.42),-2.4px 0 1.6px rgba(255,255,255,0.32),0 0 4px rgba(255,255,255,0.3)",
    v: { bg: "#000000", accent: "#bdbdbd", bub: "#1c1c1c", famKey: "noto-sans", ls: 0.12, lh: 1.15, gap: 14, padX: 30, padY: 40, ratio: "1:1" }
  }
});
Object.assign(SKINS, {
  ebook: {
    n: "전자책 선택", ink: "#151515", sub: "#8a8a88", rule: "#e5e5e5",
    layers: [],
    deco: () => "",
    stage: "fx-select",
    v: { bg: "#ffffff", accent: "#5b82e6", bub: "#f1f1ef", famKey: "noto-sans", ls: -0.01, lh: 1.45, gap: 10, padX: 20, padY: 30, ratio: "1:1" }
  },
  trsheet: {
    n: "번역 시트", ink: "#1a1a1a", sub: "#6c6c70", rule: "#e3e3e7",
    layers: [],
    deco: () => "",
    stage: "fx-select fx-sheet",
    v: { bg: "#e9e9ec", accent: "#2f7de0", bub: "#ffffff", famKey: "noto-sans", ls: 0, lh: 1.2, gap: 8, padX: 18, padY: 16, ratio: "1:1" }
  }
});
const SKIN_ORDER = ["simple", "minimal", "magazine", "swiss", "brutal", "paper", "page", "oldbook", "letter", "diary", "sticky", "receipt", "monitor", "ebook", "trsheet",
  "angel", "y2k", "night", "neon", "film", "ghost", "terminal", "blueprint", "chalk", "game"];
const chatBar = (w, bg, line, icon) =>
  dAbs("left:0;top:0;width:" + w + "px;height:36px;background:" + bg + (line ? ";border-bottom:0.8px solid " + line : "")) +
  dAbs("left:10px;top:9px;width:18px;height:18px", '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="' + icon + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M15 5l-7 7 7 7"/></svg>') +
  dAbs("left:" + (w - 52) + "px;top:10px;width:16px;height:16px", '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="' + icon + '" stroke-width="2.2" stroke-linecap="round" style="display:block"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>') +
  dAbs("left:" + (w - 28) + "px;top:10px;width:16px;height:16px", '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="' + icon + '" stroke-width="2.2" stroke-linecap="round" style="display:block"><path d="M4 7h16M4 12h16M4 17h16"/></svg>');
const ARROW_UP = (c, sz) => '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" fill="none" stroke="' + c + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
const PLUS = (c, sz) => '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" fill="none" stroke="' + c + '" stroke-width="2.4" stroke-linecap="round" style="display:block"><path d="M12 5v14M5 12h14"/></svg>';
const chatInput = (w, h, bg, pill, line, send, o) => {
  o = o || {};
  const top = h - 36, px = o.plus ? 36 : 12, pw = w - px - 40;
  return dAbs("left:0;top:" + top + "px;width:" + w + "px;height:36px;background:" + bg + (line ? ";border-top:0.8px solid " + line : "")) +
    (o.plus ? dAbs("left:10px;top:" + (top + 8) + "px;width:20px;height:20px;border-radius:50%;background:" + (o.plusBg || "rgba(120,120,128,0.16)") + ";display:flex;align-items:center;justify-content:center", PLUS(o.plus, 12)) : "") +
    dAbs("left:" + px + "px;top:" + (top + 7) + "px;width:" + pw + "px;height:22px;border-radius:11px;background:" + pill + (line ? ";box-shadow:inset 0 0 0 0.8px " + line : "") +
      ";display:flex;align-items:center;padding-left:9px;box-sizing:border-box;font-style:normal;font-size:7.5px;color:" + (o.phc || "#8e8e93"), esc(o.ph || "")) +
    dAbs("left:" + (w - 32) + "px;top:" + (top + 7) + "px;width:22px;height:22px;border-radius:" + (send.sq ? "6px" : "50%") + ";background:" + send.c +
      ";display:flex;align-items:center;justify-content:center", ARROW_UP(send.fg || "#ffffff", 12));
};
Object.assign(SKINS, {
  kakao: {
    n: "카카오톡", slot: "내 말풍선", sns: 1, ink: "#111111", sub: "#4f5f70", rule: "rgba(0,0,0,0.15)",
    chat: { l: "#ffffff", lc: "#111111", r: "#fee500", rc: "#111111", rl: "3px 12px 12px 12px", rr: "12px 3px 12px 12px", tail: "first", cg: 4, face: "38%", name: "#3e4a57", sys: { bg: "rgba(0,0,0,0.13)", fg: "#ffffff" } },
    layers: [],
    deco: (w, h) => chatBar(w, "#a9c1d6", "", "#2b3a48") + chatInput(w, h, "#ffffff", "#f3f3f3", "", { c: scol("deco", "#fee500"), sq: 1, fg: "#3c1e1e" }, { plus: "#555555", plusBg: "transparent", ph: "메시지 입력" }),
    v: { bg: "#bacee0", accent: "#4f5f70", bub: "#fee500", famKey: "pretendard", lh: 1.15, gap: 8, padX: 16, padY: 50, bubW: 72 }
  },
  line: {
    n: "라인", slot: "내 말풍선", sns: 1, ink: "#111111", sub: "#e9eef7", rule: "rgba(255,255,255,0.35)",
    chat: { l: "#ffffff", lc: "#111111", r: "#8de26d", rc: "#111111", rl: "4px 16px 16px 16px", rr: "16px 4px 16px 16px", tail: "first", cg: 4, face: "50%", name: "#f4f7fb", sys: { bg: "rgba(0,0,0,0.16)", fg: "#ffffff" } },
    layers: [],
    deco: (w, h) => chatBar(w, "#f7f8fa", "#dfe3e8", "#2d3440") + chatInput(w, h, "#ffffff", "#f1f2f4", "#e2e5e9", { c: scol("deco", "#06c755") }, { plus: "#2d3440", plusBg: "transparent", ph: "메시지 입력" }),
    v: { bg: "#8ea9d0", accent: "#e9eef7", bub: "#8de26d", famKey: "pretendard", lh: 1.15, gap: 8, padX: 16, padY: 50, bubW: 72 }
  },
  imessage: {
    n: "iOS 메시지", slot: "내 말풍선", sns: 1, ink: "#000000", sub: "#8e8e93", rule: "#e5e5ea",
    chat: { l: "#e9e9eb", lc: "#000000", r: "#0a84ff", rc: "#ffffff", rl: "18px 18px 18px 4px", rr: "18px 18px 4px 18px", tail: "last", faceAt: "last", face: "50%", name: "#8e8e93", tm: "under" },
    layers: [],
    deco: (w, h) => chatBar(w, "#f6f6f6", "#d8d8dc", scol("deco", "#0a84ff")) +
      peerFace(w / 2 - 9, 3, 18, "#c7c7cc") +
      peerName("left:" + (w / 2 - 50) + "px;top:23px;width:100px;text-align:center;font-size:6px;line-height:1;color:#111") +
      chatInput(w, h, "#ffffff", "#ffffff", "#d1d1d6", { c: scol("deco", "#0a84ff") }, { plus: "#8e8e93", ph: "iMessage", phc: "#c7c7cc" }),
    v: { bg: "#ffffff", accent: "#8e8e93", bub: "#0a84ff", famKey: "pretendard", lh: 1.15, gap: 6, padX: 14, padY: 50, bubW: 72 }
  },
  instagram: {
    n: "인스타그램", slot: "내 말풍선", sns: 1, ink: "#000000", sub: "#737373", rule: "#dbdbdb",
    chat: { l: "#efefef", lc: "#000000", r: "linear-gradient(135deg,#a334fa 0%,#5b6cff 55%,#3797f0 100%)", rc: "#ffffff", rl: "22px", rr: "22px", tail: "grp", faceAt: "last", face: "50%", name: "#737373", tm: "under" },
    layers: [],
    deco: (w, h) => chatBar(w, "#ffffff", "#dbdbdb", "#000000") +
      dAbs("left:33px;top:6px;width:24px;height:24px;border-radius:50%;background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",
        dAbs("left:1.5px;top:1.5px;width:21px;height:21px;border-radius:50%;background:#fff", peerFace(1.5, 1.5, 18, "#dbdbdb"))) +
      peerName("left:62px;top:12px;width:" + (w - 130) + "px;font-size:8px;font-weight:600;line-height:1.3;color:#000") +
      chatInput(w, h, "#ffffff", "#efefef", "", { c: "#3797f0" }, { plus: "#ffffff", plusBg: "#3797f0", ph: "메시지 보내기...", phc: "#737373" }),
    v: { bg: "#ffffff", accent: "#737373", bub: "#5b6cff", famKey: "pretendard", lh: 1.15, gap: 6, padX: 14, padY: 50, bubW: 72 }
  },
  twitter: {
    n: "트위터(X)", slot: "내 말풍선", sns: 1, ink: "#e7e9ea", sub: "#71767b", rule: "#2f3336",
    chat: { l: "#2f3336", lc: "#e7e9ea", r: "#1d9bf0", rc: "#ffffff", rl: "20px 20px 20px 4px", rr: "20px 20px 4px 20px", tail: "last", faceAt: "last", face: "50%", name: "#71767b", tm: "under" },
    layers: [],
    deco: (w, h) => chatBar(w, "#000000", "#2f3336", "#e7e9ea") + chatInput(w, h, "#000000", "#202327", "#2f3336", { c: scol("deco", "#1d9bf0") }, { ph: "메시지를 작성하세요", phc: "#71767b" }),
    v: { bg: "#000000", accent: "#1d9bf0", bub: "#1d9bf0", famKey: "pretendard", lh: 1.15, gap: 6, padX: 14, padY: 50, bubW: 72 }
  },
  tiktok: {
    n: "틱톡", slot: "내 말풍선", sns: 1, ink: "#ffffff", sub: "#a1a1a1", rule: "#2b2b2b",
    chat: { l: "#2b2b2b", lc: "#ffffff", r: "#fe2c55", rc: "#ffffff", rl: "16px", rr: "16px", tail: "grp", faceAt: "last", face: "50%", name: "#a1a1a1", tm: "under" },
    layers: [],
    deco: (w, h) => chatBar(w, "#121212", "#262626", "#ffffff") +
      dAbs("left:" + (w / 2 - 12) + "px;top:15px;width:10px;height:4px;border-radius:2px;background:#25f4ee") +
      dAbs("left:" + (w / 2 + 2) + "px;top:15px;width:10px;height:4px;border-radius:2px;background:#fe2c55") +
      chatInput(w, h, "#121212", "#262626", "", { c: scol("deco", "#fe2c55") }, { ph: "메시지 보내기...", phc: "#8a8a8a" }),
    v: { bg: "#121212", accent: "#25f4ee", bub: "#fe2c55", famKey: "pretendard", lh: 1.15, gap: 6, padX: 14, padY: 50, bubW: 72 }
  },
  discord: {
    n: "디스코드", slot: "이름", sns: 1, ink: "#dbdee1", sub: "#949ba4", rule: "#3f4147",
    chat: { flat: 1, lc: "#dbdee1", rc: "#dbdee1", face: "50%", name: "#f2f3f5", tm: "name" },
    layers: [],
    deco: (w, h) => dAbs("left:0;top:0;width:" + w + "px;height:36px;background:#313338;border-bottom:0.8px solid #26282c") +
      dAbs("left:12px;top:10px;width:16px;height:16px", '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#80848e" stroke-width="2.2" stroke-linecap="round" style="display:block"><path d="M9 4L7 20M17 4l-2 16M4 9h17M3 15h17"/></svg>') +
      dAbs("left:12px;top:" + (h - 34) + "px;width:" + (w - 24) + "px;height:26px;border-radius:8px;background:#383a40"),
    v: { bg: "#313338", accent: "#949ba4", bub: "#313338", famKey: "pretendard", lh: 1.25, gap: 10, padX: 16, padY: 50, bubW: 90 }
  }
});
const chatOf = () => { const sk = SKINS[S.skin]; return sk && sk.chat ? sk.chat : null; };
const SKIN_KEYS = SKIN_ORDER.filter(k => SKINS[k]).concat(Object.keys(SKINS).filter(k => SKIN_ORDER.indexOf(k) < 0 && !SKINS[k].sns));
function skinRows(list) {
  const half = Math.ceil(list.length / 2), out = [];
  for (let i = 0; i < half; i++) { out.push(list[i]); if (list[half + i] !== undefined) out.push(list[half + i]); }
  return out;
}
const SKIN_PRESETS = Object.keys(SKINS).map(k => biPreset("sk-" + k, SKINS[k].n, Object.assign({ skin: k }, SKINS[k].v)));
const FRAMES = {
  line:    { n: "선",     d: (w, h, c) => dAbs("inset:12px;border:1.5px solid " + c) },
  double:  { n: "이중선", d: (w, h, c) => dAbs("inset:10px;border:1px solid " + c) + dAbs("inset:14px;border:1px solid " + c) },
  round:   { n: "둥근",   d: (w, h, c) => dAbs("inset:12px;border:1.5px solid " + c + ";border-radius:14px") },
  dash:    { n: "점선",   d: (w, h, c) => dAbs("inset:12px;border:1.5px dashed " + c) },
  corner:  { n: "모서리", d: (w, h, c) => [[12, 12, "top", "left"], [w - 30, 12, "top", "right"], [12, h - 30, "bottom", "left"], [w - 30, h - 30, "bottom", "right"]]
    .map(q => dAbs("left:" + q[0] + "px;top:" + q[1] + "px;width:18px;height:18px;border-" + q[2] + ":2px solid " + c + ";border-" + q[3] + ":2px solid " + c)).join("") },
  top:     { n: "윗띠",   d: (w, h, c) => dAbs("left:0;top:0;width:" + w + "px;height:8px;background:" + c) },
  side:    { n: "옆띠",   d: (w, h, c) => dAbs("left:0;top:0;width:8px;height:" + h + "px;background:" + c) },
  thick:   { n: "굵은 테", d: (w, h, c) => dAbs("inset:0;border:10px solid " + c) }
};
const FRAME_KEYS = Object.keys(FRAMES);
function skinPaint(v, base) {
  const sk = SKINS[(v || S).skin];
  return sk && sk.layers.length ? sk.layers.join(",") + "," + base : base;
}

let pseq = 0;
const newPid = () => "p" + (++pseq);
const presetById = (id) =>
  BUILTIN_PRESETS.find(x => x.id === id) || SKIN_PRESETS.find(x => x.id === id) || (S.presets || []).find(x => x.id === id) || null;

function savePresets(list) {
  try { localStorage.setItem(PRESET_STORE, JSON.stringify(list)); } catch (e) {}
}
function loadPresets() {
  let raw = null, named = true;
  try { raw = JSON.parse(localStorage.getItem(PRESET_STORE) || "null"); } catch (e) {}
  if (!Array.isArray(raw)) {
    named = false;
    try { raw = JSON.parse(localStorage.getItem("excerpt-presets-v1") || "null"); } catch (e) {}
  }
  if (!Array.isArray(raw)) return [];
  const list = raw.filter(Boolean).map((p, i) => ({
    id: (named && p.id) || "p" + (i + 1),
    name: String((named && p.name) || "프리셋 " + (i + 1)).trim().slice(0, PNAME_MAX) || "프리셋 " + (i + 1),
    v: pickPreset(named ? p.v : p),
    bs: named ? cleanBS(p.bs) : undefined,
    side: named ? cleanSideP(p.side) : undefined
  })).filter(p => Object.keys(p.v).length).slice(0, PRESET_MAX);
  pseq = list.reduce((m, p) => Math.max(m, parseInt(String(p.id).replace(/\D/g, ""), 10) || 0), 0);
  if (!named) savePresets(list);
  return list;
}

const THEME_STORE = "excerpt-lasttheme-v1";
const CAST_STORE = "excerpt-castcolor-v1";
const CAST_MAX = 80;
const QSTYLE_STORE = "excerpt-qstyle-v1";
function pickTheme(src) {
  const v = pickPreset(src);
  v.fontCat = src.fontCat;
  if (src.info) v.info = Object.assign({}, src.info, { dateText: "", scene: "" });
  return v;
}
const themeIsDefault = (v) => JSON.stringify(pickTheme(S0)) === JSON.stringify(Object.assign(pickTheme(S0), v));
function loadLastTheme() {
  let v = null;
  try { v = JSON.parse(localStorage.getItem(THEME_STORE) || "null"); } catch (e) {}
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const out = pickPreset(v);
  if (typeof v.fontCat === "string") out.fontCat = v.fontCat;
  if (v.info && typeof v.info === "object") out.info = Object.assign({}, S0.info, v.info, { dateText: "", scene: "" });
  return out;
}
let lastThemeJSON = "";
function saveLastTheme() {
  try {
    const bt = String(S.tplId || "");
    const base = /^t-(last|p-)/.test(bt) ? "" : bt;
    if (base && base !== localStorage.getItem(LASTTPL_STORE)) localStorage.setItem(LASTTPL_STORE, base);
  } catch (e) {}
  const v = pickTheme(S);
  v.bgImage = false;
  const j = JSON.stringify(v);
  if (j === lastThemeJSON) return;
  lastThemeJSON = j;
  try {
    if (themeIsDefault(v)) localStorage.removeItem(THEME_STORE);
    else localStorage.setItem(THEME_STORE, j);
  } catch (e) {}
}
function loadCastColor() {
  let v = null;
  try { v = JSON.parse(localStorage.getItem(CAST_STORE) || "null"); } catch (e) {}
  const out = {};
  if (v && typeof v === "object" && !Array.isArray(v)) {
    Object.keys(v).slice(0, CAST_MAX).forEach(n => { const h = normHex(v[n]); if (h && n.length <= 40) out[n] = h; });
  }
  return out;
}
let lastCastJSON = "";
function saveCastColor() {
  const cc = S.castColor || {};
  const names = Object.keys(cc);
  const v = {};
  names.slice(Math.max(0, names.length - CAST_MAX)).forEach(n => { v[n] = cc[n]; });
  const j = JSON.stringify(v);
  if (j === lastCastJSON) return;
  lastCastJSON = j;
  try {
    if (names.length) localStorage.setItem(CAST_STORE, j); else localStorage.removeItem(CAST_STORE);
  } catch (e) {}
}

const PCODE_HEAD = "EXC1:";
const PCODE_ENUM = {
  flow: ["pages", "fit", "columns"],
  vpos: ["", "top", "center", "bottom"],
  hpos: ["left", "center", "right"],
  wordBreak: ["keep-all", "normal"],
  bgDir: ["v", "h", "d"],
  dlgName: ["label", "inline"],
  capSt: ["shadow", "outline", "box", "yellow"],
  lbox: ["", "239", "276"],
  capPos: ["bottom", "top"],
  artBg: ["", "blur"],
  biItal: ["auto", "always", "none"],
  biMain: ["orig", "trans"]
};
function b64uEnc(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64uDec(s) {
  const b = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b + "===".slice((b.length + 3) % 4));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}
function presetCode(p) {
  const o = { n: p.name, v: pickPreset(p.v) };
  if (p.bs) o.bs = p.bs;
  if (p.side) o.side = p.side;
  return PCODE_HEAD + b64uEnc(JSON.stringify(o));
}
function cleanPVal(k, x) {
  const d = S0[k];
  if (k === "pfxT") {
    if (!x || typeof x !== "object" || Array.isArray(x)) return undefined;
    const o = {};
    PFX_CTL.forEach(c => { if (typeof x[c.k] === "number" && isFinite(x[c.k])) o[c.k] = Math.max(c.lim[0], Math.min(c.lim[1], Math.round(x[c.k]))); });
    if (typeof x.desk === "string" && normHex(x.desk)) o.desk = normHex(x.desk);
    return o;
  }
  if (k === "skinC") {
    if (!x || typeof x !== "object" || Array.isArray(x)) return undefined;
    const o = {};
    ["ink", "deco"].forEach(q => { if (typeof x[q] === "string" && normHex(x[q])) o[q] = normHex(x[q]); });
    return o;
  }
  if (k === "autoMinH") return x === null ? null : (typeof x === "number" && isFinite(x) ? Math.max(AUTO_MIN, Math.min(2000, Math.round(x))) : undefined);
  if (d === null) return x === null ? null : (typeof x === "number" && isFinite(x) ? Math.max(0, Math.min(400, x)) : undefined);
  if (typeof d === "boolean") return typeof x === "boolean" ? x : undefined;
  if (typeof d === "number") {
    if (typeof x !== "number" || !isFinite(x)) return undefined;
    return Math.max(-2000, Math.min(2000, x));
  }
  if (typeof d !== "string" || typeof x !== "string" || x.length > 40) return undefined;
  if (k === "ratio") return x === "auto" || (typeof x === "string" && x !== "2.39" && ratioWH(x)) ? x : undefined;
  if (PCODE_ENUM[k]) return PCODE_ENUM[k].indexOf(x) >= 0 ? x : undefined;
  if (k === "dlgBarK") return DLGBARS.some(b => b.k === x) ? x : undefined;
  if (k === "skin") return x === "" || SKINS[x] ? x : undefined;
  if (k === "frame") return x === "" || FRAMES[x] ? x : undefined;
  if (k === "pfx") return x === "" || PFX[x] ? x : undefined;
  if (k === "frameC" && x === "") return x;
  if (k === "famKey") return FONT_BY[FONT_LEGACY[x] || x] ? x : undefined;
  if (k === "tshC" && x === "auto") return x;
  if ((k === "quoteC" || k === "parenC") && x === "") return x;
  return /^#[0-9a-f]{3,8}$/i.test(x) && normHex(x) ? normHex(x) : undefined;
}
function readPresetCode(code) {
  const m = String(code || "").replace(/\s+/g, "").match(/EXC1:([A-Za-z0-9_-]+)/);
  if (!m || m[1].length > 16000) return null;
  let o = null;
  try { o = JSON.parse(b64uDec(m[1])); } catch (e) { return null; }
  if (!o || typeof o !== "object" || !o.v || typeof o.v !== "object" || Array.isArray(o.v)) return null;
  const v = {};
  PRESET_KEYS.forEach(k => {
    if (!Object.prototype.hasOwnProperty.call(o.v, k)) return;
    const c = cleanPVal(k, o.v[k]);
    if (c !== undefined) v[k] = c;
  });
  if (!Object.keys(v).length) return null;
  const name = String(typeof o.n === "string" ? o.n : "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, PNAME_MAX);
  const r = { name: name, v: v };
  const bs = cleanBS(o.bs), sd = cleanSideP(o.side);
  if (bs) r.bs = bs;
  if (sd) r.side = sd;
  return r;
}

let txt = {
  "b2:0": "밤의 편의점",
  "b1:0": "서른한 번째 여름 · 미주",
  "b4:0": "새벽 두 시의 편의점은 세상에서 가장 정직한 자리다.",
  "b7:0": "© syzzy.xyz"
};

let seq = 100, hist = [], future = [], lastSnap = 0;
let cardK = 1, lastCardW = 0, lastCardH = 0;
let els = {}, bgURL = "", rawDraft = "";
let media = [], mseq = 0;
let draftReady = false, draftT = 0, pendingDraft = null;
let bgBlob = null, bgKey = 0;
const app = document.getElementById("app");
const filepick = document.getElementById("filepick");
const key = (id, k) => id + ":" + k;

S.presets = loadPresets();
{
  const lt = loadLastTheme();
  if (lt) { Object.assign(S, lt); lastThemeJSON = JSON.stringify(pickTheme(S)); }
  S.castColor = loadCastColor();
  lastCastJSON = JSON.stringify(S.castColor);
  try {
    const q = localStorage.getItem(QSTYLE_STORE);
    if (["「」", "『』", "“”"].indexOf(q) >= 0) S.qStyle = q;
  } catch (e) {}
}
try {
  const rc = localStorage.getItem("excerpt-recent-colors-v2");
  if (rc) { const v = JSON.parse(rc); if (v && !Array.isArray(v)) S.recent = v; }
  const cc = localStorage.getItem("excerpt-custom-colors-v1");
  if (cc) { const v = JSON.parse(cc); if (v && !Array.isArray(v)) S.custom = Object.assign(S.custom, v); }
  S.expHi = localStorage.getItem("excerpt-export-hi") === "1";
  S.cpkFold = localStorage.getItem("excerpt-cpk-fold") === "1";
  const ca = localStorage.getItem("excerpt-custom-alpha-v1");
  if (ca) { const v = JSON.parse(ca); if (v && !Array.isArray(v)) S.calpha = Object.assign(S.calpha, v); }
} catch (e) {}

const APP_VERSION = "2026.10.06-5";
window.__EXCERPT__ = {
  version: APP_VERSION,
  state: () => S,
  text: () => txt,
  crumbs: []
};

let cardT0 = 0, cardExported = false, exportN = 0;
function track(name, params) {
  if (name === "start_card") { cardT0 = Date.now(); cardExported = false; }
  try { if (window.gaTrack) window.gaTrack(name, params || {}); } catch (e) {}
}
const lenBucket = (n) => (n <= 0 ? "0" : n < 100 ? "1-99" : n < 500 ? "100-499" : n < 2000 ? "500-1999" : "2000+");
const nBucket = (n) => (n <= 0 ? "0" : n === 1 ? "1" : n <= 3 ? "2-3" : n <= 9 ? "4-9" : "10+");
const secBucket = (s) => (s < 30 ? "<30s" : s < 60 ? "30-59s" : s < 180 ? "1-3m" : s < 600 ? "3-10m" : s < 1800 ? "10-30m" : "30m+");
const tplName = (id) => { const t = TEMPLATES.find(x => x.id === id); return t ? t.name : id === "t-last" ? "지난번 모양" : id ? "내 템플릿" : "없음"; };
const presetName = (id) => { const p = BUILTIN_PRESETS.find(x => x.id === id) || SKIN_PRESETS.find(x => x.id === id); return p ? p.name : "내 프리셋"; };
const themeName = (k) => (SKINS[k] ? SKINS[k].n : "없음");
function cardLook() {
  let chars = 0;
  try { chars = excerptParas().join("").length; } catch (e) {}
  return { theme: themeName(S.skin), template: tplName(S.tplId), font: fontOf(S.famKey).n,
    ratio: S.ratio || "", frame: S.frame || "없음", pages: S.pages || 1, blocks: S.blocks.length,
    text_len: lenBucket(chars), bg_photo: S.bgImage ? 1 : 0,
    photos: nBucket(S.blocks.filter(b => b.img || picsOf(b).length).length),
    bubbles: nBucket(S.blocks.filter(b => isMsg(b)).length) };
}
const EXPORT_FEATURE = { save: "사진에 저장", saveone: "지금 장만 저장", copyimg: "이미지 복사", share: "공유",
  copytxt: "문장 텍스트 복사", copyblog: "블로그용 복사", copyhtml: "HTML 복사", savehtml: "HTML 파일 저장" };
const expFeature = (act) => (act === "save" && S.pages > 1 ? "여러 장 저장" : EXPORT_FEATURE[act]);
function expResult(feature, result, extra) {
  const p = Object.assign(cardLook(), { feature: feature, result: result, hi: S.expHi ? 1 : 0 }, extra || {});
  if (result === "success") {
    p.session_exports = nBucket(++exportN);
    if (cardT0 && !cardExported) { p.first_export = secBucket((Date.now() - cardT0) / 1000); cardExported = true; }
  }
  track("export_result", p);
}
let sheetChose = false;
const clickArea = () => (S.sheet ? "내보내기" : S.lib ? "보관함" : S.more ? "더보기" : S.screen === "input" ? "시작" : "편집-" + (S.tab || ""));
let trackAct = "", trackAt = 0;
function trackClick(act, el) {
  if (act === "opensheet") { sheetChose = false; track("export_sheet_open", { pages: S.pages || 1 }); }
  else if (act === "closesheet" && S.sheet) track("export_sheet_close", { chose: sheetChose ? 1 : 0 });
  else if (EXPORT_FEATURE[act]) { sheetChose = true; track("export_click", { feature: expFeature(act), hi: S.expHi ? 1 : 0, pages: S.pages || 1 }); }
  const now = Date.now();
  if (act === trackAct && now - trackAt < 1500) { trackAt = now; return; }
  trackAct = act; trackAt = now;
  const d = el.dataset;
  const v = { tab: d.tab, subtab: d.k, ratio: d.ratio, tplcat: d.c, fontcat: d.fc, cat: d.c, type: d.t, frame: d.f, flow: d.f, pfx: d.v,
    htmlk: d.k, expsize: d.hi === "1" ? "고해상도" : "SNS용" }[act];
  const area = clickArea();
  track("ui_click", v ? { action: act, area: area, value: String(v).slice(0, 40) } : { action: act, area: area });
}
try {
  window.gaSet && window.gaSet({ app_version: APP_VERSION,
    display_mode: matchMedia("(display-mode: standalone)").matches ? "app" : "browser" });
} catch (e) {}
track("page_view");

function set(patch) {
  const c = window.__EXCERPT__.crumbs;
  c.push(Object.keys(patch).join("+"));
  if (c.length > 24) c.shift();
  if (patch.active && patch.active !== S.active && stash && stashBlocks.indexOf(patch.active) < 0) { stash = null; stashBlocks = []; }
  Object.assign(S, patch); render();
}
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function rgba(hex, a) {
  const h = String(hex || "#000000").replace("#", "");
  const v = h.length === 3 ? h.split("").map(x => x + x).join("") : h;
  const n = parseInt(v, 16);
  if (isNaN(n)) return "rgba(0,0,0," + a + ")";
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
}
function lum(hex) {
  const h = String(hex || "#ffffff").replace("#", "");
  const v = h.length === 3 ? h.split("").map(x => x + x).join("") : h;
  const n = parseInt(v, 16);
  if (isNaN(n)) return 1;
  return (((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255;
}
const fgFor = (hex) => (lum(hex) > 0.62 ? "#1a1a1a" : "#ffffff");
const isDark = () =>
  (S.bgImage && !(S.ovColor === "#ffffff" && S.overlay >= 0.36)) ||
  (!S.bgImage && S.artBg === "blur" && !!artSrc()) ||
  (!S.bgImage && lum(bgMid()) < 0.45);
function normHex(v) {
  let h = String(v == null ? "" : v).trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map(x => x + x).join("");
  return /^[0-9a-fA-F]{6}$/.test(h) ? "#" + h.toLowerCase() : "";
}
const AUTO_W = 310;
const AUTO_W_MIN = 200, AUTO_W_MAX = 560;
const EXPORT_BASE = 1080;
const RATIO_FOR = { "1:1": "정사각 게시물", "4:5": "인스타 피드", "3:4": "인스타 격자", "9:16": "스토리·릴스", "16:9": "X·유튜브", "1:1.41": "책 한 쪽(A판)", "auto": "긴 글 한 장" };
const RATIO_LIM = 4;
function ratioWH(r) {
  if (r === "2.39") return [2.39, 1];
  const m = /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(String(r == null ? "" : r));
  if (!m) return null;
  const a = +m[1], b = +m[2];
  return a > 0 && b > 0 && a / b <= RATIO_LIM && b / a <= RATIO_LIM ? [a, b] : null;
}
const ratioNum = (v) => String(Math.round(v * 100) / 100);
function ratioKey(a, b, known) {
  const k = known.find(x => { const wh = ratioWH(x); return wh && Math.abs(wh[0] / wh[1] - a / b) < 0.002; });
  return k || ratioNum(a) + ":" + ratioNum(b);
}
const flipKey = (r, known) => { const wh = ratioWH(r); return wh ? ratioKey(wh[1], wh[0], known) : r; };
const CARD_RATIOS = ["1:1", "4:5", "3:4", "9:16", "16:9", "1:1.41"];
const ratioFor = (r) => RATIO_FOR[r] || (r === "1.41:1" ? "책 펼침(A판 가로)" : (ratioWH(r) || [1, 1])[0] > (ratioWH(r) || [1, 1])[1] ? "직접 정한 가로 판" : "직접 정한 세로 판");
const sBase = () => (+S.scaleBase > 0 ? +S.scaleBase : 1);
const pxK = () => EXPORT_BASE / (panelIncl() ? outDims()[0] : dims()[0]);
const expK = () => pxK() * (S.expHi ? 2 : 1);
const SCALE_MIN = 0.01, SCALE_MAX = Infinity;
const AUTO_MIN = 100;
const FIT_MIN = 0.2, FIT_SMALL = 0.35;
const PADY_MIN = 8, PADY_MAX = 80;
const COLGAP_MIN = 6, COLGAP_MAX = 60;
const COL_SPLIT = new Set(["body", "narration", "dialogue", "lyric"]);

const autoW = () => Math.max(AUTO_W_MIN, Math.min(AUTO_W_MAX, S.cardW || AUTO_W));
const autoMax = () => Math.round(autoW() * 3.2);
const autoMinPx = () => S.autoMinH ? Math.max(AUTO_MIN, Math.min(autoMax(), S.autoMinH)) : AUTO_MIN;

function panelIncl() {
  if (S.ratioBox !== "all" || S.ratio === "auto" || !S.side) return false;
  const sd = sidePic();
  return !!(sd && sd.pos !== "on");
}
function dims() {
  const d = baseDims();
  if (!panelIncl()) return d;
  const sd = sidePic(), s = sd.size / 100;
  return sd.pos === "left" || sd.pos === "right" ? [Math.round(d[0] / (1 + s)), d[1]] : [d[0], Math.round(d[1] / (1 + s))];
}
function outDims() {
  const [w, h] = dims();
  const pb = panelBox(w, h, S.ratio === "auto");
  return !pb ? [w, h] : pb.across ? [w + pb.px, h] : [w, h + pb.px];
}
function baseDims() {
  if (S.ratio === "auto") return [autoW(), Math.max(AUTO_MIN, Math.min(autoMax(), S.autoH || 388))];
  if (S.ratio === "1:1") return [330, 330];
  if (S.ratio === "3:4") return [322, 429];
  if (S.ratio === "9:16") return [252, 448];
  if (S.ratio === "16:9") return [448, 252];
  if (S.ratio === "1:1.41") return [300, 424];
  const wh = S.ratio !== "4:5" && ratioWH(S.ratio);
  if (wh) { const w = Math.sqrt(120000 * wh[0] / wh[1]); return [Math.round(w), Math.round(120000 / w)]; }
  return [310, 388];
}
const padYOf = () => S.padY == null ? S.padX : S.padY;
const colGapOf = () => S.colGap == null ? S.gap + 6 : S.colGap;
function catOf(type) { return CAT_KEYS.find(k => CATS[k].indexOf(type) >= 0) || "글"; }
const idx = () => S.blocks.findIndex(b => b.id === S.active);
const cur = () => S.blocks[idx()];
const plain = (h) => String(h || "").replace(/<[^>]*>/g, "").trim();
function toPlain(h) {
  const d = document.createElement("div");
  d.innerHTML = String(h || "");
  return d.textContent || "";
}

const MEDIA_MAX = 24;
function inUse(id) {
  return S.blocks.some(b => b.img === id || (b.pics || []).indexOf(id) >= 0) || Object.keys(S.cast || {}).some(n => S.cast[n] === id) ||
    !!(S.side && S.side.m === id) || S.decoImg === id ||
    Object.keys(txt).some(k => String(txt[k]).indexOf('data-m="' + id + '"') >= 0);
}
function addMedia(url, blob) {
  const id = "m" + (++mseq);
  media.unshift({ id: id, url: url, blob: blob || null });
  while (media.length > MEDIA_MAX) {
    let cut = -1;
    for (let i = media.length - 1; i >= 0; i--) if (!inUse(media[i].id)) { cut = i; break; }
    if (cut < 0) break;
    media.splice(cut, 1);
  }
  return id;
}
function mediaURL(id) {
  const m = media.find(x => x.id === id);
  return m ? m.url : "";
}
function nameOf(b) { return b ? plain(txt[key(b.id, 1)]) : ""; }
function imgIdOf(b) {
  if (!b) return "";
  if (b.type === "avatar") {
    const n = nameOf(b);
    if (n) return (S.cast || {})[n] || "";
  }
  return b.img || "";
}
function imgURLOf(b) { return mediaURL(imgIdOf(b)); }
function artSrc() {
  const b = (S.blocks || []).find(x => x.type === "track" && imgIdOf(x));
  return b ? imgURLOf(b) : "";
}
function assignImg(b, id) {
  if (!b) return;
  snap(true);
  const who = b.type === "avatar" ? nameOf(b) : "";
  if (who) {
    const cast = Object.assign({}, S.cast || {});
    if (id) cast[who] = id; else delete cast[who];
    delete b.img;
    set({ cast: cast, blocks: S.blocks.slice() });
    return;
  }
  if (id) b.img = id; else delete b.img;
  set({ blocks: S.blocks.slice() });
}

const picsOf = (b) => (b && b.pics || []).filter(id => mediaURL(id));
function picsHTML(b, ch, c) {
  const ids = picsOf(b);
  if (!ids.length) return "";
  const r = ch ? (ch.flat ? "8px" : "14px") : "10px";
  if (ids.length === 1) {
    const url = mediaURL(ids[0]), d = natSize(url);
    return '<img class="b-pic1" src="' + url + '" alt="" draggable="false" style="display:block;width:54%;max-height:170px;object-fit:cover;border-radius:' + r +
      (d ? ";aspect-ratio:" + d[0] + "/" + d[1] : "") + '">';
  }
  const n = ids.length, show = ids.slice(0, 9), more = n - show.length;
  const cols = n === 2 || n === 4 ? 2 : 3;
  return '<div class="b-pics" style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:2px;width:' + (cols === 2 ? 54 : 68) + "%;border-radius:" + r + ';overflow:hidden">' +
    show.map((id, i) => '<i style="display:block;position:relative;aspect-ratio:1;background:' + c.avBg + " url(" + mediaURL(id) + ') center/cover no-repeat">' +
      (more && i === 8 ? '<b style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);color:#fff;font-weight:600;font-size:14px">+' + more + "</b>" : "") +
      "</i>").join("") + "</div>";
}
function sysNoteHTML(b, fs, fw, c, ks) {
  const ch = chatOf(), sys = ch.sys;
  const col = b.tc ? withAlpha(b.tc, b.tcA == null ? 1 : b.tcA) : (sys ? sys.fg : c.sub);
  const st = "font-size:" + r1(fs * 0.86) + "px;font-weight:" + fw(400) + ";line-height:1.5;letter-spacing:0;color:" + col + ";text-align:center;text-wrap:pretty";
  const body = ks.map((k, i) => ceSpan(b.id, k, st + (i ? ";opacity:0.85" : ""))).join(ks.length > 1 ? '<span style="color:' + col + ";font-size:" + r1(fs * 0.86) + 'px">&nbsp;·&nbsp;</span>' : "");
  return '<div style="display:flex;justify-content:center">' +
    '<div style="display:flex;flex-wrap:wrap;justify-content:center;max-width:86%;' +
      (sys ? "background:" + sys.bg + ";border-radius:" + (sys.r || "12px") + ";padding:4px 12px" : "padding:2px 0") + '">' + body + "</div></div>";
}
const contPull = (ch) => Math.max(0, (S.gap || 0) - ((ch && ch.cg) || 2) + 1);
function bubRadius(ch, right, tm) {
  const base = right ? ch.rr : ch.rl;
  if (!ch.tail || !tm) return base;
  const big = Math.max.apply(null, (base.match(/[\d.]+/g) || ["12"]).map(Number)) + "px";
  const first = tm.first !== false, last = tm.last !== false;
  if (ch.tail === "first") return first ? base : big;
  if (ch.tail === "last") return last ? base : big;
  if (first && last) return big;
  const sm = "5px";
  const top = first ? big : sm, bot = last ? big : sm;
  return right ? [big, top, bot, big].join(" ") : [top, big, big, bot].join(" ");
}
const BUBPAD_EM = (ch) => ch ? [0.5, 0.95] : [0.62, 1.06];
const msgFs = () => Math.round(TYPES.bubble.fs * S.scale * 10) / 10;
const BUBPAD0 = (ch) => BUBPAD_EM(ch).map(e => Math.max(2, Math.round(e * msgFs())));
const bubPadV = (ch) => [S.bubPY == null ? BUBPAD0(ch)[0] : S.bubPY, S.bubPX == null ? BUBPAD0(ch)[1] : S.bubPX];
const bubPad = (ch) => { const v = bubPadV(ch); return v[0] + "px " + v[1] + "px"; };
const msgLH = (ch, lh) => ch && !ch.flat ? Math.round(lh * 0.8 * 100) / 100 : lh;
const bubMinW = (ch, fs, lh) => Math.round(fs * lh + 2 * bubPadV(ch)[0]);
const BUBR0 = 9, BUBR_MAX = 24;
const bubRNow = () => S.bubR == null ? BUBR0 : S.bubR;
const AV_SIZE = [16, 64], AV_GAP = [0, 32];
const avR0 = () => { const ch = chatOf(), f = ch && ch.face ? parseFloat(ch.face) : 50; return [f, f, f, f]; };
const avR = () => Array.isArray(S.avR) && S.avR.length === 4 ? S.avR : avR0();
const avSize = () => S.avSize == null ? Math.round(msgFs() * 2.3) : S.avSize;
const avGap = () => S.avGap == null ? Math.round(msgFs() * (chatOf() ? 0.62 : 0.88)) : S.avGap;
function msgTimeHTML(b, c, fs, ch) {
  const tm = c.times && c.times[b.id];
  const on = tm && (timeMode(ch) === "name" ? (S.msgTime ? tm.first !== false : tm.own) : tm.show);
  if (!on) return "";
  return '<span class="b-time" style="flex:none;white-space:nowrap;font-size:' + r1(fs * 0.7) + "px;line-height:1.2;color:" + (ch && ch.tmc ? ch.tmc : c.sub) + '">' + esc(tm.t) + "</span>";
}
const nameWithTime = (nameH, tmH) => tmH ? '<div style="display:flex;align-items:baseline;gap:6px">' + nameH + tmH + "</div>" : nameH;
function msgStack(parts, right, tmH, mode) {
  parts = parts.filter(Boolean);
  if (!parts.length) return tmH;
  if (!tmH) return parts.join("");
  const last = parts.pop();
  if (mode === "side") {
    return parts.join("") + '<div class="b-mrow" style="display:flex;align-items:flex-end;gap:4px;width:100%;justify-content:' + (right ? "flex-end" : "flex-start") + '">' +
      (right ? tmH + last : last + tmH) + "</div>";
  }
  return parts.join("") + last + '<div style="align-self:' + (right ? "flex-end" : "flex-start") + ';display:flex;margin-top:-1px;padding:0 4px">' + tmH + "</div>";
}
function addPics(b, files) {
  if (!b || !files.length) return;
  snap(true);
  const ids = files.map(f => addMedia(URL.createObjectURL(f), f));
  b.pics = (b.pics || []).concat(ids);
  set({ blocks: S.blocks.slice() });
  flash("사진 " + files.length + "장을 붙였어요");
}
function dropPic(b, id) {
  if (!b || !b.pics) return;
  snap(true);
  b.pics = b.pics.filter(x => x !== id);
  if (!b.pics.length) delete b.pics;
  set({ blocks: S.blocks.slice() });
}
function parseClock(v) {
  const s0 = toPlain(v || "").trim();
  let m = s0.match(/(오전|오후|AM|PM|am|pm)\s*(\d{1,2})[:시]\s*(\d{1,2})/) || null;
  let ap = m ? m[1] : "", h, mi;
  if (m) { h = +m[2]; mi = +m[3]; }
  else {
    m = s0.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/);
    if (!m) return null;
    h = +m[1]; mi = +m[2]; ap = m[3] || "";
  }
  if (h > 23 || mi > 59) return null;
  if (/오후|PM|pm/.test(ap) && h < 12) h += 12;
  if (/오전|AM|am/.test(ap) && h === 12) h = 0;
  return h * 60 + mi;
}
function fmtClock(t) {
  t = ((t % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60), mi = t % 60;
  return (h < 12 ? "오전 " : "오후 ") + (h % 12 || 12) + ":" + String(mi).padStart(2, "0");
}
const isMsg = (b) => b && (b.type === "bubble" || b.type === "avatar");
const senderOf = (b) => (b.type === "bubble" && b.side === "right" ? "R:" : "L:") + speakerOf(b);
function msgTimes() {
  const out = {};
  let clock = parseClock(S.msgT0);
  if (clock == null) clock = 14 * 60 + 14;
  let prev = null;
  S.blocks.forEach(b => {
    if (b.type === "stamp") {
      const c0 = parseClock(txt[key(b.id, 0)]) != null ? parseClock(txt[key(b.id, 0)]) : parseClock(txt[key(b.id, 1)]);
      if (c0 != null) { clock = c0; prev = null; }
      return;
    }
    if (!isMsg(b)) return;
    const own = toPlain(txt[key(b.id, 3)] || "").trim(), oc = parseClock(own);
    const who = senderOf(b);
    if (oc != null) clock = oc;
    else if (prev != null && who !== prev) clock += 1;
    out[b.id] = { t: own || fmtClock(clock), own: !!own, who: who, auto: !own, first: true, last: true };
    prev = who;
  });
  const ids = S.blocks.filter(isMsg).map(b => b.id);
  ids.forEach((id, i) => {
    const o = out[id], nx = out[ids[i + 1]];
    const bi = S.blocks.findIndex(x => x.id === id), nb = S.blocks[bi + 1];
    const joined = nx && nb && nb.id === ids[i + 1] && nx.who === o.who && nx.t === o.t;
    o.show = S.msgTime ? !joined : o.own;
    if (nx && nb && nb.id === ids[i + 1] && nx.who === o.who) { nx.first = false; o.last = false; }
  });
  return out;
}
const timeMode = (ch) => (ch && ch.tm) || "side";

const QUOTE_RE = /"[^"\n]*"|“[^”\n]*”|「[^」\n]*」|『[^』\n]*』/g;
const PAREN_RE = /\([^()\n]*\)|（[^（）\n]*）|\[[^[\]\n]*\]|〈[^〈〉\n]*〉|《[^《》\n]*》/g;
const NAME_SLOT = { dialogue: 1, bubble: 1, avatar: 1, bidialogue: 2, character: 0 };
const CAST_PAL = ["#c0506a", "#3a6fb0", "#3f8a5f", "#b0702a", "#7657b0", "#2f8a8e", "#8f2020", "#6a7a2a"];
function speakerOf(b) {
  if (!b || NAME_SLOT[b.type] == null) return "";
  return toPlain(txt[key(b.id, NAME_SLOT[b.type])]).replace(/\s+/g, " ").trim();
}
let nameRun = null;
function setName(id, k, html) {
  const b = S.blocks.find(x => x.id === id);
  if (!b || NAME_SLOT[b.type] !== +k) { txt[key(id, k)] = html; return; }
  if (!nameRun || nameRun.id !== id || nameRun.k !== +k) {
    const ids = [id];
    if (isMsg(b) && speakerOf(b)) {
      const who = senderOf(b), i = S.blocks.indexOf(b);
      for (let j = i - 1; j >= 0 && isMsg(S.blocks[j]) && senderOf(S.blocks[j]) === who; j--) ids.push(S.blocks[j].id);
      for (let j = i + 1; j < S.blocks.length && isMsg(S.blocks[j]) && senderOf(S.blocks[j]) === who; j++) ids.push(S.blocks[j].id);
    }
    nameRun = { id, k: +k, ids };
  }
  nameRun.ids.forEach(x => {
    const xb = S.blocks.find(y => y.id === x);
    if (xb && NAME_SLOT[xb.type] > 0) txt[key(x, NAME_SLOT[xb.type])] = html;
  });
}
function nameChipsHTML(b) {
  const now = speakerOf(b), names = speakers().filter(n => n !== now).slice(0, 8);
  if (!names.length) return "";
  return '<div class="namechips" style="padding-left:62px">' + names.map(n =>
    '<button class="namechip" data-act="setname" data-n="' + esc(n) + '" data-hold>' + esc(n) + "</button>").join("") + "</div>";
}
function sideOf(name, beforeIdx) {
  for (let i = (beforeIdx == null ? S.blocks.length : beforeIdx) - 1; i >= 0; i--) {
    const b = S.blocks[i];
    if (b.type === "bubble" && speakerOf(b) === name) return b.side || "left";
  }
  return "";
}
function nextSpeaker(i) {
  let last = "", prev = "";
  for (let j = i; j >= 0; j--) {
    const n = speakerOf(S.blocks[j]);
    if (!n) continue;
    if (!last) last = n;
    else if (n !== last) { prev = n; break; }
  }
  return prev;
}
function speakers() {
  const out = [];
  S.blocks.forEach(b => { const n = speakerOf(b); if (n && out.indexOf(n) < 0) out.push(n); });
  return out;
}
function inkFor(hex, bg, min) {
  const to = relLum(bg) > 0.18 ? "#111111" : "#ffffff";
  let h = hex;
  for (let a = 0.9; a > 0 && contrastOf(h, bg) < min; a -= 0.1) h = mixHex(hex, to, a);
  return h;
}
function quoteAuto() {
  const acc = normHex(S.accent) || "#a8a8a6";
  return inkFor(isChromatic(acc) ? acc : (isDark() ? "#9db8e8" : "#4a6fa5"), cardBgHex(), 3.2);
}
function parenAuto() {
  const bg = cardBgHex();
  return inkFor(isDark() ? mixHex("#ffffff", bg, 0.6) : "#8a8a88", bg, 2.6);
}
const quoteHex = () => normHex(S.quoteC) || quoteAuto();
const parenHex = () => normHex(S.parenC) || parenAuto();
const castAuto = (i) => inkFor(CAST_PAL[i % CAST_PAL.length], cardBgHex(), 3);
function castHex(n, list) {
  const own = normHex((S.castColor || {})[n]);
  if (own) return own;
  return castAuto(Math.max(0, (list || speakers()).indexOf(n)));
}
function castBubOf(b) {
  if (!S.castOn || !S.castBub || !b || (b.type !== "bubble" && b.type !== "avatar")) return "";
  const n = speakerOf(b);
  return n ? castHex(n) : "";
}
function manualInk(node, host) {
  for (let n = node.parentNode; n && n !== host; n = n.parentNode) {
    if (n.nodeType === 1 && (n.style.color || (n.tagName === "FONT" && n.getAttribute("color")))) return true;
  }
  return false;
}
function inkRuns(root) {
  const out = [];
  if (!root || !(S.quoteOn || S.parenOn || S.castOn)) return out;
  const list = speakers(), bg0 = cardBgHex();
  const qh = quoteHex(), ph = parenHex();
  root.querySelectorAll(".blk[data-block]").forEach(blk => {
    const b = S.blocks.find(x => x.id === blk.dataset.block);
    if (!b) return;
    const who = S.castOn ? speakerOf(b) : "";
    const whoHex = who ? castHex(who, list) : "";
    blk.querySelectorAll(".ce[data-k]").forEach(ce => {
      const k = +ce.dataset.k;
      const isName = NAME_SLOT[b.type] === k;
      if (isName ? !(whoHex && S.castName) : b.tc) return;
      const nodes = [], w = document.createTreeWalker(ce, NodeFilter.SHOW_TEXT);
      let t, s = "";
      while ((t = w.nextNode())) { nodes.push({ n: t, at: s.length }); s += t.data; }
      if (!s.trim()) return;
      const ink = new Array(s.length).fill("");
      const fill = (a, z, hex) => { for (let i = a; i < z; i++) ink[i] = hex; };
      const each = (re, hex) => { for (const m of s.matchAll(re)) fill(m.index, m.index + m[0].length, hex); };
      if (isName) fill(0, s.length, whoHex);
      else {
        if (whoHex && S.castText && k === 0) fill(0, s.length, whoHex);
        else if (S.quoteOn) each(QUOTE_RE, qh);
        if (S.parenOn) each(PAREN_RE, ph);
      }
      const cbg = getComputedStyle(ce).backgroundColor;
      const own = cbg !== "transparent" && !/,\s*0\)$/.test(cbg);
      const bg = cssHex(cbg, bg0), min = own ? 3 : 1.6;
      const seen = {};
      const ok = (hex) => (seen[hex] == null ? (seen[hex] = contrastOf(hex, bg) >= min) : seen[hex]);
      nodes.forEach(({ n, at }) => {
        if (manualInk(n, ce)) return;
        let a = -1;
        for (let i = 0; i <= n.data.length; i++) {
          const h = i < n.data.length ? ink[at + i] : "";
          if (a >= 0 && h !== ink[at + a]) { if (ok(ink[at + a])) out.push({ node: n, a: a, z: i, hex: ink[at + a] }); a = -1; }
          if (a < 0 && h) a = i;
        }
      });
    });
  });
  return out;
}
function inkWrap(root) {
  const runs = inkRuns(root);
  for (let i = runs.length - 1; i >= 0; i--) {
    const r = runs[i];
    let t = r.node;
    if (r.z < t.data.length) t.splitText(r.z);
    if (r.a > 0) t = t.splitText(r.a);
    const sp = document.createElement("span");
    sp.style.color = r.hex;
    t.parentNode.insertBefore(sp, t);
    sp.appendChild(t);
  }
}
let inkStyle = null, inkNames = [], inkRaf = 0;
function paintInk() {
  inkRaf = 0;
  const cards = app.querySelectorAll(".card");
  if (!HAS_HL) {
    if (S.preview) cards.forEach(c => { if (!c.dataset.inked) { c.dataset.inked = "1"; inkWrap(c); } });
    return;
  }
  inkNames.forEach(n => CSS.highlights.delete(n));
  inkNames = [];
  const by = {};
  cards.forEach(c => inkRuns(c).forEach(r => {
    const rg = document.createRange();
    rg.setStart(r.node, r.a); rg.setEnd(r.node, r.z);
    (by[r.hex] = by[r.hex] || []).push(rg);
  }));
  let css = "";
  Object.keys(by).forEach((hex, i) => {
    const h = new Highlight(...by[hex]);
    h.priority = -1;
    CSS.highlights.set("ink" + i, h);
    inkNames.push("ink" + i);
    css += "::highlight(ink" + i + "){color:" + hex + "}";
  });
  if (!inkStyle) { inkStyle = document.createElement("style"); document.head.appendChild(inkStyle); }
  if (inkStyle.textContent !== css) inkStyle.textContent = css;
}
new MutationObserver(() => { if (!inkRaf) inkRaf = requestAnimationFrame(paintInk); })
  .observe(app, { childList: true, subtree: true, characterData: true });

const inkBtn = (act, ink, extra) => ' data-act="' + act + '" data-ink="' + esc(ink) + '"' + (extra || "") + " data-hold";
function inkCands(kind) {
  const bg = cardBgHex();
  const fix = (hex, min) => inkFor(hex, bg, min);
  if (kind === "q") {
    return [["", quoteAuto(), "기본 · 테마 강조색에서 뽑아 바탕에서 읽히게"]].concat([
      ["#8f2020", "진한 빨강 · 필사 노트처럼 단정하게"], ["#c0506a", "장미 · 따뜻한 말투"],
      ["#b0702a", "호박 · 종이 바탕과 같은 계열"], ["#3f8a5f", "초록 · 차분하게"],
      ["#2f8a8e", "청록 · 시원하게"], ["#3a6fb0", "파랑 · 또렷하게"], ["#7657b0", "보라 · 몽환적으로"]
    ].map(x => { const h = fix(x[0], 3.2); return [h, h, x[1]]; }));
  }
  if (kind === "p") {
    const q = quoteHex(), hsl = hexToHsl(q);
    return [["", parenAuto(), "기본 · 본문보다 한 단계 옅은 회색"]].concat([
      [mixHex(q, bg, 0.55), "따옴표 색을 옅게 · 같은 계열이라 짝이 맞음"],
      [hslHex((hsl[0] + 180) % 360, Math.min(hsl[1], 30), 52), "따옴표의 보색을 흐리게 · 말과 지문이 갈려 보임"],
      ["#6a6a68", "진한 회색 · 지문도 또렷하게"], ["#a8a8a6", "옅은 회색 · 한 발 물러나게"],
      ["#a0825a", "모래 · 종이 느낌"], ["#7d8f7a", "쑥 · 차분하게"], ["#8390a8", "먹청 · 차분하게"]
    ].map(x => { const h = fix(x[0], 2.2); return [h, h, x[1]]; }));
  }
  const i0 = Math.max(0, speakers().indexOf(kind.slice(2)));
  return CAST_PAL.map((x, i) => {
    const h = castAuto(i);
    return [i === i0 % CAST_PAL.length ? "" : h, h, hueName(hexToHsl(h)[0], hexToHsl(h)[2] > 62) + (i === i0 % CAST_PAL.length ? " · 기본(등장 순서대로 붙는 색)" : "")];
  });
}
function inkPickHTML(kind, own, hex) {
  const cands = inkCands(kind);
  const hit = cands.find(c => (own ? c[0] === own : !c[0]));
  return '<div class="ink-pick">' +
    '<div class="grid8">' + cands.map(c =>
      '<button class="swatch ink-sw' + ((own ? c[0] === own : !c[0]) ? " on" : "") + (lum(c[1]) > 0.85 ? " light" : "") + '"' +
      inkBtn("inkset", kind, ' data-hex="' + c[0] + '"') + ' title="' + esc(c[2]) + '" aria-label="' + esc(c[2]) + '" style="background:' + c[1] + '"></button>').join("") + "</div>" +
    '<p class="note ink-why">' + (hit ? esc(hit[2]) : "직접 고른 색") + "</p>" +
    '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">직접</span>' +
      '<input type="color" class="tsw ink-cp" data-act="inkpick" data-ink="' + esc(kind) + '" value="' + hex + '" title="직접 고르기" aria-label="직접 고르기" /></div></div>';
}
function inkPaneHTML(part) {
  const bg = cardBgHex(), dim = inkFor("#8a8a88", bg, 3);
  const onoff = (ink, on, label) => '<div class="seg ink-onoff" role="group" aria-label="' + label + ' 켜고 끄기">' +
    '<button class="' + (on ? "" : "on") + '"' + inkBtn("inkon", ink, ' data-v="0"') + ">끔</button>" +
    '<button class="' + (on ? "on" : "") + '"' + inkBtn("inkon", ink, ' data-v="1"') + ">켬</button></div>";
  const def = (ink, changed) => '<button class="resetlink"' + inkBtn("inkdef", ink) + (changed ? ' title="기본 색으로"' : " disabled") + ">기본</button>";
  const kindRow = (ink, label, sample, on, own, hex) =>
    '<div class="row ink-row"><span class="lbl" style="width:52px">' + label + "</span>" + onoff(ink, on, label) +
      '<button class="btn ink-sample' + (on ? "" : " off") + (S.inkOpen === ink ? " open" : "") + '"' + inkBtn("inkopen", ink) +
        ' aria-expanded="' + (S.inkOpen === ink) + '" title="' + label + ' 색 고르기" style="background:' + bg + '">' +
        '<span style="color:' + hex + '">' + sample + '</span><i style="color:' + dim + '">' + ic(S.inkOpen === ink ? "up" : "down", 12) + "</i></button>" +
      def(ink, !!own) + "</div>" +
    (S.inkOpen === ink ? inkPickHTML(ink, own, hex) : "");
  const auto = sec("자동 색", "카드 전체",
    kindRow("q", "따옴표", "「대사」 “대사”", S.quoteOn, normHex(S.quoteC), quoteHex()) +
    kindRow("p", "괄호", "(지문) [메모]", S.parenOn, normHex(S.parenC), parenHex()) +
    '<p class="note" style="margin:0">「」『』“” 와 ()[]〈〉《》 안을 칠합니다 · 직접 칠한 색이 먼저</p>');

  const list = speakers();
  let body;
  if (!list.length) {
    body = '<p class="note" style="margin:0">대사·말풍선·아바타 블록의 이름 칸(블록 탭)을 채우면 여기에 인물이 저절로 모입니다</p>';
  } else {
    const count = {};
    S.blocks.forEach(b => { const n = speakerOf(b); if (n) count[n] = (count[n] || 0) + 1; });
    const opt = (o, label) => '<button class="btn' + (S[o] ? " on" : "") + '"' + inkBtn("inkopt", o) + ' aria-pressed="' + !!S[o] + '">' +
      (S[o] ? ic("check", 13) : "") + "<span>" + label + "</span></button>";
    body = '<div class="row"><span class="lbl" style="width:52px">인물 ' + list.length + "명</span>" + onoff("c", S.castOn, "인물 색") + "</div>" +
      (S.castOn
        ? '<div class="row"><span class="lbl" style="width:52px">칠할 곳</span><div class="ink-opts grow">' +
            opt("castName", "이름") + opt("castText", "대사 글자") + opt("castBub", "말풍선 바탕") + "</div></div>" +
          '<div class="ink-list">' + list.map(n => {
            const k = "c:" + n, own = normHex((S.castColor || {})[n]), hex = castHex(n, list), open = S.inkOpen === k;
            return '<div class="row ink-person">' +
              '<button class="btn ink-who' + (open ? " open" : "") + '"' + inkBtn("inkopen", k) + ' aria-expanded="' + open + '" title="' + esc(n) + ' 색 고르기">' +
                '<i class="ink-dot" style="background:' + hex + '"></i><span class="nm">' + esc(n) + "</span>" +
                '<span class="ct mono">' + count[n] + "</span>" + ic(open ? "up" : "down", 12) + "</button>" +
              def(k, !!own) + "</div>" +
              (open ? inkPickHTML(k, own, hex) : "");
          }).join("") + "</div>" +
          '<p class="note" style="margin:0">숫자는 그 인물이 나오는 블록 수 · 말풍선 바탕은 말풍선·아바타 블록에만</p>'
        : '<p class="note" style="margin:0">켜면 ' + list.slice(0, 3).map(esc).join(", ") + (list.length > 3 ? " 외 " + (list.length - 3) + "명" : "") +
            "에게 서로 다른 색이 붙습니다</p>");
  }
  const who = sec("인물 색", "이름이 있는 대사", body);
  return part === "auto" ? auto : part === "who" ? who : auto + who;
}
app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-ink]");
  if (!el || el.tagName !== "BUTTON") return;
  const ink = el.dataset.ink;
  switch (el.dataset.act) {
    case "inkon": {
      const v = el.dataset.v === "1";
      set(ink === "q" ? { quoteOn: v } : ink === "p" ? { parenOn: v } : { castOn: v, inkOpen: v ? S.inkOpen : "" });
      return;
    }
    case "inkopen": set({ inkOpen: S.inkOpen === ink ? "" : ink }); return;
    case "inkopt": set({ [ink]: !S[ink] }); return;
    case "inkset": inkSet(ink, el.dataset.hex, false); return;
    case "inkdef": inkSet(ink, "", false); return;
  }
});
function inkSet(ink, hex, quiet) {
  const h = normHex(hex);
  let patch;
  if (ink === "q") patch = { quoteC: h, quoteOn: true };
  else if (ink === "p") patch = { parenC: h, parenOn: true };
  else {
    const cc = Object.assign({}, S.castColor || {});
    if (h) cc[ink.slice(2)] = h; else delete cc[ink.slice(2)];
    patch = { castColor: cc, castOn: true };
  }
  if (quiet) { Object.assign(S, patch); repaintCard(); scheduleSave(); }
  else set(patch);
}
app.addEventListener("input", (e) => {
  const cp = e.target.closest && e.target.closest('input[data-act="inkpick"]');
  if (cp && normHex(cp.value)) inkSet(cp.dataset.ink, cp.value, true);
});
app.addEventListener("change", (e) => {
  const cp = e.target.closest && e.target.closest('input[data-act="inkpick"]');
  if (cp && normHex(cp.value)) inkSet(cp.dataset.ink, cp.value, false);
});

const dbarBtn = (v, extra) => ' data-act="dbar" data-dbar="' + v + '"' + (extra || "") + " data-hold";
function dlgBarPaneHTML(b) {
  const on = !!S.dlgBar;
  const head = '<div class="row"><span class="lbl" style="width:52px">강조선</span>' +
    '<div class="seg grow ink-onoff" role="group" aria-label="대사 강조선 켜고 끄기">' +
      '<button class="' + (on ? "" : "on") + '"' + dbarBtn("on", ' data-v="0"') + ">끔</button>" +
      '<button class="' + (on ? "on" : "") + '"' + dbarBtn("on", ' data-v="1"') + ">켬</button></div></div>";
  if (!on) {
    return sec("대사 강조선", "카드의 대사 블록", head +
      '<p class="note" style="margin:0">대사 블록 왼쪽에 인용 괘선 같은 세로 줄을 긋습니다 · 말풍선·아바타는 제 모양이 있어 빠집니다</p>');
  }
  const k0 = (DLGBARS.find(x => x.k === S.dlgBarK) || DLGBARS[0]).k;
  const tiles = '<div class="vpick" role="radiogroup" aria-label="강조선 모양">' + DLGBARS.map((x, n) => {
    const sel = k0 === x.k;
    return '<button class="vtile' + (sel ? " on" : "") + '" role="radio" aria-checked="' + sel + '"' + dbarBtn("k", ' data-v="' + x.k + '"') + ">" +
      '<span class="vt-pv db db-' + x.k + '"><b></b><span><i></i><i></i></span></span>' +
      '<span class="vt-n">' + x.n + (n ? "" : "<em>기본</em>") + "</span></button>";
  }).join("") + "</div>";
  const bg = cardBgHex(), list = S.castOn ? speakers() : [];
  const acc = normHex(S.accent) || S0.accent;
  const dots = (list.length ? list.slice(0, 5).map(n => castHex(n, list)) : [acc])
    .map(h => '<i class="ink-dot" style="background:' + h + '"></i>').join("");
  const colorRow = '<div class="row"><span class="lbl" style="width:52px">색</span>' +
    '<div class="dbar-ink grow"><span class="dbar-dots" style="background:' + bg + '">' + dots + "</span>" +
      "<span>" + (list.length ? "인물 색을 따름 · 이름 없는 대사는 강조색" : "테마 강조색을 따름") + "</span></div>" +
    (list.length ? "" : '<button class="link dbar-go"' + dbarBtn("theme") + ">테마 탭</button>") + "</div>";
  const opt = (o, label) => '<button class="btn' + (S[o] ? " on" : "") + '"' + dbarBtn("opt", ' data-v="' + o + '"') + ' aria-pressed="' + !!S[o] + '">' +
    (S[o] ? ic("check", 13) : "") + "<span>" + label + "</span></button>";
  const more = '<div class="row"><span class="lbl" style="width:52px">더 걸 곳</span><div class="ink-opts grow">' +
    opt("dlgBarBi", "번역 대사") + opt("dlgBarQ", "「」로 여는 서술") + "</div></div>";
  const can = b && (b.type === "dialogue" || (b.type === "bidialogue" && S.dlgBarBi) || (b.type === "body" && S.dlgBarQ));
  const blk = can
    ? '<div class="row dbar-blk"><span class="lbl" style="width:52px">이 블록</span>' +
        '<button class="btn grow' + (b.nobar ? " on" : "") + '"' + dbarBtn("blk") + ' aria-pressed="' + !!b.nobar + '">' +
        (b.nobar ? ic("check", 13) : "") + "<span>" + (b.nobar ? "이 블록은 줄 없이" : "이 블록만 줄 빼기") + "</span></button></div>"
    : "";
  return sec("대사 강조선", "카드의 대사 블록", head + tiles + colorRow + more + blk +
    (S.dlgBarQ ? '<p class="note" style="margin:0">서술은 첫 글자가 「 『 “ " 일 때만 · 따옴표 자동 색을 켜면 그 색으로</p>' : ""));
}
app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-dbar]");
  if (!el || el.tagName !== "BUTTON") return;
  const v = el.dataset.v;
  switch (el.dataset.dbar) {
    case "on": if ((v === "1") !== !!S.dlgBar) set({ dlgBar: v === "1", fit: 1 }); return;
    case "k": if (DLGBARS.some(x => x.k === v) && v !== S.dlgBarK) set({ dlgBarK: v, fit: 1 }); return;
    case "opt": if (v === "dlgBarBi" || v === "dlgBarQ") set({ [v]: !S[v], fit: 1 }); return;
    case "theme": set({ tab: "테마", fold: false }); return;
    case "blk": {
      const i = idx();
      if (i < 0) return;
      snap(true);
      const blocks = S.blocks.slice(), nb = Object.assign({}, blocks[i]);
      if (nb.nobar) delete nb.nobar; else nb.nobar = 1;
      blocks[i] = nb;
      set({ blocks: blocks, fit: 1 });
      return;
    }
  }
});

const HIST_KEYS = PRESET_KEYS.concat(["side", "ratioBox", "info", "bubPY", "bubPX", "scaleBase", "hanLang",
  "cast", "castColor", "msgTime", "msgT0", "tplId"].filter(k => PRESET_KEYS.indexOf(k) < 0));
function histCfg() {
  const o = {};
  HIST_KEYS.forEach(k => { if (S[k] !== undefined) o[k] = S[k]; });
  return JSON.parse(JSON.stringify(o));
}
const histNow = () => ({ blocks: S.blocks.map(b => Object.assign({}, b)), txt: Object.assign({}, txt), active: S.active, cfg: histCfg() });
function histPush(e) {
  hist.push(e);
  if (hist.length > 40) hist.shift();
  future = [];
  driftSig = "";
  if (rangeHold) rangePushed = true;
  const ub = app.querySelector('[data-act="undo"]'), rb = app.querySelector('[data-act="redo"]');
  if (ub) ub.disabled = false;
  if (rb) rb.disabled = true;
}
let histKnown = null, snapCover = false, coverT = 0, histMute = false, driftSig = "", driftAt = 0;
function coverNow() {
  snapCover = true;
  if (!coverT) coverT = setTimeout(() => { snapCover = false; coverT = 0; }, 0);
}
function histQuiet() {
  hist = []; future = []; histKnown = null; driftSig = "";
  histMute = true;
  setTimeout(() => { histMute = false; }, 0);
}
const cfgSig = () => { const o = {}; HIST_KEYS.forEach(k => { o[k] = JSON.stringify(S[k]); }); return o; };
function histSync() {
  const now = cfgSig(), was = histKnown;
  histKnown = now;
  if (!was || histMute || S.screen !== "edit") return;
  const diff = HIST_KEYS.filter(k => was[k] !== now[k]);
  if (!diff.length) return;
  workDirty = true;
  const sig = diff.join(), t = Date.now(), same = sig === driftSig && t - driftAt < 700;
  driftSig = sig; driftAt = t;
  if (same || snapCover || holdSnap || (rangeHold && rangePushed)) return;
  const cfg = {};
  HIST_KEYS.forEach(k => { if (was[k] !== undefined) cfg[k] = JSON.parse(was[k]); });
  const e = { blocks: S.blocks.map(b => Object.assign({}, b)), txt: Object.assign({}, txt), active: S.active, cfg: cfg };
  const top = hist[hist.length - 1];
  if (top && histSame(top, e)) return;
  histPush(e);
  driftSig = sig;
}
const histSame = (a, b) => JSON.stringify([a.blocks, a.txt, a.cfg]) === JSON.stringify([b.blocks, b.txt, b.cfg]);
let rangeHold = false, rangePushed = false, rangeT = 0;
app.addEventListener("pointerdown", (e) => {
  if (!(e.target.closest && e.target.closest("input[type=range]"))) return;
  clearTimeout(rangeT);
  rangeHold = true; rangePushed = false;
}, true);
const rangeRelease = () => { if (rangeHold) { clearTimeout(rangeT); rangeT = setTimeout(() => { rangeHold = false; }, 250); } };
window.addEventListener("pointerup", rangeRelease, true);
window.addEventListener("pointercancel", rangeRelease, true);
function snap(force) {
  workDirty = true;
  coverNow();
  if (holdSnap) return;
  if (rangeHold) { if (rangePushed) return; force = true; }
  const now = Date.now();
  if (!force && now - lastSnap < 700) return;
  lastSnap = now;
  histPush(histNow());
}
function histApply(s) {
  txt = s.txt;
  const has = (id) => s.blocks.some(b => b.id === id);
  const act = s.active && has(s.active) ? s.active : has(S.active) ? S.active : (s.blocks[Math.min(Math.max(0, S.blocks.findIndex(b => b.id === S.active) - 1), s.blocks.length - 1)] || {}).id || "";
  const patch = { blocks: s.blocks, active: act, picks: (S.picks || []).filter(has) };
  if (s.cfg) {
    const famWas = S.famKey, before = JSON.stringify(histCfg());
    HIST_KEYS.forEach(k => { if (k in s.cfg) S[k] = s.cfg[k]; else delete S[k]; });
    if (S.bgImage && !bgURL) S.bgImage = false;
    if (S.famKey !== famWas) S.fontCat = fontOf(S.famKey).c;
    if (JSON.stringify(histCfg()) !== before) patch.fit = 1;
    histKnown = cfgSig();
    driftSig = "";
  }
  set(patch);
}
function histSkip(list, now) {
  while (list.length && histSame(list[list.length - 1], now)) list.pop();
  return list.length;
}
function undo() {
  const now = histNow();
  if (!histSkip(hist, now)) { render(); return; }
  future.push(now);
  histApply(hist.pop());
}
function redo() {
  const now = histNow();
  if (!histSkip(future, now)) { render(); return; }
  hist.push(now);
  histApply(future.pop());
}

const hasHangul = (s) => /[가-힣]/.test(s);
const isLatin = (s) => /[A-Za-z]/.test(s) && !/[가-힣]/.test(s);
function tidy(t) {
  return String(t).replace(/\r/g, "")
    .replace(/\.\.\.+/g, "…")
    .replace(/--/g, "—")
    .replace(/"([^"]{1,120})"/g, "「$1」")
    .replace(/'([^']{1,120})'/g, "\u2018$1\u2019");
}
const STAGE_TOK = /「[^」]*」|『[^』]*』|“[^”]*”|[(（][^()（）]*[)）]/g;
const isParenTok = (s) => /^[(（]/.test(s);
function splitStage(s, who) {
  const t = String(s).trim();
  if (!t || t.replace(STAGE_TOK, "").trim()) return null;
  const toks = t.match(STAGE_TOK) || [];
  if (!toks.some(isParenTok) || toks.every(isParenTok)) return null;
  const out = [];
  toks.forEach(k => {
    const last = out[out.length - 1];
    if (isParenTok(k)) out.push({ type: "narration", a: k });
    else if (last && last.type === "dialogue") last.a += " " + k;
    else out.push({ type: "dialogue", a: k, b: out.some(x => x.type === "dialogue") ? "" : (who || "") });
  });
  return out;
}
function classify(raw, forceRp) {
  const rawLines = raw.replace(/\r/g, "").split("\n").map(l => l.trim());
  const lines = rawLines.map(l => (/^[-–—*·=_]{3,}$/.test(l) ? l : tidy(l)));
  const out = [];
  const brkAt = [];
  const STAR = /^\*[^*][\s\S]*\*$/;
  const starN = lines.filter(l => STAR.test(l)).length;
  const rp = starN >= 2 || (starN >= 1 && (forceRp || lines.some(l => /^```/.test(l))));
  let fence = false, fenceN = 0;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (/^```/.test(rawLines[i] || "")) {
      fence = !fence; fenceN = 0;
      if (fence && out.length) out.push({ type: "divider" });
      continue;
    }
    if (fence) {
      if (!ln) continue;
      fenceN++;
      if (fenceN === 1 && /\|/.test(ln)) { out.push({ type: "stamp", a: ln.split(/\s*\|\s*/).join(" · ") }); continue; }
      const li0 = ln.match(/^[▪■▫□◾◽•·\-]\uFE0E?\uFE0F?\s*(.+)$/);
      out.push(li0 ? { type: "list", a: li0[1] } : { type: "body", a: ln });
      continue;
    }
    if (!ln) continue;
    if (rp) {
      if (STAR.test(ln) && !/\*/.test(ln.slice(1, -1))) { out.push({ type: "narration", a: ln.slice(1, -1).trim(), align: "left", ls: -0.06 }); continue; }
      if (/\*[^*]+\*/.test(ln)) {
        ln.split(/(\*[^*]+\*)/).map(x => x.trim()).filter(Boolean).forEach(sg =>
          out.push(/^\*.*\*$/.test(sg) ? { type: "narration", a: sg.slice(1, -1).trim(), align: "left", ls: -0.06 } : { type: "dialogue", a: sg, b: "" }));
        continue;
      }
      if (!/^[-–—*·=_]{3,}$/.test(ln) && !BRK_LINE.test(ln)) {
        const sp = ln.match(/^([^:：]{1,14})\s*[:：]\s*(.+)$/);
        out.push(sp && !/https?$/i.test(sp[1]) ? { type: "dialogue", a: sp[2], b: sp[1].trim() } : { type: "dialogue", a: ln, b: "" });
        continue;
      }
    }
    if (BRK_LINE.test(ln)) { brkAt.push(out.length); continue; }
    const kd = (rawLines[i] || "").match(/^[-–—]{4,}\s*(\d{4}년.+?)\s*[-–—]{4,}$/);
    if (kd) { out.push({ type: "stamp", a: kd[1] }); continue; }
    const km = ln.match(/^\[([^\]]{1,20})\]\s*\[((?:오전|오후)\s*\d{1,2}:\d{2})\]\s*(.*)$/) ||
      (() => { const m2 = ln.match(/^\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.?\s*((?:오전|오후)\s*\d{1,2}:\d{2}),\s*([^:：]{1,20}?)\s*[:：]\s*(.*)$/); return m2 ? [m2[0], m2[2], m2[1], m2[3]] : null; })();
    if (km) {
      const nm = km[1].trim(), me = /^(나|me|Me|ME)$/.test(nm);
      out.push(me ? { type: "bubble", a: km[3], b: nm, side: "right", t: km[2] } : { type: "avatar", a: km[3], b: nm, t: km[2] });
      continue;
    }
    if (/^[-–—*·=_]{3,}$/.test(ln)) { out.push({ type: "divider" }); continue; }
    const nr = ln.match(/^\*+\s*(.+?)\s*\*+$/);
    if (nr) { out.push({ type: "narration", a: nr[1] }); continue; }
    const li = ln.match(/^[-•·*]\s+(.+)$/);
    if (li) { out.push({ type: "list", a: li[1] }); continue; }
    const st0 = /^[「『“(（]/.test(ln) ? splitStage(ln, "") : null;
    if (st0) { out.push.apply(out, st0); continue; }
    if (/^[(（][^()（）]{1,40}[)）]$/.test(ln)) {
      let j = i + 1;
      while (j < lines.length && !lines[j]) j++;
      const nx = lines[j] || "";
      if ((out.length && out[out.length - 1].type === "dialogue") || /^[「『“]/.test(nx) || /^[^:：]{1,14}[:：]\s*[「『“]/.test(nx)) {
        out.push({ type: "narration", a: ln }); continue;
      }
    }
    const spk = ln.match(/^([^:：]{1,14})\s*[:：]\s*(.+)$/);
    const isSpk = spk && !/https?$/i.test(spk[1]);
    const st1 = isSpk ? splitStage(spk[2], spk[1].trim()) : null;
    if (st1) { out.push.apply(out, st1); continue; }
    if (isSpk) { out.push({ type: "dialogue", a: spk[2], b: spk[1] }); continue; }
    if (/^[「『"“].+[」』"”]$/.test(ln)) { out.push({ type: "dialogue", a: ln, b: "" }); continue; }
    if (/「[^」]*」/.test(ln)) {
      const segs = ln.split(/(「[^」]*」)/).map(x => x.trim()).filter(Boolean);
      if (segs.length > 1) {
        segs.forEach(sg => out.push(/^「/.test(sg) ? { type: "dialogue", a: sg, b: "" } : { type: "body", a: sg }));
        continue;
      }
    }
    if (isLatin(ln)) {
      let j = i + 1;
      while (j < lines.length && !lines[j]) j++;
      if (j < lines.length && hasHangul(lines[j])) { out.push({ type: "translation", a: lines[j], b: ln }); i = j; continue; }
      out.push({ type: "body", a: ln }); continue;
    }
    if (!out.length && ln.length <= 28 && !/[.。!?！？]$/.test(ln)) { out.push({ type: "title", a: ln }); continue; }
    if (out.length === 1 && out[0].type === "title" && ln.length <= 30 && !/[.。]$/.test(ln)) { out.push({ type: "subtitle", a: ln }); continue; }
    if (/^@/.test(ln) || (ln.length <= 40 && /(발췌|옮김|출처)/.test(ln) && i >= lines.length - 4)) { out.push({ type: "credit", a: ln }); continue; }
    out.push({ type: "body", a: ln });
  }
  brkAt.forEach(n => { if (n > 0 && out[n]) out[n].brk = 1; });
  return out.length ? out : [{ type: "body", a: "" }];
}
const BRK_LINE = /^(?:\/{3,}|\[{1,2}\s*(?:다음\s*장|새\s*장|장\s*나눔)\s*\]{1,2})$/;
function build(list, fromUser) {
  const blocks = [];
  txt = {};
  if (S.screen === "edit") saveWork();
  workId = newWid(); workDirty = !!fromUser; libSaved = new Set();
  const hi = (v) => fromUser && typeof v === "string" && v.indexOf("{") >= 0 ? bracesToHi(v) : v;
  list.forEach(x => {
    const id = "b" + (++seq);
    if (x.a != null) txt[key(id, 0)] = hi(x.a);
    if (x.b != null) txt[key(id, 1)] = hi(x.b);
    if (x.t != null) txt[key(id, 3)] = x.t;
    if (x.c != null) txt[key(id, 2)] = x.c;
    if (x.d != null) txt[key(id, 4)] = x.d;
    const b = tplBlock(x, { id: id, type: x.type });
    if (x.brk) b.brk = 1;
    blocks.push(b);
  });
  els = {}; histQuiet();
  if (blocks.some(b => b.brk)) S.flow = "pages";
  set({ screen: "edit", preview: false, brush: null, picks: [], pickOn: false, typeOffer: null, blocks: blocks, active: blocks[0].id, cat: catOf(blocks[0].type), page: 0, pages: 1, offsets: [0], clips: [0], fit: 1 });
}


function applyFitWrap(wrap, k) {
  if (!wrap) return;
  const pct = 100 / k + "%";
  wrap.style.width = k < 1 ? pct : "100%";
  wrap.style.height = k < 1 ? pct : "100%";
  wrap.style.transform = k < 1 ? "scale(" + k + ")" : "";
}

function measuring(flow, fn) {
  const items = [].slice.call(flow.children);
  const auto = [];
  items.forEach((n, i) => {
    auto[i] = n.style.marginTop === "auto";
    if (auto[i]) n.style.marginTop = "0px";
  });
  const empties = [].slice.call(flow.querySelectorAll(".ce")).filter(n => !n.textContent.trim());
  const marks = [].slice.call(flow.querySelectorAll(".brkmark"));
  empties.concat(marks).forEach(n => { n.style.display = "none"; });
  try { return fn(); }
  finally {
    items.forEach((n, i) => { if (auto[i]) n.style.marginTop = "auto"; });
    empties.concat(marks).forEach(n => { n.style.display = ""; });
  }
}

const COL_SLACK = 0.04;
function spills(flow) {
  if (S.flow !== "columns") return spillsNow(flow);
  const pb = flow.style.paddingBottom;
  flow.style.paddingBottom = Math.ceil(flow.clientHeight * COL_SLACK) + "px";
  try { return spillsNow(flow); } finally { flow.style.paddingBottom = pb; }
}
function spillsNow(flow) {
  if (flow.scrollHeight > flow.clientHeight + 1) return true;
  if (S.flow !== "columns") return false;
  const edge = flow.getBoundingClientRect().right - 1;
  for (const n of flow.children) {
    const rs = n.getClientRects();
    for (let i = 0; i < rs.length; i++) if (rs[i].width > 0 && rs[i].left >= edge) return true;
  }
  return false;
}
function fitOnePage(wrap, flow) {
  return measuring(flow, () => {
    applyFitWrap(wrap, 1);
    if (!spills(flow)) return { k: 1, over: false };
    let lo = FIT_MIN, hi = 1, best = FIT_MIN;
    for (let i = 0; i < 11 && hi - lo > 0.004; i++) {
      const mid = (lo + hi) / 2;
      applyFitWrap(wrap, mid);
      if (!spills(flow)) { best = mid; lo = mid; }
      else hi = mid;
    }
    best = Math.max(FIT_MIN, Math.floor(best * 1000) / 1000);
    applyFitWrap(wrap, best);
    return { k: best, over: spills(flow) };
  });
}

let livePicking = false;
let imeOn = false, typeT = 0;
function typeLater() {
  clearTimeout(typeT);
  typeT = setTimeout(() => { typeT = 0; if (!imeOn) measure(); }, 350);
}
app.addEventListener("compositionstart", (e) => { if (e.target.closest && e.target.closest(".card [contenteditable][data-id]")) imeOn = true; });
app.addEventListener("compositionend", () => { if (imeOn) { imeOn = false; typeLater(); } });
app.addEventListener("focusout", () => { if (imeOn) { imeOn = false; typeLater(); } });
function measure() {
  if (livePicking || batchFmt) return;
  if (imeOn || typeT) { typeLater(); return; }
  const flow = app.querySelector(".card-flow");
  if (!flow) return;
  const wrap = app.querySelector(".card-fitwrap");

  if (S.ratio === "auto") {
    applyFitWrap(wrap, 1);
    const card = app.querySelector(".card");
    if (!card) return;
    const seg = autoSegMap();
    const segN = seg ? seg[S.blocks[S.blocks.length - 1].id] + 1 : 1;
    let pg = Math.min(S.page, segN - 1);
    if (brkFollow) { if (seg && seg[brkFollow] != null) pg = seg[brkFollow]; brkFollow = null; }
    if (pg !== S.page) { set({ page: pg, pages: segN }); return; }
    const m = measuring(flow, () => ({ h: Math.round(card.offsetHeight), over: card.scrollHeight > card.clientHeight + 1 }));
    const h = m.h, over = m.over;
    if (Math.abs((S.autoH || 0) - h) > 1 || S.over !== over || S.pages !== segN || S.fit !== 1) {
      set({ autoH: h, over: over, pages: segN, page: pg, offsets: [0], clips: [0], fit: 1 });
    }
    return;
  }

  const H = flow.clientHeight;
  if (!H) return;
  if (S.flow !== "pages") {
    brkFollow = null;
    if (S.flow === "fit" || S.flow === "columns") {
      const f = fitOnePage(wrap, flow);
      if (Math.abs(f.k - S.fit) > 0.004 || S.over !== f.over || S.pages !== 1 || S.page !== 0) {
        set({ fit: f.k, over: f.over, pages: 1, page: 0, offsets: [0], clips: [0] });
      }
      return;
    }
    applyFitWrap(wrap, 1);
    const over = measuring(flow, () => flow.scrollHeight > H + 1);
    if (S.pages !== 1 || S.page !== 0 || S.over !== over || S.fit !== 1) set({ pages: 1, page: 0, offsets: [0], clips: [0], over: over, fit: 1 });
    return;
  }
  applyFitWrap(wrap, 1);
  const inFlow = S.blocks.filter(b => !pinOf(b) && els[b.id]);
  const nodes = inFlow.map(b => els[b.id]);
  if (!nodes.length) return;
  let atoms = [];
  const plan = measuring(flow, () => paginate((atoms = markBrk(flowAtoms(inFlow, nodes), inFlow)), H));
  const offsets = plan.map(pg => pg.off);
  const clips = plan.map(pg => pg.clip);
  const pages = plan.length;
  let page = Math.min(S.page, pages - 1);
  if (brkFollow) {
    const a = atoms.find(x => inFlow[x.bi].id === brkFollow);
    if (a) { page = 0; offsets.forEach((o, p) => { if (-o <= a.top + 0.5) page = p; }); }
    brkFollow = null;
  }
  if (pages !== S.pages || page !== S.page || S.over ||
    JSON.stringify(offsets) !== JSON.stringify(S.offsets) || JSON.stringify(clips) !== JSON.stringify(S.clips || [])) {
    set({ pages: pages, page: page, offsets: offsets, clips: clips, over: false });
  }
}

const SPLIT_KINDS = { plain: 1, trans: 1, bidlg: 1, dialogue: 1, list: 1 };
function lineBoxes(node) {
  const nr = node.getBoundingClientRect();
  const k = node.offsetHeight ? nr.height / node.offsetHeight : 1;
  if (!k) return [];
  const rects = [];
  const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const rg = document.createRange();
  let t;
  while ((t = walk.nextNode())) {
    if (!t.data.trim()) continue;
    rg.selectNodeContents(t);
    Array.from(rg.getClientRects()).forEach(r => { if (r.height > 0) rects.push({ t: (r.top - nr.top) / k, b: (r.bottom - nr.top) / k }); });
  }
  rects.sort((a, b) => a.t - b.t);
  const lines = [];
  rects.forEach(r => {
    const last = lines[lines.length - 1];
    if (last && r.t < last.b - Math.min(last.b - last.t, r.b - r.t) / 2) { last.t = Math.min(last.t, r.t); last.b = Math.max(last.b, r.b); }
    else lines.push({ t: r.t, b: r.b });
  });
  return lines;
}
function flowAtoms(blocks, nodes) {
  const base = nodes[0].offsetTop;
  const atoms = [];
  nodes.forEach((n, bi) => {
    const top = n.offsetTop - base, bottom = top + n.offsetHeight;
    const kind = (TYPES[blocks[bi].type] || {}).kind;
    const lines = SPLIT_KINDS[kind] ? lineBoxes(n) : [];
    if (lines.length < 4) { atoms.push({ top: top, bottom: bottom, bi: bi }); return; }
    const L = lines.length;
    atoms.push({ top: top, bottom: top + lines[1].b, bi: bi });
    for (let i = 2; i < L - 2; i++) atoms.push({ top: top + lines[i].t, bottom: top + lines[i].b, bi: bi });
    atoms.push({ top: top + lines[L - 2].t, bottom: bottom, bi: bi });
  });
  return atoms;
}
function paginate(atoms, H) {
  const pages = [];
  let i = 0;
  while (i < atoms.length) {
    const a = atoms[i], prev = atoms[i - 1];
    const top = prev && prev.bi === a.bi ? (prev.bottom + a.top) / 2 : a.top;
    let j = i;
    while (j + 1 < atoms.length && !atoms[j + 1].brk && atoms[j + 1].bottom - top <= H + 0.5) j++;
    const next = atoms[j + 1];
    const vis = next ? Math.min(H, (atoms[j].bottom + next.top) / 2 - top) : H;
    const clipB = next ? Math.max(0, Math.round((H - vis) * 10) / 10) : -40;
    const clipT = !prev ? -40 : (prev.bi === a.bi ? 0 : -Math.max(0, Math.floor((a.top - prev.bottom) / 2 * 10) / 10));
    pages.push({ off: -Math.round(top * 10) / 10, clip: [clipT, clipB] });
    i = j + 1;
  }
  return pages.length ? pages : [{ off: 0, clip: [-40, -40] }];
}

function caretInfo() {
  const a = document.activeElement;
  if (a && a.tagName === "INPUT" && a.dataset && a.dataset.fld != null) {
    return { fld: a.dataset.fld, off: a.selectionStart };
  }
  if (a && a.tagName === "INPUT" && a.dataset && a.dataset.keep) {
    return { keep: a.dataset.keep, off: a.selectionStart };
  }
  if (!a || !a.isContentEditable || !a.dataset.id) return null;
  const sel = window.getSelection();
  let off = 0, end = 0;
  if (sel && sel.rangeCount) {
    const r = sel.getRangeAt(0);
    const m = document.createRange();
    try {
      m.selectNodeContents(a); m.setEnd(r.startContainer, r.startOffset);
      off = m.toString().length;
      m.selectNodeContents(a); m.setEnd(r.endContainer, r.endOffset);
      end = m.toString().length;
    } catch (e) {}
  }
  return { id: a.dataset.id, k: a.dataset.k, off: off, end: end };
}
function posAt(el, off, start) {
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n, acc = 0, last = null;
  while ((n = w.nextNode())) {
    const len = n.nodeValue.length;
    if (start ? acc + len > off : acc + len >= off) return { node: n, offset: off - acc };
    acc += len; last = n;
  }
  return start && last && acc === off ? { node: last, offset: last.nodeValue.length } : null;
}
function restoreCaret(info) {
  if (!info) return;
  if (info.keep) {
    const k = app.querySelector('input[data-keep="' + info.keep + '"]');
    if (k) {
      k.focus({ preventScroll: true });
      try { k.setSelectionRange(info.off, info.off); } catch (e) {}
    }
    return;
  }
  if (info.fld != null) {
    const f = app.querySelector('input[data-fld="' + info.fld + '"]');
    if (f) {
      f.focus({ preventScroll: true });
      try { f.setSelectionRange(info.off, info.off); } catch (e) {}
    }
    return;
  }
  const el = app.querySelector('[contenteditable][data-id="' + info.id + '"][data-k="' + info.k + '"]');
  if (!el) return;
  el.focus({ preventScroll: true });
  const r = document.createRange();
  const p1 = posAt(el, info.off, info.end > info.off);
  if (!p1) { r.selectNodeContents(el); r.collapse(false); }
  else {
    r.setStart(p1.node, p1.offset);
    const p2 = info.end > info.off ? posAt(el, info.end) : null;
    if (p2) r.setEnd(p2.node, p2.offset); else r.collapse(true);
  }
  const s = window.getSelection();
  s.removeAllRanges(); s.addRange(r);
}
function syncFromSelection() {
  const sel = window.getSelection();
  if (!sel || !sel.anchorNode) return;
  let n = sel.anchorNode;
  if (n.nodeType === 3) n = n.parentElement;
  const host = n && n.closest ? n.closest("[contenteditable]") : null;
  if (host && host.dataset.id) txt[key(host.dataset.id, host.dataset.k)] = host.innerHTML;
}
function exec(cmd, val) {
  snap(true);
  try { document.execCommand(cmd, false, val); } catch (e) {}
  syncFromSelection();
  measure();
}

function ce(id, k, cls, style) {
  const ph = S.preview || k !== 0 && k !== "0" ? "" : ' data-ph="여기에 입력"';
  let html = relinkMedia(txt[key(id, k)] || "");
  const b = +k === 0 ? S.blocks.find(x => x.id === id) : null;
  if (b && b.vert) style += ";writing-mode:vertical-rl;text-orientation:upright;text-align:start;word-break:normal;letter-spacing:0.06em;height:" + Math.round(dims()[1] * 0.5) + "px;margin:0 auto";
  if (b && b.drop) {
    const col = decoCol();
    if (S.preview) html = dropCapHTML(html, col); else { cls = (cls || "") + " dropcap"; style += ";--dc:" + col; }
  }
  return '<div class="ce ' + (cls || "") + '" contenteditable="' + (S.preview ? "false" : "true") + '" data-id="' + id + '" data-k="' + k + '"' + ph + ' style="' + style + '">' + html + "</div>";
}
function ceSpan(id, k, style, html, attrs) {
  const ph = S.preview || k !== 0 && k !== "0" ? "" : ' data-ph="여기에 입력"';
  return '<span class="ce" contenteditable="' + (S.preview ? "false" : "true") + '" data-id="' + id + '" data-k="' + k + '"' + ph + (attrs || "") + ' style="' + style + '">' + (html != null ? html : relinkMedia(txt[key(id, k)] || "")) + "</span>";
}

function bubFit1(el) {
  el.style.width = "";
  if (el === document.activeElement) return;
  const ow = el.offsetWidth;
  if (!ow) return;
  const k = el.getBoundingClientRect().width / ow || 1;
  const rects = () => { const r = document.createRange(); r.selectNodeContents(el); return [...r.getClientRects()].filter(x => x.width > 0.5); };
  const rs = rects(), lines = new Set(rs.map(x => Math.round(x.top / k)));
  if (lines.size < 2) return;
  const cs = getComputedStyle(el);
  const want = Math.ceil((Math.max(...rs.map(x => x.right)) - Math.min(...rs.map(x => x.left))) / k + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + 1);
  if (want >= ow - 1) return;
  el.style.width = want + "px";
  if (new Set(rects().map(x => Math.round(x.top / k))).size !== lines.size) el.style.width = "";
}
function bubFit(root, skip) {
  (root || app).querySelectorAll(".card .ce[data-bub]").forEach(el => {
    if (skip && skip.id === el.dataset.id && String(skip.k) === el.dataset.k) { el.style.width = ""; return; }
    bubFit1(el);
  });
}
app.addEventListener("input", (e) => { const el = e.target.closest && e.target.closest(".ce[data-bub]"); if (el) el.style.width = ""; }, true);
app.addEventListener("focusout", (e) => { if (e.target.matches && e.target.matches(".ce[data-bub]")) setTimeout(() => bubFit1(e.target), 0); });

const BQ_PAIR = { "「": "」", "『": "』", "“": "”", '"': '"' };
function bqEnds(s) {
  let a = 0, z = s.length - 1;
  while (a < z && /\s/.test(s[a])) a++;
  while (z > a && /\s/.test(s[z])) z--;
  const c = BQ_PAIR[s[a]];
  if (!c || z - a < 1 || s[z] !== c) return null;
  const mid = s.slice(a + 1, z);
  if (mid.indexOf(s[a]) >= 0 || mid.indexOf(c) >= 0) return null;
  return [a, z];
}
function charPos(el, i) {
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n, acc = 0;
  while ((n = w.nextNode())) {
    const len = n.nodeValue.length;
    if (i < acc + len) return { node: n, offset: i - acc };
    acc += len;
  }
  return null;
}
const bqOn = (b) => !!S.bubNoQuote && (b.type === "bubble" || b.type === "avatar");
function bqStrip(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  const e = bqEnds(d.textContent || "");
  if (!e) return html || "";
  const pz = charPos(d, e[1]), pa = charPos(d, e[0]);
  pz.node.deleteData(pz.offset, 1);
  pa.node.deleteData(pa.offset, 1);
  return d.innerHTML;
}
function markQuotes() {
  if (!window.CSS || !CSS.highlights || typeof Highlight === "undefined") return;
  CSS.highlights.delete("bq-hide");
  if (!S.bubNoQuote || S.preview) return;
  const rs = [];
  S.blocks.forEach(b => {
    if (!bqOn(b)) return;
    const el = app.querySelector('.card [contenteditable][data-id="' + b.id + '"][data-k="0"]');
    const e = el ? bqEnds(el.textContent || "") : null;
    if (!e) return;
    e.forEach(i => {
      const p = charPos(el, i);
      if (!p) return;
      const r = document.createRange();
      r.setStart(p.node, p.offset); r.setEnd(p.node, p.offset + 1);
      rs.push(r);
    });
  });
  if (rs.length) CSS.highlights.set("bq-hide", new Highlight(...rs));
}

function pinOf(b) {
  if (!b || !b.pin || S.flow !== "pages" || S.ratio === "auto") return "";
  return b.pin;
}

ICONS.pgbrk = '<path d="M6 9V4.5A1.5 1.5 0 017.5 3h9A1.5 1.5 0 0118 4.5V9"/><path d="M6 15v4.5A1.5 1.5 0 007.5 21h9a1.5 1.5 0 001.5-1.5V15"/><path d="M3 12h2.5M9 12h2.5M15 12h2.5M20.5 12H21"/>';
let brkFollow = null;
const brkOn = () => S.flow === "pages";
function brkIds() {
  const out = {};
  let first = true;
  S.blocks.forEach(b => {
    if (pinOf(b)) return;
    if (b.brk && !first) out[b.id] = true;
    first = false;
  });
  return out;
}
const brkCount = () => Object.keys(brkIds()).length;
const colBrkId = () => S.flow === "columns" ? (Object.keys(brkIds())[0] || "") : "";
function autoSegMap() {
  if (S.ratio !== "auto" || !brkOn()) return null;
  const ids = brkIds();
  if (!Object.keys(ids).length) return null;
  const map = {};
  let n = 0;
  S.blocks.forEach(b => { if (ids[b.id]) n++; map[b.id] = n; });
  return map;
}
function markBrk(atoms, blocks) {
  if (!brkOn()) return atoms;
  const ids = brkIds();
  atoms.forEach((a, k) => { if (k > 0 && ids[blocks[a.bi].id] && atoms[k - 1].bi !== a.bi) a.brk = 1; });
  return atoms;
}
function toggleBrk() {
  const b = cur();
  if (!b) return;
  const on = !b.brk;
  snap(true);
  const patch = {
    blocks: S.blocks.map(x => {
      if (x.id !== b.id) return x;
      const nb = Object.assign({}, x);
      if (on) nb.brk = 1; else delete nb.brk;
      return nb;
    })
  };
  const col = S.flow === "columns";
  const moved = on && !brkOn() && !col;
  if (moved) Object.assign(patch, { flow: "pages", fit: 1 });
  if (col) patch.fit = 1;
  brkFollow = b.id;
  set(patch);
  flash(moved ? "여러 장으로 바꾸고 이 블록부터 새 장을 열었어요" : col ? (on ? "이 블록부터 오른쪽 단" : "단 나눔을 풀었어요") : on ? "이 블록부터 새 장" : "장 나눔을 풀었어요");
}
function moveColBrk() {
  const b = cur();
  if (!b) return;
  const old = colBrkId(), off = old === b.id;
  snap(true);
  set({ fit: 1, blocks: S.blocks.map(x => {
    if (x.id !== b.id && x.id !== old) return x;
    const nb = Object.assign({}, x);
    if (x.id === b.id && !off) nb.brk = 1; else delete nb.brk;
    return nb;
  }) });
  flash(off ? "단 나눔을 풀었어요" : "이 블록부터 오른쪽 단");
}
function clearBrks() {
  if (!S.blocks.some(b => b.brk)) return;
  snap(true);
  set({ blocks: S.blocks.map(x => { if (!x.brk) return x; const nb = Object.assign({}, x); delete nb.brk; return nb; }) });
  flash("직접 나눈 장을 모두 풀었어요");
}
function brkMarkHTML(b, c) {
  if (S.preview || !c.brks || !c.brks[b.id]) return "";
  const half = r1((S.gap + (b.gapA || 0)) / 2);
  const col = S.flow === "columns", live = brkOn() || (col && c.colBrk === b.id);
  return '<span class="brkmark' + (live ? "" : " off") + '" aria-hidden="true" data-l="' + (col ? "오른쪽 단" : "새 장") + '" style="top:' + (col && live ? 0 : -half) + "px;border-color:" + c.sub + ";color:" + c.sub + '"></span>';
}
const FLOW_NAME = { fit: "한 장에 맞춤", columns: "2단" };
function vertRowHTML() {
  const b = cur();
  if (!b) return "";
  const np = pickedIds().length;
  const who = curScope() === "all" ? "카드 전체" : np > 1 ? "담은 블록 " + np + "개" : "이 블록";
  return '<div class="row"><span class="lbl" style="width:52px">세로쓰기</span>' +
    '<button class="btn grow' + (b.vert ? " on" : "") + '" style="height:40px" data-act="vert" data-hold aria-pressed="' + !!b.vert + '">' +
      who + " 세로쓰기 " + (b.vert ? "켬" : "끔") + "</button></div>";
}
function brkSecHTML(b) {
  const first = S.blocks.find(x => !pinOf(x));
  const col = S.flow === "columns";
  const why = pinOf(b) ? "모든 장에 고정한 블록은 " + (col ? "단을" : "장을") + " 나누지 않습니다"
    : (first && first.id === b.id ? (col ? "첫 블록은 이미 왼쪽 단의 시작입니다" : "첫 블록은 이미 첫 장의 시작입니다") : "");
  const on = !!b.brk && !why;
  const n = brkCount();
  const colLive = col && colBrkId() === b.id;
  const sub = why ||
    (col
      ? (on ? (colLive ? "이 블록부터 오른쪽 단 · 왼쪽 단에 자리가 남아도 넘깁니다" : "2단은 단이 둘이라 앞쪽 한 곳만 나뉩니다") : "왼쪽 단에 자리가 남아도 이 블록부터 오른쪽 단으로")
      : (on ? (brkOn() ? "앞 장에 자리가 남아도 여기서 넘깁니다" : "‘여러 장’·‘2단’에서만 나뉩니다 · 지금은 " + (FLOW_NAME[S.flow] || S.flow))
        : "자리가 남아도 이 블록부터 다음 장으로"));
  const idle = on && !brkOn() && !colLive;
  return sec(col ? "단 나눔 조정" : "장 나눔 조정", "이 블록부터",
    '<button class="brktog' + (on ? " on" : "") + (idle ? " idle" : "") + '" data-act="brk" data-hold role="switch" aria-checked="' + on + '"' +
      (why && !b.brk ? " disabled" : "") + ">" +
      '<span class="brktog-ic">' + ic("pgbrk", 20) + "</span>" +
      '<span class="brktog-t"><b>' + (col ? "여기서 오른쪽 단 시작" : "여기서 새 장 시작") + "</b><small>" + sub + "</small></span>" +
      '<span class="brktog-sw" aria-hidden="true"><i></i></span></button>' +
    (idle && !col
      ? '<div class="row"><span class="note grow" style="margin:0">나눔은 남아 있고 카드에는 흐린 점선으로만 보입니다</span>' +
        '<button class="resetlink brklink" data-act="brkpages" data-hold>여러 장으로</button></div>'
      : "") +
    (n
      ? '<div class="row"><span class="note grow" style="margin:0">직접 나눈 곳 <b class="mono">' + n + "</b>" +
          (S.ratio === "auto" ? " · 나눈 조각마다 높이를 맞춥니다" : " · 그 사이에서 넘치면 알아서 더 나눕니다") + "</span>" +
        '<button class="resetlink brklink" data-act="brkclear" data-hold>모두 풀기</button></div>'
      : ""));
}
function todayText() {
  const d = new Date();
  return d.getFullYear() + ". " + (d.getMonth() + 1) + ". " + d.getDate() + ".";
}
function infoHTML(where, c) {
  const I = S.info || {};
  if (!I.on || (I.pos || "top") !== where) return "";
  const left = [];
  if (I.date !== false) left.push(esc(I.dateText || todayText()));
  if (I.scene) left.push(esc(I.scene));
  const pg = I.page !== false && S.pages > 1 ? (S.page + 1) + " / " + S.pages : "";
  return '<div class="card-info" style="color:' + c.sub + ";font-size:" + r1(6 * S.scale) + 'px">' +
    "<span>" + (left.join(" · ") || "&nbsp;") + "</span><span>" + pg + "</span></div>";
}

const DIVIDERS = [
  { k: "line", n: "짧은 선" },
  { k: "fade", n: "페이드" },
  { k: "dots", n: "점 세 개" },
  { k: "full", n: "긴 선" },
  { k: "double", n: "두 줄" },
  { k: "dash", n: "점선" },
  { k: "diamond", n: "가운데 마름모" },
  { k: "stars", n: "별 셋" },
  { k: "wave", n: "물결" },
  { k: "thick", n: "굵고 가는 줄" },
  { k: "bar", n: "굵은 막대" },
  { k: "beads", n: "동글 점선" },
  { k: "zigzag", n: "지그재그" },
  { k: "bracket", n: "괄호 선" },
  { k: "dia3", n: "마름모 셋" },
  { k: "ring", n: "가운데 동그라미" },
  { k: "spark", n: "가운데 반짝" },
  { k: "heart", n: "가운데 하트" },
  { k: "flower", n: "가운데 꽃" },
  { k: "asterism", n: "책 장식" }
];
const dvAst = (x, y, r) => {
  const a = r * 0.866, h = r * 0.5;
  return "M" + x + " " + r1(y - r) + "V" + r1(y + r) + "M" + r1(x - a) + " " + r1(y - h) + "L" + r1(x + a) + " " + r1(y + h) +
    "M" + r1(x - a) + " " + r1(y + h) + "L" + r1(x + a) + " " + r1(y - h);
};
const dvSvg = (w, h, s, body) => '<svg width="' + r1(w * s) + '" height="' + r1(h * s) + '" viewBox="0 0 ' + w + " " + h +
  '" fill="none" aria-hidden="true" style="display:block;flex:none">' + body + "</svg>";
function dividerHTML(dv, rule, tone, s) {
  const rl = '<span style="flex:1;width:auto;height:1px;background:' + rule + '"></span>';
  const mid = (orn) => '<div class="b-divider" style="align-items:center"><div style="display:flex;align-items:center;gap:' + r1(6 * s) +
    'px;width:64%">' + rl + orn + rl + "</div></div>";
  const box = (st) => '<div class="b-divider" style="align-items:center"><span style="' + st + '"></span></div>';
  const one = (orn) => '<div class="b-divider" style="align-items:center">' + orn + "</div>";
  switch (dv) {
    case "fade": return '<div class="b-divider fade"><span style="background:linear-gradient(90deg,transparent,' + tone + ',transparent)"></span></div>';
    case "dots": return '<div class="b-divider dots">' + ('<i style="background:' + tone + '"></i>').repeat(3) + "</div>";
    case "full": return '<div class="b-divider"><span style="width:100%;background:' + rule + '"></span></div>';
    case "double": return '<div class="b-divider"><span style="width:100%;height:3px;background:none;border-top:1px solid ' + rule + ";border-bottom:1px solid " + rule + '"></span></div>';
    case "dash": return '<div class="b-divider"><span style="width:100%;height:0;background:none;border-top:1px dashed ' + rule + '"></span></div>';
    case "diamond": return '<div class="b-divider" style="align-items:center;gap:6px">' + rl +
      '<i style="flex:none;width:4px;height:4px;transform:rotate(45deg);background:' + tone + '"></i>' + rl + "</div>";
    case "stars": return one(dvSvg(40, 8, s, '<path d="' + dvAst(4, 4, 3) + dvAst(20, 4, 3) + dvAst(36, 4, 3) +
      '" stroke="' + tone + '" stroke-width="0.9" stroke-linecap="round"/>'));
    case "wave": return '<div class="b-divider"><svg width="64" height="6" viewBox="0 0 64 6" fill="none" aria-hidden="true"><path d="M1 3c3.5-3 7-3 10.5 0s7 3 10.5 0 7-3 10.5 0 7 3 10.5 0 7-3 10.5 0 7 3 10 0" stroke="' + tone + '" stroke-width="1" stroke-linecap="round"/></svg></div>';
    case "thick": return box("width:100%;height:" + r1(3 + 2 * s) + "px;background:none;border-top:2px solid " + rule + ";border-bottom:1px solid " + rule);
    case "bar": return box("width:" + r1(22 * s) + "px;height:" + r1(2.5 * s) + "px;border-radius:" + r1(2 * s) + "px;background:" + tone);
    case "beads": {
      let d = "";
      for (let n = 0; n < 13; n++) d += '<circle cx="' + (2 + n * 6) + '" cy="2" r="0.9"/>';
      return one(dvSvg(76, 4, s, '<g fill="' + tone + '">' + d + "</g>"));
    }
    case "zigzag": {
      let d = "M1 4.5";
      for (let n = 1; n <= 20; n++) d += "L" + (1 + n * 3) + " " + (n % 2 ? 1.5 : 4.5);
      return one(dvSvg(62, 6, s, '<path d="' + d + '" stroke="' + tone + '" stroke-width="0.9" stroke-linejoin="round" stroke-linecap="round"/>'));
    }
    case "bracket": return box("width:64%;height:" + r1(4 * s) + "px;background:none;border:1px solid " + rule + ";border-bottom:none");
    case "dia3": return one(dvSvg(26, 8, s, '<g fill="' + tone + '"><path d="M5 2l2 2-2 2-2-2z"/><path d="M13 .9l3.1 3.1L13 7.1 9.9 4z"/><path d="M21 2l2 2-2 2-2-2z"/></g>'));
    case "ring": return mid(dvSvg(7, 7, s, '<circle cx="3.5" cy="3.5" r="2.6" stroke="' + tone + '" stroke-width="0.9"/>'));
    case "spark": return mid(dvSvg(10, 10, s, '<path d="M5 0C5.5 3.3 6.7 4.5 10 5 6.7 5.5 5.5 6.7 5 10 4.5 6.7 3.3 5.5 0 5 3.3 4.5 4.5 3.3 5 0z" fill="' + tone + '"/>'));
    case "heart": return mid(dvSvg(10, 9, s, '<path d="M5 8.3C2 6.1.7 4.5.7 2.9.7 1.6 1.7.6 3 .6c.9 0 1.6.5 2 1.2.4-.7 1.1-1.2 2-1.2 1.3 0 2.3 1 2.3 2.3 0 1.6-1.3 3.2-4.3 5.4z" fill="' + tone + '"/>'));
    case "flower": return mid(dvSvg(12, 12, s, '<g fill="' + tone + '">' + [0, 72, 144, 216, 288].map(a =>
      '<ellipse cx="6" cy="3.4" rx="1.5" ry="2.4" transform="rotate(' + a + ' 6 6)"/>').join("") + "</g>"));
    case "asterism": return one(dvSvg(18, 15, s, '<path d="' + dvAst(4, 3.8, 2.8) + dvAst(14, 3.8, 2.8) + dvAst(9, 11.2, 2.8) +
      '" stroke="' + tone + '" stroke-width="0.9" stroke-linecap="round"/>'));
    default: return '<div class="b-divider"><span style="background:' + rule + '"></span></div>';
  }
}

const DLGBARS = [
  { k: "line", n: "가는 선", w: 1, p: 8 },
  { k: "bold", n: "굵은 선", w: 2.5, p: 9 },
  { k: "dots", n: "점선", w: 2, p: 8 }
];
const DLG_Q_RE = /^(["“「『]|&quot;)/;
function dlgBarOf(b, c) {
  if (!S.dlgBar || !b || b.nobar) return "";
  if (b.type === "dialogue" || (b.type === "bidialogue" && S.dlgBarBi)) {
    const n = S.castOn ? speakerOf(b) : "";
    return n ? castHex(n, c.spk || (c.spk = speakers())) : (normHex(S.accent) || S0.accent);
  }
  if (b.type === "body" && S.dlgBarQ && DLG_Q_RE.test(plain(txt[key(b.id, 0)])))
    return S.quoteOn ? quoteHex() : (normHex(S.accent) || S0.accent);
  return "";
}
function dlgBarCSS(b, c) {
  const col = dlgBarOf(b, c);
  if (!col) return "";
  const s = DLGBARS.find(x => x.k === S.dlgBarK) || DLGBARS[0];
  const r = b.align === "right", at = r ? "100% 0" : "0 0";
  const img = s.k === "dots"
    ? "radial-gradient(circle," + col + " 0 0.8px,transparent 1.05px) " + at + "/" + s.w + "px 3.6px repeat-y"
    : "linear-gradient(" + col + "," + col + ") " + at + "/" + s.w + "px 100% no-repeat";
  return ";padding-" + (r ? "right:" : "left:") + s.p + "px;background:" + img;
}
const taOf = (a) => a === "distribute" ? "justify;text-align-last:justify" : a;
const alignCSS = (b) => b.align && b.align !== "left" ? ";text-align:" + taOf(b.align) : "";
const rowAlignCSS = (b) => b.align === "right" ? ";justify-content:flex-end" : b.align === "center" ? ";justify-content:center" : "";
const rowFill = (b) => b.align === "right" || b.align === "center" ? "" : ";flex:1";

const dlgNameCSS = (fs, lh, tone, fw) => "font-size:" + fs + "px;font-weight:" + fw(700) + ";line-height:" + lh + ";color:" + tone + ";flex:none;white-space:nowrap";
const chatNameCSS = (ch, fs, fw) => "font-size:" + Math.round(fs * (ch.flat ? 1 : 0.82) * 10) / 10 + "px;font-weight:" + fw(ch.flat ? 700 : 500) +
  ";color:" + ((ch.flat && normHex((S.skinC || {}).deco)) || ch.name) + ";line-height:1.3;white-space:nowrap";
function blockHTML(b, i, c) {
  const t = TYPES[b.type] || TYPES.body;
  const bfam = b.fam || S.famKey;
  const fw = (w) => fwOf(w, bfam, t.fw, b.fw);
  const tone0 = t.tone === "accent" ? S.accent : (t.tone === "sub" ? (b.type === "narration" && !c.dark && normHex(c.sub) ? inkFor(c.sub, cardBgHex(), 4.5) : c.sub) : c.main);
  const tone = b.tc ? withAlpha(b.tc, b.tcA == null ? 1 : b.tcA)
    : (b.tcA != null ? fadeCss(tone0, b.tcA) : tone0);
  const right = b.side === "right";
  const fs = Math.round(t.fs * S.scale * 10) / 10;
  const fs2 = Math.round(fs * 0.9 * 10) / 10;
  const bls = b.ls || 0, blh = b.lh || 1;
  const ls = Math.round((t.ls + S.ls + bls) * 1000) / 1000;
  const lh = Math.round(t.lh * S.lh * blh * 100) / 100;
  const lh2 = (v) => Math.round(v * S.lh * blh * 100) / 100;
  const base = "font-size:" + fs + "px;font-weight:" + fw(t.fw) + ";line-height:" + lh + ";letter-spacing:" + ls + "em;color:" + tone + ";text-wrap:pretty";
  const capTop = b.type === "caption" && S.capPos === "top";
  const pushed = b.push && !capTop;
  const solo = c.onePage && !c.vpos && S.blocks.length === 1 && !b.push && !capTop;
  const vTop = (c.vpos === "center" || c.vpos === "bottom") && b.id === c.flowFirst;
  const vEnd = c.vpos === "center" && b.id === c.flowLast;
  const vnTop = b.type === "vn" && c.onePage && (!S.blocks[i - 1] || S.blocks[i - 1].type !== "vn");
  const mt = solo || vnTop || vTop || (c.onePage && (b.type === "credit" || b.id === c.bookEnd || (i === 0 && c.hasCredit && b.type !== "book" && c.vpos !== "top") || b.id === c.bookHead || pushed || b.id === c.sheetId)) ? "auto" : (b.gapA || 0) + "px";
  const mb = solo || vEnd ? "auto" : ((S.flow === "columns" ? S.gap : 0) + (b.gapB || 0)) + "px";
  const picked = (S.picks || []).indexOf(b.id) >= 0;
  const ring = S.preview ? "none"
    : picked ? "0 0 0 2px " + (c.dark ? "rgba(255,255,255,0.8)" : "rgba(17,17,17,0.6)")
    : (b.id === S.active ? "0 0 0 1px " + (c.dark ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.24)") : "none");
  const gripOp = S.dragging ? (b.id === S.dragging ? 0.35 : 1) : (b.id === S.active ? 1 : 0.45);
  const gripC = b.id === S.active ? c.sub : c.rule;
  const slot = (k) => plain(txt[key(b.id, k)]).length > 0;
  const showName = slot(1);
  const bqText = S.preview && bqOn(b) ? bqStrip(txt[key(b.id, 0)]) : null;

  let inner = "";
  switch (t.kind) {
    case "stamp":
      if (chatOf()) {
        inner = sysNoteHTML(b, fs, fw, c, [0].concat(slot(1) ? [1] : []));
        break;
      }
      inner = '<div class="b-line">' +
        ceSpan(b.id, 0, "font-size:" + fs + "px;font-weight:" + fw(500) + ";letter-spacing:" + ls + "em;color:" + tone + ";flex:none") +
        '<span class="b-rule" style="background:' + c.rule + '"></span>' +
        (slot(1) ? ceSpan(b.id, 1, "font-size:" + fs + "px;letter-spacing:" + ls + "em;color:" + c.sub + ";flex:none") : "") + "</div>";
      break;
    case "section":
      inner = '<div class="b-col" style="gap:6px">' +
        ceSpan(b.id, 0, "font-size:" + fs + "px;font-weight:" + fw(t.fw) + ";letter-spacing:" + ls + "em;color:" + c.sub) +
        '<span style="height:1px;background:' + c.rule + '"></span></div>';
      break;
    case "list":
      inner = '<div class="b-bullet"><span class="dash" style="background:' + c.rule + '"></span>' +
        ceSpan(b.id, 0, base + ";flex:1") + "</div>";
      break;
    case "lyric": {
      const dim = S.lyDim == null ? 0.38 : S.lyDim;
      inner = ce(b.id, 0, "", base + ";text-align:" + taOf(b.align || t.al || "left") + ";opacity:" + (b.hot ? 1 : dim));
      break;
    }
    case "track": {
      const src = imgURLOf(b), big = b.art === "l", py = b.imgY == null ? 50 : b.imgY;
      const veiled = src && b.imgHide && !S.preview;
      const sz = Math.round(fs * 5.6);
      const note = '<svg width="' + Math.round(sz * 0.36) + '" height="' + Math.round(sz * 0.36) + '" viewBox="0 0 24 24" fill="none" stroke="' + c.sub + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
      const art = '<div class="b-art"' + (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '" title="앨범아트 넣기"') +
        ' style="flex:none;' + (big ? "width:100%;aspect-ratio:1" : "width:" + sz + "px;height:" + sz + "px") + ";border-radius:" + (big ? 10 : 5) + "px;overflow:hidden;" +
        (src ? "box-shadow:0 " + (big ? "10px 28px" : "3px 10px") + " rgba(0,0,0," + (c.dark ? 0.45 : 0.18) + ");" : "") +
        "display:flex;align-items:center;justify-content:center;background-color:" + c.avBg + ";background-size:cover;background-position:center " + py + "%" +
        ";position:relative" + '"' + (src && !S.preview ? ' data-imgb="' + b.id + '"' : "") + ">" + imgLayerHTML(b, src, veiled) + (src ? "" : note) + "</div>";
      const title = ce(b.id, 0, "", base + ";font-size:" + r1(fs * (big ? 1.45 : 1.05)) + "px;font-weight:" + fw(700) + ";text-align:" + taOf(b.align || "left"));
      const artist = slot(1) ? ceSpan(b.id, 1, "display:block;font-size:" + r1(fs * (big ? 1.05 : 0.88)) + "px;font-weight:" + fw(400) + ";color:" + c.sub + ";letter-spacing:0;line-height:1.35;text-align:" + taOf(b.align || "left")) : "";
      inner = big
        ? '<div class="b-col" style="gap:' + Math.round(fs * 1.4) + 'px">' + art + '<div class="b-col" style="gap:2px">' + title + artist + "</div></div>"
        : '<div style="display:flex;align-items:center;gap:' + Math.round(fs * 1.3) + 'px">' + art + '<div class="b-col" style="gap:1px;min-width:0;flex:1">' + title + artist + "</div></div>";
      break;
    }
    case "player": {
      const prog = plProg(b), ink = c.main;
      const bar = '<div class="pl-bar"' + (S.preview ? "" : ' data-plbar="' + b.id + '"') + ' style="position:relative;height:' + r1(fs * 0.5) + "px;border-radius:9px;background:" + c.rule + '">' +
        '<div style="position:absolute;left:0;top:0;bottom:0;width:' + prog + "%;border-radius:9px;background:" + ink + '"></div>' +
        '<div style="position:absolute;top:50%;left:' + prog + "%;width:" + r1(fs * 1.5) + "px;height:" + r1(fs * 1.5) + "px;margin:-" + r1(fs * 0.75) + "px 0 0 -" + r1(fs * 0.75) + "px;border-radius:50%;background:" + ink + '"></div></div>';
      const times = '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">' +
        ceSpan(b.id, 0, base + ";font-variant-numeric:tabular-nums") +
        (slot(1) ? ceSpan(b.id, 1, base + ";font-variant-numeric:tabular-nums") : "<span></span>") + "</div>";
      const ic = (d, sz) => '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="' + ink + '" aria-hidden="true"><path d="' + d + '"/></svg>';
      const u = Math.round(fs * 3.4);
      const ctl = b.noCtl ? "" : '<div style="display:flex;justify-content:center;align-items:center;gap:' + Math.round(fs * 5) + "px;padding-top:" + Math.round(fs * 1.2) + 'px">' +
        ic("M6 5h2v14H6zM20 5v14L9 12z", u) +
        (b.paused ? ic("M7 4v16l14-8z", Math.round(u * 1.35)) : ic("M6 4h4v16H6zM14 4h4v16h-4z", Math.round(u * 1.35))) +
        ic("M16 5h2v14h-2zM4 5v14l11-7z", u) + "</div>";
      inner = '<div class="b-col" style="gap:' + Math.round(fs * 0.9) + 'px">' + bar + times + ctl + "</div>";
      break;
    }
    case "clock": {
      inner = '<div class="b-col" style="gap:' + r1(fs * 0.3) + 'px;align-items:center;text-align:center">' +
        (slot(1) ? ceSpan(b.id, 1, "display:block;font-size:" + r1(fs * 1.25) + "px;font-weight:" + fw(500) + ";line-height:1.3;letter-spacing:0;color:" + tone + ";opacity:0.85") : "") +
        ce(b.id, 0, "", base + ";font-size:" + r1(fs * 7.2) + "px;font-weight:" + fw(600) + ";text-align:center;font-variant-numeric:tabular-nums") + "</div>";
      break;
    }
    case "notif": {
      const src = imgURLOf(b), app0 = plain(txt[key(b.id, 1)]).trim();
      const glass = c.dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.78)";
      const isz = Math.round(fs * 2.5), acc = normHex(S.accent) || "#7a7a78";
      const icon = '<div' + (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '" title="앱 아이콘 넣기"') + ' style="flex:none;width:' + isz + "px;height:" + isz + "px;border-radius:" + Math.round(isz * 0.24) +
        "px;display:flex;align-items:center;justify-content:center;font-size:" + r1(isz * 0.55) + "px;font-weight:" + fw(700) + ";color:" + (relLum(acc) > 0.4 ? "#111111" : "#ffffff") + ";background-color:" + acc +
        ";background-size:cover;background-position:center" + (src ? ";background-image:url(" + src + ")" : "") + '">' + (src ? "" : esc(app0.slice(0, 1))) + "</div>";
      inner = '<div style="background:' + glass + ";border-radius:" + r1(fs * 2) + "px;padding:" + r1(fs * 1.25) + "px " + r1(fs * 1.5) + 'px">' +
        '<div style="display:flex;align-items:center;gap:' + r1(fs * 0.9) + "px;margin-bottom:" + r1(fs * 0.6) + 'px">' + icon +
          (slot(1) ? ceSpan(b.id, 1, "flex:1;min-width:0;font-size:" + r1(fs * 0.9) + "px;font-weight:" + fw(500) + ";letter-spacing:0.02em;color:" + c.sub) : '<span style="flex:1"></span>') +
          (slot(3) ? ceSpan(b.id, 3, "flex:none;font-size:" + r1(fs * 0.85) + "px;color:" + c.sub) : "") + "</div>" +
        (slot(2) ? ceSpan(b.id, 2, "display:block;font-size:" + fs + "px;font-weight:" + fw(700) + ";line-height:1.35;color:" + tone) : "") +
        ce(b.id, 0, "", base) + "</div>";
      break;
    }
    case "post": {
      const src = imgURLOf(b), asz = Math.round(fs * 5);
      const av = '<div' + (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '" title="프로필 사진 넣기"') + ' style="flex:none;width:' + asz + "px;height:" + asz + "px;border-radius:50%;background-color:" + c.avBg +
        ";background-size:cover;background-position:center" + (src ? ";background-image:url(" + src + ")" : "") + '"></div>';
      inner = '<div style="display:flex;gap:' + r1(fs * 1.2) + 'px;align-items:flex-start">' + av +
        '<div class="b-col" style="gap:' + r1(fs * 0.45) + 'px;min-width:0;flex:1">' +
          '<div style="display:flex;align-items:baseline;gap:' + r1(fs * 0.6) + 'px;flex-wrap:wrap">' +
            (slot(1) ? ceSpan(b.id, 1, "font-size:" + fs + "px;font-weight:" + fw(700) + ";color:" + tone) : "") +
            (slot(2) ? ceSpan(b.id, 2, "font-size:" + r1(fs * 0.92) + "px;color:" + c.sub) : "") + "</div>" +
          ce(b.id, 0, "", base) +
          (slot(4) ? ceSpan(b.id, 4, "display:block;padding-top:" + r1(fs * 0.5) + "px;font-size:" + r1(fs * 0.88) + "px;letter-spacing:0.01em;color:" + c.sub) : "") +
        "</div></div>";
      break;
    }
    case "search": {
      const bgS = c.dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
      const mag = '<svg width="' + r1(fs * 1.6) + '" height="' + r1(fs * 1.6) + '" viewBox="0 0 24 24" fill="none" stroke="' + c.sub + '" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" style="flex:none"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
      inner = '<div style="display:flex;align-items:center;gap:' + r1(fs * 0.9) + "px;background:" + bgS + ";border-radius:999px;padding:" + r1(fs * 1.05) + "px " + r1(fs * 1.6) + 'px">' + mag +
        '<div style="flex:1;min-width:0">' + ce(b.id, 0, "", base) + "</div></div>";
      break;
    }
    case "history": {
      const clk = '<svg width="' + r1(fs * 1.5) + '" height="' + r1(fs * 1.5) + '" viewBox="0 0 24 24" fill="none" stroke="' + c.sub + '" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="flex:none"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
      inner = '<div style="display:flex;align-items:center;gap:' + r1(fs * 1.1) + "px;padding:" + r1(fs * 0.2) + 'px 0">' + clk +
        '<div style="flex:1;min-width:0">' + ce(b.id, 0, "", base) + "</div>" +
        '<span style="flex:none;font-size:' + r1(fs * 1.1) + "px;line-height:1;color:" + c.sub + '">×</span></div>';
      break;
    }
    case "call": {
      const dir = b.dir || "miss", red = "#e5484d", ink = dir === "miss" ? red : tone;
      const arrow = dir === "out" ? "M9 15L17 7M10 7h7v7" : "M17 7L7 17M7 10v7h7";
      const ico = '<svg width="' + r1(fs * 1.5) + '" height="' + r1(fs * 1.5) + '" viewBox="0 0 24 24" fill="none" stroke="' + (dir === "miss" ? red : c.sub) + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="' + arrow + '"/></svg>';
      inner = '<div style="display:flex;align-items:center;gap:' + r1(fs * 1.1) + "px;padding:" + r1(fs * 0.35) + 'px 0">' + ico +
        '<div class="b-col" style="gap:1px;min-width:0;flex:1">' + ce(b.id, 0, "", base + ";color:" + ink) +
          (slot(1) ? ceSpan(b.id, 1, "display:block;font-size:" + r1(fs * 0.85) + "px;font-weight:" + fw(400) + ";color:" + c.sub) : "") + "</div>" +
        (slot(3) ? ceSpan(b.id, 3, "flex:none;font-size:" + r1(fs * 0.88) + "px;color:" + c.sub) : "") + "</div>";
      break;
    }
    case "vn": {
      const acc = normHex(S.accent) || "#8fb4ff";
      inner = '<div style="position:relative;margin-top:' + (slot(1) ? r1(fs * 1.4) : 0) + "px;background:rgba(12,12,22,0.72);border:1px solid rgba(255,255,255,0.55);border-radius:" + r1(fs * 0.9) + "px;padding:" + r1(fs * 1.9) + "px " + r1(fs * 2) + "px " + r1(fs * 2.2) + 'px">' +
        (slot(1) ? '<div style="position:absolute;left:' + r1(fs * 1.4) + "px;top:0;transform:translateY(-55%);background:" + acc + ";border-radius:" + r1(fs * 0.5) + "px;padding:" + r1(fs * 0.35) + "px " + r1(fs * 1.3) + 'px">' +
          ceSpan(b.id, 1, "font-size:" + r1(fs * 0.95) + "px;font-weight:" + fw(700) + ";letter-spacing:0.04em;color:" + (relLum(acc) > 0.4 ? "#111111" : "#ffffff")) + "</div>" : "") +
        ce(b.id, 0, "", base + ";color:#ffffff") +
        '<span style="position:absolute;right:' + r1(fs * 1.2) + "px;bottom:" + r1(fs * 0.8) + "px;font-size:" + r1(fs * 0.9) + 'px;color:rgba(255,255,255,0.8)">▼</span></div>';
      break;
    }
    case "html": {
      const body = cleanHTML(b.html);
      const z = Math.round(dims()[0] / 360 * (b.hz || 100)) / 100;
      inner = body
        ? '<div class="b-html" style="position:relative;overflow:hidden;contain:paint;color:' + tone + '"><div style="zoom:' + z + ';font-size:16px;line-height:1.5">' + body + "</div></div>"
        : (S.preview ? "" : '<div class="b-html-empty" style="color:' + c.sub + ";border-color:" + c.rule + '">HTML 블록 · 아래 블록 탭에 코드를 붙여 넣으세요</div>');
      break;
    }
    case "photo": {
      const src = imgURLOf(b);
      const py = b.imgY == null ? 50 : b.imgY;
      const veiled = src && b.imgHide && !S.preview;
      const pw = b.pw ? clampN(b.pw, 20, 100) : 100;
      const pm = b.align === "left" ? "0 auto 0 0" : b.align === "right" ? "0 0 0 auto" : "0 auto";
      inner = '<div class="b-col" style="gap:6px">' +
        '<div class="b-photo"' + (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '"') + (src && !S.preview ? ' data-imgb="' + b.id + '"' : "") +
        (b.fill ? ' data-fill="' + (b.fill === "bottom" ? "bottom" : "grow") + '"' : "") +
        ' style="width:' + pw + "%;margin:" + pm + ";aspect-ratio:" + arOf(b.ar) + ";background-color:" + c.avBg + ';color:' + c.sub + '">' +
        imgLayerHTML(b, src, veiled) +
        (!S.preview && S.active === b.id ? '<i class="phgrip" data-act="phgrip" data-phgrip="' + b.id + '" title="끌어서 사진 칸 가로·세로 크기" aria-label="사진 칸 크기 손잡이"></i>' : "") +
        (veiled ? "<span>가려둔 사진 · 내보내면 보여요</span>" : (src ? "" : "사진 넣기")) + "</div>" +
        (slot(1) ? ceSpan(b.id, 1, "font-size:6px;letter-spacing:0.1em;color:" + c.sub) : "") + "</div>";
      break;
    }
    case "divider": {
      const dv = DIVIDERS.some(x => x.k === b.dv) ? b.dv : "line";
      inner = dividerHTML(dv, c.rule, tone, fs / 8);
      break;
    }
    case "bidlg": {
      const ital = S.biItal === "always" || (S.biItal !== "none" && isLatin(plain(txt[key(b.id, 0)])));
      const origMain = S.biMain !== "trans";
      const lines = ceSpan(b.id, 0, "font-size:" + (origMain ? fs : fs2) + "px;" + (ital ? "font-style:italic;" : "") + "font-weight:" + fw(400) +
          ";line-height:" + lh + ";letter-spacing:" + ls + "em;color:" + (origMain ? tone : c.sub) + ";text-wrap:pretty") +
        (slot(1) ? ceSpan(b.id, 1, "font-size:" + (origMain ? fs2 : fs) + "px;font-weight:" + fw(400) + ";line-height:" + lh2(1.7) +
          ";letter-spacing:" + ls + "em;color:" + (origMain ? c.sub : tone) + ";text-wrap:pretty" + (S.biGap != null ? ";margin-top:" + (S.biGap - 4) + "px" : "")) : "");
      inner = S.dlgName === "inline" && slot(2)
        ? '<div class="b-dlgrow" style="gap:0.6em' + dlgBarCSS(b, c) + rowAlignCSS(b) + alignCSS(b) + '">' + ceSpan(b.id, 2, dlgNameCSS(fs, lh, tone, fw)) +
          '<div class="b-col" style="gap:4px' + rowFill(b) + ';min-width:0">' + lines + "</div></div>"
        : '<div class="b-col" style="gap:4px' + dlgBarCSS(b, c) + alignCSS(b) + '">' +
          (slot(2) ? ceSpan(b.id, 2, "font-size:6px;font-weight:" + fw(500) + ";letter-spacing:0.2em;color:" + c.sub) : "") + lines + "</div>";
      break;
    }
    case "dialogue":
      inner = S.dlgName === "inline" && slot(1)
        ? '<div class="b-dlgrow" style="gap:0.6em' + dlgBarCSS(b, c) + rowAlignCSS(b) + alignCSS(b) + '">' + ceSpan(b.id, 1, dlgNameCSS(fs, lh, tone, fw)) +
          ceSpan(b.id, 0, base + rowFill(b) + ";min-width:0") + "</div>"
        : '<div class="b-col" style="gap:4px' + dlgBarCSS(b, c) + alignCSS(b) + '">' +
          (slot(1) ? ceSpan(b.id, 1, "font-size:6px;font-weight:" + fw(500) + ";letter-spacing:0.2em;color:" + c.sub) : "") +
          ceSpan(b.id, 0, base) + "</div>";
      break;
    case "bubble": {
      const cbub = !b.bub && castBubOf(b);
      const ch = chatOf();
      const chR = ch && (normHex((S.skinC || {}).deco) || ch.r);
      const bubBg = b.bub ? withAlpha(b.bub, b.bubA == null ? 1 : b.bubA)
        : (cbub || (ch ? (ch.flat ? "transparent" : right ? chR : ch.l) : (right ? S.bub : (c.dark ? "rgba(255,255,255,0.10)" : "#f1f1ef"))));
      const bubFg = cbub ? fgFor(cbub) : b.bub && (b.bubA == null || b.bubA >= 0.5) ? fgFor(b.bub)
        : (ch ? (right ? (normHex((S.skinC || {}).deco) && !ch.flat ? fgFor(chR) : ch.rc) : ch.lc)
        : (right && !b.bub ? fgFor(S.bub) : (c.dark ? "#ffffff" : "#1a1a1a")));
      const side = ch && ch.flat ? false : right;
      const mlh = msgLH(ch, lh);
      const shape = ch ? (ch.flat ? "padding:0;border-radius:0" : "padding:" + bubPad(ch) + ";border-radius:" + bubRadius(ch, right, c.times[b.id]) + ";min-width:" + bubMinW(ch, fs, mlh) + "px")
        : "padding:" + bubPad(null) + ";border-radius:" + bubRNow() + "px;min-width:" + bubMinW(null, fs, mlh) + "px";
      const pics = picsHTML(b, ch, c);
      const showTxt = slot(0) || !pics || (!S.preview && S.active === b.id);
      const nameOn = showName && !S.bubNoName && !(ch && !ch.flat && right) && !(c.times[b.id] && c.times[b.id].first === false);
      const mode = timeMode(ch), tmH = msgTimeHTML(b, c, fs, ch);
      const bCont = !!(c.times[b.id] && c.times[b.id].first === false);
      inner = '<div class="b-col" style="gap:' + (ch ? 3 : 4) + 'px;align-items:' + (side ? "flex-end" : "flex-start") + (bCont ? ";margin-top:-" + contPull(ch) + "px" : "") + '">' +
        (nameOn ? nameWithTime(ceSpan(b.id, 1, ch ? chatNameCSS(ch, fs, fw) : "font-size:6px;font-weight:" + fw(500) + ";letter-spacing:0.2em;color:" + c.sub + ";min-width:20px"), mode === "name" ? tmH : "") : "") +
        msgStack([pics, showTxt ? ceSpan(b.id, 0, "background:" + bubBg + ";color:" + bubFg + ";font-size:" + fs + "px;font-weight:" + fw(400) + ";line-height:" + mlh + ";letter-spacing:" + ls + "em;max-width:" + (S.bubW || 76) + "%;" + shape + ";text-wrap:pretty", bqText, ch && ch.flat ? "" : " data-bub") : ""],
          side, mode === "name" ? (nameOn ? "" : (c.times[b.id] && c.times[b.id].first === false ? "" : tmH)) : tmH, mode) + "</div>";
      break;
    }
    case "avatar": {
      const face0 = imgURLOf(b);
      const face = (face0 && b.imgHide && !S.preview) ? "" : face0;
      const cface = castBubOf(b);
      const ch = chatOf();
      const avPics = picsHTML(b, ch, c), avTxt = slot(0) || !avPics || (!S.preview && S.active === b.id);
      const avMode = timeMode(ch), avTm = msgTimeHTML(b, c, fs, ch);
      const avT = c.times[b.id];
      const avCont = !!(avT && avT.first === false);
      const faceHide = ch && ch.faceAt === "last" ? !!(avT && avT.last === false) : avCont;
      const fz = avSize(), fk = fz / 26, silC = cface ? "rgba(255,255,255,0.55)" : c.avFg;
      const avRight = b.align === "right";
      const avSkinBub = ch && !ch.flat && !b.tc, avPlainBub = !ch && S.avBub;
      const avBg = avPlainBub ? (b.bub ? withAlpha(b.bub, b.bubA == null ? 1 : b.bubA) : (cface || (c.dark ? "rgba(255,255,255,0.10)" : "#f1f1ef"))) : "";
      const avFg = avPlainBub ? (b.bub && (b.bubA == null || b.bubA >= 0.5) ? fgFor(b.bub) : cface && !b.bub ? fgFor(cface) : b.tc ? tone : (c.dark ? "#ffffff" : "#1a1a1a")) : "";
      const avLH = avSkinBub ? msgLH(ch, lh) : lh;
      const avTxtCSS = avSkinBub
        ? "background:" + ch.l + ";color:" + ch.lc + ";padding:" + bubPad(ch) + ";border-radius:" + bubRadius(ch, avRight, avT) + ";max-width:" + (S.bubW || 76) + "%;min-width:" + bubMinW(ch, fs, avLH) + "px"
        : avPlainBub
          ? "background:" + avBg + ";color:" + avFg + ";padding:" + bubPad(null) + ";border-radius:" + bubRNow() + "px;max-width:" + (S.bubW || 76) + "%;min-width:" + bubMinW(null, fs, avLH) + "px"
          : "color:" + tone + (b.align && b.align !== "left" ? ";text-align:" + taOf(b.align) : "");
      inner = '<div class="b-avatar" style="gap:' + avGap() + "px" + (avRight ? ";flex-direction:row-reverse" : "") + (ch && ch.faceAt === "last" ? ";align-items:flex-end" : "") + (avCont ? ";margin-top:-" + contPull(ch) + "px" : "") + '">' + (S.bubNoFace ? "" : '<div class="face"' +
        (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '" title="얼굴 이미지 넣기"') +
        ' style="' + (faceHide ? "visibility:hidden;" : "") + "width:" + fz + "px;height:" + fz + "px;gap:" + r1(2 * fk) + "px;border-radius:" + avR().map(v => v + "%").join(" ") + ";background:" + (cface || c.avBg) +
        (face ? ";background-image:url(" + face + ");background-size:cover;background-position:center" : "") + '">' +
        (face ? "" : '<span class="h" style="width:' + r1(8 * fk) + "px;height:" + r1(8 * fk) + "px;background:" + silC + '"></span><span class="s" style="width:' + r1(15 * fk) + "px;height:" + r1(7 * fk) + "px;border-radius:" + r1(8 * fk) + "px " + r1(8 * fk) + "px 0 0;background:" + silC + '"></span>') +
        "</div>") +
        '<div class="b-col" style="gap:' + (ch ? 3 : 4) + 'px;min-width:0;flex:1;padding-top:' + (ch || avPlainBub ? 0 : 2) + 'px' +
          (avSkinBub || avPlainBub || avRight ? ";align-items:" + (avRight ? "flex-end" : "flex-start") : "") + (avRight ? ";text-align:right" : "") + '">' +
        (slot(1) && !S.bubNoName && !avCont ? nameWithTime(ceSpan(b.id, 1, ch ? chatNameCSS(ch, fs, fw) : "font-size:6px;font-weight:" + fw(500) + ";letter-spacing:0.2em;color:" + c.sub), avMode === "name" ? avTm : "") : "") +
        msgStack([avPics, avTxt ? ceSpan(b.id, 0, "font-size:" + fs + "px;font-weight:" + fw(400) + ";line-height:" + avLH + ";letter-spacing:" + ls + "em;" +
          avTxtCSS + ";text-wrap:pretty", bqText, avSkinBub || avPlainBub ? " data-bub" : "") : ""], avRight, avMode === "name" && ((slot(1) && !S.bubNoName) || avCont) ? "" : avTm, avMode) + "</div></div>";
      break;
    }
    case "char":
      inner = '<div class="b-col" style="gap:5px' + alignCSS(b) + '"><div style="display:flex;align-items:baseline;gap:8px' + rowAlignCSS(b) + '">' +
        ceSpan(b.id, 0, "font-size:" + fs + "px;font-weight:" + fw(t.fw) + ";color:" + tone) +
        (slot(1) ? ceSpan(b.id, 1, "font-size:6.5px;letter-spacing:0.1em;color:" + c.sub) : "") + "</div>" +
        '<span style="height:1px;background:' + c.rule + '"></span></div>';
      break;
    case "book": {
      const src = imgURLOf(b);
      const cw = Math.round(fs * 4.6);
      const cover = src || !S.preview
        ? '<div class="b-cover"' + (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '" title="표지 넣기"') +
          ' style="width:' + cw + "px;height:" + Math.round(cw * 1.47) + "px;background-color:" + c.avBg + ";color:" + c.sub +
          (src ? ";background-image:url(" + src + ");background-position:center " + (b.imgY == null ? 50 : b.imgY) + "%" : "") + '">' + (src ? "" : "표지") + "</div>"
        : "";
      inner = '<div class="b-book" style="gap:' + Math.round(fs * 1.6) + 'px">' + cover +
        '<div class="b-col" style="gap:' + Math.round(fs * 0.45) + 'px;min-width:0;flex:1">' +
          ce(b.id, 0, "", base + ";text-align:left") +
          (slot(1) ? ceSpan(b.id, 1, "font-size:" + fs2 + "px;font-weight:" + fw(400) + ";line-height:1.4;letter-spacing:" + (S.ls - 0.01) + "em;color:" + tone + ";opacity:0.88") : "") +
        "</div></div>";
      break;
    }
    case "caption": {
      inner = '<div style="text-align:center">' + capTextHTML(b, fs, fw, tone, base, slot(1)) + "</div>";
      break;
    }
    case "scene": {
      const src = imgURLOf(b), py = b.imgY == null ? 50 : b.imgY;
      const veiled = src && b.imgHide && !S.preview;
      const asp = arOf(b.ar);
      const lbR = { "239": 2.39, "276": 2.76 }[b.lb];
      const bar = lbR && lbR > asp ? Math.round((1 - asp / lbR) / 2 * 1000) / 10 : 0;
      const top = S.capPos === "top";
      const nud = b.nx || b.ny ? "translate(" + (b.nx || 0) + "px," + (b.ny || 0) + "px) " : "";
      const at = bar ? (top ? "top:" + r1(bar / 2) + "%;transform:" + nud + "translateY(-50%)" : "bottom:" + r1(bar / 2) + "%;transform:" + nud + "translateY(50%)")
        : (top ? "top:6%" : "bottom:6%") + (nud ? ";transform:" + nud : "");
      const bars = bar ? '<i style="position:absolute;left:0;right:0;top:0;height:' + bar + '%;background:#000"></i><i style="position:absolute;left:0;right:0;bottom:0;height:' + bar + '%;background:#000"></i>' : "";
      inner = '<div class="b-scene" style="aspect-ratio:' + asp + ";background-color:" + (src ? "#111" : c.avBg) + '">' +
        '<div class="sc-pic"' + (S.preview ? "" : ' data-act="photo" data-id="' + b.id + '" title="장면 사진 넣기"') + (src && !S.preview ? ' data-imgb="' + b.id + '"' : "") +
          ' style="color:' + c.sub + '">' + imgLayerHTML(b, src, veiled) +
          (src ? "" : (S.preview ? "" : "장면 사진 넣기")) + "</div>" + bars +
        '<div class="sc-cap" style="' + at + '">' + capTextHTML(b, fs, fw, tone, base, slot(1)) + "</div></div>";
      break;
    }
    case "trans":
      inner = '<div class="b-col" style="gap:' + (S.biGap != null ? Math.max(0, S.biGap) : 5) + 'px">' +
        (slot(1) || (!S.preview && S.active === b.id) ? ce(b.id, 1, "", "font-size:6.5px;line-height:" + lh2(1.6) + ";letter-spacing:" + (0.02 + S.ls) + "em;color:" + c.sub + ";text-wrap:pretty").replace(' data-k="1"', slot(1) ? ' data-k="1"' : ' data-k="1" data-ph="원문"') : "") +
        ce(b.id, 0, "", base) + "</div>";
      break;
    default:
      if (b.type === "narration" && chatOf()) { inner = sysNoteHTML(b, fs, fw, c, [0]); break; }
      inner = ce(b.id, 0, "", base + ";text-align:" + taOf(b.align || t.al || "left") + dlgBarCSS(b, c) +
        (b.type === "body" && S.indent > 0 ? ";text-indent:" + S.indent + "em" : ""));
  }

  const famCSS = b.fam ? ";font-family:" + fontStack(b.fam) : "";
  const fwbCSS = ";--fwb:" + boldOf(bfam, fw(t.fw));
  const nudCSS = b.type !== "scene" && (b.nx || b.ny) ? ";left:" + (b.nx || 0) + "px;top:" + (b.ny || 0) + "px" : "";
  const colCSS = (c.colBrk === b.id ? ";break-before:column;-webkit-column-break-before:always" : "") +
    (S.flow === "columns" && COL_SPLIT.has(b.type) && !(b.type === "narration" && chatOf()) ? ";break-inside:auto" : "");
  return '<div class="blk' + (b.id === c.sheetId ? " is-sheet" : "") + '" data-block="' + b.id + '" style="margin-top:' + mt + ";margin-bottom:" + mb + ";box-shadow:" + ring + famCSS + fwbCSS + nudCSS + colCSS + '">' +
    (S.preview ? "" :
      '<span class="grip" data-drag="' + b.id + '" title="끌어서 순서 바꾸기" style="opacity:' + gripOp + '"><i style="border-color:' + gripC + '"></i></span>' +
      (S.overId === b.id && S.overPos === "before" ? '<span class="dropline before" style="background:' + c.dropColor + '"></span>' : "") +
      (S.overId === b.id && S.overPos === "after" ? '<span class="dropline after" style="background:' + c.dropColor + '"></span>' : "") +
      brkMarkHTML(b, c)) +
    inner + "</div>";
}

const WRAP_KEYS = ["keep-all", "normal"];
function wrapCSS() {
  const wb = WRAP_KEYS.indexOf(S.wordBreak) >= 0 ? S.wordBreak : "keep-all";
  return "word-break:" + wb + ";overflow-wrap:anywhere";
}

const SIDE0 = { m: "", pos: "right", size: 40, pad: 0, seam: 0, bg: "card", r: [0, 0, 0, 0], fit: "cover", fx: 50, fy: 50, zoom: 100, flip: false, fade: 0, op: 100, line: 0,
  ox: 50, oy: 50, ar: 100, layer: "front", blur: 0, gray: 0, ov: 0, ovC: "#000000", ovG: "flat" };
const SIDE_LIM = { size: [10, 120], pad: [0, 80], seam: [0, 80], fx: [0, 100], fy: [0, 100], zoom: [100, 300], fade: [0, 100], op: [10, 100], line: [0, 6], r: [0, 50],
  ox: [0, 100], oy: [0, 100], ar: [20, 300], blur: [0, 100], gray: [0, 100], ov: [0, 90] };
const SHAPES = [
  { k: "square", n: "사각", r: [0, 0, 0, 0] },
  { k: "round", n: "둥근 사각", r: [10, 10, 10, 10] },
  { k: "soft", n: "스쿼클", r: [30, 30, 30, 30] },
  { k: "circle", n: "원형", r: [50, 50, 50, 50] },
  { k: "arch", n: "아치", r: [50, 50, 0, 0] },
  { k: "leaf", n: "잎", r: [50, 0, 50, 0] },
  { k: "tab", n: "탭", r: [22, 22, 0, 0] }
];
const shapeOf = (r) => (SHAPES.find(x => x.r.join() === (r || []).join()) || {}).k || "";
let sideFx = { key: "", url: "" }, sideFxJob = null, sideFxT = 0;
const sideFxKey = (sd) => sd && sd.m && (sd.blur || sd.gray) ? sd.m + ":" + sd.blur + ":" + sd.gray : "";
async function makeFx(blob, blur, gray) {
  const bmp = await createImageBitmap(blob);
  const w = Math.min(1280, bmp.width), h = Math.max(1, Math.round(bmp.height * w / bmp.width));
  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d");
  ctx.drawImage(bmp, 0, 0, w, h);
  if (bmp.close) bmp.close();
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  if (blur > 0) {
    const r = Math.max(1, Math.round((blur / 100) * w * 0.04 / 1.7));
    const tmp = new Uint8ClampedArray(d.length);
    for (let i = 0; i < 3; i++) { boxPass(d, tmp, w, h, r, true); boxPass(tmp, d, w, h, r, false); }
  }
  if (gray > 0) {
    const g = gray / 100;
    for (let i = 0; i < d.length; i += 4) {
      const y = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
      d[i] += (y - d[i]) * g; d[i + 1] += (y - d[i + 1]) * g; d[i + 2] += (y - d[i + 2]) * g;
    }
  }
  ctx.putImageData(img, 0, 0);
  const png = !blur && /png/i.test(blob.type);
  const out = await new Promise(ok => cv.toBlob(ok, png ? "image/png" : "image/jpeg", 0.92));
  return URL.createObjectURL(out);
}
function sideFxReady(sd) {
  sd = sd || sidePic();
  const k = sideFxKey(sd);
  if (!k) return Promise.resolve("");
  if (sideFx.key === k) return Promise.resolve(sideFx.url);
  if (sideFxJob && sideFxJob.key === k) return sideFxJob.p;
  const p = fetch(mediaURL(sd.m)).then(r => r.blob()).then(bl => makeFx(bl, sd.blur, sd.gray)).then(url => {
    if (sideFx.url) URL.revokeObjectURL(sideFx.url);
    sideFx = { key: k, url: url };
    return url;
  });
  sideFxJob = { key: k, p: p };
  p.catch(() => { if (sideFxJob && sideFxJob.key === k) sideFxJob = null; });
  return p;
}
function sideImg(sd, url, boxW) {
  const k = sideFxKey(sd);
  if (!k || !url) return { url: url, filter: "" };
  if (sideFx.key === k) return { url: sideFx.url, filter: "" };
  clearTimeout(sideFxT);
  sideFxT = setTimeout(() => { sideFxReady(sd).then(u => { if (u) repaintCard(); }).catch(() => {}); }, 160);
  const f = (sd.blur ? "blur(" + r1(sd.blur / 100 * boxW * 0.04) + "px) " : "") + (sd.gray ? "grayscale(" + sd.gray + "%)" : "");
  return { url: url, filter: f.trim() };
}
function sideOvHTML(sd) {
  if (!(sd.ov > 0)) return "";
  const c = sd.ovC === "accent" ? (normHex(S.accent) || "#000000") : (normHex(sd.ovC) || "#000000");
  const a = sd.ov / 100;
  const bg = sd.ovG === "grad" ? "linear-gradient(to bottom," + withAlpha(c, 0) + " 30%," + withAlpha(c, a) + ")" : withAlpha(c, a);
  return '<div class="side-ov" style="position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:' + bg + '"></div>';
}
function sidePic() {
  if (!S.side) return null;
  const sd = Object.assign({}, SIDE0, S.side);
  if (!Array.isArray(sd.r) || sd.r.length !== 4) sd.r = SIDE0.r.slice();
  return sd;
}
function panelBox(w, h, auto) {
  const sd = sidePic();
  if (!sd || sd.pos === "on") return null;
  const across = sd.pos === "left" || sd.pos === "right";
  return { sd: sd, across: across, px: Math.round((across || auto ? w : h) * sd.size / 100) };
}
function shapeGlyph(r, sz) {
  sz = sz || 18;
  return '<i class="shape-pv" style="width:' + sz + "px;height:" + sz + "px;border-radius:" + r.map(v => v + "%").join(" ") + '"></i>';
}
function imgPanelHTML(box, w, h) {
  const sd = box.sd, url = sd.m ? mediaURL(sd.m) : "";
  if (url && !S.preview) natSize(url);
  const auto = S.ratio === "auto";
  const side = sd.pos;
  const seamSide = { left: "right", right: "left", top: "bottom", bottom: "top" }[side];
  const padCSS = ["top", "right", "bottom", "left"].map(e => (sd.pad + (e === seamSide ? sd.seam : 0)) + "px").join(" ");
  const iw = (box.across ? box.px : w) - sd.pad * 2 - (box.across ? sd.seam : 0);
  const ih = box.across ? (auto ? iw : h - sd.pad * 2) : box.px - sd.pad * 2 - sd.seam;
  const base = Math.max(0, Math.min(iw, ih));
  const rad = sd.r.map(v => Math.round(base * v / 100) + "px").join(" ");
  const toward = { left: "to right", right: "to left", top: "to bottom", bottom: "to top" }[side];
  const mask = sd.fade ? "linear-gradient(" + toward + ",#000 " + (100 - sd.fade) + "%,transparent)" : "";
  const round = sd.r.some(v => v > 0);
  const veiled = url && S.bgHide && !S.preview;
  const z = sd.zoom / 100;
  const bg = sd.bg === "card" ? cardBgHex() : (normHex(sd.bg) || cardBgHex());
  const im = sideImg(sd, url, iw);
  return '<div class="card-panel" style="' + (box.across ? "width:" + box.px + "px" : "height:" + box.px + "px") + ";padding:" + padCSS + ";background:" + bg + '">' +
    '<div class="card-side' + (url && !S.preview ? " movable" : "") + '" data-side style="border-radius:' + rad + ";opacity:" + sd.op / 100 +
    (mask ? ";-webkit-mask-image:" + mask + ";mask-image:" + mask : "") +
    (sd.line ? ";border" + (round ? "" : "-" + seamSide) + ":" + sd.line + "px solid " + (normHex(S.accent) || "#a8a8a6") : "") + '">' +
    (url
      ? '<div class="pic"' + (sd.flip ? ' style="transform:scaleX(-1)"' : "") + '><div class="pic" style="background-size:' + (sd.fit === "contain" ? "contain" : "cover") + ";background-repeat:no-repeat;background-position:" + sd.fx + "% " + sd.fy + "%;" +
        "transform-origin:" + sd.fx + "% " + sd.fy + "%;transform:scale(" + z + ")" + (im.filter && !veiled ? ";filter:" + im.filter : "") +
        (veiled ? ";background-color:#d0d0ce;background-image:repeating-linear-gradient(45deg,transparent 0 10px,rgba(0,0,0,0.05) 10px 20px)" : ";background-image:url(" + im.url + ")") + '"></div></div>' + sideOvHTML(sd)
      : (S.preview ? "" : '<div class="pick" data-act="sidepick">이미지 넣기</div>')) +
    "</div></div>";
}

function onPicHTML(w, h, layer) {
  const sd = sidePic();
  if (!sd || sd.pos !== "on") return "";
  const url = sd.m ? mediaURL(sd.m) : "";
  const back = sd.layer === "back";
  if (layer === "front" && back) {
    if (S.preview || !url) return "";
    const gw = w * sd.size / 100, gh = gw * sd.ar / 100;
    return '<div class="card-side on-card on-ghost movable" data-side style="position:absolute;left:calc(' + sd.ox + "% - " + r1(gw / 2) + "px);top:calc(" + sd.oy + "% - " + r1(gh / 2) + "px);" +
      "width:" + r1(gw) + "px;height:" + r1(gh) + 'px"><i class="mv" aria-label="사진 옮기기" title="끌어서 옮기기"></i><i class="rz" data-rz aria-hidden="true"></i></div>';
  }
  if ((back ? "back" : "front") !== layer) return "";
  if (url && !S.preview) natSize(url);
  const fw = w * sd.size / 100, fh = fw * sd.ar / 100;
  const base = Math.max(0, Math.min(fw, fh));
  const rad = sd.r.map(v => Math.round(base * v / 100) + "px").join(" ");
  const mask = sd.fade ? "radial-gradient(closest-side,#000 " + (100 - sd.fade) + "%,transparent)" : "";
  const veiled = url && S.bgHide && !S.preview;
  const z = sd.zoom / 100;
  const edit = !S.preview;
  const im = sideImg(sd, url, fw);
  return '<div class="card-side on-card' + (edit ? " movable" : "") + (layer === "back" ? " on-back" : "") + '" data-side style="position:absolute;left:calc(' + sd.ox + "% - " + r1(fw / 2) + "px);top:calc(" + sd.oy + "% - " + r1(fh / 2) + "px);" +
    "width:" + r1(fw) + "px;height:" + r1(fh) + "px;border-radius:" + rad + ";opacity:" + sd.op / 100 +
    (mask ? ";-webkit-mask-image:" + mask + ";mask-image:" + mask : "") +
    (sd.line ? ";border:" + sd.line + "px solid " + (normHex(S.accent) || "#a8a8a6") : "") + '">' +
    (url
      ? '<div class="pic"' + (sd.flip ? ' style="transform:scaleX(-1)"' : "") + '><div class="pic" style="background-size:' + (sd.fit === "contain" ? "contain" : "cover") + ";background-repeat:no-repeat;background-position:" + sd.fx + "% " + sd.fy + "%;" +
        "transform-origin:" + sd.fx + "% " + sd.fy + "%;transform:scale(" + z + ")" + (im.filter && !veiled ? ";filter:" + im.filter : "") +
        (veiled ? ";background-color:#d0d0ce;background-image:repeating-linear-gradient(45deg,transparent 0 10px,rgba(0,0,0,0.05) 10px 20px)" : ";background-image:url(" + im.url + ")") + '"></div></div>' + sideOvHTML(sd)
      : (edit ? '<div class="pick" data-act="sidepick">이미지 넣기</div>' : "")) +
    (edit && url ? '<i class="rz" data-rz aria-hidden="true"></i>' : "") +
    "</div>";
}

function flowBoxCSS() {
  const tw = textWNow();
  if (tw >= 100) return "";
  const hp = S.hpos === "center" || S.hpos === "right" ? S.hpos : "left";
  return ";width:" + tw + "%;margin-left:" + (hp === "left" ? "0" : "auto") + ";margin-right:" + (hp === "right" ? "0" : "auto");
}
function cardHTML() {
  const [w, h] = dims();
  const dark = isDark();
  const c = {
    dark: dark,
    main: dark ? "#ffffff" : "#111111",
    sub: dark ? "rgba(255,255,255,0.7)" : "#8a8a88",
    rule: dark ? "rgba(255,255,255,0.3)" : "#e0e0de",
    avBg: dark ? "rgba(255,255,255,0.16)" : "#ececea",
    avFg: dark ? "rgba(255,255,255,0.42)" : "#cfcfcd",
    dropColor: dark ? "rgba(255,255,255,0.8)" : "#1a1a1a",
    hasCredit: S.blocks.some(b => b.type === "credit" && !pinOf(b)),
    onePage: S.pages <= 1 && S.flow !== "columns" && S.ratio !== "auto"
  };
  c.times = S.blocks.some(isMsg) ? msgTimes() : {};
  const flowBlks = S.blocks.filter(b => !pinOf(b));
  const lastB = flowBlks[flowBlks.length - 1], firstB = flowBlks[0];
  c.bookEnd = !!(lastB && lastB.type === "book" && flowBlks.length > 1) ? lastB.id : "";
  c.bookHead = !!(firstB && firstB.type === "book" && flowBlks.length > 1 && !c.bookEnd) ? lastB.id : "";
  c.vpos = c.onePage ? S.vpos || "" : "";
  c.flowFirst = firstB ? firstB.id : ""; c.flowLast = lastB ? lastB.id : "";
  if (c.bookEnd) c.hasCredit = true;
  const skNow = SKINS[S.skin];
  c.sheetId = skNow && /fx-sheet/.test(skNow.stage || "") ? ((flowBlks.filter(b => b.type === "translation").pop() || {}).id || "") : "";
  const sk = SKINS[S.skin];
  if (sk) {
    c.main = normHex((S.skinC || {}).ink) || sk.ink;
    c.sub = sk.sub; c.rule = sk.rule; c.dropColor = c.main;
  }
  c.brks = brkIds();
  c.colBrk = colBrkId();
  ensureFont(S.famKey);
  S.blocks.forEach(b => { if (b.fam) ensureFont(b.fam); });
  hanNeed();
  fwSpanNeed();
  const fam = fontStack(S.famKey);
  const gap = S.gap;
  const pad = S.padX, padY = padYOf();
  const pb = panelBox(w, h, S.ratio === "auto");
  const zoom = Math.round(S.bgScale * 100);
  const bgL = Math.round(-(S.bgScale - 1) * 50 + S.bgX);
  const bgT = Math.round(-(S.bgScale - 1) * 50 + S.bgY);

  const bgVeiled = bgURL && S.bgHide && !S.preview;
  const blurred = S.bgBlur > 0 && bgURL ? blurredBg() : "";
  const cssBlur = S.bgBlur > 0 && bgURL && !blurred && !bgVeiled ? Math.round(blurDesignPx() * 10) / 10 : 0;
  const grow = cssBlur ? cssBlur * 2 : 0;
  const bg = S.bgImage
    ? '<div class="card-bg"><div class="pic" style="left:calc(' + bgL + "% - " + grow + "px);top:calc(" + bgT + "% - " + grow + "px);" +
      "width:calc(" + zoom + "% + " + grow * 2 + "px);height:calc(" + zoom + "% + " + grow * 2 + "px)" +
      (cssBlur ? ";filter:blur(" + cssBlur + "px)" : "") +
      (bgVeiled
        ? ";background-color:#d0d0ce;background-image:repeating-linear-gradient(45deg,transparent 0 10px,rgba(0,0,0,0.05) 10px 20px)"
        : (bgURL ? ";background-image:url(" + (blurred || bgURL) + ")" : "")) + '"></div>' +
      (bgURL ? "" : '<div class="pick" data-act="bgpick">배경 사진 넣기</div>') +
      '<div class="veil" style="background:' + rgba(S.ovColor, S.overlay) + '"></div></div>'
    : "";

  const auto = S.ratio === "auto";
  const cardH = auto ? "auto;min-height:" + autoMinPx() + "px;max-height:" + autoMax() + "px" : h + "px";
  const fk = (S.flow === "fit" || S.flow === "columns") && S.fit < 1 ? S.fit : 1;
  const fitStyle = fk < 1 ? "width:" + (100 / fk) + "%;height:" + (100 / fk) + "%;transform:scale(" + fk + ")" : "";

  const paged = S.flow === "pages" && !auto;
  const segOf = autoSegMap(), segNow = segOf ? S.page : -1;
  const clipAt = (S.clips || [])[S.page];
  const clip = Array.isArray(clipAt) ? clipAt : [-40, -40];
  const flowHTML = '<div class="card-fitwrap" style="' + fitStyle + (paged ? ";clip-path:inset(" + clip[0] + "px -40px " + clip[1] + "px -40px)" : "") + '">' +
    '<div class="card-flow" style="display:' + (S.flow === "columns" ? "block" : "flex") + ";gap:" + gap + "px;column-count:" + (S.flow === "columns" ? 2 : 1) +
    (S.flow === "columns" ? ";column-fill:" + (S.colFill === "auto" || colBrkId() ? "auto" : "balance") : "") +
    ";column-gap:" + colGapOf() + "px;margin-top:" + ((S.offsets || [])[S.page] || 0) + "px" + flowBoxCSS() + typeFxCSS() + '">' +
    S.blocks.map((b, i) => (pinOf(b) || (segOf && segOf[b.id] !== segNow) ? "" : blockHTML(b, i, c))).join("") + "</div></div>";
  const zoneOf = (where) => {
    const inner = (where === "top" ? infoHTML("top", c) : "") +
      S.blocks.map((b, i) => (pinOf(b) === where ? blockHTML(b, i, c) : "")).join("") +
      (where === "bottom" ? infoHTML("bottom", c) : "");
    return inner ? '<div class="card-zone ' + where + '" style="gap:' + gap + "px;" + (where === "top" ? "margin-bottom:" : "margin-top:") + gap + "px" + typeFxCSS() + '">' + inner + "</div>" : "";
  };
  const head = zoneOf("top"), foot = zoneOf("bottom");
  const zoned = !!(head || foot);

  const W = w + (pb && pb.across ? pb.px : 0), H = h + (pb && !pb.across ? pb.px : 0);
  const dir = pb ? { right: "row", left: "row-reverse", bottom: "column", top: "column-reverse" }[pb.sd.pos] : "row";
  return '<div class="card-fit" style="width:' + Math.round(W * cardK) + "px;height:" + Math.round(H * cardK) + 'px">' +
    '<div class="card-scale" style="width:' + W + "px;height:" + (auto ? "auto" : H + "px") + ";transform:scale(" + cardK + ')">' +
    '<div class="card-sheet" style="flex-direction:' + dir + '">' +
    '<div class="card' + (auto ? " is-auto" : "") + '" style="width:' + w + "px;height:" + cardH + ";background:" + (S.bgImage ? "#2a2a28" : skinPaint(S, bgPaint())) + '">' + bg + artBgHTML() + onPicHTML(w, h, "back") + lboxHTML(w, h) +
    (sk ? '<div class="card-deco" aria-hidden="true">' + ((skinCnow = S.skinC || {}), (chatPeer = sk.chat ? findPeer() : null), (() => { try { return sk.deco(w, h); } finally { skinCnow = null; chatPeer = null; } })()) + "</div>" : "") +
    (FRAMES[S.frame] ? '<div class="card-deco" aria-hidden="true">' + FRAMES[S.frame].d(w, h, normHex(S.frameC) || c.main) + "</div>" : "") +
    (S.qmark ? '<div class="card-deco" aria-hidden="true">' + dAbs("left:" + (pad - 2) + "px;top:" + (lboxBar(w, h) + Math.max(8, Math.round(padY * 0.32))) + "px;font:900 " + Math.round(34 * Math.max(0.8, S.scale)) +
      "px/1 'Noto Serif KR','Nanum Myeongjo',Georgia,serif;font-style:normal;color:" + c.main, "\u201C") + "</div>" : "") +
    '<div class="card-stage' + (zoned ? " zoned" : "") + (S.tgrad ? " tgrad" : "") + (sk && sk.stage ? " " + sk.stage : "") + '"' +
      (S.tgrad ? ' data-tg="' + (normHex(S.tg1) || "#6f807a") + "," + (normHex(S.tg2) || "#141414") + '"' : "") + ' style="padding:' + (padY + lboxTop(w, h)) + "px " + pad + "px " + padY + "px;--pl:" + pad + "px;--pr:" + pad + "px;--pb:" + padY + "px;--acc:" + (normHex(S.accent) || "#2f7de0") + ";font-family:" + fam + ";" + wrapCSS() + (sk && sk.tfx ? sk.tfx : textShadowCSS(dark)) + '">' +
    (zoned ? head + '<div class="card-view">' + flowHTML + "</div>" + foot : flowHTML) + "</div>" +
    onPicHTML(w, h, "front") +
    (S.guide && !S.preview ? '<div class="guide" style="inset:' + (padY + lboxTop(w, h)) + "px " + pad + "px " + padY + 'px"></div>' : "") +
    (S.flow === "columns" && !S.preview ? '<div class="colgrip" data-colgrip title="끌어서 단 사이 간격 · 두 번 누르면 기본" aria-label="단 사이 간격 손잡이" style="top:' + (padY + lboxTop(w, h)) + "px;bottom:" + padY + "px;left:" + (w / 2) + 'px"><i></i></div>' : "") + "</div>" +
    (pb ? imgPanelHTML(pb, w, h) : "") + "</div></div></div>";
}

const SWIPE_HINT = "excerpt-swipe-hint";
let swipeHint = false;
try {
  if (window.matchMedia && matchMedia("(pointer: coarse)").matches) {
    const n = localStorage.getItem(SWIPE_HINT);
    if (n !== "done" && (+n || 0) < 1) { swipeHint = true; localStorage.setItem(SWIPE_HINT, String((+n || 0) + 1)); }
  }
} catch (e) {}
function swipeHintDone() {
  if (!swipeHint) return;
  swipeHint = false;
  try { localStorage.setItem(SWIPE_HINT, "done"); } catch (e) {}
}
const swipeHintHTML = () => '<div class="swipehint" role="note"><span class="sh-arrow" aria-hidden="true">‹</span>' +
  "<span>설정 칸을 옆으로 밀어도 넘어가요</span>" + '<span class="sh-arrow" aria-hidden="true">›</span>' +
  '<button class="sh-x" data-act="swipehint" data-hold aria-label="안내 닫기">×</button></div>';
const pagerHTML = (cls) => '<div class="' + cls + '"><button data-act="prev" data-hold aria-label="이전 장"' + (S.page > 0 ? "" : " disabled") + ">" + ic("back", 16) + "</button>" +
  '<span style="color:#6a6a68">' + (S.page + 1) + "/" + S.pages + "</span>" +
  '<button data-act="next" data-hold aria-label="다음 장"' + (S.page < S.pages - 1 ? "" : " disabled") + ">" + ic("next", 16) + "</button></div>";
const PINCH_HINT = "excerpt-pinch-hint";
let pinchHint = false;
try {
  if (window.matchMedia && matchMedia("(pointer: coarse)").matches && localStorage.getItem(PINCH_HINT) !== "done") pinchHint = true;
} catch (e) {}
function pinchHintDone() {
  if (!pinchHint) return;
  pinchHint = false;
  try { localStorage.setItem(PINCH_HINT, "done"); } catch (e) {}
  const el = app.querySelector(".pinchhint");
  if (el) el.remove();
}
const pinchHintHTML = () => '<div class="pinchhint" role="note"><span>두 손가락으로 오므리면 카드 전체가 보여요</span>' +
  '<button class="ph-x" data-act="pinchhint" data-hold aria-label="안내 닫기">×</button></div>';
function panelHTML() {
  if (TAB_KEYS.indexOf(S.tab) < 0) S.tab = "블록";
  const k = S.tab, open = !!(S.advOn || {})[k];
  let html = paneHTML(k);
  if (swipeHint) html = html.replace(/(<div class="subnav"[\s\S]*?<\/div>)/, "$1" + swipeHintHTML());
  const n = (html.match(/class="sec adv"/g) || []).length;
  return '<section class="pane on' + (open ? " show-adv" : "") + '" data-pane="' + k + '">' +
    '<h3 class="pane-h">' + TAB_LABEL[k] + "</h3>" + html +
    (n
      ? '<button class="advtog' + (open ? " on" : "") + '" data-act="adv" data-hold aria-expanded="' + open + '">' +
          '<span>' + (open ? "간단히 보기" : "더 많은 설정") + "</span>" + (open ? "" : '<em class="mono">' + n + "</em>") + ic("chev", 16) + "</button>"
      : "") +
    "</section>";
}

function picPaneHTML(b) {
  const ids = picsOf(b), who = speakerOf(b);
  return '<div class="row" style="gap:8px;align-items:flex-start"><span class="lbl" style="width:52px;padding-top:9px">사진</span>' +
    '<div class="grow stack tight">' +
      (ids.length ? '<div class="thumbs">' + ids.map(id =>
        '<span class="thumb pic" style="background-image:url(' + mediaURL(id) + ')"><button class="thumbx" data-act="delpic" data-m="' + id + '" aria-label="이 사진 빼기">×</button></span>').join("") + "</div>" : "") +
      '<button class="btn wide" style="height:34px;flex:none" data-act="addpics" data-hold>' + (ids.length ? "사진 더 붙이기" : "사진 붙이기 · 여러 장 가능") + "</button>" +
    "</div></div>" +
    (who && S.blocks.some(x => isMsg(x) && speakerOf(x) && speakerOf(x) !== who)
      ? '<div class="row"><span class="lbl" style="width:52px"></span><button class="resetlink linkbtn" data-act="isme">‘' + esc(who) + '’가 나예요 · 이 사람 말을 모두 오른쪽으로</button></div>'
      : "");
}
const IMG_FIT = ["photo", "scene", "track"];
function imgPaneHTML(b) {
  const isAv = b.type === "avatar";
  const who = isAv ? nameOf(b) : "";
  const curId = imgIdOf(b);
  const thumbs = media.map(m =>
    '<button class="thumb' + (m.id === curId ? " on" : "") + '" data-act="useimg" data-m="' + m.id +
    '" data-hold title="이 이미지 쓰기" style="background-image:url(' + m.url + ')"></button>').join("");
  return '<div class="stack tight">' +
    '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">' + (isAv ? "얼굴" : b.type === "book" ? "표지" : "이미지") + "</span>" +
      '<button class="btn wide" style="height:34px" data-act="photo" data-id="' + b.id + '" data-hold>' +
        (curId ? "다른 이미지 넣기" : "이미지 넣기") + "</button>" +
      (curId ? '<button class="btn" style="height:34px" data-act="imgclear" data-hold>비우기</button>' : "") + "</div>" +
    (media.length
      ? '<div class="row" style="gap:8px;align-items:flex-start">' +
        '<span class="lbl" style="width:52px;padding-top:9px">보관함</span>' +
        '<div class="thumbs grow">' + thumbs + "</div></div>"
      : "") +
    (!isAv && curId
      ? '<div class="row"><span class="lbl" style="width:52px">세로 ' + (IMG_FIT.indexOf(b.type) >= 0 ? "초점" : "위치") + "</span>" +
        '<input type="range" min="' + (IMG_FIT.indexOf(b.type) >= 0 ? IMG_POS[0] : 0) + '" max="' + (IMG_FIT.indexOf(b.type) >= 0 ? IMG_POS[1] : 100) + '" step="1" value="' + (b.imgY == null ? 50 : b.imgY) + '" data-act="imgy" />' +
        '<span class="mono" data-live="%" style="font-size:11px;color:#6a6a68;width:34px;text-align:right">' + (b.imgY == null ? 50 : b.imgY) + "%</span>" +
        '<button class="btn" style="width:52px;height:30px;font-size:10.5px;color:#6a6a68;padding:0" data-act="imgymid" data-hold>가운데</button></div>'
      : "") +
    (curId && IMG_FIT.indexOf(b.type) >= 0 ? imgFitHTML(b) : "") +
    (!curId && b.type === "photo" ? imgFitHTML(b).split('<div class="row"><span class="lbl" style="width:52px">가로 초점')[0] : "") +
    (curId
      ? '<div class="row" style="gap:8px"><span class="lbl" style="width:52px"></span>' +
        '<button class="btn grow' + (b.imgHide ? " on" : "") + '" style="height:34px;font-size:11px" data-act="imghide" data-hold>' +
        (b.imgHide ? "편집 중에는 가리는 중 · 내보내면 원본" : "편집 중에만 가리기") + "</button></div>"
      : "") +
    (isAv
      ? '<p class="note" style="margin:0">' +
        (who ? "‘" + esc(who) + "’ 인물의 얼굴로 저장됩니다 · 이름이 같은 아바타는 같은 얼굴을 씁니다."
             : "이름을 채우면 그 인물의 얼굴로 저장되어 같은 이름의 아바타에 함께 걸립니다.") + "</p>"
      : "") + "</div>";
}

const r1 = (v) => Math.round(v * 10) / 10;
const clampN = (v, a, b) => Math.max(a, Math.min(b, v));
const BODY_PX = () => TYPES.body.fs * pxK();
const TEXTW_MIN = 40;
const textWNow = () => Math.max(TEXTW_MIN, Math.min(100, Math.round(+S.textW) || 100));
const NUMS = {
  fs: {
    get: () => S.fsUnit === "px" ? r1(BODY_PX() * S.scale) : Math.round(S.scale / sBase() * 100),
    lim: () => S.fsUnit === "px" ? [0.1, Infinity] : [1, Infinity],
    set: (v) => ({ scale: Math.round((S.fsUnit === "px" ? v / BODY_PX() : v / 100 * sBase()) * 1000) / 1000, fit: 1 })
  },
  ls:  { get: () => spacingOf("ls").toFixed(2), lim: () => [-Infinity, Infinity], apply: (v, quiet) => setSpacing("ls", () => Math.round(v * 100) / 100, quiet) },
  lh:  { get: () => Math.round(spacingOf("lh") * 100), lim: () => [1, Infinity], apply: (v, quiet) => setSpacing("lh", () => Math.round(v) / 100, quiet) },
  w:   { get: () => autoW(), lim: () => [AUTO_W_MIN, AUTO_W_MAX], set: (v) => ({ cardW: Math.round(v), fit: 1 }) },
  amin: { get: () => S.autoMinH || S.autoH || "", lim: () => [AUTO_MIN, autoMax()], set: (v) => ({ autoMinH: Math.round(v), fit: 1 }) },
  pad: { get: () => S.padX, lim: () => [10, 56], set: (v) => ({ padX: Math.round(v), fit: 1 }) },
  cw:  { get: () => Math.round(cwK() * 100), lim: () => [50, 150], set: (v) => ({ cw: Math.round(v), fit: 1 }) },
  pady: { get: () => padYOf(), lim: () => [PADY_MIN, PADY_MAX], set: (v) => ({ padY: Math.round(v), fit: 1 }) },
  colgap: { get: () => colGapOf(), lim: () => [COLGAP_MIN, COLGAP_MAX], set: (v) => ({ colGap: Math.round(v), fit: 1 }) },
  bgap: {
    get: () => { const b = cur(), v = b && b.gapA ? b.gapA : 0; return (v > 0 ? "+" : "") + v; },
    lim: () => [-S.gap, 60],
    apply: (v, quiet) => setBlockGap(() => Math.round(v), quiet)
  },
  bgapb: {
    get: () => { const b = cur(), v = b && b.gapB ? b.gapB : 0; return (v > 0 ? "+" : "") + v; },
    lim: () => [-S.gap, 60],
    apply: (v, quiet) => setBlockGap(() => Math.round(v), quiet, "gapB")
  },
  gap: { get: () => S.gap, lim: () => [2, 30], set: (v) => ({ gap: Math.round(v), fit: 1 }) },
  textw: { get: () => textWNow(), lim: () => [TEXTW_MIN, 100], set: (v) => ({ textW: Math.round(v), fit: 1 }) },
  rw:  { get: () => ratioNum(cardWH()[0]), lim: () => [0.1, 100], apply: (v, quiet) => setCardRatio(v, null, quiet) },
  rh:  { get: () => ratioNum(cardWH()[1]), lim: () => [0.1, 100], apply: (v, quiet) => setCardRatio(null, v, quiet) },
  irw: { get: () => ratioNum(imgWH()[0]), lim: () => [0.1, 100], apply: (v, quiet) => setImgRatio(v, null, quiet) },
  irh: { get: () => ratioNum(imgWH()[1]), lim: () => [0.1, 100], apply: (v, quiet) => setImgRatio(null, v, quiet) },
  nx: { get: () => { const b = cur(), v = b && b.nx || 0; return (v > 0 ? "+" : "") + v; }, lim: () => [-400, 400], apply: (v, quiet) => nudgeTo("nx", v, quiet) },
  ny: { get: () => { const b = cur(), v = b && b.ny || 0; return (v > 0 ? "+" : "") + v; }, lim: () => [-400, 400], apply: (v, quiet) => nudgeTo("ny", v, quiet) },
  alpha: { get: () => Math.round(curAlpha() * 100), lim: () => [5, 100] },
  sel: { get: () => selSizeHint(), lim: () => [1, Infinity] }
};
const cardWH = () => ratioWH(S.ratio) || [4, 5];
const imgWH = () => { const b = cur(); return ratioWH(arKey(b && b.ar)) || [16, 9]; };
function ratioPair(a, b, wh) {
  if (a == null) {
    const nb = b, na = Math.min(nb * RATIO_LIM, Math.max(nb / RATIO_LIM, wh[0]));
    if (na !== wh[0]) flash("가로·세로는 " + RATIO_LIM + "배 차이까지예요 · 가로 → " + ratioNum(na));
    return [na, nb];
  }
  const na = a, nb = Math.min(na * RATIO_LIM, Math.max(na / RATIO_LIM, wh[1]));
  if (nb !== wh[1]) flash("가로·세로는 " + RATIO_LIM + "배 차이까지예요 · 세로 → " + ratioNum(nb));
  return [na, nb];
}
function setCardRatio(a, b, quiet) {
  const ab = ratioPair(a, b, cardWH()), r = ratioKey(ab[0], ab[1], CARD_RATIOS);
  if (!ratioWH(r)) { if (!quiet) render(); return; }
  const next = { ratio: r, page: 0, fit: 1 };
  if (quiet) Object.assign(S, next); else set(next);
}
function setImgRatio(a, b, quiet) {
  const bl = cur();
  if (!bl) return;
  const ab = ratioPair(a, b, imgWH()), r = ratioKey(ab[0], ab[1], Object.keys(SCENE_AR));
  if (!ratioWH(r)) { if (!quiet) render(); return; }
  snap(true);
  bl.ar = r;
  if (quiet) { S.blocks = S.blocks.slice(); S.fit = 1; } else set({ blocks: S.blocks.slice(), fit: 1 });
}
function arCustomRow(kw, kh, square) {
  const flip = kw === "rw" ? "ratioflip" : "arflip";
  return '<div class="row arrow"><span class="lbl" style="width:52px">직접</span>' +
    numFld(kw, "", "가로 비율") + '<span class="ar-colon" aria-hidden="true">:</span>' + numFld(kh, "", "세로 비율") +
    '<button class="btn ar-flip" data-act="' + flip + '" data-hold' + (square ? " disabled" : "") +
      ' title="가로세로 바꾸기" aria-label="가로세로 바꾸기">' + ic("swap", 14) + "<span>가로세로</span></button></div>";
}
function numFld(k, unit, label, unitAct) {
  const lim = NUMS[k].lim();
  return '<label class="numfld' + (unitAct ? " has-unit-btn" : "") + '">' +
    '<input data-num="' + k + '" value="' + NUMS[k].get() + '" aria-label="' + label + (isFinite(lim[0]) && isFinite(lim[1]) ? " (" + lim[0] + "~" + lim[1] + unit + ")" : "") + '"' +
      ' inputmode="' + (lim[0] < 0 ? "text" : "decimal") + '" enterkeyhint="done" autocomplete="off" spellcheck="false"' +
      (k === "sel" ? ' placeholder="—" data-cur="' + NUMS.sel.get() + '"' : "") + " />" +
    (unitAct
      ? '<button type="button" class="unit" data-act="' + unitAct + '" data-hold title="단위 바꾸기">' + unit + "<i>" + ic("swap", 11) + "</i></button>"
      : '<span class="unit">' + unit + "</span>") +
    "</label>";
}
function commitNum(inp, quiet) {
  if (!inp || inp.dataset.done) return;
  inp.dataset.done = "1";
  const k = inp.dataset.num, spec = NUMS[k];
  const raw = String(inp.value).trim().replace(/,/g, ".").replace(/[^\d.+-]/g, "");
  const v = parseFloat(raw);
  if (!raw || !isFinite(v)) {
    if (k !== "sel" && String(inp.value).trim()) flash("숫자만 적어 주세요");
    if (!quiet) render();
    return;
  }
  const lim = spec.lim(), c = clampN(v, lim[0], lim[1]);
  if (c !== v) flash(isFinite(lim[1]) ? lim[0] + " ~ " + lim[1] + " 사이로 맞췄습니다" : lim[0] + " 이상으로 맞췄습니다");
  if (k === "alpha") {
    S.calpha = Object.assign({}, S.calpha, { [S.target]: Math.round(c) / 100 });
    saveCustom();
    if (!applyAlpha(true)) flash("다음에 칠할 때 이 투명도로 칠합니다");
    render();
    return;
  }
  if (k === "sel") {
    if (Math.round(c) === +inp.dataset.cur) { if (!quiet) render(); return; }
    const run = () => setSelSize(c);
    if (curScope() === "word" && useSelForFormat()) run();
    else if (!wholeBlocks(scopeIds(), run)) flash("먼저 카드에서 블록을 골라 주세요");
    render();
    return;
  }
  if (spec.apply) { spec.apply(c, quiet); return; }
  const next = spec.set(c);
  if (quiet) Object.assign(S, next);
  else set(next);
}
const spacingBlockMode = () => curScope() !== "all";
const SP_DEF = { ls: 0, lh: 1 };
function setBlockGap(fn, quiet, k) {
  k = k || "gapA";
  const ids = tgtIds();
  if (!ids.length) return;
  snap(true);
  const blocks = S.blocks.map(b => {
    if (ids.indexOf(b.id) < 0) return b;
    const nb = Object.assign({}, b);
    const v = clampN(fn(nb[k] || 0), -S.gap, 60);
    if (v) nb[k] = v; else delete nb[k];
    return nb;
  });
  if (quiet) { S.blocks = blocks; S.fit = 1; return; }
  set({ blocks: blocks, fit: 1 });
}
function spacingRef() {
  const ids = selectedBlockIds();
  return S.blocks.find(b => b.id === ids[0]) || cur();
}
function selLSNow() {
  const sel = window.getSelection();
  const n = sel && sel.rangeCount ? firstTextParent(sel.getRangeAt(0)) : null;
  if (!n) return 0;
  const cs = getComputedStyle(n), fsz = parseFloat(cs.fontSize) || 1;
  return cs.letterSpacing === "normal" ? 0 : Math.round(parseFloat(cs.letterSpacing) / fsz * 100) / 100;
}
function stripLS(root) {
  root.querySelectorAll('[style*="letter-spacing"]').forEach(n => {
    n.style.letterSpacing = "";
    if (n.tagName === "SPAN" && !(n.getAttribute("style") || "").trim() && n.attributes.length === 1) {
      while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
      n.remove();
    }
  });
}
function setSelLS(fn) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) { flash("카드에서 글자를 드래그해 골라 주세요"); return; }
  const v = Math.round(fn(selLSNow()) * 100) / 100;
  const r = sel.getRangeAt(0), n = firstTextParent(r);
  const sp = n && n.closest ? n.closest('span[style*="letter-spacing"]') : null;
  const host = sp && sp.closest("[contenteditable]");
  if (sp && host && host !== sp && r.toString() && sp.textContent === r.toString()) {
    snap(true);
    sp.style.letterSpacing = v + "em";
    stripLS(sp);
    saveHost(host); syncFromSelection(); measure(); refreshPanel();
    return;
  }
  wrapSel({ letterSpacing: v + "em" }, stripLS);
  const h = sel.rangeCount && firstTextParent(sel.getRangeAt(0));
  const hh = h && h.closest ? h.closest("[contenteditable][data-id]") : null;
  if (hh) saveHost(hh);
  refreshPanel();
}
function selFwNow() {
  const r = textSelRange(), n = r ? firstTextParent(r) : null;
  const host = n && n.closest ? n.closest("[contenteditable][data-id]") : null;
  let w = 0;
  for (let e = n; e && host && e !== host; e = e.parentElement) if (e.style && e.style.fontWeight) { w = parseInt(e.style.fontWeight, 10) || 0; break; }
  const fa = n ? famAtNode(n) : null;
  return { w: w, k: (fa && fa.k) || (cur() && cur().fam) || S.famKey };
}
function stripFW(root) {
  root.querySelectorAll('[style*="font-weight"]').forEach(n => {
    n.style.fontWeight = "";
    if (n.tagName === "SPAN" && !(n.getAttribute("style") || "").trim() && n.attributes.length === 1) {
      while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
      n.remove();
    }
  });
}
function fwRowHTML(scope) {
  let k = S.famKey, now = 0, legacy = 0, def = "기본", defSub = "종류별";
  if (scope === "all") {
    if (S.fw >= 100) now = snapW(fontOf(k), S.fw); else legacy = S.fw | 0;
  } else if (scope === "block") {
    const bs = selectedBlockIds().map(id => S.blocks.find(x => x.id === id)).filter(Boolean);
    k = (bs[0] && bs[0].fam) || S.famKey;
    const vs = new Set(bs.map(x => x.fw >= 100 ? snapW(fontOf(k), x.fw) : 0));
    now = vs.size === 1 ? [...vs][0] : -1;
    def = "카드대로"; defSub = S.fw >= 100 ? String(snapW(fontOf(S.famKey), S.fw)) : "기본";
  } else {
    const sw = selFwNow();
    k = sw.k; now = sw.w ? snapW(fontOf(k), sw.w) : 0;
    def = "블록대로"; defSub = "";
  }
  const f = fontOf(k), ws = wsOf(f);
  const chip = (v, top, sub) => {
    const on = now === v;
    return '<button class="btn fwchip' + (on ? " fill" : "") + '" data-act="fwv" data-v="' + v + '" data-hold aria-pressed="' + on + '"' +
      ' title="' + (v ? FW_NAME[v] ? FW_NAME[v] + " · " + v : v : def) + '"><span' + (v ? ' style="font-weight:' + v + '"' : "") + ">" + top + "</span>" +
      (sub ? '<small class="mono">' + sub + "</small>" : "") + "</button>";
  };
  const chips = [chip(0, def, defSub)].concat(ws.map(v => chip(v, FW_NAME[v] || String(v), String(v))));
  return '<div class="row fwrow"><span class="lbl" style="width:52px">굵기</span>' +
      '<div class="fwgrid grow" role="group" aria-label="굵기 · ' + esc(f.n) + '" style="grid-template-columns:repeat(' + Math.min(5, chips.length) + ',minmax(0,1fr))">' + chips.join("") + "</div></div>" +
    (ws.length <= 1 ? '<p class="note" style="margin:-4px 0 0 62px">이 글꼴(' + esc(f.n) + ")은 굵기가 하나뿐이에요 · 굵게(B)는 기기가 흉내 내요</p>"
      : legacy ? '<p class="note" style="margin:-4px 0 0 62px">예전 설정 ‘한 단계 ' + (legacy > 0 ? "굵게" : "가늘게") + "’가 걸려 있어요 · 칩을 누르면 그 굵기로</p>"
      : '<p class="note" style="margin:-4px 0 0 62px">이 글꼴(' + esc(f.n) + ")이 가진 굵기 " + ws.length + "가지" + (scope === "all" ? " · 제목처럼 원래 굵은 블록은 그보다 굵게" : "") + "</p>");
}
function setFwv(v) {
  const scope = curScope();
  if (scope === "all") { set({ fw: v, fit: 1 }); return; }
  if (scope === "block") {
    const ids = selectedBlockIds();
    if (!ids.length) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
    snap(true);
    set({ blocks: S.blocks.map(b => {
      if (ids.indexOf(b.id) < 0) return b;
      const nb = Object.assign({}, b);
      if (v) nb.fw = v; else delete nb.fw;
      return nb;
    }), fit: 1 });
    return;
  }
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) { flash("카드에서 글자를 드래그해 골라 주세요"); return; }
  const r = sel.getRangeAt(0), n = firstTextParent(r);
  const sp = n && n.closest ? n.closest('span[style*="font-weight"]') : null;
  const host = sp && sp.closest("[contenteditable]");
  if (v) needW(fontOf(selFwNow().k), v);
  if (sp && host && host !== sp && r.toString() && sp.textContent === r.toString()) {
    snap(true);
    sp.style.fontWeight = v ? String(v) : "";
    stripFW(sp);
    saveHost(host); syncFromSelection(); measure(); refreshPanel();
    return;
  }
  wrapSel({ fontWeight: v ? String(v) : "" }, stripFW);
  const h = sel.rangeCount && firstTextParent(sel.getRangeAt(0));
  const hh = h && h.closest ? h.closest("[contenteditable][data-id]") : null;
  if (hh) saveHost(hh);
  refreshPanel();
}
function spacingOf(k) {
  if (k === "ls" && curScope() === "word") return selLSNow();
  if (!spacingBlockMode()) return S[k];
  const b = spacingRef();
  return b && b[k] != null ? b[k] : SP_DEF[k];
}
function setSpacing(k, fn, quiet) {
  if (k === "ls" && (curScope() === "word" || (useStash() && curScope() === "word"))) { setSelLS(fn); return; }
  if (!spacingBlockMode()) {
    const next = { [k]: fn(S[k]), fit: 1 };
    if (quiet) Object.assign(S, next); else set(next);
    return;
  }
  const ids = selectedBlockIds();
  if (!ids.length) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
  snap(true);
  const blocks = S.blocks.map(b => {
    if (ids.indexOf(b.id) < 0) return b;
    const nb = Object.assign({}, b);
    const v = fn(b[k] != null ? b[k] : SP_DEF[k]);
    if (v === SP_DEF[k]) delete nb[k]; else nb[k] = v;
    return nb;
  });
  if (quiet) { S.blocks = blocks; S.fit = 1; return; }
  set({ blocks: blocks, fit: 1 });
}
function selSizeHint() {
  const sel = window.getSelection();
  const tr = textSelRange();
  let n = tr ? firstTextParent(tr) : null;
  if (!n) { const b = cur(); n = b && els[b.id] ? firstTextIn(els[b.id].querySelector('.ce[data-k="0"]')) : null; }
  void sel;
  if (!n || !n.isConnected || !n.closest || !n.closest(".card")) return "";
  return String(Math.round(parseFloat(getComputedStyle(n).fontSize) * pxK()));
}
function firstTextIn(host) {
  if (!host) return null;
  const w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  let t;
  while ((t = w.nextNode())) if (t.data.trim()) return t.parentElement;
  return host;
}
function sizeChanged() {
  if (curScope() === "word") {
    const tr = textSelRange(), n = tr ? firstTextParent(tr) : null;
    const host = n && n.closest ? n.closest("[contenteditable]") : null;
    return !!(host && n !== host && n.closest('[style*="font-size"]') && host.contains(n.closest('[style*="font-size"]')));
  }
  return selectedBlockIds().some(id => !!app.querySelector('.card [contenteditable][data-id="' + id + '"] [style*="font-size"]'));
}
const FS_STEPS = [16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96, 112, 128, 144, 160, 176, 192];
const FS_GLYPH = () => ['<span class="fsg s">가</span>', '<span class="fsg l">가</span>', "작게 (" + KB("Shift+<") + ")", "크게 (" + KB("Shift+>") + ")"];

function resetBtn(act, changed) {
  return '<button class="resetlink" data-act="' + act + '" data-hold' + (changed ? ' title="기본값으로"' : " disabled") + ">기본</button>";
}
function stepRow(label, down, up, text, changed, reset, num, glyph) {
  const g = glyph || ["−", "+"];
  return '<div class="row"><span class="lbl" style="width:52px">' + label + "</span>" +
    '<div class="stepper grow' + (glyph ? " st-glyph" : "") + '">' +
      '<button class="st-btn" data-act="' + down + '" data-hold aria-label="' + label + ' 줄이기"' + (g[2] ? ' title="' + g[2] + '"' : "") + ">" + g[0] + "</button>" +
      (num
        ? '<span class="st-val">' + numFld(num[0], num[1], label, num[2]) + "</span>"
        : '<span class="st-val mono">' + text + "</span>") +
      '<button class="st-btn" data-act="' + up + '" data-hold aria-label="' + label + ' 늘리기"' + (g[3] ? ' title="' + g[3] + '"' : "") + ">" + g[1] + "</button>" +
    "</div>" +
    (reset ? resetBtn(reset, changed) : '<span class="resetlink" aria-hidden="true"></span>') + "</div>";
}

const linkedRow = (html, linked) => linked ? html.replace('<span class="st-val">', '<span class="st-val linked">') : html;
function talkSecHTML() {
  const has = (t) => S.blocks.some(x => x.type === t);
  const seg = (label, k, opts) =>
    '<div class="row"><span class="lbl" style="width:52px">' + label + '</span><div class="seg grow">' +
    opts.map(o => '<button class="' + (S[k] === o[0] ? "on" : "") + '" data-act="talkopt" data-k="' + k + '" data-v="' + o[0] +
      '" data-hold aria-pressed="' + (S[k] === o[0]) + '">' + o[1] + "</button>").join("") + "</div></div>";
  const nb = S.blocks.filter(x => x.type === "bubble" || x.type === "avatar").length;
  const ch = chatOf();
  const avBubOn = has("avatar") && (ch ? !ch.flat : S.avBub);
  const bubAny = has("bubble") || avBubOn;
  return sec("말풍선·아바타 모두", "카드 안 " + nb + "개 전체",
    seg("이름", "bubNoName", [[false, "보이기"], [true, "숨기기"]]) +
    (S.bubNoName ? '<p class="note" style="margin:-4px 0 0 62px">이름은 지우지 않고 가려만 둡니다 · 다시 보이면 그대로 나옵니다</p>' : "") +
    (has("avatar") ? seg("얼굴", "bubNoFace", [[false, "보이기"], [true, "숨기기"]]) : "") +
    (has("avatar") && !ch ? seg("얼굴 옆", "avBub", [[false, "글만"], [true, "말풍선"]]) : "") +
    seg("따옴표", "bubNoQuote", [[false, "그대로"], [true, "숨기기"]]) +
    (S.bubNoQuote
      ? '<p class="note" style="margin:-4px 0 0 62px">앞뒤 「」『』“” 를 뺍니다 · 편집 중엔 흐리게, 미리보기·저장 이미지에선 빠지고 적어 둔 글은 그대로</p>'
      : "") +
    (bubAny ? seg("너비", "bubW", [[60, "좁게"], [76, "기본"], [90, "넓게"]]) : "") +
    (bubAny && !ch ? stepRow("둥글기", "bubrdown", "bubrup", bubRNow() + "px", S.bubR != null, "bubrreset") : "") +
    (bubAny
      ? stepRow("위아래", "bpydown", "bpyup", bubPadV(chatOf())[0] + "px", S.bubPY != null, "bpyreset") +
        stepRow("좌우", "bpxdown", "bpxup", bubPadV(chatOf())[1] + "px", S.bubPX != null, "bpxreset")
      : "") +
    seg("시간", "msgTime", [[false, "끔"], [true, "자동"]]) +
    (S.msgTime
      ? '<div class="row"><span class="lbl" style="width:52px">첫 시각</span><input class="fld grow" type="text" data-sfld="msgT0" value="' + esc(S.msgT0 || "") + '" placeholder="오후 2:14" /></div>' +
        '<p class="note" style="margin:-4px 0 0 62px">말하는 사람이 바뀔 때마다 1분씩 · 같은 사람이 이어 보낸 묶음은 마지막에만 찍혀요 · 블록 \'시간\' 칸에 적으면 그 시각부터 이어 가요</p>'
      : ""));
}

const biGapDef = () => S.blocks.some(b => b.type === "bidialogue") ? 4 : 5;
const biGapNow = () => S.biGap != null ? S.biGap : biGapDef();
function biGapSecHTML() {
  if (!S.blocks.some(b => b.type === "translation" || b.type === "bidialogue")) return "";
  return sec("원문 ↔ 번역", "카드 전체의 번역", stepRow("간격", "bigapdown", "bigapup", biGapNow() + "px", S.biGap != null, "bigapreset"));
}
function dlgStyleSecHTML() {
  const has = (t) => S.blocks.some(b => b.type === t);
  if (!has("dialogue") && !has("bidialogue")) return "";
  const tile = (act, v, on, pv, name) => '<button class="vtile' + (on ? " on" : "") + '" role="radio" aria-checked="' + on + '" data-act="' + act + '" data-v="' + v + '" data-hold>' +
    '<span class="vt-pv dlgpv">' + pv + '</span><span class="vt-n">' + name + "</span></button>";
  const segBtn = (act, v, cur, n) => '<button class="' + (cur === v ? "on" : "") + '" data-act="' + act + '" data-v="' + v + '" data-hold>' + n + "</button>";
  return sec("대사 모양", "카드 전체의 대사",
    '<div class="vpick two" role="radiogroup" aria-label="화자 이름">' +
      tile("dlgname", "label", S.dlgName !== "inline", '<span class="dp-lb">지우</span><span class="dp-tx">「배고픈 건 아니에요.」</span>', "이름 위에 작게") +
      tile("dlgname", "inline", S.dlgName === "inline", '<span class="dp-row"><b>지우</b><span class="dp-tx">「배고픈 건 아니에요.」</span></span>', "이름 앞에 굵게") +
    "</div>" +
    (has("bidialogue")
      ? '<div class="row"><span class="lbl" style="width:52px">기울임</span><div class="seg grow">' +
          segBtn("biital", "auto", S.biItal || "auto", "영문만") + segBtn("biital", "always", S.biItal, "늘") + segBtn("biital", "none", S.biItal, "안 함") + "</div></div>" +
        '<div class="row"><span class="lbl" style="width:52px">크게</span><div class="seg grow">' +
          segBtn("bimain", "orig", S.biMain || "orig", "원문") + segBtn("bimain", "trans", S.biMain, "번역") + "</div></div>" +
        '<p class="note" style="margin:0">번역 대사 · 기울임은 원문에만 걸립니다 — 한글·일본어는 기울임 글자가 없어 억지로 눕혀지므로 \u2018영문만\u2019을 권해요</p>'
      : ""));
}
function sec(title, where, body) {
  return '<div class="sec"><div class="sec-h"><b>' + title + "</b>" + (where ? '<span class="sec-w">' + where + "</span>" : "") + "</div>" + body + "</div>";
}
const adv = (h) => h.replace(/class="sec"/g, 'class="sec adv"');
const QUICK_COLS = ["#111111", "#ffffff", "#8a8a88", "#c0392b", "#2f6fe4", "#e59ab8", "#e6b422"];
function colorRow(label, act, slot, cur, def) {
  const now = normHex(cur) || "";
  const sw = (hex) => '<button class="csw' + (now === hex ? " on" : "") + (hex === "#ffffff" ? " light" : "") + '" style="background:' + hex +
    '" data-act="' + act + '" data-slot="' + slot + '" data-c="' + hex + '" data-hold aria-label="' + hex + '"></button>';
  return '<div class="crow"><span class="lbl">' + label + '</span><div class="crow-sw">' +
    '<button class="csw auto' + (now ? "" : " on") + '" data-act="' + act + '" data-slot="' + slot + '" data-c="" data-hold title="기본 색"' +
      (def ? ' style="--d:' + def + '"' : "") + ">기본</button>" +
    QUICK_COLS.map(sw).join("") +
    '<input type="color" class="tsw csw-pick' + (now && QUICK_COLS.indexOf(now) < 0 ? " on" : "") + '" data-act="' + act + 'c" data-slot="' + slot +
      '" value="' + (now || normHex(def) || "#111111") + '" title="' + label + ' 색 직접 고르기" aria-label="' + label + ' 색 직접 고르기" />' +
    "</div></div>";
}
const SCOPE_NAME = { word: "고른 글자", block: "블록", all: "카드 전체" };

const subOf = (tab, G) => { const k = (S.sub || {})[tab]; return k && G[k] ? k : Object.keys(G).find(x => G[x]); };
function subNavHTML(tab, G) {
  const cur = subOf(tab, G);
  return '<div class="subnav" role="tablist" aria-label="' + tab + ' 묶음">' + Object.keys(G).filter(k => G[k]).map(k =>
    '<button class="' + (k === cur ? "on" : "") + '" role="tab" aria-selected="' + (k === cur) + '" data-act="subtab" data-tab="' + tab + '" data-k="' + k + '" data-hold>' + k + "</button>").join("") + "</div>";
}
function paneHTML(TAB) {
  const b = cur();
  const t = b ? TYPES[b.type] : null;
  const defBtn = (act, changed) => resetBtn(act, changed);

  if (TAB === "블록") {
    const types = (CATS[S.cat] || []).map(k => {
      const on = b && b.type === k;
      return '<button class="btn' + (on ? " fill" : "") + '" style="height:38px" data-act="type" data-t="' + k + '" data-hold>' + TYPES[k].n + "</button>";
    }).join("");
    const content =
      (b && (isMsg(b) || pickedIds().some(id => isMsg(S.blocks.find(x => x.id === id))))
        ? '<div class="row"><span class="lbl" style="width:52px">위치</span><div class="row grow" style="gap:8px">' +
          '<button class="btn wide' + (sideNow(b) === "left" ? " on" : "") + '" data-act="side" data-s="left" data-hold>왼쪽</button>' +
          '<button class="btn wide' + (sideNow(b) === "right" ? " on" : "") + '" data-act="side" data-s="right" data-hold>오른쪽</button></div></div>'
        : "") +
      (b ? (SLOTS[b.type] || []).map(sl =>
        '<div class="row"><span class="lbl" style="width:52px">' + sl.n + "</span>" +
        '<input class="fld grow" type="text" enterkeyhint="done" autocomplete="off" data-fld="' + sl.k + '" value="' + esc(toPlain(txt[key(b.id, sl.k)])) +
        '" placeholder="' + (sl.k === 3 && isMsg(b)
          ? (S.msgTime ? "자동 · " + esc(((msgTimes()[b.id] || {}).t) || "") + " (적으면 그 시각부터)" : "예: 오후 2:14 · 비우면 없음")
          : "비우면 표시하지 않음") + '" /></div>' +
        (sl.k === 3 && isMsg(b) && !S.msgTime
          ? '<div class="row"><span class="lbl" style="width:52px"></span><button class="resetlink linkbtn" data-act="talkopt" data-k="msgTime" data-v="true">모든 메시지에 시간 자동으로 넣기</button></div>'
          : "") +
        (sl.k === NAME_SLOT[b.type] && NAME_SLOT[b.type] > 0 ? nameChipsHTML(b) : "")).join("") : "") +
      (b && isMsg(b) ? picPaneHTML(b) : "") +
      (b && ["avatar", "photo", "track", "book", "notif", "post", "scene"].indexOf(b.type) >= 0 ? imgPaneHTML(b) : "") +
      (b && b.type === "call" ? '<div class="row"><span class="lbl" style="width:52px">종류</span><div class="seg grow">' +
        [["miss", "부재중"], ["in", "받은 전화"], ["out", "건 전화"]].map(o => '<button class="' + ((b.dir || "miss") === o[0] ? "on" : "") + '" data-act="calldir" data-v="' + o[0] + '" data-hold>' + o[1] + "</button>").join("") + "</div></div>" : "") +
      (b && (b.type === "lyric" || b.type === "track" || b.type === "player") ? musicPaneHTML(b) : "") +
      (b && b.type === "avatar" && !S.bubNoFace ? avShapeHTML() : "") +
      (b && b.type === "scene"
        ? '<div class="row"><span class="lbl" style="width:52px">화면</span><div class="seg grow">' +
            [["16:9", "16:9"], ["2.39", "시네마"], ["4:3", "4:3"], ["1:1", "1:1"], ["9:16", "세로"]].map(x => '<button class="' + (arKey(b.ar) === x[0] ? "on" : "") + '" data-act="scenear" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div></div>" +
          arCustomRow("irw", "irh", b.ar === "1:1") +
          '<div class="row"><span class="lbl" style="width:52px">띠</span><div class="seg grow">' +
            LBOX.map(x => '<button class="' + ((b.lb || "") === x[0] ? "on" : "") + '" data-act="scenelb" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div></div>"
        : "") +
      (b && (b.type === "caption" || b.type === "scene")
        ? '<div class="row"><span class="lbl" style="width:52px">모양</span><div class="seg grow">' +
            CAP_STYLES.map(x => '<button class="' + ((S.capSt || "shadow") === x[0] ? "on" : "") + '" data-act="capst" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div></div>" +
          '<div class="row"><span class="lbl" style="width:52px">위치</span><div class="seg grow">' +
            [["bottom", "아래"], ["top", "위"]].map(x => '<button class="' + ((S.capPos || "bottom") === x[0] ? "on" : "") + '" data-act="cappos" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div></div>" +
          '<p class="note" style="margin:-4px 0 0 62px">카드의 자막 모두 · 바탕 사진은 테마 탭 ‘바탕’, 위아래 검은 띠는 판형 탭 ‘레터박스’</p>'
        : "");
    const np = pickedIds().length;
    const ib = (act, icon, title, cls) => '<button class="btn ib' + (cls || "") + '" data-act="' + act + '" data-hold title="' + title + '" aria-label="' + title + '">' + ic(icon, 15) + "</button>";
    const head = (S.pickOn || np)
      ? multiBarHTML(b) +
        (np ? '<div class="row" style="gap:8px"><span class="blockname">고른 블록<span> · ' + np + "개</span></span>" +
          '<button class="btn danger" style="height:34px" data-act="del" data-hold>' + np + "개 지우기</button></div>" : "")
      : '<div class="row blockrow">' +
        '<span class="blockname">' + (t ? t.n : "—") + "<span> · " + (idx() + 1) + " / " + S.blocks.length + "</span></span>" +
        '<button class="btn iconrow" style="height:34px;padding:0 10px;font-size:11.5px" data-act="pickmode" data-hold title="여러 블록을 골라 한꺼번에 · PC: Shift(또는 Ctrl·⌘) 누른 채 블록 누르기">' + ic("check", 14) + " 여러 개</button>" +
        ib("up", "up", "위로") + ib("down", "down", "아래로") + ib("dup", "copy", "복제") + ib("del", "trash", "삭제", " danger") +
      "</div>";
    const G = {
      "내용": content ? sec("내용", "이 블록", content) : "",
      "대화": b && (b.type === "bubble" || b.type === "avatar") ? talkSecHTML() : "",
      "종류":
        (b && !np ? (() => {
          const others = sameTypeOthers(b), on = !!S.brush;
          return '<div class="row" style="gap:8px">' +
            '<button class="btn grow iconrow' + (on ? " on" : "") + '" style="height:36px" data-act="brush" data-hold title="이 블록의 글꼴·정렬·색·간격을 다른 블록에 옮깁니다">' +
              ic("brush", 15) + (on ? " 서식 붙이는 중 · 끝내기" : " 서식 복사") + "</button>" +
            '<button class="btn grow" style="height:36px" data-act="samesync" data-hold' + (others.length ? "" : " disabled") +
              ' title="종류가 같은 블록을 모두 이 블록 모양으로">같은 ' + (t ? t.n : "") + (others.length ? " " + others.length + "개" : "") + "에 맞추기</button></div>";
        })() : "") +
        sec("종류", np ? "고른 " + np + "개" : "이 블록",
          '<div class="seg">' + CAT_KEYS.map(k => '<button class="' + (S.cat === k ? "on" : "") + '" data-act="cat" data-c="' + k + '" data-hold>' + k + "</button>").join("") + "</div>" +
          '<div class="grid3">' + types + "</div>" +
          (S.typeOffer && b && S.typeOffer.id === b.id && S.typeOffer.to === b.type && S.blocks.some(x => x.type === S.typeOffer.from)
            ? '<button class="offer" data-act="typeall" data-hold><span>남은 ' + TYPES[S.typeOffer.from].n + " <b>" +
              S.blocks.filter(x => x.type === S.typeOffer.from).length + "개</b></span><em>모두 " + TYPES[b.type].n + "(으)로 " + ic("next", 13) + "</em></button>"
            : "")) +
        (b && !np && S.typeJust === b.id && content && b.type !== "html" ? '<div class="typejust' + (Date.now() - typeJustAt < 400 ? " fresh" : "") + '">' + sec("내용", TYPES[b.type].n + " · 방금 바꾼 블록", content) + "</div>" : "") +
        (b && b.type === "html"
          ? sec("HTML 코드", "이 블록", '<textarea class="fld html-src" data-hsrc rows="7" spellcheck="false" autocapitalize="off" autocomplete="off" maxlength="' + HTML_MAX + '"' +
              ' placeholder="&lt;div style=&quot;border:1px solid #ccc;padding:12px&quot;&gt;…&lt;/div&gt;" aria-label="HTML 코드">' + esc(b.html || "") + "</textarea>" +
              '<div class="row"><span class="lbl" style="width:52px">크기</span>' +
              '<input type="range" min="30" max="250" step="5" value="' + (b.hz || 100) + '" data-act="htmlz" aria-label="HTML 크기" />' +
              '<span class="mono" data-ui="htmlz" style="font-size:11px;color:#6a6a68;width:40px;text-align:right">' + (b.hz || 100) + "%</span></div>" +
              '<p class="note">style="…" 로 꾸민 모양만 살아요. 스크립트·&lt;style&gt;·바깥 주소의 사진·링크는 빠집니다. 폰 화면 폭(360px)에 맞춰 쓴 코드가 카드 폭에 맞게 줄어요.</p>')
          : "") +
        (b && b.type === "divider"
          ? sec("구분선 모양", "이 블록", '<div class="vpick" role="radiogroup" aria-label="구분선 모양">' + DIVIDERS.map((x, n) => {
              const on = (DIVIDERS.some(d => d.k === b.dv) ? b.dv : "line") === x.k;
              return '<button class="vtile' + (on ? " on" : "") + '" role="radio" aria-checked="' + on + '" data-act="dvstyle" data-v="' + x.k + '" data-hold>' +
                '<span class="vt-pv dv">' + dividerHTML(x.k, "#9a9a98", "#111", 1.25) + "</span>" +
                '<span class="vt-n">' + x.n + (n ? "" : "<em>기본</em>") + "</span></button>";
            }).join("") + "</div>")
          : ""),
      "배치": b
        ? nudgeSecHTML(b) +
          sec("배치 조정", pickedIds().length > 1 ? "담은 블록 " + pickedIds().length + "개" : "이 블록",
            '<div class="row"><span class="lbl" style="width:52px">고정</span><div class="seg grow">' +
              [["", "안 함"], ["top", "모든 장 위"], ["bottom", "모든 장 아래"]].map(x =>
                '<button class="' + ((b.pin || "") === x[0] ? "on" : "") + '" data-act="pin" data-p="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") +
            "</div></div>" +
            (b.pin && (S.flow !== "pages" || S.ratio === "auto")
              ? '<p class="note" style="margin:-4px 0 0 62px">고정은 판형 탭 ‘비율’의 ‘여러 장’(자동 비율 제외)일 때 걸립니다</p>'
              : "") +
            vertRowHTML()) +
          brkSecHTML(b) +
          sec("블록 간격 조정", S.gapScope === "all" ? "카드 전체" : pickedIds().length > 1 ? "담은 블록 " + pickedIds().length + "개" : "이 블록",
            '<div class="row"><span class="lbl" style="width:52px">대상</span><div class="seg grow">' +
              [["block", pickedIds().length > 1 ? "담은 블록" : "이 블록"], ["all", "카드 전체"]].map(x =>
                '<button class="' + ((S.gapScope === "all" ? "all" : "block") === x[0] ? "on" : "") + '" data-act="gapscope" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") +
            "</div></div>" +
            (S.gapScope === "all"
              ? stepRow("간격", "gapdown", "gapup", "", S.gap !== S0.gap, "gapreset", ["gap", "px"])
              : stepRow("위 간격", "bgapdown", "bgapup", "", !!b.gapA, "bgapreset", ["bgap", "px"]) +
                stepRow("아래 간격", "bgapbdown", "bgapbup", "", !!b.gapB, "bgapbreset", ["bgapb", "px"]) +
                '<p class="note" style="margin:-4px 0 0 62px">카드 전체 간격 ' + S.gap + "px 에 더하거나 뺍니다</p>"))
        : "",
    };
    return '<div class="stack"><div class="panehead">' + head + subNavHTML("블록", G) + "</div>" + (G[subOf("블록", G)] || "") +
      '<button class="btn fill tall" data-act="add" data-hold>＋ 아래에 블록 추가</button></div>';
  }

  if (TAB === "글자") {
    loadFontPreviews();
    const scope = curScope();
    const nIds = selectedBlockIds().length;
    const scopeName = scope === "word" ? "고른 글자" : scope === "all" ? "카드 전체"
      : (pickedIds().length ? "담은 블록 " + nIds + "개" : (nIds > 1 ? "훑은 블록 " + nIds + "개" : "이 블록 전체"));
    const curAlign = b ? (b.align || (t && t.al) || "left") : "left";
    const alignBtn = (a, label, tip) => '<button class="btn wide albtn' + (curAlign === a ? " on" : "") + '" data-act="align" data-a="' + a + '" data-hold' +
      ' aria-pressed="' + (curAlign === a) + '" title="' + (tip || label + " 정렬") + '">' + ic("al" + a, 18) + "<span>" + label + "</span></button>";
    const pickRow =
      '<div class="row" style="gap:8px">' +
        '<button class="btn grow' + (S.pickOn ? " on" : "") + '" style="height:34px;font-size:11px" data-act="pickmode" data-hold>' +
          (S.pickOn ? "탭으로 담는 중 · 눌러서 끝내기" : "탭으로 여러 블록 담기") + "</button>" +
        (pickedIds().length ? '<button class="btn" style="height:34px;font-size:11px" data-act="pickclear" data-hold>지우기</button>' : "") +
      "</div>" +
      '<p class="note" style="margin:0">' +
        (pickedIds().length
          ? "담은 블록 " + pickedIds().length + "개에 걸립니다 · 다시 탭하면 빠집니다."
          : "카드에서 고른 블록에 걸립니다 · 여러 블록은 Shift 누른 채 누르거나, 드래그로 훑거나, 위 단추를 켜고 탭해서 담으세요.") + "</p>";
    const sizeBody = scope !== "all"
      ? stepRow("크기", "smaller", "bigger", "", sizeChanged(), "sizedef", ["sel", "px"], FS_GLYPH()) +
        fwRowHTML(scope) +
        stepRow("자간", "lsdown", "lsup", "", spacingOf("ls") !== 0, "lsreset", ["ls", "em"]) +
        stepRow("행간", "lhdown", "lhup", "", spacingOf("lh") !== 1, "lhreset", ["lh", "%"]) +
        '<p class="note" style="margin:-4px 0 0 62px">크기는 저장 이미지 기준 px · ' + (scope === "word" ? "자간은 고른 글자에만 · 행간은 글자가 든 블록 전체에 걸립니다 · " : "") + "카드 전체 값 위에 더해집니다 · 카드 전체 크기(%)는 적용을 ‘카드 전체’로</p>"
      : (scope === "all"
          ? stepRow("크기", "scaledown", "scaleup", "", Math.abs(S.scale - sBase()) > 0.001, "scaledef", ["fs", S.fsUnit === "px" ? "px" : "%", "fsunit"], FS_GLYPH()) +
            '<p class="note" style="margin:-4px 0 0 62px">' + (S.fsUnit === "px" ? "서술 글자가 저장 이미지에 찍히는 크기 · 제목·부제는 같은 비율로"
              : "템플릿 크기 = 100% · 지금 서술 글자 " + Math.round(BODY_PX() * S.scale) + "px(저장 이미지 기준) · 단위를 누르면 px 로") + "</p>" +
            fwRowHTML(scope)
          : "") +
        stepRow("자간", "lsdown", "lsup", "", spacingOf("ls") !== 0, "lsreset", ["ls", "em"]) +
        stepRow("행간", "lhdown", "lhup", "", spacingOf("lh") !== 1, "lhreset", ["lh", "%"]);
    const famHere = scope !== "all" && b && caretFam && (caretFam.id === b.id || caretFam.mixed) ? caretFam : null;
    const famMixed = !!(famHere && famHere.mixed);
    const shownKey = famMixed ? "" : famHere ? famHere.k : (scope !== "all" && b) ? (b.fam || S.famKey) : S.famKey;
    if (shownKey && shownKey !== lastShownFam) {
      lastShownFam = shownKey;
      const sf = fontOf(shownKey);
      if (!inFontCat(sf, S.fontCat)) S.fontCat = sf.c;
    }
    const hl = S.jaOnly ? (S.hanLang || "") : "";
    const fontShown = (x) => !x.hide && (!S.jaOnly || hanIn(x, hl));
    const list = FONTS.filter(x => fontShown(x) && inFontCat(x, S.fontCat));
    const fontBody =
      (famMixed ? '<p class="note" style="margin:0">고른 글자에 글꼴이 여러 개 섞여 있어요</p>' : "") +
      '<div class="row" style="gap:8px"><div class="seg grow">' +
        FONT_CATS.map(c => '<button class="' + (S.fontCat === c ? "on" : "") + (S.jaOnly && !FONTS.some(x => fontShown(x) && inFontCat(x, c)) ? " none" : "") +
          '" data-act="fontcat" data-fc="' + c + '" data-hold>' + (FONT_CAT_NAME[c] || c) + "</button>").join("") +
        "</div>" +
        '<button class="btn' + (S.jaOnly ? " fill" : "") + '" style="height:32px;font-size:11px;padding:0 10px" data-act="jaonly" data-hold aria-pressed="' + !!S.jaOnly + '" title="일본어·중국어 한자가 되는 글꼴만 보기">日中 한자</button>' +
        (scope === "all" ? defBtn("famdef", fontOf(S.famKey).k !== S0.famKey) : "") + "</div>" +
      (S.jaOnly
        ? '<div class="seg hanlang" role="group" aria-label="한자 글꼴 언어">' + HAN_LANGS.map(p =>
            '<button class="' + (hl === p[0] ? "on" : "") + '" data-act="hanlang" data-v="' + p[0] + '" data-hold aria-pressed="' + (hl === p[0]) + '">' + p[1] + "</button>").join("") + "</div>"
        : "") +
      (list.length
        ? '<div class="fontgrid">' + list.map(x =>
            '<button class="btn fontchip' + (shownKey && fontOf(shownKey).k === x.k ? " fill" : "") +
            '" data-act="fam" data-f="' + x.k + '" data-hold title="' + esc(x.f) + " · " +
            (x.h ? HAN_NAME[x.h] + "·영문 · 한글은 " + fontOf(x.kb).n : x.j === 2 ? "한글·영문·일본어(가나+한자)" : x.j === 1 ? "한글·영문·일본어(가나만, 한자 없음)" : "한글·영문") + '"' +
            ' style="font-family:' + esc(fontStack(x.k)) + '">' + x.n + hanBadge(x) + "</button>").join("") + "</div>"
        : '<p class="note" style="margin:0">이 분류에는 ' + (hl ? HAN_LANGS.find(p => p[0] === hl)[1] : "일본어·중국어 한자가 되는") + " 글꼴이 없습니다 — 진한 분류 탭을 눌러 보세요</p>") +
      (scope === "block" && b && b.fam
        ? '<button class="btn" style="height:34px;font-size:11px" data-act="famclear" data-hold>이 블록 글꼴을 카드 글꼴로 · 지금 ' + esc(fontOf(b.fam).n) + "</button>"
        : "") +
      '<p class="note ja-legend" style="margin:0"><i class="jb full">日</i> 일본어 한자까지 <i class="jb">日</i> 가나만 <i class="jb full">简</i> 중국어 간체 <i class="jb full">繁</i> 번체</p>' +
      (scope === "word" ? '<p class="note" style="margin:0">고른 글자의 글꼴을 되돌리려면 위 ‘지우기’를 누르세요</p>' : "");
    const autoOn = S.famScope !== "all";
    const G = {};
    G["모양"] =
      sec("모양", scopeName,
        '<div class="fmtbar">' +
          '<button class="btn" style="font-size:15px;font-weight:700" data-act="bold" data-hold title="굵게 (' + KB("B") + ')">B</button>' +
          '<button class="btn" style="font-size:15px;font-style:italic" data-act="italic" data-hold title="기울임 (' + KB("I") + ')">I</button>' +
          '<button class="btn" style="font-size:15px;text-decoration:underline" data-act="underline" data-hold title="밑줄 (' + KB("U") + ')">U</button>' +
          '<button class="btn" style="font-size:15px;text-decoration:line-through" data-act="strike" data-hold title="취소선 (' + KB("Shift+X") + ')" aria-label="취소선">S</button>' +
          '<button class="btn qbtn' + (qPickOpen ? " open" : "") + '" data-act="quote" data-hold title="따옴표 씌우기·벗기기 · 길게 누르면 모양 고르기" aria-label="따옴표 씌우기" aria-expanded="' + qPickOpen + '">' +
            '<span class="qg">' + (S.qStyle || Q_STYLES[0]).split("").join('<i></i>') + "</span></button>" +
          '<button class="btn" style="flex:1.4;font-size:11px;color:#6a6a68" data-act="clearfmt" data-hold title="서식 지우기 (' + KB("\\") + ')">지우기</button>' +
        "</div>" +
        (qPickOpen
          ? '<div class="qpick"><span class="lbl">따옴표 모양</span><div class="seg grow">' +
            Q_STYLES.map(x => '<button class="' + ((S.qStyle || Q_STYLES[0]) === x ? "on" : "") + '" data-act="quotepick" data-q="' + x + '" data-hold>' +
              x.split("").join("<i></i>") + "</button>").join("") + "</div></div>"
          : "")) +
      sec("정렬", "이 블록", '<div class="row" style="gap:8px">' +
        alignBtn("left", "왼쪽", "왼쪽 정렬 (" + KB("Shift+L") + ")") + alignBtn("center", "가운데", "가운데 정렬 (" + KB("Shift+E") + ")") +
        alignBtn("right", "오른쪽", "오른쪽 정렬 (" + KB("Shift+R") + ")") +
        alignBtn("justify", "양쪽", "양쪽 정렬 · 마지막 줄은 왼쪽 (" + KB("Shift+J") + ")") + alignBtn("distribute", "배분", "배분 정렬 · 마지막 줄까지 양끝") + "</div>") +
      dlgStyleSecHTML() +
      biGapSecHTML() +
      adv(sec("적용 대상", "",
        '<div class="seg scope">' +
          '<button class="' + (autoOn ? "on" : "") + '" data-act="famscope" data-fs="auto" data-hold>' +
            (autoOn ? '<span class="scope-dot"></span>' + scopeName : "고른 곳") + "</button>" +
          '<button class="' + (autoOn ? "" : "on") + '" data-act="famscope" data-fs="all" data-hold>카드 전체</button></div>' +
        (autoOn
          ? '<p class="note" style="margin:0">블록을 누르면 블록 전체, 글자를 드래그하면 그 글자에만 걸립니다</p>' + pickRow
          : '<p class="note" style="margin:0">모든 블록에 한꺼번에 걸립니다 · 블록마다 하려면 \u2018고른 곳\u2019</p>'))) +
      "";
    G["꾸미기"] = sec("글자 꾸미기", scopeName, decoPaneHTML(b, scope));
    G["크기"] =
      sec("크기·간격", scopeName, sizeBody) +
      adv(sec("줄바꿈", "카드 전체", '<div class="vpick two" role="radiogroup" aria-label="줄바꿈">' +
        [["keep-all", "단어 단위", "<i>밤하늘을</i><i><mark>올려다보았다</mark></i>"], ["normal", "글자 단위", "<i>밤하늘을 <mark>올</mark></i><i><mark>려다보았다</mark></i>"]].map((x, n) => {
          const on = (WRAP_KEYS.indexOf(S.wordBreak) >= 0 ? S.wordBreak : "keep-all") === x[0];
          return '<button class="vtile' + (on ? " on" : "") + '" role="radio" aria-checked="' + on + '" data-act="wordbreak" data-v="' + x[0] + '" data-hold>' +
            '<span class="vt-pv wb"><span class="wb-col">' + x[2] + "</span></span>" +
            '<span class="vt-n">' + x[1] + (n ? "" : "<em>기본</em>") + "</span></button>";
        }).join("") + "</div>" +
        '<p class="note" style="margin:0">' + (S.wordBreak === "normal"
          ? "줄 끝까지 채우고, 낱말이 두 줄로 갈라질 수 있어요"
          : "낱말은 통째로 다음 줄로 넘어가요 · 한 줄보다 긴 주소·영문만 끊어요") + "</p>")) +
      adv(sec("들여쓰기", "카드 전체 · 서술", '<div class="seg" role="radiogroup" aria-label="문단 첫 줄 들여쓰기">' +
        [[0, "없음"], [1, "1자"], [2, "2자"]].map(x => '<button class="' + ((S.indent | 0) === x[0] ? "on" : "") + '" role="radio" aria-checked="' + ((S.indent | 0) === x[0]) +
          '" data-act="indent" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div>" +
        '<p class="note" style="margin:0">서술 블록마다 첫 줄을 들여 씁니다 · 책 본문처럼</p>')) +
      sec("장평", "카드 전체",
        stepRow("장평", "cwdown", "cwup", "", cwK() !== 1, "cwreset", ["cw", "%"]) +
        '<p class="note" style="margin:0">글자 너비만 좁히거나 넓혀요 · 책 조판처럼 90% 안팎이 흔해요</p>') +
      "";
    G["글꼴"] = sec("글꼴", scopeName, fontBody);
    return '<div class="stack"><div class="panehead">' + subNavHTML("글자", G) + scopeBarHTML() + "</div>" + G[subOf("글자", G)] +
      '<p class="note kbhint" style="margin:0">단축키 · 굵게 ' + KB("B") + " · 기울임 " + KB("I") + " · 밑줄 " + KB("U") +
        " · 취소선 " + KB("Shift+X") + " · 크게/작게 " + KB("Shift+>") + " / " + KB("Shift+<") +
        " · 서식 지우기 " + KB("\\") + " · 되돌리기 " + KB("Z") + " · 다시 " + KB("Shift+Z") + "</p></div>";
  }

  if (TAB === "색") {
    const TGT_N = { text: "글자색", hilite: "형광펜" };
    const mk = (hex) => '<button class="swatch' + (hex === "#ffffff" || hex === "#e9e7dd" ? " light" : "") + '" data-act="color" data-hex="' + hex + '" title="' + hex + '" style="background:' + hex + '" data-hold></button>';
    const recents = ((S.recent || {})[S.target] || []);
    const cc = normHex((S.custom || {})[S.target]) || "#111111";
    const sc = curScope(), nIds = selectedBlockIds().length;
    const where = S.target === "bubble" ? "이 말풍선"
      : sc === "word" ? "고른 글자" : sc === "all" ? "카드 전체"
      : (pickedIds().length ? "담은 블록 " + nIds + "개" : (nIds > 1 ? "훑은 블록 " + nIds + "개" : "이 블록 전체"));
    const paint =
      sec("견본", where,
        '<div class="grid8">' + (PALETTES[S.target] || PALETTES.text).map(mk).join("") + "</div>" +
        '<div class="row" style="gap:8px"><button class="btn nonebtn grow" data-act="colornone" data-hold><i class="swatch none" aria-hidden="true"></i>' +
          (S.target === "bubble" ? "말풍선 색 기본으로" : TGT_N[S.target] + " 빼기") + "</button>" +
          (S.target === "bubble" ? "" : '<button class="btn nonebtn grow" data-act="colorsoff" data-hold title="글자색과 형광펜을 한 번에 · 블록마다">글자색·형광펜 모두 빼기</button>') + "</div>" +
        (recents.length
          ? '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">최근</span>' +
              '<div class="grid8 grow" data-recent>' + recents.map(hex => mk(hex).replace('class="swatch', 'class="swatch small')).join("") + "</div></div>"
          : '<div class="grid8" data-recent hidden></div>') +
        alphaHTML(cc)) +
      sec("원하는 색 고르기",
        '<button class="linkbtn cpk-tog" data-act="cpkfold" data-hold aria-expanded="' + !S.cpkFold + '">' +
          (S.cpkFold ? "펼치기" : "접기") + ic(S.cpkFold ? "down" : "up", 12) + "</button>",
        (S.cpkFold ? "" : cpkHTML(cc)) +
        '<div class="row" style="gap:8px">' +
          '<span class="cpk-sw" aria-hidden="true" style="background:' + cc + '"><i></i></span>' +
          '<input class="fld mono" style="width:calc(7ch + 22px);flex:none;text-align:center" data-act="hexfld" data-keep="hex"' +
            ' value="' + cc + '" maxlength="7" spellcheck="false" autocapitalize="off" placeholder="#000000" aria-label="색 코드" />' +
          '<button class="btn grow" style="height:34px" data-act="usehex" data-hold>이 색 칠하기</button></div>') +
      recInlineHTML() +
      (S.target === "text"
        ? sec("그 밖에", "",
          '<div class="row" style="gap:8px">' +
            '<button class="btn grow" style="height:36px;font-size:11.5px" data-act="invert" data-hold title="고른 글자를 검은 바탕 흰 글자로">고른 글자 반전 (검은 바탕·흰 글자)</button></div>' +
          (b && (b.tc || b.tcA != null)
            ? '<button class="btn" style="height:34px;font-size:11px" data-act="tcclear" data-hold>' +
                (b.tc ? '<i style="display:inline-block;width:10px;height:10px;margin-right:6px;vertical-align:-1px;background:' + withAlpha(b.tc, b.tcA == null ? 1 : b.tcA) + '"></i>' : "") +
                "이 블록 글자색을 기본으로</button>"
            : ""))
        : "");
    const TGT = { text: "글자색", hilite: "형광펜", bubble: "말풍선" };
    const extra = { "따옴표": inkPaneHTML("auto"), "인물": inkPaneHTML("who") + dlgBarPaneHTML(b) };
    const k = extra[(S.sub || {})["색"]] ? S.sub["색"] : TGT[S.target] || "글자색";
    const nav = '<div class="subnav" role="tablist" aria-label="색 묶음">' +
      Object.keys(TGT).map(v => '<button class="' + (k === TGT[v] ? "on" : "") + '" role="tab" aria-selected="' + (k === TGT[v]) + '" data-act="target" data-g="' + v + '" data-hold>' + TGT[v] + "</button>").join("") +
      Object.keys(extra).map(n => '<button class="' + (k === n ? "on" : "") + '" role="tab" aria-selected="' + (k === n) + '" data-act="subtab" data-tab="색" data-k="' + n + '" data-hold>' + n + "</button>").join("") + "</div>";
    const painting = !extra[k];
    return '<div class="stack"><div class="panehead">' + nav + (painting && S.target !== "bubble" ? scopeBarHTML() : "") + "</div>" +
      (painting ? paint : extra[k]) + "</div>";
  }

  if (TAB === "테마") {
    const bgBtn = (hex) => '<button class="btn wide tsw' + (!S.bgImage && (normHex(S.bg) || "#ffffff") === hex ? " on" : "") +
      '" style="background:' + hex + '" data-act="bg" data-color="' + hex + '" data-hold></button>';
    const acBtn = (hex) => '<button class="btn wide tsw' + ((normHex(S.accent) || S0.accent) === hex ? " on" : "") +
      '" style="background:' + hex + '" data-act="accent" data-c="' + hex + '" data-hold></button>';
    const ocBtn = (hex) => '<button class="btn wide tsw' + (S.ovColor === hex ? " on" : "") + '" style="background:' + hex + '" data-act="ovcolor" data-oc="' + hex + '" data-hold></button>';
    const pdot = (p) => '<span class="dot" style="background:' + esc(p.v.bgImage ? "#2a2a28" : bgPaint(p.v)) +
      '"><i style="background:' + esc(p.v.accent || "#a8a8a6") + '"></i></span>';
    const pchip = (p) => {
      const chip = '<button class="chip' + (p.built ? " built" : "") + '" data-act="usep" data-p="' + p.id + '" data-hold title="' + esc(p.name) + ' 적용">' +
        pdot(p) + '<span class="nm">' + esc(p.name) + "</span></button>";
      return p.built ? chip : '<span class="pchipw">' + chip +
        '<button class="pchip-ed" data-act="editp" data-p="' + p.id + '" data-hold title="' + esc(p.name) + ' 편집" aria-label="' + esc(p.name) + ' 편집">✎</button></span>';
    };
    const mine = S.presets || [];
    const bgMode = S.bgImage ? "image" : String(S.bgGrad | 0);
    const gswBtn = (g, i) => {
      const v = { bgGrad: g.c.length, bg: g.c[0], bg2: g.c[1], bg3: g.c[2], bgDir: S.bgDir };
      const on = !S.bgImage && gradStops().join() === gradStops(v).join();
      return '<button class="gsw' + (on ? " on" : "") + '" data-act="bggrad" data-g="' + i + '" data-hold aria-label="' + g.n + '">' +
        '<i style="background:' + bgPaint(v) + '"></i><span>' + g.n + "</span></button>";
    };
    const slider = (label, attrs, val, right) => '<div class="row"><span class="lbl" style="width:52px">' + label + "</span>" +
      '<input type="range" ' + attrs + ' value="' + val + '" />' + right + "</div>";
    const mono = (txt2, ui) => '<span class="mono"' + (ui ? ' data-ui="' + ui + '"' : "") + ' style="font-size:11px;color:#6a6a68;width:48px;text-align:right">' + txt2 + "</span>";
    const skinTile = (k) => {
      const sk = k ? SKINS[k] : null, pv = presetById(k ? "sk-" + k : "bi-basic").v;
      const ink = sk ? sk.ink : "#111111", sub = sk ? sk.sub : "#8a8a88";
      ensureFont(pv.famKey);
      const on = (S.skin || "") === k;
      return '<button class="skin-tile' + (on ? " on" : "") + '" data-act="skin" data-s="' + k + '" data-hold aria-pressed="' + on + '">' +
        '<span class="sk-card"><span class="sk-in" style="background:' + esc(skinPaint(pv, bgPaint(pv))) + '">' +
          (sk ? sk.deco(310, 388) : "") +
          '<span class="sk-txt" style="padding:' + Math.max(40, pv.padY || 0) + "px " + (pv.padX || 32) + "px;font-family:" + esc(fontStack(pv.famKey)) + '">' +
            '<b style="color:' + ink + '">가나다라</b>' +
            '<i style="background:' + esc(pv.accent) + ';width:38%"></i>' +
            '<i style="background:' + esc(sub) + '"></i><i style="background:' + esc(sub) + '"></i><i style="background:' + esc(sub) + ';width:62%"></i>' +
          "</span></span></span>" +
        '<span class="sk-n">' + (sk ? sk.n : "기본") + "</span></button>";
    };
    const G = {};
    G["템플릿"] =
      sec("템플릿", "글은 그대로 · 모양만",
        tplCatBar() +
        '<div class="chipwrap"><div class="chips skins sns tplrow">' + tplGrouped(tplList(), tplMini) + "</div>" + ROW_NAV_F() + "</div>") +
      "";
    G["콘셉트"] =
      sec("콘셉트", "카드 전체",
        '<div class="chipwrap"><div class="chips skins">' + skinRows(["", ...SKIN_KEYS]).map(skinTile).join("") + "</div>" +
          '' + ROW_NAV_F() + "</div>" +
        '<p class="note" style="margin:0">바탕·글자색·글꼴·장식을 한 번에 바꿉니다</p>') +
      (SKINS[S.skin]
        ? sec("콘셉트 색", SKINS[S.skin].n,
            colorRow("글자", "skinc", "ink", (S.skinC || {}).ink, SKINS[S.skin].ink) +
            (SKINS[S.skin].slot ? colorRow(SKINS[S.skin].slot, "skinc", "deco", (S.skinC || {}).deco, "") : ""))
        : "") +
      "";
    const presetSec =
      sec("프리셋", "카드 전체",
        '<div class="chipwrap"><div class="chips">' + mine.map(pchip).join("") +
          (mine.length ? '<span class="chip-sep"></span>' : "") +
          BUILTIN_PRESETS.map(pchip).join("") + "</div>" +
          '' + ROW_NAV_F() + "</div>" +
        '<div class="row" style="gap:8px">' +
          '<button class="btn grow" style="height:34px;font-size:11px;border-color:#111" data-act="savep" data-hold>지금 설정 저장</button>' +

        "</div>" +
        '<div class="row prow-code" style="gap:8px">' +
          '<button class="btn grow" style="height:34px;font-size:11px" data-act="pcode" data-hold>공유 코드 만들기</button>' +
          '<button class="btn grow" style="height:34px;font-size:11px" data-act="pimport" data-hold>코드로 가져오기</button>' +
        "</div>") +
      "";
    G["템플릿"] += presetSec;
    G["바탕"] =
      sec("바탕", "카드 전체",
        '<div class="seg bgmode">' + [["0", "단색"], ["2", "2색"], ["3", "3색"], ["image", "사진"]].map(x =>
          '<button class="' + (bgMode === x[0] ? "on" : "") + '" data-act="bgmode" data-m="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div>" +
        (bgMode === "2" || bgMode === "3"
          ? '<div class="gsw-row">' + GRADS[bgMode].map(gswBtn).join("") + "</div>" +
            '<div class="row"><span class="lbl" style="width:52px">색</span><div class="row grow gstops">' +
              gradStops().map((hex, i) =>
                (i ? '<span class="gstop-sep" aria-hidden="true"></span>' : "") +
                '<input type="color" class="tsw" data-act="' + ["bgc", "bgc2", "bgc3"][i] + '" value="' + hex + '" title="' + (i + 1) + "번째 색 직접 고르기" + '" aria-label="' + (i + 1) + '번째 색" />').join("") +
            "</div>" + defBtn("bgdef", true) + "</div>" +
            '<div class="row"><span class="lbl" style="width:52px">방향</span><div class="seg grow gdir">' +
              [["v", "세로", "M12 4.5v15M6.5 14l5.5 5.5 5.5-5.5"], ["h", "가로", "M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5"], ["d", "대각선", "M6 6l12 12M18 10.5V18h-7.5"]].map(x =>
                '<button class="' + ((S.bgDir || "v") === x[0] ? "on" : "") + '" data-act="bgdir" data-d="' + x[0] + '" data-hold>' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + x[2] + '"/></svg>' +
                x[1] + "</button>").join("") +
            '</div><span class="resetlink" aria-hidden="true"></span></div>'
          : bgMode === "0"
            ? '<div class="row" style="gap:8px">' + bgBtn("#ffffff") + bgBtn("#fbf8f3") + bgBtn("#f2f0eb") + bgBtn("#2a2a28") + "</div>" +
              '<div class="row" style="gap:8px">' +
                '<input type="color" class="tsw" data-act="bgc" value="' + (normHex(S.bg) || "#ffffff") + '" title="바탕색 직접 고르기" />' +
                defBtn("bgdef", (normHex(S.bg) || S0.bg) !== S0.bg) +
              "</div>"
            : '<div class="row"><span class="note grow" style="margin:0">사진이 카드 전체를 덮어요 · 아래에서 확대·덮개를 고릅니다</span>' + defBtn("bgdef", true) + "</div>")) +
      (S.bgImage
        ? sec("바탕 사진", "",
            '<div class="row" style="gap:8px">' +
              '<button class="btn grow" style="height:34px" data-act="bgpick" data-hold>사진 바꾸기</button>' +
              '<button class="btn grow' + (S.bgHide ? " on" : "") + '" style="height:34px;font-size:11px" data-act="bghide" data-hold>' +
                (S.bgHide ? "가리는 중 · 내보내면 원본" : "편집 중에만 가리기") + "</button></div>" +
            slider("확대", 'min="100" max="300" step="5" data-act="zoom"', Math.round(S.bgScale * 100), mono(Math.round(S.bgScale * 100) + "%")) +
            slider("가로", 'min="-50" max="50" step="1" data-act="panx"', Math.round(S.bgX),
              mono(Math.round(S.bgX)).replace('width:48px', 'width:30px') +
              '<button class="btn" style="width:48px;height:30px;font-size:10.5px;color:#6a6a68;padding:0" data-act="bgreset">가운데</button>') +
            slider("세로", 'min="-50" max="50" step="1" data-act="pany"', Math.round(S.bgY),
              mono(Math.round(S.bgY)).replace('width:48px', 'width:30px') + '<span style="width:48px"></span>') +
            slider("흐림", 'min="0" max="100" step="1" data-act="blur"', S.bgBlur || 0, mono(S.bgBlur ? S.bgBlur + "%" : "없음", "blurv")) +
            '<div class="row"><span class="lbl" style="width:52px">덮개</span><div class="row grow" style="gap:8px">' +
              ["#000000", "#ffffff", "#1d2b3a", "#3a2320"].map(ocBtn).join("") +
              '<input type="color" class="tsw" data-act="ovc" value="' + (normHex(S.ovColor) || "#000000") + '" title="덮개색 직접 고르기" /></div></div>' +
            slider("농도", 'min="0" max="90" step="1" data-act="ova"', Math.round(S.overlay * 100), mono(Math.round(S.overlay * 100) + "%")))
        : "") +
      sec("강조색", "부제·장식",
        '<div class="row" style="gap:8px">' + ["#3b7cf6", "#e08a95", "#8f2020", "#7a9bd8", "#a8a8a6"].map(acBtn).join("") + "</div>" +
        '<div class="row" style="gap:8px">' +
          '<input type="color" class="tsw" data-act="accentc" value="' + (normHex(S.accent) || "#a8a8a6") + '" title="강조색 직접 고르기" />' +
          defBtn("accentdef", (normHex(S.accent) || S0.accent) !== S0.accent) +
        "</div>") +
      "";
    G["장식"] =
      sec("테두리", "카드 전체",
        '<div class="frpick" role="radiogroup" aria-label="테두리 모양">' + ["", ...FRAME_KEYS].map(k => {
          const on = (S.frame || "") === k;
          return '<button class="frtile' + (on ? " on" : "") + '" role="radio" aria-checked="' + on + '" data-act="frame" data-f="' + k + '" data-hold>' +
            '<span class="fr-pv">' + (k ? FRAMES[k].d(62, 78, "#111") : "") + "</span>" +
            '<span class="fr-n">' + (k ? FRAMES[k].n : "없음") + "</span></button>";
        }).join("") + "</div>" +
        (S.frame ? colorRow("색", "framec", "", S.frameC, "") : "")) +
      sec("따옴표 장식", "카드 전체",
        '<div class="seg" role="radiogroup" aria-label="큰 따옴표 장식">' + [[0, "없음"], [1, "왼쪽 위에 크게"]].map(x =>
          '<button class="' + ((S.qmark | 0) === x[0] ? "on" : "") + '" role="radio" aria-checked="' + ((S.qmark | 0) === x[0]) + '" data-act="qmark" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div>") +
      "";
    G["효과"] =
      sec("사진 효과", "저장 이미지",
        '<div class="seg wrap2" role="radiogroup" aria-label="사진 효과">' + [["", "없음"]].concat(PFX_KEYS.map(k => [k, PFX[k].n])).map(x =>
          '<button class="' + ((S.pfx || "") === x[0] ? "on" : "") + '" role="radio" aria-checked="' + ((S.pfx || "") === x[0]) + '" data-act="pfx" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div>" +
        (S.pfx
          ? '<div class="pfx-pv"><img alt="사진 효과를 입힌 저장 이미지 미리 보기" src="' + (pfxURL || "data:image/gif;base64,R0lGODlhAQABAAAAACw=") + '"></div>' +
            PFX_CTL.filter(c => PFX_MAIN.indexOf(c.k) >= 0).map(pfxRow).join("") +
            '<div class="row"><span class="lbl" style="width:64px"></span>' +
              '<button class="resetlink" data-act="pfxreset" data-k="all" data-hold style="white-space:nowrap;width:auto"' + (Object.keys(S.pfxT || {}).length ? "" : " disabled") + ">모두 기본</button></div>" +
            '<p class="note" style="margin:0">편집 화면은 평평하게 두고, 저장할 때 책상 위에서 찍은 사진처럼 기울이고 흐립니다 · 확대·색·흐림·바닥색은 \u2018더 많은 설정\u2019</p>'
          : '<p class="note" style="margin:0">저장할 때 카드를 찍은 책 사진처럼 기울이고 흐리게 합니다</p>')) +
      (S.pfx ? adv(sec("사진 효과 · 더 조절", "저장 이미지",
        PFX_CTL.filter(c => PFX_MAIN.indexOf(c.k) < 0).map(pfxRow).join("") +
        '<div class="row" style="gap:6px"><span class="lbl" style="width:64px">바닥색</span>' +
          PFX_DESKS.map(d => { const on = ((S.pfxT || {}).desk || PFX[S.pfx].desk) === d[0];
            return '<button class="csw' + (on ? " on" : "") + '" data-act="pfxdesk" data-v="' + d[0] + '" data-hold title="' + d[1] + '" aria-label="바닥색 ' + d[1] + '" style="background:' + d[0] + '"></button>'; }).join("") + "</div>")) : "") +
      sec("글자 그라데이션", "카드 전체 글자",
        '<div class="seg"><button class="' + (S.tgrad ? "" : "on") + '" data-act="tgrad" data-v="0" data-hold>끔</button>' +
          '<button class="' + (S.tgrad ? "on" : "") + '" data-act="tgrad" data-v="1" data-hold>켬</button></div>' +
        '<div class="row" style="gap:8px">' + TGRADS.map(g => { const on = S.tgrad && normHex(S.tg1) === g[0] && normHex(S.tg2) === g[1];
            return '<button class="tgsw' + (on ? " on" : "") + '" data-act="tgpre" data-a="' + g[0] + '" data-b="' + g[1] + '" data-hold title="' + g[2] + '" aria-label="' + g[2] +
              '" style="background:linear-gradient(180deg,' + g[0] + "," + g[1] + ')"></button>'; }).join("") + "</div>" +
        (S.tgrad
          ? '<div class="row"><span class="lbl" style="width:52px">위 · 아래</span><div class="row grow gstops">' +
              '<input type="color" class="tsw" data-act="tg1c" value="' + (normHex(S.tg1) || "#6f807a") + '" aria-label="위쪽 색" />' +
              '<span class="gstop-sep" aria-hidden="true"></span>' +
              '<input type="color" class="tsw" data-act="tg2c" value="' + (normHex(S.tg2) || "#141414") + '" aria-label="아래쪽 색" /></div></div>' +
            '<p class="note" style="margin:0">글 전체가 위에서 아래로 번져요 · 켜 두는 동안 블록 글자색은 쉬어요</p>'
          : "")) +
      adv(sec("글자 그림자", "카드 전체 글자",
        '<div class="seg tshseg">' + ["끔", "약", "중", "강"].map((n, i) =>
          '<button class="' + ((S.tsh | 0) === i ? "on" : "") + '" data-act="tsh" data-v="' + i + '" data-hold>' + n + "</button>").join("") + "</div>" +
        (S.tsh
          ? '<div class="row"><span class="lbl" style="width:52px">색</span><div class="seg grow tshseg">' +
              [["auto", "자동"], ["#000000", "어둡게"], ["#ffffff", "밝게"]].map(x =>
                '<button class="' + ((S.tshC || "auto") === x[0] ? "on" : "") + '" data-act="tshc" data-c="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") +
              "</div>" +
              '<input type="color" class="tsw tshpick' + (S.tshC && S.tshC !== "auto" && S.tshC !== "#000000" && S.tshC !== "#ffffff" ? " on" : "") +
                '" data-act="tshcc" value="' + (normHex(S.tshC) || tshColor(isDark())) + '" title="그림자색 직접 고르기" aria-label="그림자색 직접 고르기" /></div>' +
            ((S.tshC || "auto") === "auto"
              ? '<p class="note" style="margin:0">자동 · 지금 ' + (isDark() ? "밝은 글자라 어두운 그림자" : "어두운 글자라 밝은 번짐") + "</p>"
              : "")
          : ""))) +
      "";
    return '<div class="stack"><div class="panehead">' + subNavHTML("테마", G) + "</div>" + G[subOf("테마", G)] + "</div>";
  }

  const rshape = (r) => {
    const wh = r === "auto" ? [3, 5] : r.split(":").map(Number), k = 22 / Math.max(wh[0], wh[1]);
    return '<i class="rshape' + (r === "auto" ? " auto" : "") + '" style="width:' + Math.round(wh[0] * k) + "px;height:" + Math.round(wh[1] * k) + 'px"></i>';
  };
  const ratioBtn = (r) => '<button class="btn wide' + (r === "auto" ? "" : " mono") + (S.ratio === r ? " on" : "") +
    '" style="height:56px;font-size:11px" data-act="ratio" data-ratio="' + r + '" data-hold>' + rshape(r) + (r === "auto" ? "자동" : r === "1:1.41" ? "A판" : r) + "</button>";
  const ratioFlipBtn = () => {
    const can = S.ratio !== "auto" && flipKey(S.ratio, CARD_RATIOS) !== S.ratio;
    return '<button class="btn wide rflip" style="height:56px;font-size:11px" data-act="ratioflip" data-hold' + (can ? "" : " disabled") +
      ' title="' + (can ? "가로세로 바꾸기 · " + S.ratio + " → " + flipKey(S.ratio, CARD_RATIOS) : "자동·정사각은 바꿀 것이 없어요") + '" aria-label="가로세로 바꾸기">' +
      ic("swap", 18) + "<span>가로세로</span></button>";
  };
  const TPOS_V = [["top", "위"], ["center", "가운데"], ["bottom", "아래"]], TPOS_H = [["left", "왼쪽"], ["center", "가운데"], ["right", "오른쪽"]];
  const tposGrid = () => {
    const v = S.vpos || "", h = PCODE_ENUM.hpos.indexOf(S.hpos) >= 0 ? S.hpos : "left";
    return '<div class="tposgrid" role="radiogroup" aria-label="글 묶음 자리 9칸">' + TPOS_V.map(r => TPOS_H.map(c => {
      const on = v === r[0] && h === c[0];
      return '<button class="tpos' + (on ? " on" : "") + (!v && h === c[0] ? " hcol" : "") + '" role="radio" aria-checked="' + on + '" data-act="tpos" data-v="' + r[0] + '" data-h="' + c[0] + '" data-hold' +
        ' aria-label="' + r[1] + " " + c[1] + '" title="' + r[1] + " · " + c[1] + '" style="justify-content:' + ({ left: "flex-start", center: "center", right: "flex-end" })[c[0]] +
        ";align-items:" + ({ top: "flex-start", center: "center", bottom: "flex-end" })[r[0]] + '"><i></i></button>';
    }).join("")).join("") + "</div>";
  };
  const flowBtn = (f, n) => '<button class="btn wide' + (S.flow === f ? " on" : "") + '" style="height:40px" data-act="flow" data-f="' + f + '" data-hold>' + n + "</button>";
  const G = {
    "비율": sec("비율", S.ratio === "auto" ? "긴 글 한 장 · 지금 " + autoW() + " × " + dims()[1]
        : ratioFor(S.ratio) + " · " + Math.round(outDims()[0] * pxK()) + " × " + Math.round(outDims()[1] * pxK()),
      '<div class="ratiogrid">' + CARD_RATIOS.concat("auto").map(ratioBtn).join("") + ratioFlipBtn() + "</div>" +
      (S.ratio === "auto" ? stepRow("너비", "wdown", "wup", "", autoW() !== AUTO_W, "wreset", ["w", "px"]) +
          linkedRow(stepRow("최소 높이", "amdown", "amup", "", S.autoMinH != null, "amreset", ["amin", "px"]), S.autoMinH == null) +
          '<p class="note" style="margin:-4px 0 0 62px">' + (S.autoMinH == null ? "비우면 글 양대로 · 여러 장을 같은 높이로 맞출 때 같은 값을 넣으세요"
            : "글이 짧으면 아래가 남아요 · 사진 블록의 ‘남는 높이 → 사진이 채우기’를 켜면 사진 칸이 채워요") + "</p>"
        : arCustomRow("rw", "rh", S.ratio === "1:1")) +
      ratioBoxRowHTML()) +
      sec("글 위치", S.ratio === "auto" ? "세로는 자동 비율에서 해당 없음" : S.flow === "columns" ? "세로는 2단에서 해당 없음" : "세로는 한 장에 다 들어갈 때",
        '<div class="tposrow">' + tposGrid() +
          '<div class="tpos-side">' +
            '<button class="btn' + (!S.vpos ? " on" : "") + '" style="height:40px" data-act="vpos" data-v="" data-hold aria-pressed="' + !S.vpos + '">세로 자동</button>' +
            '<p class="note" style="margin:0">' + (!S.vpos ? "블록이 하나면 가운데, 여럿이면 위부터 · 칸을 누르면 세로·가로를 함께 정해요"
              : "세로 " + ({ top: "위", center: "가운데", bottom: "아래" })[S.vpos] + " · 가로 " + (({ left: "왼쪽", center: "가운데", right: "오른쪽" })[S.hpos] || "왼쪽")) + "</p>" +
          "</div></div>" +
        stepRow("글 폭", "textwdown", "textwup", "", textWNow() !== 100, "textwreset", ["textw", "%"]) +
        '<p class="note" style="margin:-4px 0 0 62px">' + (textWNow() >= 100 ? "100%면 여백 안을 꽉 채워 가로 자리(왼쪽·가운데·오른쪽)는 차이가 없어요 · 줄이면 보여요"
          : "여백 안쪽 칸의 " + textWNow() + "% · 고정 블록·정보 줄은 그대로") + "</p>" +
        vertRowHTML()) +
      sec("레터박스", "위아래 검은 띠",
        '<div class="seg">' + LBOX.map(x => '<button class="' + ((S.lbox || "") === x[0] ? "on" : "") + '" data-act="lbox" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div>" +
        (S.lbox && S.ratio === "auto" ? '<p class="note" style="margin:0">자동 비율에서는 띠가 없어요 · 16:9 같은 고정 비율에서 보여요</p>'
          : S.lbox ? '<p class="note" style="margin:0">가운데 화면이 ' + (S.lbox === "276" ? "2.76" : "2.39") + " : 1 · 글은 위 띠 아래부터 · 바닥에 붙인 자막은 아래(자막 위치가 ‘위’면 위) 띠에 얹혀요(여백 탭의 위아래 여백으로 높이 조절)</p>" : "")) +
      sec("글이 넘칠 때", "",
      '<div class="row" style="gap:8px">' + flowBtn("pages", "여러 장") + flowBtn("fit", "한 장에 맞춤") + flowBtn("columns", "2단") + "</div>" +
      (brkCount()
        ? '<p class="note" style="margin:0">직접 나눈 곳 <b class="mono">' + brkCount() + "</b> · " +
          (!brkOn() ? "‘여러 장’에서만 나뉩니다"
            : S.ratio === "auto" ? "나눈 조각마다 한 장 · 높이는 저마다 내용에 맞춥니다" : "그 블록부터 새 장이 열립니다 · 블록 탭 ‘배치’의 ‘장 나눔’") + "</p>"
        : "") +
      (S.flow === "columns"
        ? linkedRow(stepRow("단 사이", "colgapdown", "colgapup", "", S.colGap != null, "colgapreset", ["colgap", "px"]), S.colGap == null) +
          '<p class="note" style="margin:-4px 0 0 62px">' + (S.colGap == null ? "기본은 블록 간격 + 6 · 간격을 바꾸면 따라갑니다" : "두 단 사이 · 블록 간격과 따로 움직입니다") + "</p>" +
          '<div class="row"><span class="lbl" style="width:52px">단 채우기</span><div class="seg grow">' +
            [["balance", "양쪽 균형"], ["auto", "왼쪽부터"]].map(x => '<button class="' + ((S.colFill === "auto" ? "auto" : "balance") === x[0] ? "on" : "") + '" data-act="colfill" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div></div>" +
          '<p class="note" style="margin:-4px 0 0 62px">' + (colBrkId() ? "블록 탭 ‘배치’에서 직접 나눈 곳부터 오른쪽 단 — 채우기는 왼쪽부터로 걸립니다"
            : "어디서 오른쪽 단으로 넘길지는 블록 탭 ‘배치’ → ‘여기서 오른쪽 단 시작’") + "</p>" +
          (cur() ? '<div class="row"><span class="lbl" style="width:52px">따로 쓰기</span><button class="btn grow' + (colBrkId() === S.active ? " on" : "") +
            '" style="height:40px" data-act="colbrk" data-hold>' + (colBrkId() === S.active ? "이 블록부터 오른쪽 단 · 풀기" : "고른 블록(" + (idx() + 1) + "번째)부터 오른쪽 단") + "</button></div>" +
            '<p class="note" style="margin:-4px 0 0 62px">왼쪽·오른쪽을 따로 채워요 · 한쪽이 넘치면 글을 함께 줄여 담아요</p>' : "")
        : "")) +
      sec("편집 도움", "화면에서만",
        '<button class="btn' + (S.guide ? " on" : "") + '" style="height:34px;color:#444" data-act="guide" data-hold>안전 여백 가이드 ' + (S.guide ? "켬" : "끔") + "</button>"),
    "이미지 패널": sec("이미지 패널", S.side ? (S.side.pos === "on" ? "캔버스 위 · 모든 장" : "카드 바깥 · 모든 장") : "카드 바깥 · 캔버스 위", sidePaneHTML()),
    "여백": sec("여백", "카드 가장자리",
      stepRow(S.padY == null ? "여백" : "좌우", "paddown", "padup", "", S.padX !== S0.padX, "padreset", ["pad", "px"]) +
      linkedRow(stepRow("위아래", "padydown", "padyup", "", S.padY != null, "padyreset", ["pady", "px"]), S.padY == null) +
      '<p class="note" style="margin:-4px 0 0 62px">' + (S.padY == null ? "위아래를 따로 정하지 않으면 여백 값을 따라갑니다" : "위·아래 가장자리만 · 여백은 좌우에만 걸립니다") + "</p>") +
      sec("정보 줄", "모든 장", infoPaneHTML()),
  };
  return '<div class="stack"><div class="panehead">' + subNavHTML("판형", G) + "</div>" + G[subOf("판형", G)] + "</div>";
}

const mmss = (sec) => { const v = Math.max(0, Math.round(sec)); return Math.floor(v / 60) + ":" + String(v % 60).padStart(2, "0"); };
function parseT(str) {
  const t = String(str || "").replace(/<[^>]*>/g, "").trim().replace(/^[-−–]/, "");
  let m = t.match(/^(\d+):(\d{1,2})$/);
  if (m) return +m[1] * 60 + Math.min(59, +m[2]);
  m = t.match(/^(\d+):(\d{1,2}):(\d{1,2})$/);
  if (m) return +m[1] * 3600 + +m[2] * 60 + Math.min(59, +m[3]);
  return /^\d+$/.test(t) ? +t : null;
}
function plDur(b) {
  if (b.dur > 0) return b.dur;
  const c = parseT(txt[key(b.id, 0)]), l = parseT(txt[key(b.id, 1)]);
  return c != null && l != null && c + l > 0 ? c + l : 214;
}
function plProg(b) {
  if (!(b.dur > 0)) {
    const c = parseT(txt[key(b.id, 0)]), l = parseT(txt[key(b.id, 1)]);
    if (c != null && l != null && c + l > 0) return Math.round(c / (c + l) * 1000) / 10;
  }
  return b.prog == null ? 38 : b.prog;
}
function plSync(b) {
  const dur = b.dur = plDur(b), cur = Math.round(plProg(b) / 100 * dur);
  txt[key(b.id, 0)] = mmss(cur);
  txt[key(b.id, 1)] = b.endMode === "total" ? mmss(dur) : "-" + mmss(dur - cur);
}
const NPAD_R = 40;
function nudgeSecHTML(b) {
  const np = pickedIds().length, nx = b.nx || 0, ny = b.ny || 0;
  const pos = v => r1(50 + clampN(v, -NPAD_R, NPAD_R) / NPAD_R * 38);
  const ab = (act, icon, label, cls) => '<button class="npad-b ' + cls + '" data-act="' + act + '" data-hold aria-label="' + label + '" title="' + label + '">' + ic(icon, 14) + "</button>";
  return sec("위치 미세 조정", np > 1 ? "담은 블록 " + np + "개" : b.type === "scene" ? "이 장면의 자막" : "이 블록",
    '<div class="npad-wrap">' +
      '<div class="npad' + (nx || ny ? " moved" : "") + '" data-npad title="끌어서 옮기기 · 두 번 누르면 제자리" aria-label="지금 자리 가로 ' + nx + "px, 세로 " + ny + 'px">' +
        '<i class="npad-h"></i><i class="npad-v"></i><b class="npad-dot" style="left:' + pos(nx) + "%;top:" + pos(ny) + '%"></b>' +
        ab("nydown", "up", "위로 2px", "u") + ab("nyup", "down", "아래로 2px", "d") + ab("nxdown", "back", "왼쪽으로 2px", "l") + ab("nxup", "next", "오른쪽으로 2px", "r") +
      "</div>" +
      '<div class="npad-vals">' +
        '<div class="npad-fs">' +
          '<div class="npad-f"><span class="ax">가로</span>' + numFld("nx", "px", "가로 위치") + "</div>" +
          '<div class="npad-f"><span class="ax">세로</span>' + numFld("ny", "px", "세로 위치") + "</div>" +
        "</div>" +
        resetBtn("nudgereset", !!(nx || ny)) +
      "</div></div>" +
    '<p class="note" style="margin:0">판을 끌거나 가장자리 화살표로 2px씩 · 다른 블록 자리는 그대로예요 · PC 는 Alt+화살표</p>');
}
function imgFitHTML(b) {
  const rg = (act, label, v, min, max, unit) => '<div class="row"><span class="lbl" style="width:52px">' + label + "</span>" +
    '<input type="range" min="' + min + '" max="' + max + '" step="1" value="' + v + '" data-act="' + act + '" aria-label="' + label + '" />' +
    '<span class="mono" data-ui="' + act + '" style="font-size:11px;color:#6a6a68;width:44px;text-align:right">' + v + unit + "</span></div>";
  return (b.type === "photo"
      ? '<div class="row"><span class="lbl" style="width:52px">칸 비율</span><div class="seg grow">' +
          [["16:9", "16:9"], ["4:3", "4:3"], ["1:1", "1:1"], ["4:5", "4:5"], ["9:16", "세로"]].map(x => '<button class="' + (arKey(b.ar) === x[0] ? "on" : "") + '" data-act="scenear" data-v="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div></div>" +
          arCustomRow("irw", "irh", b.ar === "1:1") +
        rg("imgw", "칸 너비", b.pw || 100, 20, 100, "%") +
        '<div class="row"><span class="lbl" style="width:52px">남는 높이</span><div class="seg grow">' +
          [["0", "그대로"], ["1", "사진이 채우기"], ["bottom", "사진을 아래로"]].map(x => { const v = b.fill === "bottom" ? "bottom" : (b.fill ? "1" : "0");
            return '<button class="' + (v === x[0] ? "on" : "") + '" data-act="phfill" data-v="' + x[0] + '" data-hold aria-pressed="' + (v === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div></div>" +
        '<p class="note" style="margin:-4px 0 0 62px">' + (b.fill
          ? (S.ratio === "auto" && S.autoMinH ? (b.fill === "bottom" ? "카드가 최소 높이 " + S.autoMinH + "px 보다 짧으면 남는 만큼 사진 위가 벌어져 사진이 바닥에 붙어요 · 같은 최소 높이의 카드끼리 사진 줄이 맞아요"
              : "카드가 최소 높이 " + S.autoMinH + "px 보다 짧으면 이 사진 칸이 그만큼 길어져요")
            : "판형이 ‘자동’이고 크기 탭에서 최소 높이를 정했을 때 모자란 높이를 이 칸이 채워요")
          : "카드의 사진 칸 오른쪽 아래 손잡이를 끌어도 가로·세로 크기가 바뀌어요") + "</p>"
      : "") +
    rg("imgx", "가로 초점", b.imgX == null ? 50 : b.imgX, IMG_POS[0], IMG_POS[1], "%") +
    rg("imgz", "확대", b.imgZ || 100, IMG_ZOOM[0], IMG_ZOOM[1], "%") +
    '<div class="row"><span class="lbl" style="width:52px"></span><button class="btn grow" style="height:32px;font-size:11px" data-act="imgfitreset" data-hold>가운데 · 100% 로</button></div>' +
    '<p class="note" style="margin:-4px 0 0 62px">카드의 사진을 끌면 보이는 자리(칸 밖으로도), 두 손가락·휠이면 확대·축소 · 두 번 누르면 처음대로</p>';
}
function musicPaneHTML(b) {
  const seg = (label, act, opts, cur) => '<div class="row"><span class="lbl" style="width:52px">' + label + '</span><div class="seg grow">' +
    opts.map(o => '<button class="' + (cur === o[0] ? "on" : "") + '" data-act="' + act + '" data-v="' + o[0] + '" data-hold>' + o[1] + "</button>").join("") + "</div></div>";
  if (b.type === "lyric") {
    const dim = S.lyDim == null ? 0.38 : S.lyDim;
    return seg("이 줄", "lyhot", [["0", "흐리게"], ["1", "강조"]], b.hot ? "1" : "0") +
      '<div class="row"><span class="lbl" style="width:52px">흐린 줄</span><input type="range" min="10" max="100" step="1" value="' + Math.round(dim * 100) + '" data-act="lydim" aria-label="흐린 줄 진하기" />' +
      '<span class="mono" data-ui="lydim" style="font-size:11px;color:#6a6a68;width:44px;text-align:right">' + Math.round(dim * 100) + "%</span></div>" +
      '<p class="note" style="margin:-4px 0 0 62px">강조한 줄만 또렷하게 · 흐린 줄 진하기는 카드 안 가사 전체에 걸려요</p>';
  }
  if (b.type === "track") {
    const has = !!imgIdOf(b);
    return seg("앨범아트", "trackart", [["s", "작게"], ["l", "크게"]], b.art === "l" ? "l" : "s") +
      seg("바탕", "artbg", [["", "그대로"], ["blur", "흐린 앨범아트"]], S.artBg === "blur" ? "blur" : "") +
      '<div class="row"><span class="lbl" style="width:52px"></span><button class="btn grow" style="height:34px" data-act="artcolor" data-hold' + (has ? "" : " disabled") + ">앨범 색으로 바탕 칠하기</button></div>" +
      '<p class="note" style="margin:-4px 0 0 62px">' + (has
        ? "흐린 앨범아트는 음악 앱 재생 화면처럼 그림을 흐리게 깔아요 · 앨범 색은 그림에서 뽑은 색 두 개로 바탕을 칠해요"
        : "앨범아트를 넣으면(위 ‘이미지’) 바탕을 그 그림으로 흐리게 깔거나 그 색으로 칠할 수 있어요") + "</p>";
  }
  const prog = plProg(b), dur = plDur(b), curS = Math.round(prog / 100 * dur);
  const tf = (act, v, label) => '<input class="fld mono" style="width:calc(6ch + 22px);flex:none;text-align:center" data-act="' + act + '" value="' + v + '" inputmode="numeric" enterkeyhint="done" autocomplete="off" spellcheck="false" aria-label="' + label + '" placeholder="0:00" />';
  return '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">시간</span>' +
      tf("plcur", mmss(curS), "지금 재생 위치") + '<span class="note" style="margin:0">/</span>' + tf("pldur", mmss(dur), "곡 전체 길이") +
      '<span class="note grow" style="margin:0">지금 / 전체</span></div>' +
    '<div class="row"><span class="lbl" style="width:52px">진행</span><input type="range" min="0" max="100" step="0.1" value="' + prog + '" data-act="prog" aria-label="재생 진행" />' +
      '<span class="mono" data-ui="prog" style="font-size:11px;color:#6a6a68;width:44px;text-align:right">' + mmss(curS) + "</span></div>" +
    seg("끝 시간", "plend", [["left", "남은 시간"], ["total", "전체 길이"]], b.endMode === "total" ? "total" : "left") +
    '<p class="note" style="margin:-4px 0 0 62px">시간을 적거나 진행을 끌면 막대와 양쪽 시간이 같이 맞춰져요 · 카드의 재생 막대를 눌러 끌어도 돼요</p>' +
    seg("버튼", "playctl", [["1", "보이기"], ["0", "숨기기"]], b.noCtl ? "0" : "1") +
    seg("상태", "playst", [["play", "재생 중"], ["pause", "멈춤"]], b.paused ? "pause" : "play");
}
function avShapeHTML() {
  const r = avR(), r0 = avR0();
  const rng = (k, label, unit) => {
    const ri = /^r\d$/.test(k) ? +k[1] : -1;
    const lim = ri >= 0 ? [0, 50] : k === "size" ? AV_SIZE : AV_GAP;
    const v = ri >= 0 ? r[ri] : k === "size" ? avSize() : avGap();
    const changed = ri >= 0 ? v !== r0[ri] : (k === "size" ? S.avSize != null : S.avGap != null);
    return '<div class="row"><span class="lbl" style="width:52px">' + label + "</span>" +
      '<input type="range" min="' + lim[0] + '" max="' + lim[1] + '" step="1" value="' + v + '" data-act="avv" data-k="' + k + '" aria-label="' + label + '" />' +
      '<span class="mono" data-ui="av-' + k + '" style="font-size:11px;color:#6a6a68;width:44px;text-align:right">' + v + unit + "</span>" +
      '<button class="resetlink" data-act="avreset" data-k="' + k + '" data-hold' + (changed ? ' title="기본값으로"' : " disabled") + ">기본</button></div>";
  };
  const n = S.blocks.filter(x => x.type === "avatar").length;
  return sec("아바타 얼굴", "카드 안 " + n + "개 전체",
    rng("size", "크기", "") +
    rng("gap", "글과 간격", "") +
    shapeRowsHTML("av", r, rng));
}
function shapeRowsHTML(act, r, rng) {
  const cur = shapeOf(r);
  return '<div class="row" style="gap:8px;align-items:flex-start"><span class="lbl" style="width:52px;padding-top:9px">모양</span>' +
    '<div class="shape-pick grow" role="radiogroup" aria-label="모양">' + SHAPES.map(x =>
      '<button class="shape-tile' + (cur === x.k ? " on" : "") + '" role="radio" aria-checked="' + (cur === x.k) + '" data-act="' + act + 'shape" data-v="' + x.k + '" data-hold>' +
      shapeGlyph(x.r, 20) + '<span>' + x.n + "</span></button>").join("") + "</div></div>" +
    cornerEdHTML(act, r);
}
const CE_SZ = 128, CE_MIN = 8;
const CE_DIR = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
const CE_NAME = ["왼쪽 위", "오른쪽 위", "오른쪽 아래", "왼쪽 아래"];
const ceHandleXY = (i, v) => {
  const d = Math.max(CE_MIN, (v / 100) * CE_SZ * (1 - Math.SQRT1_2)), c = [[0, 0], [CE_SZ, 0], [CE_SZ, CE_SZ], [0, CE_SZ]][i];
  return [c[0] + CE_DIR[i][0] * d, c[1] + CE_DIR[i][1] * d];
};
function cornerEdHTML(act, r) {
  const link = !!S.cornerLink;
  return '<div class="row" style="gap:8px;align-items:flex-start"><span class="lbl" style="width:52px;padding-top:9px">모서리</span>' +
    '<div class="corner-wrap grow"><div class="corner-ed" data-cornered="' + act + '" style="width:' + CE_SZ + "px;height:" + CE_SZ + 'px">' +
      '<div class="corner-shape" style="border-radius:' + r.map(v => Math.round(v / 100 * CE_SZ) + "px").join(" ") + '"></div>' +
      [0, 1, 2, 3].map(i => {
        const xy = ceHandleXY(i, r[i]);
        return '<button class="corner-h" data-ci="' + i + '" style="left:' + xy[0] + "px;top:" + xy[1] + 'px" role="slider" aria-label="' + CE_NAME[i] + ' 둥글기" aria-valuemin="0" aria-valuemax="50" aria-valuenow="' + r[i] + '"></button>' +
          '<span class="corner-v c' + i + '" data-cv="' + i + '">' + r[i] + "</span>";
      }).join("") +
    "</div>" +
    '<div class="corner-side">' +
      '<button class="btn' + (link ? " on" : "") + '" style="height:30px;font-size:11px" data-act="cornerlink" data-hold aria-pressed="' + link + '">네 모서리 함께 ' + (link ? "켬" : "끔") + "</button>" +
      '<p class="note" style="margin:0">모서리의 점을 안쪽으로 끌면 둥글어져요 · 값은 짧은 변의 %, 50 이면 반원 · 점을 누르고 방향키로도 바꿀 수 있어요</p>' +
    "</div></div></div>";
}
function cornerVals(act) { return act === "side" ? (sidePic() || SIDE0).r.slice() : avR().slice(); }
function setCorner(act, ci, v) {
  v = Math.max(0, Math.min(50, Math.round(v)));
  const r = cornerVals(act);
  if (S.cornerLink) r.fill(v); else r[ci] = v;
  if (act === "side") S.side = Object.assign({}, S.side || SIDE0, { r: r }); else S.avR = r;
  const ed = app.querySelector('.corner-ed[data-cornered="' + act + '"]');
  if (ed) {
    ed.querySelector(".corner-shape").style.borderRadius = r.map(x => Math.round(x / 100 * CE_SZ) + "px").join(" ");
    ed.querySelectorAll(".corner-h").forEach(h => {
      const i = +h.dataset.ci, xy = ceHandleXY(i, r[i]);
      h.style.left = xy[0] + "px"; h.style.top = xy[1] + "px"; h.setAttribute("aria-valuenow", r[i]);
    });
    ed.querySelectorAll(".corner-v").forEach(n => { n.textContent = r[+n.dataset.cv]; });
  }
  repaintCard();
}
let ceDrag = null;
app.addEventListener("pointerdown", (e) => {
  const h = e.target.closest && e.target.closest(".corner-h");
  if (!h) return;
  e.preventDefault();
  const ed = h.closest(".corner-ed");
  snap(true);
  ceDrag = { act: ed.dataset.cornered, ci: +h.dataset.ci, id: e.pointerId };
  h.focus({ preventScroll: true });
});
document.addEventListener("pointermove", (e) => {
  if (!ceDrag || e.pointerId !== ceDrag.id) return;
  const ed = app.querySelector('.corner-ed[data-cornered="' + ceDrag.act + '"]');
  if (!ed) return;
  const rc = ed.getBoundingClientRect(), k = rc.width / CE_SZ || 1, i = ceDrag.ci;
  const cx = rc.left + (i === 1 || i === 2 ? rc.width : 0), cy = rc.top + (i >= 2 ? rc.height : 0);
  const d = ((e.clientX - cx) * CE_DIR[i][0] + (e.clientY - cy) * CE_DIR[i][1]) / 2 / k;
  setCorner(ceDrag.act, i, (d / CE_SZ) * 100);
});
const ceEnd = (e) => { if (ceDrag && e.pointerId === ceDrag.id) { ceDrag = null; render(); } };
document.addEventListener("pointerup", ceEnd);
document.addEventListener("pointercancel", ceEnd);
app.addEventListener("keydown", (e) => {
  const h = e.target.closest && e.target.closest(".corner-h");
  if (!h) return;
  const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
  if (!step) return;
  e.preventDefault();
  const act = h.closest(".corner-ed").dataset.cornered, i = +h.dataset.ci;
  snap();
  setCorner(act, i, cornerVals(act)[i] + step * (e.shiftKey ? 5 : 1));
});
function ratioBoxRowHTML() {
  const sd = sidePic();
  if (!sd || sd.pos === "on" || S.ratio === "auto") return "";
  const all = S.ratioBox === "all";
  return '<div class="row"><span class="lbl" style="width:52px">판 기준</span><div class="seg grow">' +
    [["card", "카드만"], ["all", "이미지 패널 포함"]].map(x =>
      '<button class="' + ((all ? "all" : "card") === x[0] ? "on" : "") + '" data-act="ratiobox" data-v="' + x[0] + '" data-hold aria-pressed="' + ((all ? "all" : "card") === x[0]) + '">' + x[1] + "</button>").join("") + "</div></div>" +
    '<p class="note" style="margin:-4px 0 0 62px">' + (all ? "카드와 이미지 패널을 합친 전체가 " + S.ratio + " — 저장 이미지 폭 1080, 카드가 그만큼 좁아져요"
      : "카드만 " + S.ratio + " — 이미지 패널은 바깥에 붙어 저장 이미지가 그만큼 커져요") + "</p>";
}
function sidePaneHTML() {
  const sd = sidePic();
  if (!sd) {
    return '<div class="row" style="gap:8px">' + ["left", "right", "top", "bottom"].map(p =>
      '<button class="btn wide" style="height:40px" data-act="sideon" data-p="' + p + '" data-hold>' + sideGlyph(p) + SIDE_NAME[p] + "</button>").join("") + "</div>" +
      '<p class="note" style="margin:0">글 카드 바깥에 이미지 영역을 붙입니다 · 판형 비율을 카드만으로 할지 패널까지 넣을지는 붙인 뒤 고를 수 있어요</p>' +
      '<button class="btn wide" style="height:40px" data-act="sideon" data-p="on" data-hold>' + sideGlyph("on") + "캔버스 위에 얹기</button>" +
      '<p class="note" style="margin:0">카드 안 원하는 자리에 사진을 올립니다 · 끌어서 옮기고, 모서리 손잡이·두 손가락·휠로 크기를 바꿔요</p>';
  }
  const across = sd.pos === "left" || sd.pos === "right", on = sd.pos === "on";
  const rng = (k, label, unit) => {
    const ri = /^r\d$/.test(k) ? +k[1] : -1;
    const lim = ri >= 0 ? SIDE_LIM.r : SIDE_LIM[k], v = ri >= 0 ? sd.r[ri] : sd[k], v0 = ri >= 0 ? 0 : SIDE0[k];
    return '<div class="row"><span class="lbl" style="width:52px">' + label + "</span>" +
      '<input type="range" min="' + lim[0] + '" max="' + lim[1] + '" step="1" value="' + v + '" data-act="sidev" data-k="' + k + '" aria-label="' + label + '" />' +
      '<span class="mono" data-ui="side-' + k + '" style="font-size:11px;color:#6a6a68;width:44px;text-align:right">' + v + unit + "</span>" +
      '<button class="resetlink" data-act="sidereset" data-k="' + k + '" data-hold' + (v !== v0 ? ' title="기본값으로"' : " disabled") + ">기본</button></div>";
  };
  const seg = (k, opts) => '<div class="seg grow">' + opts.map(o =>
    '<button class="' + (sd[k] === o[0] ? "on" : "") + '" data-act="sideset" data-k="' + k + '" data-v="' + o[0] + '" data-hold>' + o[1] + "</button>").join("") + "</div>";
  const thumbs = media.map(m =>
    '<button class="thumb' + (m.id === sd.m ? " on" : "") + '" data-act="sideuse" data-m="' + m.id + '" data-hold title="이 이미지 쓰기" style="background-image:url(' + m.url + ')"></button>').join("");
  const ovSw = (v, label, hex) => '<button class="csw' + (sd.ovC === v ? " on" : "") + '" data-act="sideset" data-k="ovC" data-v="' + v + '" data-hold title="' + label + '" aria-label="덮개 ' + label + '" style="background:' + hex + '"></button>';
  const bgSw = (v, label, hex) => '<button class="csw' + (sd.bg === v ? " on" : "") + '" data-act="sideset" data-k="bg" data-v="' + v + '" data-hold title="' + label + '" aria-label="' + label + '" style="background:' + hex + '"></button>';
  return '<div class="stack tight">' +
    '<div class="row" style="gap:8px">' +
      '<button class="btn wide" style="height:34px" data-act="sidepick" data-hold>' + (sd.m ? "이미지 바꾸기" : "이미지 넣기") + "</button>" +
      '<button class="btn danger" style="height:34px" data-act="sideoff" data-hold>' + (on ? "사진 없애기" : "패널 없애기") + "</button></div>" +
    (media.length > (sd.m ? 1 : 0)
      ? '<div class="row" style="gap:8px;align-items:flex-start"><span class="lbl" style="width:52px;padding-top:9px">보관함</span><div class="thumbs grow">' + thumbs + "</div></div>"
      : "") +
    '<div class="row"><span class="lbl" style="width:52px">붙일 곳</span><div class="seg grow">' + ["left", "right", "top", "bottom", "on"].map(p =>
      '<button class="' + (sd.pos === p ? "on" : "") + '" data-act="sideset" data-k="pos" data-v="' + p + '" data-hold>' + SIDE_SHORT[p] + "</button>").join("") + "</div></div>" +
    (on
      ? '<div class="row"><span class="lbl" style="width:52px">겹침</span>' + seg("layer", [["front", "글 위"], ["back", "글 뒤"]]) + "</div>" +
        rng("ox", "가로 자리", "%") + rng("oy", "세로 자리", "%") + rng("size", "너비", "%") + rng("ar", "높이", "%") +
        '<p class="note" style="margin:-4px 0 0 62px">자리는 사진 가운데가 놓일 곳(카드의 %) · 너비는 카드 너비의 %, 높이는 사진 너비의 % · 카드에서 바로 끌고 늘려도 돼요</p>'
      : rng("size", across ? "너비" : "높이", "%")) +
    (on ? "" : '<p class="note" style="margin:-4px 0 0 62px">' + (across ? "카드 너비의 % · 높이는 카드를 따라갑니다" : (S.ratio === "auto" ? "카드 너비의 %" : "카드 높이의 %") + " · 너비는 카드를 따라갑니다") + "</p>") +
    ratioBoxRowHTML() +
    sec("사진 모양", "", shapeRowsHTML("side", sd.r, rng)) +
    (on ? "" : sec("여백·바탕", "",
      rng("pad", "안쪽 여백", "") +
      rng("seam", "카드 쪽", "") +
      '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">바탕</span>' +
        '<button class="btn' + (sd.bg === "card" ? " on" : "") + '" style="height:30px;font-size:11px" data-act="sideset" data-k="bg" data-v="card" data-hold>카드와 같게</button>' +
        bgSw("#ffffff", "흰색", "#ffffff") + bgSw("#111111", "검정", "#111111") + bgSw("#f2ede4", "미색", "#f2ede4") +
        '<input type="color" class="tsw" data-act="sidebgc" value="' + (normHex(sd.bg) || cardBgHex()) + '" title="바탕색 직접 고르기" /></div>' +
      '<p class="note" style="margin:-4px 0 0 62px">안쪽 여백은 사진 둘레 전체, 카드 쪽은 카드와 맞닿는 면에만 더합니다</p>')) +
    sec("사진 맞추기", "",
      '<div class="row"><span class="lbl" style="width:52px">채우기</span>' + seg("fit", [["cover", "꽉 채우기"], ["contain", "전체 보이기"]]) + "</div>" +
      rng("fx", "가로 초점", "%") +
      rng("fy", "세로 초점", "%") +
      rng("zoom", "확대", "%") +
      '<div class="row"><span class="lbl" style="width:52px">뒤집기</span>' + seg("flip", [[false, "그대로"], [true, "좌우 반전"]]) + "</div>") +
    adv(sec("효과", "",
      rng("fade", "흐린 끝", "%") +
      rng("blur", "흐림", "%") +
      rng("gray", "흑백", "%") +
      '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">덮개 색</span>' +
        ovSw("#000000", "검정", "#000000") + ovSw("#ffffff", "흰색", "#ffffff") + ovSw("accent", "강조색", normHex(S.accent) || "#a8a8a6") +
        '<input type="color" class="tsw" data-act="sideovc" value="' + (normHex(sd.ovC) || "#000000") + '" title="덮개 색 직접 고르기" /></div>' +
      rng("ov", "덮개", "%") +
      '<div class="row"><span class="lbl" style="width:52px">덮개 모양</span>' + seg("ovG", [["flat", "전체"], ["grad", "아래로 짙게"]]) + "</div>" +
      rng("op", "진하기", "%") +
      rng("line", "테두리", "") +
      '<p class="note" style="margin:0">' + (on ? "흐린 끝은 사진 가장자리를 둥글게 녹입니다" : "흐린 끝은 카드 쪽 가장자리를 바탕에 녹입니다") + " · 흐림·흑백은 사진을 다시 만들어 저장 이미지에도 그대로 · 덮개는 사진 위에 색을 얹어 글이 잘 읽히게 · 테두리 색은 강조색을 따릅니다</p>")) +
    '<p class="note" style="margin:0">' + (on ? "사진을 끌어 옮기고, 오른쪽 아래 손잡이·두 손가락·휠로 크기를 바꿔요 · 붙일 곳을 바꾸면 같은 사진이 패널로 나가요" : "사진을 패널 위로 끌어 놓아도 바뀝니다 · 붙일 곳 ‘캔버스’로 카드 안에 얹을 수 있어요") + "</p>" +
    "</div>";
}
const SIDE_NAME = { left: "왼쪽", right: "오른쪽", top: "위", bottom: "아래", on: "캔버스 위" };
const SIDE_SHORT = { left: "왼쪽", right: "오른쪽", top: "위", bottom: "아래", on: "캔버스" };
function sideGlyph(p) {
  const r = { left: [3, 3, 6, 14], right: [11, 3, 6, 14], top: [3, 3, 14, 5], bottom: [3, 12, 14, 5], on: [7, 6, 8, 8] }[p];
  return '<svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" style="margin-right:4px;flex:none"><rect x="2.5" y="2.5" width="15" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
    '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="1" fill="currentColor" opacity=".55"/></svg>';
}

function cdlgHTML() {
  return (S.cdlg
      ? '<div class="sheet cdlg"' + (S.cdlg.sticky ? "" : ' data-act="cdlgno"') + '><div class="sheet-card dlg" data-stop>' +
        '<p class="dlg-q">' + esc(S.cdlg.title) + "</p>" +
        (S.cdlg.note ? '<p class="note" style="margin:8px 0 0">' + esc(S.cdlg.note) + "</p>" : "") +
        '<div class="row" style="gap:8px;margin-top:20px">' +
          '<button class="btn wide" data-act="cdlgno">' + esc(S.cdlg.no || "취소") + "</button>" +
          '<button class="btn wide fill' + (S.cdlg.safe ? "" : " danger") + '" data-act="cdlgok">' + esc(S.cdlg.ok || "확인") + "</button>" +
        "</div>" +
        (S.cdlg.alt ? '<button class="link dlg-alt" data-act="cdlgalt">' + esc(S.cdlg.alt) + "</button>" : "") +
        "</div></div>"
      : "");
}
function infoPaneHTML() {
  const I = S.info || {};
  const tog = (k, label) => '<button class="btn wide' + (I[k] !== false ? " on" : "") + '" style="height:34px" data-act="info" data-k="' + k + '" data-hold>' + label + "</button>";
  return '<div class="stack tight"><div class="row" style="gap:8px"><span class="lbl" style="width:52px">표시</span><span class="grow"></span>' +
      '<button class="btn' + (I.on ? " fill" : "") + '" style="height:30px;font-size:11px" data-act="info" data-k="on" data-hold>' + (I.on ? "켜짐" : "꺼짐") + "</button></div>" +
    (I.on
      ? '<div class="row" style="gap:8px">' +
          '<div class="seg" style="flex:1.2">' +
            [["top", "카드 위"], ["bottom", "카드 아래"]].map(x =>
              '<button class="' + ((I.pos || "top") === x[0] ? "on" : "") + '" data-act="info" data-k="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") +
          "</div>" + tog("date", "날짜") + tog("page", "쪽수") + "</div>" +
        (I.date !== false
          ? '<input class="fld" type="text" data-info="dateText" value="' + esc(I.dateText || "") + '" placeholder="날짜 · 비우면 오늘(' + todayText() + ')" />'
          : "") +
        '<input class="fld" type="text" data-info="scene" value="' + esc(I.scene || "") + '" placeholder="장면·장소 · 예: 편의점, 새벽 두 시" />' +
        '<p class="note" style="margin:0">쪽수는 여러 장일 때만 나옵니다 · 모든 장에 같은 자리로 들어갑니다</p>'
      : "") +
    "</div>";
}

function moreHTML() {
  if (!S.more) return "";
  return '<div class="sheet more" data-act="moreclose"><div class="sheet-card" data-stop><h2>더보기</h2>' +
    '<div class="sheet-row" data-act="fsearch"><span class="with-icon">' + ic("search", 19) + "기능 찾기</span><span class=\"meta\">설정이 어디 있는지 이름으로</span></div>" +
    '<div class="sheet-row" data-act="bug"><span class="with-icon">' + ic("flag", 19) + "문제 신고</span><span class=\"meta\">지금 화면 정보와 함께</span></div>" +
    '<div class="sheet-row" data-act="libopen"><span class="with-icon">' + ic("lib", 19) + "내 작업 보관함</span><span class=\"meta\">" + (libList.length ? libList.length + "개" : "만든 카드 모아 보기") + "</span></div>" +
    '<div class="sheet-row" data-act="restart"><span class="with-icon">' + ic("reset", 19) + "새 카드로 시작</span><span class=\"meta\">지금 카드는 보관함에</span></div>" +
    '<p class="sheet-foot">' + MAKER + "</p>" +
    '<button class="sheet-close text" data-act="moreclose">닫기</button></div></div>';
}

const FEATS = [
  { n: "블록 종류 바꾸기", k: "종류 서술 대사 제목 말풍선 아바타 사진 목록 바꾸기 타입", tab: "블록", sub: "종류", sec: "종류" },
  { n: "서식 복사", k: "서식 붓 모양 옮기기 복사 붙이기 브러시", tab: "블록", sub: "종류", sel: '[data-act="brush"]' },
  { n: "같은 종류 모두 맞추기", k: "같은 종류 한꺼번에 일괄 통일 맞추기", tab: "블록", sub: "종류", sel: '[data-act="samesync"]' },
  { n: "구분선 모양", k: "구분선 선 점선 별 물결 가로줄 divider 나눔선", tab: "블록", sub: "종류", sel: '[data-act="dvstyle"]', pick: ["divider"],
    need: "구분선 블록이 있어야 나와요 · 블록 종류에서 ‘구분선’을 고르세요", alt: '[data-act="cat"]' },
  { n: "블록 추가", k: "새 블록 더하기 넣기 추가 플러스", tab: "블록", sel: '[data-act="add"]' },
  { n: "위치 미세 조정", k: "살짝 옮기기 이동 좌표 nudge 미세", tab: "블록", sub: "배치", sel: '[data-num="nx"]' },
  { n: "블록 위·아래 간격", k: "위 간격 아래 간격 블록 사이 띄우기 여백 마진", tab: "블록", sub: "배치", sel: '[data-num="bgap"]' },
  { n: "모든 장에 고정", k: "고정 머리글 꼬리글 상단 하단 반복 핀", tab: "블록", sub: "배치", sel: '[data-act="pin"]' },
  { n: "단 나눔 · 장 나눔", k: "여기서 새 장 오른쪽 단 시작 나누기 페이지 넘기기 끊기 브레이크", tab: "블록", sub: "배치", sel: '[data-act="brk"]' },
  { n: "블록 간격", k: "블록 사이 간격 문단 간격 띄우기 위 간격 아래 간격 이 블록 카드 전체 gap", tab: "블록", sub: "배치", sel: '[data-act="gapscope"]' },
  { n: "말풍선 여백", k: "말풍선 안쪽 여백 패딩 위아래 좌우 버블", tab: "블록", sub: "대화", sel: '[data-act="bpyup"]', pick: ["bubble", "avatar"],
    need: "말풍선·아바타 블록이 없어요 · 블록 종류에서 ‘말풍선’으로 바꾸면 나와요", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "말풍선 너비", k: "말풍선 폭 좁게 넓게 버블", tab: "블록", sub: "대화", sel: '[data-act="talkopt"][data-k="bubW"]', pick: ["bubble", "avatar"], need: "말풍선·아바타 블록이 없어요 · 블록 종류에서 ‘말풍선’으로 바꾸면 나와요", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "말풍선 둥글기", k: "모서리 라운드 둥글게 각지게 버블", tab: "블록", sub: "대화", sel: '[data-act="bubrup"]', pick: ["bubble", "avatar"], need: "말풍선 블록이 있어야 나와요(메신저 콘셉트는 그 앱 모양 그대로)", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "말풍선 이름 숨기기", k: "이름 감추기 화자 숨김 말풍선", tab: "블록", sub: "대화", sel: '[data-act="talkopt"][data-k="bubNoName"]', pick: ["bubble", "avatar"], need: "말풍선·아바타 블록이 없어요 · 블록 종류에서 ‘말풍선’으로 바꾸면 나와요", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "메시지 시간 자동", k: "시간 시각 타임스탬프 오후 메시지 카톡", tab: "블록", sub: "대화", sel: '[data-act="talkopt"][data-k="msgTime"]', pick: ["bubble", "avatar"], need: "말풍선·아바타 블록이 없어요 · 블록 종류에서 ‘말풍선’으로 바꾸면 나와요", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "굵게 · 기울임 · 밑줄", k: "볼드 bold 이탤릭 italic 밑줄 취소선 서식", tab: "글자", sub: "모양", sel: '[data-act="bold"]' },
  { n: "정렬", k: "왼쪽 가운데 오른쪽 양쪽 정렬 align 가운데 맞춤", tab: "글자", sub: "모양", sel: '[data-act="align"]' },
  { n: "대사 모양", k: "화자 이름 위 앞 대사 표시 따옴표 대화", tab: "글자", sub: "모양", sel: '[data-act="dlgname"]',
    need: "대사 블록이 없어요 · 블록 종류에서 ‘대사’로 바꾸면 나와요", altTab: "블록", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "원문 ↔ 번역 간격", k: "번역 간격 원문 영문 두 줄 사이 translation", tab: "글자", sub: "모양", sel: '[data-act="bigapup"]',
    need: "번역 블록이 없어요 · 블록 종류에서 ‘번역’으로 바꾸면 나와요", altTab: "블록", altSub: "종류", alt: '[data-act="cat"]' },
  { n: "여러 블록 고르기", k: "여러 개 담기 다중 선택 한꺼번에 묶기", tab: "글자", sub: "모양", adv: 1, sel: '[data-act="pickmode"]' },
  { n: "적용 대상 · 카드 전체", k: "카드 전체 모두 한꺼번에 적용 범위", tab: "글자", sub: "모양", adv: 1, sel: '[data-act="famscope"]' },
  { n: "글자 꾸미기", k: "꾸밈 형광 밑줄 장식 윗주 루비 동그라미 데코", tab: "글자", sub: "꾸미기", sel: ".deco-grid" },
  { n: "첫 글자 크게", k: "드롭캡 dropcap 첫 글자 장식", tab: "글자", sub: "꾸미기", sel: '[data-act="dropcap"]' },
  { n: "세로쓰기", k: "세로 쓰기 세로로 vertical 세로 글 종서", tab: "글자", sub: "꾸미기", sel: '[data-act="vert"]' },
  { n: "글자 크기", k: "크기 키우기 줄이기 폰트 사이즈 px 크게 작게", tab: "글자", sub: "크기", sel: '[data-num="sel"], [data-num="fs"]' },
  { n: "굵기", k: "웨이트 weight 두께 얇게 가늘게 굵게 볼드 폰트 굵기 font-weight 진하게", tab: "글자", sub: "크기", sel: '[data-act="fwv"]' },
  { n: "자간", k: "글자 사이 간격 letter spacing 자간", tab: "글자", sub: "크기", sel: '[data-num="ls"]' },
  { n: "행간", k: "줄 간격 줄 사이 line height 행간 줄간격", tab: "글자", sub: "크기", sel: '[data-num="lh"]' },
  { n: "장평", k: "글자 폭 납작 홀쭉 가로 비율", tab: "글자", sub: "크기", sel: '[data-num="cw"]' },
  { n: "줄바꿈", k: "단어 끊기 줄 바꿈 keep-all 낱말", tab: "글자", sub: "크기", adv: 1, sel: '[data-act="wordbreak"]' },
  { n: "들여쓰기", k: "첫 줄 들여 쓰기 인덴트 indent 문단", tab: "글자", sub: "크기", adv: 1, sel: '[data-act="indent"]' },
  { n: "글꼴", k: "폰트 서체 명조 고딕 손글씨 font", tab: "글자", sub: "글꼴", sec: "글꼴" },
  { n: "한자·일본어 글꼴", k: "한자 일본어 중국어 간체 번체 가나 日 中 简 繁 japanese chinese", tab: "글자", sub: "글꼴", sel: '[data-act="jaonly"]' },
  { n: "글자색", k: "글씨 색 텍스트 색 컬러 칠하기", tab: "색", tgt: "text", sec: "견본" },
  { n: "형광펜", k: "하이라이트 배경색 밑칠 highlight 형광", tab: "색", tgt: "hilite", sec: "견본" },
  { n: "말풍선 색", k: "말풍선 바탕 색 버블 색", tab: "색", tgt: "bubble", sec: "견본" },
  { n: "직접 색 고르기", k: "컬러피커 색 코드 hex 원하는 색", tab: "색", tgt: "text", sec: "원하는 색 고르기" },
  { n: "글자 투명도", k: "투명 흐리게 옅게 불투명 알파", tab: "색", tgt: "text", sel: '[data-num="alpha"]' },
  { n: "색 추천", k: "어울리는 색 추천 짝 배색", tab: "색", tgt: "text", sel: '[data-act="recopen"]' },
  { n: "따옴표·괄호 자동 색", k: "따옴표 괄호 자동 색 대사 색 지문", tab: "색", sub: "따옴표", sec: "자동 색" },
  { n: "인물 색", k: "인물 화자 캐릭터 이름 색 사람마다", tab: "색", sub: "인물", sec: "인물 색" },
  { n: "대사 강조선", k: "강조선 대사 옆 줄 세로선 바", tab: "색", sub: "인물", sel: '[data-act="dbar"]' },
  { n: "템플릿", k: "템플릿 견본 디자인 예시 시작 모양", tab: "테마", sub: "템플릿", sec: "템플릿" },
  { n: "프리셋 저장 · 공유 코드", k: "프리셋 저장 내 설정 공유 코드 가져오기", tab: "테마", sub: "템플릿", sec: "프리셋" },
  { n: "콘셉트", k: "스킨 콘셉트 테마 신문 고서 네온 다이어리 레트로 메신저", tab: "테마", sub: "콘셉트", sel: '[data-act="skin"]' },
  { n: "바탕색", k: "배경색 바탕 색 그라데이션 카드 색", tab: "테마", sub: "바탕", sec: "바탕" },
  { n: "배경 사진", k: "바탕 사진 배경 이미지 사진 넣기 백그라운드", tab: "테마", sub: "바탕", sel: '[data-act="bgmode"][data-m="image"]' },
  { n: "강조색", k: "포인트 색 액센트 accent", tab: "테마", sub: "바탕", sel: '[data-act="accent"]' },
  { n: "테두리", k: "테두리 프레임 액자 선 border", tab: "테마", sub: "장식", sel: '[data-act="frame"]' },
  { n: "따옴표 장식", k: "큰 따옴표 인용 장식 왼쪽 위", tab: "테마", sub: "장식", sel: '[data-act="qmark"]' },
  { n: "사진 효과", k: "책 사진 기울이기 찍은 느낌 흐림 효과 필름", tab: "테마", sub: "효과", sel: '[data-act="pfx"]' },
  { n: "글자 그라데이션", k: "그라데이션 글자 색 번짐 그래디언트", tab: "테마", sub: "효과", sel: '[data-act="tgrad"]' },
  { n: "글자 그림자", k: "그림자 번짐 shadow 글자 잘 보이게", tab: "테마", sub: "효과", adv: 1, sel: '[data-act="tsh"]' },
  { n: "비율", k: "비율 크기 정사각 세로 가로 인스타 4:5 9:16 16:9 판형", tab: "판형", sub: "비율", sel: ".ratiogrid" },
  { n: "최소 높이(자동 비율)", k: "높이 맞추기 같은 높이 두 장 카드 높이 최소 고정 자동", tab: "판형", sub: "비율", sel: ".ratiogrid" },
  { n: "가로세로 반전", k: "가로세로 바꾸기 뒤집기 회전 돌리기 가로로 세로로 반전", tab: "판형", sub: "비율", sel: '[data-act="ratioflip"]',
    need: "자동·정사각 비율은 바꿀 것이 없어요" },
  { n: "직접 비율", k: "비율 직접 입력 숫자 가로 세로", tab: "판형", sub: "비율", sel: '[data-num="rw"]', need: "자동 비율에서는 너비를 정해요", alt: ".ratiogrid" },
  { n: "글 위치 (9칸)", k: "세로 위치 가로 위치 위 가운데 아래 왼쪽 오른쪽 9칸 앵커 글 묶음 자리 중앙", tab: "판형", sub: "비율", sel: ".tposgrid" },
  { n: "글 폭", k: "글 너비 텍스트 폭 좁게 묶음 폭 글 영역", tab: "판형", sub: "비율", sel: '[data-num="textw"]' },
  { n: "여러 장", k: "여러 장 나누기 페이지 넘침 캐러셀", tab: "판형", sub: "비율", sel: '[data-act="flow"][data-f="pages"]', self: 1 },
  { n: "한 장에 맞춤", k: "한 장 맞춤 줄이기 축소 넘칠 때 fit", tab: "판형", sub: "비율", sel: '[data-act="flow"][data-f="fit"]', self: 1 },
  { n: "2단", k: "두 단 2단 칼럼 column 신문 손잡이 단 사이 간격", tab: "판형", sub: "비율", sel: '[data-act="flow"][data-f="columns"]', self: 1 },
  { n: "단 채우기", k: "단 채우기 양쪽 균형 왼쪽부터 2단 balance", tab: "판형", sub: "비율", sel: '[data-act="colfill"]',
    need: "‘2단’을 고르면 나와요", alt: '[data-act="flow"][data-f="columns"]' },
  { n: "단 사이 간격", k: "단 사이 간격 칼럼 간격 2단 가운데", tab: "판형", sub: "비율", sel: '[data-num="colgap"]', need: "‘2단’을 고르면 나와요", alt: '[data-act="flow"][data-f="columns"]' },
  { n: "레터박스", k: "검은 띠 영화 시네마 위아래 띠 letterbox", tab: "판형", sub: "비율", sel: '[data-act="lbox"]' },
  { n: "안전 여백 가이드", k: "가이드 안내선 여백 표시 편집 도움", tab: "판형", sub: "비율", sel: '[data-act="guide"]' },
  { n: "이미지 패널", k: "옆 사진 패널 사진 붙이기 이미지 칸 캔버스 위", tab: "판형", sub: "이미지 패널", sel: '[data-act="sideon"], [data-act="sidepick"]' },
  { n: "판 기준", k: "판 기준 카드만 이미지 패널 포함 비율 기준", tab: "판형", sub: "비율", sel: '[data-act="ratiobox"]',
    need: "바깥 이미지 패널을 붙이고 비율이 고정일 때 나와요", altSub: "이미지 패널", alt: '[data-act="sideon"], [data-act="sideset"][data-k="pos"]' },
  { n: "이미지 패널 흐림", k: "패널 흐림 블러 blur 사진 흐리게 효과", tab: "판형", sub: "이미지 패널", adv: 1, sel: '[data-act="sidev"][data-k="blur"]',
    need: "이미지 패널을 먼저 붙여야 나와요", alt: '[data-act="sideon"]' },
  { n: "이미지 패널 흑백", k: "패널 흑백 회색 그레이 gray 효과", tab: "판형", sub: "이미지 패널", adv: 1, sel: '[data-act="sidev"][data-k="gray"]',
    need: "이미지 패널을 먼저 붙여야 나와요", alt: '[data-act="sideon"]' },
  { n: "이미지 패널 덮개", k: "패널 덮개 어둡게 오버레이 overlay 효과", tab: "판형", sub: "이미지 패널", adv: 1, sel: '[data-act="sidev"][data-k="ov"]',
    need: "이미지 패널을 먼저 붙여야 나와요", alt: '[data-act="sideon"]' },
  { n: "여백", k: "여백 가장자리 패딩 좌우 margin padding", tab: "판형", sub: "여백", sel: '[data-num="pad"]' },
  { n: "위아래 여백", k: "위 아래 여백 상하 패딩", tab: "판형", sub: "여백", sel: '[data-num="pady"]' },
  { n: "정보 줄", k: "쪽수 날짜 출처 아이디 정보 줄 페이지 번호", tab: "판형", sub: "여백", sel: '[data-act="info"]' },
  { n: "내보내기 · 저장", k: "저장 다운로드 내보내기 이미지 저장 png 공유", top: 1, sel: '[data-act="opensheet"]' },
  { n: "미리보기", k: "미리 보기 확인 프리뷰", top: 1, sel: '[data-act="preview"]' },
  { n: "되돌리기", k: "실행 취소 되돌리기 undo 취소", top: 1, sel: '[data-act="undo"]' },
  { n: "내 작업 보관함", k: "보관함 저장한 카드 예전 작업 라이브러리", more: 1, sel: '[data-act="libopen"]' },
  { n: "문제 신고", k: "버그 신고 오류 문제 제보", more: 1, sel: '.sheet [data-act="bug"]' },
  { n: "새 카드로 시작", k: "새로 시작 처음부터 초기화 새 카드", more: 1, sel: '[data-act="restart"]' }
];
const FS_TGT = { text: "글자색", hilite: "형광펜", bubble: "말풍선" };
const FS_HIT_MS = 1500;
const fsPath = (f) => f.more ? "더보기 ⋯" : f.top ? "위 줄 · 상태 줄" :
  TAB_LABEL[f.tab] + (f.tgt ? " › " + FS_TGT[f.tgt] : f.sub ? " › " + f.sub : "") + (f.adv ? " · 더 많은 설정" : "");
const FS_CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const fsCho = (s) => s.replace(/[가-힣]/g, ch => FS_CHO[Math.floor((ch.charCodeAt(0) - 0xac00) / 588)]);
const fsNorm = (s) => String(s || "").toLowerCase().replace(/[\s·\-_/()‘’'"↔›,.]/g, "");
function fsFind(q) {
  const n = fsNorm(q);
  if (!n) return FEATS.slice();
  const cho = /^[ㄱ-ㅎ]+$/.test(n), words = String(q).toLowerCase().split(/\s+/).map(fsNorm).filter(Boolean);
  const out = [];
  FEATS.forEach((f, i) => {
    const name = fsNorm(f.n), keys = fsNorm(f.k), path = fsNorm(fsPath(f));
    let s = 0;
    if (cho) s = fsCho(name).indexOf(n) >= 0 ? 3 : fsCho(keys).indexOf(n) >= 0 ? 1 : 0;
    else if (name.indexOf(n) === 0) s = 6;
    else if (name.indexOf(n) >= 0) s = 5;
    else if (keys.indexOf(n) >= 0) s = 3;
    else if (path.indexOf(n) >= 0) s = 1;
    else if (words.length > 1 && words.every(w => (name + keys + path).indexOf(w) >= 0)) s = 2;
    if (s) out.push([s, i, f]);
  });
  return out.sort((a, b) => b[0] - a[0] || a[1] - b[1]).map(x => x[2]);
}
let fsEl = null, fsList = [], fsCur = 0, fsMark = null, fsMarkT = 0;
function fsOpen() {
  if (S.screen !== "edit") return;
  if (fsEl) { fsEl.querySelector(".fs-in").focus(); return; }
  bmenuClose();
  const el = document.createElement("div");
  el.className = "fsearch";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "기능 찾기");
  el.innerHTML = '<div class="fs-card"><div class="fs-head">' + ic("search", 18) +
    '<input class="fs-in" type="search" role="combobox" aria-expanded="true" aria-controls="fs-list" aria-autocomplete="list" aria-label="찾을 기능"' +
      ' placeholder="찾을 기능 · 예: 세로쓰기, 가로세로, 행간" enterkeyhint="go" autocomplete="off" autocapitalize="off" spellcheck="false" />' +
    '<button class="fs-x" type="button">닫기</button></div>' +
    '<ul class="fs-list" id="fs-list" role="listbox" aria-label="찾은 기능"></ul>' +
    '<p class="fs-foot">고르면 그 설정으로 옮겨 가 반짝여요' + (matchMedia("(pointer: coarse)").matches ? "" : " · ↑↓ 고르기 · Enter 가기 · Esc 닫기 · Ctrl+K 로 다시 열기") + "</p></div>";
  document.body.appendChild(el);
  fsEl = el;
  const inp = el.querySelector(".fs-in");
  inp.addEventListener("input", () => fsDraw(inp.value));
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); fsMove(e.key === "ArrowDown" ? 1 : -1); }
    else if (e.key === "Enter") { e.preventDefault(); if (fsList[fsCur]) fsGo(fsList[fsCur]); }
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); fsClose(); }
  });
  el.addEventListener("click", (e) => {
    if (e.target === el || e.target.closest(".fs-x")) { fsClose(); return; }
    const it = e.target.closest("[data-fi]");
    if (it) fsGo(fsList[+it.dataset.fi]);
  });
  el.addEventListener("pointerdown", (e) => { if (e.target === el) e.preventDefault(); });
  fsDraw("");
  inp.focus();
}
function fsClose() {
  if (!fsEl) return;
  const el = fsEl;
  fsEl = null;
  const a = document.activeElement;
  if (a && el.contains(a)) a.blur();
  el.remove();
}
function fsDraw(q) {
  if (!fsEl) return;
  fsList = fsFind(q);
  fsCur = 0;
  const ul = fsEl.querySelector(".fs-list");
  if (!fsList.length) {
    ul.innerHTML = '<li class="fs-none" role="presentation">찾는 기능이 없어요 · 다른 말로(예: ‘간격’ ‘위치’ ‘사진’) 찾아보세요</li>';
    return;
  }
  let last = null;
  ul.innerHTML = fsList.map((f, i) => {
    const g = f.more || f.top ? "그 밖에" : TAB_LABEL[f.tab];
    const head = !q.trim() && g !== last ? '<li class="fs-g" role="presentation">' + g + "</li>" : "";
    last = g;
    return head + '<li class="fs-it' + (i === 0 ? " on" : "") + '" id="fs-o' + i + '" role="option" aria-selected="' + (i === 0) + '" data-fi="' + i + '">' +
      "<b>" + esc(f.n) + '</b><span class="fs-path">' + esc(fsPath(f)) + "</span></li>";
  }).join("");
  fsEl.querySelector(".fs-in").setAttribute("aria-activedescendant", "fs-o0");
}
function fsMove(d) {
  if (!fsEl || !fsList.length) return;
  fsCur = (fsCur + d + fsList.length) % fsList.length;
  fsEl.querySelectorAll(".fs-it").forEach(n => { const on = +n.dataset.fi === fsCur; n.classList.toggle("on", on); n.setAttribute("aria-selected", on); if (on) n.scrollIntoView({ block: "nearest" }); });
  fsEl.querySelector(".fs-in").setAttribute("aria-activedescendant", "fs-o" + fsCur);
}
function fsGo(f) {
  if (!f) return;
  fsClose();
  if (S.screen !== "edit") return;
  fsMark = null; clearTimeout(fsMarkT);
  const patch = { preview: false, sheet: false, lib: false, more: !!f.more };
  if (f.tab) {
    patch.tab = f.tab; patch.fold = false;
    if (f.adv) patch.advOn = Object.assign({}, S.advOn || {}, { [f.tab]: true });
    if (f.tab === "색") { patch.sub = Object.assign({}, S.sub || {}, { "색": f.tgt ? "" : f.sub }); if (f.tgt) patch.target = f.tgt; }
    else if (f.sub) patch.sub = Object.assign({}, S.sub || {}, { [f.tab]: f.sub });
    if (f.pick) {
      const b = cur();
      if (!b || f.pick.indexOf(b.type) < 0) {
        const nb = S.blocks.find(x => f.pick.indexOf(x.type) >= 0);
        if (nb) { patch.active = nb.id; patch.cat = catOf(nb.type); patch.picks = []; patch.pickOn = false; }
      }
    }
  }
  set(patch);
  const moved = patch.active ? (TYPES[cur().type] || {}).n : "";
  requestAnimationFrame(() => requestAnimationFrame(() => fsLand(f, moved)));
}
const fsRoot = (f) => (f.tab ? app.querySelector(".panel-body") : app) || app;
const fsShown = (n) => n.getClientRects().length > 0;
function fsQuery(root, sel, secName) {
  if (sel) return [...root.querySelectorAll(sel)].find(fsShown) || null;
  if (secName) return [...root.querySelectorAll(".sec")].find(s => { const b = s.querySelector(".sec-h b"); return b && b.textContent.trim() === secName; }) || null;
  return null;
}
const fsBox = (el, self) => self ? el : el.classList.contains("sec") || el.matches(".ratiogrid, .tposgrid, .deco-grid") ? el : (el.closest(".row") || el.closest(".seg, .vpick") || el);
function fsLand(f, moved) {
  let sel = f.sel, secName = f.sec, el = fsQuery(fsRoot(f), sel, secName);
  if (!el && (f.alt || f.altSub || f.altTab)) {
    if (f.altTab || f.altSub) {
      const t = f.altTab || f.tab;
      set({ tab: t, sub: Object.assign({}, S.sub || {}, f.altSub ? { [t]: f.altSub } : {}) });
    }
    sel = f.alt; secName = null;
    el = fsQuery(fsRoot(f), sel, null);
  }
  if (!el) { flash(f.need || "지금 화면에는 이 기능이 없어요"); return; }
  const msg = f.need && (sel !== f.sel || el.disabled) ? f.need : moved ? "‘" + moved + "’ 블록을 골랐어요" : "";
  if (msg) {
    flash(msg);
    el = fsQuery(fsRoot(f), sel, secName);
    if (!el) return;
  }
  const self = !!f.self || sel !== f.sel;
  fsMark = { f: f, sel: sel, sec: secName, self: self, at: Date.now(), where: fsWhere() };
  clearTimeout(fsMarkT);
  fsMarkT = setTimeout(() => { fsMark = null; app.querySelectorAll(".fhit").forEach(n => n.classList.remove("fhit")); }, FS_HIT_MS + 60);
  app.querySelectorAll(".fhit").forEach(n => n.classList.remove("fhit"));
  fsPaint();
  const pb = f.tab ? app.querySelector(".panel-body") : null;
  const box = fsBox(el, self);
  if (pb && pb.contains(box)) {
    pb.classList.remove("ph-hide");
    const r = box.getBoundingClientRect(), pr = pb.getBoundingClientRect();
    const head = pb.querySelector(".panehead"), hh = head ? head.offsetHeight : 0;
    const room = pr.height - hh;
    const top = pb.scrollTop + (r.top - pr.top) - hh - Math.max(8, (room - r.height) / 2);
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    fsMark.top = Math.max(0, Math.round(top));
    pb.scrollTo({ top: fsMark.top, behavior: smooth ? "smooth" : "auto" });
  }
}
const fsWhere = () => S.tab + ">" + ((S.sub || {})[S.tab] || "") + ">" + (S.tab === "색" ? S.target : "") + ">" + !!S.more;
function fsPaint() {
  if (!fsMark) return;
  const gone = Date.now() - fsMark.at;
  if (gone > FS_HIT_MS || fsMark.where !== fsWhere()) { fsMark = null; return; }
  const el = fsQuery(fsRoot(fsMark.f), fsMark.sel, fsMark.sec);
  if (!el) return;
  const pb = fsMark.top != null && gone < 600 ? app.querySelector(".panel-body") : null;
  if (pb && Math.abs(pb.scrollTop - fsMark.top) > 1) pb.scrollTop = fsMark.top;
  const box = fsBox(el, fsMark.self);
  if (box.classList.contains("fhit")) return;
  box.style.animationDelay = -gone + "ms";
  box.classList.add("fhit");
}
let busyCancel = false;
function busyHTML() {
  const B = S.busy;
  if (!B) return "";
  return '<div class="sheet busy"><div class="sheet-card dlg" data-stop>' +
    '<p class="dlg-q">이미지 만드는 중</p>' +
    '<div class="busybar"><i style="width:' + Math.round(B.i / B.n * 100) + '%"></i></div>' +
    '<p class="note"><span class="mono" data-ui="busyn">' + B.i + " / " + B.n + "</span>" + (B.n > 1 ? "장" : "") + "</p>" +
    '<div class="row" style="margin-top:14px"><button class="btn wide" data-act="busycancel">취소</button></div></div></div>';
}
function busyTick(i, n) {
  const bar = app.querySelector(".busybar i"), t = app.querySelector('[data-ui="busyn"]');
  if (bar) bar.style.width = Math.round(i / n * 100) + "%";
  if (t) t.textContent = i + " / " + n;
}

function overlaysHTML() {
  const [w, h] = outDims();
  const K = expK();
  const erow = (act, icon, label, meta) => '<div class="sheet-row" data-act="' + act + '"><span class="with-icon">' + ic(icon, 19) + label + "</span>" +
    (meta ? '<span class="meta">' + meta + "</span>" : "") + "</div>";
  return recHTML() + busyHTML() + moreHTML() + libHTML() + bsheetHTML() + (S.sheet
      ? '<div class="sheet" data-act="closesheet"><div class="sheet-card exp" data-stop>' +
        '<div class="exp-head"><h2>이미지로 내보내기</h2><span class="exp-dim mono">' + Math.round(w * K) + " × " + Math.round(h * K) +
          (S.pages > 1 ? " · " + S.pages + "장" : "") + " · PNG</span></div>" +
        '<div class="seg exp-size">' +
          [[0, "SNS용", EXPORT_BASE], [1, "고해상도", EXPORT_BASE * 2]].map(x =>
            '<button class="' + ((S.expHi ? 1 : 0) === x[0] ? "on" : "") + '" data-act="expsize" data-hi="' + x[0] + '" data-hold aria-pressed="' + ((S.expHi ? 1 : 0) === x[0]) + '">' + x[1] +
            ' <span class="mono">' + x[2] + "</span></button>").join("") + "</div>" +
        (S.fit < FIT_SMALL && !S.expHi ? '<p class="exp-meta">글을 ' + Math.round(S.fit * 100) + "%로 줄여 담았어요 · 고해상도로 저장하면 작은 글씨도 또렷해요</p>" : "") +
        (S.ratio !== "auto" && RATIO_FOR[S.ratio] ? '<p class="exp-meta">' + ratioFor(S.ratio) + "에 맞아요</p>" : '<div class="exp-gap"></div>') +
        '<button class="btn fill exp-main" data-act="save">' + ic("save", 20) +
          "<span>" + (S.pages > 1 ? S.pages + "장 모두 저장" : "사진에 저장") + "</span>" +
          '<span class="exp-sub">' + (S.pages > 1 ? (canShareFiles() ? "사진첩에 한 번에" : "ZIP 하나로") : "") + "</span></button>" +
        '<div class="exp-grp"><span class="exp-lbl">이미지</span></div>' +
        (S.pages > 1 ? erow("saveone", "save", "지금 장만 저장", (S.page + 1) + " / " + S.pages) : "") +
        erow("copyimg", "pic", "이미지 복사", S.pages > 1 ? "지금 장" : "") +
        erow("share", "share", "공유", S.pages > 1 ? S.pages + "장" : "") +
        '<div class="exp-grp"><span class="exp-lbl">글</span></div>' +
        erow("copytxt", "text", "문장만 텍스트로 복사", "") +
        erow("copyblog", "clip", "블로그용 복사", "네이버 · 사진+글") +
        '<div class="exp-grp"><span class="exp-lbl">HTML 위젯</span>' +
          '<div class="seg" role="group" aria-label="HTML 배율">' + [[1, "1×"], [1.5, "1.5×"], [2, "2×"]].map(x =>
            '<button class="' + ((S.htmlK || 1.5) === x[0] ? "on" : "") + '" data-act="htmlk" data-k="' + x[0] + '" data-hold aria-pressed="' + ((S.htmlK || 1.5) === x[0]) + '">' + x[1] + "</button>").join("") + "</div></div>" +
        erow("copyhtml", "code", "HTML로 복사", "티스토리 · " + (S.pages > 1 ? S.pages + "장 · " : "") + "폭 " + Math.round(sheetW() * (S.htmlK || 1.5)) + "px") +
        erow("savehtml", "save", "HTML 파일로 저장", "") +
        '<button class="sheet-close text" data-act="closesheet">닫기</button></div></div>'
      : "") +
    (S.pdlg
      ? '<div class="sheet" data-act="pdlgclose"><div class="sheet-card" data-stop>' +
        "<h2>" + (S.pdlg.mode === "edit" ? "프리셋 편집" : "지금 설정을 프리셋으로 저장") + "</h2>" +
        '<input class="fld" data-pname data-keep="pname" value="' + esc(S.pdlg.name || "") +
          '" maxlength="' + PNAME_MAX + '" placeholder="이름" spellcheck="false" autocapitalize="off" />' +
        '<p class="note" style="margin:10px 0 0">' +
          (S.pdlg.mode === "edit"
            ? "이름을 고쳐 저장하거나, 이 프리셋에 담긴 설정을 지금 화면의 설정으로 갈아 끼웁니다."
            : "배경·강조색·글꼴·글자 크기·굵기·자간·행간·여백·간격·비율까지 지금 화면의 설정을 담습니다. " +
              "배경 사진 자체는 담기지 않습니다. 이미 있는 이름으로 저장하면 그 프리셋을 덮어씁니다.") +
        "</p>" +
        (S.pdlg.mode === "edit"
          ? '<div class="stack tight" style="margin-top:16px">' +
              '<button class="btn tall fill" data-act="pdlgok">이름 저장</button>' +
              '<button class="btn tall" data-act="povr">지금 화면 설정으로 덮어쓰기</button>' +
              '<button class="btn tall" data-act="pcode" data-p="' + esc(S.pdlg.id) + '">이 프리셋 공유 코드</button>' +
              '<div class="row" style="gap:8px">' +
                '<button class="btn wide tall danger" data-act="pdlgdel">지우기</button>' +
                '<button class="btn wide tall" data-act="pdlgclose">취소</button>' +
              "</div></div>"
          : '<div class="row" style="gap:8px;margin-top:16px">' +
              '<button class="btn wide tall" data-act="pdlgclose">취소</button>' +
              '<button class="btn wide tall fill" data-act="pdlgok">저장</button>' +
            "</div>") +
        "</div></div>"
      : "") +
    (S.xdlg
      ? '<div class="sheet" data-act="xdlgclose"><div class="sheet-card" data-stop>' +
        "<h2>" + (S.xdlg.mode === "export" ? "공유 코드 · " + esc(S.xdlg.name || "") : "코드로 프리셋 가져오기") + "</h2>" +
        '<textarea class="fld xcode" data-xcode rows="4" spellcheck="false" autocapitalize="off" autocomplete="off"' +
          (S.xdlg.mode === "export" ? " readonly" : ' placeholder="EXC1: 로 시작하는 코드를 붙여넣으세요"') + ">" + esc(S.xdlg.code || "") + "</textarea>" +
        (S.xdlg.err ? '<p class="note xerr" style="margin:10px 0 0">' + esc(S.xdlg.err) + "</p>" : "") +
        '<p class="note" style="margin:10px 0 0">' +
          (S.xdlg.mode === "export"
            ? "바탕·색·글꼴·크기·간격·비율 같은 설정만 담깁니다. 글과 사진은 담기지 않습니다."
            : "가져온 코드는 내 프리셋에 더해집니다. 설정 값만 읽고 다른 내용은 버립니다.") + "</p>" +
        '<div class="row" style="gap:8px;margin-top:16px">' +
          '<button class="btn wide tall" data-act="xdlgclose">닫기</button>' +
          (S.xdlg.mode === "export"
            ? '<button class="btn wide tall fill" data-act="xdlgcopy">복사</button>'
            : '<button class="btn wide tall fill" data-act="xdlgok">가져오기</button>') +
        "</div></div></div>"
      : "") +
    cdlgHTML() +
    (S.toast
      ? '<div class="toast"><div><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="1.4"><path d="M1.5 6.3 L4.6 9.2 L10.5 2.8"></path></svg><span>' + esc(S.toast) + "</span>" + toastActHTML() + "</div></div>"
      : "");
}

function previewHTML() {
  const multi = S.pages > 1;
  return '<div class="preview">' +
    '<div class="preview-bar">' +
      '<button class="backbtn" data-act="closepreview">' + ic("back", 20) + "편집으로</button>" +
      '<span class="preview-meta mono">' + (S.ratio === "auto" ? "자동 " + autoW() + "×" + dims()[1] : S.ratio) +
        (multi ? " · " + S.pages + "장" : "") + "</span>" +
      '<button class="cta light" data-act="opensheet">내보내기' + (multi ? '<span class="cta-n">' + S.pages + "</span>" : "") + "</button>" +
    "</div>" +
    '<div class="preview-body" data-act="closepreview">' + cardHTML() + "</div>" +
    (multi
      ? '<div class="preview-nav">' +
          '<button data-act="prev" aria-label="이전 장"' + (S.page > 0 ? "" : " disabled") + ">" + ic("back", 20) + "</button>" +
          '<span class="count">' + (S.page + 1) + " / " + S.pages + "</span>" +
          '<button data-act="next" aria-label="다음 장"' + (S.page < S.pages - 1 ? "" : " disabled") + ">" + ic("next", 20) + "</button>" +
          '<span class="preview-hint">좌우로 밀어 넘기기</span></div>'
      : "") +
    "</div>";
}

function editHTML() {
  if (S.preview) return previewHTML() + overlaysHTML();
  const t = cur() ? TYPES[cur().type] : null;
  const status = S.over ? "글이 넘칩니다"
    : (S.flow === "fit" && S.fit < 1 ? "한 장 맞춤 " + Math.round(S.fit * 100) + "%"
    : (S.flow === "columns" && S.fit < 1 ? "2단 맞춤 " + Math.round(S.fit * 100) + "%"
    : (S.flow === "columns" ? "2단 · " + S.blocks.length + "블록"
    : (S.pages > 1 ? S.pages + "장" : S.blocks.length + "블록"))));
  return '<div class="topbar"><button class="backbtn" data-act="back">' + ic("back", 20) + "글 다시 넣기</button>" +
      '<div class="topbar-r">' +
        '<button class="link" data-act="preview">미리보기</button>' +
        viewBtn() +
        '<button class="iconbtn" data-act="more" aria-label="더보기" title="더보기">' + ic("more", 20) + "</button>" +
        '<button class="cta" data-act="opensheet">내보내기' + (S.pages > 1 ? '<span class="cta-n">' + S.pages + "</span>" : "") + "</button>" +
      "</div></div>" +
    '<div class="stage"><div class="stage-scroll">' + cardHTML() + "</div>" +
      '<button class="kbfit mono" data-act="kbfit" data-hold>' + (S.kbFit === "whole" ? "크게 보기" : "전체 보기") + "</button>" +
      (S.pickOn ? '<button class="brushpill pickpill" data-act="pickmode" data-hold>' + ic("check", 14) + "<span>" + pickedIds().length + "개 고름 · 눌러서 담기/빼기</span><b>끝</b></button>" : "") +
      (S.brush ? '<button class="brushpill" data-act="brush" data-hold>' + ic("brush", 14) + "<span>" + esc(S.brush.n) + " 모양 붙이는 중</span><b>끝</b></button>" : "") +
      (S.pages > 1 ? pagerHTML("stagepager") : "") +
      (pinchHint && !swipeHint && !S.pickOn && !S.brush ? pinchHintHTML() : "") +
      '<div class="zoomctl' + ((S.zoomK || 1) !== 1 || S.zoom === "wide" ? " zk" : "") + '">' +
        '<button data-act="zoomwide" data-hold class="zw' + (S.zoom === "wide" ? " on" : "") + '" aria-pressed="' + (S.zoom === "wide") +
          '" title="가로 맞춤 — 글자를 크게 보고 세로는 굴려서">' + ic("wide", 16) + "</button>" +
        '<button data-act="zoomout" data-hold aria-label="축소" title="축소"' + ((S.zoomK || 1) > ZK_MIN ? "" : " disabled") + ">" + ic("minus", 15) + "</button>" +
        '<button class="zr" data-act="zoomreset" data-hold title="눌러서 100%로">' + Math.round((S.zoomK || 1) * 100) + "%</button>" +
        '<button data-act="zoomin" data-hold aria-label="확대" title="확대"' + ((S.zoomK || 1) < ZK_MAX ? "" : " disabled") + ">" + ic("plus", 15) + "</button></div></div>" +
    '<div class="statusbar">' +
      '<div class="info"><div class="bnav">' +
        '<button class="blknav" data-act="blkprev" data-hold aria-label="이전 블록"' + (idx() > 0 ? "" : " disabled") + ">" + ic("back", 15) + "</button>" +
        '<button class="blkpos" data-act="bsheet" data-hold aria-label="이 블록 빠른 메뉴"><span data-ui="blkpos">' + (t ? t.n + " " + (idx() + 1) + "/" + S.blocks.length : "블록 " + S.blocks.length + "개") + "</span>" + ic("more", 13) + "</button>" +
        '<button class="blknav" data-act="blknext" data-hold aria-label="다음 블록"' + (idx() < S.blocks.length - 1 ? "" : " disabled") + ">" + ic("next", 15) + "</button></div>" +
        (S.over || !(S.pages > 1 && S.flow === "pages")
          ? '<span class="sep"></span><span class="st' + (S.over ? " warn" : "") + '" title="' + status + '">' + status + "</span>"
          : (brkCount() ? '<span class="sep"></span><span class="st brkst" title="직접 나눈 곳 ' + brkCount() + '">' + ic("pgbrk", 13) + "나눔 " + brkCount() + "</span>" : "")) +
      "</div>" +
      (S.pages > 1 ? pagerHTML("pager") : "") +
      '<button class="kbbr" data-act="kbbr" data-hold>줄바꿈</button>' +
      '<button class="kbdone" data-act="kbdone">완료</button>' +
      '<div class="hist">' +
        '<button data-act="undo" data-hold aria-label="되돌리기"' + (hist.length ? "" : " disabled") + '>' + ic("undo", 19) + '<span class="hl">되돌리기</span></button>' +
        '<button data-act="redo" data-hold aria-label="다시 하기"' + (future.length ? "" : " disabled") + '>' + ic("redo", 19) + '<span class="hl">다시</span></button>' +
      "</div>" +
    "</div>" +
    '<div class="panel"><div class="panel-rs" data-rs title="끌어서 설정 칸 폭 바꾸기 · 두 번 누르면 처음대로" aria-hidden="true"></div>' +
    '<button class="grabber" data-act="fold" data-hold aria-expanded="' + !S.fold + '">' +
      "<i></i><span>" + (S.fold ? "펼치기" : "접기") + "</span>" + ic(S.fold ? "up" : "down", 13) + "</button>" +
    '<div class="tabs" role="tablist">' +
      TAB_KEYS.map(k => '<button class="' + (S.tab === k ? "on" : "") + '" role="tab" aria-selected="' + (S.tab === k) + '" data-act="tab" data-tab="' + k + '" data-hold>' + ic(TAB_ICON[k], 20) + "<span>" + TAB_LABEL[k] + "</span></button>").join("") +
      '<button class="fsbtn" data-act="fsearch" data-hold aria-label="기능 찾기" title="기능 찾기 · Ctrl+K">' + ic("search", 20) + "<span>찾기</span></button>" +
      '</div><div class="panel-body" role="tabpanel" aria-label="' + TAB_LABEL[S.tab] + '">' + panelHTML() + "</div></div>" +
    '<div class="edit-foot">' + MAKER + "</div>" +
    overlaysHTML();
}

const TEMPLATES = [
  { id: "t-basic", name: "기본", preset: "bi-basic", blocks: [
    { type: "title", a: "밤의 편의점" },
    { type: "subtitle", a: "서른한 번째 여름 · 미주", gapA: -6 },
    { type: "body", gapA: 7, a: "새벽 두 시의 편의점은 세상에서 가장 정직한 자리다. 여기서는 아무도 자기가 왜 깨어 있는지 설명하지 않아도 된다." },
    { type: "credit", a: "© syzzy.xyz" }] },
  { id: "t-novel", cat: "book", name: "소설 발췌", preset: "bi-basic",
    v: { bg: "#faf9f6", famKey: "ridi", wordBreak: "normal", scale: 1.45, lh: 1.35, gap: 10, padX: 28, padY: 40 }, blocks: [
    { type: "section", a: "3장 · 새벽 두 시", ls: -0.12 },
    { type: "body", a: "새벽 두 시의 편의점은 세상에서 가장 정직한 자리다. 여기서는 아무도 자기가 왜 깨어 있는지 설명하지 않아도 된다.", gapA: 4 },
    { type: "body", a: "“또 오셨네요.”" },
    { type: "body", a: "미주가 먼저 말을 걸었다. 남자는 대답 대신 컵라면 두 개를 계산대에 올려놓았다. 하나는 늘 그렇듯 뜯지 않은 채 남을 것이었다." },
    { type: "credit", a: "『밤의 편의점』 37쪽", ls: -0.1 }] },
  { id: "t-webnovel", cat: "book", name: "웹소설 다크", preset: "bi-dark",
    v: { bg: "#18181a", accent: "#8a8f98", famKey: "pretendard", scale: 1.45, lh: 1.35, gap: 14, padX: 26, padY: 40, ratio: "4:5" }, blocks: [
    { type: "section", a: "12화", ls: -0.12 },
    { type: "body", a: "문이 열리는 소리에 미주는 고개를 들었다.", align: "left", gapA: 4 },
    { type: "body", a: "“오늘은 하나만 사세요.”", align: "left" },
    { type: "body", a: "남자가 멈칫했다. 계산대 위에 올려 둔 컵라면 두 개 사이로, 아주 짧은 침묵이 지나갔다.", align: "left" },
    { type: "body", a: "“……어떻게 아셨어요.”", align: "left" },
    { type: "body", a: "그녀는 대답하지 않았다. 대신 온수기 버튼을 눌렀다.", align: "left" }] },
  { id: "t-chat", cat: "line", name: "대화 말풍선", preset: "bi-chat",
    v: { scale: 1.5, gap: 9, padX: 22, padY: 36 }, blocks: [
    { type: "stamp", a: "편의점 · 새벽 2:14", ls: -0.12 },
    { type: "bubble", a: "이 시간에 자주 오시네요.", b: "점원", side: "left", bub: "#ffffff" },
    { type: "bubble", a: "뜨거운 게 필요해서요.", side: "right" },
    { type: "bubble", a: "물은 제가 받아 드릴게요.", b: "점원", side: "left", bub: "#ffffff" },
    { type: "bubble", a: "고마워요, 정말로.", side: "right" },
    { type: "credit", a: "『밤의 편의점』 중에서", ls: -0.1 }] },
  { id: "t-quote", cat: "book", name: "한 줄 인용", preset: "bi-note",
    v: { bg: "#f6f4ef", famKey: "maruburi", scale: 1.55, ls: -0.01, lh: 1, gap: 18, padX: 40, padY: 52, ratio: "4:5" }, blocks: [
    { type: "quote", a: "우리 중 누군가는<br>낯선 사람을 위해<br>불을 켜 둔다.", align: "left" },
    { type: "credit", a: "— 미주, 『밤의 편의점』", ls: -0.1, align: "left" }] },
  { id: "t-page", cat: "book", name: "책 한 쪽", preset: "bi-basic",
    v: { bg: "#ffffff", accent: "#3a3a3a", famKey: "maruburi", scale: 1.05, ls: -0.02, lh: 1.25, gap: 2, padX: 44, padY: 56, ratio: "1:1.41", cw: 86, indent: 1, wordBreak: "normal" }, blocks: [
    { type: "title", a: "Small Hours", fam: "noto-serif", ls: 0.03, align: "left" },
    { type: "subtitle", a: "새벽의 편의점 · 미주 × 지우", gapA: -4 },
    { type: "body", a: "편의점 유리문에 김이 서렸다. 비가 그친 지 한참인데도 거리는 아직 젖어 있었고, 걸음마다 운동화 끝이 조금씩 무거워졌다.", gapA: 18 },
    { type: "body", a: "“오늘은 손님이 없네요.”" },
    { type: "body", a: "그녀의 말에 그는 고개만 끄덕였다. 형광등이 한 번 깜박였고, 두 사람은 동시에 천장을 올려다보았다." }] },
  { id: "t-hanja", cat: "book", name: "한자 제목 · 번지는 글", preset: "bi-basic",
    v: { bg: "#ffffff", accent: "#6f807a", famKey: "nanum-m", scale: 1.25, ls: 0.1, lh: 1.05, gap: 8, padX: 36, padY: 62, ratio: "1:1", tgrad: true, tg1: "#7d8c86", tg2: "#101010", wordBreak: "normal" }, blocks: [
    { type: "title", a: "夜店燈火記", fam: "noto-serif", ls: 0.02, align: "left" },
    { type: "body", a: "밤은 생각보다 짧았다. 간판 아래 모인 사람들은 저마다 다른 이유로 깨어 있었고, 아무도 그 이유를 묻지 않았다. 새벽 두 시의 편의점은 세상에서 가장 정직한 자리였다.", align: "justify", gapA: 6 },
    { type: "credit", a: "© syzzy.xyz", fam: "noto-serif", ls: 0.02 }] },
  { id: "t-trans", cat: "line", name: "영문 번역", preset: "bi-dark", each: "translation",
    v: { bg: "#1c1c1e", accent: "#9fb4dc", famKey: "pretendard", scale: 1.55, lh: 1.1, gap: 18, padX: 30, padY: 44, ratio: "4:5" }, blocks: [
    { type: "section", a: "NIGHT SHIFT · S1 E3" },
    { type: "translation", a: "우리 중 누군가는 낯선 사람을 위해 불을 켜 둔다.", b: "Some of us keep the light on for strangers." },
    { type: "translation", a: "그게 네가 여기 있는 이유야.", b: "That's why you're here." },
    { type: "credit", a: "© syzzy.xyz" }] },
  { id: "t-subtitle", cat: "sub", name: "드라마 자막", preset: "bi-dark",
    v: { bg: "#000000", accent: "#c9ccd2", famKey: "nanum-barun", scale: 1.65, lh: 1, gap: 0, padX: 0, padY: 0, ratio: "auto", capSt: "shadow", capPos: "bottom" }, blocks: [
    { type: "scene", a: "누군가는 불을 켜 두어야 하잖아.<br>그게 오늘은 나였던 거고.", ar: "16:9" }] },
  { id: "t-sub-cuts", cat: "sub", name: "여러 컷 캡처", preset: "bi-dark",
    v: { bg: "#000000", accent: "#c9ccd2", famKey: "nanum-barun", scale: 1.5, lh: 1, gap: 3, padX: 0, padY: 0, ratio: "auto", capSt: "shadow", capPos: "bottom" }, blocks: [
    { type: "scene", a: "어디 가는 거야?", ar: "16:9" },
    { type: "scene", a: "불 켜진 데로.", ar: "16:9" },
    { type: "scene", a: "…같이 가.", ar: "16:9" }] },
  { id: "t-sub-film", cat: "sub", name: "영화 자막", preset: "bi-dark",
    v: { bg: "#000000", accent: "#e8c9a8", famKey: "nanum-barun", scale: 1.5, lh: 1, gap: 0, padX: 0, padY: 0, ratio: "auto", capSt: "outline", capPos: "bottom" }, blocks: [
    { type: "scene", a: "그날 밤, 우리는 아무 말도 하지 않았다.", ar: "16:9", lb: "276" }] },
  { id: "t-sub-yellow", cat: "sub", name: "노란 자막", preset: "bi-dark",
    v: { bg: "#000000", accent: "#ffd84a", famKey: "nanum-sq", fw: 1, scale: 1.55, lh: 1, gap: 0, padX: 0, padY: 0, ratio: "auto", capSt: "yellow", capPos: "bottom" }, blocks: [
    { type: "scene", a: "- 어디 가는 거야?<br>- 불 켜진 데로.", ar: "16:9", lb: "276" }] },
  { id: "t-sub-box", cat: "sub", name: "상자 자막", preset: "bi-dark",
    v: { bg: "#000000", accent: "#ffffff", famKey: "nexon1", scale: 1.6, lh: 1, gap: 0, padX: 0, padY: 0, ratio: "auto", capSt: "box", capPos: "bottom" }, blocks: [
    { type: "scene", a: "편의점 불은 꺼지지 않으니까", ar: "16:9" }] },
  { id: "t-sub-dual", cat: "sub", name: "한영 자막", preset: "bi-dark",
    v: { bg: "#000000", accent: "#b9c6d6", famKey: "nanum-barun", scale: 1.6, lh: 1, gap: 0, padX: 0, padY: 0, ratio: "auto", capSt: "shadow", capPos: "bottom" }, blocks: [
    { type: "scene", a: "우리 중 누군가는 불을 켜 둬야 해.", b: "Someone has to keep the light on.", ar: "16:9" }] },
  { id: "t-sub-shorts", cat: "sub", name: "세로 쇼츠 자막", preset: "bi-dark",
    v: { bg: "#000000", accent: "#ffffff", famKey: "hanna-pro", scale: 1.9, lh: 1, gap: 0, padX: 0, padY: 0, ratio: "auto", capSt: "box", capPos: "bottom" }, blocks: [
    { type: "scene", a: "새벽 두 시의 편의점은<br>세상에서 가장 정직한 자리다", ar: "9:16" }] },
  { id: "t-kakao", cat: "msg", name: "카톡 대화", preset: "sk-kakao", v: { scale: 1.5, gap: 9 }, blocks: [
    { type: "stamp", a: "오늘 오후 2:14", ls: -0.12 },
    { type: "avatar", a: "지금 어디야?", b: "지우" },
    { type: "bubble", a: "편의점 가는 중", side: "right" },
    { type: "avatar", a: "컵라면 하나만 부탁해", b: "지우" },
    { type: "bubble", a: "매운 걸로?", side: "right" },
    { type: "avatar", a: "응 제일 매운 거", b: "지우" }] },
  { id: "t-line", cat: "msg", name: "라인 대화", preset: "sk-line", v: { scale: 1.5, gap: 9 }, blocks: [
    { type: "stamp", a: "오후 6:40", ls: -0.12 },
    { type: "avatar", a: "퇴근했어?", b: "미주" },
    { type: "bubble", a: "방금 나왔어", side: "right" },
    { type: "avatar", a: "편의점 앞 벤치에 있을게", b: "미주" },
    { type: "bubble", a: "따뜻한 거 사 갈게", side: "right" }] },
  { id: "t-imsg", cat: "msg", name: "iOS 메시지", preset: "sk-imessage", v: { scale: 1.5, gap: 7 }, blocks: [
    { type: "stamp", a: "오늘 오전 1:02", ls: -0.12 },
    { type: "bubble", a: "아직 안 자?", b: "", side: "left" },
    { type: "bubble", a: "잠이 안 와서", side: "right" },
    { type: "bubble", a: "나도. 창밖에 비 와", side: "left" },
    { type: "bubble", a: "그래서 그런가 봐", side: "right" },
    { type: "bubble", a: "내일 편의점 앞에서 볼래?", side: "left" }] },
  { id: "t-insta", cat: "msg", name: "인스타 DM", preset: "sk-instagram", v: { scale: 1.5, gap: 7 }, blocks: [
    { type: "stamp", a: "오늘 오후 11:20", ls: -0.12 },
    { type: "avatar", a: "스토리에 올린 편의점 어디야?", b: "지우" },
    { type: "bubble", a: "우리 동네 골목 끝", side: "right" },
    { type: "bubble", a: "새벽엔 불빛이 더 예뻐", side: "right" },
    { type: "avatar", a: "다음에 같이 가자", b: "지우" }] },
  { id: "t-x", cat: "msg", name: "X 대화", preset: "sk-twitter", v: { scale: 1.5, gap: 7 }, blocks: [
    { type: "stamp", a: "오전 1:14", ls: -0.12 },
    { type: "bubble", a: "그 장면 봤어?", side: "left" },
    { type: "bubble", a: "편의점에서 불 켜 두는 거", side: "left" },
    { type: "bubble", a: "봤어 나 그거 보고 울었잖아", side: "right" },
    { type: "bubble", a: "“누군가는 불을 켜 두어야 하잖아”", side: "right" }] },
  { id: "t-tiktok", cat: "msg", name: "틱톡 DM", preset: "sk-tiktok", v: { scale: 1.5, gap: 7 }, blocks: [
    { type: "avatar", a: "영상 배경 노래 뭐야?", b: "미주" },
    { type: "bubble", a: "나도 모르고 그냥 넣었어", side: "right" },
    { type: "avatar", a: "편의점 장면이랑 너무 잘 어울려", b: "미주" },
    { type: "bubble", a: "다음 편도 찍어 볼게", side: "right" }] },
  { id: "t-discord", cat: "msg", name: "디스코드", preset: "sk-discord", v: { scale: 1.5, gap: 12 }, blocks: [
    { type: "avatar", a: "오늘 밤 같이 볼 사람?", b: "미주" },
    { type: "avatar", a: "나! 몇 시에 시작해?", b: "지우" },
    { type: "avatar", a: "열한 시. 늦으면 먼저 시작할게", b: "미주" },
    { type: "avatar", a: "컵라면 사 들고 갈게", b: "지우" }] },
  { id: "t-rp-dark", cat: "rp", name: "롤플 다크", preset: "bi-dark",
    v: { bg: "#17171b", accent: "#a99cff", famKey: "pretendard", scale: 1.5, lh: 1.2, gap: 12, padX: 26, padY: 34, ratio: "4:5", dlgBar: false }, blocks: [
    { type: "narration", a: "미주는 계산대 너머로 그를 한참 바라보았다. 새벽 두 시, 편의점엔 두 사람뿐이었다.", align: "left", ls: -0.06 },
    { type: "dialogue", a: "…오늘도 컵라면 두 개예요?", b: "" },
    { type: "narration", a: "지우는 대답 대신 웃었다. 그 웃음이 대답이라는 걸, 그녀는 이제 알았다.", align: "left", ls: -0.06 },
    { type: "dialogue", a: "하나는 당신 거예요. 식기 전에.", b: "" },
    { type: "divider" },
    { type: "stamp", a: "12일차 · 9월 26일 · 02:14 AM · 편의점 계산대", ls: -0.08 },
    { type: "list", a: "미주 : 야간 조끼 / 조금 놀람, 설렘" },
    { type: "list", a: "지우 : 검은 후드티 / 태연한 척" }] },
  { id: "t-rp-light", cat: "rp", name: "롤플 라이트", preset: "bi-basic",
    v: { bg: "#faf8f3", accent: "#8a7f72", famKey: "ridi", scale: 1.5, lh: 1.2, gap: 12, padX: 28, padY: 36, ratio: "4:5", dlgBar: false, vpos: "center" }, blocks: [
    { type: "narration", a: "미주는 계산대 너머로 그를 한참 바라보았다. 새벽 두 시, 편의점엔 두 사람뿐이었다.", align: "left", ls: -0.06 },
    { type: "dialogue", a: "…오늘도 컵라면 두 개예요?", b: "" },
    { type: "narration", a: "지우는 대답 대신 웃었다. 그 웃음이 대답이라는 걸, 그녀는 이제 알았다.", align: "left", ls: -0.06 },
    { type: "dialogue", a: "하나는 당신 거예요. 식기 전에.", b: "" }] },
  { id: "t-rp-status", cat: "rp", name: "상태창", preset: "bi-dark",
    v: { bg: "#1c1d22", accent: "#8fb4ff", famKey: "pretendard", scale: 1.5, lh: 1.1, gap: 10, padX: 26, padY: 34, ratio: "4:5", vpos: "center" }, blocks: [
    { type: "stamp", a: "12일차 · 9월 26일 · 02:14 AM · 편의점 계산대", ls: -0.08 },
    { type: "body", a: "상황 요약: 지우가 컵라면 두 개를 내밀자, 미주는 처음으로 그 이유를 알게 되었다.", align: "left" },
    { type: "list", a: "미주 : 야간 조끼 / 조금 놀람, 설렘" },
    { type: "list", a: "지우 : 검은 후드티 / 태연한 척" },
    { type: "body", a: "💬 지우의 속마음: 오늘은 꼭 같이 먹자고 말해야지.", align: "left" },
    { type: "body", a: "[오늘의 TMI] 그는 매운 걸 못 먹는다.", align: "left" }] },
  { id: "t-lyric-blur", cat: "music", name: "가사 · 블러", preset: "bi-dark",
    v: { bgGrad: 2, bg: "#6a3f78", bg2: "#1b1830", bgDir: "d", accent: "#e7d8f5", famKey: "pretendard", scale: 1.3, ls: -0.01, lh: 1, gap: 14, padX: 26, padY: 30, ratio: "9:16", lyDim: 0.36, artBg: "blur" }, blocks: [
    { type: "track", a: "밤의 편의점", b: "미주" },
    { type: "lyric", a: "불 꺼진 거리 끝에", gapA: 18 },
    { type: "lyric", a: "너 하나 켜 두고 싶어", hot: true },
    { type: "lyric", a: "새벽 두 시의 온기로" },
    { type: "lyric", a: "오늘을 조금 더 버틸게" },
    { type: "lyric", a: "그러니 조금만 더 여기 있어 줘" },
    { type: "player", a: "1:24", b: "-2:10", gapA: 12 }] },
  { id: "t-lyric-card", cat: "music", name: "가사 카드", preset: "bi-dark",
    v: { bg: "#b4553f", accent: "#ffe3d6", famKey: "pretendard", scale: 1.45, ls: -0.02, lh: 1, gap: 12, padX: 30, padY: 34, ratio: "auto", lyDim: 1 }, blocks: [
    { type: "track", a: "밤의 편의점", b: "미주" },
    { type: "lyric", a: "불 꺼진 거리 끝에<br>너 하나 켜 두고 싶어", hot: true, gapA: 18 },
    { type: "lyric", a: "새벽 두 시의 온기로<br>오늘을 조금 더 버틸게", hot: true }] },
  { id: "t-lyric-player", cat: "music", name: "재생 화면", preset: "bi-dark",
    v: { bg: "#141416", accent: "#cfcfd4", famKey: "pretendard", scale: 1.1, ls: -0.01, lh: 1, gap: 12, padX: 28, padY: 30, ratio: "9:16", lyDim: 0.4, artBg: "blur" }, blocks: [
    { type: "track", a: "밤의 편의점", b: "미주", art: "l" },
    { type: "player", a: "1:24", b: "-2:10", gapA: 4 },
    { type: "lyric", a: "너 하나 켜 두고 싶어", hot: true, gapA: 10, align: "center" },
    { type: "lyric", a: "새벽 두 시의 온기로", align: "center" }] },
  { id: "t-lyric-light", cat: "music", name: "가사 · 라이트", preset: "bi-basic",
    v: { bg: "#f6f4ef", accent: "#b4553f", famKey: "maruburi", scale: 1.25, ls: -0.02, lh: 1.05, gap: 12, padX: 32, padY: 40, ratio: "auto", lyDim: 0.3 }, blocks: [
    { type: "lyric", a: "불 꺼진 거리 끝에", align: "center" },
    { type: "lyric", a: "너 하나 켜 두고 싶어", hot: true, align: "center" },
    { type: "lyric", a: "새벽 두 시의 온기로", align: "center" },
    { type: "track", a: "밤의 편의점", b: "미주", gapA: 26 }] },
  { id: "t-lock", cat: "ui", name: "잠금화면 알림", preset: "bi-dark", each: "notif",
    v: { bgGrad: 2, bg: "#3a4a6b", bg2: "#141826", bgDir: "v", accent: "#5b8def", famKey: "pretendard", scale: 1.3, lh: 1, gap: 8, padX: 18, padY: 30, ratio: "9:16" }, blocks: [
    { type: "clock", a: "2:14", b: "9월 27일 토요일" },
    { type: "notif", a: "자?", b: "메시지", c: "지우", t: "지금", gapA: 26 },
    { type: "notif", a: "편의점 앞이야. 불 켜져 있길래", b: "메시지", c: "지우", t: "2분 전" },
    { type: "notif", a: "부재중 전화 3통", b: "전화", c: "지우", t: "5분 전" }] },
  { id: "t-post", cat: "ui", name: "SNS 게시물", preset: "bi-basic", each: "post",
    v: { bg: "#ffffff", accent: "#1d9bf0", famKey: "pretendard", scale: 1.3, lh: 1, gap: 18, padX: 22, padY: 26, ratio: "auto" }, blocks: [
    { type: "post", a: "새벽 두 시에 불 켜진 편의점을 보면 이상하게 안심이 된다. 누군가는 깨어 있다는 거니까.", b: "미주", c: "@syzzy_xyz · 2시간", d: "답글 12 · 재게시 48 · 마음 1.2천" },
    { type: "post", a: "그 불 내가 켜 둔 거야", b: "지우", c: "@jiwoo_ · 1시간", d: "답글 3 · 마음 402" }] },
  { id: "t-memo", cat: "ui", name: "메모", preset: "bi-basic",
    v: { bg: "#fbf8ef", accent: "#d9a300", famKey: "pretendard", scale: 1.35, lh: 1.05, gap: 12, padX: 26, padY: 30, ratio: "4:5" }, blocks: [
    { type: "stamp", a: "2026년 9월 27일 오전 2:14", align: "center" },
    { type: "title", a: "보내지 못한 말" },
    { type: "body", a: "오늘도 편의점 앞을 지나갔다. 불이 켜져 있었고, 너는 거기 없었다.", align: "left" },
    { type: "body", a: "다음엔 들어가 볼까. 컵라면 두 개를 사서.", align: "left" }] },
  { id: "t-search", cat: "ui", name: "검색 기록", preset: "bi-basic", each: "history",
    v: { bg: "#ffffff", accent: "#3b7cf6", famKey: "pretendard", scale: 1.3, lh: 1, gap: 10, padX: 22, padY: 28, ratio: "4:5" }, blocks: [
    { type: "search", a: "편의점 야간 알바 몇 시에 끝나" },
    { type: "section", a: "최근 검색", gapA: 8 },
    { type: "history", a: "컵라면 두 개 사는 이유" },
    { type: "history", a: "좋아하는 사람 앞에서 말 거는 법" },
    { type: "history", a: "새벽 두 시에 문자 보내도 되나" },
    { type: "history", a: "우연히 마주치는 척 하는 법" },
    { type: "history", a: "편의점 근처 24시 카페" }] },
  { id: "t-calls", cat: "ui", name: "통화 기록", preset: "bi-basic", each: "call",
    v: { bg: "#ffffff", accent: "#34c759", famKey: "pretendard", scale: 1.3, lh: 1, gap: 6, padX: 22, padY: 28, ratio: "4:5" }, blocks: [
    { type: "title", a: "최근 기록" },
    { type: "call", a: "지우 (3)", b: "휴대전화", t: "오전 2:14", dir: "miss", gapA: 8 },
    { type: "call", a: "지우", b: "휴대전화", t: "오전 1:58", dir: "miss" },
    { type: "call", a: "미주", b: "휴대전화", t: "어제", dir: "out" },
    { type: "call", a: "편의점", b: "가게", t: "어제", dir: "in" },
    { type: "call", a: "지우 (2)", b: "휴대전화", t: "목요일", dir: "miss" }] },
  { id: "t-credits", cat: "ui", name: "엔딩 크레딧", preset: "bi-dark",
    v: { bg: "#0b0b0c", accent: "#ededee", famKey: "pretendard", scale: 1.3, ls: 0.02, lh: 1, gap: 4, padX: 30, padY: 40, ratio: "9:16", vpos: "center" }, blocks: [
    { type: "narration", a: "각본", ls: 0.1 },
    { type: "subtitle", a: "미주", align: "center" },
    { type: "narration", a: "감독", ls: 0.1, gapA: 16 },
    { type: "subtitle", a: "지우", align: "center" },
    { type: "narration", a: "출연", ls: 0.1, gapA: 16 },
    { type: "subtitle", a: "새벽 두 시의 편의점<br>불 켜진 창문<br>식어 가는 컵라면 두 개", align: "center" },
    { type: "quote", a: "밤의 편의점", gapA: 34 }] },
  { id: "t-letter", cat: "ui", name: "편지지", preset: "bi-hand",
    v: { bg: "#f5eee0", accent: "#9b6b4a", scale: 1.45, lh: 1.35, gap: 12, padX: 34, padY: 42, ratio: "4:5", frame: "double", frameC: "#c9ae8e" }, blocks: [
    { type: "body", a: "지우에게,", align: "left" },
    { type: "body", a: "편의점 불빛 아래서 네가 웃던 날을 자주 생각해. 그날 컵라면이 유난히 따뜻했던 건 아마 너 때문이었을 거야.", align: "left", gapA: 6 },
    { type: "body", a: "다음에 또 새벽 두 시에 만나자.", align: "left" },
    { type: "credit", a: "— 미주가" }] },
  { id: "t-vn", cat: "ui", name: "게임 대화창", preset: "bi-dark", each: "vn",
    v: { bgGrad: 3, bg: "#f3a86b", bg2: "#8a5a9b", bg3: "#2c2748", bgDir: "v", accent: "#f2c46d", famKey: "pretendard", scale: 1.3, lh: 1, gap: 22, padX: 18, padY: 18, ratio: "16:9" }, blocks: [
    { type: "vn", a: "…오늘도 컵라면 두 개예요? 하나는 늘 남기면서.", b: "미주" }] },
  { id: "t-diary", cat: "deco", name: "다이어리", preset: "sk-diary", v: { scale: 1.35, gap: 12 }, blocks: [
    { type: "section", a: "9월 25일 맑음", ls: -0.12 },
    { type: "body", a: "편의점 앞 벤치에서 컵라면을 먹었다. 김이 올라가는 걸 한참 봤다." },
    { type: "list", a: "따뜻한 국물 한 모금" },
    { type: "list", a: "창밖의 가로등" },
    { type: "credit", a: "오늘의 기록", ls: -0.1 }] },
  { id: "t-magazine", cat: "deco", name: "매거진 인용", preset: "sk-magazine", v: { scale: 1.2, gap: 14 }, blocks: [
    { type: "section", a: "INTERVIEW" },
    { type: "title", a: "밤을 지키는 사람들" },
    { type: "quote", a: "“누군가는 불을 켜<br>두어야 하니까요.”", align: "left" },
    { type: "credit", a: "편의점 야간 점원 미주", ls: -0.1 }] },
  { id: "t-night", cat: "deco", name: "별밤 인용", preset: "sk-night", v: { scale: 1.4, padX: 40 }, blocks: [
    { type: "quote", a: "밤이 길수록<br>불빛은 멀리 간다." },
    { type: "credit", a: "『밤의 편의점』 중에서", ls: -0.1, align: "center" }] },
  { id: "t-terminal", cat: "deco", name: "터미널", preset: "sk-terminal", v: { scale: 1.3, gap: 12 }, blocks: [
    { type: "section", a: "~/notes/today.md" },
    { type: "title", a: "새벽 두 시" },
    { type: "body", a: "편의점은 아직 열려 있다. 나도 아직 깨어 있다.", align: "left" },
    { type: "credit", a: "© syzzy.xyz" }] },
  { id: "t-photo-quote", cat: "book", name: "사진 인용", preset: "bi-dark",
    v: { bgGrad: 2, bg: "#3d4859", bg2: "#121a27", bgDir: "v", accent: "#c9d2e0", famKey: "noto-sans", tsh: 1, scale: 1.25, lh: 1, gap: 16, padX: 28, padY: 34, ratio: "4:5" }, blocks: [
    { type: "book", a: "밤의 편의점", b: "미주 지음" },
    { type: "quote", a: "간판 불빛은 아무것도 묻지 않았다.<br>그래서 나는 오래 앉아 있었다.", align: "left", ls: -0.02 }] },
  { id: "t-poem", cat: "book", name: "시집 페이지", preset: "sk-page",
    v: { famKey: "noto-sans", pfx: "spine", ls: 0.02, scale: 1.6, gap: 0, padX: 50, padY: 66 }, blocks: [
    { type: "body", a: "새벽", align: "left" },
    { type: "body", a: "계산대 위에 동전 세 개", align: "left", gapA: 78 },
    { type: "body", a: "누가 두고 간 온기 같아서", align: "left", gapA: 38 }] },
  { id: "t-myeongjo", cat: "book", name: "흰 바탕 명조", preset: "bi-basic",
    v: { bg: "#ffffff", famKey: "nanum-m", scale: 1.65, lh: 1.45, gap: 0, padX: 30, padY: 44, ratio: "1:1", vpos: "center" }, blocks: [
    { type: "body", a: "컵라면 좋아해?<br>응, 제일 좋아해.<br>근데 혼자 먹으면 금방 식더라.<br>뚜껑 덮고 삼 분이 너무 길어.<br>이상한 일이지.", align: "left" },
    { type: "body", a: "그러니까 둘이 먹자, 식기 전에.", align: "left", gapA: 22 }] },
  { id: "t-scan", cat: "book", name: "책 본문", preset: "sk-page",
    v: { bg: "#e6e3dd", famKey: "nanum-m", wordBreak: "normal", indent: 1, ls: 0, scale: 1.6, lh: 1.55, gap: 0, padX: 18, padY: 16 }, blocks: [
    { type: "body", a: "조금 늦었을 뿐이다.", align: "justify" },
    { type: "body", a: "문 닫는 시간은 정해져 있지 않았다. 편의점은 원래 그런 곳이니까. 그래서 나는 매일 밤 조금씩 늦었고, 그는 매일 밤 조금씩 더 기다렸다. 누가 먼저 그만둘지는 아무도 몰랐다.", align: "justify" },
    { type: "body", a: "피곤한 날이면 괜히 그런 셈을 해 본다. 셈이 맞지 않는다는 걸 알면서도, 오늘도 불 켜진 쪽으로 걸음을 옮긴다.", align: "justify" }] },
  { id: "t-monitor", cat: "deco", name: "모니터 화면", preset: "sk-monitor", v: { scale: 2.5 }, blocks: [
    { type: "body", a: "내일도 불 켜 둘게.<br>늦어도 괜찮아.", align: "left" }] },
  { id: "t-ghost", cat: "deco", name: "잔상 글씨", preset: "sk-ghost", v: { scale: 1.6, vpos: "center" }, blocks: [
    { type: "body", a: "너는 새벽 두 시의 간판 같아.<br>가까이 가면 눈부시고<br>멀어지면 제일 먼저 보이니까.", align: "left" },
    { type: "body", a: "너는 식어 가는 컵라면 같아.<br>재촉하지 않아도<br>기다리는 동안 조금씩 사라지니까.", align: "left", gapA: 14 }] },
  { id: "t-ebook", cat: "book", name: "전자책 선택", preset: "sk-ebook", v: { scale: 1.6 }, blocks: [
    { type: "body", a: "형광등 아래에서 우리는 한동안 계산대만 내려다보았다.", align: "left" },
    { type: "body", a: '<span style="background-color: rgba(120, 150, 235, 0.24);">그가 매번 컵라면을 두 개 사는 이유를, 나는 한참 뒤에야 알았다. 하나는 늘 뜯지 않은 채 계산대 옆에 남아 있었다.</span>', align: "left", gapA: 34 }] },
  { id: "t-trsheet", cat: "line", name: "번역 시트", preset: "sk-trsheet", each: "translation", v: { scale: 1.6 }, blocks: [
    { type: "body", a: '便利店的灯一直亮着，好像在等谁回来。我在门口站了很久，才推门进去。<span style="background-color: rgba(92, 120, 170, 0.35);">灯灭之前，我会一直在这里等你。</span>', align: "left" },
    { type: "translation", a: "불이 꺼지기 전까지<br>여기서 계속 기다릴게.", b: "灯灭之前，我会一直在这里等你。" }] },
  { id: "t-hand", cat: "book", name: "필사 노트", preset: "bi-hand",
    v: { scale: 1.5, lh: 1.3, gap: 12, padX: 32, padY: 40 }, blocks: [
    { type: "section", a: "오늘의 필사 · 9월 26일", ls: -0.12 },
    { type: "body", a: "우리 중 누군가는 낯선 사람을 위해 불을 켜 둔다. 그 불이 누구에게 닿을지는 끝내 모르더라도.", align: "left", gapA: 4 },
    { type: "body", a: "그래서 밤은 생각보다 덜 어둡다.", align: "left" },
    { type: "credit", a: "『밤의 편의점』 중에서", ls: -0.1 }] }
];
function lyricList(raw, t) {
  const lines = raw.replace(/\r/g, "").split("\n").map(x => x.trim()).filter(Boolean);
  const tl = t.blocks.filter(x => x.type === "lyric");
  const allHot = tl.length && tl.every(x => x.hot);
  const al = (tl[0] || {}).align;
  const h0 = Math.max(0, tl.findIndex(x => x.hot)), hi = Math.min(h0, lines.length - 1);
  const lyr = lines.map((a, i) => Object.assign({ type: "lyric", a: esc(a), hot: allHot || i === hi }, al ? { align: al } : {}));
  if (lyr[0] && tl[0] && tl[0].gapA) lyr[0].gapA = tl[0].gapA;
  const first = t.blocks.findIndex(x => x.type === "lyric"), last = t.blocks.length - 1 - t.blocks.slice().reverse().findIndex(x => x.type === "lyric");
  const keep = (x) => Object.assign({}, x);
  return first < 0 ? lyr : t.blocks.slice(0, first).map(keep).concat(lyr, t.blocks.slice(last + 1).map(keep));
}
function capList(raw, t) {
  const txt0 = raw.replace(/\r/g, "").trim();
  const parts = /\n\s*\n/.test(txt0) ? txt0.split(/\n\s*\n/) : txt0.split("\n");
  const sc = t.blocks.find(x => x.type === "scene");
  const caps = parts.map(x => x.trim()).filter(Boolean).map((x, i) => {
    const f = x.split(/\s*\|\s*/);
    const c = { type: sc ? "scene" : "caption", a: f[0].split("\n").map(y => esc(y.trim())).join("<br>") };
    if (sc) { if (sc.ar) c.ar = sc.ar; if (sc.lb) c.lb = sc.lb; }
    if (f.length > 1) c.b = esc(f.slice(1).join(" | ").replace(/\n/g, " "));
    if (i === 0 && !sc) c.push = 1;
    return c;
  });
  const head = t.blocks.slice(0, Math.max(0, t.blocks.findIndex(x => x.type === "caption" || x.type === "scene"))).map(x => Object.assign({}, x));
  return head.concat(caps);
}
const KEEP_SAMPLE = ["player", "clock", "divider", "call", "photo", "scene"];
function unsample(list, t, raw) {
  if (!raw.trim()) return list;
  const src = raw.replace(/\s+/g, " ");
  const plain = (h) => toPlain(h || "").replace(/\s+/g, " ").trim();
  const samples = new Set();
  t.blocks.forEach(b => SLOT_F.forEach(f => { const v = plain(b[f]); if (v.length >= 2) samples.add(v); }));
  return list.map(x => {
    if (KEEP_SAMPLE.indexOf(x.type) >= 0) return x;
    let o = x;
    SLOT_F.forEach(f => {
      const v = plain(x[f]);
      if (v && samples.has(v) && src.indexOf(v) < 0) { if (o === x) o = Object.assign({}, x); o[f] = ""; }
    });
    return o;
  });
}
function tplListFor(t, raw) {
  const sl = slotParse(raw, t);
  if (sl) return sl;
  return unsample(tplListRaw(t, raw), t, raw);
}
function tplListRaw(t, raw) {
  if (t.cat === "music") return lyricList(raw, t);
  if (t.cat === "sub") return capList(raw, t);
  if (t.each === "translation") return transList(raw, t);
  if (t.each) return eachList(raw, t);
  const k = tplKind(t);
  if (k === "para") return paraList(raw, t);
  if (k === "chat") return chatList(raw, t);
  if (k === "credits") return creditList(raw, t);
  let list = tplShape(classify(raw, t.cat === "rp"), t);
  if (t.cat === "msg" && !t.blocks.some(x => x.type === "avatar")) {
    const right = chatSides(list.filter(x => x.type === "dialogue").map(x => (x.b || "").trim()));
    list = list.map(x => x.type !== "dialogue" ? x : Object.assign({}, x, { type: "bubble", side: right((x.b || "").trim()) ? "right" : "left", b: "" }));
  }
  if (t.cat === "msg" && !list.some(x => x.type === "stamp")) {
    const head = t.blocks.slice(0, Math.max(0, t.blocks.findIndex(x => x.type === "avatar" || x.type === "bubble")));
    return head.filter(x => x.type === "stamp").map(x => Object.assign({}, x, { a: raw.trim() ? "" : x.a })).concat(list);
  }
  return list;
}
const tplMain = (t) => t.blocks.some(x => x.type === "body") ? "body" : t.blocks.some(x => x.type === "quote") ? "quote" : "";
function tplKind(t) {
  if (t.id === "t-basic" || t.each || ["rp", "msg", "music", "sub"].indexOf(t.cat) >= 0) return "";
  if (t.id === "t-credits") return "credits";
  if (t.blocks.some(x => x.type === "bubble")) return "chat";
  return tplMain(t) ? "para" : "";
}
function tplWrap(t, ty, mid) {
  const is = (x) => [].concat(ty).indexOf(x.type) >= 0;
  const first = t.blocks.findIndex(is), last = t.blocks.length - 1 - t.blocks.slice().reverse().findIndex(is);
  const keep = (x) => Object.assign({}, x);
  return first < 0 ? mid : t.blocks.slice(0, first).map(keep).concat(mid, t.blocks.slice(last + 1).map(keep));
}
const tplSty = (x) => { const o = {}; Object.keys(x || {}).forEach(k => { if (["type", "a", "b", "c", "d", "t"].indexOf(k) < 0) o[k] = x[k]; }); return o; };
function rawChunks(raw, one) {
  const src = raw.replace(/\r/g, "").trim();
  return (/\n\s*\n/.test(src) ? src.split(/\n\s*\n/) : one ? [src] : src.split("\n"))
    .map(c => c.split("\n").map(x => x.trim()).filter(Boolean)).filter(c => c.length);
}
function paraList(raw, t) {
  const ty = tplMain(t), slots = t.blocks.filter(x => x.type === ty), ls = t.blocks.find(x => x.type === "list");
  const LI = /^[-•·▪]\s+/;
  const out = [];
  let i = 0;
  const chunks = rawChunks(raw, slots.length === 1);
  const HT = ["title", "subtitle", "section", "stamp", "credit"];
  const one = (c) => c && c.length === 1 ? c[0] : null;
  let head = null, tail = null;
  if (chunks.length > 1 && one(chunks[0]) && one(chunks[0]).length <= 40 && !/[.。!?…」』”"')]$/.test(one(chunks[0]))) head = chunks.shift()[0];
  if (chunks.length > 1 && one(chunks[chunks.length - 1]) && /^(@|©|—|–|『|「|출처)/.test(one(chunks[chunks.length - 1]))) tail = chunks.pop()[0];
  chunks.forEach(p => {
    if (ls && p.every(l => LI.test(l))) { p.forEach(l => out.push(Object.assign(tplSty(ls), { type: "list", a: esc(tidy(l.replace(LI, ""))) }))); return; }
    out.push(Object.assign(tplSty(slots[Math.min(i++, slots.length - 1)]), { type: ty, a: p.map(l => esc(tidy(l))).join("<br>") }));
  });
  if (!out.length) out.push(Object.assign(tplSty(slots[0]), { type: ty, a: "" }));
  const list = tplWrap(t, ls ? [ty, "list"] : ty, out);
  if (!raw.trim()) return list;
  const mids = new Set(out);
  let hi = -1, ti = -1;
  list.forEach((x, n) => { if (mids.has(x) || HT.indexOf(x.type) < 0) return; if (n < list.indexOf(out[0])) { if (hi < 0) hi = n; } else if (x.type === "credit") ti = n; });
  return list.map((x, n) => {
    if (mids.has(x) || HT.indexOf(x.type) < 0) return x;
    const o = Object.assign({}, x, { a: n === hi && head ? esc(tidy(head)) : n === ti && tail ? esc(tidy(tail)) : "" });
    if (o.b != null) o.b = "";
    return o;
  });
}
function chatList(raw, t) {
  const list = classify(raw);
  const right = chatSides(list.filter(x => x.type === "dialogue").map(x => (x.b || "").trim()));
  const L = t.blocks.find(x => x.type === "bubble" && x.side !== "right"), R = t.blocks.find(x => x.type === "bubble" && x.side === "right");
  const mid = list.map(x => {
    if (x.type !== "dialogue") return x;
    const who = (x.b || "").trim(), r = right(who);
    const o = Object.assign(tplSty(r ? R : L), { type: "bubble", a: x.a, side: r ? "right" : "left" });
    if (!r) o.b = who;
    return o;
  });
  const ms = new Set(mid);
  return tplWrap(t, "bubble", mid).map(x => ms.has(x) || !raw.trim() || ["stamp", "credit"].indexOf(x.type) < 0 ? x : Object.assign({}, x, { a: "" }));
}
function creditList(raw, t) {
  const src = raw.replace(/\r/g, "").trim();
  let ch = rawChunks(raw);
  if (!/\n\s*\n/.test(src)) { const ls = ch.map(c => c[0]); ch = []; for (let i = 0; i < ls.length; i += 2) ch.push(ls.slice(i, i + 2)); }
  const roles = t.blocks.filter(x => x.type === "narration"), names = t.blocks.find(x => x.type === "subtitle");
  const out = [];
  ch.forEach((c, i) => {
    out.push(Object.assign(tplSty(roles[Math.min(i, roles.length - 1)]), { type: "narration", a: esc(c[0]) }));
    if (c.length > 1) out.push(Object.assign(tplSty(names), { type: "subtitle", a: c.slice(1).map(esc).join("<br>") }));
  });
  return tplWrap(t, ["narration", "subtitle"], out);
}
function tplShape(list, t) {
  if (t.id === "t-basic") return list;
  return list.map(x => {
    const tb = t.blocks.find(y => y.type === x.type);
    if (!tb) return x;
    const nx = Object.assign({}, x);
    BLOCK_STYLE_KEYS.forEach(k => { if (tb[k] != null && nx[k] == null) nx[k] = tb[k]; });
    return nx;
  });
}
function transList(raw, t) {
  const src = raw.replace(/\r/g, "").trim();
  const one = (l) => { const f = l.split(/\s*\|\s*/); return [f[0], f.slice(1).join(" | ")]; };
  const pairs = [];
  const single = t.blocks.filter(x => x.type === "translation").length === 1 && !/\|/.test(src);
  if (/\n\s*\n/.test(src) || single) {
    src.split(/\n\s*\n/).map(c => c.split("\n").map(x => x.trim()).filter(Boolean)).filter(c => c.length)
      .forEach(c => {
        if (c.length === 1) { pairs.push(one(c[0])); return; }
        let j = c.findIndex((x, n) => n > 0 && hasHangul(x) !== hasHangul(c[0]));
        if (j < 0) j = 1;
        pairs.push([c.slice(0, j).join("\n"), c.slice(j).join("\n")]);
      });
  } else {
    const ls = src.split("\n").map(x => x.trim()).filter(Boolean);
    const runs = [];
    ls.forEach(x => { const r = runs[runs.length - 1]; if (r && hasHangul(r[0]) === hasHangul(x)) r.push(x); else runs.push([x]); });
    if (runs.length >= 2 && !/\|/.test(src) && runs.some(r => r.length > 1)) {
      for (let i = 0; i < runs.length; i += 2) pairs.push(runs[i + 1] ? [runs[i].join("\n"), runs[i + 1].join("\n")] : one(runs[i].join(" ")));
    } else for (let i = 0; i < ls.length; i++) {
      if (/\|/.test(ls[i]) || i + 1 >= ls.length || /\|/.test(ls[i + 1])) pairs.push(one(ls[i]));
      else { pairs.push([ls[i], ls[i + 1]]); i++; }
    }
  }
  const tb = t.blocks.filter(x => x.type === "translation");
  const base = {};
  BLOCK_STYLE_KEYS.forEach(k => { if (tb[0] && tb[0][k] != null) base[k] = tb[0][k]; });
  const out = pairs.map(([o, tr]) => {
    if (tr && hasHangul(o) && !hasHangul(tr)) [o, tr] = [tr, o];
    return Object.assign({}, base, { type: "translation", b: esc(o).replace(/\n/g, "<br>"), a: esc(tr).replace(/\n/g, "<br>") });
  });
  if (out[0] && tb[0] && tb[0].gapA) out[0].gapA = tb[0].gapA;
  return tplWrap(t, "translation", out.length ? out : [Object.assign({}, base, { type: "translation", a: "", b: "" })]);
}
const HI_SPAN = /<span style="background-color:\s*([^;"]+);?">([\s\S]*?)<\/span>/gi;
const hiToBraces = (h) => String(h == null ? "" : h).replace(HI_SPAN, "{$2}");
const hiColorOf = (h) => { const m = /<span style="background-color:\s*([^;"]+)/i.exec(String(h || "")); return m ? m[1].trim() : ""; };
const hiDefault = () => withAlpha((S.custom && S.custom.hilite) || "#ffe680", (S.calpha && S.calpha.hilite) || 1);
const bracesToHi = (h, col) => String(h).replace(/\{([^{}\n]{1,300})\}/g, (m, x) => '<span style="background-color: ' + (col || hiDefault()) + ';">' + x + "</span>");
const SLOT_F = ["a", "b", "c", "t", "d"];
const TYPE_BY_NAME = {};
Object.keys(TYPES).forEach(k => { TYPE_BY_NAME[TYPES[k].n] = k; });
const SLOT_LINE = /^\[([^\[\]]{1,12})\]$/;
const CALL_DIR = { miss: "부재중", in: "받은 전화", out: "건 전화" };
const callDirOf = (txt) => { const v = String(txt).replace(/\s/g, ""); return /받/.test(v) ? "in" : /건|발신|걸/.test(v) ? "out" : "miss"; };
function slotLabel(label, t) {
  const known = TYPE_BY_NAME[label] || label === "종류" || Object.keys(SLOTS).some(k => SLOTS[k].some(x => x.n === label));
  return known ? label : null;
}
function slotParse(raw, t) {
  const lines = raw.replace(/\r/g, "").split("\n");
  const first = lines.find(l => l.trim());
  const m0 = first && first.trim().match(SLOT_LINE);
  if (!m0 || !slotLabel(m0[1], t)) return null;
  const tTypes = t.blocks.map(b => b.type);
  const out = [], seen = {}, body = [];
  let cur = null, field = null;
  const flush = () => {
    if (!cur || field == null) return;
    const text = body.join("\n").replace(/^\n+|\n+$/g, "");
    if (field === "dir") { if (text.trim()) cur.dir = callDirOf(text); body.length = 0; return; }
    const tb = cur._tb, orig = tb && tb[field] != null ? toPlain(hiToBraces(tb[field]).replace(/<br\s*\/?>/gi, "\n")).trim() : null;
    const col = hiColorOf(tb && tb[field]) || hiColorOf(t.blocks.filter(x => x.type === cur.type).map(x => x[field]).join(""));
    if (text) cur[field] = orig === text.trim() ? tb[field] : bracesToHi(text.split("\n").map(l => esc(tidy(l))).join("<br>"), col);
    body.length = 0;
  };
  const open = (type) => {
    const n = seen[type] = (seen[type] || 0) + 1;
    const all = t.blocks.filter(b => b.type === type), tb = all[n - 1] || all[all.length - 1];
    const b = Object.assign(tplSty(tb), { type: type });
    if (!all[n - 1] && tb) { delete b.gapA; delete b.gapB; }
    if (type === "player" && tb) { b.a = tb.a; b.b = tb.b; }
    Object.defineProperty(b, "_tb", { value: all[n - 1] || null, enumerable: false });
    out.push(b);
    return b;
  };
  lines.forEach(line => {
    const m = line.trim().match(SLOT_LINE), lab = m && slotLabel(m[1], t);
    if (!lab) { if (cur) body.push(line.trim()); return; }
    flush();
    const slotOf = (type) => (SLOTS[type] || []).find(x => x.n === lab);
    if (lab === "종류") { if (!cur || cur.type !== "call") cur = open("call"); field = "dir"; return; }
    let s1 = cur && slotOf(cur.type);
    if (s1 && cur[SLOT_F[s1.k]] == null) { field = SLOT_F[s1.k]; return; }
    const ty = TYPE_BY_NAME[lab];
    if (ty) {
      if (!(cur && cur.type === ty && cur.a == null)) cur = open(ty);
      field = "a"; return;
    }
    const cand = tTypes.concat(Object.keys(SLOTS)).find(k => slotOf(k));
    cur = open(cand); field = SLOT_F[slotOf(cand).k];
  });
  flush();
  return out.length ? out : null;
}
function slotSample(t) {
  const tx = (h) => toPlain(hiToBraces(h).replace(/<br\s*\/?>/gi, "\n")).trim();
  return t.blocks.map(b => {
    const main = ["[" + TYPES[b.type].n + "]"].concat(b.type !== "player" && b.a != null && tx(b.a) ? [tx(b.a)] : []).join("\n");
    const extra = (SLOTS[b.type] || []).filter(x => b[SLOT_F[x.k]] != null && tx(b[SLOT_F[x.k]]))
      .map(x => "[" + x.n + "]\n" + tx(b[SLOT_F[x.k]]));
    if (b.type === "call") extra.push("[종류]\n" + CALL_DIR[b.dir || "miss"]);
    return (b.type === "translation" || b.type === "bidialogue" ? extra.concat(main) : [main].concat(extra)).join("\n");
  }).join("\n\n");
}
function tplSample(t) {
  return slotSample(t);
}
function eachList(raw, t) {
  const ty = t.each;
  const tb = t.blocks.filter(x => x.type === ty);
  const base = Object.assign({}, tb[0] || { type: ty });
  delete base.gapA; delete base.gapB;
  const lines = raw.replace(/\r/g, "").split("\n").map(x => x.trim()).filter(Boolean);
  const out = lines.map(line => {
    const x = Object.assign({}, base, { type: ty });
    const f = line.split(/\s*\|\s*/).map(esc);
    if (ty === "vn") {
      const m = line.match(/^(.{1,14}?)\s*[:：]\s*(.+)$/);
      if (m) { x.b = esc(m[1]); x.a = esc(m[2]); } else x.a = esc(line);
    } else if (ty === "notif") {
      if (f.length >= 3) { x.b = f[0]; x.c = f[1]; x.a = f.slice(2).join(" | "); }
      else if (f.length === 2) { x.c = f[0]; x.a = f[1]; }
      else x.a = f[0];
    } else if (ty === "call") {
      x.a = f[0]; if (f[1] != null) x.b = f[1]; if (f[2] != null) x.t = f[2];
    } else if (ty === "post") {
      if (f.length >= 3) { x.b = f[0]; x.c = f[1]; x.a = f.slice(2).join(" | "); } else x.a = f.join(" | ");
    } else x.a = f.join(" | ");
    return x;
  });
  if (out[0] && tb[0] && tb[0].gapA) out[0].gapA = tb[0].gapA;
  const first = t.blocks.findIndex(x => x.type === ty), last = t.blocks.length - 1 - t.blocks.slice().reverse().findIndex(x => x.type === ty);
  const keep = (x) => Object.assign({}, x);
  return first < 0 ? out : t.blocks.slice(0, first).map(keep).concat(out, t.blocks.slice(last + 1).map(keep));
}
const TPL_CATS = [["", "전체"], ["book", "책"], ["line", "대사"], ["sub", "자막"], ["msg", "메신저"], ["rp", "롤플"], ["music", "가사"], ["ui", "화면"], ["deco", "콘셉트"]];
const tplRank = (t) => t.cat ? TPL_CATS.findIndex(c => c[0] === t.cat) : 0;
const LASTTPL_STORE = "excerpt-lasttpl-v1";
let mineCache = null, mineKey = "";
function mineTpls() {
  let lastId = "";
  try { lastId = localStorage.getItem(LASTTPL_STORE) || ""; } catch (e) {}
  const lt = loadLastTheme();
  const key = lastId + "|" + JSON.stringify(lt) + "|" + JSON.stringify(S.presets || []);
  if (key === mineKey && mineCache) return mineCache;
  const out = [];
  const bt = TEMPLATES.find(x => x.id === lastId) || TEMPLATES[0];
  if (lt || bt.id !== "t-basic") {
    out.push(Object.assign({}, bt, { id: "t-last", base: bt.id, grp: "mine", name: "지난번 모양", sub: bt.name,
      v: Object.assign({}, bt.v || {}, lt || {}) }));
  }
  (S.presets || []).forEach(p => out.push(Object.assign({}, TEMPLATES[0], { id: "t-p-" + p.id, base: "t-basic", grp: "mine", name: p.name, sub: "내 프리셋",
    preset: "bi-basic", v: Object.assign({}, p.v) })));
  mineKey = key; mineCache = out;
  return out;
}
const tplById = (id) => mineTpls().concat(TEMPLATES).find(x => x.id === id) || null;
const tplList = () => TEMPLATES.filter(t => !S.tplCat || !t.cat || t.cat === S.tplCat)
  .map((t, i) => [t, i]).sort((a, b) => tplRank(a[0]) - tplRank(b[0]) || a[1] - b[1]).map(x => x[0]);
const TPL_CAT_NAME = {};
TPL_CATS.forEach(([k, n]) => { TPL_CAT_NAME[k] = n; });
function tplGrouped(list, one) {
  if (S.tplCat) return list.map(one).join("");
  let last = null, held = "";
  return list.map(t => {
    const c = t.grp || t.cat || "";
    if (!c) { held += one(t); return ""; }
    let head = "";
    if (c !== last) {
      head = '<div class="tpl-grp" role="presentation"><b>' + TPL_CAT_NAME[c] + "</b></div>";
      if (held) { head += held; held = ""; }
    }
    last = c;
    return head + one(t);
  }).join("") + held;
}
const TPL_COLS_STORE = "excerpt-tplcols-v1";
let tplCols = 3;
try { const v = parseInt(localStorage.getItem(TPL_COLS_STORE), 10); if (v >= 2 && v <= 4) tplCols = v; } catch (e) {}
function fitTplGrid() {
  app.querySelectorAll(".in-l .demos").forEach(g => {
    if (getComputedStyle(g).display !== "grid") { g.style.removeProperty("--tz"); return; }
    const gap = parseFloat(getComputedStyle(g).columnGap) || 0;
    const w = (g.clientWidth - gap * (tplCols - 1)) / tplCols;
    g.style.setProperty("--tz", Math.max(0.6, w / 124).toFixed(3));
  });
}
const tplCats = () => TPL_CATS;
const QS_SEEN = "excerpt-lastlook-seen-v1";
let qsOpen = false, qsFlashDone = false, qsFlashUntil = 0;
function quickStripHTML() {
  const mine = mineTpls(), last = mine.find(t => t.id === "t-last"), pres = mine.filter(t => t.id !== "t-last");
  if (!last && !pres.length) return "";
  let flash = false;
  if (last && !qsFlashDone) {
    qsFlashDone = true;
    try { if (localStorage.getItem(QS_SEEN) !== mineKey) { qsFlashUntil = Date.now() + 2000; localStorage.setItem(QS_SEEN, mineKey); } } catch (e) {}
  }
  flash = Date.now() < qsFlashUntil;
  const baseName = last ? (TEMPLATES.find(x => x.id === last.base) || {}).name || "" : "";
  return '<div class="qstrip' + (flash ? " qs-flash" : "") + '">' +
    (last
      ? '<button class="qs-main" data-act="qsstart" title="지난번 모양으로 새 카드 바로 시작">' +
          '<span class="qs-pv">' + pvSlot("qs", cardPreviewHTML(last, 44, 55, false)) + "</span>" +
          '<span class="qs-txt"><span class="qs-k">지난번에 쓴 모양</span><b>' + esc(baseName || "내 모양") + "</b></span>" +
          '<span class="qs-go">이 모양으로 시작' + ic("next", 14) + "</span></button>"
      : '<span class="qs-main qs-only"><span class="qs-txt"><b>저장한 프리셋</b><span>눌러서 그 모양으로 고르기</span></span></span>') +
    (pres.length
      ? '<button class="qs-pre' + (qsOpen ? " on" : "") + '" data-act="qspresets" aria-expanded="' + qsOpen + '">프리셋 <span class="mono">' + pres.length + "</span>" + ic(qsOpen ? "up" : "down", 12) + "</button>"
      : "") +
    "</div>" +
    (qsOpen && pres.length ? '<div class="chipwrap demowrap qs-row"><div class="demos">' + pres.map(tplThumb).join("") + "</div>" + ROW_NAV_F() + "</div>" : "");
}
const tplCatBar = () => '<div class="seg tplcats" role="tablist" aria-label="템플릿 묶음">' +
  tplCats().map(([k, n]) => '<button role="tab" class="' + ((S.tplCat || "") === k ? "on" : "") + '" aria-selected="' + ((S.tplCat || "") === k) +
    '" data-act="tplcat" data-c="' + k + '" data-hold>' + n + "</button>").join("") + "</div>";
const isChatLook = (v) => { const sk = SKINS[v && v.skin]; return !!(sk && sk.chat); };
function chatSides(names) {
  const order = [];
  names.forEach(n => { if (n && order.indexOf(n) < 0) order.push(n); });
  const me = order.find(n => /^(나|me)$/i.test(n)) || order[1] || "";
  return (n) => !n || n === me;
}
const isFlatLook = (v) => { const sk = SKINS[v && v.skin]; return !!(sk && sk.chat && sk.chat.flat); };
function chatifyList(list, flat) {
  const right = flat ? () => false : chatSides(list.filter(x => x.type === "dialogue").map(x => (x.b || "").trim()));
  let n = 0;
  const out = list.map(x => {
    if (x.type !== "dialogue") return x;
    n++;
    const who = (x.b || "").trim();
    return right(who) ? Object.assign({}, x, { type: "bubble", side: "right" }) : Object.assign({}, x, { type: "avatar" });
  });
  return { list: out, n: n };
}
function chatifyBlocks(flat) {
  const dl = S.blocks.filter(b => b.type === "dialogue");
  if (!dl.length) return 0;
  const right = flat ? () => false : chatSides(dl.map(speakerOf));
  S.blocks = S.blocks.map(b => {
    if (b.type !== "dialogue") return b;
    const nb = retype(b, right(speakerOf(b)) ? "bubble" : "avatar");
    if (nb.type === "bubble") nb.side = "right"; else delete nb.side;
    return nb;
  });
  return dl.length;
}
function applyTplLook(t, quiet, fresh) {
  const v = tplVals(t), sk = SKINS[v.skin];
  let conv = 0;
  if (sk && sk.chat) { conv = chatifyBlocks(!!sk.chat.flat); if (conv) S.bubNoQuote = true; }
  if (conv && !quiet) setTimeout(() => flash("대사 " + conv + "개를 메신저 말풍선으로 바꿨어요", { act: "undo", label: "되돌리기" }), 0);
  if (sk && sk.chat && S.blocks.some(b => b.bub)) {
    S.blocks = S.blocks.map(b => { if (!b.bub) return b; const nb = Object.assign({}, b); delete nb.bub; delete nb.bubA; return nb; });
  }
  S.tplId = t.id;
  const keepFrame = fresh || (t.v && t.v.frame != null) ? {} : { frame: S.frame, frameC: S.frameC };
  applyP({ name: t.name, v: Object.assign({}, v, keepFrame, conv || (sk && sk.chat && S.bubNoQuote) ? { bubNoQuote: true } : {}) }, quiet);
}
const tplVals = (t) => { const pr = presetById(t.preset); return Object.assign({}, pr ? pr.v : {}, t.v || {}); };
function tplBlock(x, b) {
  if (x.side) b.side = x.side;
  ["bub", "gapA", "gapB", "push", "hot", "art", "prog", "noCtl", "paused", "dir", "ar", "lb", "pw", "imgX", "imgY", "imgZ", "nx", "ny"].concat(BLOCK_STYLE_KEYS).forEach(k => { if (x[k] != null) b[k] = x[k]; });
  return b;
}
const pvStore = {};
const rawNow = () => { const r = app.querySelector("#raw"); return r ? r.value : rawDraft; };
const pvCache = new Map();
function cardPreviewHTML(t, boxW, boxH, useRaw) {
  const ck = useRaw ? "" : (t.grp === "mine" ? t.id + JSON.stringify(t.v) : t.id) + ":" + boxW + "x" + boxH;
  if (ck && pvCache.has(ck)) return pvCache.get(ck);
  const html = cardPreviewRaw(t, boxW, boxH, useRaw);
  if (ck) pvCache.set(ck, html);
  return html;
}
function cardPreviewRaw(t, boxW, boxH, useRaw) {
  const v = Object.assign(pickPreset(S0), tplVals(t));
  const chat = useRaw && isChatLook(v);
  const list = useRaw ? (chat ? chatifyList(classify(rawNow()), isFlatLook(v)).list : tplListFor(t, rawNow())) : t.blocks;
  if (chat) v.bubNoQuote = true;
  const blocks = [], tx = {};
  list.forEach((x, i) => {
    const id = "pv" + i;
    if (x.a != null) tx[key(id, 0)] = x.a;
    if (x.b != null) tx[key(id, 1)] = x.b;
    if (x.t != null) tx[key(id, 3)] = x.t;
    if (x.c != null) tx[key(id, 2)] = x.c;
    if (x.d != null) tx[key(id, 4)] = x.d;
    blocks.push(tplBlock(x, { id: id, type: x.type }));
  });
  const bak = Object.assign({}, S), bakTxt = txt, bakK = cardK;
  try {
    Object.assign(S, v, { blocks: blocks, active: "", preview: true, page: 0, pages: 1, offsets: [0], clips: [0], fit: 1,
      picks: [], brush: null, guide: false, info: S0.info, overId: null, dragging: null, side: null });
    txt = tx;
    const [w, h] = dims();
    cardK = Math.min(boxW / w, boxH / h);
    const html = cardHTML();
    return S.ratio === "auto" ? html.replace('<div class="card-fit"', '<div class="card-fit" data-bw="' + boxW + '" data-bh="' + boxH + '"') : html;
  } finally {
    Object.keys(S).forEach(k => { if (!(k in bak)) delete S[k]; });
    Object.assign(S, bak);
    txt = bakTxt; cardK = bakK;
  }
}
function pvSlot(id, html) {
  pvStore[id] = html;
  return '<span class="pvslot" data-pv="' + id + '"></span>';
}
function hydratePreviews() {
  app.querySelectorAll(".pvslot").forEach(el => {
    const html = pvStore[el.dataset.pv];
    if (html == null) return;
    const root = el.shadowRoot || el.attachShadow({ mode: "open" });
    root.innerHTML = '<link rel="stylesheet" href="./style.css"><div class="pvbox">' + html + "</div>";
    if (root.querySelector("[data-tg]")) {
      const lk = root.querySelector("link");
      tgradSync(root);
      if (lk) lk.addEventListener("load", () => tgradSync(root), { once: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => tgradSync(root));
    }
    if (root.querySelector(".ce[data-bub]")) {
      const go = () => bubFit(root), lk0 = root.querySelector("link");
      if (lk0) lk0.addEventListener("load", go, { once: true }); else go();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    }
    const fit = root.querySelector(".card-fit[data-bw]");
    if (!fit) return;
    pvRefit(fit);
    const link = root.querySelector("link");
    if (link) link.addEventListener("load", () => pvRefit(fit), { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => pvRefit(fit));
  });
}
function pvRefit(fit) {
  const sc = fit.firstElementChild;
  if (!sc || !fit.isConnected) return;
  const w = sc.offsetWidth, h = sc.offsetHeight;
  if (!w || !h) return;
  const k = Math.min(+fit.dataset.bw / w, +fit.dataset.bh / h);
  fit.style.width = Math.round(w * k) + "px";
  fit.style.height = Math.round(h * k) + "px";
  sc.style.transform = "scale(" + k + ")";
}
function tplPvHTML() {
  const L = tplList().some(x => x.id === S.tplpv) ? tplList() : mineTpls().concat(TEMPLATES);
  const i = L.findIndex(x => x.id === S.tplpv), t = L[i];
  if (!t) return "";
  const hasRaw = !!rawNow().trim(), useRaw = hasRaw && S.tplRaw !== false;
  const bw = Math.min(320, window.innerWidth - 136), bh = Math.min(420, Math.round(window.innerHeight * 0.52));
  const nav = (d, lbl) => '<button class="tplnav" data-act="tplnav" data-d="' + d + '" aria-label="' + lbl + '">' + ic(d < 0 ? "back" : "next", 22) + "</button>";
  return '<div class="sheet tplsheet" data-act="tplclose"><div class="sheet-card" data-stop>' +
    '<h2>' + esc(t.name) + ' <span class="mono">' + (i + 1) + " / " + L.length + "</span></h2>" +
    (hasRaw
      ? '<div class="seg" style="margin-bottom:12px"><button class="' + (useRaw ? "" : "on") + '" data-act="tplraw" data-v="0" data-hold>예시 글</button>' +
        '<button class="' + (useRaw ? "on" : "") + '" data-act="tplraw" data-v="1" data-hold>붙여넣은 내 글</button></div>'
      : "") +
    '<div class="tplpv-stage" data-act="tplclose">' + nav(-1, "이전 템플릿") +
      '<div class="tplpv-card">' + pvSlot("big", cardPreviewHTML(t, bw, bh, useRaw)) + "</div>" + nav(1, "다음 템플릿") + "</div>" +
    '<button class="btn fill exp-main" data-act="demo" data-t="' + t.id + '"><span>이 템플릿으로 시작</span></button>' +
    '<button class="sheet-close text" data-act="tplclose">닫기</button></div></div>';
}
function tplThumb(t) {
  const on = (S.tplSel || "t-basic") === t.id;
  return '<div class="tpl' + (on ? " on" : "") + '">' +
    '<button class="tt-pick" data-act="tplsel" data-t="' + t.id + '" aria-pressed="' + on + '" aria-label="' + esc(t.name) + (t.id === "t-basic" ? " (템플릿 없이)" : "") + ' 고르기">' +
      '<span class="tt-card real">' + pvSlot("t:" + t.id, cardPreviewHTML(t, 124, 155, false)) +
        (on ? '<span class="tt-check">' + ic("check", 14) + "</span>" : "") + "</span>" +
      '<span class="tt-name">' + esc(t.name) + (t.id === "t-basic" ? ' <span class="tt-sub">템플릿 없이</span>' : t.sub ? ' <span class="tt-sub">' + esc(t.sub) + "</span>" : "") + "</span></button>" +
    '<button class="tt-zoom" data-act="tplpv" data-t="' + t.id + '" aria-label="' + esc(t.name) + ' 크게 보기">' + ic("zoom", 15) + "</button></div>";
}
function tplMini(t) {
  const on = S.tplId === t.id;
  return '<button class="skin-tile tpl-mini' + (on ? " on" : "") + '" data-act="tpluse" data-t="' + t.id + '" data-hold aria-pressed="' + on + '">' +
    '<span class="sk-card">' + pvSlot("m:" + t.id, cardPreviewHTML(t, 84, 105, false)) + "</span>" +
    '<span class="sk-n">' + t.name + "</span></button>";
}
function inputHTML() {
  const demo = tplGrouped(tplList(), tplThumb);
  return '<div class="topbar input-top"><span class="brand">' + MARK + "<b>발췌기</b></span>" +
      '<span class="brand-sub">고른 문장을 카드 이미지로</span>' + viewBtn() + "</div>" +
    '<div class="input-screen"><div class="in-l">' +
      libRowHTML() + quickStripHTML() +
      '<div class="demo-wrap"><div class="sec-h"><b>템플릿</b><span class="sec-w">고른 모양으로 시작 · 편집 중에도 바꿀 수 있어요</span>' +
        '<span class="seg tplcols" role="group" aria-label="한 줄에 보일 템플릿 수"><i>한 줄에</i>' + [2, 3, 4].map(n => '<button class="' + (tplCols === n ? "on" : "") + '" data-act="tplcols" data-v="' + n + '" aria-pressed="' + (tplCols === n) + '" data-hold>' + n + "</button>").join("") + "</span></div>" +
        tplCatBar() +
        '<div class="chipwrap demowrap"><div class="demos" style="--tcols:' + tplCols + '">' + demo + "</div>" + ROW_NAV_F() + "</div></div></div>" +
      '<div class="in-r"><div class="raw-head"><label class="raw-label" for="raw">붙여넣을 글</label>' +
        '<button class="btn pastebtn" data-act="pasteraw" data-hold>' + ic("copy", 15) + "<span>붙여넣기</span></button></div>" +
      '<textarea class="raw" id="raw" placeholder="책·트윗·문서에서 복사한 글을 그대로 붙여넣으세요.&#10;&#10;글 없이 시작해도 돼요 — 아래 ‘빈 카드로 시작’을 누르면 고른 템플릿 모양으로 열리고, 카드 안 글자를 눌러 바로 고칠 수 있어요.">' + esc(rawDraft) + "</textarea>" +
      '<details class="hint"' + (S.hintOpen ? " open" : "") + "><summary>입력 규칙 보기</summary>" +
        "<span><b>\u201C따옴표\u201D</b> → 대사 · <b>*별표*</b> → 나레이션 · <b>이름:</b> → 화자 있는 대사</span>" +
        "<span><b>-</b> → 목록 · <b>---</b> → 구분선 · 빈 줄 → 문단 · 첫 줄이 짧으면 제목</span>" +
        "<span>영문 줄 뒤 한글 줄은 번역으로 묶습니다. 표시가 없으면 전부 서술로 들어옵니다.</span>" +
        "<span>롤플레이 채팅: <b>*지문*</b> 문단이 있으면 표시 없는 줄은 대사로 · <b>```</b> 상태창은 날짜·목록으로 나눕니다.</span>" +
        "<span><b>{글자}</b> → 형광펜 · <b>[원문]</b>·<b>[번역]</b>처럼 칸 이름 줄로 시작하면 그 칸에 그대로 · 템플릿을 고르고 ‘예시 채우기’를 누르면 칸 이름째 넣어 드려요.</span>" +
      "</details>" +
      '<button class="btn fill startbtn" style="height:48px;font-size:13.5px;font-weight:600" data-act="parse">글 분석해서 시작</button>' +
      '<div class="stack tight">' +
        '<div class="row" style="gap:8px">' +
          '<button class="btn wide" style="height:42px;font-size:12.5px;color:#444" data-act="blank">빈 카드로 시작</button>' +
          '<button class="btn wide" style="height:42px;font-size:12.5px;color:#444" data-act="sample">예시 채우기</button>' +
        "</div>" +
        '<p class="note start-note">예시를 채우지 않아도 괜찮아요. <b>빈 카드로 시작</b>을 누르면 고른 템플릿 모양 그대로 열리고, 카드 안 글자를 눌러 바로 고칠 수 있어요.</p>' +
      "</div>" +
      '<div class="input-foot"><button class="link" data-act="bug">' + ic("flag", 14) + "문제 신고</button>" +
        MAKER + "</div>" +
    "</div></div>" +
    libHTML() + tplPvHTML() + cdlgHTML() +
    (S.toast ? '<div class="toast"><div><span>' + esc(S.toast) + "</span>" + toastActHTML() + "</div></div>" : "");
}

let rendering = false;
let lastUI = { screen: "", tab: "", sheet: false, pdlg: false, cdlg: false, rec: false, toast: "" };
function markEntrances() {
  const ui = {
    screen: S.screen + (S.preview ? "/preview" : ""),
    tab: S.tab,
    sheet: !!S.sheet, pdlg: !!S.pdlg, cdlg: !!S.cdlg, rec: !!S.rec,
    toast: S.toast || ""
  };
  const pop = (sel) => { const n = app.querySelector(sel); if (n) n.classList.add("anim-in"); };
  if (ui.screen !== lastUI.screen) app.classList.add("anim-screen");
  else if (ui.tab !== lastUI.tab) pop(".panel-body");
  if (ui.sheet && !lastUI.sheet) pop('.sheet[data-act="closesheet"]');
  if (ui.pdlg && !lastUI.pdlg) pop('.sheet[data-act="pdlgclose"]');
  if (ui.cdlg && !lastUI.cdlg) pop(".sheet.cdlg");
  if (ui.rec && !lastUI.rec) pop(".sheet.rec");
  if (ui.toast && ui.toast !== lastUI.toast) pop(".toast");
  lastUI = ui;
}

const VSCROLL = [".input-screen", ".in-l", ".in-r", ".lib-grid"];
function render() {
  histSync();
  picksDropped = false;
  const info = caretInfo();
  const raw = app.querySelector("#raw");
  if (raw) rawDraft = raw.value;
  const pb = app.querySelector(".panel-body");
  const pbTop = pb ? pb.scrollTop : 0, pbHide = !!(pb && pb.classList.contains("ph-hide"));
  const rowXs = rowScrolls(app);
  const vYs = VSCROLL.map(q => { const n = app.querySelector(q); return n ? n.scrollTop : 0; });
  rendering = true;
  quietDirty = false;
  app.className = shellClass();
  app.innerHTML = S.screen === "input" ? inputHTML() : editHTML();
  hydratePreviews();
  bubFit(app, info);
  fillSync(app);
  fitTplGrid();
  els = {};
  app.querySelectorAll("[data-block]").forEach(n => { els[n.dataset.block] = n; });
  rendering = false;
  markEntrances();
  if (pbTop) {
    const pb2 = app.querySelector(".panel-body");
    if (pb2) { pb2.scrollTop = pbTop; if (pbHide) pb2.classList.add("ph-hide"); }
  }
  restoreRowScrolls(app, rowXs);
  VSCROLL.forEach((q, i) => { if (!vYs[i]) return; const n = app.querySelector(q); if (n) n.scrollTop = vYs[i]; });
  updateChipFades();
  fitCard();
  watchStage();
  restoreCaret(info);
  markQuotes();
  if (S.pdlg && pdlgFocus) {
    pdlgFocus = false;
    const pn = app.querySelector("input[data-pname]");
    if (pn) { pn.focus({ preventScroll: true }); try { pn.select(); } catch (e) {} }
  }
  if (kbFold) scrollCaretIntoView();
  if (S.screen !== "input") requestAnimationFrame(measure);
  if (S.screen === "edit") { scopeKey = scopeKeyNow(); syncSizeField(); }
  scheduleSave();
  pfxStage();
  fsPaint();
}

function repaintCard() {
  histSync();
  const fit = app.querySelector(".card-fit");
  const box = fit && fit.parentElement;
  if (!box) { render(); return; }
  const ae = document.activeElement;
  const back = ae && ae.isContentEditable && inCard(ae) ? caretInfo() : null;
  box.innerHTML = cardHTML();
  els = {};
  app.querySelectorAll("[data-block]").forEach(n => { els[n.dataset.block] = n; });
  fitCard();
  watchStage();
  markQuotes();
  if (back) restoreCaret(back);
  pfxStage();
}

const GUTTER = 12;
const MAX_K_MANUAL = 6;
const ZK_MIN = 0.25, ZK_MAX = 4, ZK_STEP = 0.25;
const FIT_FLOOR_W = 0.7;

function fitCard() {
  tgradSync();
  const fit = app.querySelector(".card-fit");
  const scale = app.querySelector(".card-scale");
  const card = app.querySelector(".card-sheet") || app.querySelector(".card");
  const box = fit && fit.parentElement;
  if (!box || !scale || !card) return;
  const w = card.offsetWidth, h = card.offsetHeight;
  if (!w || !h) return;
  const availW = Math.max(60, box.clientWidth - GUTTER * 2);
  const availH = Math.max(60, box.clientHeight - GUTTER * 2);
  const wideOnly = kbFold ? S.kbFit !== "whole" : (!S.preview && S.zoom === "wide");
  let base = wideOnly
    ? availW / w
    : Math.min(availW / w, availH / h);
  if (!wideOnly && !kbFold && !S.preview && !wideMQ.matches) {
    base = Math.max(base, (availW * FIT_FLOOR_W) / w);
  }
  const zk = (kbFold || S.preview) ? 1 : (S.zoomK || 1);
  const k = Math.max(0.2, Math.min(base * zk, Math.max(base, MAX_K_MANUAL)));
  if (!isFinite(k) || k <= 0) return;

  const sameCard = (w === lastCardW && h === lastCardH);
  lastCardW = w; lastCardH = h;
  const markOver = () => {
    if (!box.classList.contains("stage-scroll")) return;
    box.classList.toggle("over", w * cardK > availW + 1 || h * cardK > availH + 1);
    box.classList.toggle("clip", zk === 1 && !wideOnly && !kbFold && h * cardK > availH + 1);
  };
  if (!pinchOn && sameCard && cardK && k > cardK && (k - cardK) / cardK < 0.03) { markOver(); return; }

  cardK = Math.round(k * 1000) / 1000;
  fit.style.width = Math.round(w * cardK) + "px";
  fit.style.height = Math.round(h * cardK) + "px";
  scale.style.transform = "scale(" + cardK + ")";
  markOver();
}

function scrollCaretIntoView() {
  if (!kbFold) return;
  const stage = app.querySelector(".stage-scroll");
  if (!stage) return;
  let r = null;
  const sel = window.getSelection();
  if (sel && sel.rangeCount) {
    const rr = sel.getRangeAt(0).getBoundingClientRect();
    if (rr && (rr.height || rr.width)) r = rr;
  }
  if (!r) { const blk = els[S.active]; if (blk) r = blk.getBoundingClientRect(); }
  if (!r) return;
  const sr = stage.getBoundingClientRect(), m = 28;
  if (r.top < sr.top + m) stage.scrollTop += r.top - sr.top - m;
  else if (r.bottom > sr.bottom - m) stage.scrollTop += r.bottom - sr.bottom + m;
}

const stageRO = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => fitCard()) : null;
function watchStage() {
  if (!stageRO) return;
  stageRO.disconnect();
  const fit = app.querySelector(".card-fit");
  const box = fit && fit.parentElement;
  if (box) stageRO.observe(box);
}

let kbOpen = false, baseH = 0, baseW = 0;
function syncViewport() {
  const vv = window.visualViewport;
  const layout = document.documentElement.clientHeight || window.innerHeight;
  const h = Math.round(vv ? vv.height : layout);
  const w = Math.round(vv ? vv.width : window.innerWidth);

  if (w !== baseW) { baseW = w; baseH = h; }
  const a = document.activeElement;
  const editing = !!(a && (a.isContentEditable || a.tagName === "INPUT" || a.tagName === "TEXTAREA"));
  if (!editing) baseH = Math.max(baseH, h);
  kbOpen = baseH - h > 120;

  if (kbOpen) document.documentElement.style.setProperty("--app-h", h + "px");
  else document.documentElement.style.removeProperty("--app-h");
  syncKeyboardLayout();
}

let kbFold = false;
const wideMQ = window.matchMedia("(min-width: 820px), (orientation: landscape) and (max-height: 560px) and (min-width: 640px)");
function shellClass() {
  return "screen " + (S.screen === "input" ? "is-input" : (S.preview ? "is-preview" : "is-edit")) +
    (kbFold ? " kb-edit" : "") +
    (kbFold && S.kbFit === "whole" ? " kb-whole" : "") +
    (pinchOn ? " pinching" : "") +
    (S.fold ? " fold" : "");
}

function syncKeyboardLayout() {
  const a = document.activeElement;
  const inCard = !!(a && a.closest && a.closest(".card"));
  const fold = kbOpen && inCard;
  if (kbFold === fold) return;
  kbFold = fold;
  app.className = shellClass();
  if (!fold && quietDirty) { render(); return; }
  fitCard();
  if (fold) scrollCaretIntoView();
}
let resizeT = 0;
const SIDE_STORE = "excerpt-sidew-v1";
let sideW = 0;
try { sideW = parseInt(localStorage.getItem(SIDE_STORE), 10) || 0; } catch (e) {}
function applySideW() {
  if (sideW) app.style.setProperty("--side", sideW + "px"); else app.style.removeProperty("--side");
}
applySideW();
let colDrag = null, colTapAt = 0;
app.addEventListener("pointerdown", (e) => {
  const g = e.target.closest && e.target.closest("[data-colgrip]");
  if (!g || S.preview) return;
  e.preventDefault(); e.stopPropagation();
  const now = Date.now();
  if (now - colTapAt < 350) { colTapAt = 0; if (S.colGap != null) { snap(true); set({ colGap: null, fit: 1 }); } return; }
  colTapAt = now;
  const card = g.closest(".card");
  const k = card ? card.getBoundingClientRect().width / (card.offsetWidth || 1) : 1;
  colDrag = { x: e.clientX, gap: colGapOf(), k: k || 1, v: colGapOf(), g: g, moved: false };
  g.classList.add("on");
  try { g.setPointerCapture(e.pointerId); } catch (err) {}
}, true);
app.addEventListener("pointermove", (e) => {
  if (!colDrag) return;
  const v = Math.round(clampN(colDrag.gap + (e.clientX - colDrag.x) / colDrag.k * 2, COLGAP_MIN, COLGAP_MAX));
  if (v === colDrag.v) return;
  if (!colDrag.moved) { colDrag.moved = true; snap(true); }
  colDrag.v = v; S.colGap = v;
  app.querySelectorAll(".card-flow").forEach(f => { f.style.columnGap = v + "px"; });
});
const colEnd = () => {
  if (!colDrag) return;
  const v = colDrag.v, moved = colDrag.moved;
  colDrag.g.classList.remove("on");
  colDrag = null;
  if (moved) set({ colGap: v, fit: 1 });
};
app.addEventListener("pointerup", colEnd);
app.addEventListener("pointercancel", colEnd);
let sideDrag = null, sideRaf = 0;
app.addEventListener("pointerdown", (e) => {
  const h = e.target.closest && e.target.closest("[data-rs]");
  if (!h) return;
  e.preventDefault();
  const r = app.getBoundingClientRect();
  sideDrag = { right: r.right, width: r.width };
  try { h.setPointerCapture(e.pointerId); } catch (err) {}
  document.body.classList.add("side-dragging");
});
app.addEventListener("pointermove", (e) => {
  if (!sideDrag) return;
  sideW = Math.round(clampN(sideDrag.right - e.clientX, 320, Math.max(320, sideDrag.width - 420)));
  applySideW();
  if (!sideRaf) sideRaf = requestAnimationFrame(() => { sideRaf = 0; fitCard(); });
});
const sideEnd = () => {
  if (!sideDrag) return;
  sideDrag = null;
  document.body.classList.remove("side-dragging");
  try { localStorage.setItem(SIDE_STORE, String(sideW)); } catch (e) {}
  onResize();
};
app.addEventListener("pointerup", sideEnd);
app.addEventListener("pointercancel", sideEnd);
app.addEventListener("dblclick", (e) => {
  if (!e.target.closest || !e.target.closest("[data-rs]")) return;
  sideW = 0; applySideW();
  try { localStorage.removeItem(SIDE_STORE); } catch (err) {}
  onResize();
});
function onResize() {
  syncViewport();
  fitTplGrid();
  fitCard();
  updateChipFades();
  clearTimeout(resizeT);
  resizeT = setTimeout(() => { fitCard(); measure(); }, 120);
}
app.addEventListener("focusin", syncKeyboardLayout);
app.addEventListener("focusout", () => setTimeout(syncKeyboardLayout, 0));
window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", onResize);
if (window.visualViewport) window.visualViewport.addEventListener("resize", onResize);

const BLUR_W = 640;
let blurDone = { key: "", url: "" }, blurJob = null, blurT = 0;
function blurDesignPx() {
  const [w] = dims();
  return (S.bgBlur / 100) * w * S.bgScale * 0.04 * 0.6;
}
function blurredBg() {
  const k = bgKey + ":" + S.bgBlur;
  if (blurDone.key === k) return blurDone.url;
  if (!bgBlob) return "";
  clearTimeout(blurT);
  blurT = setTimeout(() => { blurReady().then(() => repaintCard()).catch(() => {}); }, 160);
  return "";
}
function blurReady() {
  const k = bgKey + ":" + S.bgBlur;
  if (blurDone.key === k) return Promise.resolve(blurDone.url);
  if (blurJob && blurJob.key === k) return blurJob.p;
  if (!bgBlob) return Promise.resolve("");
  const p = makeBlur(bgBlob, S.bgBlur).then(url => {
    if (blurDone.url) URL.revokeObjectURL(blurDone.url);
    blurDone = { key: k, url: url };
    return url;
  });
  blurJob = { key: k, p: p };
  return p;
}
let artBlur = { key: "", url: "" }, artJob = null, artColorPrev = null;
function artBlurReady() {
  const src = artSrc();
  if (!src || S.artBg !== "blur") return Promise.resolve("");
  if (artBlur.key === src) return Promise.resolve(artBlur.url);
  if (artJob && artJob.key === src) return artJob.p;
  const p = fetch(src).then(r => r.blob()).then(bl => makeBlur(bl, 70)).then(url => {
    if (artBlur.url) URL.revokeObjectURL(artBlur.url);
    artBlur = { key: src, url: url };
    return url;
  }).catch(() => "");
  artJob = { key: src, p: p };
  return p;
}
function artBgHTML() {
  if (S.bgImage || S.artBg !== "blur") return "";
  const src = artSrc();
  if (!src) return "";
  const ready = artBlur.key === src ? artBlur.url : "";
  if (!ready) artBlurReady().then(u => { if (u) repaintCard(); });
  return '<div class="card-bg"><div class="pic" style="inset:-14%;background-image:url(' + (ready || src) + ")" + (ready ? "" : ";filter:blur(18px)") + '"></div>' +
    '<div class="veil" style="background:linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.46))"></div></div>';
}
async function artColors(src) {
  const bl = await (await fetch(src)).blob();
  const bmp = await createImageBitmap(bl);
  const cv = document.createElement("canvas"); cv.width = 36; cv.height = 36;
  const x = cv.getContext("2d"); x.drawImage(bmp, 0, 0, 36, 36); if (bmp.close) bmp.close();
  const d = x.getImageData(0, 0, 36, 36).data;
  let r = 0, g = 0, b = 0, wsum = 0;
  for (let i = 0; i < d.length; i += 4) {
    const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
    const sat = mx ? (mx - mn) / mx : 0, lt = (mx + mn) / 510;
    const w = 0.15 + sat * sat * 3 * (1 - Math.abs(lt - 0.5));
    r += d[i] * w; g += d[i + 1] * w; b += d[i + 2] * w; wsum += w;
  }
  const hex = (v) => "#" + v.map(n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0")).join("");
  const base = [r / wsum, g / wsum, b / wsum];
  const scaleTo = (c, L) => { const l = (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255 || 0.01; const k = L / l; return c.map(n => n * Math.min(k, 3)); };
  return [hex(scaleTo(base, 0.3)), hex(scaleTo(base, 0.08))];
}
async function makeBlur(blob, level) {
  const bmp = await createImageBitmap(blob);
  const w = Math.min(BLUR_W, bmp.width), h = Math.max(1, Math.round(bmp.height * w / bmp.width));
  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d");
  ctx.drawImage(bmp, 0, 0, w, h);
  if (bmp.close) bmp.close();
  const img = ctx.getImageData(0, 0, w, h);
  const r = Math.max(1, Math.round((level / 100) * w * 0.04 / 1.7));
  const tmp = new Uint8ClampedArray(img.data.length);
  for (let i = 0; i < 3; i++) { boxPass(img.data, tmp, w, h, r, true); boxPass(tmp, img.data, w, h, r, false); }
  ctx.putImageData(img, 0, 0);
  const out = await new Promise(ok => cv.toBlob(ok, "image/jpeg", 0.9));
  return URL.createObjectURL(out);
}
function boxPass(src, dst, w, h, r, horiz) {
  const len = horiz ? w : h, lines = horiz ? h : w, div = 1 / (r * 2 + 1), step = horiz ? 4 : w * 4;
  for (let l = 0; l < lines; l++) {
    const base = horiz ? l * w * 4 : l * 4, last = base + (len - 1) * step;
    let sr = src[base] * (r + 1), sg = src[base + 1] * (r + 1), sb = src[base + 2] * (r + 1);
    for (let i = 1; i <= r; i++) {
      const o = base + Math.min(i, len - 1) * step;
      sr += src[o]; sg += src[o + 1]; sb += src[o + 2];
    }
    for (let i = 0, o = base; i < len; i++, o += step) {
      dst[o] = sr * div; dst[o + 1] = sg * div; dst[o + 2] = sb * div; dst[o + 3] = 255;
      const a = i + r + 1 < len ? o + (r + 1) * step : last;
      const d = i > r ? o - r * step : base;
      sr += src[a] - src[d]; sg += src[a + 1] - src[d + 1]; sb += src[a + 2] - src[d + 2];
    }
  }
}

let toastT = 0;
function flash(msg, act) {
  clearTimeout(toastT);
  set({ toast: msg, toastAct: act || null });
  toastT = setTimeout(() => set({ toast: "", toastAct: null }), act ? 4500 : 1900);
}
const toastActHTML = () => S.toastAct ? '<button class="toast-act" data-act="' + S.toastAct.act + '">' + esc(S.toastAct.label) + "</button>" : "";

function rangeHits(spec, codes) {
  return spec.split(",").some(part => {
    const t = part.trim().replace(/^u\+/i, "");
    if (!t) return false;
    if (t.indexOf("?") >= 0) {
      const a = parseInt(t.replace(/\?/g, "0"), 16), b = parseInt(t.replace(/\?/g, "f"), 16);
      return codes.some(c => c >= a && c <= b);
    }
    if (t.indexOf("-") > 0) {
      const p = t.split("-"), a = parseInt(p[0], 16), b = parseInt(p[1], 16);
      return codes.some(c => c >= a && c <= b);
    }
    const v = parseInt(t, 16);
    return codes.some(c => c === v);
  });
}

function usedFonts(node) {
  const byFont = new Map();
  const live = new Set();
  document.fonts.forEach(x => { if (x.status === "loaded") live.add(x.family.replace(/^["']|["']$/g, "")); });
  const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const s = (n.nodeValue || "").replace(/\s/g, "");
    if (!s) continue;
    const el = n.parentElement;
    if (!el) continue;
    const cs = getComputedStyle(el);
    const fams = (cs.fontFamily || "").split(",").map(x => x.trim().replace(/^["']|["']$/g, ""));
    const f = FONT_BY_FAMILY[fams.find(x => FONT_BY_FAMILY[x] && live.has(x)) || fams[0]];
    if (!f) continue;
    let set = byFont.get(f);
    if (!set) { set = new Set([" ", "\u00a0"]); set.wts = new Set(); byFont.set(f, set); }
    for (const ch of s) set.add(ch);
    set.wts.add(parseInt(cs.fontWeight, 10) || 400);
    if (f.kb) {
      const kf = fontOf(f.kb);
      let ks = byFont.get(kf);
      if (!ks) { ks = new Set(); ks.wts = new Set(); byFont.set(kf, ks); }
      for (const ch of s) if (!HAN_RE.test(ch)) ks.add(ch);
      ks.wts.add(parseInt(cs.fontWeight, 10) || 400);
    }
    const hs = [...s].filter(ch => HAN_RE.test(ch));
    if (hs.length) hanFB(f).forEach(fb => {
      const hf = fontOf(fb);
      let ks = byFont.get(hf);
      if (!ks) { ks = new Set(); ks.wts = new Set(); byFont.set(hf, ks); }
      hs.forEach(ch => ks.add(ch));
      ks.wts.add(parseInt(cs.fontWeight, 10) || 400);
    });
  }
  return byFont;
}

function weightHits(css, wts) {
  if (!wts || !wts.size) return () => true;
  const range = (b) => {
    const m = b.match(/font-weight:\s*(\d+)(?:\s+(\d+))?/i);
    return m ? [+m[1], +(m[2] || m[1])] : null;
  };
  const far = (r, w) => w < r[0] ? r[0] - w : w > r[1] ? w - r[1] : 0;
  const all = (css.match(/@font-face\s*\{[^}]*\}/g) || []).map(range).filter(Boolean);
  const best = new Map();
  wts.forEach(w => best.set(w, Math.min.apply(null, all.map(r => far(r, w)))));
  return (b) => {
    const r = range(b);
    if (!r) return true;
    for (const [w, d] of best) if (far(r, w) === d) return true;
    return false;
  };
}

const HB_URL = "https://cdn.jsdelivr.net/npm/harfbuzzjs@1.6.2/dist/harfbuzz-subset.wasm";
const HB_SHA256 = "X8Es9qhDpwPLqzYBacaBcEQW8zDTl55+Wj9LBQ77tyA=";
let hbP = null, brP = null;
function loadHB() {
  if (!hbP) hbP = (async () => {
    if (!window.WebAssembly || !crypto.subtle) throw new Error("no wasm");
    const buf = await (await fetch(HB_URL)).arrayBuffer();
    const sum = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.digest("SHA-256", buf))));
    if (sum !== HB_SHA256) throw new Error("hb hash");
    return (await WebAssembly.instantiate(buf, {})).instance.exports;
  })().catch(e => { hbP = null; throw e; });
  return hbP;
}
function loadBrotli() {
  if (!brP) brP = import("https://esm.sh/brotli@1.3.3/decompress.js").then(m => m.default || m).catch(e => { brP = null; throw e; });
  return brP;
}
const WOFF2_TAGS = ["cmap","head","hhea","hmtx","maxp","name","OS/2","post","cvt ","fpgm","glyf","loca","prep","CFF ","VORG","EBDT","EBLC","gasp","hdmx","kern","LTSH","PCLT","VDMX","vhea","vmtx","BASE","GDEF","GPOS","GSUB","EBSC","JSTF","MATH","CBDT","CBLC","COLR","CPAL","SVG ","sbix","acnt","avar","bdat","bloc","bsln","cvar","fdsc","feat","fmtx","fvar","gvar","hsty","just","lcar","mort","morx","opbd","prop","trak","Zapf","Silf","Glat","Gloc","Feat","Sill"];
function sfntOf(flavor, tabs) {
  const n = tabs.length;
  let size = 12 + 16 * n;
  const offs = tabs.map(x => { const o = size; size += (x.data.length + 3) & ~3; return o; });
  const sf = new Uint8Array(size), dv = new DataView(sf.buffer);
  let es = 0; while ((1 << (es + 1)) <= n) es++;
  dv.setUint32(0, flavor); dv.setUint16(4, n); dv.setUint16(6, (1 << es) * 16); dv.setUint16(8, es); dv.setUint16(10, n * 16 - (1 << es) * 16);
  tabs.map((x, i) => i).sort((a, b) => tabs[a].tag < tabs[b].tag ? -1 : 1).forEach((ti, k) => {
    const x = tabs[ti], d = 12 + k * 16;
    for (let j = 0; j < 4; j++) sf[d + j] = x.tag.charCodeAt(j);
    dv.setUint32(d + 8, offs[ti]); dv.setUint32(d + 12, x.data.length); sf.set(x.data, offs[ti]);
  });
  return sf;
}
async function woff2Sfnt(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  if (dv.getUint32(0) !== 0x774F4632 || dv.getUint16(14)) return null;
  const n = dv.getUint16(12), comp = dv.getUint32(20);
  let o = 48;
  const b128 = () => { let v = 0; for (let i = 0; i < 5; i++) { const c = dv.getUint8(o++); v = (v << 7) | (c & 0x7f); if (!(c & 0x80)) return v >>> 0; } throw new Error("b128"); };
  const tabs = [];
  for (let i = 0; i < n; i++) {
    const fl = dv.getUint8(o++);
    let tag = WOFF2_TAGS[fl & 0x3f];
    if ((fl & 0x3f) === 0x3f) { tag = String.fromCharCode(dv.getUint8(o), dv.getUint8(o + 1), dv.getUint8(o + 2), dv.getUint8(o + 3)); o += 4; }
    const xf = (fl >> 6) & 3, orig = b128();
    if ((tag === "glyf" || tag === "loca") ? xf !== 3 : xf !== 0) return null;
    tabs.push({ tag, len: orig });
  }
  const data = (await loadBrotli())(buf.subarray(o, o + comp));
  let at = 0;
  tabs.forEach(x => { x.data = data.subarray(at, at + x.len); at += x.len; });
  return sfntOf(dv.getUint32(4), tabs);
}
async function woffSfnt(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  if (dv.getUint32(0) !== 0x774F4646 || !window.DecompressionStream) return null;
  const n = dv.getUint16(12), tabs = [];
  for (let i = 0; i < n; i++) {
    const o = 44 + i * 20, off = dv.getUint32(o + 4), cl = dv.getUint32(o + 8), ol = dv.getUint32(o + 12);
    const raw = buf.subarray(off, off + cl);
    const data = cl < ol ? new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate"))).arrayBuffer()) : raw;
    tabs.push({ tag: String.fromCharCode(...buf.subarray(o, o + 4)), data });
  }
  return sfntOf(dv.getUint32(4), tabs);
}
function hbSubset(ex, sf, codes) {
  const ptr = ex.malloc(sf.length);
  if (!ptr) return null;
  new Uint8Array(ex.memory.buffer).set(sf, ptr);
  const blob = ex.hb_blob_create(ptr, sf.length, 2, 0, 0), face = ex.hb_face_create(blob, 0);
  ex.hb_blob_destroy(blob);
  const input = ex.hb_subset_input_create_or_fail();
  let out = null;
  if (input) {
    const us = ex.hb_subset_input_unicode_set(input);
    codes.forEach(c => ex.hb_set_add(us, c));
    const sub = ex.hb_subset_or_fail(face, input);
    ex.hb_subset_input_destroy(input);
    if (sub) {
      const rb = ex.hb_face_reference_blob(sub), dp = ex.hb_blob_get_data(rb, 0), len = ex.hb_blob_get_length(rb);
      if (len) out = new Uint8Array(ex.memory.buffer).slice(dp, dp + len);
      ex.hb_blob_destroy(rb); ex.hb_face_destroy(sub);
    }
  }
  ex.hb_face_destroy(face); ex.free(ptr);
  return out;
}
async function subsetFace(srcs, base, codes) {
  try {
    const ex = await loadHB();
    for (const kind of ["woff2", "woff"]) {
      const s = srcs.find(x => x.f === kind);
      if (!s) continue;
      const buf = new Uint8Array(await (await fetch(new URL(s.u, base).href)).arrayBuffer());
      const sf = kind === "woff2" ? await woff2Sfnt(buf) : await woffSfnt(buf);
      if (!sf) continue;
      const bytes = hbSubset(ex, sf, codes);
      if (bytes && bytes.length > 12) return { bytes, otf: new DataView(bytes.buffer).getUint32(0) === 0x4F54544F };
    }
  } catch (e) {}
  return null;
}
const blobURL64 = (blob) => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(blob); });

async function embedFont(f, chars, wts) {
  if (!chars.length) return "";
  const codes = chars.map(c => c.codePointAt(0));

  let base, css;
  if (f.u) {
    base = f.u;
    css = await (await fetch(f.u)).text();
  } else {
    base = "https://fonts.googleapis.com/";
    const chunks = [];
    let cur = "", len = 0;
    for (const ch of chars) {
      const n = encodeURIComponent(ch).length;
      if (cur && len + n > 4000) { chunks.push(cur); cur = ""; len = 0; }
      cur += ch; len += n;
    }
    if (cur) chunks.push(cur);
    const wq = wts && wts.size ? [...new Set([...wts].map(w => snapW(f, w)))].sort((a, b) => a - b).join(";") : "";
    css = (await Promise.all(chunks.map(async t => (await fetch(fontURL(f, wq) + "&text=" + encodeURIComponent(t))).text()))).join("\n");
  }

  const blocks = (css.match(/@font-face\s*\{[^}]*\}/g) || []).filter(b => {
    const ur = b.match(/unicode-range:\s*([^;}]+)/i);
    return !ur || rangeHits(ur[1], codes);
  }).filter(weightHits(css, wts)).slice(0, f.u ? 40 : 120);

  const out = [];
  for (const b of blocks) {
    const srcs = [...b.matchAll(/url\(\s*["']?([^)"']+?)["']?\s*\)(?:\s*format\(\s*["']?([\w-]+)["']?\s*\))?/gi)]
      .map(x => ({ u: x[1], f: (x[2] || (/\.woff2(\?|#|$)/i.test(x[1]) ? "woff2" : /\.woff(\?|#|$)/i.test(x[1]) ? "woff" : "")).toLowerCase() }))
      .map(x => ({ u: x.u, f: /^woff2/.test(x.f) ? "woff2" : /^woff/.test(x.f) ? "woff" : x.f }));
    const pick = srcs.find(x => x.f === "woff2") || srcs.find(x => x.f === "woff");
    if (!pick) continue;
    const m = [null, pick.u];
    let fmt = pick.f;
    try {
      let data = null;
      if (f.u) {
        const sub = await subsetFace(srcs, base, codes);
        if (sub) { data = await blobURL64(new Blob([sub.bytes], { type: sub.otf ? "font/otf" : "font/ttf" })); fmt = sub.otf ? "opentype" : "truetype"; }
      }
      if (!data) data = await blobURL64(await (await fetch(new URL(m[1], base).href)).blob());
      out.push(b.replace(/\s*src:[^;}]+;?/gi, "").replace(/\}\s*$/, " src: url(" + data + ") format('" + fmt + "'); }"));
    } catch (e) {}
  }
  return out.join("\n");
}

async function fontEmbedCSS(node) {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const used = usedFonts(node);
  if (!used.size) return "";
  const parts = await Promise.all(
    Array.from(used).map(([f, set]) => embedFont(f, Array.from(set), set.wts).catch(() => ""))
  );
  return parts.filter(Boolean).join("\n");
}

async function inlineBlobs(html) {
  const urls = Array.from(new Set(html.match(/blob:[^)"'\s]+/g) || []));
  let out = html;
  for (const u of urls) {
    try {
      const blob = await (await fetch(u)).blob();
      const data = await new Promise((ok, no) => {
        const r = new FileReader();
        r.onload = () => ok(r.result);
        r.onerror = no;
        r.readAsDataURL(blob);
      });
      out = out.split(u).join(data);
    } catch (e) {}
  }
  return out;
}

function snapPics(root) {
  const r0 = root.getBoundingClientRect();
  root.querySelectorAll(".b-photo, .b-scene").forEach(el => {
    const r = el.getBoundingClientRect();
    if (!r.height) return;
    const top = r.top - r0.top, h = r.height;
    const t = Math.round(top), nh = Math.max(1, Math.round(h));
    if (Math.abs(t - top) < 0.01 && Math.abs(nh - h) < 0.01) return;
    const cs = getComputedStyle(el);
    el.style.aspectRatio = "auto";
    el.style.height = nh + "px";
    el.style.top = (parseFloat(cs.top) || 0) + (t - top) + "px";
    if (cs.position === "static") el.style.position = "relative";
    el.style.marginBottom = (parseFloat(cs.marginBottom) || 0) + (h - nh) + "px";
  });
}
function fillSync(root) {
  const els = [...root.querySelectorAll(".b-photo[data-fill]")];
  els.forEach(el => {
    if (el.dataset.ar0 == null) el.dataset.ar0 = el.style.aspectRatio;
    el.style.aspectRatio = el.dataset.ar0; el.style.height = "";
    const blk = el.closest(".blk");
    if (blk) { if (blk.dataset.mt0 == null) blk.dataset.mt0 = blk.style.marginTop; blk.style.marginTop = blk.dataset.mt0; }
  });
  if (S.ratio !== "auto" || !S.autoMinH || !els.length) return;
  const card = root.querySelector(".card");
  if (!card) return;
  const keep = card.style.minHeight;
  card.style.minHeight = AUTO_MIN + "px";
  const extra = autoMinPx() - card.offsetHeight;
  card.style.minHeight = keep;
  if (extra <= 0.5) return;
  const each = extra / els.length;
  els.forEach(el => {
    if (el.dataset.fill === "bottom") {
      const blk = el.closest(".blk");
      if (blk) blk.style.marginTop = ((parseFloat(getComputedStyle(blk).marginTop) || 0) + each) + "px";
    } else { const h = el.offsetHeight; el.style.aspectRatio = "auto"; el.style.height = (h + each) + "px"; }
  });
}
let phDrag = null;
app.addEventListener("pointerdown", (e) => {
  const g = e.target.closest && e.target.closest("[data-phgrip]");
  if (!g || S.preview) return;
  e.preventDefault(); e.stopPropagation();
  const b = S.blocks.find(x => x.id === g.dataset.phgrip), box = g.closest(".b-photo");
  if (!b || !box) return;
  const card = box.closest(".card"), col = box.parentElement;
  const k = card ? card.getBoundingClientRect().width / (card.offsetWidth || 1) : 1;
  phDrag = { b: b, box: box, g: g, x: e.clientX, y: e.clientY, k: k || 1, w: box.offsetWidth, h: box.offsetHeight,
    cw: col.offsetWidth || box.offsetWidth, moved: false, pw: b.pw || 100, ar: b.ar };
  g.classList.add("on");
  try { g.setPointerCapture(e.pointerId); } catch (err) {}
}, true);
app.addEventListener("pointermove", (e) => {
  const d = phDrag;
  if (!d) return;
  const dx = (e.clientX - d.x) / d.k, dy = (e.clientY - d.y) / d.k;
  if (!d.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
  if (!d.moved) { d.moved = true; snap(true); }
  const pw = Math.round(clampN((d.w + dx) / d.cw * 100, 20, 100));
  const w = d.cw * pw / 100;
  const h = clampN(d.h + dy, w / RATIO_LIM, w * RATIO_LIM);
  const W = Math.max(1, Math.round(w)), Hh = Math.max(1, Math.round(h)), gcd = (a, c) => c ? gcd(c, a % c) : a, q = gcd(W, Hh);
  d.pw = pw; d.ar = ratioKey(W / q, Hh / q, Object.keys(SCENE_AR));
  d.box.style.width = pw + "%";
  d.box.style.aspectRatio = String(arOf(d.ar));
  d.box.style.height = "";
});
const phEnd = () => {
  const d = phDrag;
  if (!d) return;
  phDrag = null;
  d.g.classList.remove("on");
  if (!d.moved) return;
  if (d.pw >= 100) delete d.b.pw; else d.b.pw = d.pw;
  d.b.ar = d.ar;
  set({ blocks: S.blocks.slice(), fit: 1 });
};
app.addEventListener("pointerup", phEnd);
app.addEventListener("pointercancel", phEnd);
const SVG_PFX = "data:image/svg+xml;charset=utf-8,";
function fixFontSizes(url) {
  if (url.indexOf(SVG_PFX) !== 0) return url;
  const doc = new DOMParser().parseFromString(decodeURIComponent(url.slice(SVG_PFX.length)), "image/svg+xml");
  if (doc.querySelector("parsererror")) return url;
  doc.querySelectorAll("[data-fs]").forEach(n => {
    const v = n.getAttribute("data-fs");
    if (/^[\d.]+px$/.test(v) && n.style) n.style.setProperty("font-size", v);
    n.removeAttribute("data-fs");
  });
  return SVG_PFX + encodeURIComponent(new XMLSerializer().serializeToString(doc));
}
async function svgToPNG(url, w, h, ratio, bg) {
  const img = new Image();
  img.decoding = "async";
  await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = url; });
  const cv = document.createElement("canvas"), LIM = 16384;
  let cw = w * ratio, ch = h * ratio;
  if (cw > LIM || ch > LIM) { const k = LIM / Math.max(cw, ch); cw *= k; ch *= k; }
  cv.width = cw; cv.height = ch;
  const ctx = cv.getContext("2d");
  if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, cv.width, cv.height); }
  ctx.drawImage(img, 0, 0, cv.width, cv.height);
  return await new Promise(ok => cv.toBlob(ok, "image/png", 1));
}
async function cardBlob(opt) {
  const thumb = !!(opt && opt.thumb);
  if (!app.querySelector(".card")) return null;
  if (S.bgImage && S.bgBlur > 0 && bgURL) await blurReady();
  if (S.artBg === "blur") await artBlurReady();
  if (sideFxKey(sidePic())) await sideFxReady().catch(() => {});
  const was = S.preview;
  S.preview = true;
  const html = cardHTML();
  S.preview = was;

  const holder = document.createElement("div");
  holder.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;pointer-events:none";
  holder.innerHTML = await inlineBlobs(html);
  document.body.appendChild(holder);
  inkWrap(holder);
  tgradSync(holder);
  bubFit(holder);
  fillSync(holder);
  try {
    const scale = holder.querySelector(".card-scale");
    if (scale) scale.style.transform = "none";
    const node = holder.querySelector(".card-sheet") || holder.querySelector(".card");
    if (!node) return null;
    const mod = await import("https://esm.sh/html-to-image@1.11.11");
    const embedded = thumb ? "" : await fontEmbedCSS(node).catch(() => "");
    snapPics(node);
    node.querySelectorAll("*").forEach(n => { n.setAttribute("data-fs", getComputedStyle(n).fontSize); });
    node.setAttribute("data-fs", getComputedStyle(node).fontSize);
    const w = node.offsetWidth, h = node.offsetHeight;
    const ratio = thumb ? 240 / w : (opt && opt.px ? opt.px / w : expK());
    const svgURL = await mod.toSvg(node, {
      width: w, height: h, cacheBust: true,
      style: { transform: "none", margin: "0" },
      skipFonts: thumb,
      fontEmbedCSS: embedded
    });
    const flat = await svgToPNG(fixFontSizes(svgURL), w, h, ratio, S.bgImage ? "#2a2a28" : S.bg);
    const PE = pfxEff();
    if (!flat || !PE) return flat;
    const cr = node.getBoundingClientRect(), box = [1, 1, 0, 0];
    node.querySelectorAll(".blk").forEach(n => {
      const r = n.getBoundingClientRect();
      if (!r.width || !r.height) return;
      box[0] = Math.min(box[0], (r.left - cr.left) / cr.width); box[1] = Math.min(box[1], (r.top - cr.top) / cr.height);
      box[2] = Math.max(box[2], (r.right - cr.left) / cr.width); box[3] = Math.max(box[3], (r.bottom - cr.top) / cr.height);
    });
    return await photoFx(flat, PE, box[2] > box[0] ? box : [0, 0, 1, 1]).catch(() => flat);
  } finally { holder.remove(); }
}
const PFX = {
  desk:  { n: "책상 위", rot: -0.36, skX: 0.1, skY: 0, zoom: 1.5, cx: 0.5, cy: 0.46, desk: "#5d5952", shade: 0.1,
           dof: [0.5, 0.92], dofDir: 1.35, blur: 0.012, bw: 0, sat: 0.8, con: 1.06, warm: 6, grain: 16, vig: 0.42 },
  bw:    { n: "흑백 펼침", rot: -0.27, skX: 0.08, skY: 0.02, zoom: 1.28, cx: 0.56, cy: 0.52, desk: "#0b0b0b", shade: 0.22,
           dof: [0.58, 0.95], dofDir: 1.2, blur: 0.01, bw: 1, sat: 0, con: 1.35, warm: 0, grain: 20, vig: 0.45 },
  curl:  { n: "휘어진 쪽", rot: 0.14, skX: -0.04, skY: -0.03, zoom: 1.22, cx: 0.46, cy: 0.5, desk: "#262626", shade: 0.15, curl: 1,
           dof: [0.6, 1], dofDir: 0.2, blur: 0.008, bw: 1, sat: 0, con: 1.12, warm: 0, grain: 14, vig: 0.38 },
  spine: { n: "책등 접힘", rot: -0.06, skX: 0.03, skY: 0, zoom: 1.2, cx: 0.55, cy: 0.5, desk: "#2b2a28", shade: 0.07, spine: 0.7,
           dof: [0.72, 1], dofDir: 0.2, blur: 0.004, bw: 0, sat: 0.7, con: 1.04, warm: 4, grain: 10, vig: 0.32 },
  soft:  { n: "살짝 기울임", rot: -0.14, skX: 0.05, skY: 0, zoom: 1.3, cx: 0.5, cy: 0.5, desk: "#b8b7b3", shade: 0.06,
           dof: [0.68, 1], dofDir: 1.57, blur: 0.007, bw: 0, sat: 0.35, con: 1.02, warm: 0, grain: 12, vig: 0.25 }
};
const PFX_KEYS = Object.keys(PFX);
const PFX_CTL = [
  { k: "rot", n: "각도", u: "°", lim: [-45, 45], get: P => Math.round(P.rot * 180 / Math.PI), set: (P, v) => { P.rot = v * Math.PI / 180; } },
  { k: "zoom", n: "확대", u: "%", lim: [60, 200], get: P => Math.round(P.zoom * 100), set: (P, v) => { P.zoom = v / 100; } },
  { k: "sat", n: "색 진하기", u: "%", lim: [0, 150], get: P => Math.round(P.sat * 100), set: (P, v) => { P.sat = v / 100; } },
  { k: "warm", n: "따뜻함", u: "", lim: [-30, 30], get: P => P.warm, set: (P, v) => { P.warm = v; } },
  { k: "con", n: "대비", u: "%", lim: [60, 170], get: P => Math.round(P.con * 100), set: (P, v) => { P.con = v / 100; } },
  { k: "bri", n: "밝기", u: "", lim: [-40, 40], get: P => P.bri || 0, set: (P, v) => { P.bri = v; } },
  { k: "spine", n: "책등 그림자", u: "%", lim: [0, 100], get: P => Math.round((P.spine || 0) * 100), set: (P, v) => { P.spine = v / 100; } },
  { k: "shadow", n: "종이 그림자", u: "%", lim: [0, 100], get: P => (P.shadow == null ? 50 : P.shadow), set: (P, v) => { P.shadow = v; } },
  { k: "vig", n: "가장자리", u: "%", lim: [0, 90], get: P => Math.round(P.vig * 100), set: (P, v) => { P.vig = v / 100; } },
  { k: "blur", n: "흐림", u: "%", lim: [0, 100], get: P => Math.round(P.blur / 0.02 * 100), set: (P, v) => { P.blur = v / 100 * 0.02; } },
  { k: "grain", n: "결", u: "", lim: [0, 50], get: P => P.grain, set: (P, v) => { P.grain = v; } }
];
const PFX_DESKS = [["#0b0b0b", "검정"], ["#2b2a28", "먹색"], ["#5d5952", "나무 회색"], ["#7a6450", "나무"], ["#b8b7b3", "밝은 회색"], ["#e8e4dc", "종이"]];
function pfxEff() {
  const base = PFX[S.pfx];
  if (!base) return null;
  const P = Object.assign({}, base), t = S.pfxT || {};
  PFX_CTL.forEach(c => { if (typeof t[c.k] === "number") c.set(P, t[c.k]); });
  if (t.desk && normHex(t.desk)) P.desk = normHex(t.desk);
  return P;
}
const pfxVal = (c) => { const t = S.pfxT || {}; return typeof t[c.k] === "number" ? t[c.k] : c.get(PFX[S.pfx]); };
const PFX_MAIN = ["rot", "spine", "sat", "shadow"];
function pfxRow(c) {
  const v = pfxVal(c), v0 = c.get(PFX[S.pfx]);
  return '<div class="row"><span class="lbl" style="width:64px">' + c.n + "</span>" +
    '<input type="range" min="' + c.lim[0] + '" max="' + c.lim[1] + '" step="1" value="' + v + '" data-act="pfxv" data-k="' + c.k + '" aria-label="' + c.n + '" />' +
    '<span class="mono" data-ui="pfx-' + c.k + '" style="font-size:11px;color:#6a6a68;width:40px;text-align:right">' + v + c.u + "</span>" +
    '<button class="resetlink" data-act="pfxreset" data-k="' + c.k + '" data-hold' + (v !== v0 ? ' title="기본값으로"' : " disabled") + ">기본</button></div>";
}
const loadBitmap = (blob) => new Promise((ok, no) => {
  const u = URL.createObjectURL(blob), im = new Image();
  im.onload = () => { URL.revokeObjectURL(u); ok(im); };
  im.onerror = (e) => { URL.revokeObjectURL(u); no(e); };
  im.src = u;
});
const mkCanvas = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
function softCopy(src, r) {
  const W = src.width, H = src.height, f = Math.max(2, r);
  const a = mkCanvas(Math.max(1, Math.round(W / f)), Math.max(1, Math.round(H / f)));
  const b = mkCanvas(Math.max(1, Math.round(W / f / 2)), Math.max(1, Math.round(H / f / 2)));
  const ax = a.getContext("2d"), bx = b.getContext("2d");
  ax.imageSmoothingQuality = bx.imageSmoothingQuality = "high";
  ax.drawImage(src, 0, 0, a.width, a.height);
  bx.drawImage(a, 0, 0, b.width, b.height);
  ax.clearRect(0, 0, a.width, a.height); ax.drawImage(b, 0, 0, a.width, a.height);
  const out = mkCanvas(W, H), ox = out.getContext("2d");
  ox.imageSmoothingQuality = "high";
  ox.drawImage(a, 0, 0, W, H);
  return out;
}
async function photoFx(blob, P, box) {
  const img = await loadBitmap(blob);
  const W = img.naturalWidth || img.width, H = img.naturalHeight || img.height;
  const fx = (box[0] + box[2]) / 2 * W, fy = (box[1] + box[3]) / 2 * H;
  const bw = (box[2] - box[0]) * W + W * 0.03, bh = (box[3] - box[1]) * H + H * 0.03;
  const co = Math.abs(Math.cos(P.rot)), si = Math.abs(Math.sin(P.rot));
  const sp = P.spine || 0, wBud = sp > 0 ? 0.8 : 0.94;
  const zoom = Math.min(P.zoom, wBud * W / (bw * co + bh * si + Math.abs(P.skX) * bh), 0.94 * H / (bw * si + bh * co + Math.abs(P.skY) * bw));
  const cv = mkCanvas(W, H), x = cv.getContext("2d");
  x.fillStyle = P.desk; x.fillRect(0, 0, W, H);
  x.save();
  x.translate(W * P.cx, H * P.cy);
  x.rotate(P.rot);
  x.transform(1, P.skY, P.skX, 1, 0, 0);
  x.scale(zoom, zoom);
  const sh = (P.shadow == null ? 50 : P.shadow) / 50;
  x.shadowColor = "rgba(0,0,0," + Math.min(0.9, 0.5 * sh) + ")"; x.shadowBlur = W * 0.03 * Math.max(0.2, sh); x.shadowOffsetY = W * 0.01 * sh;
  x.drawImage(img, -fx, -fy, W, H);
  x.shadowColor = "transparent";
  const lg = x.createLinearGradient(-fx, -fy, W - fx, H - fy);
  lg.addColorStop(0, "rgba(255,255,255," + P.shade * 0.6 + ")"); lg.addColorStop(1, "rgba(0,0,0," + P.shade + ")");
  x.fillStyle = lg; x.fillRect(-fx, -fy, W, H);
  x.restore();
  if (sp > 0) {
    const pc = x.getImageData(Math.round(W * P.cx), Math.round(Math.max(1, H * 0.04)), 1, 1).data;
    x.save();
    x.translate(W * P.cx, H * P.cy);
    x.rotate(P.rot);
    const xs = -(bw * zoom) / 2 - W * 0.045, R = Math.hypot(W, H) * 2, y0 = -fy * zoom, ph = H * zoom;
    x.fillStyle = "rgb(" + pc[0] + "," + pc[1] + "," + pc[2] + ")";
    x.fillRect(-R, y0, R + xs, ph);
    const fw = W * 0.16, fg = x.createLinearGradient(xs - fw, 0, xs, 0);
    fg.addColorStop(0, "rgba(0,0,0," + 0.06 * sp + ")"); fg.addColorStop(0.7, "rgba(0,0,0," + 0.24 * sp + ")"); fg.addColorStop(1, "rgba(0,0,0," + 0.6 * sp + ")");
    x.fillStyle = fg; x.fillRect(xs - fw, y0, fw, ph);
    x.fillStyle = "rgba(0,0,0," + 0.06 * sp + ")"; x.fillRect(-R, y0, R + xs - fw, ph);
    const gw = W * 0.26, gg = x.createLinearGradient(xs, 0, xs + gw, 0);
    gg.addColorStop(0, "rgba(0,0,0," + 0.55 * sp + ")"); gg.addColorStop(0.1, "rgba(0,0,0," + 0.28 * sp + ")");
    gg.addColorStop(0.24, "rgba(255,255,255," + 0.14 * sp + ")"); gg.addColorStop(0.42, "rgba(0,0,0," + 0.05 * sp + ")"); gg.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = gg; x.fillRect(xs, y0, gw, ph);
    x.restore();
  }
  if (P.curl) {
    x.save();
    const g = x.createLinearGradient(W * 0.62, 0, W, 0);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(0.35, "rgba(0,0,0,0.55)"); g.addColorStop(0.6, "rgba(150,150,150,0.55)"); g.addColorStop(1, "rgba(60,60,60,0.9)");
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(W * 0.78, -H * 0.05);
    x.bezierCurveTo(W * 0.64, H * 0.3, W * 0.66, H * 0.7, W * 0.84, H * 1.05);
    x.lineTo(W * 1.05, H * 1.05); x.lineTo(W * 1.05, -H * 0.05); x.closePath(); x.fill();
    x.restore();
  }
  if (P.blur > 0) {
    const bl = softCopy(cv, Math.round(W * P.blur * 3.2)), bx = bl.getContext("2d");
    const dx = Math.cos(P.dofDir), dy = Math.sin(P.dofDir), R = (Math.abs(dx) * W + Math.abs(dy) * H) / 2;
    const g = bx.createLinearGradient(W / 2 - dx * R, H / 2 - dy * R, W / 2 + dx * R, H / 2 + dy * R);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(P.dof[0], "rgba(0,0,0,0)"); g.addColorStop(P.dof[1], "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,1)");
    bx.globalCompositeOperation = "destination-in"; bx.fillStyle = g; bx.fillRect(0, 0, W, H);
    x.drawImage(bl, 0, 0);
  }
  const id = x.getImageData(0, 0, W, H), d = id.data, rnd = seeded(4096, 23);
  for (let i = 0, n = 0; i < d.length; i += 4, n++) {
    let r = d[i], gg = d[i + 1], b = d[i + 2];
    const l = 0.299 * r + 0.587 * gg + 0.114 * b;
    r = l + (r - l) * P.sat; gg = l + (gg - l) * P.sat; b = l + (b - l) * P.sat;
    const nz = (rnd[(n * 7 + (n >> 9)) & 4095] - 0.5) * P.grain;
    const br = P.bri || 0;
    r = (r - 128) * P.con + 128 + P.warm + nz + br; gg = (gg - 128) * P.con + 128 + nz + br; b = (b - 128) * P.con + 128 - P.warm + nz + br;
    d[i] = r < 0 ? 0 : r > 255 ? 255 : r; d[i + 1] = gg < 0 ? 0 : gg > 255 ? 255 : gg; d[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
  }
  x.putImageData(id, 0, 0);
  const vg = x.createRadialGradient(W * 0.46, H * 0.42, Math.min(W, H) * 0.3, W / 2, H / 2, Math.hypot(W, H) * 0.56);
  vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0," + P.vig + ")");
  x.fillStyle = vg; x.fillRect(0, 0, W, H);
  return await new Promise(ok => cv.toBlob(ok, "image/png"));
}
let pfxURL = "", pfxT = 0, pfxSeq = 0;
let pfxStageURL = "", pfxStageSig = "", pfxStageSeq = 0;
function pfxStage() {
  const fit = app.querySelector(".card-fit");
  if (!fit || S.screen !== "edit" || !PFX[S.pfx]) return;
  if (!S.preview) {
    if (!fit.querySelector(".pfx-badge")) fit.insertAdjacentHTML("beforeend",
      '<button class="pfx-badge" data-act="preview" title="미리보기에서 사진 효과를 입힌 모습을 봅니다">' + ic("zoom", 13) + "사진 효과 · " + PFX[S.pfx].n + " — 미리보기에서 보기</button>");
    return;
  }
  const sig = JSON.stringify([S.page, S.blocks, txt, pickPreset(S), fit.clientWidth]);
  const put = () => {
    let im = fit.querySelector(".pfx-stage");
    if (!im) { fit.insertAdjacentHTML("beforeend", '<img class="pfx-stage" alt="사진 효과를 입힌 저장 이미지">'); im = fit.querySelector(".pfx-stage"); }
    im.src = pfxStageURL;
    fit.classList.add("pfx-on");
  };
  if (sig === pfxStageSig && pfxStageURL) { put(); return; }
  fit.classList.add("pfx-wait");
  if (!fit.querySelector(".pfx-note")) fit.insertAdjacentHTML("beforeend", '<span class="pfx-note">사진 효과 입히는 중…</span>');
  const my = ++pfxStageSeq;
  const px = Math.round(fit.clientWidth * Math.min(3, window.devicePixelRatio || 1));
  setTimeout(async () => {
    const bl = await cardBlob({ px: px }).catch(() => null);
    if (my !== pfxStageSeq) return;
    const f2 = app.querySelector(".card-fit");
    if (f2) { f2.classList.remove("pfx-wait"); const n = f2.querySelector(".pfx-note"); if (n) n.remove(); }
    if (!bl || !S.preview || !f2) return;
    if (pfxStageURL) URL.revokeObjectURL(pfxStageURL);
    pfxStageURL = URL.createObjectURL(bl); pfxStageSig = sig;
    pfxStage();
  }, 60);
}
function pfxRefresh() {
  clearTimeout(pfxT);
  if (!S.pfx || S.screen !== "edit" || !app.querySelector(".pfx-pv")) return;
  pfxT = setTimeout(async () => {
    const my = ++pfxSeq;
    const bl = await cardBlob({ thumb: true }).catch(() => null);
    if (!bl || my !== pfxSeq) return;
    if (pfxURL) URL.revokeObjectURL(pfxURL);
    pfxURL = URL.createObjectURL(bl);
    const im = app.querySelector(".pfx-pv img");
    if (im) im.src = pfxURL;
  }, 450);
}
const fileStamp = () => {
  const d = new Date(), z = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + "-" + z(d.getHours()) + z(d.getMinutes());
};
function canShareFiles() {
  try {
    return coarsePtr.matches && !!navigator.canShare &&
      navigator.canShare({ files: [new File([new Blob(["x"], { type: "image/png" })], "x.png", { type: "image/png" })] });
  } catch (e) { return false; }
}
function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
async function allPageFiles(stamp) {
  const keep = S.page, n = S.pages, files = [];
  busyCancel = false;
  set({ busy: { i: 0, n: n }, sheet: false });
  try {
    for (let p = 0; p < n; p++) {
      if (busyCancel) { const e = new Error("취소"); e.name = "AbortError"; throw e; }
      S.page = p;
      const blob = await cardBlob();
      if (!blob) throw new Error("no card");
      files.push(new File([blob], "발췌_" + stamp + "_" + String(p + 1).padStart(2, "0") + ".png", { type: "image/png" }));
      busyTick(p + 1, n);
    }
    if (busyCancel) { const e = new Error("취소"); e.name = "AbortError"; throw e; }
  } finally {
    S.page = keep;
    S.busy = null;
  }
  return files;
}
const CRC_T = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(u8) {
  let c = 0xffffffff;
  for (let i = 0; i < u8.length; i++) c = CRC_T[(c ^ u8[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
async function zipFiles(files) {
  const enc = new TextEncoder(), parts = [], central = [];
  const d = new Date();
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  let off = 0;
  for (const f of files) {
    const data = new Uint8Array(await f.arrayBuffer()), name = enc.encode(f.name), crc = crc32(data);
    const lh = new DataView(new ArrayBuffer(30));
    [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 0, 2], [10, time, 2], [12, date, 2], [14, crc, 4],
      [18, data.length, 4], [22, data.length, 4], [26, name.length, 2], [28, 0, 2]]
      .forEach(([o, v, w]) => (w === 4 ? lh.setUint32(o, v, true) : lh.setUint16(o, v, true)));
    parts.push(lh.buffer, name, data);
    const ch = new DataView(new ArrayBuffer(46));
    [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, time, 2], [14, date, 2], [16, crc, 4],
      [20, data.length, 4], [24, data.length, 4], [28, name.length, 2], [30, 0, 2], [32, 0, 2], [34, 0, 2], [36, 0, 2],
      [38, 0, 4], [42, off, 4]]
      .forEach(([o, v, w]) => (w === 4 ? ch.setUint32(o, v, true) : ch.setUint16(o, v, true)));
    central.push(ch.buffer, name);
    off += 30 + name.length + data.length;
  }
  const cdSize = central.reduce((sum, x) => sum + x.byteLength, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, cdSize, true);
  end.setUint32(16, off, true);
  return new Blob(parts.concat(central, [end.buffer]), { type: "application/zip" });
}
let readyFiles = null, readyFeat = "";
async function shareReady() {
  const files = readyFiles, feat = readyFeat || "여러 장 저장";
  readyFiles = null;
  set({ cdlg: null });
  if (!files) return;
  try {
    await navigator.share({ files: files });
    track("download", Object.assign(cardLook(), { method: "share_sheet", count: files.length, hi: S.expHi ? 1 : 0 }));
    expResult(feat, "success", { method: "share_sheet" });
  } catch (e) {
    if (e && e.name === "AbortError") { expResult(feat, "cancel", { method: "share_sheet" }); return; }
    download(await zipFiles(files), files[0].name.replace(/_\d+\.png$/, ".zip"));
    track("download", Object.assign(cardLook(), { method: "zip", count: files.length, hi: S.expHi ? 1 : 0 }));
    expResult(feat, "success", { method: "zip_fallback" });
    flash("공유가 안 돼 ZIP 으로 저장했어요");
  }
}
let lastSaveOnly = false;
async function saveImg(onlyThis) {
  lastSaveOnly = onlyThis;
  const stamp = fileStamp();
  const feat = onlyThis ? "지금 장만 저장" : S.pages > 1 ? "여러 장 저장" : "사진에 저장";
  try {
    if (S.pages <= 1 || onlyThis) {
      set({ sheet: false, busy: { i: 0, n: 1 } });
      let blob;
      try { blob = await cardBlob(); } finally { S.busy = null; }
      if (!blob) throw new Error("no card");
      download(blob, "발췌_" + stamp + (S.pages > 1 ? "_" + String(S.page + 1).padStart(2, "0") : "") + ".png");
      track("download", Object.assign(cardLook(), { method: "png", count: 1, hi: S.expHi ? 1 : 0 }));
      expResult(feat, "success", { method: "png" });
      flash("사진으로 저장했습니다");
      return;
    }
    const files = await allPageFiles(stamp);
    if (canShareFiles()) {
      readyFiles = files;
      readyFeat = feat;
      expResult(feat, "ready", { method: "share_sheet" });
      set({ cdlg: { title: files.length + "장을 만들었어요", note: "눌러서 사진첩에 한 번에 저장합니다 · 공유 창에서 \u2018이미지 저장\u2019을 고르세요",
        ok: "사진에 저장", no: "닫기", act: "sharefiles", safe: true } });
      return;
    }
    download(await zipFiles(files), "발췌_" + stamp + ".zip");
    track("download", Object.assign(cardLook(), { method: "zip", count: files.length, hi: S.expHi ? 1 : 0 }));
    expResult(feat, "success", { method: "zip" });
    flash(files.length + "장을 ZIP 하나로 저장했어요");
  } catch (e) {
    if (e && e.name === "AbortError") { track("download_cancel", { pages: S.pages || 1 }); expResult(feat, "cancel"); render(); flash("저장을 취소했어요"); return; }
    track("download_fail", { pages: S.pages || 1, error_message: String(e && e.message || e).slice(0, 100) });
    expResult(feat, "fail", { error_message: String(e && e.message || e).slice(0, 100) });
    set({ cdlg: { title: "이미지를 만들지 못했어요", note: "잠시 뒤 다시 시도해 주세요 · 계속 안 되면 더보기 → 문제 신고",
      ok: "다시 시도", no: "닫기", act: "retrysave", safe: true } });
  }
}
const WG_PROPS = ["zoom", "contain", "display", "position", "top", "right", "bottom", "left", "z-index", "box-sizing", "width", "height", "min-width", "min-height", "max-width", "max-height",
  "margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom", "padding-left",
  "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style",
  "border-top-color", "border-right-color", "border-bottom-color", "border-left-color",
  "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius",
  "background-color", "background-image", "background-size", "background-position", "background-repeat", "background-clip",
  "opacity", "visibility", "overflow-x", "overflow-y", "box-shadow", "filter", "backdrop-filter", "transform", "transform-origin", "clip-path", "mix-blend-mode",
  "mask-image", "-webkit-mask-image", "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis", "justify-content", "align-items", "align-self", "align-content", "order",
  "row-gap", "column-gap", "column-count", "column-fill", "break-inside", "break-before", "grid-template-columns", "grid-template-rows", "aspect-ratio", "vertical-align", "object-fit",
  "text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset",
  "color", "font-family", "font-size", "font-weight", "font-style", "font-variant-numeric", "line-height", "letter-spacing", "word-spacing", "text-align", "text-align-last", "text-indent",
  "text-transform", "text-shadow", "white-space", "word-break", "overflow-wrap", "text-wrap", "-webkit-text-fill-color", "-webkit-background-clip",
  "text-emphasis-style", "text-emphasis-color", "text-emphasis-position", "-webkit-text-emphasis-style", "-webkit-text-emphasis-color", "-webkit-text-emphasis-position",
  "-webkit-text-stroke-width", "-webkit-text-stroke-color", "box-decoration-break", "-webkit-box-decoration-break", "writing-mode", "text-orientation", "float"];
const WG_INHERIT = new Set(["writing-mode", "text-orientation", "text-emphasis-position", "-webkit-text-emphasis-position", "-webkit-text-stroke-width", "-webkit-text-stroke-color", "color", "font-family", "font-size", "font-weight", "font-style", "font-variant-numeric", "line-height", "letter-spacing", "word-spacing",
  "text-align", "text-align-last", "text-indent", "text-transform", "text-shadow", "white-space", "word-break", "overflow-wrap", "text-wrap", "visibility", "-webkit-text-fill-color"]);
const wgDefaults = {};
function wgDefault(tag, host) {
  if (wgDefaults[tag]) return wgDefaults[tag];
  const doc = host.contentDocument;
  const el = doc.createElement(tag);
  doc.body.appendChild(el);
  const cs = host.contentWindow.getComputedStyle(el), d = {};
  WG_PROPS.forEach(p => { d[p] = cs.getPropertyValue(p); });
  el.remove();
  return (wgDefaults[tag] = d);
}
function wgClone(el, parentCS, host, isRoot) {
  if (el.nodeType === 3) return document.createTextNode(el.data);
  if (el.nodeType !== 1) return null;
  if (el.namespaceURI === "http://www.w3.org/2000/svg") {
    const c = el.cloneNode(true);
    [c].concat(Array.from(c.querySelectorAll("*"))).forEach(n => { n.removeAttribute("class"); });
    return c;
  }
  const cs = getComputedStyle(el);
  if (cs.display === "none") return null;
  const tag = el.tagName.toLowerCase() === "button" ? "div" : el.tagName.toLowerCase();
  const out = document.createElement(tag);
  const def = wgDefault(tag, host);
  const inline = cs.display === "inline";
  const parts = [];
  const noBorder = (side) => cs.getPropertyValue("border-" + side + "-style") === "none" || cs.getPropertyValue("border-" + side + "-width") === "0px";
  WG_PROPS.forEach(p => {
    const v = cs.getPropertyValue(p);
    if (!v) return;
    if (inline && (p === "width" || p === "height")) return;
    const bm = p.match(/^border-(top|right|bottom|left)-(color|style|width)$/);
    if (bm && noBorder(bm[1])) return;
    if (p === "transform-origin" && cs.transform === "none") return;
    if (/^text-decoration-(color|style|thickness)$/.test(p) && cs.textDecorationLine === "none") return;
    if (p === "-webkit-text-fill-color" && v === cs.color) return;
    if (WG_INHERIT.has(p)) { if (!isRoot && parentCS && parentCS.getPropertyValue(p) === v) return; }
    else if (v === def[p]) return;
    parts.push(p + ":" + v.replace(/"/g, "'"));
  });
  out.setAttribute("style", parts.join(";"));
  if (tag === "img" && el.getAttribute("src")) out.setAttribute("src", el.getAttribute("src"));
  el.childNodes.forEach(ch => { const c = wgClone(ch, cs, host, false); if (c) out.appendChild(c); });
  const pb = wgPseudo(el, "::before", cs, host), pa = wgPseudo(el, "::after", cs, host);
  if (pb) out.insertBefore(pb, out.firstChild);
  if (pa) out.appendChild(pa);
  return out;
}
function wgPseudo(el, which, parentCS, host) {
  const ps = getComputedStyle(el, which), ct = ps.content;
  if (!ct || ct === "none" || ct === "normal" || ps.display === "none") return null;
  const inline = ps.display === "inline", out = document.createElement("span"), def = wgDefault("span", host), parts = [];
  WG_PROPS.forEach(p => {
    const v = ps.getPropertyValue(p);
    if (!v || (inline && (p === "width" || p === "height"))) return;
    if (WG_INHERIT.has(p)) { if (parentCS.getPropertyValue(p) === v) return; }
    else if (v === def[p]) return;
    parts.push(p + ":" + v.replace(/"/g, "'"));
  });
  out.setAttribute("style", parts.join(";"));
  out.setAttribute("aria-hidden", "true");
  const m = ct.match(/"(?:[^"\\]|\\.)*"/g);
  if (m) out.textContent = m.map(x => x.slice(1, -1).replace(/\\([0-9a-f]{1,6}) ?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/\\(.)/g, "$1")).join("");
  return out;
}
const sheetW = () => { const [w, h] = dims(), pb = panelBox(w, h, S.ratio === "auto"); return w + (pb && pb.across ? pb.px : 0); };
async function widgetHTML() {
  if (!app.querySelector(".card")) return "";
  const keep = S.page, n = S.pages || 1, parts = [];
  try {
    for (let p = 0; p < n; p++) { S.page = p; const h = await widgetPage(); if (h) parts.push(h); }
  } finally { S.page = keep; }
  if (!parts.length) return "";
  const fams = Array.from(new Set([S.famKey].concat(S.blocks.map(b => b.fam).filter(Boolean))));
  const links = fams.map(f => { try { return '<link rel="stylesheet" href="' + fontURL(fontOf(f)) + '">'; } catch (e) { return ""; } }).join("");
  return "<!-- 발췌기 · excerpt.syzzy.xyz -->\n" + links + "\n" +
    '<div style="max-width:100%;overflow-x:auto">' + parts.join('<div style="height:16px"></div>') + "</div>";
}
async function widgetPage() {
  const was = S.preview;
  S.preview = true;
  const html = cardHTML();
  S.preview = was;
  const holder = document.createElement("div");
  holder.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;pointer-events:none";
  holder.innerHTML = await inlineBlobs(html);
  document.body.appendChild(holder);
  inkWrap(holder);
  const host = document.createElement("iframe");
  host.style.cssText = "position:fixed;left:-10000px;top:0;width:10px;height:10px;border:0";
  document.body.appendChild(host);
  try {
    const scale = holder.querySelector(".card-scale");
    if (scale) scale.style.transform = "none";
    const root = holder.querySelector(".card-sheet") || holder.querySelector(".card");
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const out = wgClone(root, null, host, true);
    const k = S.htmlK || 1.5;
    out.style.zoom = k;
    out.style.boxShadow = "none";
    out.style.maxWidth = "none";
    return out.outerHTML;
  } finally { holder.remove(); host.remove(); }
}
function copyWidget() {
  set({ sheet: false });
  const made = widgetHTML();
  const wk = { widget_scale: String(S.htmlK || 1.5) };
  const done = () => { track("copy", Object.assign(cardLook(), { content_type: "html" }, wk)); expResult("HTML 복사", "success", wk); flash("HTML을 복사했어요 · 코드 칸이나 편집기에 붙여 넣으세요"); };
  const fail = () => { expResult("HTML 복사", "fail", wk); flash("이 브라우저에서는 복사가 안 돼요 · ‘HTML 파일로 저장’을 써 주세요"); };
  if (navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== "undefined") {
    const blob = (type) => made.then(h => new Blob([h], { type: type }));
    try { navigator.clipboard.write([new ClipboardItem({ "text/plain": blob("text/plain"), "text/html": blob("text/html") })]).then(done, () => made.then(h => navigator.clipboard.writeText(h)).then(done, fail)); return; }
    catch (e) {}
  }
  if (navigator.clipboard && navigator.clipboard.writeText) made.then(h => navigator.clipboard.writeText(h)).then(done, fail);
  else fail();
}
async function saveWidget() {
  set({ sheet: false });
  const h = await widgetHTML();
  const wk = { widget_scale: String(S.htmlK || 1.5) };
  if (!h) { expResult("HTML 파일 저장", "fail", wk); return; }
  const page = '<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>발췌</title></head>\n' +
    '<body style="margin:0;padding:24px;background:#eeeeec;display:flex;justify-content:center">\n' + h + "\n</body></html>";
  download(new Blob([page], { type: "text/html" }), "발췌_" + fileStamp() + ".html");
  track("download", Object.assign(cardLook(), { method: "html", count: 1 }, wk));
  expResult("HTML 파일 저장", "success", wk);
  flash("HTML 파일로 저장했어요");
}
function copyImg() {
  set({ sheet: false });
  if (!navigator.clipboard || !navigator.clipboard.write || typeof ClipboardItem === "undefined") {
    expResult("이미지 복사", "unsupported");
    flash("이 브라우저는 이미지 복사를 지원하지 않아요 · '사진에 저장'을 써 주세요");
    return;
  }
  flash("이미지를 만드는 중…");
  const made = cardBlob().then(bl => { if (!bl) throw new Error("no card"); return bl; });
  made.catch(() => {});
  const done = () => { track("copy", Object.assign(cardLook(), { content_type: "image" })); expResult("이미지 복사", "success"); flash("이미지를 클립보드에 복사했어요 · 붙여넣기(" + (IS_MAC ? "⌘" : "Ctrl+") + "V) 하세요"); };
  const fail = () => { expResult("이미지 복사", "fail", { focused: document.hasFocus() ? 1 : 0 }); flash(document.hasFocus() ? "복사하지 못했어요 · '사진에 저장'을 써 주세요" : "창을 한 번 누른 뒤 다시 복사해 주세요"); };
  let first;
  try { first = navigator.clipboard.write([new ClipboardItem({ "image/png": made })]); }
  catch (e) { first = Promise.reject(e); }
  first.then(done, () => made.then(bl => navigator.clipboard.write([new ClipboardItem({ "image/png": bl })])).then(done, fail));
}
async function shareImg() {
  set({ sheet: false });
  try {
    if (S.pages > 1 && canShareFiles()) {
      readyFiles = await allPageFiles(fileStamp());
      readyFeat = "공유";
      expResult("공유", "ready", { method: "share_sheet" });
      set({ cdlg: { title: readyFiles.length + "장을 만들었어요", note: "눌러서 공유 창을 엽니다",
        ok: "공유하기", no: "닫기", act: "sharefiles", safe: true } });
      return;
    }
    const blob = await cardBlob();
    const file = new File([blob], "발췌.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file] });
      track("share", Object.assign(cardLook(), { method: "share_sheet", content_type: "image" }));
      expResult("공유", "success");
      return;
    }
    throw new Error("no share");
  } catch (e) {
    if (e && e.name === "AbortError") { expResult("공유", "cancel"); return; }
    expResult("공유", e && e.message === "no share" ? "unsupported" : "fail");
    flash("공유를 지원하지 않습니다");
  }
}
const HTML_KEEP = new Set(["div", "span", "p", "br", "b", "strong", "i", "em", "u", "s", "del", "ins", "small", "sub", "sup", "mark", "code", "pre", "kbd",
  "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "dl", "dt", "dd", "blockquote", "q", "cite", "hr", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "td", "th", "caption", "colgroup", "col", "img", "ruby", "rt", "rp", "abbr", "time", "center", "font", "a",
  "section", "article", "header", "footer", "aside", "nav", "main", "details", "summary"]);
const HTML_DROP = new Set(["script", "style", "link", "meta", "base", "title", "head", "iframe", "frame", "frameset", "object", "embed", "applet", "form", "input",
  "button", "textarea", "select", "option", "template", "noscript", "audio", "video", "source", "track", "canvas", "svg", "math", "portal", "dialog", "slot"]);
const HTML_ATTR = new Set(["style", "colspan", "rowspan", "alt", "title", "width", "height", "align", "valign", "color", "size", "face", "dir", "lang", "open"]);
const HTML_MAX = 20000;
function cleanStyle(st) {
  const bad = [];
  for (let i = 0; i < st.length; i++) {
    const p = st[i], v = st.getPropertyValue(p);
    if (/^(behavior|-moz-binding)$/i.test(p) || /expression\s*\(|javascript:/i.test(v)) bad.push(p);
    else if ((v.match(/url\(/gi) || []).length !== (v.match(/url\(\s*["']?data:image\/(png|jpe?g|gif|webp);/gi) || []).length) bad.push(p);
  }
  bad.forEach(p => st.removeProperty(p));
  if (/^(fixed|sticky)$/i.test(st.position)) st.position = "absolute";
  return st.cssText;
}
function cleanHTML(src) {
  src = String(src || "").slice(0, HTML_MAX);
  if (!src.trim()) return "";
  const doc = new DOMParser().parseFromString("<body>" + src + "</body>", "text/html");
  const outDoc = document.implementation.createHTMLDocument("");
  const walk = (n, into) => {
    n.childNodes.forEach(ch => {
      if (ch.nodeType === 3) { into.appendChild(outDoc.createTextNode(ch.data)); return; }
      if (ch.nodeType !== 1) return;
      const tag = ch.localName;
      if (HTML_DROP.has(tag) || ch.namespaceURI !== "http://www.w3.org/1999/xhtml") return;
      if (!HTML_KEEP.has(tag)) { walk(ch, into); return; }
      const el = outDoc.createElement(tag === "a" ? "span" : tag);
      Array.from(ch.attributes).forEach(a => {
        const nm = a.name.toLowerCase();
        if (nm === "style") { const cs = cleanStyle(ch.style); if (cs) el.setAttribute("style", cs); return; }
        if (nm === "src" && tag === "img") { if (/^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+\/=\s]+$/i.test(a.value)) el.setAttribute("src", a.value); return; }
        if (HTML_ATTR.has(nm) && !/javascript:|expression\s*\(/i.test(a.value)) el.setAttribute(nm, a.value);
      });
      if (tag === "img" && !el.hasAttribute("src")) return;
      walk(ch, el);
      into.appendChild(el);
    });
  };
  const box = outDoc.createElement("div");
  walk(doc.body, box);
  return box.innerHTML;
}
function textOf(h) {
  const d = new DOMParser().parseFromString(String(h || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/(div|p)>/gi, "\n"), "text/html").body;
  return d.textContent.replace(/\u00a0/g, " ").replace(/\n+$/, "").trim();
}
function excerptParas() {
  return S.blocks.map(b => {
    const kind = (TYPES[b.type] || {}).kind;
    if (kind === "divider") return "---";
    if (kind === "html") return textOf(cleanHTML(b.html));
    const a = textOf(txt[key(b.id, 0)]);
    const b1 = textOf(txt[key(b.id, 1)]);
    if (kind === "dialogue" || kind === "avatar" || kind === "bubble") return a ? (b1 ? b1 + ": " : "") + a : "";
    if (kind === "trans") return (b1 ? b1 + "\n" : "") + a;
    return a;
  }).filter(Boolean);
}
async function copyTxt() {
  set({ sheet: false });
  try { await navigator.clipboard.writeText(excerptParas().join("\n\n")); track("copy", Object.assign(cardLook(), { content_type: "text" })); expResult("문장 텍스트 복사", "success"); flash("문장을 복사했습니다"); }
  catch (e) { expResult("문장 텍스트 복사", "fail"); flash("복사하지 못했습니다"); }
}
async function blogHTML() {
  const keep = S.page, n = S.pages || 1, urls = [];
  try {
    for (let p = 0; p < n; p++) {
      S.page = p;
      const bl = await cardBlob();
      if (!bl) throw new Error("no card");
      urls.push(await new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(bl); }));
    }
  } finally { S.page = keep; }
  const paras = excerptParas(), alt = esc((paras[0] || "발췌").replace(/\s+/g, " ").slice(0, 80));
  return urls.map(u => '<p><img src="' + u + '" alt="' + alt + '" style="max-width:100%;height:auto"></p>').join("") +
    paras.map(t => "<p>" + esc(t).replace(/\n/g, "<br>") + "</p>").join("");
}
function copyBlog() {
  set({ sheet: false });
  if (!navigator.clipboard || !navigator.clipboard.write || typeof ClipboardItem === "undefined") {
    expResult("블로그용 복사", "unsupported");
    flash("이 브라우저는 복사를 지원하지 않아요 · '사진에 저장'과 '문장만 텍스트로 복사'를 써 주세요");
    return;
  }
  flash((S.pages > 1 ? S.pages + "장을" : "이미지를") + " 만드는 중…");
  const made = blogHTML();
  made.catch(() => {});
  const plainTxt = excerptParas().join("\n\n");
  const item = (h) => new ClipboardItem({ "text/html": h, "text/plain": new Blob([plainTxt], { type: "text/plain" }) });
  const done = () => { track("copy", Object.assign(cardLook(), { content_type: "blog" })); expResult("블로그용 복사", "success"); flash("복사했어요 · 블로그 글쓰기 화면에 붙여넣기(" + (IS_MAC ? "⌘" : "Ctrl+") + "V) 하세요"); };
  const fail = () => { expResult("블로그용 복사", "fail", { focused: document.hasFocus() ? 1 : 0 }); flash(document.hasFocus() ? "복사하지 못했어요 · '사진에 저장'을 써 주세요" : "창을 한 번 누른 뒤 다시 복사해 주세요"); };
  let first;
  try { first = navigator.clipboard.write([item(made.then(h => new Blob([h], { type: "text/html" })))]); }
  catch (e) { first = Promise.reject(e); }
  first.then(done, () => made.then(h => navigator.clipboard.write([item(new Blob([h], { type: "text/html" }))])).then(done, fail));
}

function retype(b, t) {
  const from = NAME_SLOT[b.type], to = NAME_SLOT[t], id = b.id;
  if (from != null && to != null && from !== to) {
    const a = txt[key(id, from)], z = txt[key(id, to)];
    txt[key(id, to)] = a || ""; txt[key(id, from)] = z || "";
  }
  const nb = Object.assign({}, b, { type: t });
  if (t === "bubble" && !nb.side) nb.side = "left";
  return nb;
}
let typeJustAt = 0;
function setType(t) {
  const i = idx();
  if (i < 0) return;
  if (pickedIds().length) {
    const ids = pickedIds();
    snap(true);
    set({ blocks: S.blocks.map(b => ids.indexOf(b.id) >= 0 && b.type !== t ? retype(b, t) : b), typeOffer: null, fit: 1 });
    flash("고른 " + ids.length + "개를 " + TYPES[t].n + "(으)로 바꿨어요");
    return;
  }
  const was = S.blocks[i].type;
  if (was === t) return;
  snap(true);
  const blocks = S.blocks.slice();
  blocks[i] = retype(blocks[i], t);
  const n = blocks.filter(x => x.type === was).length;
  typeJustAt = Date.now();
  set({ blocks: blocks, typeOffer: n ? { id: blocks[i].id, from: was, to: t, n: n } : null, typeJust: blocks[i].id });
}
function typeAll() {
  const o = S.typeOffer;
  if (!o) return;
  snap(true);
  set({ blocks: S.blocks.map(b => b.type === o.from ? retype(b, o.to) : b), typeOffer: null, fit: 1 });
  flash((TYPES[o.from] || {}).n + " " + o.n + "개를 " + (TYPES[o.to] || {}).n + "(으)로 바꿨어요");
}
function nextTurn(i, type) {
  const who = NAME_SLOT[type] > 0 ? nextSpeaker(i) : "";
  const src = S.blocks[i] || {};
  const out = { type: type, side: src.side, who: who };
  if (!who) { if (type === "bubble") out.side = src.side === "right" ? "left" : "right"; return out; }
  for (let j = i; j >= 0; j--) {
    const b = S.blocks[j];
    if (speakerOf(b) === who && NAME_SLOT[b.type] > 0) { out.type = b.type; out.side = b.side; return out; }
  }
  if (type === "bubble") out.side = src.side === "right" ? "left" : "right";
  return out;
}
function addBlock() {
  const i = idx(), src = cur() || {};
  const id = "b" + (++seq);
  snap(true);
  const nt = nextTurn(i, src.type || "body");
  const type = nt.type;
  txt[key(id, 0)] = "";
  if (type === "bidialogue") { txt[key(id, 1)] = ""; txt[key(id, 2)] = ""; }
  if (nt.who) txt[key(id, NAME_SLOT[type])] = nt.who;
  const blocks = S.blocks.slice();
  const nb = { id: id, type: type };
  if (type === "bubble") nb.side = nt.side || "left";
  blocks.splice(i + 1, 0, nb);
  set({ blocks: blocks, active: id });
  focusBlock(id);
}
function focusBlock(id) {
  const n = els[id], f = n && n.querySelector('[contenteditable="true"][data-k="0"]');
  if (!f) return;
  f.focus();
  const sel = window.getSelection();
  if (sel) { const r = document.createRange(); r.selectNodeContents(f); r.collapse(false); sel.removeAllRanges(); sel.addRange(r); }
}
function bsheetHTML() {
  if (!S.bsheet) return "";
  const b = cur();
  if (!b) return "";
  const t = TYPES[b.type] || {};
  const row = (act, icon, label, meta, extra) => '<div class="sheet-row' + (extra || "") + '" data-act="' + act + '"><span class="with-icon">' + ic(icon, 19) + label + "</span>" +
    (meta ? '<span class="meta">' + meta + "</span>" : "") + "</div>";
  return '<div class="sheet" data-act="bsheetclose"><div class="sheet-card" data-stop><h2>' + esc(t.n || "블록") + ' <span class="mono">' + (idx() + 1) + " / " + S.blocks.length + "</span></h2>" +
    row("bq-add", "next", "아래에 새 블록", NAME_SLOT[b.type] > 0 ? "다음 사람 차례로" : "") +
    (isMsg(b) ? row("bq-side", "swap", "쪽 바꾸기", sideNow(b) === "right" ? "지금 오른쪽" : "지금 왼쪽") : "") +
    (isMsg(b) ? row("bq-pics", "copy", "사진 붙이기", picsOf(b).length ? picsOf(b).length + "장" : "") : "") +
    row("bq-multi", "check", "여러 개 고르기", "골라서 한 번에 바꾸기") +
    row("bq-up", "up", "위로", "") + row("bq-down", "down", "아래로", "") +
    row("bq-dup", "copy", "복제", "") +
    (S.blocks.length > 1 ? row("bq-del", "trash", "지우기", "", " danger") : "") +
    '<button class="sheet-close text" data-act="bsheetclose">닫기</button></div></div>';
}
const SB_COARSE = window.matchMedia ? matchMedia("(pointer: coarse)") : { matches: false };
let sbEl = null, sbT = 0, sbOpen = "";
function sbRange() {
  if (S.screen !== "edit" || S.preview || cpDrag || npadDrag) return null;
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) return null;
  const r = sel.getRangeAt(0);
  if (!inCard(r.commonAncestorContainer) || !r.toString().trim()) return null;
  return r;
}
function sbHide() { if (sbEl) { sbEl.remove(); sbEl = null; } sbOpen = ""; }
function sbHTML() {
  const bt = (act, inner, title, cls) => '<button type="button" class="sb-b' + (cls || "") + '" data-sb="' + act + '" title="' + title + '" aria-label="' + title + '">' + inner + "</button>";
  const tc = normHex((S.custom || {}).text) || "#111111";
  const sw = (k) => '<div class="sb-sw">' +
    '<button type="button" class="sb-c none" data-sb="none" data-k="' + k + '" title="' + (k === "text" ? "글자색 빼기" : "형광펜 빼기") + '"></button>' +
    PALETTES[k].map(h => '<button type="button" class="sb-c" data-sb="c" data-k="' + k + '" data-hex="' + h + '" style="background:' + h + '" title="' + h + '"></button>').join("") + "</div>";
  return '<div class="sb-row">' +
    bt("bold", "<b>B</b>", "굵게") + bt("italic", "<i>I</i>", "기울임") + bt("underline", "<u>U</u>", "밑줄") + (SB_COARSE.matches ? "" : bt("strike", "<s>S</s>", "취소선")) +
    '<i class="sb-sep"></i>' +
    bt("smaller", '<span class="sb-fs s">가</span>', "작게") + bt("bigger", '<span class="sb-fs l">가</span>', "크게") +
    '<i class="sb-sep"></i>' +
    bt("text", '<span class="sb-tc" style="--c:' + tc + '">가</span>', "글자색", sbOpen === "text" ? " on" : "") +
    bt("hilite", '<span class="sb-hl">가</span>', "형광펜", sbOpen === "hilite" ? " on" : "") +
    '<i class="sb-sep"></i>' +
    bt("clearfmt", ic("eraser", 16), "서식 지우기") +
    "</div>" + (sbOpen ? sw(sbOpen) : "");
}
function sbPlace() {
  const r = sbRange();
  if (!r) { sbHide(); return; }
  if (!sbEl) {
    sbEl = document.createElement("div");
    sbEl.className = "selbar";
    sbEl.setAttribute("role", "toolbar");
    sbEl.setAttribute("aria-label", "고른 글자 서식");
    sbEl.addEventListener("pointerdown", e => e.preventDefault());
    sbEl.addEventListener("mousedown", e => e.preventDefault());
    sbEl.addEventListener("click", sbClick);
    document.body.appendChild(sbEl);
  }
  sbEl.innerHTML = sbHTML();
  const rc = r.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight;
  const w = sbEl.offsetWidth, h = sbEl.offsetHeight;
  let top = SB_COARSE.matches ? rc.bottom + 12 : rc.top - h - 10;
  if (top < 8) top = rc.bottom + 10;
  if (top + h > H - 8) top = Math.max(8, rc.top - h - 10);
  sbEl.style.left = Math.round(Math.max(8, Math.min(rc.left + rc.width / 2 - w / 2, W - w - 8))) + "px";
  sbEl.style.top = Math.round(top) + "px";
}
function sbClick(e) {
  const b = e.target.closest("[data-sb]");
  if (!b) return;
  const a = b.dataset.sb;
  if (S.famScope === "all") S.famScope = "auto";
  if (a === "text" || a === "hilite") { sbOpen = sbOpen === a ? "" : a; sbPlace(); return; }
  if (a === "c" || a === "none") {
    S.target = b.dataset.k;
    if (a === "none") unpaint();
    else if (paint(b.dataset.hex, true, true)) { pushRecent(b.dataset.hex); render(); }
    else flash(NOSEL);
    setTimeout(sbPlace, 30);
    return;
  }
  fmtCmd(a);
  setTimeout(sbPlace, 30);
}
document.addEventListener("selectionchange", () => {
  clearTimeout(sbT);
  sbT = setTimeout(() => { if (!sbRange()) { sbHide(); return; } sbPlace(); }, 140);
});
window.addEventListener("resize", () => { if (sbEl) sbPlace(); });
app.addEventListener("scroll", () => { if (sbEl) sbPlace(); }, true);
document.addEventListener("keydown", e => { if (e.key === "Escape" && sbEl) sbHide(); });
const FMT_TAGS = ["SPAN", "FONT", "B", "STRONG", "I", "EM", "U", "S", "STRIKE", "MARK", "SUB", "SUP", "SMALL", "BIG"];
function stripFmtIn(host) {
  let n = 0;
  [...host.querySelectorAll(FMT_TAGS.join(","))].reverse().forEach(o => {
    if (o.className || [...o.attributes].some(a => a.name.startsWith("data-"))) return;
    while (o.firstChild) o.parentNode.insertBefore(o.firstChild, o);
    o.remove(); n++;
  });
  return n;
}
function stripColorsIn(host) { return stripPaintIn(host, false) + stripPaintIn(host, true); }
const hostsOf = (ids) => { const out = []; ids.forEach(id => app.querySelectorAll('.card [contenteditable][data-id="' + id + '"]').forEach(h => out.push(h))); return out; };
function colorsOff(ids) {
  snap(true);
  let n = 0;
  S.blocks.forEach(b => { if (ids.indexOf(b.id) < 0) return; ["tc", "tcA", "bub", "bubA"].forEach(k => { if (b[k] != null) { delete b[k]; n++; } }); });
  hostsOf(ids).forEach(h => { const k = stripColorsIn(h); if (k) { n += k; saveHost(h); } });
  S.blocks = S.blocks.slice();
  measure(); render();
  flash(n ? "글자색·형광펜을 모두 뺐어요" : "칠한 색이 없어요");
}
function fmtReset(ids) {
  snap(true);
  let n = 0;
  S.blocks = S.blocks.map(b => {
    if (ids.indexOf(b.id) < 0) return b;
    if (Object.keys(blockStyle(b)).length) n++;
    return withStyle(b, {});
  });
  hostsOf(ids).forEach(h => { const k = stripFmtIn(h); if (k) { n += k; saveHost(h); } });
  measure(); render();
  flash(n ? (ids.length > 1 ? "블록 " + ids.length + "개의 " : "") + "서식을 처음대로 되돌렸어요" : "바꾼 서식이 없어요", n ? { act: "undo", label: "되돌리기" } : null);
}
let bmenuEl = null, bmenuAt = 0;
function bmenuClose() { if (bmenuEl) { bmenuEl.remove(); bmenuEl = null; } }
function bmenuOpen(id, x, y, viaBtn) {
  bmenuClose();
  const sel = window.getSelection();
  const hasSel = !!(sel && sel.rangeCount && !sel.isCollapsed && inCard(sel.anchorNode));
  if (hasSel) stashRange();
  const pk = pickedIds(), multi = pk.length > 1 && pk.indexOf(id) >= 0;
  if (!multi && S.active !== id) { S.active = id; const bl = S.blocks.find(b => b.id === id); if (bl) S.cat = catOf(bl.type); render(); }
  const b = S.blocks.find(z => z.id === id);
  if (!b) return;
  const i = S.blocks.indexOf(b);
  const it = (m, icon, label, meta, cls) => '<button type="button" class="bm-i' + (cls || "") + '" data-m="' + m + '" role="menuitem">' + ic(icon, 16) + "<span>" + label + "</span>" + (meta ? "<em>" + meta + "</em>" : "") + "</button>";
  const hr = '<i class="bm-hr" role="separator"></i>';
  const el = document.createElement("div");
  el.className = "bmenu";
  el.setAttribute("role", "menu");
  el.innerHTML = '<div class="bm-h">' + (multi ? "고른 블록 " + pk.length + "개" : esc((TYPES[b.type] || {}).n || "블록") + " · " + (i + 1) + "/" + S.blocks.length) +
      (viaBtn && SB_COARSE.matches ? '<span class="bm-tip">블록을 두 번 눌러도 열려요</span>' : "") + "</div>" +
    (hasSel ? it("selfmt", "eraser", "고른 글자 서식 지우기", "") + hr : "") +
    (multi ? "" : it("dup", "copy", "복제", "") + it("copy", "clip", "글 복사", "") + it("add", "plus", "아래에 새 블록", NAME_SLOT[b.type] > 0 ? "다음 사람 차례로" : "") +
      (isMsg(b) ? it("side", "swap", "쪽 바꾸기", sideNow(b) === "right" ? "지금 오른쪽" : "지금 왼쪽") + it("pics", "copy", "사진 붙이기", picsOf(b).length ? picsOf(b).length + "장" : "") : "") + hr +
      it("multi", "check", "여러 개 고르기", "골라서 한 번에") +
      (i > 0 ? it("up", "up", "위로", "") : "") + (i < S.blocks.length - 1 ? it("down", "down", "아래로", "") : "") + hr) +
    it("colors", "tcolor", "색 모두 빼기", "글자색·형광펜") +
    it("fmt", "reset", "서식 초기화", "글꼴·정렬·색·굵게…") +
    (S.blocks.length > 1 ? hr + it("del", "trash", multi ? pk.length + "개 지우기" : "지우기", "", " danger") : "");
  document.body.appendChild(el);
  bmenuEl = el;
  bmenuAt = Date.now();
  const r = el.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight;
  el.style.left = Math.max(8, Math.min(x, W - r.width - 8)) + "px";
  el.style.top = Math.max(8, y + r.height + 8 > H ? y - r.height : y) + "px";
  el.addEventListener("pointerdown", e => e.preventDefault());
  el.addEventListener("click", e => {
    const bt = e.target.closest("[data-m]");
    if (!bt) return;
    const m = bt.dataset.m, ids = multi ? pk.slice() : [id];
    bmenuClose();
    if (m === "selfmt") { if (useSelForFormat()) { exec("removeFormat"); render(); flash("고른 글자 서식을 지웠어요"); } else flash(NOSEL_FMT); }
    else if (m === "colors") colorsOff(ids);
    else if (m === "fmt") fmtReset(ids);
    else if (m === "dup") dupBlock();
    else if (m === "copy") {
      const t = [0, 1, 2, 3, 4].map(k => toPlain(txt[key(id, k)] || "")).filter(Boolean).join("\n");
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => flash("글을 복사했어요"), () => flash("복사하지 못했어요 · 글자를 골라 Ctrl+C 해 주세요"));
    }
    else if (m === "add") addBlock();
    else if (m === "side") setSide(sideNow(cur()) === "right" ? "left" : "right");
    else if (m === "pics") openMultiPicker(id);
    else if (m === "multi") { S.tab = "블록"; S.fold = false; set({ pickOn: true, picks: [id] }); flash("블록을 누르면 담기고, 다시 누르면 빠져요"); }
    else if (m === "up") move(-1);
    else if (m === "down") move(1);
    else if (m === "del") delBlock();
  });
  const first = el.querySelector("[data-m]");
  if (first && !hasSel) first.focus({ preventScroll: true });
}
document.addEventListener("pointerdown", e => { if (bmenuEl && !bmenuEl.contains(e.target)) bmenuClose(); }, true);
document.addEventListener("keydown", e => {
  if (!bmenuEl) return;
  if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); bmenuClose(); return; }
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const bs = [...bmenuEl.querySelectorAll("[data-m]")], k = bs.indexOf(document.activeElement);
    e.preventDefault(); bs[(k + (e.key === "ArrowDown" ? 1 : bs.length - 1)) % bs.length].focus();
  }
}, true);
window.addEventListener("resize", bmenuClose);
app.addEventListener("scroll", () => { if (Date.now() - bmenuAt > 400) bmenuClose(); }, true);
const bmenuTarget = (e) => {
  if (S.preview || S.screen !== "edit" || !e.target.closest) return null;
  if (e.target.closest('[data-imgb], .card-side, [data-act="quote"]')) return null;
  const blk = e.target.closest(".card [data-block]");
  return blk ? blk.dataset.block : null;
};
app.addEventListener("contextmenu", (e) => {
  const id = bmenuTarget(e);
  if (!id) return;
  if (e.ctrlKey && e.button === 0) { e.preventDefault(); return; }
  e.preventDefault();
  bmenuOpen(id, e.clientX, e.clientY);
});
app.addEventListener("dblclick", (e) => {
  const id = bmenuTarget(e);
  if (!id) return;
  setTimeout(() => bmenuOpen(id, e.clientX + 4, e.clientY + 10), 0);
});
function gotoBlock(d) {
  const i = idx(), j = Math.max(0, Math.min(S.blocks.length - 1, i + d));
  if (j === i) return;
  const typing = kbFold;
  const id = S.blocks[j].id;
  if (!typing && document.activeElement && document.activeElement.isContentEditable) document.activeElement.blur();
  set(Object.assign({ active: id, cat: catOf(S.blocks[j].type) }, scopeOff()));
  if (typing) focusBlock(id);
}
function dupBlock() {
  const i = idx(), src = cur();
  if (!src) return;
  snap(true);
  const id = "b" + (++seq);
  [0, 1, 2].forEach(k => { txt[key(id, k)] = txt[key(src.id, k)] || ""; });
  const blocks = S.blocks.slice();
  blocks.splice(i + 1, 0, Object.assign({}, src, { id: id }));
  delete blocks[i + 1].brk;
  set({ blocks: blocks, active: id });
}
function delBlock() {
  const i = idx();
  const pk = pickedIds();
  if (pk.length) {
    if (pk.length >= S.blocks.length) { flash("블록을 모두 지울 수는 없어요 · 하나는 남겨 주세요"); return; }
    snap(true);
    const blocks = S.blocks.filter(b => pk.indexOf(b.id) < 0);
    const firstI = S.blocks.findIndex(b => pk.indexOf(b.id) >= 0);
    const nx = blocks[Math.min(firstI, blocks.length - 1)];
    set({ blocks: blocks, active: nx.id, picks: [], pickOn: false, fit: 1 });
    flash("블록 " + pk.length + "개를 지웠어요", { act: "undo", label: "되돌리기" });
    return;
  }
  if (i < 0 || S.blocks.length <= 1) return;
  snap(true);
  const gone = S.blocks[i].id;
  const blocks = S.blocks.slice();
  blocks.splice(i, 1);
  if (S.blocks[i].brk && blocks[i]) blocks[i] = Object.assign({}, blocks[i], { brk: 1 });
  const nx = blocks[Math.min(i, blocks.length - 1)];
  set({ blocks: blocks, active: nx ? nx.id : null, picks: (S.picks || []).filter(id => id !== gone) });
  flash("블록을 지웠어요", { act: "undo", label: "되돌리기" });
}
function move(d) {
  const i = idx(), j = i + d;
  if (i < 0 || j < 0 || j >= S.blocks.length) return;
  snap(true);
  const blocks = S.blocks.slice();
  const t = blocks[i]; blocks[i] = blocks[j]; blocks[j] = t;
  set({ blocks: blocks });
}
function pickedIds() {
  return (S.picks || []).filter(id => S.blocks.some(b => b.id === id));
}
const BLOCK_STYLE_KEYS = ["align", "fam", "fw", "tc", "tcA", "ls", "lh", "bub", "bubA", "nobar", "dv"];
function blockStyle(b) {
  const v = {};
  BLOCK_STYLE_KEYS.forEach(k => { if (b[k] != null) v[k] = b[k]; });
  return v;
}
function withStyle(b, v) {
  const nb = Object.assign({}, b);
  BLOCK_STYLE_KEYS.forEach(k => { delete nb[k]; });
  return Object.assign(nb, v);
}
const sameStyle = (a, z) => JSON.stringify(blockStyle(a)) === JSON.stringify(blockStyle(z));
function sameTypeOthers(b) {
  return b ? S.blocks.filter(x => x.id !== b.id && x.type === b.type && !sameStyle(x, b)) : [];
}
function brushStart() {
  const b = cur();
  if (!b) return;
  set({ brush: { from: b.id, n: TYPES[b.type].n, v: blockStyle(b) } });
  flash("다른 블록을 누르면 이 모양이 붙어요");
}
function brushApply(id) {
  const br = S.brush, b = S.blocks.find(x => x.id === id);
  if (!br || !b || id === br.from) return;
  snap(true);
  set({ blocks: S.blocks.map(x => x.id === id ? withStyle(x, br.v) : x), active: id, cat: catOf(b.type) });
}
function syncSameType() {
  const b = cur(), others = sameTypeOthers(b);
  if (!others.length) return;
  snap(true);
  const v = blockStyle(b), ids = others.map(x => x.id);
  set({ blocks: S.blocks.map(x => ids.indexOf(x.id) >= 0 ? withStyle(x, v) : x) });
  flash(TYPES[b.type].n + " " + ids.length + "개를 같은 모양으로 맞췄어요");
}
function multiBarHTML(b) {
  const np = pickedIds().length;
  return '<div class="multibar">' +
    '<button class="btn grow' + (S.pickOn ? " on" : "") + '" data-act="pickmode" data-hold title="PC: Shift(또는 Ctrl·⌘) 누른 채 블록을 눌러도 여러 개 골라져요">' + ic("check", 14) +
      (S.pickOn ? " 고르는 중 · 끝내기" : np ? " " + np + "개 고름 · 더 고르기" : " 여러 개 고르기") + "</button>" +
    (b ? '<button class="btn" data-act="picksame" data-hold title="같은 종류 블록을 모두 담기">같은 ' + esc((TYPES[b.type] || {}).n || "") + "</button>" : "") +
    (np < S.blocks.length ? '<button class="btn" data-act="pickall" data-hold>전부</button>' : "") +
    (np ? '<button class="btn" data-act="pickclear" data-hold>해제</button>' : "") +
    "</div>";
}
const tgtIds = () => pickedIds().length ? pickedIds() : (S.active ? [S.active] : []);
let picksDropped = false;
function modPick(id) {
  const picks = pickedIds();
  if (!picks.length && S.active && S.active !== id) picks.push(S.active);
  const i = picks.indexOf(id);
  if (i >= 0) picks.splice(i, 1); else picks.push(id);
  const a = document.activeElement;
  if (a && a.isContentEditable) a.blur();
  let act = i >= 0 ? (S.active === id || picks.indexOf(S.active) < 0 ? picks[picks.length - 1] || S.active : S.active) : id;
  const nextPicks = picks.length > 1 ? picks : [];
  if (picks.length === 1) act = picks[0];
  const bl = S.blocks.find(x => x.id === act);
  set({ picks: nextPicks, active: act, cat: bl ? catOf(bl.type) : S.cat });
  if (picks.length === 2 && i < 0) flash("블록 2개를 골랐어요 · Shift 누른 채 더 누르면 계속 담겨요 · Esc 로 풀기");
}
function togglePick(id) {
  const picks = pickedIds();
  const i = picks.indexOf(id);
  if (i >= 0) picks.splice(i, 1);
  else picks.push(id);
  const act = i < 0 ? id : (S.active === id ? (picks[picks.length - 1] || S.active) : S.active);
  const bl = S.blocks.find(x => x.id === act);
  set({ picks: picks, active: act, cat: bl ? catOf(bl.type) : S.cat });
}

function textSelRange() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount && !sel.isCollapsed && inCard(sel.anchorNode)) return sel.getRangeAt(0);
  if (stash && !stash.collapsed && stash.startContainer.isConnected && inCard(stash.startContainer)) return stash;
  return null;
}
const scopeOff = () => S.famScope === "all" ? { famScope: "auto" } : {};
function curScope() {
  if (S.famScope === "all") return "all";
  if (pickedIds().length) return "block";
  const r = textSelRange();
  return r && blocksTouchedBy(r).length <= 1 ? "word" : "block";
}
let caretFam = null, lastShownFam = "";
function famAtNode(n) {
  let e = n && n.nodeType === 3 ? n.parentElement : n;
  const host = e && e.closest ? e.closest(".card [contenteditable][data-id]") : null;
  if (!host) return null;
  const b = S.blocks.find(x => x.id === host.dataset.id);
  for (; e && e !== host; e = e.parentElement) {
    const ff = e.style && e.style.fontFamily;
    const f = ff && FONT_BY_FAMILY[ff.split(",")[0].trim().replace(/^['"]|['"]$/g, "")];
    if (f) return { id: host.dataset.id, k: f.k };
  }
  return { id: host.dataset.id, k: (b && b.fam) || S.famKey };
}
function famOfRange(r) {
  const first = famAtNode(r.startContainer);
  if (r.collapsed || !first) return first;
  const ks = new Set();
  const root = r.commonAncestorContainer.nodeType === 3 ? r.commonAncestorContainer.parentElement : r.commonAncestorContainer;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (!n.nodeValue.trim() || !r.intersectsNode(n)) continue;
    const f = famAtNode(n);
    if (f) ks.add(f.k);
    if (ks.size > 1) return { id: first.id, k: "", mixed: true };
  }
  return first;
}
let scopeKey = "", scopeT = 0;
const scopeKeyNow = () => curScope() + ":" + selectedBlockIds().join(",") + ":" + (caretFam ? caretFam.k || "mixed" : "");
function refreshPanel() {
  const pb = app.querySelector(".panel-body");
  if (!pb || cpDrag || pb.contains(document.activeElement)) return;
  const top = pb.scrollTop, xs = rowScrolls(pb);
  pb.innerHTML = panelHTML();
  hydratePreviews();
  pb.scrollTop = top;
  restoreRowScrolls(pb, xs);
  updateChipFades();
  fsPaint();
}
document.addEventListener("selectionchange", () => {
  clearTimeout(scopeT);
  scopeT = setTimeout(() => {
    if (S.screen !== "edit" || S.preview || rendering) return;
    const k = scopeKeyNow();
    if (k === scopeKey) return;
    scopeKey = k;
    refreshPanel();
  }, 160);
});
let holdSnap = false;
let batchFmt = false;
function wholeBlocks(ids, run, toggleCmd) {
  const ae = document.activeElement;
  const back = ae && ae.isContentEditable && inCard(ae) ? caretInfo() : null;
  const slots = [];
  ids.forEach(id => app.querySelectorAll('.card [contenteditable][data-id="' + id + '"]').forEach(h => { if (h.textContent.trim()) slots.push([id, h.dataset.k]); }));
  if (!slots.length) return false;
  const live = (sl) => app.querySelector('.card [contenteditable][data-id="' + sl[0] + '"][data-k="' + sl[1] + '"]');
  snap(true);
  holdSnap = true;
  batchFmt = true;
  const sel = window.getSelection();
  const pick = (h) => {
    const im = h.getAttribute("inputmode");
    h.setAttribute("inputmode", "none");
    h.focus({ preventScroll: true });
    const r = document.createRange();
    r.selectNodeContents(h);
    sel.removeAllRanges();
    sel.addRange(r);
    return () => { if (im == null) h.removeAttribute("inputmode"); else h.setAttribute("inputmode", im); };
  };
  try {
    let todo = slots;
    if (toggleCmd) {
      const on = slots.map(sl => { const h = live(sl); return h ? fmtAllOn(h, toggleCmd) : true; });
      const want = !on.every(Boolean);
      todo = slots.filter((sl, i) => on[i] !== want);
    }
    todo.forEach(sl => {
      const h = live(sl);
      if (!h) return;
      const done = pick(h);
      run(h);
      txt[key(sl[0], sl[1])] = h.innerHTML;
      done();
    });
  } finally {
    holdSnap = false;
    batchFmt = false;
    sel.removeAllRanges();
    stash = null; stashBlocks = [];
    if (back) restoreCaret(back);
    else if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }
  measure();
  return true;
}
function fmtAllOn(host, cmd) {
  const w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  let n, any = false;
  while ((n = w.nextNode())) {
    if (!n.nodeValue.trim()) continue;
    any = true;
    const el = n.parentElement;
    if (cmd === "bold") { if ((parseInt(getComputedStyle(el).fontWeight, 10) || 400) < 600) return false; continue; }
    if (cmd === "italic") { if (getComputedStyle(el).fontStyle !== "italic") return false; continue; }
    const line = cmd === "underline" ? "underline" : "line-through";
    let hit = false;
    for (let e = el; e && e !== host.parentElement; e = e.parentElement) {
      if ((getComputedStyle(e).textDecorationLine || "").indexOf(line) >= 0) { hit = true; break; }
      if (e === host) break;
    }
    if (!hit) return false;
  }
  return any;
}
const scopeIds = () => (curScope() === "all" ? S.blocks.map(b => b.id) : selectedBlockIds());
function selectedBlockIds() {
  const picks = pickedIds();
  if (picks.length) return picks;
  const sel = window.getSelection();
  if (sel && sel.rangeCount && !sel.isCollapsed && inCard(sel.anchorNode)) {
    const live = blocksTouchedBy(sel.getRangeAt(0));
    if (live.length) return live;
  }
  if (stashBlocks.length) return stashBlocks;
  return S.active ? [S.active] : [];
}

function applyFont(k) {
  ensureFont(k);
  const scope = curScope();
  if (scope === "word") {
    if (!useSelForFormat()) { flash(NOSEL_FMT); return; }
    wrapSel({ fontFamily: fontStack(k) });
    render();
    return;
  }
  if (scope === "block") {
    const ids = selectedBlockIds();
    if (!ids.length) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
    snap(true);
    const blocks = S.blocks.map(b => (ids.indexOf(b.id) >= 0 ? Object.assign({}, b, { fam: k }) : b));
    set({ blocks: blocks, fit: 1 });
    if (ids.length > 1) flash(ids.length + "개 블록에 적용했습니다");
    return;
  }
  set({ famKey: k, fontCat: inFontCat(fontOf(k), S.fontCat) ? S.fontCat : fontOf(k).c, fit: 1 });
}

function clearBlockFont() {
  const ids = selectedBlockIds().filter(id => {
    const b = S.blocks.find(x => x.id === id);
    return b && b.fam;
  });
  if (!ids.length) return;
  snap(true);
  const blocks = S.blocks.map(b => {
    if (ids.indexOf(b.id) < 0) return b;
    const c = Object.assign({}, b);
    delete c.fam;
    return c;
  });
  set({ blocks: blocks, fit: 1 });
}

function setAlign(a) {
  const i = idx();
  if (i < 0) return;
  const blocks = S.blocks.slice();
  blocks[i] = Object.assign({}, blocks[i], { align: a });
  if (blocks[i].type === "bubble") blocks[i].side = a === "right" ? "right" : "left";
  set({ blocks: blocks });
}
function setSide(v) {
  const ids = tgtIds();
  if (!ids.length) return;
  snap(true);
  const ch = chatOf(), toAvatar = v === "left" && ch && !ch.flat;
  set({ blocks: S.blocks.map(b => {
    if (ids.indexOf(b.id) < 0 || !isMsg(b)) return b;
    if (b.type === "avatar") return v === "right" ? Object.assign(retype(b, "bubble"), { side: "right" }) : b;
    if (toAvatar && speakerOf(b)) { const nb = retype(b, "avatar"); delete nb.side; return nb; }
    return Object.assign({}, b, { side: v });
  }), fit: 1 });
}
const sideNow = (b) => b && b.type === "bubble" && b.side === "right" ? "right" : "left";
function setDivider(v) {
  const i = idx();
  if (i < 0 || S.blocks[i].type !== "divider" || !DIVIDERS.some(x => x.k === v)) return;
  snap(true);
  const blocks = S.blocks.slice();
  const nb = Object.assign({}, blocks[i]);
  if (v === "line") delete nb.dv; else nb.dv = v;
  blocks[i] = nb;
  set({ blocks: blocks });
}
function pushRecent(hex) {
  const all = Object.assign({ text: [], hilite: [], bubble: [] }, S.recent || {});
  all[S.target] = [hex].concat((all[S.target] || []).filter(c => c !== hex)).slice(0, 8);
  try { localStorage.setItem("excerpt-recent-colors-v2", JSON.stringify(all)); } catch (e) {}
  S.recent = all;
}
function saveCustom() {
  try { localStorage.setItem("excerpt-custom-colors-v1", JSON.stringify(S.custom)); } catch (e) {}
  try { localStorage.setItem("excerpt-custom-alpha-v1", JSON.stringify(S.calpha)); } catch (e) {}
}
function fadeCss(col, a) {
  const h = normHex(col);
  if (h) return withAlpha(h, a);
  const m = String(col).match(/rgba?\(([^)]+)\)/);
  if (!m) return col;
  const v = m[1].split(",").map(x => parseFloat(x));
  return "rgba(" + v[0] + "," + v[1] + "," + v[2] + "," + Math.round((v[3] == null || isNaN(v[3]) ? 1 : v[3]) * a * 100) / 100 + ")";
}
function solidHex(col) {
  const m = String(col || "").match(/rgba?\(([^)]+)\)/);
  if (!m) return normHex(col);
  const v = m[1].split(",").map(x => parseFloat(x));
  if (v.length > 3 && v[3] === 0) return "";
  return rgbHex(v.slice(0, 3));
}
const curAlpha = () => { const a = (S.calpha || {})[S.target]; return a == null ? 1 : a; };
const withAlpha = (hex, a) => (a >= 1 ? hex : rgba(hex, Math.round(a * 100) / 100));

let stash = null, stashBlocks = [];
function inCard(node) {
  const n = node && node.nodeType === 3 ? node.parentElement : node;
  return !!(n && n.closest && n.closest("[contenteditable][data-id]"));
}
function stashRange() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || !inCard(sel.anchorNode)) return;
  const r = sel.getRangeAt(0);
  stash = r.cloneRange();
  caretFam = famOfRange(r);
  stashBlocks = sel.isCollapsed ? [] : blocksTouchedBy(r);
}

function blocksTouchedBy(r) {
  return S.blocks.filter(b => {
    const node = els[b.id];
    try { return node && r.intersectsNode(node); } catch (e) { return false; }
  }).map(b => b.id);
}
function useStash() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount && inCard(sel.anchorNode)) return true;
  if (!stash || !document.body.contains(stash.startContainer)) return false;
  const sc = stash.startContainer;
  const host = (sc.nodeType === 3 ? sc.parentElement : sc).closest("[contenteditable][data-id]");
  if (!host || !app.contains(host)) return false;
  if (S.active !== host.dataset.id) {
    S.active = host.dataset.id;
    const bl = S.blocks.find(x => x.id === S.active);
    if (bl) S.cat = catOf(bl.type);
  }
  host.focus({ preventScroll: true });
  const s2 = window.getSelection();
  s2.removeAllRanges();
  s2.addRange(stash);
  return true;
}
document.addEventListener("selectionchange", stashRange);
app.addEventListener("toggle", (e) => { if (e.target.matches && e.target.matches("details.hint")) S.hintOpen = e.target.open; }, true);
function syncSizeField() {
  const f = app.querySelector('input[data-num="sel"]');
  if (!f || document.activeElement === f) return;
  const v = selSizeHint();
  f.value = v; f.dataset.cur = v;
  const rb = app.querySelector('[data-act="sizedef"]');
  if (rb) { const on = sizeChanged(); rb.disabled = !on; if (on) rb.title = "기본값으로"; else rb.removeAttribute("title"); }
}
document.addEventListener("selectionchange", () => {
  syncSizeField();
});
document.addEventListener("pointerdown", (e) => {
  if (e.target.closest && e.target.closest(".panel")) stashRange();
}, true);

function execSoft(cmd, val) {
  snap();
  try { document.execCommand(cmd, false, val); } catch (e) {}
  syncFromSelection();
}
function cssColor(v) {
  const i = document.createElement("i");
  i.style.color = v;
  document.body.appendChild(i);
  const out = getComputedStyle(i).color;
  i.remove();
  return out;
}
function sameColorEls(host, r, val, hi) {
  const want = cssColor(val), prop = hi ? "backgroundColor" : "color";
  const owner = (el) => { for (let n = el; n && n !== host; n = n.parentElement) { if (hi ? n.style.backgroundColor : (n.style.color || (n.tagName === "FONT" && n.getAttribute("color")))) return n; } return null; };
  const w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  const els = new Set();
  let t, any = false;
  while ((t = w.nextNode())) {
    if (!r.intersectsNode(t) || !t.data.trim()) continue;
    const a = t === r.startContainer ? r.startOffset : 0, b = t === r.endContainer ? r.endOffset : t.data.length;
    if (!t.data.slice(a, b).trim()) continue;
    any = true;
    const o = owner(t.parentElement);
    if (!o || getComputedStyle(o)[prop] !== want) return null;
    els.add(o);
  }
  return any && els.size ? els : null;
}
function stripColorEls(els, hi) {
  els.forEach(o => {
    if (hi) o.style.backgroundColor = ""; else { o.style.color = ""; o.removeAttribute("color"); }
    const bare = [...o.attributes].every(x => x.name === "style" && !x.value.trim());
    if (bare && (o.tagName === "SPAN" || o.tagName === "FONT")) { while (o.firstChild) o.parentNode.insertBefore(o.firstChild, o); o.remove(); }
  });
}
function unpaintIfSame(val, hi) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) return false;
  const host = decoSelHost();
  if (!host) return false;
  const els = sameColorEls(host, sel.getRangeAt(0), val, hi);
  if (!els) return false;
  snap(true);
  stripColorEls(els, hi);
  saveHost(host);
  measure(); render();
  flash(hi ? "형광펜을 뺐어요" : "글자색을 뺐어요");
  return true;
}
function paintText(hex, force, tog) {
  if (!useSelForFormat()) return false;
  const a = curAlpha(), val = withAlpha(hex, a), cmd = S.target === "hilite" ? "hiliteColor" : "foreColor";
  if (force && tog && unpaintIfSame(val, S.target === "hilite")) return true;
  if (a < 1) try { document.execCommand("styleWithCSS", false, true); } catch (e) {}
  try {
    if (force) exec(cmd, val); else execSoft(cmd, val);
  } finally {
    if (a < 1) try { document.execCommand("styleWithCSS", false, false); } catch (e) {}
  }
  stashRange();
  return true;
}
function paintBubble(hex, force) {
  const b = cur();
  if (!b) return false;
  snap(force);
  b.bub = hex;
  const a = curAlpha();
  if (a < 1) b.bubA = a; else delete b.bubA;
  if ((TYPES[b.type] || {}).kind !== "bubble") return true;
  repaintCard();
  return true;
}
function paintIds() {
  return scopeIds();
}
let paintedOnce = false;
function paintBlocks(hex, force, tog) {
  const ids = paintIds();
  if (!ids.length) return false;
  const a = curAlpha();
  const same = (b) => b.tc === hex && (a < 1 ? b.tcA === a : b.tcA == null);
  if (force && tog && S.blocks.filter(b => ids.indexOf(b.id) >= 0).every(same)) { clearBlockColor(); flash("글자색을 뺐어요"); return true; }
  snap(force);
  S.blocks.forEach(b => {
    if (ids.indexOf(b.id) < 0) return;
    b.tc = hex;
    if (a < 1) b.tcA = a; else delete b.tcA;
  });
  repaintCard();
  if (force && S.famScope !== "all" && !pickedIds().length && ids.length === 1 && !paintedOnce) {
    paintedOnce = true;
    flash("블록 전체에 칠했어요 · 일부만 칠하려면 글자를 드래그하세요");
  }
  return true;
}
function clearBlockColor() {
  const ids = paintIds().filter(id => { const b = S.blocks.find(x => x.id === id); return b && (b.tc || b.tcA != null); });
  if (!ids.length) return;
  snap(true);
  set({ blocks: S.blocks.map(b => {
    if (ids.indexOf(b.id) < 0) return b;
    const nb = Object.assign({}, b);
    delete nb.tc; delete nb.tcA;
    return nb;
  }) });
}
function paintHiliteBlocks(hex, force, tog) {
  const a = curAlpha(), val = withAlpha(hex, a);
  if (!force) return true;
  const hosts = [];
  paintIds().forEach(id => app.querySelectorAll('.card [contenteditable][data-id="' + id + '"]').forEach(h => { if (h.textContent.trim()) hosts.push(h); }));
  const hits = hosts.map(h => { const r = document.createRange(); r.selectNodeContents(h); return sameColorEls(h, r, val, true); });
  if (tog && hosts.length && hits.every(Boolean)) {
    snap(true);
    hosts.forEach((h, i) => { stripColorEls(hits[i], true); saveHost(h); });
    measure(); render();
    flash("형광펜을 뺐어요");
    return true;
  }
  return wholeBlocks(paintIds(), () => {
    if (a < 1) try { document.execCommand("styleWithCSS", false, true); } catch (e) {}
    try { document.execCommand("hiliteColor", false, val); } catch (e) {}
    if (a < 1) try { document.execCommand("styleWithCSS", false, false); } catch (e) {}
  });
}
const paint = (hex, force, tog) => {
  if (S.target === "bubble") return paintBubble(hex, force);
  if (curScope() === "word" && force && S.sameAll && eachSame(() => paintText(hex, true, tog))) return true;
  if (curScope() === "word" && paintText(hex, force, tog)) return true;
  return S.target === "text" ? paintBlocks(hex, force, tog) : paintHiliteBlocks(hex, force, tog);
};
const UNPAINT = "#010203";
function stripPaintIn(host, hi, only) {
  const els = [...host.querySelectorAll("span, font, b, i, u, s, em, strong, mark")].filter(n => {
    const v = hi ? n.style.backgroundColor : (n.style.color || (n.tagName === "FONT" && n.getAttribute("color")));
    return v && (!only || v === only || (n.tagName === "FONT" && (n.getAttribute("color") || "").toLowerCase() === UNPAINT));
  });
  stripColorEls(els, hi);
  return els.length;
}
function unpaint() {
  const hi = S.target === "hilite", what = hi ? "형광펜" : "글자색";
  if (S.target === "bubble") {
    const b = cur();
    if (!b) return;
    if (b.bub == null && b.bubA == null) { flash("이미 기본 말풍선 색이에요"); return; }
    snap(true); delete b.bub; delete b.bubA;
    repaintCard(); render(); flash("말풍선 색을 기본으로 돌렸어요");
    return;
  }
  if (curScope() === "word" && useSelForFormat()) {
    const host = decoSelHost();
    if (!host) { flash(NOSEL); return; }
    const before = host.innerHTML;
    snap(true);
    try { document.execCommand("styleWithCSS", false, true); document.execCommand(hi ? "hiliteColor" : "foreColor", false, UNPAINT); } catch (e) {}
    try { document.execCommand("styleWithCSS", false, false); } catch (e) {}
    stripPaintIn(host, hi, cssColor(UNPAINT));
    const b = S.blocks.find(x => x.id === host.dataset.id);
    const same = host.innerHTML === before;
    saveHost(host); measure(); render();
    flash(!same ? "고른 글자의 " + what + "을 뺐어요"
      : !hi && b && b.tc ? "이 블록은 블록 전체에 칠한 색이에요 · 위 ‘적용’을 ‘이 블록’으로 두고 빼 주세요"
      : "고른 글자에 칠한 " + what + "이 없어요");
    return;
  }
  const ids = paintIds();
  if (!ids.length) { flash(NOSEL); return; }
  snap(true);
  let n = 0;
  if (!hi) S.blocks.forEach(b => { if (ids.indexOf(b.id) >= 0 && (b.tc || b.tcA != null)) { delete b.tc; delete b.tcA; n++; } });
  ids.forEach(id => app.querySelectorAll('.card [contenteditable][data-id="' + id + '"]').forEach(h => { const k = stripPaintIn(h, hi); if (k) { n += k; saveHost(h); } }));
  S.blocks = S.blocks.slice();
  measure(); render();
  flash(n ? what + "을 뺐어요" : "칠한 " + what + "이 없어요");
}
const NOSEL = "카드에서 글자를 고른 뒤 색을 눌러 주세요";
const NOSEL_FMT = "카드에서 글자를 고른 뒤 서식을 눌러 주세요";

function useSelForFormat() {
  if (!useStash()) return false;
  const sel = window.getSelection();
  return !!(sel && sel.rangeCount && !sel.isCollapsed);
}

const rgbToHex = (v) => { const m = String(v || "").match(/\d+(\.\d+)?/g); return m && m.length >= 3 ? "#" + m.slice(0, 3).map(x => Math.round(+x).toString(16).padStart(2, "0")).join("") : ""; };
const DECO_SW = ["accent", "#ffd43b", "#ff8fab", "#74c0fc", "#8ce99a", "#111111"];
const decoCol = () => {
  if (normHex(S.decoC)) return normHex(S.decoC);
  const a = normHex(S.accent) || "";
  if (a) { const r = parseInt(a.slice(1, 3), 16), g = parseInt(a.slice(3, 5), 16), b = parseInt(a.slice(5, 7), 16); if (Math.max(r, g, b) - Math.min(r, g, b) > 50) return a; }
  return "#f08c00";
};
const hueShift = (hex, deg) => {
  const h = normHex(hex) || "#e0a800";
  let r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let hh = 0, s = 0;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    hh = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    hh *= 60;
  }
  hh = (hh + deg + 360) % 360;
  const f = (n) => { const k = (n + hh / 30) % 12, a = s * Math.min(l, 1 - l); return Math.round((l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255).toString(16).padStart(2, "0"); };
  return "#" + f(0) + f(8) + f(4);
};
const handFam = () => { const f = FONTS.find(x => x.c === "손글씨"); if (f) ensureFont(f.k); return f ? fontStack(f.k) : "cursive"; };
const DECOS = [
  { k: "dot", g: "강조", n: "드러냄표", css: (c) => "text-emphasis:filled dot " + c + ";-webkit-text-emphasis:filled dot " + c + ";text-emphasis-position:over right;-webkit-text-emphasis-position:over" },
  { k: "ruby", g: "강조", n: "윗주", sel: 1 },
  { k: "wave", g: "밑줄", n: "물결", css: (c) => "text-decoration:underline wavy " + c + ";text-decoration-thickness:0.06em;text-underline-offset:0.24em" },
  { k: "dotted", g: "밑줄", n: "점선", css: (c) => "text-decoration:underline dotted " + c + ";text-decoration-thickness:0.12em;text-underline-offset:0.22em" },
  { k: "double", g: "밑줄", n: "이중선", css: (c) => "text-decoration:underline double " + c + ";text-decoration-thickness:0.07em;text-underline-offset:0.16em" },
  { k: "half", g: "밑줄", n: "반쪽 형광", css: (c) => "background:linear-gradient(transparent 58%," + rgba(c, 0.5) + " 58% 92%,transparent 92%);-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "marker", g: "형광펜", n: "손 마커", css: (c) => "background:linear-gradient(100deg," + rgba(c, 0) + " 1%," + rgba(c, 0.62) + " 3%," + rgba(c, 0.46) + " 8%," + rgba(c, 0.18) + " 92%," + rgba(c, 0.6) + " 96%," + rgba(c, 0) + " 99%),linear-gradient(182deg," + rgba(c, 0) + " 0," + rgba(c, 0.28) + " 10%," + rgba(c, 0) + " 18%);padding:0 0.18em;margin:0 -0.06em;border-radius:0.7em 0.25em 0.6em 0.3em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "chip", g: "형광펜", n: "둥근 칩", css: (c) => "background:" + rgba(c, 0.24) + ";border-radius:99px;padding:0.02em 0.45em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "redact", g: "가림", n: "먹칠", css: (c, ink) => "background:" + ink + ";color:transparent;border-radius:0.1em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "blur", g: "가림", n: "흐림", css: (c, ink) => "color:transparent;text-shadow:0 0 0.32em " + ink },
  { k: "dots", g: "가림", n: "점 가림", css: (c, ink) => "color:transparent;background:radial-gradient(circle," + ink + " 0 0.12em,transparent 0.13em) 0 58%/0.62em 1em repeat-x" },
  { k: "outline", g: "효과", n: "외곽선", css: (c) => "color:transparent;-webkit-text-stroke:0.04em " + c },
  { k: "glow", g: "효과", n: "빛", css: (c) => "text-shadow:0 0 0.22em " + rgba(c, 0.95) + ",0 0 0.7em " + rgba(c, 0.6) },
  { k: "grad", g: "효과", n: "그라데이션", css: (c) => "background:linear-gradient(90deg," + c + "," + hueShift(c, 55) + ");-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent" },
  { k: "box", g: "표시", n: "네모", css: (c) => "border:0.06em solid " + c + ";border-radius:0.14em;padding:0 0.14em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "circle", g: "표시", n: "동그라미", css: (c) => "border:0.06em solid " + c + ";border-radius:50%;padding:0.02em 0.32em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "bracket", g: "표시", n: "밑 괄호", css: (c) => "border:solid " + c + ";border-width:0 0.06em 0.06em;padding:0 0.12em 0.04em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "revise", g: "고쳐쓰기", n: "고쳐 쓴 흔적", sel: 1 },
  { k: "imgfill", g: "사진", n: "사진 채우기", img: 1, css: (c, ink, url) => "background:url(" + url + ") center/cover;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-weight:800" },
  { k: "imgmark", g: "사진", n: "사진 형광펜", img: 1, css: (c, ink, url) => "background:url(" + url + ") center/cover;color:#ffffff;text-shadow:0 1px 2px rgba(0,0,0,0.55);padding:0.02em 0.22em;border-radius:0.2em;-webkit-box-decoration-break:clone;box-decoration-break:clone" },
  { k: "imginline", g: "사진", n: "글 사이 사진", img: 1, sel: 2 }
];
const DECO_GROUPS = ["강조", "밑줄", "형광펜", "가림", "효과", "표시", "고쳐쓰기", "사진"];
function relinkMedia(html) {
  if (!html || html.indexOf("data-m=") < 0) return html;
  const d = document.createElement("div");
  d.innerHTML = html;
  d.querySelectorAll("[data-m]").forEach(n => {
    const u = mediaURL(n.dataset.m);
    if (!u) return;
    if (n.tagName === "IMG") n.setAttribute("src", u);
    else n.style.backgroundImage = "url(" + u + ")";
  });
  return d.innerHTML;
}
function dropCapHTML(html, col) {
  const d = document.createElement("div");
  d.innerHTML = html;
  const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT);
  let t;
  while ((t = w.nextNode())) {
    const i = t.data.search(/\S/);
    if (i < 0) continue;
    const rest = t.splitText(i);
    rest.splitText(1);
    const sp = document.createElement("span");
    sp.setAttribute("style", DROP_CSS(col));
    rest.parentNode.insertBefore(sp, rest);
    sp.appendChild(rest);
    break;
  }
  return d.innerHTML;
}
const DROP_CSS = (col) => "float:left;font-size:3.1em;line-height:0.86;margin:0.06em 0.1em 0 0;font-weight:700;color:" + col;
function decoSelHost() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  const n = sel.getRangeAt(0).commonAncestorContainer;
  const e = n.nodeType === 3 ? n.parentElement : n;
  return e && e.closest ? e.closest("[contenteditable][data-id]") : null;
}
function saveHost(h) { if (h) txt[key(h.dataset.id, h.dataset.k)] = h.innerHTML; }
function decosCovering(host, r, k) {
  const found = new Set();
  const w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  let t, any = false;
  while ((t = w.nextNode())) {
    if (!r.intersectsNode(t) || !t.data.trim()) continue;
    const a = t === r.startContainer ? r.startOffset : 0, b = t === r.endContainer ? r.endOffset : t.data.length;
    if (!t.data.slice(a, b).trim()) continue;
    if (t.parentElement.closest("rt")) continue;
    any = true;
    const dn = t.parentElement.closest('[data-deco="' + k + '"]');
    if (!dn || !host.contains(dn)) return null;
    found.add(dn);
  }
  return any && found.size ? [...found] : null;
}
function unwrapDeco(n) {
  if (n.tagName === "IMG") { n.remove(); return; }
  if (n.tagName === "RUBY") n.querySelectorAll("rt, rp").forEach(x => x.remove());
  n.querySelectorAll('[data-deco="revbase"]').forEach(x => { while (x.firstChild) x.parentNode.insertBefore(x.firstChild, x); x.remove(); });
  while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
  n.remove();
}
function applyDecoSel(d, url, mid) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return false;
  const r = sel.getRangeAt(0);
  const host = decoSelHost();
  if (!host) return false;
  const c = decoCol();
  const tn = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer;
  const ink = normHex(rgbToHex(getComputedStyle(tn).color)) || "#111111";
  if (d.k === "imginline") {
    const im = document.createElement("img");
    im.setAttribute("data-deco", "img");
    im.setAttribute("data-m", mid);
    im.setAttribute("src", url);
    im.setAttribute("alt", "");
    im.setAttribute("style", "height:1.2em;width:auto;vertical-align:-0.22em;border-radius:0.16em;margin:0 0.08em");
    if (!r.collapsed) r.deleteContents();
    r.insertNode(im);
    const nr = document.createRange(); nr.setStartAfter(im); nr.collapse(true);
    sel.removeAllRanges(); sel.addRange(nr);
    saveHost(host);
    return true;
  }
  if (r.collapsed) return false;
  const same = decosCovering(host, r, d.k);
  if (same) { same.forEach(unwrapDeco); saveHost(host); return true; }
  if (d.k === "ruby" || d.k === "revise") {
    const rb = document.createElement("ruby");
    rb.setAttribute("data-deco", d.k);
    const body = r.extractContents();
    if (d.k === "revise") {
      const base = document.createElement("span");
      base.setAttribute("data-deco", "revbase");
      base.setAttribute("style", "text-decoration:line-through " + c + ";text-decoration-thickness:0.08em");
      base.appendChild(body);
      rb.appendChild(base);
    } else rb.appendChild(body);
    const rt = document.createElement("rt");
    rt.setAttribute("style", d.k === "revise"
      ? "font-size:0.62em;font-weight:400;letter-spacing:0;color:" + c + ";font-family:" + handFam().replace(/"/g, "'")
      : "font-size:0.5em;font-weight:400;letter-spacing:0;opacity:0.75");
    rt.textContent = d.k === "revise" ? "고친 말" : "윗주";
    rb.appendChild(rt);
    r.insertNode(rb);
    const nr = document.createRange(); nr.selectNodeContents(rt);
    sel.removeAllRanges(); sel.addRange(nr);
    saveHost(host);
    return "rt";
  }
  const span = document.createElement("span");
  span.setAttribute("data-deco", d.k);
  if (mid) span.setAttribute("data-m", mid);
  span.setAttribute("style", d.css(c, ink, url));
  try { r.surroundContents(span); }
  catch (e) { span.appendChild(r.extractContents()); r.insertNode(span); }
  const nr = document.createRange(); nr.selectNodeContents(span);
  sel.removeAllRanges(); sel.addRange(nr);
  saveHost(host);
  return true;
}
let decoImgPending = null;
function decoCmd(k, mid) {
  const d = DECOS.find(x => x.k === k);
  if (!d) return;
  if (d.img && !mid) {
    mid = S.decoImg && mediaURL(S.decoImg) ? S.decoImg : null;
    if (!mid) { decoImgPending = k; openPicker("decoimg"); return; }
  }
  const url = mid ? mediaURL(mid) : "";
  const word = curScope() === "word" && useSelForFormat();
  if (d.k === "imginline") {
    if (!useStash()) { flash("사진을 넣을 자리를 글에서 먼저 눌러 주세요"); return; }
    snap(true);
    applyDecoSel(d, url, mid);
    measure(); render(); return;
  }
  if (d.sel && !word) { flash(d.n + "은 글자를 골라서 걸어요 · 카드에서 몇 글자를 드래그해 주세요"); return; }
  if (word && !d.sel && eachSame(() => applyDecoSel(d, url, mid))) { render(); return; }
  if (word) {
    snap(true);
    const res = applyDecoSel(d, url, mid);
    measure(); render();
    if (res === "rt") {
      flash(d.k === "revise" ? "위에 작게 뜬 ‘고친 말’을 바로 고쳐 쓰세요" : "위에 작게 뜬 ‘윗주’를 바로 고쳐 쓰세요");
      setTimeout(() => { const rt = app.querySelector(".card rt:last-of-type"); const hosts = app.querySelectorAll('.card ruby[data-deco="' + d.k + '"] rt'); const last = hosts[hosts.length - 1] || rt;
        if (last) { const h = last.closest("[contenteditable]"); if (h) h.focus({ preventScroll: true }); const x = document.createRange(); x.selectNodeContents(last); const s = window.getSelection(); s.removeAllRanges(); s.addRange(x); } }, 0);
    }
    return;
  }
  if (!wholeBlocks(scopeIds(), () => applyDecoSel(d, url, mid))) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
  render();
}
function decoClear() {
  const word = curScope() === "word" && useSelForFormat();
  snap(true);
  const strip = (h, r) => {
    h.querySelectorAll("[data-deco]").forEach(n => {
      if (n.getAttribute("data-deco") === "revbase") return;
      if (!r || r.intersectsNode(n)) unwrapDeco(n);
    });
    saveHost(h);
  };
  if (word) {
    const h = decoSelHost(), r = window.getSelection().getRangeAt(0);
    if (h) strip(h, r);
  } else {
    const ids = scopeIds();
    if (!ids.length) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
    ids.forEach(id => app.querySelectorAll('.card [contenteditable][data-id="' + id + '"]').forEach(h => strip(h, null)));
  }
  measure(); render();
  flash("꾸밈을 벗겼어요");
}
function decoPaneHTML(b, scope) {
  const c = decoCol();
  const sample = (d) => {
    if (d.k === "ruby") return '<ruby>진심<rt style="font-size:0.5em;opacity:0.75">眞心</rt></ruby>';
    if (d.k === "revise") return '<ruby><span style="text-decoration:line-through ' + c + '">사랑</span><rt style="font-size:0.6em;color:' + c + '">좋아해</rt></ruby>';
    if (d.img) return '<span style="' + (d.k === "imginline" ? "" : "font-weight:800;") + 'color:#6a6a68">' + (d.k === "imginline" ? "글🖼글" : "사진") + "</span>";
    return '<span style="' + d.css(c, "#111111", "") + '">가나다</span>';
  };
  const tiles = DECO_GROUPS.map(g =>
    '<div class="deco-g"><span class="deco-gn">' + g + '</span><div class="deco-row">' +
      DECOS.filter(d => d.g === g).map(d => '<button class="deco-tile" data-act="deco" data-k="' + d.k + '" data-hold title="' + d.n + '">' +
        '<span class="deco-pv">' + sample(d) + '</span><span class="deco-n">' + d.n + "</span></button>").join("") +
    "</div></div>").join("");
  const sw = DECO_SW.map(v => {
    const hex = v === "accent" ? (S.decoC ? (normHex(S.accent) || "#e0a800") : decoCol()) : v;
    const on = v === "accent" ? !S.decoC : normHex(S.decoC) === v;
    return '<button class="csw' + (on ? " on" : "") + '" data-act="decoc" data-c="' + v + '" data-hold title="' + (v === "accent" ? "강조색 따라가기" : v) + '" style="background:' + hex + '"></button>';
  }).join("") + '<input type="color" class="tsw" data-act="decocc" value="' + c + '" title="꾸밈색 직접 고르기" />';
  const pics = media.length
    ? '<div class="row" style="gap:8px;align-items:flex-start"><span class="lbl" style="width:52px;padding-top:9px">사진</span><div class="thumbs grow">' +
      media.map(m => '<button class="thumb' + (m.id === S.decoImg ? " on" : "") + '" data-act="decoimg" data-m="' + m.id + '" data-hold title="꾸밈에 쓸 사진" style="background-image:url(' + m.url + ')"></button>').join("") +
      '<button class="thumb add" data-act="decoimgnew" data-hold title="새 사진" aria-label="새 사진">+</button></div></div>'
    : "";
  const blk = b
    ? '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">블록</span>' +
        '<button class="btn grow' + (b.drop ? " on" : "") + '" style="height:34px" data-act="dropcap" data-hold aria-pressed="' + !!b.drop + '">첫 글자 크게</button>' +
        '<button class="btn grow' + (b.vert ? " on" : "") + '" style="height:34px" data-act="vert" data-hold aria-pressed="' + !!b.vert + '">세로쓰기</button></div>'
    : "";
  return '<div class="stack tight">' +
    '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">꾸밈색</span><div class="row grow" style="gap:6px;flex-wrap:wrap">' + sw + "</div></div>" +
    '<div class="deco-grid">' + tiles + "</div>" + pics + blk +
    '<div class="row" style="gap:8px"><button class="btn grow" style="height:34px;font-size:11px;color:#6a6a68" data-act="decoclear" data-hold>꾸밈 벗기기</button></div>' +
    '<p class="note" style="margin:0">' + (scope === "word" ? "고른 글자에 걸어요 · 같은 꾸밈을 다시 누르면 벗겨져요" : "글자를 고르지 않으면 블록 전체에 걸어요 · 윗주·고쳐 쓴 흔적·글 사이 사진은 글자를 골라야 해요") + "</p></div>";
}

const cut = (t, n) => t.length > n ? t.slice(0, n) + "…" : t;
function sameRanges(t) {
  const out = [];
  if (!t) return out;
  app.querySelectorAll(".card [contenteditable][data-id]").forEach(h => {
    const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (n.parentElement && n.parentElement.closest("rt")) continue;
      let i = n.data.indexOf(t);
      while (i >= 0) { out.push({ h: h, n: n, i: i }); i = n.data.indexOf(t, i + t.length); }
    }
  });
  return out;
}
function eachSame(run) {
  if (!S.sameAll || !useStash()) return 0;
  const sel = window.getSelection();
  const t = sel && sel.rangeCount ? sel.toString() : "";
  if (!S.sameAll || !t || t !== S.sameFor) return 0;
  const total = sameRanges(t).length;
  if (total < 2) return 0;
  snap(true);
  holdSnap = true; batchFmt = true;
  try {
    app.querySelectorAll(".card [contenteditable][data-id]").forEach(h => {
      const offs = [];
      const s0 = h.textContent || "";
      let i = s0.indexOf(t);
      while (i >= 0) { offs.push(i); i = s0.indexOf(t, i + t.length); }
      for (let j = offs.length - 1; j >= 0; j--) {
        const p1 = posAt(h, offs[j], true), p2 = posAt(h, offs[j] + t.length);
        if (!p1 || !p2) continue;
        if (p1.node.parentElement && p1.node.parentElement.closest("rt")) continue;
        h.focus({ preventScroll: true });
        const r = document.createRange();
        r.setStart(p1.node, p1.offset); r.setEnd(p2.node, p2.offset);
        sel.removeAllRanges(); sel.addRange(r);
        run();
      }
      if (offs.length) saveHost(h);
    });
  } finally { holdSnap = false; batchFmt = false; }
  measure();
  flash("‘" + cut(t, 8) + "’ " + total + "곳에 모두 걸었어요");
  return total;
}
function widenSel() {
  if (!useStash()) { flash("먼저 카드에서 글자를 골라 주세요"); return; }
  const sel = window.getSelection(), r = sel.getRangeAt(0);
  const n0 = r.startContainer.nodeType === 3 ? r.startContainer.parentElement : r.startContainer;
  const host = n0 && n0.closest ? n0.closest("[contenteditable][data-id]") : null;
  if (!host) return;
  const s = host.textContent || "";
  const off = (node, o) => { const m = document.createRange(); m.selectNodeContents(host); m.setEnd(node, o); return m.toString().length; };
  let a = off(r.startContainer, r.startOffset), z = off(r.endContainer, r.endOffset);
  const isW = (ch) => ch && !/[\s.,!?…。、「」『』“”"'()\[\]]/.test(ch);
  let na = a, nz = z;
  while (na > 0 && isW(s[na - 1])) na--;
  while (nz < s.length && isW(s[nz])) nz++;
  if (na === a && nz === z) {
    na = a; nz = z;
    while (na > 0 && !/[.!?。…\n]/.test(s[na - 1])) na--;
    while (nz < s.length && !/[.!?。…\n]/.test(s[nz])) nz++;
    while (nz < s.length && /[.!?。…”」』"']/.test(s[nz])) nz++;
    while (na < nz && /\s/.test(s[na])) na++;
    if (na === a && nz === z) { na = 0; nz = s.length; }
  }
  const p1 = posAt(host, na, true), p2 = posAt(host, nz);
  if (!p1 || !p2) return;
  const x = document.createRange();
  x.setStart(p1.node, p1.offset); x.setEnd(p2.node, p2.offset);
  sel.removeAllRanges(); sel.addRange(x);
  stashRange();
  refreshPanel();
}
function scopeBarHTML() {
  const sc = curScope();
  const r = textSelRange();
  const t = r ? r.toString() : "";
  const np = pickedIds().length, nIds = selectedBlockIds().length;
  const seg = (k, label, dis, title) => '<button class="' + (sc === k ? "on" : "") + '" data-act="scopeset" data-s="' + k + '" data-hold' + (dis ? " disabled" : "") + ' title="' + title + '">' + label + "</button>";
  const n = sc === "word" && t.trim() ? sameRanges(t).length : 0;
  const sameOn = S.sameAll && S.sameFor === t;
  const chips = sc === "word" && t.trim()
    ? '<button class="btn chip" data-act="widen" data-hold title="단어 → 문장 → 블록 전체">넓히기</button>' +
      (n > 1 ? '<button class="btn chip' + (sameOn ? " on" : "") + '" data-act="sameall" data-hold aria-pressed="' + sameOn + '" title="같은 글자에 한 번에 걸기">같은 글자 ' + n + "곳 모두</button>" : "")
    : (np ? '<button class="btn chip" data-act="pickclear" data-hold>담은 블록 풀기</button>' : "");
  return '<div class="scopebar">' +
    '<div class="row" style="gap:8px"><span class="lbl" style="width:auto;flex:none">적용</span><div class="seg grow scopeseg">' +
      seg("word", t.trim() ? "‘" + esc(cut(t.trim(), 6)) + "’" : "글자", !t.trim(), "카드에서 드래그해 고른 글자") +
      seg("block", np ? "블록 " + np + "개" : (nIds > 1 ? "블록 " + nIds + "개" : "이 블록"), false, "지금 블록(여러 개 담았으면 그 블록들) 전체") +
      seg("all", "카드 전체", false, "카드 안 모든 블록") +
    "</div></div>" +
    (chips ? '<div class="scopebar-x">' + chips + "</div>" : "") +
    "</div>";
}

const FMT_EXEC = { bold: "bold", italic: "italic", underline: "underline", strike: "strikeThrough", clearfmt: "removeFormat" };
function fmtCmd(act) {
  const run = () => {
    if (act === "bigger" || act === "smaller") selScale(act === "bigger" ? 1.25 : 0.8);
    else exec(FMT_EXEC[act]);
  };
  if (curScope() === "word" && useSelForFormat()) { if (!eachSame(run)) run(); render(); return; }
  const tog = { bold: "bold", italic: "italic", underline: "underline", strike: "strikeThrough" }[act];
  if (!wholeBlocks(scopeIds(), run, tog)) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
  render();
}
const Q_STYLES = ["「」", "『』", "“”"];
let qPickOpen = false, qHeld = false, qHoldT = 0, qTipped = false;
function quoteRange(host, a, z, q, force) {
  const s = host.textContent || "";
  while (a < z && /\s/.test(s[a])) a++;
  while (z > a && /\s/.test(s[z - 1])) z--;
  if (a >= z) return null;
  const del = (i) => { const p = charPos(host, i); if (p) p.node.deleteData(p.offset, 1); };
  const putBefore = (i, ch) => { const p = charPos(host, i); if (p) p.node.insertData(p.offset, ch); };
  const putAfter = (i, ch) => { const p = charPos(host, i); if (p) p.node.insertData(p.offset + 1, ch); };
  const e = bqEnds(s.slice(a, z));
  let o = -1, c = -1;
  if (e && e[0] === 0 && e[1] === z - a - 1) { o = a; c = z - 1; }
  else if (a > 0 && BQ_PAIR[s[a - 1]] && s[z] === BQ_PAIR[s[a - 1]] && !bqEnds(s.slice(a, z)) &&
           s.slice(a, z).indexOf(s[a - 1]) < 0 && s.slice(a, z).indexOf(s[z]) < 0) { o = a - 1; c = z; }
  if (o >= 0) {
    const same = s[o] === q[0] && s[c] === q[1];
    del(c); del(o);
    if (!force || same || c - o < 2) return o === a ? [a, z - 2] : [a - 1, z - 1];
    putAfter(c - 2, q[1]); putBefore(o, q[0]);
    return [o, c + 1];
  }
  putAfter(z - 1, q[1]); putBefore(a, q[0]);
  return [a, z + 2];
}
function quoteCmd(q, force) {
  q = q || S.qStyle || Q_STYLES[0];
  const hostOf = (n) => { const e = n && (n.nodeType === 3 ? n.parentElement : n); return e && e.closest ? e.closest("[contenteditable][data-id]") : null; };
  if (curScope() === "word" && useSelForFormat()) {
    const sel = window.getSelection(), r = sel.getRangeAt(0);
    const host = hostOf(r.startContainer);
    if (!host || host !== hostOf(r.endContainer)) { flash("따옴표는 한 칸 안의 글자에만 씌울 수 있어요"); return; }
    const m = document.createRange();
    m.selectNodeContents(host); m.setEnd(r.startContainer, r.startOffset);
    const a = m.toString().length;
    m.selectNodeContents(host); m.setEnd(r.endContainer, r.endOffset);
    const z = m.toString().length;
    snap(true);
    const nr = quoteRange(host, a, z, q, force);
    if (nr) {
      const p1 = posAt(host, nr[0]), p2 = posAt(host, nr[1]);
      if (p1 && p2) { const x = document.createRange(); x.setStart(p1.node, p1.offset); x.setEnd(p2.node, p2.offset); sel.removeAllRanges(); sel.addRange(x); }
    }
    txt[key(host.dataset.id, host.dataset.k)] = host.innerHTML;
    stashRange();
  } else {
    const hosts = scopeIds().map(id => app.querySelector('.card [contenteditable][data-id="' + id + '"][data-k="0"]'))
      .filter(h => h && h.textContent.trim());
    if (!hosts.length) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
    const on = (h) => !!bqEnds(h.textContent);
    const allOn = hosts.every(on);
    snap(true);
    hosts.forEach(h => {
      if (!allOn && on(h) && !force) return;
      quoteRange(h, 0, h.textContent.length, q, force);
      txt[key(h.dataset.id, h.dataset.k)] = h.innerHTML;
    });
  }
  measure();
  render();
  if (!qTipped && !force) { qTipped = true; flash("따옴표 버튼을 길게 누르면 『』 “” 로 바꿀 수 있어요"); }
}
function openQPick() { qPickOpen = !qPickOpen; render(); }
app.addEventListener("pointerdown", (e) => {
  if (!e.target.closest || !e.target.closest('[data-act="quote"]')) return;
  qHeld = false;
  clearTimeout(qHoldT);
  qHoldT = setTimeout(() => { qHeld = true; openQPick(); }, 450);
});
["pointerup", "pointercancel"].forEach(t => app.addEventListener(t, () => clearTimeout(qHoldT)));
app.addEventListener("contextmenu", (e) => {
  if (!e.target.closest || !e.target.closest('[data-act="quote"]')) return;
  e.preventDefault();
  clearTimeout(qHoldT);
  if (!qHeld) { qHeld = true; openQPick(); }
});

const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const KB = (k) => (IS_MAC ? "⌘" : "Ctrl+") + k;

function pickColor(hex) {
  const h = normHex(hex);
  if (!h) return;
  if (!paint(h, true, true)) { flash(NOSEL); return; }
  pushRecent(h);
  render();
}
let grabY = null, grabSwiped = false;
app.addEventListener("pointerdown", (e) => {
  if (!e.target.closest || !e.target.closest(".grabber")) return;
  grabY = e.clientY;
  grabSwiped = false;
});
app.addEventListener("pointerup", (e) => {
  if (grabY == null) return;
  const dy = e.clientY - grabY;
  grabY = null;
  if (Math.abs(dy) < 24 || wideMQ.matches) return;
  grabSwiped = true;
  setTimeout(() => { grabSwiped = false; }, 400);
  if ((dy > 0) !== S.fold) setFold(dy > 0);
});
function setFold(v) {
  v = !!v && !wideMQ.matches;
  if (v === S.fold) return;
  S.fold = v;
  app.classList.toggle("fold", v);
  const g = app.querySelector(".grabber");
  if (g) {
    g.setAttribute("aria-expanded", !v);
    g.innerHTML = "<i></i><span>" + (v ? "펼치기" : "접기") + "</span>" + ic(v ? "up" : "down", 13);
  }
  fitCard();
  setTimeout(fitCard, 230);
  scheduleSave();
}

let cpHsv = null, cpDrag = null;
function hsvToHex(c) {
  const f = (n) => { const k = (n + c.h / 60) % 6; return c.v - c.v * c.s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return "#" + [f(5), f(3), f(1)].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}
function hexToHsv(hex, keepH) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
  let h = keepH || 0;
  if (d) h = 60 * (mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4);
  return { h: h, s: mx ? d / mx : 0, v: mx };
}
function cpkHTML(hex) {
  if (!cpHsv || hsvToHex(cpHsv) !== hex) cpHsv = hexToHsv(hex, cpHsv && cpHsv.h);
  return '<div class="cpk">' +
    '<div class="cpk-sv" data-cpk="sv" data-hold style="background-color:hsl(' + Math.round(cpHsv.h) + ',100%,50%)">' +
      '<i style="left:' + cpHsv.s * 100 + "%;top:" + (1 - cpHsv.v) * 100 + "%;background:" + hex + '"></i></div>' +
    '<div class="cpk-hue" data-cpk="hue" data-hold><i style="left:' + cpHsv.h / 3.6 + '%"></i></div>' +
    '<p class="note" style="margin:0">네모 칸과 무지개 줄을 끌어 보세요 · 끄는 동안 고른 글자에 바로 보이고, 손을 떼면 칠해집니다</p></div>';
}
function cpkSync(hex) {
  const sv = app.querySelector('[data-cpk="sv"]'), hue = app.querySelector('[data-cpk="hue"]');
  if (sv) {
    sv.style.backgroundColor = "hsl(" + Math.round(cpHsv.h) + ",100%,50%)";
    const d = sv.querySelector("i");
    d.style.left = cpHsv.s * 100 + "%"; d.style.top = (1 - cpHsv.v) * 100 + "%"; d.style.background = hex;
  }
  if (hue) hue.querySelector("i").style.left = cpHsv.h / 3.6 + "%";
  const sw = app.querySelector(".cpk-sw");
  if (sw) { sw.style.background = hex; sw.querySelector("i").style.color = fgFor(hex); }
  const hx = app.querySelector('input[data-act="hexfld"]');
  if (hx) hx.value = hex;
  const al = app.querySelector('[data-cpk="alpha"]');
  if (al) al.style.setProperty("--c", hex);
}
const HAS_HL = typeof CSS !== "undefined" && !!CSS.highlights && typeof Highlight === "function";
let hlStyle = null;
function previewPick(hex) {
  S.custom[S.target] = hex;
  if (S.target === "bubble") {
    livePicking = true;
    try { paintBubble(hex, false); } finally { livePicking = false; }
    return;
  }
  const sel = window.getSelection();
  let r = null;
  if (sel && sel.rangeCount && !sel.isCollapsed && inCard(sel.anchorNode)) r = stash = sel.getRangeAt(0).cloneRange();
  else if (stash && !stash.collapsed && stash.startContainer.isConnected && inCard(stash.startContainer)) r = stash;
  if (!r) {
    if (S.target === "text") {
      livePicking = true;
      try { paintBlocks(hex, false); } finally { livePicking = false; }
    }
    return;
  }
  if (!HAS_HL) return;
  if (sel && sel.rangeCount) sel.removeAllRanges();
  if (!hlStyle) { hlStyle = document.createElement("style"); document.head.appendChild(hlStyle); }
  hlStyle.textContent = "::highlight(pickprev){" + (S.target === "hilite" ? "background-color:" : "color:") + withAlpha(hex, curAlpha()) + "}";
  CSS.highlights.set("pickprev", new Highlight(r));
}
function endPreview() { if (HAS_HL) CSS.highlights.delete("pickprev"); }
function cpMove(e) {
  const r = cpDrag.z.getBoundingClientRect();
  const x = clampN((e.clientX - r.left) / r.width, 0, 1), y = clampN((e.clientY - r.top) / r.height, 0, 1);
  if (cpDrag.kind === "alpha") {
    const a = Math.round(clampN(x, 0.05, 1) * 20) / 20;
    if (String(a) === cpDrag.last) return;
    cpDrag.last = String(a);
    S.calpha = Object.assign({}, S.calpha, { [S.target]: a });
    alphaSync();
    applyAlpha(false);
    return;
  }
  if (cpDrag.kind === "hue") cpHsv.h = x * 360;
  else { cpHsv.s = x; cpHsv.v = 1 - y; }
  const hex = hsvToHex(cpHsv);
  if (hex === cpDrag.last) return;
  cpDrag.last = hex;
  cpkSync(hex);
  previewPick(hex);
}
app.addEventListener("pointerdown", (e) => {
  const z = e.target.closest && e.target.closest("[data-cpk]");
  if (!z || cpDrag) return;
  e.preventDefault();
  cpDrag = { z: z, kind: z.dataset.cpk, id: e.pointerId, last: "" };
  try { z.setPointerCapture(e.pointerId); } catch (err) {}
  cpMove(e);
});
app.addEventListener("pointermove", (e) => {
  if (!cpDrag || e.pointerId !== cpDrag.id) return;
  e.preventDefault();
  cpMove(e);
});
function cpEnd(e, keep) {
  if (!cpDrag || e.pointerId !== cpDrag.id) return;
  const kind = cpDrag.kind;
  cpDrag = null;
  endPreview();
  if (!keep) { render(); return; }
  if (kind === "alpha") {
    saveCustom();
    if (!applyAlpha(true)) flash("다음에 칠할 때 이 투명도로 칠합니다");
    render();
    return;
  }
  commitPick(hsvToHex(cpHsv));
  render();
}
function alphaRange() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount && !sel.isCollapsed && inCard(sel.anchorNode)) return (stash = sel.getRangeAt(0).cloneRange());
  if (stash && !stash.collapsed && stash.startContainer.isConnected && inCard(stash.startContainer)) return stash;
  return null;
}
function paintedHexAt(r) {
  const n = firstTextParent(r);
  if (!n) return "";
  if (S.target === "text") return solidHex(getComputedStyle(n).color);
  const host = n.closest("[contenteditable]");
  for (let e = n; e && e !== host; e = e.parentElement) {
    const bg = e.style && e.style.backgroundColor;
    if (bg && bg !== "transparent") return solidHex(bg);
  }
  return "";
}
function applyAlpha(force) {
  const a = curAlpha();
  if (S.target === "bubble") {
    const b = cur();
    if (!b || !(b.type === "bubble" || b.type === "avatar")) return false;
    snap(force);
    if (a < 1) b.bubA = a; else delete b.bubA;
    repaintCard();
    return true;
  }
  const r = alphaRange();
  if (r) {
    const hex = paintedHexAt(r);
    if (!hex) return false;
    if (!force) {
      if (!HAS_HL) return true;
      const sel = window.getSelection();
      if (sel && sel.rangeCount) sel.removeAllRanges();
      if (!hlStyle) { hlStyle = document.createElement("style"); document.head.appendChild(hlStyle); }
      hlStyle.textContent = "::highlight(pickprev){" + (S.target === "hilite" ? "background-color:" : "color:") + withAlpha(hex, a) + "}";
      CSS.highlights.set("pickprev", new Highlight(r));
      return true;
    }
    return paintText(hex, true);
  }
  if (S.target !== "text") return false;
  const ids = paintIds();
  if (!ids.length) return false;
  snap(force);
  S.blocks.forEach(b => {
    if (ids.indexOf(b.id) < 0) return;
    if (a < 1) b.tcA = a; else delete b.tcA;
  });
  repaintCard();
  return true;
}
function alphaHTML(hex) {
  const a = curAlpha();
  return '<div class="row" style="gap:8px"><span class="lbl" style="width:52px">투명도</span>' +
    '<div class="cpk-alpha grow" data-cpk="alpha" data-hold style="--c:' + hex + '"><i style="left:' + a * 100 + '%"></i></div>' +
    '<span class="numwrap" style="width:76px">' + numFld("alpha", "%", "투명도") + "</span></div>";
}
function alphaSync() {
  const a = curAlpha();
  const bar = app.querySelector('[data-cpk="alpha"]');
  if (bar) bar.querySelector("i").style.left = a * 100 + "%";
  const f = app.querySelector('input[data-num="alpha"]');
  if (f && document.activeElement !== f) f.value = Math.round(a * 100);
}
app.addEventListener("pointerup", (e) => cpEnd(e, true));
app.addEventListener("pointercancel", (e) => cpEnd(e, false));

function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function rgbHex(c) { return "#" + c.map(x => Math.round(clampN(x, 0, 255)).toString(16).padStart(2, "0")).join(""); }
function relLum(h) {
  const w = [0.2126, 0.7152, 0.0722];
  return hexRgb(h).reduce((s, v, i) => { v /= 255; return s + w[i] * (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); }, 0);
}
function contrastOf(a, b) { const x = relLum(a), y = relLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function mixHex(fg, bg, a) { const f = hexRgb(fg), b = hexRgb(bg); return rgbHex(f.map((v, i) => v * a + b[i] * (1 - a))); }
function hslHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
  return rgbHex([f(0), f(8), f(4)].map(v => v * 255));
}
const hueDist = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
function cssHex(str, bg) {
  const m = String(str).match(/[\d.]+/g);
  if (!m || m.length < 3) return "#111111";
  const hex = rgbHex(m.slice(0, 3).map(Number));
  return m.length > 3 ? mixHex(hex, bg, Number(m[3])) : hex;
}
const GRAD_DIR = { v: "to bottom", h: "to right", d: "to bottom right" };
const GRADS = {
  2: [
    { n: "종이", c: ["#fbf8f3", "#ebe3d4"] },
    { n: "안개", c: ["#f6f6f4", "#d6dad9"] },
    { n: "이끼", c: ["#efeee3", "#c3c7a8"] },
    { n: "해질녘", c: ["#2f2a2e", "#7a4a3e"] }
  ],
  3: [
    { n: "노을", c: ["#fbf1e4", "#f2d5c0", "#dfb09c"] },
    { n: "먹", c: ["#fbfaf7", "#e6e4de", "#c9c6bd"] },
    { n: "저녁", c: ["#1d1b1a", "#3b2f2a", "#6e4a36"] },
    { n: "숲", c: ["#172320", "#24362f", "#41574a"] }
  ]
};
function gradStops(v) {
  v = v || S;
  const a = normHex(v.bg) || "#ffffff", n = v.bgGrad | 0;
  if (n < 2) return [a];
  const st = [a, normHex(v.bg2) || a];
  if (n >= 3) st.push(normHex(v.bg3) || st[1]);
  return st;
}
function bgPaint(v) {
  const st = gradStops(v);
  return st.length < 2 ? st[0] : "linear-gradient(" + (GRAD_DIR[(v || S).bgDir] || GRAD_DIR.v) + "," + st.join(",") + ")";
}
function bgMid(v) {
  const st = gradStops(v);
  if (st.length < 2) return st[0];
  return st.length === 2 ? mixHex(st[0], st[1], 0.5) : mixHex(mixHex(st[0], st[2], 0.5), st[1], 0.5);
}
const cwK = () => { const v = +S.cw || 100; return v === 100 ? 1 : clampN(v, 50, 150) / 100; };
function typeFxCSS() {
  const k = cwK();
  return (k !== 1 ? ";width:" + Math.round(10000 / k) / 100 + "%;transform:scaleX(" + k + ");transform-origin:0 0" : "") +
    "";
}
function tgradSync(root) {
  (root || app).querySelectorAll(".card-stage[data-tg]").forEach(st => {
  const [c1, c2] = st.dataset.tg.split(",");
  const g = "linear-gradient(180deg," + c1 + "," + c2 + ")";
  st.querySelectorAll(".card-flow, .card-zone").forEach(fl => {
    const bs = [...fl.children].filter(n => n.classList && n.classList.contains("blk"));
    if (!bs.length) return;
    const t0 = bs[0].offsetTop, last = bs[bs.length - 1];
    const H = Math.max(1, last.offsetTop + last.offsetHeight - t0);
    bs.forEach(b => {
      b.style.backgroundImage = g;
      b.style.backgroundSize = "100% " + H + "px";
      b.style.backgroundRepeat = "no-repeat";
      b.style.backgroundPosition = "0 " + (t0 - b.offsetTop) + "px";
      b.style.webkitBackgroundClip = "text";
      b.style.backgroundClip = "text";
    });
  });
  });
}
const LBOX = [["", "끔"], ["239", "2.39 : 1"], ["276", "2.76 : 1"]];
function lboxBar(w, h) {
  const r = { "239": 2.39, "276": 2.76 }[S.lbox];
  if (!r || S.ratio === "auto") return 0;
  const bar = Math.min((h - w / r) / 2, h * 0.18);
  return bar >= 4 ? Math.round(bar * 10) / 10 : 0;
}
const lboxTop = (w, h) => (S.capPos === "top" && S.blocks.some(b => b.type === "caption") ? 0 : lboxBar(w, h));
function lboxHTML(w, h) {
  const bar = lboxBar(w, h);
  if (!bar) return "";
  const i = (e) => '<i style="position:absolute;left:0;right:0;' + e + ":0;height:" + bar + 'px;background:#000"></i>';
  return '<div class="card-deco" aria-hidden="true">' + i("top") + i("bottom") + "</div>";
}
const TGRADS = [["#6f807a", "#141414", "회녹 → 먹"], ["#8a7a64", "#1c1814", "갈피 → 먹"], ["#5d6b8a", "#12141c", "남 → 먹"], ["#b08a8a", "#2a1a1e", "장미 → 먹"], ["#d9d4c7", "#ffffff", "안개 → 흰"]];
const IMG_POS = [-100, 200], IMG_ZOOM = [20, 500];
function imgLayerCSS(x, y, z) {
  const cx = clampN(x, 0, 100), cy = clampN(y, 0, 100), tx = r1(cx - x), ty = r1(cy - y);
  return { backgroundPosition: cx + "% " + cy + "%", transformOrigin: z >= 1 ? cx + "% " + cy + "%" : "50% 50%",
    transform: (tx || ty ? "translate(" + tx + "%," + ty + "%) " : "") + "scale(" + z + ")" };
}
function imgLayerHTML(b, src, veiled) {
  if (!src) return "";
  const x = b.imgX == null ? 50 : b.imgX, y = b.imgY == null ? 50 : b.imgY, z = (b.imgZ || 100) / 100;
  const c = imgLayerCSS(x, y, z);
  natSize(src);
  return '<div class="ipic" style="background-position:' + c.backgroundPosition + ";transform-origin:" + c.transformOrigin + ";transform:" + c.transform +
    (veiled ? ";background-image:repeating-linear-gradient(45deg,transparent 0 6px,rgba(0,0,0,0.05) 6px 12px)" : ";background-image:url(" + src + ")") + '"></div>';
}
const SCENE_AR = { "16:9": 16 / 9, "2.39": 2.39, "4:3": 4 / 3, "1:1": 1, "4:5": 0.8, "9:16": 9 / 16 };
const arKey = (v) => SCENE_AR[v] || ratioWH(v) ? v : "16:9";
const arOf = (v) => { const k = arKey(v); if (SCENE_AR[k]) return SCENE_AR[k]; const wh = ratioWH(k); return wh[0] / wh[1]; };
function capTextHTML(b, fs, fw, tone, base, second) {
  const st = CAP_STYLES.some(x => x[0] === S.capSt) ? S.capSt : "shadow";
  const col = b.tc ? tone : (st === "yellow" ? "#ffd84a" : "#ffffff");
  const o = r1(Math.max(0.5, fs * 0.075)), sb = r1(fs * 0.4);
  const ring = [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]]
    .map(d => r1(d[0] * o) + "px " + r1(d[1] * o) + "px 0 #000").join(",");
  const sh = st === "box" ? "none"
    : st === "shadow" ? "0 0 " + sb + "px rgba(0,0,0,.85),0 " + r1(fs * 0.06) + "px " + r1(fs * 0.14) + "px rgba(0,0,0,.9)"
    : ring + ",0 0 " + sb + "px rgba(0,0,0,.6)";
  const cap = "color:" + col + ";text-shadow:" + sh + ";text-align:center";
  const box = st === "box" ? "background:rgba(0,0,0,.66);padding:" + r1(fs * 0.25) + "px " + r1(fs * 0.7) + "px;border-radius:" + r1(fs * 0.2) + "px;" : "";
  return '<div style="display:inline-block;max-width:100%;' + box + '">' +
    ce(b.id, 0, "", base + ";" + cap) +
    (second ? ce(b.id, 1, "", "font-size:" + r1(fs * 0.8) + "px;font-weight:" + fw(400) + ";line-height:1.4;letter-spacing:" + (S.ls + 0.01) + "em;opacity:.92;margin-top:" + r1(fs * 0.15) + "px;" + cap) : "") +
    "</div>";
}
const CAP_STYLES = [["shadow", "그림자"], ["outline", "테두리"], ["box", "상자"], ["yellow", "노란 자막"]];
const TSH = [null, [0.5, 1.5, 0.35, 0, 0], [0.8, 2.5, 0.5, 1, 0.35], [1, 3, 0.7, 6, 0.45]];
const tshColor = (dark) => (S.tshC && S.tshC !== "auto" ? normHex(S.tshC) || "#000000" : (dark ? "#000000" : "#ffffff"));
function textShadowCSS(dark) {
  const t = TSH[S.tsh | 0];
  if (!t) return "";
  const c = tshColor(dark);
  return ";text-shadow:0 " + t[0] + "px " + t[1] + "px " + rgba(c, t[2]) + (t[3] ? ",0 0 " + t[3] + "px " + rgba(c, t[4]) : "");
}
function cardBgHex() {
  if (!S.bgImage) return bgMid();
  return mixHex(normHex(S.ovColor) || "#000000", "#6f6f6d", S.overlay);
}
const alphaOf = (kind) => (kind === "accent" ? 1 : ((S.calpha || {})[kind] == null ? 1 : S.calpha[kind]));

function rangeOffsets(r) {
  let n = r.startContainer;
  if (n.nodeType === 3) n = n.parentElement;
  const host = n && n.closest ? n.closest("[contenteditable][data-id]") : null;
  if (!host) return null;
  const pre = document.createRange();
  pre.selectNodeContents(host);
  pre.setEnd(r.startContainer, r.startOffset);
  const s0 = pre.toString().length;
  return { id: host.dataset.id, k: host.dataset.k, s: s0, e: s0 + r.toString().length };
}
function offsetsRange(o) {
  const host = app.querySelector('.card [contenteditable][data-id="' + o.id + '"][data-k="' + o.k + '"]');
  if (!host) return null;
  const r = document.createRange();
  const walk = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  let pos = 0, started = false, t;
  while ((t = walk.nextNode())) {
    const L = t.data.length;
    if (!started && o.s <= pos + L) { r.setStart(t, o.s - pos); started = true; }
    if (started && o.e <= pos + L) { r.setEnd(t, o.e - pos); return r; }
    pos += L;
  }
  if (!started) return null;
  r.setEnd(host, host.childNodes.length);
  return r;
}
function recRange() {
  const R = S.rec;
  if (!R || !R.sel) return null;
  if (R.live && R.live.startContainer.isConnected && !R.live.collapsed) return R.live;
  R.live = offsetsRange(R.sel);
  return R.live;
}

function firstTextParent(r) {
  const root = r.commonAncestorContainer.nodeType === 3 ? r.commonAncestorContainer.parentElement : r.commonAncestorContainer;
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let t;
  while ((t = walk.nextNode())) {
    if (!t.data.trim() || !r.intersectsNode(t)) continue;
    if ((t === r.startContainer && r.startOffset >= t.length) || (t === r.endContainer && r.endOffset === 0)) continue;
    return t.parentElement;
  }
  const n = r.startContainer;
  return n.nodeType === 3 ? n.parentElement : n;
}
function recBaseNow() {
  const bg = cardBgHex();
  const live = stash && !stash.collapsed && stash.startContainer.isConnected && inCard(stash.startContainer) ? stash.cloneRange() : null;
  let node = null;
  if (live) node = firstTextParent(live);
  else { const b = cur(); node = b && els[b.id] && els[b.id].isConnected ? (els[b.id].querySelector('.ce[data-k="0"]') || els[b.id].querySelector(".ce")) : null; }
  const cs = node ? getComputedStyle(node) : null;
  const text = cs ? cssHex(cs.color, bg) : "#111111";
  const bgm = cs ? String(cs.backgroundColor).match(/[\d.]+/g) : null;
  const hl = bgm && bgm.length >= 3 && !(bgm.length > 3 && Number(bgm[3]) === 0) ? cssHex(cs.backgroundColor, bg) : "";
  const sample = ((live ? live.toString() : (node ? node.textContent : "")) || "").replace(/\s+/g, " ").trim().slice(0, 24) || "어울리는 색을 골라 보세요";
  return { live: live, base: { bg: bg, text: text, hl: hl, accent: normHex(S.accent) || "#a8a8a6", sample: sample } };
}
function recOpen(tab) {
  const r = recBaseNow();
  set({ rec: {
    tab: tab || (S.target === "text" ? "text" : "hilite"),
    base: r.base,
    sel: r.live ? rangeOffsets(r.live) : null, live: r.live, pick: "", orig: null
  } });
}
function recInlineHTML() {
  const kind = S.target === "text" ? "text" : "hilite";
  const r = recBaseNow();
  const list = recList(kind, r.base).slice(0, 5);
  const B = r.base;
  const title = kind === "hilite"
    ? (isChromatic(B.text) ? hueName(hexToHsv(B.text).h) + " 글자에 어울리는 " + (S.target === "bubble" ? "말풍선 색" : "형광펜") : "글자에 어울리는 " + (S.target === "bubble" ? "말풍선 색" : "형광펜"))
    : (B.hl && isChromatic(B.hl, HL_MIN) ? hueName(hexToHsv(B.hl).h, true) + " 형광펜에 어울리는 글자색" : "바탕·강조색에 어울리는 글자색");
  return sec("추천", '<i class="rec-dot" style="background:' + (kind === "hilite" ? B.text : (B.hl || B.accent)) + '"></i>' + title,
    '<div class="rec-inline">' +
      list.map(c => '<button class="rec-sw" data-act="color" data-hex="' + c.hex + '" data-hold title="' + c.why + " · " + c.hex + " · 대비 " + crText(c.cr) + '">' +
        '<span class="rec-chip" style="background:' + (kind === "text" ? r.base.bg : c.hex) + ";color:" + (kind === "text" ? c.hex : r.base.text) + '">가</span>' +
        '<span class="rec-grade">' + crGrade(c.cr) + "</span></button>").join("") +
      '<button class="rec-more" data-act="recopen" data-hold>더 보기' + ic("next", 13) + "</button>" +
    "</div>");
}
function hexToHsl(hex) {
  const [r, g, b] = hexRgb(hex).map(v => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, sat = 0;
  if (d) {
    sat = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
  }
  return [(h + 360) % 360, sat * 100, l * 100];
}
function recReadable(kind, hex, B) {
  const a = alphaOf(kind);
  if (kind === "hilite") { const comp = mixHex(hex, B.bg, a); return contrastOf(B.text, comp) >= 4.5 && contrastOf(comp, B.bg) >= 1.1; }
  if (kind === "text") { const under = B.hl || B.bg; return contrastOf(mixHex(hex, under, a), under) >= 4.5; }
  return contrastOf(hex, B.bg) >= 3;
}
function recVarBase(R) {
  if (R.pick) return R.pick;
  const B = R.base;
  if (R.tab === "hilite") return B.hl && isChromatic(B.hl, HL_MIN) ? B.hl : (normHex((S.custom || {}).hilite) || "#ffe680");
  if (R.tab === "text") return B.text;
  return B.accent;
}
function recVarHTML() {
  const R = S.rec;
  if (!R) return "";
  const B = R.base, c = recVarBase(R);
  const [h, sat, l] = hexToHsl(c);
  const cl = (v) => clampN(v, 0, 100);
  const chip = (hex, mid, dup) => {
    const ok = mid || (!dup && recReadable(R.tab, hex, B));
    const why = dup ? "더 옮길 수 없어요" : (R.tab === "hilite" ? "글자가 안 읽히거나 바탕과 구분이 안 돼요" : "글자가 잘 안 읽혀요");
    return '<button class="rv-chip' + (mid ? " mid" : "") + (ok ? "" : " weak") + (R.pick === hex ? " on" : "") + '" data-act="recpick" data-hex="' + hex + '" data-hold' +
      (ok ? "" : " disabled") + ' title="' + hex + (ok ? "" : " · " + why) + '" style="background:' + hex + '"></button>';
  };
  const row = (label, lo, hi, list) => '<div class="rv-row"><span class="rv-l">' + label + "</span>" +
    '<span class="rv-end">' + lo + "</span>" +
    '<div class="rv-sw">' + list.map((x, i) => chip(x, i === 2, i !== 2 && (x === list[2] || list.indexOf(x) !== i))).join("") + "</div>" +
    '<span class="rv-end">' + hi + "</span></div>";
  const steps = [-2, -1, 0, 1, 2];
  const hueL = hueName(h - 24, l > 70), hueR = hueName(h + 24, l > 70);
  return '<div class="rec-vars">' +
    '<div class="rv-h"><b>주변 색</b><span><i style="background:' + c + '"></i>' + c + " 기준 · 눌러서 옮겨 가기</span></div>" +
    row("명도", "밝게", "어둡게", steps.map(k => hslHex(h, sat, cl(l - k * 8)))) +
    row("채도", "차분", "선명", steps.map(k => hslHex(h, cl(sat + k * 20), l))) +
    (sat > 8
      ? row("톤", hueL, hueR, steps.map(k => hslHex((h + k * 12 + 360) % 360, sat, l)))
      : '<p class="note" style="margin:2px 0 0">무채색이라 톤은 옮길 수 없어요 · 채도를 먼저 올려 보세요</p>') +
    "</div>";
}

const crGrade = (cr) => { const v = Math.floor(cr * 10) / 10; return v >= 7 ? "AAA" : v >= 4.5 ? "AA" : "큰 글씨"; };

const REC_HUES = [0, 18, 36, 52, 85, 130, 165, 190, 212, 235, 262, 295, 330];
function hueName(h, light) {
  h = ((h % 360) + 360) % 360;
  if (h < 12 || h >= 345) return light ? "분홍" : "빨강";
  if (h < 40) return light ? "살구" : "주황";
  if (h < 66) return "노랑";
  if (h < 100) return "연두";
  if (h < 150) return "초록";
  if (h < 190) return "청록";
  if (h < 215) return "하늘";
  if (h < 250) return "파랑";
  if (h < 290) return "보라";
  if (h < 320) return "자주";
  return "분홍";
}
const isChromatic = (hex, min) => { const v = hexToHsv(hex); return v.s > (min == null ? 0.22 : min) && v.v > 0.12; };
const HL_MIN = 0.1;
function recList(kind, base) {
  const darkBg = relLum(base.bg) < 0.2;
  const a = alphaOf(kind);
  const tv = hexToHsv(base.text), th = tv.h;
  const textColored = isChromatic(base.text);
  const hlColored = !!(base.hl && isChromatic(base.hl, HL_MIN));
  const hlh = hlColored ? hexToHsv(base.hl).h : 0;
  const accColored = isChromatic(base.accent), ah = hexToHsv(base.accent).h;
  const tName = hueName(th, false);
  const all = [];
  const push = (hex, h, l, sat, cr, score, why) => all.push({ hex: hex, h: h, l: l, neutral: sat === 0, cr: cr, score: score, why: why });
  const around = (c) => [c, c - 12, c + 12, c - 25, c + 25, c + 180, c + 165, c + 195].map(x => ((x % 360) + 360) % 360);
  const hues = (extra) => Array.from(new Set(REC_HUES.concat(extra).map(x => Math.round(x))));

  if (kind === "hilite") {
    const pool = hues(textColored ? around(th) : []);
    (darkBg ? [24, 32, 40] : [92, 86, 79, 72]).forEach(l => [90, 65, 45].forEach(sat => pool.forEach(h => {
      const hex = hslHex(h, sat, l), comp = mixHex(hex, base.bg, a);
      const cr = contrastOf(base.text, comp);
      if (cr < 4.5 || contrastOf(comp, base.bg) < 1.1) return;
      let score = Math.min(cr, 10) / 25, why;
      if (textColored) {
        const d = hueDist(h, th);
        if (d <= 30) { score += 1.3 - d / 60; why = tName + " 글자와 같은 계열"; }
        else if (d >= 150) { score += 0.7; why = tName + " 글자의 보색 대비"; }
        else { score += 0.1; why = "잘 읽히는 형광펜"; }
      } else {
        const fav = [[56, 0.9], [90, 0.75], [160, 0.7], [335, 0.7], [200, 0.65], [30, 0.55]];
        const f = fav.find(x => hueDist(h, x[0]) <= 14);
        score += f ? f[1] : 0.2;
        why = f ? "무채색 글자에 흔히 쓰는 형광펜" : "잘 읽히는 형광펜";
      }
      if (sat === 90 && !darkBg) score += 0.04;
      push(hex, h, l, sat, cr, score, why);
    })));
  } else if (kind === "text") {
    const anchor = hlColored ? hlh : (accColored ? ah : null);
    const pool = hues(anchor != null ? around(anchor) : []);
    (darkBg ? [96, 88, 80, 72] : [14, 22, 30, 38]).forEach(l => [0, 30, 55, 75].forEach(sat => (sat ? pool : [0]).forEach(h => {
      const hex = hslHex(h, sat, l);
      const under = hlColored ? mixHex(base.hl, base.bg, 1) : base.bg;
      const cr = contrastOf(mixHex(hex, under, a), under);
      if (cr < 4.5) return;
      let score = Math.min(cr, 7) / 14, why;
      if (!sat) { score += 0.35; why = "차분한 무채색"; }
      else if (anchor != null) {
        const d = hueDist(h, anchor);
        const nm = hueName(anchor, hlColored);
        if (d <= 30) { score += 1.3 - d / 60; why = hlColored ? nm + " 형광펜과 같은 계열" : "강조색과 같은 계열"; }
        else if (d >= 150) { score += 0.6; why = hlColored ? nm + " 형광펜의 보색 대비" : "강조색의 보색 대비"; }
        else { score += 0.1; why = "잘 읽히는 색"; }
      } else { score += 0.3; why = "잘 읽히는 색"; }
      if (sat && l === (darkBg ? 80 : 30)) score += 0.08;
      push(hex, h, l, sat, cr, score, why);
    })));
  } else {
    const pool = hues(textColored ? around(th) : []);
    (darkBg ? [72, 62] : [40, 50]).forEach(l => [72, 45].forEach(sat => pool.forEach(h => {
      const hex = hslHex(h, sat, l);
      const cr = contrastOf(hex, base.bg);
      if (cr < 3) return;
      let score = Math.min(cr, 7) / 14, why = "눈에 띄는 포인트";
      if (textColored) {
        const d = hueDist(h, th);
        if (d <= 30) { score += 1.1 - d / 60; why = tName + " 글자와 같은 계열"; }
        else if (d >= 150) { score += 0.7; why = tName + " 글자의 보색 포인트"; }
      } else if (sat > 60) score += 0.2;
      push(hex, h, l, sat, cr, score, why);
    })));
  }
  all.sort((x, y) => y.score - x.score);
  const out = [];
  for (const c of all) {
    if (out.length >= 6) break;
    if (out.filter(o => o.why === c.why).length >= 4) continue;
    const near = out.filter(o => !o.neutral && !c.neutral && hueDist(o.h, c.h) < 20);
    if (near.length >= 2 || near.some(o => Math.abs(o.l - c.l) < 7)) continue;
    if (c.neutral && out.some(o => o.neutral && Math.abs(o.l - c.l) < 7)) continue;
    out.push(c);
  }
  return out;
}
const crText = (cr) => (Math.floor(cr * 10) / 10).toFixed(1);
const crLabel = (cr) => { const v = Math.floor(cr * 10) / 10; return v >= 7 ? "아주 잘 보임" : v >= 4.5 ? "잘 보임" : "보임"; };

function recHTML() {
  const R = S.rec;
  if (!R) return "";
  const B = R.base, a = alphaOf(R.tab);
  const list = recList(R.tab, B);
  const fam = fontStack(S.famKey);
  const sw = (hex) => '<i style="background:' + hex + '"></i>';
  const sampleOf = (hex) => {
    const inner = esc(B.sample);
    if (R.tab === "hilite") return '<span style="background:' + withAlpha(hex, a) + ";color:" + B.text + ';padding:1px 2px">' + inner + "</span>";
    if (R.tab === "text") return '<span style="color:' + withAlpha(hex, a) + (B.hl ? ";background:" + B.hl + ";padding:1px 2px" : "") + '">' + inner + "</span>";
    return '<span style="color:' + B.text + '"><b style="color:' + hex + ';font-weight:600">' + inner.slice(0, 8) + "</b>" + inner.slice(8) + "</span>";
  };
  const hint = R.tab === "hilite" && !R.sel ? "카드에서 글자를 먼저 고르면 그 글자에 입혀 볼 수 있어요"
    : (R.tab === "text" && !R.sel ? "고른 글자가 없어 지금 블록 전체에 입혀 봅니다"
    : "누르면 카드에 입혀 봅니다 · 적용해야 칠해집니다");
  return '<div class="sheet rec" data-act="recclose"><div class="sheet-card" data-stop>' +
    '<div class="rec-head"><h2>어울리는 색</h2>' +
      '<span class="rec-base">' + sw(B.text) + "글자 " + (B.hl ? sw(B.hl) + "형광펜 " : "") + sw(B.bg) + "바탕" + (a < 1 ? " · 투명도 " + Math.round(a * 100) + "%" : "") + "</span></div>" +
    '<div class="seg target">' + [["hilite", "형광펜"], ["text", "글자색"], ["accent", "강조색"]].map(x =>
      '<button class="' + (R.tab === x[0] ? "on" : "") + '" data-act="rectab" data-k="' + x[0] + '" data-hold>' + x[1] + "</button>").join("") + "</div>" +
    '<p class="note" style="margin:10px 0 0">' + hint + "</p>" +
    (list.length
      ? '<div class="rec-grid">' + list.map(c => '<button class="rec-card' + (R.pick === c.hex ? " on" : "") + '" data-act="recpick" data-hex="' + c.hex + '" data-hold aria-pressed="' + (R.pick === c.hex) + '">' +
          '<span class="rec-sample" style="background:' + B.bg + ";font-family:" + fam + '">' + sampleOf(c.hex) + "</span>" +
          '<span class="rec-why">' + c.why + "</span>" +
          '<span class="rec-foot">' + sw(c.hex) + '<span class="mono">' + c.hex + "</span>" +
            '<span class="rec-badge" title="대비 ' + crText(c.cr) + " · " + crLabel(c.cr) + '">' + crGrade(c.cr) + " " + crText(c.cr) + "</span></span>" +
          '<span class="rec-check" aria-hidden="true">' + ic("check", 13) + "</span></button>").join("") + "</div>"
      : '<p class="note">이 바탕과 글자색으로는 잘 읽히는 후보가 없어요. 글자색이나 바탕을 먼저 바꿔 보세요.</p>') +
    '<div data-recvars>' + recVarHTML() + "</div>" +
    '<div class="rec-actions">' +
      '<button class="btn wide" style="height:46px" data-act="recclose" data-hold>닫기</button>' +
      '<button class="btn wide fill" style="height:46px" data-act="recok" data-hold' + (R.pick ? "" : " disabled") + ">적용</button></div>" +
    "</div></div>";
}

function recRevert() {
  const R = S.rec;
  endPreview();
  if (!R || !R.orig) return;
  if (R.orig.accent != null) S.accent = R.orig.accent;
  if (R.orig.tc) {
    S.blocks.forEach(b => {
      const o = R.orig.tc[b.id];
      if (!o) return;
      if (o.tc) b.tc = o.tc; else delete b.tc;
      if (o.tcA != null) b.tcA = o.tcA; else delete b.tcA;
    });
  }
  R.orig = null;
  repaintCard();
}
function recPreview(hex) {
  const R = S.rec;
  if (!R) return;
  recRevert();
  R.orig = {};
  if (R.tab === "accent") {
    R.orig.accent = S.accent;
    S.accent = hex;
    repaintCard();
  } else if (!R.sel && R.tab === "text") {
    R.orig.tc = {};
    const a = alphaOf("text");
    paintIds().forEach(id => {
      const b = S.blocks.find(x => x.id === id);
      if (!b) return;
      R.orig.tc[id] = { tc: b.tc, tcA: b.tcA };
      b.tc = hex;
      if (a < 1) b.tcA = a; else delete b.tcA;
    });
    repaintCard();
  } else {
    const r = recRange();
    if (r && HAS_HL) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount) sel.removeAllRanges();
      if (!hlStyle) { hlStyle = document.createElement("style"); document.head.appendChild(hlStyle); }
      hlStyle.textContent = "::highlight(pickprev){" + (R.tab === "hilite" ? "background-color:" : "color:") + withAlpha(hex, alphaOf(R.tab)) + "}";
      CSS.highlights.set("pickprev", new Highlight(r));
    }
  }
  R.pick = hex;
  const vb = app.querySelector("[data-recvars]");
  if (vb) vb.innerHTML = recVarHTML();
  app.querySelectorAll(".rec-card").forEach(n => { const on = n.dataset.hex === hex; n.classList.toggle("on", on); n.setAttribute("aria-pressed", on); });
  const ok = app.querySelector('[data-act="recok"]');
  if (ok) ok.disabled = false;
}
function recApply() {
  const R = S.rec;
  if (!R || !R.pick) return;
  const hex = R.pick, tab = R.tab;
  recRevert();
  if (tab === "accent") { set({ accent: hex, rec: null }); flash("강조색을 바꿨어요"); return; }
  S.target = tab;
  const r = R.sel ? recRange() : null;
  if (r) {
    let host = r.startContainer;
    if (host.nodeType === 3) host = host.parentElement;
    host = host.closest("[contenteditable][data-id]");
    if (host) host.focus({ preventScroll: true });
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    stash = r.cloneRange();
  } else {
    stash = null;
    const sel = window.getSelection();
    if (sel) sel.removeAllRanges();
  }
  S.rec = null;
  commitPick(hex);
  render();
}
function recClose() {
  recRevert();
  set({ rec: null });
}

let lastPick = "";
function livePick(hex, src) {
  const h = normHex(hex);
  if (!h || h === lastPick) return;
  S.custom[S.target] = h;
  const other = app.querySelector('input[data-act="' + (src === "hexfld" ? "cpick" : "hexfld") + '"]');
  if (other && normHex(other.value) !== h) other.value = h;
  const sel = window.getSelection();
  const ready = S.target === "bubble" || !!(sel && sel.rangeCount && inCard(sel.anchorNode));
  if (!ready) return;
  if (S.sameAll && S.target !== "bubble" && curScope() === "word") return;
  lastPick = h;
  livePicking = true;
  try { paint(h, false); } finally { livePicking = false; }
}
function commitPick(hex) {
  const h = normHex(hex);
  if (!h) return;
  const painted = h === lastPick || paint(h, true);
  lastPick = "";
  S.custom[S.target] = h;
  saveCustom();
  if (!painted) { flash(NOSEL); return; }
  pushRecent(h);
  const box = app.querySelector("[data-recent]");
  if (box) {
    box.innerHTML = ((S.recent || {})[S.target] || []).map(x =>
      '<button class="swatch small' + (x === "#ffffff" || x === "#e9e7dd" ? " light" : "") +
      '" data-act="color" data-hex="' + x + '" title="' + x + '" style="background:' + x + '" data-hold></button>').join("");
  }
}
function onColorInput(el) {
  const hex = normHex(el.value);
  if (!hex) return;
  switch (el.dataset.act) {
    case "cpick": livePick(hex, "cpick"); return;
    case "bgc": S.bg = hex; S.bgImage = false; repaintCard(); return;
    case "bgc2": S.bg2 = hex; repaintCard(); return;
    case "bgc3": S.bg3 = hex; repaintCard(); return;
    case "tshcc":
      S.tshC = hex;
      app.querySelectorAll('[data-act="tshc"]').forEach(n => n.classList.remove("on"));
      el.classList.add("on");
      repaintCard();
      return;
    case "accentc": S.accent = hex; repaintCard(); return;
    case "tg1c": S.tg1 = hex; S.tgrad = true; repaintCard(); return;
    case "tg2c": S.tg2 = hex; S.tgrad = true; repaintCard(); return;
    case "decocc": S.decoC = hex; return;
    case "framecc": S.frameC = hex; repaintCard(); return;
    case "skincc": S.skinC = Object.assign({}, S.skinC, { [el.dataset.slot]: hex }); repaintCard(); return;
    case "ovc":
      S.ovColor = hex;
      app.querySelectorAll('[data-act="ovcolor"]').forEach(n => n.classList.toggle("on", n.dataset.oc === hex));
      repaintCard();
      return;
  }
}
function wrapSel(styles, tidy) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) return;
  snap(true);
  const r = sel.getRangeAt(0);
  const span = document.createElement("span");
  Object.keys(styles).forEach(k => { span.style[k] = styles[k]; });
  try { r.surroundContents(span); }
  catch (e) { span.appendChild(r.extractContents()); r.insertNode(span); }
  if (tidy) tidy(span);
  const nr = document.createRange();
  nr.selectNodeContents(span);
  sel.removeAllRanges(); sel.addRange(nr);
  syncFromSelection(); measure();
}
function selScale(f) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const node = firstTextParent(sel.getRangeAt(0));
  const now = (node ? parseFloat(getComputedStyle(node).fontSize) : 12) * pxK();
  const up = f > 1;
  let next = up ? FS_STEPS.find(v => v > now + 0.5) : FS_STEPS.slice().reverse().find(v => v < now - 0.5);
  const r = Math.round(now);
  if (next == null) next = up ? (Math.floor(r / 32) + 1) * 32 : Math.max(1, (Math.ceil(r / 2) - 1) * 2);
  setSelSize(next);
}
function setSelSize(px) {
  const d = Math.max(0.01, Math.round(px / pxK() * 100) / 100);
  const sel = window.getSelection();
  if (sel && sel.rangeCount && !sel.isCollapsed) {
    const r = sel.getRangeAt(0), n = firstTextParent(r);
    const sp = n && n.closest ? n.closest('span[style*="font-size"]') : null;
    const host = sp && sp.closest("[contenteditable]");
    if (sp && host && host !== sp && r.toString() && sp.textContent === r.toString()) {
      snap(true);
      sp.style.fontSize = d + "px";
      stripSizes(sp);
      const nr = document.createRange();
      nr.selectNodeContents(sp);
      sel.removeAllRanges(); sel.addRange(nr);
      syncFromSelection(); measure();
      return;
    }
  }
  wrapSel({ fontSize: d + "px", lineHeight: "1.25" }, stripSizes);
}
function stripSizes(root) {
  root.querySelectorAll('[style*="font-size"]').forEach(n => {
    n.style.fontSize = ""; n.style.lineHeight = "";
    if (n.tagName === "SPAN" && !n.getAttribute("style").trim() && n.attributes.length === 1) {
      while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
      n.remove();
    }
  });
}
function defaultPName() {
  const used = (S.presets || []).map(p => p.name);
  for (let i = 1; i <= 99; i++) { const n = "프리셋 " + i; if (used.indexOf(n) < 0) return n; }
  return "프리셋";
}
let pdlgFocus = false;
function openPDlg(mode, id) {
  const p = id ? (S.presets || []).find(x => x.id === id) : null;
  if (mode === "edit" && !p) return;
  pdlgFocus = true;
  set({ pdlg: { mode: mode, id: id || "", name: p ? p.name : defaultPName() } });
}
function commitPDlg() {
  const d = S.pdlg;
  if (!d) return;
  const name = String(d.name || "").trim().slice(0, PNAME_MAX) || defaultPName();
  const list = (S.presets || []).slice();
  if (d.mode === "edit") {
    const i = list.findIndex(p => p.id === d.id);
    if (i < 0) { set({ pdlg: null }); return; }
    list[i] = Object.assign({}, list[i], { name: name });
  } else {
    const i = list.findIndex(p => p.name === name);
    if (i >= 0) list[i] = presetOf(list[i].id, name);
    else if (list.length >= PRESET_MAX) {
      set({ pdlg: null });
      flash("프리셋은 " + PRESET_MAX + "개까지 저장됩니다");
      return;
    } else list.unshift(presetOf(newPid(), name));
  }
  savePresets(list);
  set({ presets: list, pdlg: null });
  flash(d.mode === "edit" ? "이름을 바꿨습니다" : "'" + name + "' 저장했습니다");
}
function overwriteP() {
  const d = S.pdlg;
  if (!d) return;
  const list = (S.presets || []).slice();
  const i = list.findIndex(p => p.id === d.id);
  if (i < 0) { set({ pdlg: null }); return; }
  const name = String(d.name || "").trim().slice(0, PNAME_MAX) || list[i].name;
  list[i] = presetOf(list[i].id, name);
  savePresets(list);
  set({ presets: list, pdlg: null });
  flash("'" + name + "' 에 지금 설정을 덮어썼습니다");
}
function delP(id) {
  const p = (S.presets || []).find(x => x.id === id);
  if (!p) return;
  set({ cdlg: { title: "'" + p.name + "' 프리셋을 지울까요?", ok: "지우기", act: "delp", id: id } });
}
function delPNow(id) {
  const list = (S.presets || []).filter(x => x.id !== id);
  savePresets(list);
  set({ presets: list, pedit: list.length ? S.pedit : false, pdlg: null, cdlg: null });
  flash("지웠습니다");
}
function openXDlg(mode, id) {
  if (mode === "export") {
    const p = id ? presetById(id) : { name: "내 테마", v: pickPreset(S) };
    if (!p) return;
    set({ pdlg: null, xdlg: { mode: "export", name: p.name, code: presetCode(p) } });
  } else set({ pdlg: null, xdlg: { mode: "import", code: "", err: "" } });
}
function copyXCode() {
  const d = S.xdlg;
  if (!d) return;
  const ta = app.querySelector("textarea[data-xcode]");
  const pick = () => { if (ta) { ta.focus(); ta.select(); try { ta.setSelectionRange(0, ta.value.length); } catch (e) {} } };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(d.code).then(() => flash("공유 코드를 복사했습니다"), () => { pick(); flash("골라 둔 코드를 길게 눌러 복사하세요"); });
  } else {
    pick();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    flash(ok ? "공유 코드를 복사했습니다" : "골라 둔 코드를 길게 눌러 복사하세요");
  }
}
function commitXImport() {
  const d = S.xdlg;
  if (!d) return;
  const ta = app.querySelector("textarea[data-xcode]");
  const code = ta ? ta.value : d.code;
  const r = readPresetCode(code);
  if (!r) { set({ xdlg: { mode: "import", code: code, err: "읽을 수 없는 코드입니다. EXC1: 로 시작하는 글 전체를 붙여넣어 주세요." } }); return; }
  const list = (S.presets || []).slice();
  if (list.length >= PRESET_MAX) {
    set({ xdlg: { mode: "import", code: code, err: "프리셋은 " + PRESET_MAX + "개까지 저장됩니다. 하나를 지운 뒤 다시 가져와 주세요." } });
    return;
  }
  let name = r.name || defaultPName();
  const used = list.map(p => p.name);
  for (let i = 2; used.indexOf(name) >= 0 && i < 99; i++) name = (r.name || "프리셋").slice(0, PNAME_MAX - 3) + " " + i;
  const np = { id: newPid(), name: name, v: r.v };
  if (r.bs) np.bs = r.bs;
  if (r.side) np.side = r.side;
  list.unshift(np);
  savePresets(list);
  set({ presets: list, xdlg: null });
  track("preset_import", { presets: nBucket(list.length) });
  flash("'" + name + "' 가져왔습니다 · 눌러서 적용");
}

const HROW = ".chips, .demos, .tplcats";
function updateChipFades() {
  app.querySelectorAll(".chipwrap").forEach(w => {
    const c = w.querySelector(HROW);
    if (!c) return;
    const max = c.scrollWidth - c.clientWidth;
    w.classList.toggle("can-l", max > 2 && c.scrollLeft > 2);
    w.classList.toggle("can-r", max > 2 && c.scrollLeft < max - 2);
  });
}
const rowScrolls = (root) => Array.from(root.querySelectorAll(HROW), c => c.scrollLeft);
function restoreRowScrolls(root, xs) {
  root.querySelectorAll(HROW).forEach((c, i) => { if (xs[i]) c.scrollLeft = xs[i]; });
}
function rowStep(btn, d) {
  const w = btn.closest(".chipwrap"), c = w && w.querySelector(HROW);
  if (!c) return;
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  c.scrollBy({ left: d * Math.max(120, c.clientWidth * 0.8), behavior: reduce ? "auto" : "smooth" });
}
app.addEventListener("scroll", (e) => {
  if (e.target && e.target.matches && e.target.matches(HROW)) updateChipFades();
}, true);
app.addEventListener("wheel", (e) => {
  const c = e.target.closest && e.target.closest(HROW);
  if (!c || c.scrollWidth <= c.clientWidth) return;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  c.scrollLeft += e.deltaY;
  e.preventDefault();
}, { passive: false });

function tplStep(d) {
  const L = tplList().some(x => x.id === S.tplpv) ? tplList() : mineTpls().concat(TEMPLATES);
  const n = L.length, i = L.findIndex(x => x.id === S.tplpv);
  set({ tplpv: L[(i + d + n) % n].id });
}
let tplSwipe = null;
app.addEventListener("touchstart", (e) => {
  const st = e.target.closest && e.target.closest(".tplpv-stage");
  tplSwipe = st && e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
app.addEventListener("touchend", (e) => {
  if (!tplSwipe || !S.tplpv) return;
  const t = e.changedTouches[0], dx = t.clientX - tplSwipe.x, dy = t.clientY - tplSwipe.y;
  tplSwipe = null;
  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
  tplStep(dx < 0 ? 1 : -1);
}, { passive: true });

let subSwipe = null;
function hScrolls(n, stop) {
  for (; n && n !== stop; n = n.parentElement) {
    if (n.scrollWidth > n.clientWidth + 2) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
  }
  return false;
}
app.addEventListener("touchstart", (e) => {
  subSwipe = null;
  if (e.touches.length !== 1 || !e.target.closest) return;
  const t = e.target, pb = t.closest(".panel-body");
  if (!pb || !pb.querySelector(".subnav")) return;
  if (t.closest('input, textarea, select, [contenteditable="true"], [data-cpk], [data-npad], .subnav') || hScrolls(t, pb)) return;
  subSwipe = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
}, { passive: true });
app.addEventListener("touchend", (e) => {
  if (!subSwipe) return;
  const t = e.changedTouches[0], dx = t.clientX - subSwipe.x, dy = t.clientY - subSwipe.y, dt = Date.now() - subSwipe.t;
  subSwipe = null;
  if (dt > 700 || Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
  const bs = [...app.querySelectorAll(".panel-body .subnav button")];
  const nb = bs[bs.findIndex(b => b.classList.contains("on")) + (dx < 0 ? 1 : -1)];
  if (!nb) return;
  swipeHintDone();
  nb.click();
  const on = app.querySelector(".panel-body .subnav button.on");
  if (on) on.scrollIntoView({ block: "nearest", inline: "nearest" });
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  app.querySelectorAll(".panel-body .stack > .panehead ~ *").forEach(n => n.animate &&
    n.animate([{ transform: "translateX(" + (dx < 0 ? 28 : -28) + "px)", opacity: 0.35 }, { transform: "none", opacity: 1 }],
      { duration: 180, easing: "cubic-bezier(.2,.7,.3,1)" }));
}, { passive: true });

const natDims = {}, natLoading = {};
function natSize(url) {
  if (!url) return null;
  if (natDims[url]) return natDims[url];
  if (!natLoading[url]) {
    natLoading[url] = true;
    const im = new Image();
    im.onload = () => { natDims[url] = [im.naturalWidth, im.naturalHeight]; };
    im.src = url;
  }
  return null;
}
let panGes = null, sideGone = null;
function panStart(el, pts, rz) {
  const sd = sidePic();
  if (!sd || !sd.m) return null;
  snap(true);
  if (sd.pos === "on") {
    const card = el.closest(".card");
    const cw = card ? card.offsetWidth : 300, ch = card ? card.offsetHeight : 300;
    return { on: true, rz: !!rz, el: el, k: el.getBoundingClientRect().width / (el.offsetWidth || 1) || 1, cw: cw, ch: ch,
      ox: sd.ox, oy: sd.oy, size: sd.size, ar: sd.ar, pts: pts, moved: false };
  }
  const bw = el.offsetWidth, bh = el.offsetHeight;
  const nat = natSize(mediaURL(sd.m)) || [bw, bh];
  const s = sd.fit === "contain" ? Math.min(bw / nat[0], bh / nat[1]) : Math.max(bw / nat[0], bh / nat[1]);
  return { el: el, k: el.getBoundingClientRect().width / bw || 1, bw: bw, bh: bh, rw: nat[0] * s, rh: nat[1] * s,
    fx: sd.fx, fy: sd.fy, zoom: sd.zoom, flip: sd.flip, pts: pts, moved: false };
}
const ptsMid = (p) => [(p[0][0] + (p[1] || p[0])[0]) / 2, (p[0][1] + (p[1] || p[0])[1]) / 2];
const ptsDist = (p) => p[1] ? Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]) : 0;
function panMove(pts) {
  const g = panGes;
  if (!g) return;
  if (g.on) {
    const m0 = ptsMid(g.pts), m1 = ptsMid(pts);
    const dx = (m1[0] - m0[0]) / g.k, dy = (m1[1] - m0[1]) / g.k;
    let size = g.size, ox = g.ox, oy = g.oy;
    if (pts[1] && g.pts[1]) size = g.size * ptsDist(pts) / (ptsDist(g.pts) || 1);
    if (g.rz) size = g.size + dx * 2 / g.cw * 100;
    else { ox = g.ox + dx / g.cw * 100; oy = g.oy + dy / g.ch * 100; }
    size = Math.max(SIDE_LIM.size[0], Math.min(SIDE_LIM.size[1], Math.round(size)));
    ox = Math.max(0, Math.min(100, Math.round(ox * 10) / 10)); oy = Math.max(0, Math.min(100, Math.round(oy * 10) / 10));
    if (Math.abs(dx) + Math.abs(dy) > 3 || size !== g.size) g.moved = true;
    S.side = Object.assign({}, S.side, { ox: ox, oy: oy, size: size });
    const fw = g.cw * size / 100, fh = fw * g.ar / 100;
    app.querySelectorAll(".card .on-card").forEach(n => Object.assign(n.style, { left: "calc(" + ox + "% - " + r1(fw / 2) + "px)", top: "calc(" + oy + "% - " + r1(fh / 2) + "px)", width: r1(fw) + "px", height: r1(fh) + "px" }));
    return;
  }
  let zoom = g.zoom;
  if (pts[1] && g.pts[1]) zoom = Math.max(100, Math.min(300, Math.round(g.zoom * ptsDist(pts) / (ptsDist(g.pts) || 1))));
  const m0 = ptsMid(g.pts), m1 = ptsMid(pts);
  let dx = (m1[0] - m0[0]) / g.k, dy = (m1[1] - m0[1]) / g.k;
  if (Math.abs(dx) + Math.abs(dy) > 3 || zoom !== g.zoom) g.moved = true;
  if (g.flip) dx = -dx;
  const z = zoom / 100, ax = g.bw - z * g.rw, ay = g.bh - z * g.rh;
  const clampP = (v) => Math.max(0, Math.min(100, Math.round(v * 10) / 10));
  const fx = Math.abs(ax) < 1 ? g.fx : clampP(g.fx + dx / ax * 100);
  const fy = Math.abs(ay) < 1 ? g.fy : clampP(g.fy + dy / ay * 100);
  S.side = Object.assign({}, S.side, { fx: fx, fy: fy, zoom: zoom });
  const pic = g.el.querySelector(".pic .pic");
  if (pic) {
    pic.style.backgroundPosition = fx + "% " + fy + "%";
    pic.style.transformOrigin = fx + "% " + fy + "%";
    pic.style.transform = "scale(" + z + ")";
  }
}
function panRebase(el, pts, rz) { const g = panStart(el, pts, rz); if (g && panGes) g.moved = panGes.moved; panGes = g; }
function panEnd() {
  if (!panGes) return;
  const moved = panGes.moved;
  panGes = null;
  if (moved) render();
}
const touchPts = (e) => Array.from(e.touches).slice(0, 2).map(t => [t.clientX, t.clientY]);
app.addEventListener("touchstart", (e) => {
  const el = e.target.closest && e.target.closest(".card-side.movable");
  if (!el || S.preview) return;
  panRebase(el, touchPts(e), e.touches.length === 1 && !!e.target.closest("[data-rz]"));
}, { passive: true });
app.addEventListener("touchmove", (e) => {
  if (!panGes) return;
  e.preventDefault();
  panMove(touchPts(e));
}, { passive: false });
app.addEventListener("touchend", (e) => {
  if (!panGes) return;
  if (e.touches.length) panRebase(panGes.el, touchPts(e), panGes.rz && e.touches.length === 1); else panEnd();
});
app.addEventListener("touchcancel", panEnd);
app.addEventListener("mousedown", (e) => {
  if (e.button !== 0 || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
  const el = e.target.closest && e.target.closest(".card-side.movable");
  if (!el || S.preview || panGes) return;
  e.preventDefault();
  panGes = panStart(el, [[e.clientX, e.clientY]], !!e.target.closest("[data-rz]"));
});
document.addEventListener("mousemove", (e) => { if (panGes && !panGes.pts[1]) panMove([[e.clientX, e.clientY]]); });
document.addEventListener("mouseup", () => { if (panGes && !panGes.pts[1]) panEnd(); });
let panWheelT = 0;
app.addEventListener("wheel", (e) => {
  const el = e.target.closest && e.target.closest(".card-side.movable");
  if (!el || S.preview) return;
  e.preventDefault();
  if (!panWheelT) snap(true);
  const sd = sidePic();
  if (sd.pos === "on") {
    const size = Math.max(SIDE_LIM.size[0], Math.min(SIDE_LIM.size[1], Math.round(sd.size * (e.deltaY < 0 ? 1.05 : 1 / 1.05))));
    S.side = Object.assign({}, S.side, { size: size });
    const card = el.closest(".card"), cw = card ? card.offsetWidth : 300, fw = cw * size / 100, fh = fw * sd.ar / 100;
    app.querySelectorAll(".card .on-card").forEach(n => Object.assign(n.style, { left: "calc(" + sd.ox + "% - " + r1(fw / 2) + "px)", top: "calc(" + sd.oy + "% - " + r1(fh / 2) + "px)", width: r1(fw) + "px", height: r1(fh) + "px" }));
    clearTimeout(panWheelT);
    panWheelT = setTimeout(() => { panWheelT = 0; render(); }, 250);
    return;
  }
  const z = Math.max(100, Math.min(300, Math.round(sd.zoom * (e.deltaY < 0 ? 1.06 : 1 / 1.06))));
  S.side = Object.assign({}, S.side, { zoom: z });
  const pic = el.querySelector(".pic .pic");
  if (pic) pic.style.transform = "scale(" + z / 100 + ")";
  clearTimeout(panWheelT);
  panWheelT = setTimeout(() => { panWheelT = 0; render(); }, 250);
}, { passive: false });
app.addEventListener("dblclick", (e) => {
  const el = e.target.closest && e.target.closest(".card-side.movable");
  if (!el || S.preview) return;
  snap(true);
  set({ side: Object.assign({}, S.side, { fx: 50, fy: 50, zoom: 100 }) });
  flash("사진을 가운데·100% 로 되돌렸어요");
});

let phLast = 0;
app.addEventListener("scroll", (e) => {
  const pb = e.target;
  if (!pb.classList || !pb.classList.contains("panel-body")) return;
  const head = pb.querySelector(".panehead");
  const st = pb.scrollTop, small = pb.clientHeight < 520;
  if (!head || !small) { pb.classList.remove("ph-hide"); phLast = st; return; }
  const hh = head.offsetHeight;
  if (st <= hh) { pb.classList.remove("ph-hide"); phLast = st; }
  else if (st > phLast + 6) { pb.classList.add("ph-hide"); phLast = st; }
  else if (st < phLast - 6) { pb.classList.remove("ph-hide"); phLast = st; }
}, true);

function nudgeTo(k, v, quiet) {
  const ids = tgtIds();
  if (!ids.length) return;
  snap(true);
  ids.forEach(id => { const x = S.blocks.find(y => y.id === id); if (!x) return; if (Math.round(v)) x[k] = Math.round(v); else delete x[k]; });
  if (quiet) { S.blocks = S.blocks.slice(); return; }
  set({ blocks: S.blocks.slice() });
}
let npadDrag = null, npadTap = 0;
app.addEventListener("pointerdown", (e) => {
  const pad = e.target.closest && e.target.closest("[data-npad]");
  if (!pad || e.button > 0 || e.target.closest(".npad-b")) return;
  const ids = tgtIds();
  if (!ids.length) return;
  e.preventDefault();
  const now = Date.now();
  if (now - npadTap < 350) {
    npadTap = 0;
    snap(true); ids.forEach(id => { const x = S.blocks.find(y => y.id === id); if (x) { delete x.nx; delete x.ny; } }); set({ blocks: S.blocks.slice() });
    return;
  }
  npadTap = now;
  snap(true);
  npadDrag = { x: e.clientX, y: e.clientY, pid: e.pointerId, base: ids.map(id => { const x = S.blocks.find(y => y.id === id); return [id, x ? x.nx || 0 : 0, x ? x.ny || 0 : 0]; }) };
});
window.addEventListener("pointermove", (e) => {
  const d = npadDrag;
  if (!d || e.pointerId !== d.pid) return;
  const dx = Math.round(e.clientX - d.x), dy = Math.round(e.clientY - d.y);
  d.base.forEach(([id, bx, by]) => { const x = S.blocks.find(y => y.id === id); if (x) { x.nx = bx; x.ny = by; nudgeBy(x, dx, dy); } });
  render();
});
const npadEnd = (e) => { if (npadDrag && e.pointerId === npadDrag.pid) { npadDrag = null; set({ blocks: S.blocks.slice() }); } };
window.addEventListener("pointerup", npadEnd);
window.addEventListener("pointercancel", npadEnd);
function nudgeBy(b, dx, dy) {
  const nx = clampN((b.nx || 0) + dx, -400, 400), ny = clampN((b.ny || 0) + dy, -400, 400);
  if (nx) b.nx = nx; else delete b.nx;
  if (ny) b.ny = ny; else delete b.ny;
}
let imgGes = null, imgSwallow = 0;
const imgPtrs = new Map();
function imgGesBase(el) {
  const b = S.blocks.find(x => x.id === el.dataset.imgb);
  if (!b) return null;
  const pic = el.querySelector(".ipic");
  const bw = el.offsetWidth || 1, bh = el.offsetHeight || 1;
  const url = imgURLOf(b), nat = natSize(url) || [bw, bh];
  const sc = Math.max(bw / nat[0], bh / nat[1]);
  return { el: el, pic: pic, b: b, k: el.getBoundingClientRect().width / bw || 1, bw: bw, bh: bh, rw: nat[0] * sc, rh: nat[1] * sc,
    x: b.imgX == null ? 50 : b.imgX, y: b.imgY == null ? 50 : b.imgY, z: b.imgZ || 100, pts: [...imgPtrs.values()].map(p => p.slice()), moved: false,
    r: el.getBoundingClientRect() };
}
function imgEdge(B, R, v, z) {
  const vc = clampN(v, 0, 100), o = z >= 1 ? vc / 100 * B : B / 2;
  return o + z * ((B - R) * vc / 100 - o) + (vc - v) / 100 * B;
}
function imgSolve(B, R, z, target, prev) {
  const find = (ok) => { let lo = IMG_POS[0], hi = IMG_POS[1]; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (ok(m)) hi = m; else lo = m; } return hi; };
  const a = find(v => imgEdge(B, R, v, z) <= target + 0.25);
  const c = find(v => imgEdge(B, R, v, z) < target - 0.25);
  return Math.round(clampN(prev, Math.min(a, c), Math.max(a, c)) * 10) / 10;
}
function imgGesApply() {
  const g = imgGes, b = g.b, pts = [...imgPtrs.values()];
  let z = g.z;
  if (pts[1] && g.pts[1]) z = clampN(Math.round(g.z * ptsDist(pts) / (ptsDist(g.pts) || 1)), IMG_ZOOM[0], IMG_ZOOM[1]);
  const m0 = ptsMid(g.pts), m1 = ptsMid(pts);
  const dx = (m1[0] - m0[0]) / g.k, dy = (m1[1] - m0[1]) / g.k;
  if (Math.abs(dx) + Math.abs(dy) > 3 || z !== g.z) g.moved = true;
  if (!g.moved) return;
  const z0 = g.z / 100, zz = z / 100;
  const ax = (m0[0] - g.r.left) / g.k, ay = (m0[1] - g.r.top) / g.k;
  const e0x = imgEdge(g.bw, g.rw, g.x, z0), e0y = imgEdge(g.bh, g.rh, g.y, z0);
  b.imgX = imgSolve(g.bw, g.rw, zz, ax + dx - (ax - e0x) * zz / z0, g.x);
  b.imgY = imgSolve(g.bh, g.rh, zz, ay + dy - (ay - e0y) * zz / z0, g.y);
  if (z === 100) delete b.imgZ; else b.imgZ = z;
  if (g.pic) Object.assign(g.pic.style, imgLayerCSS(b.imgX, b.imgY, zz));
}
app.addEventListener("pointerdown", (e) => {
  const el = e.target.closest && e.target.closest("[data-imgb]");
  if (!el || S.preview || e.button > 0) return;
  if (imgGes && imgGes.el !== el) return;
  imgPtrs.set(e.pointerId, [e.clientX, e.clientY]);
  try { el.setPointerCapture(e.pointerId); } catch (err) {}
  const was = imgGes;
  if (!was) snap(true);
  imgGes = imgGesBase(el);
  if (imgGes && was) imgGes.moved = was.moved;
});
app.addEventListener("pointermove", (e) => {
  if (!imgGes || !imgPtrs.has(e.pointerId)) return;
  imgPtrs.set(e.pointerId, [e.clientX, e.clientY]);
  imgGesApply();
});
function imgGesUp(e) {
  if (!imgGes || !imgPtrs.has(e.pointerId)) return;
  imgPtrs.delete(e.pointerId);
  if (imgPtrs.size) { const mv = imgGes.moved; imgGes = imgGesBase(imgGes.el); if (imgGes) imgGes.moved = mv; return; }
  const moved = imgGes.moved;
  imgGes = null;
  if (moved) { imgSwallow = Date.now(); render(); }
}
app.addEventListener("pointerup", imgGesUp);
app.addEventListener("pointercancel", imgGesUp);
app.addEventListener("click", (e) => {
  if (Date.now() - imgSwallow < 400 && e.target.closest && e.target.closest("[data-imgb]")) { e.stopPropagation(); e.preventDefault(); }
}, true);
let imgWheelT = 0;
app.addEventListener("wheel", (e) => {
  const el = e.target.closest && e.target.closest("[data-imgb]");
  if (!el || S.preview) return;
  const b = S.blocks.find(x => x.id === el.dataset.imgb);
  if (!b) return;
  e.preventDefault();
  if (!imgWheelT) snap(true);
  const z = clampN(Math.round((b.imgZ || 100) * (e.deltaY < 0 ? 1.06 : 1 / 1.06)), IMG_ZOOM[0], IMG_ZOOM[1]);
  if (z === 100) delete b.imgZ; else b.imgZ = z;
  const pic = el.querySelector(".ipic");
  if (pic) Object.assign(pic.style, imgLayerCSS(b.imgX == null ? 50 : b.imgX, b.imgY == null ? 50 : b.imgY, z / 100));
  clearTimeout(imgWheelT);
  imgWheelT = setTimeout(() => { imgWheelT = 0; render(); }, 250);
}, { passive: false });
app.addEventListener("dblclick", (e) => {
  const el = e.target.closest && e.target.closest("[data-imgb]");
  if (!el || S.preview) return;
  const b = S.blocks.find(x => x.id === el.dataset.imgb);
  if (!b) return;
  snap(true); b.imgX = 50; b.imgY = 50; delete b.imgZ; render();
  flash("사진을 가운데·100% 로 되돌렸어요");
});

document.addEventListener("keydown", (e) => {
  if (!e.altKey || S.screen === "input" || S.preview) return;
  const d = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
  if (!d) return;
  const a = document.activeElement;
  if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return;
  const ids = tgtIds();
  if (!ids.length) return;
  e.preventDefault();
  const k = e.shiftKey ? 10 : 1;
  snap();
  ids.forEach(id => { const x = S.blocks.find(y => y.id === id); if (x) nudgeBy(x, d[0] * k, d[1] * k); });
  set({ blocks: S.blocks.slice() });
});

let plDrag = null;
function plAt(x) {
  const g = plDrag, r = g.el.getBoundingClientRect();
  const p = Math.round(Math.max(0, Math.min(1, (x - r.left) / (r.width || 1))) * 1000) / 10;
  const b = S.blocks.find(y => y.id === g.id);
  if (!b) return;
  b.prog = p; plSync(b);
  const fill = g.el.children[0], knob = g.el.children[1];
  if (fill) fill.style.width = p + "%";
  if (knob) knob.style.left = p + "%";
  const blk = g.el.closest("[data-block]"), eds = blk ? blk.querySelectorAll("[contenteditable]") : [];
  if (eds[0]) eds[0].textContent = txt[key(b.id, 0)];
  if (eds[1]) eds[1].textContent = txt[key(b.id, 1)];
  g.moved = true;
}
app.addEventListener("pointerdown", (e) => {
  const el = e.target.closest && e.target.closest("[data-plbar]");
  if (!el || S.preview || e.button > 0) return;
  e.preventDefault();
  snap(true);
  plDrag = { el: el, id: el.dataset.plbar, moved: false };
  if (S.active !== plDrag.id) S.active = plDrag.id;
  plAt(e.clientX);
});
document.addEventListener("pointermove", (e) => { if (plDrag) plAt(e.clientX); });
document.addEventListener("pointerup", () => { if (!plDrag) return; plDrag = null; render(); });
document.addEventListener("pointercancel", () => { if (!plDrag) return; plDrag = null; render(); });

let pinch = null, pinchOn = false, pinchDirty = false;
const pinchDist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

function applyPinchZoom(kRaw, cx, cy) {
  const k = Math.max(ZK_MIN, Math.min(ZK_MAX, Math.round(kRaw * 100) / 100));
  const prev = S.zoomK || 1;
  if (k === prev) return;
  const sc = app.querySelector(".stage-scroll");
  S.zoomK = k;
  app.className = shellClass();
  fitCard();
  const lbl = app.querySelector('[data-act="zoomreset"]');
  if (lbl) lbl.textContent = Math.round(k * 100) + "%";
  if (sc) {
    const r = sc.getBoundingClientRect(), f = k / prev;
    const mx = cx - r.left, my = cy - r.top;
    sc.scrollLeft = (sc.scrollLeft + mx) * f - mx;
    sc.scrollTop = (sc.scrollTop + my) * f - my;
  }
}

app.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 2 || S.preview || kbFold || S.screen === "input") return;
  for (let i = 0; i < 2; i++) {
    const n = e.touches[i].target;
    if (!n || !n.closest || !n.closest(".stage")) return;
    if (n.closest(".card-side.movable")) return;
    if (n.closest("[data-imgb]")) return;
  }
  pinch = { d0: pinchDist(e.touches), k0: S.zoomK || 1 };
  pinchHintDone();
  pinchOn = true;
  app.className = shellClass();
}, { passive: true });

app.addEventListener("touchmove", (e) => {
  if (!pinch || e.touches.length !== 2) return;
  e.preventDefault();
  applyPinchZoom(
    pinch.k0 * pinchDist(e.touches) / pinch.d0,
    (e.touches[0].clientX + e.touches[1].clientX) / 2,
    (e.touches[0].clientY + e.touches[1].clientY) / 2
  );
}, { passive: false });

app.addEventListener("touchend", (e) => {
  if (pinch && e.touches.length < 2) {
    pinch = null; pinchOn = false; pinchDirty = true;
    app.className = shellClass();
  }
  if (pinchDirty && e.touches.length === 0) { pinchDirty = false; render(); }
});
app.addEventListener("touchcancel", () => {
  if (!pinch && !pinchDirty) return;
  pinch = null; pinchOn = false; pinchDirty = false;
  render();
});

let wheelZoomT = 0;
app.addEventListener("wheel", (e) => {
  if (!e.ctrlKey) return;
  const st = e.target.closest && e.target.closest(".stage");
  if (!st || S.preview || kbFold || S.screen === "input") return;
  e.preventDefault();
  applyPinchZoom((S.zoomK || 1) * (e.deltaY < 0 ? 1.08 : 1 / 1.08), e.clientX, e.clientY);
  clearTimeout(wheelZoomT);
  wheelZoomT = setTimeout(render, 250);
}, { passive: false });

function applyP(p, quiet) {
  if (!p || !p.v) return;
  const v = Object.assign(pickPreset(S0), p.v);
  let note = "";
  if (v.bgImage && !bgURL) { v.bgImage = false; note = " · 배경 사진은 다시 넣어 주세요"; }
  v.fontCat = fontOf(v.famKey).c;
  ["padY", "colGap"].forEach(k => { if (v[k] === undefined) v[k] = null; });
  v.scaleBase = +v.scale || 1;
  let nb = 0;
  if (p.bs) {
    const byT = {}, seen = {};
    p.bs.forEach(x => { (byT[x.t] = byT[x.t] || []).push(x); });
    v.blocks = S.blocks.map(b => {
      const list = byT[b.type];
      if (!list) return b;
      const n = seen[b.type] = (seen[b.type] || 0) + 1;
      const st = list[Math.min(n, list.length) - 1];
      const nbk = Object.assign({}, b);
      PBS_KEYS.forEach(k => { delete nbk[k]; if (st[k] != null) nbk[k] = st[k]; });
      nb++;
      return nbk;
    });
  }
  if (p.side) v.side = Object.assign({}, p.side, S.side && S.side.m ? { m: S.side.m } : {});
  set(Object.assign(v, { fit: 1, page: 0 }));
  if (!quiet) flash(p.name + " 적용" + (nb ? " · 블록 서식 " + nb + "개" : "") + note);
}

let pickTarget = null;
function openPicker(target) { pickTarget = target; filepick.value = ""; filepick.click(); }
filepick.addEventListener("change", () => {
  const f = filepick.files && filepick.files[0];
  const target = pickTarget;
  pickTarget = null;
  if (!f || !target) return;
  useImageFile(f, target);
});
const multipick = document.createElement("input");
multipick.type = "file"; multipick.accept = "image/*"; multipick.multiple = true; multipick.hidden = true;
document.body.appendChild(multipick);
let multiTarget = null;
function openMultiPicker(id) { multiTarget = id; multipick.value = ""; multipick.click(); }
multipick.addEventListener("change", () => {
  const b = S.blocks.find(x => x.id === multiTarget);
  multiTarget = null;
  addPics(b, Array.from(multipick.files || []).filter(f => /^image\//.test(f.type)));
});
function useImageFile(f, target) {
  const url = URL.createObjectURL(f);
  if (target === "bg") { bgURL = url; bgBlob = f; bgKey++; S.bgImage = true; render(); return; }
  if (target === "decoimg") {
    const id = addMedia(url, f);
    S.decoImg = id;
    const k = decoImgPending; decoImgPending = null;
    if (k) decoCmd(k, id); else render();
    return;
  }
  if (target === "side") {
    const id = addMedia(url, f); snap(true); set({ side: Object.assign({}, S.side || SIDE0, { m: id }), fit: 1 });
    flash(coarsePtr.matches ? "사진을 밀어 위치를, 두 손가락으로 크기를 맞춰요" : "사진을 끌어 위치를, 휠로 크기를 맞춰요 · 두 번 누르면 처음대로");
    return;
  }
  const b = S.blocks.find(x => x.id === target);
  if (b) assignImg(b, addMedia(url, f)); else render();
}

let dropMark = null, dropTip = null;
const hasFiles = (e) => !!(e.dataTransfer && Array.from(e.dataTransfer.types || []).indexOf("Files") >= 0);
function dropTargetAt(el) {
  if (S.screen !== "edit" || S.preview) return null;
  const blk = el && el.closest ? el.closest("[data-block]") : null;
  if (blk) {
    const b = S.blocks.find(x => x.id === blk.dataset.block);
    const kind = b && (TYPES[b.type] || {}).kind;
    if (kind === "photo") return { id: b.id, node: blk, label: "이 사진 블록에 넣기" };
    if (kind === "book") return { id: b.id, node: blk, label: "책 표지로 넣기" };
    if (kind === "track") return { id: b.id, node: blk, label: "앨범아트로 넣기" };
    if (kind === "notif") return { id: b.id, node: blk, label: "앱 아이콘으로 넣기" };
    if (kind === "post") return { id: b.id, node: blk, label: "프로필 사진으로 넣기" };
    if (kind === "avatar" && el.closest(".face")) return { id: b.id, node: blk, label: "이 인물 얼굴로 넣기" };
    if (kind === "avatar" || kind === "bubble") return { id: b.id, node: blk, label: "이 메시지에 사진 붙이기", pics: true };
  }
  const sideEl = el && el.closest ? el.closest("[data-side]") : null;
  if (sideEl) return { id: "side", node: sideEl, label: "이미지 패널에 넣기" };
  const card = app.querySelector(".card");
  return card ? { id: "bg", node: card, label: bgURL ? "배경 사진 바꾸기" : "배경 사진으로 넣기" } : null;
}
function markDrop(t) {
  if (dropMark && (!t || dropMark !== t.node)) dropMark.classList.remove("drop-target");
  dropMark = t ? t.node : null;
  if (!t) { if (dropTip) { dropTip.remove(); dropTip = null; } return; }
  t.node.classList.add("drop-target");
  if (!dropTip) { dropTip = document.createElement("div"); dropTip.className = "droptip"; document.body.appendChild(dropTip); }
  dropTip.textContent = t.label;
  const r = t.node.getBoundingClientRect();
  dropTip.style.left = Math.round(r.left + r.width / 2) + "px";
  dropTip.style.top = Math.round(Math.max(r.top, 0) + 12) + "px";
}
document.addEventListener("dragover", (e) => {
  if (!hasFiles(e)) return;
  e.preventDefault();
  const t = dropTargetAt(e.target);
  e.dataTransfer.dropEffect = t ? "copy" : "none";
  markDrop(t);
});
document.addEventListener("dragleave", (e) => {
  if (hasFiles(e) && !e.relatedTarget) markDrop(null);
});
document.addEventListener("drop", (e) => {
  if (!hasFiles(e)) return;
  e.preventDefault();
  const t = dropTargetAt(e.target);
  markDrop(null);
  const imgs = Array.from(e.dataTransfer.files || []).filter(x => /^image\//.test(x.type));
  const f = imgs[0];
  if (t && t.pics && imgs.length) { addPics(S.blocks.find(x => x.id === t.id), imgs); return; }
  if (!t) { flash(S.screen === "edit" ? "미리보기를 닫고 놓아 주세요" : "글을 넣어 편집 화면을 연 뒤 사진을 놓아 주세요"); return; }
  if (!f) { flash("사진 파일만 넣을 수 있어요"); return; }
  useImageFile(f, t.id);
  flash(t.id === "bg" ? "배경 사진을 넣었어요" : t.id === "side" ? "이미지 패널에 넣었어요" : "사진을 넣었어요");
});

const coarsePtr = window.matchMedia("(pointer: coarse)");
app.addEventListener("mousedown", (e) => {
  const hold = e.target.closest("[data-hold]");
  if (hold) {
    const a = document.activeElement;
    if (a && a.matches && a.matches("input[data-num]") && a.dataset.num !== "sel" && a.dataset.num !== "alpha") commitNum(a, true);
    e.preventDefault();
    return;
  }
  if (!(e.shiftKey || e.ctrlKey || e.metaKey) && !S.pickOn && !S.brush && !S.preview && S.screen === "edit" &&
      pickedIds().length && e.target.closest(".card [data-block]") && !e.target.closest("[data-act]")) {
    S.picks = [];
    picksDropped = true;
  }
  if ((e.shiftKey || e.ctrlKey || e.metaKey) && !S.preview && S.screen === "edit" && !S.brush && e.target.closest("[data-block]") && !e.target.closest("[data-act]")) {
    e.preventDefault();
    modPick(e.target.closest("[data-block]").dataset.block);
    return;
  }
  if ((S.pickOn || S.brush) && !S.preview && S.screen === "edit" && e.target.closest("[data-block]")) {
    e.preventDefault();
    return;
  }
  if (!coarsePtr.matches || kbFold || S.preview || S.screen !== "edit") return;
  const ce = e.target.closest("[contenteditable][data-id]");
  if (!ce || ce.dataset.id === S.active) return;
  e.preventDefault();
  stash = null;
  stashBlocks = [];
  const dead = window.getSelection();
  if (dead) dead.removeAllRanges();
  const was = document.activeElement;
  if (was && was.isContentEditable && was !== ce && was.blur) was.blur();
  const bl = S.blocks.find(x => x.id === ce.dataset.id);
  set(Object.assign({ active: ce.dataset.id, cat: bl ? catOf(bl.type) : S.cat, picks: [] }, scopeOff()));
});

app.addEventListener("click", (e) => {
  const stop = e.target.closest("[data-stop]");
  const el = e.target.closest("[data-act]");
  if (!el) {
    const blk = e.target.closest("[data-block]");
    if (blk && (e.shiftKey || e.ctrlKey || e.metaKey) && !S.preview) return;
    if (blk && S.pickOn && !S.preview) { togglePick(blk.dataset.block); return; }
    if (blk && S.brush && !S.preview) { brushApply(blk.dataset.block); return; }
    if (blk && (blk.dataset.block !== S.active || picksDropped)) {
      picksDropped = false;
      const bl = S.blocks.find(x => x.id === blk.dataset.block);
      set(Object.assign({ active: blk.dataset.block, cat: bl ? catOf(bl.type) : S.cat, picks: [] }, blk.dataset.block !== S.active ? scopeOff() : {}));
      return;
    }
    if (!blk && pickedIds().length && !S.preview && e.target.closest(".stage") && !e.target.closest(".card")) set({ picks: [] });
    return;
  }
  const act = el.dataset.act;
  if (act === "closepreview" && el.classList.contains("preview-body") && e.target.closest(".card, .preview-nav")) return;
  if (act === "tplclose" && el.classList.contains("tplpv-stage") && e.target !== el) return;
  if ((act === "closesheet" || act === "bsheetclose" || act === "pdlgclose" || act === "xdlgclose" || act === "cdlgno" || act === "recclose" || act === "moreclose") && stop && el.classList.contains("sheet")) return;
  trackClick(act, el);
  switch (act) {
    case "parse": {
      const raw = app.querySelector("#raw");
      const v = raw ? raw.value : "";
      rawDraft = v;
      let t = selTpl();
      let list = v.trim() ? tplListFor(t, v) : null;
      const chatIn = !!(list && !t.each && t.cat !== "music" && list.some(x => x.t));
      if (chatIn && t.id === "t-basic") t = TEMPLATES.find(x => x.id === "t-kakao") || t;
      let chatN = 0;
      if (list && isChatLook(tplVals(t))) { const r = chatifyList(list, isFlatLook(tplVals(t))); list = r.list; chatN = r.n; }
      if (!list) { if (t.id === "t-basic") startBlank(); else build(t.blocks); }
      else build(list, true);
      applyTplLook(t, true);
      track("start_card", { method: "text", template: tplName(t.id), text_len: lenBucket(v.trim().length), chat: chatIn ? 1 : 0 });
      if (chatN) { set({ bubNoQuote: true }); flash("대사 " + chatN + "개를 메시지로 넣었어요 · 오른쪽이 틀리면 그 말풍선을 골라 ‘나예요’"); }
      if (chatIn) { set({ msgTime: true }); flash("대화를 읽었어요 · 오른쪽에 둘 사람은 그 말풍선을 골라 ‘나예요’를 누르세요"); }
      return;
    }
    case "blank": { const t = selTpl(); track("start_card", { method: "blank", template: tplName(t.id) }); if (t.id === "t-basic") startBlank(); else build(t.blocks); applyTplLook(t, true); return; }
    case "qspresets": qsOpen = !qsOpen; render(); return;
    case "qsstart": {
      S.tplSel = "t-last";
      const raw = app.querySelector("#raw");
      const btn = app.querySelector(raw && raw.value.trim() ? '[data-act="parse"]' : '[data-act="blank"]');
      if (btn) btn.click();
      return;
    }
    case "tplcols": {
      tplCols = +el.dataset.v;
      try { localStorage.setItem(TPL_COLS_STORE, String(tplCols)); } catch (e) {}
      render();
      return;
    }
    case "tplsel": {
      const raw = app.querySelector("#raw"), v = raw ? raw.value : rawDraft;
      const nt = tplById(el.dataset.t);
      if (nt && v.trim() && v === tplSample(selTpl())) { rawDraft = tplSample(nt); if (raw) raw.value = rawDraft; }
      set({ tplSel: el.dataset.t });
      return;
    }
    case "tplcat": {
      set({ tplCat: el.dataset.c });
      app.querySelectorAll(".demos, .tplrow").forEach(c => { c.scrollLeft = 0; });
      updateChipFades();
      return;
    }
    case "tpluse": {
      const t = tplById(el.dataset.t);
      if (!t) return;
      track("select_template", { template: tplName(t.id), where: "edit" });
      snap(true);
      const nd = S.blocks.filter(b => b.type === "dialogue").length;
      applyTplLook(t, true);
      const cv = nd - S.blocks.filter(b => b.type === "dialogue").length;
      flash(t.name + (t.id === "t-basic" ? "으로 되돌렸어요" : " 모양으로 바꿨어요") + (cv ? " · 대사 " + cv + "개는 말풍선으로" : " · 글은 그대로"), cv ? { act: "undo", label: "되돌리기" } : null);
      return;
    }
    case "hs": rowStep(el, +el.dataset.d); return;
    case "tplpv": track("template_preview", { template: tplName(el.dataset.t) }); set({ tplpv: el.dataset.t }); return;
    case "tplclose": set({ tplpv: "" }); return;
    case "tplraw": set({ tplRaw: el.dataset.v === "1" }); return;
    case "tplnav": {
      tplStep(+el.dataset.d);
      return;
    }
    case "demo": {
      const t = tplById(el.dataset.t);
      if (!t) return;
      const raw = app.querySelector("#raw");
      const v = raw ? raw.value : rawDraft;
      rawDraft = v;
      const useRaw = v.trim() && S.tplRaw !== false;
      S.tplpv = "";
      if (useRaw) build(isChatLook(tplVals(t)) ? chatifyList(tplListFor(t, v), isFlatLook(tplVals(t))).list : tplListFor(t, v), true);
      else build(t.blocks);
      S.tplSel = t.id;
      applyTplLook(t, true, true);
      track("start_card", { method: useRaw ? "text" : "example", template: tplName(t.id), text_len: lenBucket(useRaw ? v.trim().length : 0) });
      flash(t.name + (useRaw ? " 스타일을 입혔어요" : " 템플릿으로 시작해요"));
      return;
    }
    case "sample": {
      const raw = app.querySelector("#raw");
      const ex = tplSample(selTpl());
      if (raw) { raw.value = ex; raw.focus(); }
      rawDraft = ex;
      return;
    }
    case "back": leaveWork(); set({ screen: "input", preview: false, brush: null }); return;
    case "libopen": if (S.screen === "edit") makeThumb(); libRefresh(); set({ lib: true, more: false }); return;
    case "libclose": set({ lib: false }); return;
    case "libexport": libExport(); return;
    case "libimport": libImportPick(); return;
    case "wopen": track("work_reopen", { works: nBucket(libList.length) }); openWork(el.dataset.w); return;
    case "wdup": dupWork(el.dataset.w); return;
    case "wdel": {
      const x = libList.find(w => w.id === el.dataset.w);
      set({ cdlg: { title: "「" + (x ? x.title : "이 카드") + "」를 지울까요?", note: "보관함에서 지우면 되돌릴 수 없어요.", ok: "지우기", act: "wdel", id: el.dataset.w } });
      return;
    }
    case "preview": set({ preview: true }); return;
    case "closepreview": set({ preview: false }); return;
    case "tab":
      if (S.tab === el.dataset.tab && !S.fold && !wideMQ.matches) { set({ fold: true }); return; }
      set({ tab: el.dataset.tab, fold: false }); return;
    case "adv": {
      const o = Object.assign({}, S.advOn || {});
      o[S.tab] = !o[S.tab];
      set({ advOn: o });
      return;
    }
    case "fold":
      if (grabSwiped) { grabSwiped = false; return; }
      setFold(!S.fold);
      return;
    case "cat": set({ cat: el.dataset.c }); return;
    case "gapscope": set({ gapScope: el.dataset.v === "all" ? "all" : "block" }); return;
    case "type": track("select_block_type", { block_type: TYPES[el.dataset.t] ? TYPES[el.dataset.t].n : "" }); setType(el.dataset.t); return;
    case "add": addBlock(); return;
    case "dup": dupBlock(); return;
    case "del": delBlock(); return;
    case "up": move(-1); return;
    case "down": move(1); return;
    case "side": setSide(el.dataset.s); return;
    case "addpics": { const b = cur(); if (b) openMultiPicker(b.id); return; }
    case "blkprev": gotoBlock(-1); return;
    case "blknext": gotoBlock(1); return;
    case "kbdone": if (document.activeElement) document.activeElement.blur(); return;
    case "kbbr": { const a = document.activeElement; if (a && a.isContentEditable && inCard(a)) document.execCommand("insertLineBreak"); return; }
    case "bsheet": {
      if (document.activeElement && !inCard(document.activeElement)) document.activeElement.blur();
      const id = S.active || (S.blocks[0] && S.blocks[0].id);
      if (!id) return;
      const r = el.getBoundingClientRect();
      bmenuOpen(id, r.left, r.top - 6, true);
      return;
    }
    case "bsheetclose": set({ bsheet: false }); return;
    case "bq-add": S.bsheet = false; addBlock(); return;
    case "bq-side": { S.bsheet = false; setSide(sideNow(cur()) === "right" ? "left" : "right"); return; }
    case "bq-pics": { S.bsheet = false; render(); const b = cur(); if (b) openMultiPicker(b.id); return; }
    case "bq-up": move(-1); return;
    case "bq-multi": S.bsheet = false; S.tab = "블록"; S.fold = false; set({ pickOn: true, picks: pickedIds().length ? pickedIds() : (S.active ? [S.active] : []) }); flash("블록을 누르면 담기고, 다시 누르면 빠져요"); return;
    case "bq-down": move(1); return;
    case "bq-dup": S.bsheet = false; dupBlock(); return;
    case "bq-del": S.bsheet = false; delBlock(); return;
    case "typeall": typeAll(); return;
    case "pasteraw": pasteRaw(); return;
    case "delpic": dropPic(cur(), el.dataset.m); return;
    case "isme": {
      const me = speakerOf(cur());
      if (!me) return;
      snap(true);
      S.blocks = S.blocks.map(x => {
        if (!isMsg(x) || !speakerOf(x)) return x;
        const nb = Object.assign({}, x);
        if (speakerOf(x) === me) { nb.type = "bubble"; nb.side = "right"; } else { nb.type = "avatar"; delete nb.side; }
        return nb;
      });
      set({ blocks: S.blocks, fit: 1 });
      flash("‘" + me + "’의 말을 오른쪽 말풍선으로 옮겼어요");
      return;
    }
    case "talkopt": {
      const k = el.dataset.k, v = el.dataset.v;
      set({ [k]: k === "bubW" ? +v : v === "true", fit: 1 });
      return;
    }
    case "align": setAlign(el.dataset.a); return;
    case "dvstyle": setDivider(el.dataset.v); return;
    case "indent": set({ indent: +el.dataset.v || 0, fit: 1 }); return;
    case "wordbreak":
      if (WRAP_KEYS.indexOf(el.dataset.v) >= 0 && el.dataset.v !== S.wordBreak) set({ wordBreak: el.dataset.v, fit: 1 });
      return;
    case "bold": case "italic": case "underline": case "strike": case "clearfmt":
      fmtCmd(act);
      return;
    case "bigger": case "smaller": fmtCmd(act); return;
    case "deco": decoCmd(el.dataset.k); return;
    case "decoclear": decoClear(); return;
    case "decoc": set({ decoC: el.dataset.c === "accent" ? null : el.dataset.c }); return;
    case "decoimg": set({ decoImg: el.dataset.m }); return;
    case "decoimgnew": decoImgPending = null; openPicker("decoimg"); return;
    case "dropcap": case "vert": {
      const ids = scopeIds();
      if (!ids.length) { flash("먼저 카드에서 블록을 골라 주세요"); return; }
      const k = act === "dropcap" ? "drop" : "vert";
      const on = !ids.every(id => (S.blocks.find(x => x.id === id) || {})[k]);
      snap(true);
      set({ blocks: S.blocks.map(x => ids.indexOf(x.id) < 0 ? x : Object.assign({}, x, { [k]: on || undefined })), fit: 1 });
      return;
    }
    case "sizedef": {
      if (curScope() === "word" && useSelForFormat()) {
        const n = firstTextParent(window.getSelection().getRangeAt(0)), host = n && n.closest("[contenteditable]");
        if (host) setSelSize(parseFloat(getComputedStyle(host).fontSize) * pxK());
        render(); return;
      }
      if (!wholeBlocks(selectedBlockIds(), h => { stripSizes(h); })) flash("먼저 카드에서 블록을 골라 주세요");
      render(); return;
    }
    case "quote":
      if (qHeld) { qHeld = false; return; }
      quoteCmd();
      return;
    case "quotepick":
      S.qStyle = el.dataset.q;
      try { localStorage.setItem(QSTYLE_STORE, S.qStyle); } catch (e) {}
      qPickOpen = false;
      quoteCmd(el.dataset.q, true);
      return;
    case "cpkfold": {
      const v = !S.cpkFold;
      try { localStorage.setItem("excerpt-cpk-fold", v ? "1" : "0"); } catch (e) {}
      set({ cpkFold: v }); return;
    }
    case "target": set({ target: el.dataset.g, sub: Object.assign({}, S.sub || {}, { "색": "" }) }); return;
    case "color": pickColor(el.dataset.hex); return;
    case "colornone": unpaint(); return;
    case "colorsoff": { const ids = paintIds(); if (!ids.length) { flash(NOSEL); return; } colorsOff(ids); return; }
    case "invert": {
      if (!useSelForFormat()) { flash(NOSEL_FMT); return; }
      exec("hiliteColor", "#1a1a1a"); exec("foreColor", "#ffffff"); render();
      return;
    }
    case "bg": {
      const c = el.dataset.color;
      if (c === "image") { S.bgImage = true; render(); if (!bgURL) openPicker("bg"); }
      else set({ bgImage: false, bg: c });
      return;
    }
    case "bgpick": openPicker("bg"); return;
    case "bghide": set({ bgHide: !S.bgHide }); return;
    case "sideon": {
      snap(true);
      set({ side: Object.assign({}, SIDE0, { pos: el.dataset.p }), fit: 1 });
      openPicker("side");
      return;
    }
    case "sideoff": sideGone = S.side; set({ side: null, fit: 1 }); flash("이미지 패널을 없앴어요", { act: "sideback", label: "되돌리기" }); return;
    case "sideback": if (sideGone) { set({ side: sideGone, fit: 1 }); sideGone = null; } return;
    case "cornerlink": set({ cornerLink: !S.cornerLink }); return;
    case "sideshape": { const x = SHAPES.find(y => y.k === el.dataset.v); if (x) { snap(true); set({ side: Object.assign({}, S.side || SIDE0, { r: x.r.slice() }) }); } return; }
    case "avshape": { const x = SHAPES.find(y => y.k === el.dataset.v); if (x) { snap(true); set({ avR: x.r.slice() }); } return; }
    case "avreset": {
      snap(true);
      const k = el.dataset.k;
      if (/^r\d$/.test(k)) { const r = avR().slice(); r[+k[1]] = avR0()[+k[1]]; set({ avR: r }); }
      else set({ [k === "size" ? "avSize" : "avGap"]: null });
      return;
    }
    case "sidepick": if (!S.side) set({ side: Object.assign({}, SIDE0) }); openPicker("side"); return;
    case "sideuse": snap(true); set({ side: Object.assign({}, S.side || SIDE0, { m: el.dataset.m }) }); return;
    case "sideset": {
      snap(true);
      let v = el.dataset.v;
      if (v === "true" || v === "false") v = v === "true";
      set({ side: Object.assign({}, S.side || SIDE0, { [el.dataset.k]: v }), fit: 1 });
      return;
    }
    case "sidereset": {
      snap(true);
      const k = el.dataset.k, sd = sidePic() || SIDE0;
      if (/^r\d$/.test(k)) { const r = sd.r.slice(); r[+k[1]] = 0; set({ side: Object.assign({}, S.side || SIDE0, { r: r }) }); }
      else set({ side: Object.assign({}, S.side || SIDE0, { [k]: SIDE0[k] }), fit: 1 });
      return;
    }
    case "photo": {
      const blk = el.closest(".card [data-block]");
      if (blk && !S.preview) {
        const id = blk.dataset.block;
        if (S.pickOn) { togglePick(id); return; }
        if (S.brush) { brushApply(id); return; }
        if (id !== S.active || pickedIds().length) {
          const bl = S.blocks.find(x => x.id === id);
          set(Object.assign({ active: id, cat: bl ? catOf(bl.type) : S.cat, picks: [] }, id !== S.active ? scopeOff() : {}));
          return;
        }
        if (el.hasAttribute("data-imgb")) { flash("사진은 끌어서 옮기고, 바꾸기는 아래 ‘다른 이미지 넣기’로"); return; }
      }
      openPicker(el.dataset.id);
      return;
    }
    case "useimg": assignImg(cur(), el.dataset.m); return;
    case "imgclear": assignImg(cur(), ""); return;
    case "calldir": { const b = cur(); if (b) { snap(true); b.dir = el.dataset.v; set({ blocks: S.blocks.slice() }); } return; }
    case "lyhot": { const b = cur(); if (b) { snap(true); b.hot = el.dataset.v === "1"; set({ blocks: S.blocks.slice() }); } return; }
    case "trackart": { const b = cur(); if (b) { snap(true); b.art = el.dataset.v; set({ blocks: S.blocks.slice(), fit: 1 }); } return; }
    case "playctl": { const b = cur(); if (b) { snap(true); b.noCtl = el.dataset.v === "0"; set({ blocks: S.blocks.slice(), fit: 1 }); } return; }
    case "plend": { const b = cur(); if (b) { snap(true); b.endMode = el.dataset.v === "total" ? "total" : "left"; plSync(b); set({ blocks: S.blocks.slice() }); } return; }
    case "playst": { const b = cur(); if (b) { snap(true); b.paused = el.dataset.v === "pause"; set({ blocks: S.blocks.slice() }); } return; }
    case "imgymid": { const b = cur(); if (b) { b.imgY = 50; render(); } return; }
    case "imgfitreset": { const b = cur(); if (b) { snap(true); b.imgX = 50; b.imgY = 50; delete b.imgZ; render(); } return; }
    case "nudge": {
      const ids = tgtIds(), dx = +el.dataset.dx || 0, dy = +el.dataset.dy || 0;
      if (!ids.length) return;
      snap();
      ids.forEach(id => { const x = S.blocks.find(y => y.id === id); if (x) nudgeBy(x, dx, dy); });
      set({ blocks: S.blocks.slice() });
      return;
    }
    case "nxdown": case "nxup": case "nydown": case "nyup": {
      const ids = tgtIds(), a = el.dataset.act, d = a.endsWith("up") ? 2 : -2;
      if (!ids.length) return;
      snap();
      ids.forEach(id => { const x = S.blocks.find(y => y.id === id); if (x) nudgeBy(x, a[1] === "x" ? d : 0, a[1] === "y" ? d : 0); });
      set({ blocks: S.blocks.slice() });
      return;
    }
    case "nxreset": case "nyreset": { const k = el.dataset.act.slice(0, 2); snap(true); tgtIds().forEach(id => { const x = S.blocks.find(y => y.id === id); if (x) delete x[k]; }); set({ blocks: S.blocks.slice() }); return; }
    case "nudgereset": { snap(true); tgtIds().forEach(id => { const x = S.blocks.find(y => y.id === id); if (x) { delete x.nx; delete x.ny; } }); set({ blocks: S.blocks.slice() }); return; }
    case "imghide": { const b = cur(); if (b) { b.imgHide = !b.imgHide; render(); } return; }
    case "recopen": recOpen(el.dataset.k); return;
    case "rectab": recRevert(); set({ rec: Object.assign({}, S.rec, { tab: el.dataset.k, pick: "", orig: null }) }); return;
    case "recpick": recPreview(el.dataset.hex); return;
    case "recok": recApply(); return;
    case "recclose": recClose(); return;
    case "pin": {
      const ids = tgtIds();
      if (!ids.length) return;
      snap(true);
      const v = el.dataset.p;
      set({ blocks: S.blocks.map(x => {
        if (ids.indexOf(x.id) < 0) return x;
        const nb = Object.assign({}, x);
        if (v) nb.pin = v; else delete nb.pin;
        return nb;
      }), page: 0 });
      return;
    }
    case "brk": toggleBrk(); return;
    case "colbrk": moveColBrk(); return;
    case "phfill": { const b = cur(); if (b) { snap(true); if (el.dataset.v === "1") b.fill = true; else if (el.dataset.v === "bottom") b.fill = "bottom"; else delete b.fill; set({ blocks: S.blocks.slice(), fit: 1 }); } return; }
    case "amup": case "amdown": { const base = S.autoMinH || S.autoH || autoMinPx(); set({ autoMinH: clampN(base + (el.dataset.act === "amup" ? 2 : -2), AUTO_MIN, autoMax()), fit: 1 }); return; }
    case "amreset": set({ autoMinH: null, fit: 1 }); return;
    case "colfill": set({ colFill: el.dataset.v === "auto" ? "auto" : "balance", fit: 1 }); return;
    case "brkclear": clearBrks(); return;
    case "brkpages": brkFollow = S.active; set({ flow: "pages", fit: 1 }); return;
    case "info": {
      const k = el.dataset.k, I = Object.assign({}, S.info);
      if (k === "on") I.on = !I.on;
      else if (k === "top" || k === "bottom") I.pos = k;
      else I[k] = I[k] === false;
      set({ info: I });
      return;
    }
    case "tcclear": clearBlockColor(); return;
    case "usehex": {
      const f = app.querySelector('input[data-act="hexfld"]');
      const hex = normHex(f ? f.value : "");
      if (!hex) { flash("#RRGGBB 처럼 적어 주세요"); return; }
      commitPick(hex);
      return;
    }
    case "accent": set({ accent: el.dataset.c }); return;
    case "ovcolor": set({ ovColor: el.dataset.oc }); return;
    case "bgreset": set({ bgScale: 1, bgX: 0, bgY: 0 }); return;
    case "bgdef": set({ bg: S0.bg, bgImage: false, bgScale: 1, bgX: 0, bgY: 0, overlay: S0.overlay, ovColor: S0.ovColor,
      bgGrad: 0, bg2: S0.bg2, bg3: S0.bg3, bgDir: S0.bgDir }); return;
    case "bgmode": {
      const m = el.dataset.m;
      if (m === "image") { S.bgImage = true; render(); if (!bgURL) openPicker("bg"); }
      else set({ bgImage: false, bgGrad: +m || 0 });
      return;
    }
    case "bggrad": {
      const g = (GRADS[S.bgGrad] || [])[+el.dataset.g];
      if (g) set({ bgImage: false, bg: g.c[0], bg2: g.c[1], bg3: g.c[2] || S.bg3 });
      return;
    }
    case "bgdir": set({ bgDir: el.dataset.d }); return;
    case "tsh": set({ tsh: +el.dataset.v || 0 }); return;
    case "capst": set({ capSt: el.dataset.v }); return;
    case "lbox": set({ lbox: el.dataset.v || "" }); return;
    case "artbg": snap(true); set({ artBg: el.dataset.v === "blur" ? "blur" : "", bgImage: el.dataset.v === "blur" ? false : S.bgImage }); return;
    case "artcolor": {
      const src = artSrc();
      if (!src) { flash("곡 정보 블록에 앨범아트를 먼저 넣어 주세요"); return; }
      artColors(src).then(([c1, c2]) => {
        artColorPrev = { bgImage: S.bgImage, artBg: S.artBg, bgGrad: S.bgGrad, bg: S.bg, bg2: S.bg2, bgDir: S.bgDir };
        set({ bgImage: false, artBg: "", bgGrad: 2, bg: c1, bg2: c2, bgDir: "v" });
        flash("앨범아트의 색으로 바탕을 칠했어요", { act: "artcolorback", label: "되돌리기" });
      }).catch(() => flash("그림에서 색을 읽지 못했어요"));
      return;
    }
    case "artcolorback": if (artColorPrev) { set(artColorPrev); artColorPrev = null; } return;
    case "scenear": { const b = cur(); if (b) { snap(true); b.ar = el.dataset.v; set({ blocks: S.blocks.slice(), fit: 1 }); } return; }
    case "arflip": { const b = cur(); if (b) { snap(true); b.ar = flipKey(arKey(b.ar), Object.keys(SCENE_AR)); set({ blocks: S.blocks.slice(), fit: 1 }); } return; }
    case "vpos": if (PCODE_ENUM.vpos.indexOf(el.dataset.v) >= 0) set({ vpos: el.dataset.v, fit: 1 }); return;
    case "tpos": {
      const v = el.dataset.v, h = el.dataset.h;
      if (PCODE_ENUM.vpos.indexOf(v) < 1 || PCODE_ENUM.hpos.indexOf(h) < 0) return;
      set({ vpos: v, hpos: h, fit: 1 });
      if (h !== "left" && textWNow() >= 100) flash("글 폭을 줄이면 가로 자리가 보여요 · 아래 ‘글 폭’");
      return;
    }
    case "textwup": set({ textW: Math.min(100, textWNow() + 5), fit: 1 }); return;
    case "textwdown": set({ textW: Math.max(TEXTW_MIN, textWNow() - 5), fit: 1 }); return;
    case "textwreset": set({ textW: 100, fit: 1 }); return;
    case "ratiobox": set({ ratioBox: el.dataset.v === "all" ? "all" : "card", page: 0, fit: 1 }); return;
    case "ratioflip": if (S.ratio !== "auto") { track("select_ratio", { ratio: "flip" }); set({ ratio: flipKey(S.ratio, CARD_RATIOS), page: 0, fit: 1 }); } return;
    case "scenelb": { const b = cur(); if (b) { snap(true); if (el.dataset.v) b.lb = el.dataset.v; else delete b.lb; set({ blocks: S.blocks.slice() }); } return; }
    case "cappos": set({ capPos: el.dataset.v === "top" ? "top" : "bottom" }); return;
    case "swipehint": swipeHintDone(); render(); return;
    case "pinchhint": pinchHintDone(); return;
    case "tshc": set({ tshC: el.dataset.c }); return;
    case "accentdef": set({ accent: S0.accent }); return;
    case "famdef": set({ famKey: S0.famKey, fontCat: fontOf(S0.famKey).c, fit: 1 }); return;
    case "scaledef": set({ scale: sBase(), fit: 1 }); return;
    case "fam": track("select_font", { font: fontOf(el.dataset.f).n, scope: curScope() }); applyFont(el.dataset.f); return;
    case "subtab": {
      set({ sub: Object.assign({}, S.sub || {}, { [el.dataset.tab]: el.dataset.k }) });
      const pb = app.querySelector(".panel-body"); if (pb) pb.scrollTop = 0;
      return;
    }
    case "famscope": set({ famScope: el.dataset.fs === "all" ? "all" : "auto" }); scopeKey = ""; return;
    case "scopeset": {
      const k = el.dataset.s;
      if (k === "all") { set({ famScope: "all" }); scopeKey = ""; return; }
      if (k === "block") {
        stash = null; stashBlocks = [];
        const sel = window.getSelection(); if (sel) sel.removeAllRanges();
        set({ famScope: "auto" }); scopeKey = ""; return;
      }
      S.famScope = "auto";
      if (!useStash()) { flash("카드에서 글자를 드래그해 골라 주세요"); render(); return; }
      scopeKey = ""; refreshPanel(); return;
    }
    case "widen": widenSel(); return;
    case "sameall": {
      const r = textSelRange(), t = r ? r.toString() : "";
      const on = !(S.sameAll && S.sameFor === t);
      S.sameAll = on; S.sameFor = on ? t : "";
      if (on) flash("이제 서식·꾸밈·색이 ‘" + cut(t, 8) + "’ " + sameRanges(t).length + "곳에 한 번에 걸려요");
      refreshPanel(); return;
    }
    case "famclear": clearBlockFont(); return;
    case "pickmode": {
      if (!S.pickOn && !pickedIds().length && S.active) { set({ pickOn: true, picks: [S.active] }); flash("블록을 누르면 담기고, 다시 누르면 빠져요"); return; }
      set({ pickOn: !S.pickOn });
      return;
    }
    case "brush": if (S.brush) set({ brush: null }); else brushStart(); return;
    case "samesync": syncSameType(); return;
    case "setname": {
      const b = cur();
      if (pickedIds().length > 1) {
        snap(true);
        const ids = pickedIds();
        let n = 0;
        S.blocks.forEach(x => { if (ids.indexOf(x.id) >= 0 && NAME_SLOT[x.type] > 0) { txt[key(x.id, NAME_SLOT[x.type])] = el.dataset.n; n++; } });
        set({ blocks: S.blocks.slice() });
        flash("고른 " + n + "개의 이름을 ‘" + el.dataset.n + "’(으)로");
        return;
      }
      if (!b || !(NAME_SLOT[b.type] > 0)) return;
      snap(true);
      txt[key(b.id, NAME_SLOT[b.type])] = el.dataset.n;
      const sd = b.type === "bubble" ? sideOf(el.dataset.n) : "";
      set({ blocks: sd && sd !== (b.side || "left") ? S.blocks.map(x => x.id === b.id ? Object.assign({}, x, { side: sd }) : x) : S.blocks.slice() });
      return;
    }
    case "pickclear": set({ picks: [], pickOn: false }); return;
    case "pickall": set({ picks: S.blocks.map(b => b.id), pickOn: true }); flash("블록 " + S.blocks.length + "개를 모두 골랐어요"); return;
    case "picksame": {
      const b = cur();
      if (!b) return;
      const ids = S.blocks.filter(x => x.type === b.type).map(x => x.id);
      set({ picks: ids, pickOn: true });
      flash(TYPES[b.type].n + " " + ids.length + "개를 골랐어요");
      return;
    }
    case "fontcat": set({ fontCat: el.dataset.fc }); return;
    case "kbfit": set({ kbFit: S.kbFit === "whole" ? "width" : "whole" }); return;
    case "zoomwide": set({ zoom: S.zoom === "wide" ? "fit" : "wide" }); return;
    case "zoomin": set({ zoomK: Math.min(ZK_MAX, Math.round(((S.zoomK || 1) + ZK_STEP) * 100) / 100) }); return;
    case "zoomout": set({ zoomK: Math.max(ZK_MIN, Math.round(((S.zoomK || 1) - ZK_STEP) * 100) / 100) }); return;
    case "zoomreset": set({ zoomK: 1 }); return;
    case "jaonly": set({ jaOnly: !S.jaOnly }); return;
    case "hanlang": set({ hanLang: el.dataset.v || "" }); return;
    case "fw": set({ fw: +el.dataset.v, fit: 1 }); return;
    case "fwv": setFwv(+el.dataset.v || 0); return;
    case "scaleup": case "scaledown": {
      const dir = act === "scaleup" ? 1 : -1;
      const next = S.fsUnit === "px"
        ? (Math.round(BODY_PX() * S.scale) + dir) / BODY_PX()
        : (Math.round(S.scale / sBase() * 10) + dir) / 10 * sBase();
      set({ scale: Math.round(clampN(next, SCALE_MIN, SCALE_MAX) * 1000) / 1000, fit: 1 });
      return;
    }
    case "fsunit": set({ fsUnit: S.fsUnit === "px" ? "%" : "px" }); return;
    case "lsup": setSpacing("ls", v => Math.round((v + 0.01) * 100) / 100); return;
    case "lsdown": setSpacing("ls", v => Math.round((v - 0.01) * 100) / 100); return;
    case "lsreset": setSpacing("ls", () => 0); return;
    case "lhup": setSpacing("lh", v => Math.round((v + 0.05) * 100) / 100); return;
    case "lhdown": setSpacing("lh", v => Math.max(0.01, Math.round((v - 0.05) * 100) / 100)); return;
    case "lhreset": setSpacing("lh", () => 1); return;
    case "bpyup": set({ bubPY: Math.min(40, bubPadV(chatOf())[0] + 1), fit: 1 }); return;
    case "bpydown": set({ bubPY: Math.max(0, bubPadV(chatOf())[0] - 1), fit: 1 }); return;
    case "bpxup": set({ bubPX: Math.min(40, bubPadV(chatOf())[1] + 1), fit: 1 }); return;
    case "bpxdown": set({ bubPX: Math.max(0, bubPadV(chatOf())[1] - 1), fit: 1 }); return;
    case "bpyreset": set({ bubPY: null, fit: 1 }); return;
    case "bigapup": set({ biGap: Math.min(40, biGapNow() + 1), fit: 1 }); return;
    case "bigapdown": set({ biGap: Math.max(-4, biGapNow() - 1), fit: 1 }); return;
    case "bigapreset": set({ biGap: null, fit: 1 }); return;
    case "bubrup": set({ bubR: Math.min(BUBR_MAX, bubRNow() + 1) }); return;
    case "bubrdown": set({ bubR: Math.max(0, bubRNow() - 1) }); return;
    case "bubrreset": set({ bubR: null }); return;
    case "bpxreset": set({ bubPX: null, fit: 1 }); return;
    case "gapup": set({ gap: Math.min(30, S.gap + 2), fit: 1 }); return;
    case "gapreset": set({ gap: S0.gap, fit: 1 }); return;
    case "padreset": set({ padX: S0.padX, fit: 1 }); return;
    case "padyup": set({ padY: Math.min(PADY_MAX, padYOf() + 2), fit: 1 }); return;
    case "padydown": set({ padY: Math.max(PADY_MIN, padYOf() - 2), fit: 1 }); return;
    case "padyreset": set({ padY: null, fit: 1 }); return;
    case "colgapup": set({ colGap: Math.min(COLGAP_MAX, colGapOf() + 2), fit: 1 }); return;
    case "colgapdown": set({ colGap: Math.max(COLGAP_MIN, colGapOf() - 2), fit: 1 }); return;
    case "colgapreset": set({ colGap: null, fit: 1 }); return;
    case "bgapup": setBlockGap(v => v + 2); return;
    case "bgapdown": setBlockGap(v => v - 2); return;
    case "bgapreset": setBlockGap(() => 0); return;
    case "bgapbup": setBlockGap(v => v + 2, false, "gapB"); return;
    case "bgapbdown": setBlockGap(v => v - 2, false, "gapB"); return;
    case "bgapbreset": setBlockGap(() => 0, false, "gapB"); return;
    case "gapdown": set({ gap: Math.max(2, S.gap - 2), fit: 1 }); return;
    case "padup": set({ padX: Math.min(56, S.padX + 2), fit: 1 }); return;
    case "cwup": set({ cw: Math.min(150, Math.round(cwK() * 100) + 5), fit: 1 }); return;
    case "cwdown": set({ cw: Math.max(50, Math.round(cwK() * 100) - 5), fit: 1 }); return;
    case "cwreset": set({ cw: 100, fit: 1 }); return;
    case "tgrad": set({ tgrad: el.dataset.v === "1" }); return;
    case "tgpre": set({ tgrad: true, tg1: el.dataset.a, tg2: el.dataset.b }); return;
    case "paddown": set({ padX: Math.max(10, S.padX - 2), fit: 1 }); return;
    case "wup": set({ cardW: Math.min(AUTO_W_MAX, autoW() + 10), fit: 1 }); return;
    case "wdown": set({ cardW: Math.max(AUTO_W_MIN, autoW() - 10), fit: 1 }); return;
    case "wreset": set({ cardW: AUTO_W, fit: 1 }); return;
    case "ratio": track("select_ratio", { ratio: el.dataset.ratio }); set({ ratio: el.dataset.ratio, page: 0, fit: 1 }); return;
    case "flow":
      set({ flow: el.dataset.f, fit: 1, page: 0 });
      if (el.dataset.f !== "pages" && brkCount()) flash("직접 나눈 장은 ‘여러 장’에서만 나뉩니다");
      return;
    case "guide": set({ guide: !S.guide }); return;
    case "savep": openPDlg("save", ""); return;
    case "usep": track("select_preset", { preset: presetName(el.dataset.p) }); S.tplId = ""; applyP(presetById(el.dataset.p)); return;
    case "skin": {
      const pr = presetById(el.dataset.s ? "sk-" + el.dataset.s : "bi-basic");
      const sk = SKINS[el.dataset.s];
      track("select_theme", { theme: themeName(el.dataset.s) });
      if (sk && sk.chat && S.blocks.some(b => b.bub)) {
        snap(true);
        S.blocks = S.blocks.map(b => { if (!b.bub) return b; const nb = Object.assign({}, b); delete nb.bub; delete nb.bubA; return nb; });
      }
      let conv = 0;
      if (sk && sk.chat && S.blocks.some(b => b.type === "dialogue")) { snap(true); conv = chatifyBlocks(!!sk.chat.flat); S.bubNoQuote = true; }
      S.tplId = "";
      if (pr) applyP({ name: pr.name, v: Object.assign({}, pr.v, { frame: S.frame, frameC: S.frameC, bubNoQuote: conv ? true : pr.v.bubNoQuote }) });
      if (conv) flash("대사 " + conv + "개를 메신저 말풍선으로 바꿨어요", { act: "undo", label: "되돌리기" });
      return;
    }
    case "skinc": set({ skinC: Object.assign({}, S.skinC, { [el.dataset.slot]: el.dataset.c }) }); return;
    case "frame": set({ frame: el.dataset.f }); return;
    case "qmark": set({ qmark: +el.dataset.v || 0 }); return;
    case "pfx": set({ pfx: PFX[el.dataset.v] ? el.dataset.v : "", pfxT: {} }); return;
    case "pfxdesk": snap(true); set({ pfxT: Object.assign({}, S.pfxT, { desk: el.dataset.v }) }); return;
    case "pfxreset": {
      snap(true);
      if (el.dataset.k === "all") { set({ pfxT: {} }); return; }
      const t = Object.assign({}, S.pfxT); delete t[el.dataset.k]; set({ pfxT: t });
      return;
    }
    case "dlgname": set({ dlgName: el.dataset.v, fit: 1 }); return;
    case "biital": set({ biItal: el.dataset.v }); return;
    case "bimain": set({ biMain: el.dataset.v, fit: 1 }); return;
    case "framec": set({ frameC: el.dataset.c }); return;
    case "editp": openPDlg("edit", el.dataset.p); return;
    case "delp": delP(el.dataset.p); return;
    case "pedit": set({ pedit: !S.pedit }); return;
    case "pdlgok": commitPDlg(); return;
    case "povr": overwriteP(); return;
    case "pdlgdel": if (S.pdlg) delP(S.pdlg.id); return;
    case "pdlgclose": set({ pdlg: null }); return;
    case "cdlgok": {
      const d = S.cdlg;
      if (!d) return;
      if (d.act === "delp") delPNow(d.id);
      else if (d.act === "delpicks") { set({ cdlg: null }); delBlock(); }
      else if (d.act === "restart") restartNow(false);
      else if (d.act === "draftload") loadDraftNow();
      else if (d.act === "wdel") delWorkNow(d.id);
      else if (d.act === "sharefiles") shareReady();
      else if (d.act === "retrysave") { set({ cdlg: null }); saveImg(lastSaveOnly); }
      return;
    }
    case "cdlgalt": {
      const d = S.cdlg;
      if (d && d.altAct === "restartfresh") restartNow(true);
      else set({ cdlg: null });
      return;
    }
    case "themereset": resetThemeNow(); return;
    case "pcode": openXDlg("export", el.dataset.p || ""); return;
    case "pimport": openXDlg("import", ""); return;
    case "xdlgcopy": copyXCode(); return;
    case "xdlgok": commitXImport(); return;
    case "xdlgclose": set({ xdlg: null }); return;
    case "cdlgno":
      if (S.cdlg && S.cdlg.act === "draftload") { dropDraft(); return; }
      set({ cdlg: null });
      return;
    case "prev": set({ page: Math.max(0, S.page - 1) }); return;
    case "next": set({ page: Math.min(S.pages - 1, S.page + 1) }); return;
    case "undo": undo(); return;
    case "redo": redo(); return;
    case "opensheet": set({ sheet: true }); return;
    case "closesheet": set({ sheet: false }); return;
    case "save": saveImg(false); return;
    case "expsize":
      S.expHi = el.dataset.hi === "1";
      try { localStorage.setItem("excerpt-export-hi", S.expHi ? "1" : "0"); } catch (e) {}
      render();
      return;
    case "more": set({ more: true }); return;
    case "fsearch": if (S.more) set({ more: false }); fsOpen(); return;
    case "viewmode":
      viewMode = viewMode === "full" ? "window" : "full";
      try { localStorage.setItem(VIEW_STORE, viewMode); } catch (e) {}
      document.body.classList.toggle("view-full", viewMode === "full");
      render();
      requestAnimationFrame(() => { fitCard(); measure(); });
      return;
    case "moreclose": set({ more: false }); return;
    case "bug":
      set({ more: false });
      setTimeout(() => { const f = document.getElementById("bugfab"); if (f) f.click(); }, 60);
      return;
    case "busycancel": busyCancel = true; return;
    case "saveone": saveImg(true); return;
    case "copyimg": copyImg(); return;
    case "htmlk": set({ htmlK: +el.dataset.k }); return;
    case "copyhtml": copyWidget(); return;
    case "copyblog": copyBlog(); return;
    case "savehtml": saveWidget(); return;
    case "share": shareImg(); return;
    case "copytxt": copyTxt(); return;
    case "restart": S.more = false; restart(); return;
  }
});

app.addEventListener("input", (e) => {
  scheduleSave();
  const el = e.target.closest("[contenteditable]");
  if (el && el.dataset.id) {
    snap();
    setName(el.dataset.id, el.dataset.k, el.innerHTML);
    typeLater();
    if (S.bubNoQuote) markQuotes();
    return;
  }
  const sbc = e.target.closest('input[data-act="sidebgc"]');
  if (sbc) { if (S.side) { snap(); S.side = Object.assign({}, S.side, { bg: sbc.value }); repaintCard(); } return; }
  const soc = e.target.closest('input[data-act="sideovc"]');
  if (soc) { if (S.side) { snap(); S.side = Object.assign({}, S.side, { ovC: soc.value }); repaintCard(); } return; }
  const cp = e.target.closest('input[type="color"]');
  if (cp) { onColorInput(cp); return; }
  const hx = e.target.closest('input[data-act="hexfld"]');
  if (hx) { if (normHex(hx.value)) livePick(hx.value, "hexfld"); return; }
  const pt = e.target.closest('input[data-act="plcur"], input[data-act="pldur"]');
  if (pt) {
    const b = cur(), v = parseT(pt.value);
    if (!b || b.type !== "player") return;
    if (v == null) { flash("시간은 1:24 처럼 적어 주세요"); render(); return; }
    snap(true);
    const dur0 = plDur(b), cur0 = plProg(b) / 100 * dur0;
    if (pt.dataset.act === "pldur") { b.dur = Math.max(1, v); b.prog = Math.round(Math.min(100, cur0 / b.dur * 100) * 10) / 10; }
    else { b.dur = dur0; b.prog = Math.round(Math.min(100, v / dur0 * 100) * 10) / 10; }
    plSync(b);
    set({ blocks: S.blocks.slice() });
    return;
  }
  const inf = e.target.closest("input[data-info]");
  if (inf) {
    S.info = Object.assign({}, S.info, { [inf.dataset.info]: inf.value.slice(0, 40) });
    repaintCard();
    return;
  }
  const pn = e.target.closest("input[data-pname]");
  if (pn) { if (S.pdlg) S.pdlg.name = pn.value; return; }
  const xc = e.target.closest("textarea[data-xcode]");
  if (xc) { if (S.xdlg && S.xdlg.mode === "import") S.xdlg.code = xc.value; return; }
  const sf = e.target.closest("input[data-sfld]");
  if (sf) { S[sf.dataset.sfld] = sf.value; repaintCard(); return; }
  const hs = e.target.closest("textarea[data-hsrc]");
  if (hs) {
    const i = idx();
    if (i < 0 || S.blocks[i].type !== "html") return;
    snap();
    S.blocks[i] = Object.assign({}, S.blocks[i], { html: hs.value.slice(0, HTML_MAX) });
    repaintCard();
    return;
  }
  const fld = e.target.closest("input[data-fld]");
  if (fld) {
    const b = cur();
    if (!b) return;
    snap();
    setName(b.id, fld.dataset.fld, esc(fld.value));
    fldDirty = true;
    repaintCard();
    return;
  }
  const r = e.target.closest("input[type=range]");
  if (!r) return;
  const v = parseFloat(r.value);
  if (r.dataset.act === "pfxv") {
    const c = PFX_CTL.find(q => q.k === r.dataset.k);
    if (!c || !S.pfx) return;
    snap();
    const nv = Math.max(c.lim[0], Math.min(c.lim[1], Math.round(v)));
    S.pfxT = Object.assign({}, S.pfxT, { [c.k]: nv });
    const lab = app.querySelector('[data-ui="pfx-' + c.k + '"]');
    if (lab) lab.textContent = nv + c.u;
    pfxRefresh();
    return;
  }
  if (r.dataset.act === "htmlz") {
    const i = idx();
    if (i < 0 || S.blocks[i].type !== "html") return;
    snap();
    const nv = Math.max(30, Math.min(250, Math.round(v)));
    S.blocks[i] = Object.assign({}, S.blocks[i], { hz: nv === 100 ? undefined : nv });
    const lab = app.querySelector('[data-ui="htmlz"]');
    if (lab) lab.textContent = nv + "%";
    repaintCard();
    return;
  }
  if (r.dataset.act === "sidev") {
    if (!S.side) return;
    snap();
    const k = r.dataset.k, ri = /^r\d$/.test(k) ? +k[1] : -1, lim = ri >= 0 ? SIDE_LIM.r : SIDE_LIM[k];
    const nv = Math.max(lim[0], Math.min(lim[1], Math.round(v)));
    if (ri >= 0) { const rr = (sidePic() || SIDE0).r.slice(); rr[ri] = nv; S.side = Object.assign({}, S.side, { r: rr }); }
    else S.side = Object.assign({}, S.side, { [k]: nv });
    const lab = app.querySelector('[data-ui="side-' + k + '"]');
    if (lab) lab.textContent = nv + (/^(size|fx|fy|zoom|fade|op|ox|oy|ar|blur|gray|ov|r\d)$/.test(k) ? "%" : "");
    repaintCard();
    return;
  }
  if (r.dataset.act === "avv") {
    snap();
    const k = r.dataset.k, nv = Math.round(v);
    if (/^r\d$/.test(k)) { const rr = avR().slice(); rr[+k[1]] = Math.max(0, Math.min(50, nv)); S.avR = rr; }
    else if (k === "size") S.avSize = Math.max(AV_SIZE[0], Math.min(AV_SIZE[1], nv));
    else S.avGap = Math.max(AV_GAP[0], Math.min(AV_GAP[1], nv));
    const lab = app.querySelector('[data-ui="av-' + k + '"]');
    if (lab) lab.textContent = nv + (/^r\d$/.test(k) ? "%" : "");
    repaintCard();
    return;
  }
  if (r.dataset.act === "prog") {
    const b = cur();
    if (b) {
      snap();
      b.prog = Math.round(v * 10) / 10; plSync(b);
      const lab = app.querySelector('[data-ui="prog"]'); if (lab) lab.textContent = txt[key(b.id, 0)];
      const cf = app.querySelector('input[data-act="plcur"]'); if (cf && document.activeElement !== cf) cf.value = txt[key(b.id, 0)];
      repaintCard();
    }
    return;
  }
  if (r.dataset.act === "lydim") {
    S.lyDim = Math.round(v) / 100;
    const lab = app.querySelector('[data-ui="lydim"]'); if (lab) lab.textContent = Math.round(v) + "%";
    repaintCard();
    return;
  }
  if (r.dataset.act === "imgx" || r.dataset.act === "imgz" || r.dataset.act === "imgw") {
    const b = cur();
    if (!b) return;
    snap();
    const k = { imgx: "imgX", imgz: "imgZ", imgw: "pw" }[r.dataset.act];
    b[k] = Math.round(v);
    if (k === "imgZ" && b.imgZ === 100) delete b.imgZ;
    const lab = app.querySelector('[data-ui="' + r.dataset.act + '"]'); if (lab) lab.textContent = Math.round(v) + "%";
    repaintCard();
    return;
  }
  if (r.dataset.act === "imgy") {
    const b = cur();
    if (b) { b.imgY = IMG_FIT.indexOf(b.type) >= 0 ? clampN(Math.round(v), IMG_POS[0], IMG_POS[1]) : clampN(Math.round(v), 0, 100); repaintCard(); }
    return;
  }
  if (r.dataset.act === "zoom") {
    const scale = v / 100, lim = Math.max(0, (scale - 1) * 50);
    set({ bgScale: scale, bgX: Math.max(-lim, Math.min(lim, S.bgX)), bgY: Math.max(-lim, Math.min(lim, S.bgY)) });
  } else if (r.dataset.act === "panx") {
    const lim = Math.max(0, (S.bgScale - 1) * 50);
    set({ bgX: Math.max(-lim, Math.min(lim, v)) });
  } else if (r.dataset.act === "pany") {
    const lim = Math.max(0, (S.bgScale - 1) * 50);
    set({ bgY: Math.max(-lim, Math.min(lim, v)) });
  } else if (r.dataset.act === "ova") {
    set({ overlay: Math.round(v) / 100 });
  } else if (r.dataset.act === "blur") {
    S.bgBlur = Math.round(v);
    const lab = app.querySelector('[data-ui="blurv"]');
    if (lab) lab.textContent = S.bgBlur ? S.bgBlur + "%" : "없음";
    repaintCard();
  }
});

let fldDirty = false;
app.addEventListener("change", (e) => {
  scheduleSave();
  if (e.target.closest && e.target.closest("input[data-fld], input[data-sfld]")) {
    const sf = e.target.closest("input[data-sfld]");
    if (sf) S[sf.dataset.sfld] = sf.value;
    if (!fldDirty && !sf) return;
    setTimeout(() => {
      const a = document.activeElement;
      if (a && a.matches && a.matches("input[data-fld], input[data-sfld]")) return;
      fldDirty = false;
      render();
    }, 0);
    return;
  }
  const nf = e.target.closest("input[data-num]");
  if (nf) { commitNum(nf); return; }
  const pr = e.target.closest('input[data-act="sidev"], input[data-act="avv"], input[data-act="pfxv"]');
  if (pr) { render(); return; }
  const cp = e.target.closest('input[type="color"]');
  if (!cp) return;
  if (cp.dataset.act === "cpick") commitPick(cp.value);
  else if (cp.dataset.act === "sidebgc" || cp.dataset.act === "sideovc" || cp.dataset.act === "decocc") { if (cp.dataset.act === "decocc") S.decoC = cp.value; render(); }
  else {
    onColorInput(cp);
    if (cp.dataset.act === "framecc" || cp.dataset.act === "skincc") render();
  }
});

let quietDirty = false;
function quietActive(id) {
  const bl = S.blocks.find(x => x.id === id);
  if (!bl) return;
  const prev = els[S.active];
  if (S.active !== id) Object.assign(S, scopeOff());
  S.active = id;
  S.cat = catOf(bl.type);
  quietDirty = true;
  const cr = window.__EXCERPT__.crumbs;
  cr.push("active(quiet)");
  if (cr.length > 24) cr.shift();
  const dark = isDark();
  const sub = dark ? "rgba(255,255,255,0.7)" : "#8a8a88";
  const rule = dark ? "rgba(255,255,255,0.3)" : "#e0e0de";
  const mark = (node, on) => {
    if (!node) return;
    node.style.boxShadow = on ? "0 0 0 1px " + (dark ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.24)") : "none";
    const g = node.querySelector(".grip");
    if (g) {
      g.style.opacity = on ? 1 : 0.45;
      const i = g.querySelector("i");
      if (i) i.style.borderColor = on ? sub : rule;
    }
  };
  mark(prev, false);
  mark(els[id], true);
  const sp = app.querySelector('[data-ui="blkpos"]');
  if (sp) sp.textContent = (TYPES[bl.type] || TYPES.body).n + " " + (S.blocks.findIndex(b => b.id === id) + 1) + "/" + S.blocks.length;
}

app.addEventListener("focusin", (e) => {
  nameRun = null;
  const el = e.target.closest("[contenteditable]");
  if (!el || !el.dataset.id || rendering || holdSnap) return;
  const id = el.dataset.id;
  if (S.active === id) return;
  if (kbFold) { quietActive(id); return; }
  const bl = S.blocks.find(x => x.id === id);
  set(Object.assign({ active: id, cat: bl ? catOf(bl.type) : S.cat }, scopeOff()));
});

app.addEventListener("paste", (e) => {
  const el = e.target.closest("[contenteditable]");
  if (!el || !el.dataset.id) return;
  e.preventDefault();
  const id = el.dataset.id, k = el.dataset.k;
  const raw = (e.clipboardData || window.clipboardData).getData("text/plain") || "";
  const parts = tidy(raw).split(/\n\s*\n+/).map(s => s.replace(/\n+/g, " ").trim()).filter(Boolean);
  if (!parts.length) return;
  snap(true);
  const list = /\n/.test(raw.trim()) ? classify(raw).map(x => (x.type === "title" || x.type === "subtitle") ? Object.assign({}, x, { type: "body" }) : x) : null;
  if (!list || list.length < 2) {
    document.execCommand("insertText", false, parts.join(" "));
    txt[key(id, k)] = el.innerHTML;
    return;
  }
  const i = S.blocks.findIndex(b => b.id === id);
  const blocks = S.blocks.slice();
  let rest = list;
  if (!plain(txt[key(id, 0)]) && k === "0") {
    const x = list[0];
    txt[key(id, 0)] = x.a || "";
    if (x.b != null) txt[key(id, 1)] = x.b;
    if (x.t != null) txt[key(id, 3)] = x.t;
    blocks[i] = tplBlock(x, { id: id, type: x.type });
    rest = list.slice(1);
  }
  const added = rest.map(x => {
    const nid = "b" + (++seq);
    if (x.a != null) txt[key(nid, 0)] = x.a;
    if (x.b != null) txt[key(nid, 1)] = x.b;
    if (x.t != null) txt[key(nid, 3)] = x.t;
    return tplBlock(x, { id: nid, type: x.type });
  });
  blocks.splice(i + 1, 0, ...added);
  const lastId = (added[added.length - 1] || blocks[i]).id;
  set({ blocks: blocks, active: lastId, fit: 1 });
  focusBlock(lastId);
  flash(list.length + "개 블록으로 나눠 넣었어요");
});

function atStart(el) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || !sel.isCollapsed) return false;
  const r = sel.getRangeAt(0).cloneRange();
  r.selectNodeContents(el);
  r.setEnd(sel.anchorNode, sel.anchorOffset);
  return r.toString().length === 0;
}

app.addEventListener("keydown", (e) => {
  const tf = e.target.closest && e.target.closest("input[data-fld], input[data-sfld]");
  if (tf && e.key === "Enter" && !e.isComposing) { e.preventDefault(); tf.blur(); return; }
  const nf = e.target.closest && e.target.closest("input[data-num]");
  if (nf) {
    if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); nf.blur(); }
    else if (e.key === "Escape") { e.preventDefault(); nf.dataset.done = "1"; nf.blur(); render(); }
    return;
  }
  const pn = e.target.closest && e.target.closest("input[data-pname]");
  if (pn) {
    if (e.key === "Enter" && !e.isComposing) {
      e.preventDefault();
      if (S.pdlg) S.pdlg.name = pn.value;
      commitPDlg();
    } else if (e.key === "Escape") {
      e.preventDefault();
      set({ pdlg: null });
    }
    return;
  }
  const hx = e.target.closest && e.target.closest('input[data-act="hexfld"]');
  if (hx) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const hex = normHex(hx.value);
    if (hex) commitPick(hex); else flash("#RRGGBB 처럼 적어 주세요");
    return;
  }
  if ((e.metaKey || e.ctrlKey) && !e.altKey) {
    const c = e.code;
    if (c === "KeyZ") { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
    if (c === "KeyY" && !e.shiftKey) { e.preventDefault(); redo(); return; }
    if (e.target.closest && e.target.closest("[contenteditable][data-id]")) {
      const act = e.shiftKey
        ? ({ KeyX: "strike", Period: "bigger", Comma: "smaller" })[c]
        : ({ KeyB: "bold", KeyI: "italic", KeyU: "underline", Backslash: "clearfmt" })[c];
      const sel0 = window.getSelection();
      if (act && TYPE_FMT[act] && sel0 && sel0.isCollapsed && !pickedIds().length && S.famScope !== "all") {
        e.preventDefault();
        try { document.execCommand(TYPE_FMT[act], false); } catch (er) {}
        return;
      }
      if (act) { e.preventDefault(); fmtCmd(act); return; }
      const al = e.shiftKey && ({ KeyL: "left", KeyE: "center", KeyR: "right", KeyJ: "justify" })[c];
      if (al) { e.preventDefault(); alignMany(al); return; }
      if (!e.shiftKey && (e.key === "Home" || e.key === "End")) {
        const all = cardEditables();
        const t = e.key === "Home" ? all[0] : all[all.length - 1];
        if (t) { e.preventDefault(); caretInto(t, e.key === "Home" ? "start" : "end"); }
        return;
      }
    }
  }
  const el = e.target.closest("[contenteditable]");
  if (!el || !el.dataset.id) return;
  const id = el.dataset.id, k = el.dataset.k;
  const i = S.blocks.findIndex(b => b.id === id);
  const typing = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
  if ((e.key === "Backspace" || e.key === "Delete" || e.key === "Enter" || typing || e.keyCode === 229) && crossSel()) {
    if (e.keyCode === 229 || e.isComposing) { crossDelete(); return; }
    e.preventDefault();
    const at = crossDelete();
    if (!at) return;
    if (typing) { try { document.execCommand("insertText", false, e.key); } catch (er) {} }
    else if (e.key === "Enter" && !e.shiftKey) enterSplit(at);
    return;
  }
  if ((e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") &&
      e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.isComposing) {
    if (extendSel(e.key)) { e.preventDefault(); return; }
  }
  if ((e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") &&
      !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.isComposing) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && sel.isCollapsed) {
      const before = caretOff(el), rect = caretRect(), key0 = e.key;
      setTimeout(() => {
        if (document.activeElement !== el || caretOff(el) !== before) return;
        const all = cardEditables(), j = all.indexOf(el);
        const fwd = key0 === "ArrowDown" || key0 === "ArrowRight";
        const t = all[j + (fwd ? 1 : -1)];
        if (!t) return;
        if ((key0 === "ArrowDown" || key0 === "ArrowUp") && rect) caretInto(t, fwd ? "start" : "end", rect.left);
        else caretInto(t, fwd ? "start" : "end");
      }, 0);
    }
  }
  if (e.key === "Delete" && k === "0" && i >= 0 && i < S.blocks.length - 1 && atEnd(el) && !e.isComposing) {
    const nx = S.blocks[i + 1], here = S.blocks[i];
    const nxOthers = Object.keys(txt).some(x => x.indexOf(nx.id + ":") === 0 && x !== key(nx.id, 0) && plain(txt[x]));
    if (!SINGLE[(TYPES[nx.type] || {}).kind] || !SINGLE[(TYPES[here.type] || {}).kind] || nxOthers) return;
    e.preventDefault();
    snap(true);
    const joinAt = htmlLen(el.innerHTML);
    txt[key(id, 0)] = el.innerHTML + (txt[key(nx.id, 0)] || "");
    Object.keys(txt).forEach(x => { if (x.indexOf(nx.id + ":") === 0) delete txt[x]; });
    const blocks = S.blocks.slice();
    blocks.splice(i + 1, 1);
    set({ blocks: blocks, active: id, picks: (S.picks || []).filter(x => x !== nx.id) });
    restoreCaret({ id: id, k: "0", off: joinAt, end: joinAt });
    return;
  }
  if (e.key === "Enter" && !e.shiftKey) {
    if (e.isComposing || e.keyCode === 229) { imeEnter = el; return; }
    e.preventDefault();
    imeEnter = null;
    enterSplit(el);
    return;
  }
  if (e.key === "Backspace" && k === "0" && i > 0 && atStart(el) && !e.isComposing) {
    const cur0 = S.blocks[i], prev = S.blocks[i - 1];
    const curSingle = !!SINGLE[(TYPES[cur0.type] || {}).kind];
    const prevSingle = !!SINGLE[(TYPES[prev.type] || {}).kind];
    const others = Object.keys(txt).some(x => x.indexOf(cur0.id + ":") === 0 && x !== key(cur0.id, 0) && plain(txt[x]));
    if (!curSingle || others) return;
    if (!plain(el.innerHTML) && !/<img/i.test(el.innerHTML)) {
      e.preventDefault();
      snap(true);
      const blocks = S.blocks.slice();
      blocks.splice(i, 1);
      Object.keys(txt).forEach(x => { if (x.indexOf(cur0.id + ":") === 0) delete txt[x]; });
      set({ blocks: blocks, active: prev.id, picks: (S.picks || []).filter(x => x !== cur0.id) });
      caretToEnd(prev.id);
      return;
    }
    if (!prevSingle) return;
    e.preventDefault();
    snap(true);
    const pk = key(prev.id, 0);
    const joinAt = htmlLen(txt[pk]);
    txt[pk] = (txt[pk] || "") + el.innerHTML;
    delete txt[key(cur0.id, 0)];
    const blocks = S.blocks.slice();
    blocks.splice(i, 1);
    set({ blocks: blocks, active: prev.id, picks: (S.picks || []).filter(x => x !== cur0.id) });
    restoreCaret({ id: prev.id, k: "0", off: joinAt, end: joinAt });
  }
});
const TYPE_FMT = { bold: "bold", italic: "italic", underline: "underline", strike: "strikeThrough" };
const cardEditables = () => [...app.querySelectorAll('.card [contenteditable="true"][data-id]')];
function atEnd(el) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || !sel.isCollapsed) return false;
  const r = sel.getRangeAt(0).cloneRange();
  r.selectNodeContents(el);
  r.setStart(sel.anchorNode, sel.anchorOffset);
  return r.toString().length === 0;
}
function caretOff(el) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || !el.contains(sel.anchorNode)) return -1;
  const r = document.createRange();
  r.selectNodeContents(el); r.setEnd(sel.anchorNode, sel.anchorOffset);
  return r.toString().length;
}
function caretRect() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  const rs = sel.getRangeAt(0).getClientRects();
  return rs.length ? rs[0] : null;
}
function caretInto(t, where, x) {
  t.focus({ preventScroll: true });
  let r = null;
  if (x != null && document.caretRangeFromPoint) {
    const b = t.getBoundingClientRect();
    const y = where === "start" ? b.top + 3 : b.bottom - 3;
    const hit = document.caretRangeFromPoint(Math.min(Math.max(x, b.left + 1), b.right - 1), y);
    if (hit && t.contains(hit.startContainer)) r = hit;
  }
  if (!r) { r = document.createRange(); r.selectNodeContents(t); r.collapse(where === "start"); }
  const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
  if (kbFold) scrollCaretIntoView();
}
function extendSel(k) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return false;
  const hostOf = (n) => { const e = n && n.nodeType === 3 ? n.parentElement : n; return e && e.closest ? e.closest('.card [contenteditable="true"][data-id]') : null; };
  const fh = hostOf(sel.focusNode);
  if (!fh) return false;
  const fwd = k === "ArrowDown" || k === "ArrowRight", line = k === "ArrowDown" || k === "ArrowUp";
  const n0 = sel.focusNode, o0 = sel.focusOffset;
  const m = document.createRange(); m.selectNodeContents(fh);
  try { m.setEnd(n0, o0); } catch (er) { return false; }
  const off = m.toString().length, len = (fh.textContent || "").length;
  const r0 = (() => { const r = document.createRange(); r.setStart(n0, o0); r.collapse(true); const q = r.getClientRects(); return q.length ? q[0] : null; })();
  if (!line) {
    const no = off + (fwd ? 1 : -1);
    if (no >= 0 && no <= len) { const pp = posAt(fh, no, false) || posAt(fh, no, true); if (pp) { sel.extend(pp.node, pp.offset); return true; } }
  } else if (r0 && document.caretRangeFromPoint) {
    const lh = r0.height || 12, b = fh.getBoundingClientRect();
    const y = fwd ? r0.bottom + lh * 0.5 : r0.top - lh * 0.5;
    if (y > b.top && y < b.bottom) {
      const hit = document.caretRangeFromPoint(r0.left, y);
      if (hit && fh.contains(hit.startContainer)) { sel.extend(hit.startContainer, hit.startOffset); return true; }
    }
  }
  const all = cardEditables(), t = all[all.indexOf(fh) + (fwd ? 1 : -1)];
  if (!t) { const pp = posAt(fh, fwd ? len : 0, !fwd); if (pp) sel.extend(pp.node, pp.offset); return true; }
  let tn = null, to = 0;
  if (line && r0 && document.caretRangeFromPoint) {
    const b = t.getBoundingClientRect();
    const hit = document.caretRangeFromPoint(Math.min(Math.max(r0.left, b.left + 1), b.right - 1), fwd ? b.top + 3 : b.bottom - 3);
    if (hit && t.contains(hit.startContainer)) { tn = hit.startContainer; to = hit.startOffset; }
  }
  if (!tn) {
    const tl = (t.textContent || "").length, pp = posAt(t, fwd ? 0 : tl, fwd);
    if (pp) { tn = pp.node; to = pp.offset; } else { tn = t; to = fwd ? 0 : t.childNodes.length; }
  }
  sel.extend(tn, to);
  return true;
}
function alignMany(a) {
  const ids = tgtIds();
  if (!ids.length) return;
  snap(true);
  const back = caretInfo();
  set({ blocks: S.blocks.map(b => ids.indexOf(b.id) < 0 ? b : Object.assign({}, b, { align: a }, b.type === "bubble" ? { side: a === "right" ? "right" : "left" } : {})) });
  restoreCaret(back);
}
function crossSel() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) return null;
  const r = sel.getRangeAt(0);
  const hostOf = (n) => { const e = n && n.nodeType === 3 ? n.parentElement : n; return e && e.closest ? e.closest('.card [contenteditable="true"][data-id]') : null; };
  const a = hostOf(r.startContainer), z = hostOf(r.endContainer);
  return a && z && a !== z ? { r, a, z } : null;
}
function crossDelete() {
  const cs = crossSel();
  if (!cs) return null;
  const { r, a, z } = cs;
  snap(true);
  const aId = a.dataset.id, zId = z.dataset.id;
  const head = document.createRange(); head.selectNodeContents(a); head.setEnd(r.startContainer, r.startOffset);
  const tail = document.createRange(); tail.selectNodeContents(z); tail.setStart(r.endContainer, r.endOffset);
  const box = (rg) => { const d = document.createElement("div"); d.appendChild(rg.cloneContents()); return d.innerHTML; };
  const headHTML = box(head), tailHTML = box(tail), joinAt = head.toString().length;
  const blkNodes = [...app.querySelectorAll(".card [data-block]")];
  const ai = blkNodes.indexOf(a.closest("[data-block]")), zi = blkNodes.indexOf(z.closest("[data-block]"));
  const gone = new Set(blkNodes.slice(ai + 1, zi).map(n => n.dataset.block));
  const zb = S.blocks.find(b => b.id === zId);
  const zOthers = Object.keys(txt).some(x => x.indexOf(zId + ":") === 0 && x !== key(zId, z.dataset.k) && plain(txt[x]));
  const sameBlock = aId === zId;
  const joinable = !sameBlock && zb && SINGLE[(TYPES[zb.type] || {}).kind] && z.dataset.k === "0" && !zOthers;
  if (joinable) {
    txt[key(aId, a.dataset.k)] = headHTML + tailHTML;
    gone.add(zId);
  } else {
    txt[key(aId, a.dataset.k)] = headHTML;
    txt[key(zId, z.dataset.k)] = tailHTML;
  }
  gone.forEach(id => Object.keys(txt).forEach(x => { if (x.indexOf(id + ":") === 0) delete txt[x]; }));
  set({ blocks: S.blocks.filter(b => !gone.has(b.id)), active: aId, picks: [] });
  restoreCaret({ id: aId, k: a.dataset.k, off: joinAt, end: joinAt });
  return app.querySelector('.card [contenteditable][data-id="' + aId + '"][data-k="' + a.dataset.k + '"]');
}
app.addEventListener("cut", (e) => {
  const cs = crossSel();
  if (!cs || !e.clipboardData) return;
  e.preventDefault();
  e.clipboardData.setData("text/plain", crossText(cs));
  crossDelete();
});
function crossText(cs) {
  const { r } = cs;
  return cardEditables().map(h => {
    if (!r.intersectsNode(h)) return null;
    const x = document.createRange(); x.selectNodeContents(h);
    if (h.contains(r.startContainer)) x.setStart(r.startContainer, r.startOffset);
    if (h.contains(r.endContainer)) x.setEnd(r.endContainer, r.endOffset);
    return x.toString();
  }).filter(t => t != null && t.trim()).join("\n\n");
}
app.addEventListener("copy", (e) => {
  const cs = crossSel();
  if (!cs || !e.clipboardData) return;
  e.preventDefault();
  e.clipboardData.setData("text/plain", crossText(cs));
});
function htmlLen(h) { const d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent.length; }
function caretToEnd(id) {
  const n = els[id], fs = n ? n.querySelectorAll('[contenteditable="true"]') : [];
  const f = fs[fs.length - 1];
  if (!f) return;
  f.focus({ preventScroll: true });
  const r = document.createRange();
  r.selectNodeContents(f); r.collapse(false);
  const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
}
let imeEnter = null, lastSplit = 0;
app.addEventListener("compositionend", () => {
  if (!imeEnter) return;
  const t = imeEnter;
  setTimeout(() => { if (imeEnter === t) { imeEnter = null; if (t.isConnected) enterSplit(t); } }, 40);
});
app.addEventListener("beforeinput", (e) => {
  if (e.inputType !== "insertParagraph") return;
  const el = e.target.closest && e.target.closest(".card [contenteditable][data-id]");
  if (!el) return;
  e.preventDefault();
  imeEnter = null;
  enterSplit(el);
});
const HEAD_TYPES = { title: 1, subtitle: 1 };
const CONT_TYPES = { lyric: 1, caption: 1 };
function enterSplit(el) {
  const now = Date.now();
  if (now - lastSplit < 80) return;
  lastSplit = now;
  const id = el.dataset.id, k = el.dataset.k;
  const i = S.blocks.findIndex(b => b.id === id);
  if (i < 0) return;
  const type = S.blocks[i].type;
  const single = !!SINGLE[(TYPES[type] || {}).kind];
  if (k !== "0") {
    const n = el.closest("[data-block]"), fs = n ? [...n.querySelectorAll('[contenteditable="true"][data-id="' + id + '"]')] : [];
    const at = fs.indexOf(el), nx = fs[at + 1] || fs.find(f => f.dataset.k === "0");
    if (nx && nx !== el) {
      nx.focus({ preventScroll: true });
      const r = document.createRange(); r.selectNodeContents(nx); r.collapse(false);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    } else el.blur();
    return;
  }
  snap(true);
  const sel = window.getSelection();
  let tail = "";
  if (sel && sel.rangeCount && el.contains(sel.getRangeAt(0).startContainer)) {
    const r = sel.getRangeAt(0);
    if (!r.collapsed) r.deleteContents();
    const after = document.createRange();
    after.selectNodeContents(el);
    after.setStart(r.endContainer, r.endOffset);
    const box = document.createElement("div");
    box.appendChild(after.extractContents());
    tail = box.innerHTML;
  }
  const bare = (h) => !plain(h) && !/<img/i.test(h);
  if (bare(tail)) tail = "";
  txt[key(id, k)] = bare(el.innerHTML) ? "" : el.innerHTML;
  const nid = "b" + (++seq);
  txt[key(nid, 0)] = tail;
  const blocks = S.blocks.slice();
  const talk = NAME_SLOT[type] > 0;
  let nb = { id: nid, type: CONT_TYPES[type] ? type : single && !(HEAD_TYPES[type] && !tail) ? type : "body" };
  const transNext = type === "translation";
  if (transNext) { nb = { id: nid, type: "translation" }; BLOCK_STYLE_KEYS.forEach(x => { if (S.blocks[i][x] != null) nb[x] = S.blocks[i][x]; }); }
  if (talk) {
    const nt = nextTurn(i, type);
    nb = { id: nid, type: nt.type };
    if (nt.type === "bubble") nb.side = nt.side || "left";
    if (nt.who) txt[key(nid, NAME_SLOT[nt.type])] = nt.who;
  }
  blocks.splice(i + 1, 0, nb);
  set({ blocks: blocks, active: nid, picks: [] });
  const n = els[nid], f = n && n.querySelector('[contenteditable="true"][data-k="0"]');
  if (f) {
    f.focus();
    const r = document.createRange(); r.selectNodeContents(f); r.collapse(true);
    const s2 = window.getSelection(); s2.removeAllRanges(); s2.addRange(r);
  }
}

const RNG_SKIP = { prog: 1 };
const rngOf = (lab) => { const r = lab && lab.previousElementSibling; return r && r.matches && r.matches('input[type="range"]') && !RNG_SKIP[r.dataset.act] ? r : null; };
app.addEventListener("click", (e) => {
  const lab = e.target.closest && e.target.closest(".row > .mono");
  const r = rngOf(lab);
  if (!r || lab.dataset.editing) return;
  e.preventDefault(); e.stopPropagation();
  lab.dataset.editing = "1";
  const f = document.createElement("input");
  f.className = "rngfld mono";
  f.value = r.value;
  f.inputMode = "decimal"; f.enterKeyHint = "done"; f.autocomplete = "off"; f.spellcheck = false;
  f.setAttribute("aria-label", (r.getAttribute("aria-label") || "값") + " 직접 적기 (" + r.min + "~" + r.max + ")");
  lab.style.display = "none";
  lab.after(f);
  f.focus(); try { f.select(); } catch (er) {}
  let done = false;
  const finish = (ok) => {
    if (done) return;
    done = true;
    const v = parseFloat(String(f.value).replace(/,/g, ".").replace(/[^\d.+-]/g, ""));
    f.remove(); lab.style.display = ""; delete lab.dataset.editing;
    if (!ok || !isFinite(v)) return;
    const lo = +r.min, hi = +r.max, st = +r.step || 1;
    let c = Math.min(hi, Math.max(lo, v));
    c = Math.round((c - lo) / st) * st + lo;
    c = Math.round(c * 1000) / 1000;
    r.value = String(c);
    r.dispatchEvent(new Event("input", { bubbles: true }));
    r.dispatchEvent(new Event("change", { bubbles: true }));
    if (c !== v) flash(lo + " ~ " + hi + " 사이로 맞췄습니다");
  };
  f.addEventListener("keydown", (k) => {
    if (k.key === "Enter" && !k.isComposing) { k.preventDefault(); finish(true); }
    else if (k.key === "Escape") { k.preventDefault(); finish(false); }
    k.stopPropagation();
  });
  f.addEventListener("blur", () => finish(true));
}, true);
app.addEventListener("input", (e) => {
  const r = e.target;
  if (!r.matches || !r.matches('input[type="range"]')) return;
  const lab = r.nextElementSibling;
  if (lab && lab.dataset && lab.dataset.live != null) lab.textContent = r.value + lab.dataset.live;
});

let drag = null;

function blockUnder(x, y) {
  const t = document.elementFromPoint(x, y);
  return t && t.closest ? t.closest("[data-block]") : null;
}
function dragCleanup() {
  window.removeEventListener("pointermove", onDragMove);
  window.removeEventListener("pointerup", onDragDrop);
  window.removeEventListener("pointercancel", onDragCancel);
  drag = null;
}
function onDragMove(e) {
  if (!drag) return;
  if (!drag.moved) {
    if (Math.abs(e.clientX - drag.x) < 4 && Math.abs(e.clientY - drag.y) < 4) return;
    drag.moved = true;
    set({ dragging: drag.id });
  }
  e.preventDefault();
  const b = blockUnder(e.clientX, e.clientY);
  if (!b || b.dataset.block === drag.id) {
    if (S.overId) set({ overId: null, overPos: null });
    return;
  }
  const r = b.getBoundingClientRect();
  const pos = e.clientY - r.top < r.height / 2 ? "before" : "after";
  if (S.overId !== b.dataset.block || S.overPos !== pos) set({ overId: b.dataset.block, overPos: pos });
}
function onDragDrop() {
  if (!drag) return;
  const id = drag.id, overId = S.overId, pos = S.overPos || "after", moved = drag.moved;
  dragCleanup();
  const reset = { dragging: null, overId: null, overPos: null };
  if (!moved || !overId || overId === id) { set(reset); return; }
  const from = S.blocks.findIndex(x => x.id === id);
  const target = S.blocks.findIndex(x => x.id === overId);
  if (from < 0 || target < 0) { set(reset); return; }
  snap(true);
  let to = pos === "after" ? target + 1 : target;
  if (from < to) to -= 1;
  const blocks = S.blocks.slice();
  const m = blocks.splice(from, 1)[0];
  blocks.splice(to, 0, m);
  set(Object.assign({ blocks: blocks, active: id }, reset));
}
function onDragCancel() {
  dragCleanup();
  set({ dragging: null, overId: null, overPos: null });
}
let swipe = null;
app.addEventListener("pointerdown", (e) => {
  if (S.preview && e.target.closest(".preview-body")) swipe = { x: e.clientX, y: e.clientY };
});
window.addEventListener("pointerup", (e) => {
  if (!swipe) return;
  const dx = e.clientX - swipe.x, dy = e.clientY - swipe.y;
  swipe = null;
  if (!S.preview || S.pages < 2) return;
  if (Math.abs(dx) < 44 || Math.abs(dx) <= Math.abs(dy)) return;
  set({ page: dx < 0 ? Math.min(S.pages - 1, S.page + 1) : Math.max(0, S.page - 1) });
});

window.addEventListener("keydown", (e) => {
  if (S.screen === "edit" && !S.pdlg && !S.xdlg && !S.cdlg && !fsEl) {
    const a = document.activeElement;
    const typing = a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName));
    if (((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === "k" || e.key === "K")) ||
        (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey && !typing)) {
      e.preventDefault(); fsOpen(); return;
    }
  }
  if (S.cdlg && S.cdlg.act === "delpicks" && (e.key === "Enter" || e.key === "Escape")) {
    e.preventDefault();
    if (e.key === "Enter") { set({ cdlg: null }); delBlock(); } else set({ cdlg: null });
    return;
  }
  if ((e.key === "Delete" || e.key === "Backspace") && !e.ctrlKey && !e.metaKey && !e.altKey && !e.isComposing &&
      S.screen === "edit" && !S.preview && !S.pdlg && !S.xdlg && !S.cdlg && pickedIds().length > 1) {
    const a = document.activeElement, sel = window.getSelection();
    const inField = a && a.matches && a.matches("input, textarea, select");
    const textSel = a && a.isContentEditable && sel && !sel.isCollapsed;
    if (!inField && !textSel) {
      e.preventDefault();
      const n = pickedIds().length;
      if (n >= S.blocks.length) { flash("블록을 모두 지울 수는 없어요 · 하나는 남겨 주세요"); return; }
      if (a && a.isContentEditable && a.blur) a.blur();
      set({ cdlg: { title: "블록 " + n + "개를 지울까요?", note: "지운 뒤에도 되돌리기로 살릴 수 있어요.", ok: "지우기", act: "delpicks" } });
      return;
    }
  }
  if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "a" || e.key === "A") && S.screen === "edit" && !S.preview && !S.pdlg && !S.xdlg && !S.cdlg) {
    const a = document.activeElement;
    if (a && a.matches && a.matches("input, textarea")) return;
    if (a && a.isContentEditable && inCard(a)) {
      const sel = window.getSelection(), all = (a.textContent || "").length;
      if (!(sel && all && sel.toString().length >= all)) return;
    }
    e.preventDefault();
    if (a && a.blur) a.blur();
    set({ picks: S.blocks.map(b => b.id), pickOn: false });
    flash("블록 " + S.blocks.length + "개를 모두 골랐어요 · Esc 로 풀기");
    return;
  }
  if (!S.preview && e.key === "Escape" && S.screen === "edit" && (pickedIds().length || S.pickOn) &&
      !(e.target.closest && e.target.closest("input, textarea")) && !S.pdlg && !S.xdlg && !S.cdlg) {
    e.preventDefault(); set({ picks: [], pickOn: false }); return;
  }
  if (!S.preview && e.key === "Escape" && S.screen === "edit" && S.famScope === "all" && !(e.target.closest && e.target.closest("input, textarea")) && !S.pdlg && !S.xdlg && !S.cdlg) {
    e.preventDefault(); set({ famScope: "auto" }); scopeKey = ""; return;
  }
  if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === "s" || e.key === "S")) {
    e.preventDefault();
    const raw = app.querySelector("#raw");
    if (S.screen !== "edit" && !(raw ? raw.value : rawDraft).trim()) { flash("저장할 작업이 없어요"); return; }
    const p = saveDraft();
    (p || Promise.resolve()).then(() => flash("임시 저장했어요 · " + new Date().toTimeString().slice(0, 5)));
    return;
  }
  if (!S.preview) return;
  if (e.key === "Escape") { e.preventDefault(); set({ preview: false }); }
  else if (e.key === "ArrowRight") { e.preventDefault(); set({ page: Math.min(S.pages - 1, S.page + 1) }); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); set({ page: Math.max(0, S.page - 1) }); }
});

app.addEventListener("pointerdown", (e) => {
  const g = e.target.closest("[data-drag]");
  if (!g || drag) return;
  e.preventDefault();
  drag = { id: g.dataset.drag, x: e.clientX, y: e.clientY, moved: false };
  window.addEventListener("pointermove", onDragMove, { passive: false });
  window.addEventListener("pointerup", onDragDrop);
  window.addEventListener("pointercancel", onDragCancel);
});

function restart() {
  set({ cdlg: { title: "새 카드로 시작할까요?",
    note: "지금 카드는 \u2018내 작업\u2019 보관함에 남아요(되돌리기 기록은 사라집니다). 테마(바탕·글꼴·색·여백)와 인물 색은 다음 카드로 이어집니다.",
    ok: "새로 시작", act: "restart", alt: "테마도 기본으로 되돌리고 시작", altAct: "restartfresh" } });
}
function restartNow(fresh) {
  saveWork();
  workId = null; workDirty = false; libSaved = new Set();
  const keep = { presets: S.presets, recent: S.recent, custom: S.custom, calpha: S.calpha, castColor: S.castColor || {}, qStyle: S.qStyle };
  if (!fresh) Object.assign(keep, JSON.parse(JSON.stringify(pickTheme(S))), { bgImage: false });
  Object.keys(S).forEach(k => { delete S[k]; });
  Object.assign(S, JSON.parse(JSON.stringify(S0)), keep);
  txt = {};
  rawDraft = "";
  media = []; mseq = 0; seq = 100;
  histQuiet(); els = {}; bgURL = ""; bgBlob = null;
  clearDraft();
  if (fresh) saveLastTheme();
  render();
  if (fresh) flash("테마를 기본으로 되돌렸습니다");
}
const selTpl = () => tplById(S.tplSel) || TEMPLATES[0];
function resetThemeNow() {
  Object.assign(S, JSON.parse(JSON.stringify(pickTheme(S0))));
  S.tplId = "t-basic";
  saveLastTheme();
  render();
  flash("테마를 기본으로 되돌렸습니다");
}

async function pasteRaw() {
  const raw = app.querySelector("#raw");
  if (!raw) return;
  try {
    const t = await navigator.clipboard.readText();
    if (!t || !t.trim()) { flash("복사해 둔 글이 없어요"); return; }
    raw.value = raw.value.trim() ? raw.value.replace(/\s+$/, "") + "\n\n" + t : t;
    rawDraft = raw.value;
    flash("붙여넣었어요 · 아래 '글 분석해서 시작'");
  } catch (e) {
    raw.focus();
    flash("글칸을 길게 눌러 ‘붙여넣기’를 골라 주세요");
  }
}
function startBlank() {
  build([{ type: "title", a: "제목" }, { type: "body", a: "여기에 문장을 씁니다." }, { type: "credit", a: "© syzzy.xyz" }]);
}

const DRAFT_DB = "excerpt-draft", DRAFT_KEY = "draft", DRAFT_V = 1;
const DRAFT_SKIP = ["presets", "recent", "custom", "calpha", "toast", "sheet", "pdlg", "cdlg", "xdlg", "pedit", "preview",
  "dragging", "overId", "overPos", "pickOn", "over", "pages", "offsets", "clips", "cpOpen", "rec",
  "famScope", "more", "busy", "expHi", "cpkFold", "hintOpen", "advOn", "lib", "brush", "tplpv", "tplRaw", "tplSel", "tplCat", "bsheet", "toastAct", "typeOffer", "typeJust"];
const savedBlobs = new Set();
let dbP = null;
function idb(mode, fn) {
  if (!dbP) {
    dbP = new Promise((ok, no) => {
      if (!window.indexedDB) { no(new Error("indexedDB 없음")); return; }
      const rq = indexedDB.open(DRAFT_DB, 1);
      rq.onupgradeneeded = () => rq.result.createObjectStore("kv");
      rq.onsuccess = () => ok(rq.result);
      rq.onerror = () => no(rq.error);
    }).catch((e) => { dbP = null; throw e; });
  }
  return dbP.then(db => new Promise((ok, no) => {
    const tx = db.transaction("kv", mode);
    fn(tx.objectStore("kv"));
    tx.oncomplete = () => ok();
    tx.onerror = tx.onabort = () => no(tx.error);
  }));
}
function idbGet(keys) {
  const out = {};
  return idb("readonly", st => keys.forEach(k => { const r = st.get(k); r.onsuccess = () => { out[k] = r.result; }; }))
    .then(() => out);
}
function saveDraft() {
  clearTimeout(draftT);
  if (!draftReady) return;
  saveWork();
  const raw = app.querySelector("#raw");
  const rawText = raw ? raw.value : rawDraft;
  if (S.screen !== "edit" && !rawText.trim()) { clearDraft(); return; }
  const s = {};
  Object.keys(S).forEach(k => { if (DRAFT_SKIP.indexOf(k) < 0) s[k] = S[k]; });
  const blobs = {};
  media.forEach(m => { if (m.blob) blobs["m:" + m.id] = m.blob; });
  if (bgURL && bgBlob) blobs["bg:" + bgKey] = bgBlob;
  const d = {
    v: DRAFT_V, at: Date.now(), app: APP_VERSION, workId: workId,
    S: JSON.parse(JSON.stringify(s)), txt: Object.assign({}, txt), raw: rawText,
    seq: seq, mseq: mseq, bgKey: bgKey,
    media: media.filter(m => m.blob).map(m => m.id), bg: !!(bgURL && bgBlob)
  };
  const fresh = Object.keys(blobs).filter(k => !savedBlobs.has(k));
  const stale = Array.from(savedBlobs).filter(k => !blobs[k]);
  return idb("readwrite", st => {
    fresh.forEach(k => st.put(blobs[k], k));
    stale.forEach(k => st.delete(k));
    st.put(d, DRAFT_KEY);
  }).then(() => {
    fresh.forEach(k => savedBlobs.add(k));
    stale.forEach(k => savedBlobs.delete(k));
  }).catch(draftFail);
}
function scheduleSave() {
  pfxRefresh();
  if (S.screen === "edit") { saveLastTheme(); saveCastColor(); }
  if (!draftReady) return;
  clearTimeout(draftT);
  draftT = setTimeout(saveDraft, 700);
}
function clearDraft() {
  clearTimeout(draftT);
  savedBlobs.clear();
  idb("readwrite", st => st.clear()).catch(() => {});
}
let draftWarned = false;
function draftFail(e) {
  if (draftWarned) return;
  draftWarned = true;
  flash(e && e.name === "QuotaExceededError" ? "저장 공간이 모자라 자동 저장을 못 했어요" : "이 브라우저에서는 자동 저장이 안 돼요");
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveDraft(); });
window.addEventListener("pagehide", saveDraft);

function draftNote(d) {
  const when = new Date(d.at).toLocaleString("ko-KR", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
  const first = (d.S.blocks || []).map(b => plain((d.txt || {})[key(b.id, 0)])).find(Boolean) || "";
  const n = (d.S.blocks || []).length;
  const pics = (d.media || []).length + (d.bg ? 1 : 0);
  return (first ? "「" + (first.length > 18 ? first.slice(0, 18) + "…" : first) + "」 · " : "") +
    "블록 " + n + "개" + (pics ? " · 사진 " + pics + "장" : "") + " · " + when + " 저장";
}
function initDraft() {
  idbGet([DRAFT_KEY]).then(r => {
    const d = r[DRAFT_KEY];
    if (!d || d.v !== DRAFT_V || !d.S) { draftReady = true; return; }
    if (d.S.screen !== "edit") {
      const raw = app.querySelector("#raw");
      if (S.screen === "input" && raw && !raw.value.trim() && d.raw) { raw.value = d.raw; rawDraft = d.raw; }
      draftReady = true;
      return;
    }
    pendingDraft = d;
    set({ cdlg: { title: "편집하던 카드가 남아 있어요. 이어서 할까요?", note: draftNote(d),
      ok: "이어서 하기", no: "새로 시작", act: "draftload", safe: true, sticky: true } });
  }).catch(() => { draftReady = true; });
}
function loadDraftNow() {
  const d = pendingDraft;
  pendingDraft = null;
  if (!d) { draftReady = true; set({ cdlg: null }); return; }
  const keys = (d.media || []).map(id => "m:" + id).concat(d.bg ? ["bg:" + d.bgKey] : []);
  idbGet(keys).then(blobs => {
    Object.keys(blobs).forEach(k => { if (!blobs[k]) delete blobs[k]; });
    const lost = applySaved(d, blobs);
    savedBlobs.clear();
    Object.keys(blobs).forEach(k => savedBlobs.add(k));
    workId = d.workId || newWid(); workDirty = true; libSaved = new Set();
    draftReady = true;
    render();
    track("draft_restore", { blocks: S.blocks.length });
    flash(lost ? "이어서 편집합니다 · 사진 " + lost + "장은 다시 넣어 주세요" : "이어서 편집합니다");
  }).catch(() => {
    draftReady = true;
    set({ cdlg: null });
    flash("저장본을 읽지 못했어요");
  });
}
function dropDraft() {
  const d = pendingDraft;
  pendingDraft = null;
  importDraftToLib(d).then(libRefresh);
  clearDraft();
  draftReady = true;
  set({ cdlg: null });
}


const LIB_DB = "excerpt-library";
let libP = null, workId = null, workDirty = false, libList = [], libSaved = new Set(), libThumbURL = {};
const newWid = () => "w" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function lib(mode, fn) {
  if (!libP) {
    libP = new Promise((ok, no) => {
      if (!window.indexedDB) { no(new Error("indexedDB 없음")); return; }
      const rq = indexedDB.open(LIB_DB, 1);
      rq.onupgradeneeded = () => {
        const db = rq.result;
        db.createObjectStore("works", { keyPath: "id" });
        db.createObjectStore("blobs");
        db.createObjectStore("thumbs");
      };
      rq.onsuccess = () => ok(rq.result);
      rq.onerror = () => no(rq.error);
    }).catch((e) => { libP = null; throw e; });
  }
  return libP.then(db => new Promise((ok, no) => {
    const tx = db.transaction(["works", "blobs", "thumbs"], mode);
    const out = fn(tx.objectStore("works"), tx.objectStore("blobs"), tx.objectStore("thumbs"));
    tx.oncomplete = () => ok(out);
    tx.onerror = tx.onabort = () => no(tx.error);
  }));
}
function libRefresh() {
  const got = { works: [], thumbs: {} };
  return lib("readonly", (w, bl, th) => {
    const r = w.getAll();
    r.onsuccess = () => { got.works = r.result || []; };
    const c = th.openCursor();
    c.onsuccess = () => { const cur = c.result; if (cur) { got.thumbs[cur.key] = cur.value; cur.continue(); } };
  }).then(() => {
    const sig = (l) => l.map(x => x.id + x.at).join();
    const thumbSig = (m) => Object.keys(m).map(id => id + ":" + (m[id].blob ? m[id].blob.size : m[id].size)).sort().join();
    const before = sig(libList) + "|" + thumbSig(libThumbURL);
    Object.keys(libThumbURL).forEach(id => { if (!got.thumbs[id]) { URL.revokeObjectURL(libThumbURL[id].url); delete libThumbURL[id]; } });
    Object.keys(got.thumbs).forEach(id => {
      const t = got.thumbs[id];
      if (!libThumbURL[id] || libThumbURL[id].blob !== t) {
        if (libThumbURL[id]) URL.revokeObjectURL(libThumbURL[id].url);
        libThumbURL[id] = { blob: t, url: URL.createObjectURL(t) };
      }
    });
    const next = got.works.map(x => ({ id: x.id, title: x.title, at: x.at, n: x.n, bg: x.bg, ink: x.ink }))
      .sort((a, b) => b.at - a.at);
    const changed = before !== sig(next) + "|" + thumbSig(libThumbURL);
    libList = next;
    if (changed && (S.screen === "input" || S.lib)) render();
  }).catch(() => {});
}
const lineText = (h) => plain(String(h || "").replace(/<br\s*\/?>|<\/(div|p)>/gi, " ")).replace(/\s+/g, " ").trim();
function workTitle() {
  const t = S.blocks.find(b => b.type === "title" && lineText(txt[key(b.id, 0)]));
  const any = t || S.blocks.find(b => lineText(txt[key(b.id, 0)]));
  const raw = any ? lineText(txt[key(any.id, 0)]) : "";
  const ta = document.createElement("textarea"); ta.innerHTML = raw;
  const s = ta.value;
  return s.length > 30 ? s.slice(0, 30) + "…" : (s || "제목 없는 카드");
}
function snapshotData() {
  const s = {};
  Object.keys(S).forEach(k => { if (DRAFT_SKIP.indexOf(k) < 0 && k !== "lib") s[k] = S[k]; });
  return {
    v: DRAFT_V, S: JSON.parse(JSON.stringify(s)), txt: Object.assign({}, txt), raw: rawDraft,
    seq: seq, mseq: mseq, bgKey: bgKey, media: media.filter(m => m.blob).map(m => m.id), bg: !!(bgURL && bgBlob)
  };
}
function saveWork() {
  if (S.screen !== "edit" || !workDirty) return;
  if (!S.blocks.some(b => plain(txt[key(b.id, 0)]) || plain(txt[key(b.id, 1)]))) return;
  if (!workId) workId = newWid();
  const id = workId;
  const blobs = {};
  media.forEach(m => { if (m.blob) blobs["m:" + m.id] = m.blob; });
  if (bgURL && bgBlob) blobs["bg:" + bgKey] = bgBlob;
  const fresh = Object.keys(blobs).filter(k => !libSaved.has(id + "|" + k));
  const stale = Array.from(libSaved).filter(k => k.indexOf(id + "|") === 0 && !blobs[k.slice(id.length + 1)]);
  thumbDirty = true;
  const prev = libList.find(x => x.id === id);
  const rec = {
    id: id, title: workTitle(), at: Date.now(), created: prev && prev.created || Date.now(), n: S.blocks.length,
    bg: S.bgImage ? "#2a2a28" : bgMid(), ink: isDark() ? "#ffffff" : "#111111", d: snapshotData()
  };
  lib("readwrite", (w, bl) => {
    fresh.forEach(k => bl.put(blobs[k], id + "|" + k));
    stale.forEach(k => bl.delete(k));
    w.put(rec);
  }).then(() => {
    fresh.forEach(k => libSaved.add(id + "|" + k));
    stale.forEach(k => libSaved.delete(k));
    libRefresh();
    if (S.screen === "edit") thumbSoon();
  }).catch(draftFail);
}
let thumbT = 0, thumbDirty = false, thumbBusy = null;
function thumbSoon() { thumbDirty = true; clearTimeout(thumbT); thumbT = setTimeout(makeThumb, 4000); }
function makeThumb() {
  clearTimeout(thumbT);
  if (!thumbDirty || !workId || S.screen !== "edit") return Promise.resolve();
  if (thumbBusy) return thumbBusy;
  thumbDirty = false;
  const id = workId;
  thumbBusy = cardBlob({ thumb: true }).then(bl => bl && lib("readwrite", (w, b2, th) => { th.put(bl, id); }))
    .then(() => libRefresh()).catch(() => {}).then(() => { thumbBusy = null; });
  return thumbBusy;
}
function leaveWork() {
  saveDraft();
  return Promise.race([makeThumb(), new Promise(ok => setTimeout(ok, 1500))]);
}
function applySaved(d, blobs) {
  const cc = Object.assign({}, S.castColor || {}, d.S.castColor || {});
  const keepPrefs = { presets: S.presets, recent: S.recent, custom: S.custom, calpha: S.calpha };
  Object.assign(S, d.S, keepPrefs, { castColor: cc, cdlg: null, preview: false, page: 0, pages: 1, offsets: [0], clips: [0], famScope: "auto", lib: false, more: false, brush: null });
  txt = d.txt || {};
  rawDraft = d.raw || "";
  seq = Math.max(seq, d.seq || 0);
  mseq = d.mseq || 0;
  bgKey = d.bgKey || 0;
  media.forEach(m => { if (m.url) URL.revokeObjectURL(m.url); });
  media = (d.media || []).filter(id => blobs["m:" + id]).map(id => {
    const b = blobs["m:" + id];
    return { id: id, blob: b, url: URL.createObjectURL(b) };
  });
  bgBlob = d.bg ? (blobs["bg:" + bgKey] || null) : null;
  bgURL = bgBlob ? URL.createObjectURL(bgBlob) : "";
  histQuiet(); els = {};
  return ((d.media || []).length + (d.bg ? 1 : 0)) - (media.length + (bgBlob ? 1 : 0));
}
function libRead(id) {
  const out = { rec: null, blobs: {} };
  return lib("readonly", (w, bl) => {
    const r = w.get(id);
    r.onsuccess = () => { out.rec = r.result || null; };
    const c = bl.openCursor(IDBKeyRange.bound(id + "|", id + "|￿"));
    c.onsuccess = () => { const cur = c.result; if (cur) { out.blobs[cur.key.slice(id.length + 1)] = cur.value; cur.continue(); } };
  }).then(() => out);
}
function openWork(id) {
  if (id === workId && S.screen === "edit") { set({ lib: false }); return; }
  leaveWork().then(() => libRead(id)).then(({ rec, blobs }) => {
    if (!rec || !rec.d) { flash("이 작업을 찾지 못했어요"); libRefresh(); return; }
    const lost = applySaved(rec.d, blobs);
    workId = id; workDirty = false;
    libSaved = new Set(Object.keys(blobs).map(k => id + "|" + k));
    S.screen = "edit";
    render();
    saveDraft();
    flash("「" + rec.title + "」" + (lost ? " · 사진 " + lost + "장은 다시 넣어 주세요" : " 열었어요"));
  }).catch(() => flash("보관함을 읽지 못했어요"));
}
const blobToDataURL = (b) => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => no(r.error); r.readAsDataURL(b); });
function dataURLToBlob(u) {
  const m = /^data:([^;,]*)(;base64)?,(.*)$/.exec(String(u || ""));
  if (!m) return null;
  const bin = m[2] ? atob(m[3]) : decodeURIComponent(m[3]);
  const a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return new Blob([a], { type: m[1] || "application/octet-stream" });
}
async function libExport() {
  try {
    if (S.screen === "edit") { saveWork(); await leaveWork(); }
    const got = { works: [], blobs: {}, thumbs: {} };
    await lib("readonly", (w, bl, th) => {
      const r = w.getAll(); r.onsuccess = () => { got.works = r.result || []; };
      const c = bl.openCursor(); c.onsuccess = () => { const cur = c.result; if (cur) { got.blobs[cur.key] = cur.value; cur.continue(); } };
      const t = th.openCursor(); t.onsuccess = () => { const cur = t.result; if (cur) { got.thumbs[cur.key] = cur.value; cur.continue(); } };
    });
    if (!got.works.length) { flash("내보낼 작업이 없어요"); return; }
    const out = { app: "excerpt-library", v: 1, at: Date.now(), works: got.works, blobs: {}, thumbs: {} };
    for (const k of Object.keys(got.blobs)) if (got.blobs[k] instanceof Blob) out.blobs[k] = await blobToDataURL(got.blobs[k]);
    for (const k of Object.keys(got.thumbs)) if (got.thumbs[k] instanceof Blob) out.thumbs[k] = await blobToDataURL(got.thumbs[k]);
    const d = new Date(), pad = (n) => String(n).padStart(2, "0");
    download(new Blob([JSON.stringify(out)], { type: "application/json" }),
      "excerpt-library-" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".json");
    flash("작업 " + got.works.length + "개를 파일로 내보냈어요");
  } catch (e) { flash("내보내지 못했어요"); }
}
function libImportPick() {
  const inp = document.createElement("input");
  inp.type = "file"; inp.accept = "application/json,.json";
  inp.onchange = () => { const f = inp.files && inp.files[0]; if (f) libImport(f); };
  inp.click();
}
async function libImport(file) {
  let o = null;
  try { o = JSON.parse(await file.text()); } catch (e) { flash("읽을 수 없는 파일이에요"); return; }
  if (!o || o.app !== "excerpt-library" || !Array.isArray(o.works)) { flash("발췌기 보관함 파일이 아니에요"); return; }
  const have = {}; libList.forEach(x => { have[x.id] = x.at || 0; });
  const take = o.works.filter(r => r && typeof r.id === "string" && r.d && typeof r.d === "object" && !(have[r.id] >= (r.at || 0)));
  if (!take.length) { flash("새로 가져올 작업이 없어요 · 모두 이미 있어요"); return; }
  const ids = new Set(take.map(r => r.id));
  try {
    await lib("readwrite", (w, bl, th) => {
      take.forEach(r => { bl.delete(IDBKeyRange.bound(r.id + "|", r.id + "|\uffff")); w.put(r); });
      Object.keys(o.blobs || {}).forEach(k => { const id = k.split("|")[0]; if (!ids.has(id)) return; const b = dataURLToBlob(o.blobs[k]); if (b) bl.put(b, k); });
      Object.keys(o.thumbs || {}).forEach(id => { if (!ids.has(id)) return; const b = dataURLToBlob(o.thumbs[id]); if (b) th.put(b, id); });
    });
    await libRefresh();
    render();
    flash("작업 " + take.length + "개를 가져왔어요");
  } catch (e) { flash("가져오지 못했어요"); }
}
function dupWork(id) {
  libRead(id).then(({ rec, blobs }) => {
    if (!rec) return;
    const nid = newWid();
    return lib("readwrite", (w, bl, th) => {
      Object.keys(blobs).forEach(k => bl.put(blobs[k], nid + "|" + k));
      w.put(Object.assign({}, rec, { id: nid, title: rec.title + " 사본", at: Date.now(), created: Date.now() }));
      const t = libThumbURL[id];
      if (t) th.put(t.blob, nid);
    }).then(() => { flash("복제했어요"); libRefresh(); });
  }).catch(draftFail);
}
function delWorkNow(id) {
  lib("readwrite", (w, bl, th) => {
    w.delete(id); th.delete(id);
    bl.delete(IDBKeyRange.bound(id + "|", id + "|￿"));
  }).then(() => {
    if (id === workId) { workId = null; workDirty = true; libSaved = new Set(); }
    set({ cdlg: null });
    flash("지웠어요");
    libRefresh();
  }).catch(draftFail);
}
function importDraftToLib(d) {
  if (!d || !d.S || d.workId) return Promise.resolve();
  const keys = (d.media || []).map(id => "m:" + id).concat(d.bg ? ["bg:" + d.bgKey] : []);
  return idbGet(keys).then(blobs => {
    const id = newWid();
    const first = (d.S.blocks || []).map(b => plain((d.txt || {})[key(b.id, 0)])).find(Boolean) || "제목 없는 카드";
    return lib("readwrite", (w, bl) => {
      keys.forEach(k => { if (blobs[k]) bl.put(blobs[k], id + "|" + k); });
      w.put({ id: id, title: first.length > 30 ? first.slice(0, 30) + "…" : first, at: d.at || Date.now(), created: d.at || Date.now(),
        n: (d.S.blocks || []).length, bg: normHex(d.S.bg) || "#ffffff", ink: "#111111", d: d });
    });
  }).catch(() => {});
}
const relTime = (at) => {
  const m = Math.floor((Date.now() - at) / 60000);
  if (m < 1) return "방금";
  if (m < 60) return m + "분 전";
  if (m < 60 * 24) return Math.floor(m / 60) + "시간 전";
  const d = new Date(at);
  return (d.getMonth() + 1) + "월 " + d.getDate() + "일";
};
function workTile(x, withActs) {
  const t = libThumbURL[x.id];
  const cur = x.id === workId && S.screen === "edit";
  return '<div class="wtile' + (cur ? " cur" : "") + '">' +
    '<button class="wt-card" data-act="wopen" data-w="' + x.id + '" title="' + esc(x.title) + ' 열기">' +
      (t ? '<img src="' + t.url + '" alt="" />'
         : '<span class="wt-fb" style="background:' + esc(x.bg || "#fff") + ";color:" + esc(x.ink || "#111") + '">' + esc(x.title) + "</span>") +
      (cur ? '<span class="wt-cur">편집 중</span>' : "") + "</button>" +
    '<span class="wt-n">' + esc(x.title) + '</span><span class="wt-t">' + relTime(x.at) + "</span>" +
    (withActs
      ? '<span class="wt-acts"><button class="link" data-act="wdup" data-w="' + x.id + '">복제</button>' +
        '<button class="link danger" data-act="wdel" data-w="' + x.id + '">삭제</button></span>'
      : "") + "</div>";
}
function libRowHTML() {
  if (!libList.length) return "";
  return '<div class="lib-wrap"><div class="sec-h"><b>내 작업</b><button class="link" data-act="libopen">모두 보기 ' + libList.length + "</button></div>" +
    '<div class="chipwrap"><div class="chips works">' + libList.slice(0, 8).map(x => workTile(x, false)).join("") + "</div></div></div>";
}
function libHTML() {
  if (!S.lib) return "";
  return '<div class="sheet lib" data-act="libclose"><div class="sheet-card lib-card" data-stop><h2>내 작업 <span class="mono">' + libList.length + "</span></h2>" +
    (libList.length
      ? '<p class="note" style="margin:0 0 12px">만든 카드는 여기에 저절로 모여요 · 이 브라우저에만 저장됩니다</p><div class="lib-grid">' + libList.map(x => workTile(x, true)).join("") + "</div>"
      : '<p class="note">아직 저장된 카드가 없어요. 카드를 만들면 여기에 저절로 모여요.</p>') +
    '<div class="row lib-io" style="gap:8px;margin-top:14px">' +
      (libList.length ? '<button class="btn grow" style="height:40px" data-act="libexport" data-hold>' + ic("save", 16) + " 전체 내보내기</button>" : "") +
      '<button class="btn grow" style="height:40px" data-act="libimport" data-hold>' + ic("share", 16) + " 파일에서 가져오기</button></div>" +
    '<p class="note" style="margin:6px 0 0">다른 PC로 옮길 때: 여기서 내보낸 파일을 그 PC에서 ‘파일에서 가져오기’ · 같은 작업은 더 최근 것을 남겨요</p>' +
    '<button class="sheet-close text" data-act="libclose">닫기</button></div></div>';
}

document.body.classList.toggle("view-full", viewMode === "full");
syncViewport();
{
  const bm = document.createElement("div");
  bm.className = "bg-maker";
  bm.innerHTML = MAKER;
  document.body.appendChild(bm);
}
render();
initDraft();
libRefresh();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => setTimeout(() => { bubFit(); fitCard(); measure(); }, 30));
  if (document.fonts.addEventListener) {
    let fontT = 0;
    document.fonts.addEventListener("loadingdone", () => {
      clearTimeout(fontT);
      fontT = setTimeout(() => { if (S.screen !== "input") { bubFit(); fitCard(); measure(); } }, 60);
    });
  }
}
