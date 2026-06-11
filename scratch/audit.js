const courseArg = process.argv[2];
const course = ['a2', 'b1'].includes(courseArg) ? courseArg : 'a1';
const dataFile = course === 'b1' ? './lessons_data_b1.js' : (course === 'a2' ? './lessons_data_a2.js' : './lessons_data.js');
const LESSONS = require(dataFile);

console.log(`Found ${LESSONS.length} lessons for course ${course.toUpperCase()}.\n`);

let globalWords = new Map(); // en -> { lessonId, ru }
let duplicateIssues = [];
let specIssues = [];

const REQUIRED_EXAMPLES = 10;
const REQUIRED_WORDS = 30;
const REQUIRED_QUIZ = 10;
const REQUIRED_DIALOGUE = 10;

LESSONS.forEach(lesson => {
  console.log(`--- Lesson ${lesson.id}: ${lesson.name_ru} ---`);
  
  // 1. Check Grammar Examples
  let exampleCount = 0;
  if (lesson.grammar && lesson.grammar.forms) {
    if (lesson.grammar.forms.positive && lesson.grammar.forms.positive.table) exampleCount += lesson.grammar.forms.positive.table.length;
    if (lesson.grammar.forms.negative && lesson.grammar.forms.negative.table) exampleCount += lesson.grammar.forms.negative.table.length;
    if (lesson.grammar.forms.question && lesson.grammar.forms.question.table) exampleCount += lesson.grammar.forms.question.table.length;
  } else if (lesson.grammar && lesson.grammar.examples) {
    exampleCount = lesson.grammar.examples.length;
  }
  
  if (exampleCount < REQUIRED_EXAMPLES) {
    specIssues.push(`Lesson ${lesson.id}: Only ${exampleCount} grammar examples (Required: ${REQUIRED_EXAMPLES})`);
  }

  // 2. Check Words Count
  let wordsCount = lesson.words ? lesson.words.length : 0;
  if (wordsCount < REQUIRED_WORDS) {
    specIssues.push(`Lesson ${lesson.id}: Only ${wordsCount} words (Required: ${REQUIRED_WORDS})`);
  }

  // 3. Check Quizzes Count
  let quizCount = lesson.quiz ? lesson.quiz.length : 0;
  if (quizCount < REQUIRED_QUIZ) {
    specIssues.push(`Lesson ${lesson.id}: Only ${quizCount} quizzes (Required: ${REQUIRED_QUIZ})`);
  } else {
    // Validate options uniqueness and c index validity
    lesson.quiz.forEach((qItem, qIdx) => {
      if (typeof qItem.c !== 'number' || qItem.c < 0 || qItem.c >= qItem.opts.length) {
        specIssues.push(`Lesson ${lesson.id} [Quiz ${qIdx}]: Correct option index c (${qItem.c}) is out of bounds (opts length: ${qItem.opts ? qItem.opts.length : 0})`);
      }
      if (qItem.opts && qItem.opts.length === 4) {
        const uniqueOpts = new Set(qItem.opts.map(o => o.trim().toLowerCase()));
        if (uniqueOpts.size !== 4) {
          specIssues.push(`Lesson ${lesson.id} [Quiz ${qIdx}]: Duplicate options found: [${qItem.opts.join(', ')}]`);
        }
      }
    });
  }

  // 4. Check Dialogue Count
  let dialogueCount = lesson.dialogue ? lesson.dialogue.length : 0;
  if (dialogueCount < REQUIRED_DIALOGUE) {
    specIssues.push(`Lesson ${lesson.id}: Only ${dialogueCount} dialogue lines (Required: ${REQUIRED_DIALOGUE})`);
  }

  // 5. Check Quiz tags — [COMPLETE] or [TRANSLATE] prefix required on every question
  // (opts[c] bounds and duplicate opts are checked by advanced_audit.js)
  if (lesson.quiz) {
    lesson.quiz.forEach((qItem, qIdx) => {
      if (qItem.q && !qItem.q.startsWith('[')) {
        specIssues.push(`Lesson ${lesson.id} [Quiz ${qIdx}]: Question missing tag prefix [COMPLETE] or [TRANSLATE]: "${qItem.q.substring(0, 50)}"`);
      }
    });
  }

  // Print words to visually inspect for relevance
  if (lesson.words) {
    let wordList = lesson.words.map(w => w.en).join(', ');
    console.log(`Words: ${wordList}`);
    
    // Check duplicates
    lesson.words.forEach(w => {
      let wordEn = w.en.toLowerCase().trim();
      if (globalWords.has(wordEn)) {
        let prev = globalWords.get(wordEn);
        duplicateIssues.push(`Duplicate word '${w.en}' found in Lesson ${lesson.id} (first seen in Lesson ${prev.lessonId})`);
      } else {
        globalWords.set(wordEn, { lessonId: lesson.id, ru: w.ru });
      }
    });
  }
  console.log("");
});

console.log("\n=== AUDIT RESULTS ===");

if (duplicateIssues.length === 0) {
  console.log("✅ No duplicate words found across lessons.");
} else {
  console.log("❌ DUPLICATES FOUND:");
  duplicateIssues.forEach(i => console.log(" - " + i));
}

if (specIssues.length === 0) {
  console.log("✅ All lessons meet the required counts for words, examples, quizzes, and dialogue.");
} else {
  console.log("❌ SPECIFICATIONS ISSUES:");
  specIssues.forEach(i => console.log(" - " + i));
}

if (duplicateIssues.length > 0 || specIssues.length > 0) {
  process.exitCode = 1;
}
