const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('index.html', 'utf8');
const lines = source.split(/\r?\n/);
function section(start, end) { return lines.slice(start - 1, end).join('\n'); }
function fn(name) { const m = source.match(new RegExp('^function '+name+'\\([^]*?^}', 'm')); if (!m) throw new Error(name); return m[0]; }
const results = {};
// 실제 소스의 상태 검증 함수를 실행한다. UI·브라우저 재현과는 구분한다.
const state = {themes:[{id:'t'}],activeThemeId:'t',characters:[],blocks:[],ui:{editingCharacterId:'deleted',charDraft:{id:'deleted'}}};
vm.runInNewContext(fn('validateState') + '\nvalidateState();', {S:state});
results.staleCharacterDraft = state.ui.editingCharacterId === 'deleted' && !!state.ui.charDraft;
assert.equal(results.staleCharacterDraft, true);
const validator = fn('settingsHas') + '\n' + source.match(/const validSettings = [^]*?;/)[0];
results.malformedSettingsAccepted = vm.runInNewContext(validator + '\nvalidSettings({characters:[null],themes:[null]});', {SETTINGS_PARTS:[['characters'],['themes'],['colors']]});
assert.equal(results.malformedSettingsAccepted, true);
// 서로 다른 확정 동작도 시간만 가까우면 한 걸음으로 합쳐지는지 확인한다.
let time = 1000;
const ctx = {S:{blocks:[],characters:[],themes:[],format:{},canvas:{},colors:{}},SCHEMA:13,Date:{now:()=>time}};
vm.createContext(ctx);
vm.runInContext(source.match(/const HIST_MAX = [^]*?function histRecord/)[0].replace(/function histRecord$/, '') + fn('histRecord') + '\nhistRecord();', ctx);
time = 2000;
vm.runInContext('S.blocks.push({id:"a"});histRecord();', ctx);
time = 2200;
results.independentActionsUndoSteps = vm.runInContext('S.characters.push({id:"b"});histRecord();_undoS.length;', ctx);
assert.equal(results.independentActionsUndoSteps, 1);
const scripts = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());
for (const script of scripts) new vm.Script(script);
results.inlineScriptsParse = scripts.length;
results.scope = '현재 소스의 함수 단위 검증. 브라우저 화면, IME, PNG 재현 결과가 아님.';
fs.writeFileSync('검증 결과물/전체검토-2026-10-12/static-results.json', JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
