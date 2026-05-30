const LESSONS = require('./lessons_data.js');

const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const FORM_KEYS = ['positive', 'negative', 'question'];

const issues = [];

function addIssue(lessonId, area, message) {
  issues.push(`Lesson ${lessonId} [${area}] ${message}`);
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function checkLocalizedFields(lessonId, obj, fields, area) {
  for (const field of fields) {
    for (const lang of LANGS) {
      const key = `${field}_${lang}`;
      if (!hasText(obj[key])) {
        addIssue(lessonId, area, `missing ${key}`);
      }
    }
  }
}

function checkRuleGrid(lessonId, value, area) {
  if (!hasText(value) || !value.includes('display:grid') || !value.includes('grid-template-columns:1fr 1fr')) {
    addIssue(lessonId, area, 'rule block is missing required CSS grid structure');
  }
  if (!hasText(value) || !value.includes('g-transcr')) {
    addIssue(lessonId, area, 'rule block is missing <span class="g-transcr"> transcription support');
  }
}

function checkWordCoverage(lesson) {
  const seen = new Set();
  const lessonId = lesson.id;

  if (!Array.isArray(lesson.words) || lesson.words.length < 30) {
    addIssue(lessonId, 'words', `has ${lesson.words ? lesson.words.length : 0} words, expected at least 30`);
    return;
  }

  for (const [index, word] of lesson.words.entries()) {
    const prefix = `words[${index}]`;
    for (const key of ['e', 'en', 'transcr', ...LANGS]) {
      if (!hasText(word[key])) {
        addIssue(lessonId, 'words', `${prefix} missing ${key}`);
      }
    }
    if (hasText(word.en)) {
      const normalized = word.en.trim().toLowerCase();
      if (seen.has(normalized)) {
        addIssue(lessonId, 'words', `${prefix} duplicates "${word.en}" inside the same lesson`);
      }
      seen.add(normalized);
    }
  }
}

function checkDialogue(lesson) {
  const lessonId = lesson.id;
  if (!Array.isArray(lesson.dialogue) || lesson.dialogue.length < 10) {
    addIssue(lessonId, 'dialogue', `has ${lesson.dialogue ? lesson.dialogue.length : 0} lines, expected at least 10`);
    return;
  }

  let previousSpeaker = null;
  for (const [index, line] of lesson.dialogue.entries()) {
    const prefix = `dialogue[${index}]`;
    for (const key of ['s', 'en', 'transcr', ...LANGS]) {
      if (!hasText(line[key])) {
        addIssue(lessonId, 'dialogue', `${prefix} missing ${key}`);
      }
    }

    if (previousSpeaker && line.s === previousSpeaker) {
      addIssue(lessonId, 'dialogue', `${prefix} repeats speaker "${line.s}" instead of alternating`);
    }
    previousSpeaker = line.s;
  }
}

function checkQuiz(lesson) {
  const lessonId = lesson.id;
  if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 10) {
    addIssue(lessonId, 'quiz', `has ${lesson.quiz ? lesson.quiz.length : 0} questions, expected at least 10`);
    return;
  }

  for (const [index, item] of lesson.quiz.entries()) {
    const prefix = `quiz[${index}]`;
    if (!hasText(item.q)) addIssue(lessonId, 'quiz', `${prefix} missing q`);
    if (!Array.isArray(item.opts) || item.opts.length !== 4) {
      addIssue(lessonId, 'quiz', `${prefix} should have exactly 4 opts`);
    }
    if (typeof item.c !== 'number') {
      addIssue(lessonId, 'quiz', `${prefix} missing numeric c`);
    }
    checkLocalizedFields(lessonId, item, ['hint', 'expl'], `quiz:${index}`);
  }
}

function checkGrammar(lesson) {
  const lessonId = lesson.id;
  const grammar = lesson.grammar;
  if (!grammar || typeof grammar !== 'object') {
    addIssue(lessonId, 'grammar', 'missing grammar object');
    return;
  }

  checkLocalizedFields(lessonId, grammar, ['title', 'intro', 'cultural', 'note'], 'grammar');

  if (!grammar.forms || typeof grammar.forms !== 'object') {
    addIssue(lessonId, 'grammar', 'missing forms');
    return;
  }

  let exampleCount = 0;
  for (const formKey of FORM_KEYS) {
    const form = grammar.forms[formKey];
    if (!form) {
      addIssue(lessonId, 'grammar', `missing forms.${formKey}`);
      continue;
    }

    checkLocalizedFields(lessonId, form, ['label', 'rule'], `grammar:${formKey}`);

    for (const lang of LANGS) {
      checkRuleGrid(lessonId, form[`rule_${lang}`], `grammar:${formKey}:${lang}`);
    }

    if (!Array.isArray(form.table) || form.table.length === 0) {
      addIssue(lessonId, 'grammar', `forms.${formKey}.table is empty`);
      continue;
    }

    exampleCount += form.table.length;
    for (const [index, row] of form.table.entries()) {
      const prefix = `forms.${formKey}.table[${index}]`;
      for (const key of ['subj', 'verb', 'example', 'transcr']) {
        if (!hasText(row[key])) addIssue(lessonId, 'grammar', `${prefix} missing ${key}`);
      }
      for (const lang of LANGS) {
        if (!hasText(row[`tr_${lang}`])) addIssue(lessonId, 'grammar', `${prefix} missing tr_${lang}`);
      }
    }
  }

  if (exampleCount < 10) {
    addIssue(lessonId, 'grammar', `has ${exampleCount} grammar examples, expected at least 10`);
  }
}

const globalWords = new Map();

for (const lesson of LESSONS) {
  checkWordCoverage(lesson);
  checkDialogue(lesson);
  checkQuiz(lesson);
  checkGrammar(lesson);

  for (const word of lesson.words || []) {
    const normalized = hasText(word.en) ? word.en.trim().toLowerCase() : '';
    if (!normalized) continue;
    const seenIn = globalWords.get(normalized);
    if (seenIn) {
      addIssue(lesson.id, 'words', `"${word.en}" already introduced in lesson ${seenIn}`);
    } else {
      globalWords.set(normalized, lesson.id);
    }
  }
}

if (issues.length) {
  console.log(`ADVANCED_AUDIT_FAIL ${issues.length}`);
  for (const issue of issues) console.log(issue);
  process.exitCode = 1;
} else {
  console.log('ADVANCED_AUDIT_OK');
}
