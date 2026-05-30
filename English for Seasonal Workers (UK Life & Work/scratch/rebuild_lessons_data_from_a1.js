const fs = require('fs');

const source = fs.readFileSync('a1.html', 'utf8');
const start = source.indexOf('const LESSONS = [');
if (start === -1) throw new Error('LESSONS array start not found');

function findArrayEnd(text, openBracketIndex) {
  let depth = 0;
  let inString = false;
  let quote = '';
  let escaped = false;

  for (let i = openBracketIndex; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
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
      if (depth === 0) return i;
    }
  }

  return -1;
}

const openBracket = source.indexOf('[', start);
const end = findArrayEnd(source, openBracket);
if (end === -1) throw new Error('LESSONS array end not found');

const body = source.slice(start + 'const LESSONS = '.length, end + 1);
const output = `module.exports = ${body};\n`;
fs.writeFileSync('scratch/lessons_data.js', output, 'utf8');
console.log('Rebuilt scratch/lessons_data.js from a1.html');
