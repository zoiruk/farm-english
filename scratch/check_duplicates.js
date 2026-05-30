/**
 * check_duplicates.js
 * Checks that no English word appears in the `words` array of more than one lesson.
 * This is a standalone script referenced in docs and steering as the second audit step.
 * Note: duplicate detection is also performed inside audit.js and advanced_audit.js,
 * but this script exists as an explicit, named step in the required audit workflow.
 *
 * Usage: node scratch/check_duplicates.js
 */

const LESSONS = require('./lessons_data.js');

const seen = new Map(); // normalized en → { lessonId, original }
const issues = [];

for (const lesson of LESSONS) {
  if (!Array.isArray(lesson.words)) continue;
  for (const word of lesson.words) {
    if (!word.en || typeof word.en !== 'string') continue;
    const normalized = word.en.trim().toLowerCase();
    if (seen.has(normalized)) {
      const prev = seen.get(normalized);
      issues.push(
        `Duplicate: "${word.en}" in lesson ${lesson.id} — already introduced in lesson ${prev.lessonId}`
      );
    } else {
      seen.set(normalized, { lessonId: lesson.id, original: word.en });
    }
  }
}

if (issues.length === 0) {
  console.log(`✅ No duplicate words found across ${LESSONS.length} lessons.`);
} else {
  console.log(`❌ DUPLICATE WORDS FOUND (${issues.length}):`);
  for (const issue of issues) {
    console.log('  - ' + issue);
  }
  process.exitCode = 1;
}
