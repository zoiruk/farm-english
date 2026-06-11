/**
 * check_duplicates.js
 * Checks that no English word appears in the `words` array of more than one lesson.
 * This is a standalone script referenced in docs and steering as the second audit step.
 * Note: duplicate detection is also performed inside audit.js and advanced_audit.js,
 * but this script exists as an explicit, named step in the required audit workflow.
 *
 * Severity:
 *   FAIL  — same word in two different lessons of the SAME course (data quality error).
 *   WARN  — same word in lessons of DIFFERENT courses (intentional CEFR recycling, acceptable).
 *
 * Usage:
 *   node scratch/check_duplicates.js        # published courses: A1 + A2
 *   node scratch/check_duplicates.js b1     # include B1 draft too
 *   node scratch/check_duplicates.js all    # same as b1
 */

const fs = require('fs');
const path = require('path');

const LESSONS_A1 = require('./lessons_data.js');
let LESSONS_A2 = [];
if (fs.existsSync(path.join(__dirname, 'lessons_data_a2.js'))) {
  LESSONS_A2 = require('./lessons_data_a2.js');
}
const includeB1 = process.argv.includes('b1') || process.argv.includes('all');
let LESSONS_B1 = [];
if (includeB1 && fs.existsSync(path.join(__dirname, 'lessons_data_b1.js'))) {
  LESSONS_B1 = require('./lessons_data_b1.js');
}

const globalSeen = new Map(); // normalized en → { course, lessonId }
const issues = [];   // within-course duplicates → hard failure
const warnings = []; // cross-course duplicates → warning only

function checkLessons(lessons, courseName) {
  const withinSeen = new Map();
  for (const lesson of lessons) {
    if (!Array.isArray(lesson.words)) continue;
    for (const word of lesson.words) {
      if (!word.en || typeof word.en !== 'string') continue;
      const normalized = word.en.trim().toLowerCase();
      if (withinSeen.has(normalized)) {
        const prev = withinSeen.get(normalized);
        issues.push(
          `Duplicate: "${word.en}" in ${courseName.toUpperCase()} lesson ${lesson.id} — already introduced in ${courseName.toUpperCase()} lesson ${prev.lessonId}`
        );
      } else {
        withinSeen.set(normalized, { lessonId: lesson.id });
        if (globalSeen.has(normalized)) {
          const prev = globalSeen.get(normalized);
          warnings.push(
            `Cross-course: "${word.en}" in ${courseName.toUpperCase()} lesson ${lesson.id} — already introduced in ${prev.course.toUpperCase()} lesson ${prev.lessonId}`
          );
        } else {
          globalSeen.set(normalized, { course: courseName, lessonId: lesson.id });
        }
      }
    }
  }
}

checkLessons(LESSONS_A1, 'a1');
checkLessons(LESSONS_A2, 'a2');
checkLessons(LESSONS_B1, 'b1');

const totalLessons = LESSONS_A1.length + LESSONS_A2.length + LESSONS_B1.length;

if (warnings.length) {
  console.log(`WARN cross-course reuse (${warnings.length}) — CEFR recycling, acceptable:`);
  for (const w of warnings) console.log('  ⚠ ' + w);
}

if (issues.length === 0) {
  console.log(`✅ No within-course duplicate words found across ${totalLessons} lessons.`);
} else {
  console.log(`❌ DUPLICATE WORDS FOUND (${issues.length}):`);
  for (const issue of issues) {
    console.log('  - ' + issue);
  }
  process.exitCode = 1;
}
