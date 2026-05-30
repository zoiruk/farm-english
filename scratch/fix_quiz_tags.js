/**
 * fix_quiz_tags.js
 * Adds [COMPLETE] or [TRANSLATE] prefix to quiz questions that are missing it.
 * Rule: question contains "___" → [COMPLETE], otherwise → [TRANSLATE]
 * Safe: only modifies quiz `q` fields that don't already start with `[`.
 */

const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, '..', 'a1.html');
let html = fs.readFileSync(TARGET, 'utf8');

let fixCount = 0;

// Match every "q": "..." inside quiz arrays.
// We look for  "q": "text that doesn't start with ["
html = html.replace(/"q":\s*"((?:[^"\\]|\\.)*)"/g, (match, qText) => {
  // Already tagged
  if (qText.startsWith('[')) return match;

  // Determine tag
  const tag = qText.includes('___') ? '[COMPLETE]' : '[TRANSLATE]';
  fixCount++;
  return `"q": "${tag} ${qText}"`;
});

fs.writeFileSync(TARGET, html, 'utf8');
console.log(`Done. Fixed ${fixCount} quiz questions.`);
