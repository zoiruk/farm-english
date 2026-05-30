/**
 * fix_quiz_tags_ld.js
 * Applies the same [COMPLETE]/[TRANSLATE] tag fix to lessons_data.js
 * so that audit.js (which reads lessons_data.js) sees the tags.
 */
const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, 'lessons_data.js');
let content = fs.readFileSync(TARGET, 'utf8');
let count = 0;

content = content.replace(/"q":\s*"((?:[^"\\]|\\.)*)"/g, (match, q) => {
  if (q.startsWith('[')) return match;
  const tag = q.includes('___') ? '[COMPLETE]' : '[TRANSLATE]';
  count++;
  return `"q": "${tag} ${q}"`;
});

fs.writeFileSync(TARGET, content, 'utf8');
console.log(`Fixed ${count} questions in lessons_data.js`);
