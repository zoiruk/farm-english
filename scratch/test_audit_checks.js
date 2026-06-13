// test_audit_checks.js — synthetic fixture tests for advanced_audit.js (Task 6.5)
// Verifies that each new check (8-11) catches exactly its own error class.
// Run: node scratch/test_audit_checks.js
// Exits 0 on all pass, 1 on any failure.
'use strict';

// ── Inline copy of the four new check functions ──────────────────────────────
// (Reproduces logic so the test is self-contained and runs standalone.)

const VALID_SPEAKERS = new Set(['m', 'w', 'c', 'd']);
const CYRILLIC_RE = /[а-яёА-ЯЁ]/;
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];

function hasText(v) { return typeof v === 'string' && v.trim().length > 0; }

function runCheck(fn, lesson) {
  const errors = [];
  fn(lesson, (msg) => errors.push(msg));
  return errors;
}

function checkSpeakerRoles(lesson, report) {
  for (const [i, line] of (lesson.dialogue || []).entries()) {
    if (hasText(line.s) && !VALID_SPEAKERS.has(line.s)) {
      report(`dialogue[${i}] invalid speaker "${line.s}"`);
    }
  }
}

function checkLessonNames(lesson, report) {
  for (const lang of LANGS) {
    const key = 'name_' + lang;
    if (!hasText(lesson[key])) report(`missing ${key}`);
  }
}

function checkTranscrFormat(lesson, report) {
  for (const [i, word] of (lesson.words || []).entries()) {
    if (hasText(word.transcr) && !CYRILLIC_RE.test(word.transcr)) {
      report(`words[${i}] transcr "${word.transcr}" no Cyrillic`);
    }
  }
  for (const [i, line] of (lesson.dialogue || []).entries()) {
    if (hasText(line.transcr) && !CYRILLIC_RE.test(line.transcr)) {
      report(`dialogue[${i}] transcr "${line.transcr}" no Cyrillic`);
    }
  }
}

function checkEmojiDiversity(lesson, report) {
  const words = lesson.words || [];
  if (words.length === 0) return;
  const unique = new Set(words.map(w => w.e));
  const pct = unique.size / words.length;
  if (pct < 0.8) {
    report(`emoji diversity ${Math.round(pct * 100)}% (${unique.size}/${words.length} unique)`);
  }
}

// ── Fixtures ─────────────────────────────────────────────────────────────────

function makeWord(en, e, transcr) {
  return { e, en, pn: '/x/', transcr: transcr || 'тест', ru: 'r', uz: 'u', tj: 't', kg: 'k', kz: 'z' };
}
function makeLine(s, transcr) {
  return { s, en: 'Hello', transcr: transcr || 'хэлоу', ru: 'r', uz: 'u', tj: 't', kg: 'k', kz: 'z' };
}

// Check 8: speaker role
const check8_valid = { dialogue: [makeLine('m'), makeLine('w'), makeLine('c'), makeLine('d')] };
const check8_bad   = { dialogue: [makeLine('m'), makeLine('x'), makeLine('2'), makeLine('w')] };

// Check 9: lesson names
const check9_valid = { name_ru:'A', name_uz:'B', name_tj:'C', name_kg:'D', name_kz:'E' };
const check9_bad   = { name_ru:'A', name_uz:'', name_tj:'C', name_kg:'D', name_kz:null };

// Check 10: transcr format
const check10_valid = {
  words: [makeWord('hello', '👋', 'хэ-ЛОУ')],
  dialogue: [makeLine('m', 'хэ-ЛОУ')]
};
const check10_bad_word = {
  words: [makeWord('hello', '👋', 'heh-LO')],  // Latin only
  dialogue: [makeLine('m', 'хэ-ЛОУ')]
};
const check10_bad_line = {
  words: [makeWord('hello', '👋', 'хэ-ЛОУ')],
  dialogue: [makeLine('m', 'heh-LO')]            // Latin only
};

// Check 11: emoji diversity (30 words, varied)
const uniqueWords = Array.from({ length: 30 }, (_, i) =>
  makeWord('word' + i, '🔢' + String.fromCodePoint(0x1F600 + i), 'тест')
);
const check11_valid = { words: uniqueWords }; // 30 unique = 100%

const sameEmojiWords = Array.from({ length: 30 }, (_, i) =>
  makeWord('word' + i, '💰', 'тест')  // all same
);
const check11_bad = { words: sameEmojiWords }; // 1/30 = 3% < 80%

// ── Test runner ───────────────────────────────────────────────────────────────

let passed = 0, failed = 0;

function assert(label, condition, found) {
  if (condition) {
    console.log('  ✅ ' + label);
    passed++;
  } else {
    console.log('  ❌ ' + label + (found !== undefined ? ' — got: ' + JSON.stringify(found) : ''));
    failed++;
  }
}

console.log('Check 8: speaker roles');
assert('valid speakers → no errors',
  runCheck(checkSpeakerRoles, check8_valid).length === 0);
const c8errors = runCheck(checkSpeakerRoles, check8_bad);
assert('invalid "x" caught', c8errors.some(e => e.includes('"x"')), c8errors);
assert('invalid "2" caught', c8errors.some(e => e.includes('"2"')), c8errors);
assert('valid "m"/"w" not flagged', c8errors.length === 2, c8errors);

console.log('Check 9: lesson name completeness');
assert('full names → no errors',
  runCheck(checkLessonNames, check9_valid).length === 0);
const c9errors = runCheck(checkLessonNames, check9_bad);
assert('empty uz caught', c9errors.some(e => e.includes('name_uz')), c9errors);
assert('null kz caught',  c9errors.some(e => e.includes('name_kz')), c9errors);
assert('present fields not flagged', c9errors.length === 2, c9errors);

console.log('Check 10: transcr Cyrillic format');
assert('Cyrillic transcr → no errors',
  runCheck(checkTranscrFormat, check10_valid).length === 0);
const c10w = runCheck(checkTranscrFormat, check10_bad_word);
assert('Latin-only word transcr caught', c10w.length === 1 && c10w[0].includes('words[0]'), c10w);
const c10l = runCheck(checkTranscrFormat, check10_bad_line);
assert('Latin-only dialogue transcr caught', c10l.length === 1 && c10l[0].includes('dialogue[0]'), c10l);

console.log('Check 11: emoji diversity ≥80%');
assert('30 unique emojis → no errors',
  runCheck(checkEmojiDiversity, check11_valid).length === 0);
const c11errors = runCheck(checkEmojiDiversity, check11_bad);
assert('all-same emoji caught', c11errors.length === 1 && c11errors[0].includes('3%'), c11errors);

console.log('\n' + (failed === 0
  ? `✅ All ${passed} assertions passed.`
  : `❌ ${failed} failed, ${passed} passed.`));
process.exitCode = failed > 0 ? 1 : 0;
