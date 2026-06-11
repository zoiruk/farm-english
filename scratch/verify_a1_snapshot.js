// Verifies that scratch/lessons_data.js is byte-identical to LESSONS extracted from a1.html.
const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, '../a1.html'), 'utf8');
const start = source.indexOf('const LESSONS = [');
if (start === -1) { console.error('LESSONS not found in a1.html'); process.exitCode = 1; process.exit(); }

const openBracket = source.indexOf('[', start);

function findArrayEnd(text, idx) {
  let depth = 0, inString = false, quote = '', escaped = false;
  for (let i = idx; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) { escaped = false; }
      else if (ch === '\\') { escaped = true; }
      else if (ch === quote) { inString = false; quote = ''; }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = true; quote = ch; continue; }
    if (ch === '[') depth++;
    if (ch === ']') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

const end = findArrayEnd(source, openBracket);
const body = source.slice(start + 'const LESSONS = '.length, end + 1);
const expected = 'module.exports = ' + body + ';\n';
const actual = fs.readFileSync(path.join(__dirname, 'lessons_data.js'), 'utf8');

console.log('a1.html  LESSONS length:', body.length, 'chars');
console.log('lessons_data.js length: ', actual.length, 'chars');
if (expected === actual) {
  console.log('BYTE_IDENTICAL: true ✅');
} else {
  console.log('BYTE_IDENTICAL: false ❌');
  // Show first difference position
  for (let i = 0; i < Math.max(expected.length, actual.length); i++) {
    if (expected[i] !== actual[i]) {
      console.log(`First diff at pos ${i}: expected ${JSON.stringify(expected.slice(i, i+30))} got ${JSON.stringify(actual.slice(i, i+30))}`);
      break;
    }
  }
  process.exitCode = 1;
}
