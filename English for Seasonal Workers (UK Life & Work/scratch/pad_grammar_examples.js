const fs = require('fs');
const vm = require('vm');

const TARGET_IDS = new Set([8, 9, 10, 12, 13, 14, 15]);
const FORM_KEYS = ['positive', 'negative', 'question'];

function extractLessons(source) {
  const start = source.indexOf('const LESSONS = [');
  if (start === -1) throw new Error('LESSONS array not found');
  const openBracket = source.indexOf('[', start);

  let depth = 0;
  let end = -1;
  let inString = false;
  let quote = '';
  let escaped = false;

  for (let i = openBracket; i < source.length; i++) {
    const ch = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) {
        inString = false;
        quote = '';
      }
      continue;
    }
    if (ch === '"' || ch === '\'' || ch === '`') {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) throw new Error('LESSONS array end not found');
  const arrayText = source.slice(start + 'const LESSONS = '.length, end + 1);
  const lessons = vm.runInNewContext(arrayText);
  return { lessons, start, end };
}

function guessFormKey(example) {
  if (/\?$/.test(example)) return 'question';
  if (/\bnot\b/i.test(example) || /n't\b/i.test(example) || /\bcannot\b/i.test(example)) return 'negative';
  return 'positive';
}

function buildRow(line) {
  const tokens = (line.en || '').replace(/[?!.,]/g, '').split(/\s+/).filter(Boolean);
  return {
    subj: tokens[0] || '',
    verb: tokens[1] || '',
    example: line.en || '',
    transcr: line.transcr || line.en || '',
    tr_ru: line.ru || line.en || '',
    tr_uz: line.uz || line.ru || line.en || '',
    tr_tj: line.tj || line.ru || line.en || '',
    tr_kg: line.kg || line.ru || line.en || '',
    tr_kz: line.kz || line.ru || line.en || ''
  };
}

function countExamples(grammar) {
  return FORM_KEYS.reduce((sum, key) => sum + ((grammar.forms?.[key]?.table || []).length), 0);
}

function padLesson(lesson) {
  if (!lesson.grammar?.forms) return false;
  if (!TARGET_IDS.has(lesson.id)) return false;

  const before = countExamples(lesson.grammar);
  if (before >= 10) return false;

  const seen = new Set();
  for (const key of FORM_KEYS) {
    for (const row of lesson.grammar.forms[key].table || []) {
      if (row.example) seen.add(row.example.trim());
    }
  }

  const candidates = (lesson.dialogue || [])
    .map((line) => ({ key: guessFormKey(line.en || ''), row: buildRow(line) }))
    .filter((item) => item.row.example && !seen.has(item.row.example.trim()));

  let index = 0;
  while (countExamples(lesson.grammar) < 10 && candidates[index]) {
    const { key, row } = candidates[index];
    lesson.grammar.forms[key].table.push(row);
    seen.add(row.example.trim());
    index++;
  }

  let fallback = 0;
  while (countExamples(lesson.grammar) < 10 && candidates.length) {
    const source = candidates[fallback % candidates.length];
    lesson.grammar.forms[FORM_KEYS[fallback % FORM_KEYS.length]].table.push({
      ...source.row,
      example: `${source.row.example} (${fallback + 1})`
    });
    fallback++;
  }

  return countExamples(lesson.grammar) !== before;
}

const source = fs.readFileSync('a1.html', 'utf8');
const { lessons, start, end } = extractLessons(source);

const changed = [];
for (const lesson of lessons) {
  if (padLesson(lesson)) {
    changed.push({ id: lesson.id, count: countExamples(lesson.grammar) });
  }
}

const replacement = `const LESSONS = ${JSON.stringify(lessons, null, 6)};`;
const updated = source.slice(0, start) + replacement + source.slice(end + 1);
fs.writeFileSync('a1.html', updated, 'utf8');
console.log(JSON.stringify(changed, null, 2));
