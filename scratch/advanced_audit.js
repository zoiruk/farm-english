const courseArg = process.argv[2];
const course = ['a2', 'b1'].includes(courseArg) ? courseArg : 'a1';
const dataFile = course === 'b1' ? './lessons_data_b1.js' : (course === 'a2' ? './lessons_data_a2.js' : './lessons_data.js');
const LESSONS = require(dataFile);

const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const FORM_KEYS = ['positive', 'negative', 'question'];

// ── Format / severity model ──────────────────────────────────────────────────
// A1 was authored to an earlier, documented content model that legitimately differs
// from the strict A2/B1 "gold standard":
//   • L1–7 grammar uses the {forms:{positive,negative,question}} shape (like A2/B1);
//   • L8–15 grammar uses a simpler {tables:[{title,rows}], examples} shape — no
//     intro/cultural/note, no grid CSS embedded in the rule text;
//   • L8–15 quiz hints are Russian-only (hint_uz/tj/kg/kz absent);
//   • L2 has a known kz gap (dialogue + grammar tr_kz) pending the sanctioned fix.
// A1 content is frozen (project Constraint 1), so for A1 these known, documented gaps
// are reported as WARNINGS (printed, do not fail the gate). A2/B1 are held to the
// strict standard, where the same conditions are hard FAILURES.
// See .kiro/specs/release-readiness/requirements.md R1, R12.3 and design.md §1.
const STRICT = course !== 'a1';

const issues = [];   // hard failures → exit code 1
const warnings = []; // known/accepted A1 gaps → printed, do not fail the gate

function addIssue(lessonId, area, message) {
  issues.push(`Lesson ${lessonId} [${area}] ${message}`);
}
function addWarn(lessonId, area, message) {
  warnings.push(`Lesson ${lessonId} [${area}] ${message}`);
}
// A condition that is a hard rule under the strict standard but an accepted gap for
// the frozen A1 content: fails for A2/B1, warns for A1.
function flagStrict(lessonId, area, message) {
  if (STRICT) addIssue(lessonId, area, message);
  else addWarn(lessonId, area, message);
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

// strictOnly=true → missing field warns for A1 but fails for A2/B1.
function checkLocalizedFields(lessonId, obj, fields, area, strictOnly) {
  for (const field of fields) {
    for (const lang of LANGS) {
      const key = `${field}_${lang}`;
      if (!hasText(obj[key])) {
        if (strictOnly) flagStrict(lessonId, area, `missing ${key}`);
        else addIssue(lessonId, area, `missing ${key}`);
      }
    }
  }
}

function checkRuleGrid(lessonId, value, area) {
  if (!hasText(value) || !value.includes('display:grid') || !value.includes('grid-template-columns:1fr 1fr')) {
    flagStrict(lessonId, area, 'rule block is missing required CSS grid structure');
  }
  if (!hasText(value) || !value.includes('g-transcr')) {
    flagStrict(lessonId, area, 'rule block is missing <span class="g-transcr"> transcription support');
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
    for (const key of ['e', 'en', 'transcr', 'pn', ...LANGS]) {
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
    // structural fields are always required
    for (const key of ['s', 'en', 'transcr']) {
      if (!hasText(line[key])) addIssue(lessonId, 'dialogue', `${prefix} missing ${key}`);
    }
    // language fields: hard for A2/B1, warning for the known A1 L2 kz gap
    for (const lang of LANGS) {
      if (!hasText(line[lang])) flagStrict(lessonId, 'dialogue', `${prefix} missing ${lang}`);
    }

    // strict speaker alternation: hard rule for A2/B1; A1 allows multi-party scenes
    // (e.g. two distinct workers both tagged "w") and same-speaker continuations.
    if (previousSpeaker && line.s === previousSpeaker) {
      flagStrict(lessonId, 'dialogue', `${prefix} repeats speaker "${line.s}" instead of alternating`);
    }
    previousSpeaker = line.s;
  }

  // duplicate dialogue line within a lesson is a quality defect in every course
  const seenEn = new Set();
  for (const [, line] of lesson.dialogue.entries()) {
    if (hasText(line.en)) {
      const normalized = line.en.trim().toLowerCase();
      if (seenEn.has(normalized)) {
        addIssue(lessonId, 'dialogue', `contains duplicate line: "${line.en}"`);
      }
      seenEn.add(normalized);
    }
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
    } else {
      const uniqueOpts = new Set(item.opts.map(o => o.trim().toLowerCase()));
      if (uniqueOpts.size !== 4) {
        addIssue(lessonId, 'quiz', `${prefix} has duplicate options: [${item.opts.join(', ')}]`);
      }
    }
    if (typeof item.c !== 'number' || item.c < 0 || (item.opts && item.c >= item.opts.length)) {
      addIssue(lessonId, 'quiz', `${prefix} index c (${item.c}) is out of bounds or missing`);
    }
    // localized hint/expl: hard for A2/B1; A1 L8–15 hints are Russian-only (known gap)
    checkLocalizedFields(lessonId, item, ['hint', 'expl'], `quiz:${index}`, true);
  }
}

function hasWordBoundary(haystack, needle) {
  if (!haystack || !needle || needle.length < 3) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(?<![\\wа-яёА-ЯЁ])' + escaped + '(?![\\wа-яёА-ЯЁ])', 'i');
  return re.test(haystack);
}

// An "answer leak" is the correct answer printed inside the QUESTION STEM or HINT,
// so the learner can pass without knowing it (release_plan §1.2.5). Calibrated:
//   • [TRANSLATE] questions skipped — source sentence legitimately contains answer words;
//   • q: full answer phrase → addIssue (hard failure, all courses);
//   • hint_ru: addWarn (PERMANENT POLICY, owner decision 2026-06-11 §B): grammar hints
//     legitimately name the target form ("use am going to for plans"), making hard failures
//     impractical. Warns surface for human review. Individual answer words ≥5 chars checked
//     to avoid false positives on short words like "most" from "the most expensive".
function checkAnswerLeaks(lesson) {
  const lessonId = lesson.id;
  for (const [index, item] of (lesson.quiz || []).entries()) {
    if (!Array.isArray(item.opts) || typeof item.c !== 'number') continue;
    const q = item.q || '';
    if (q.includes('[TRANSLATE]')) continue;
    const correct = (item.opts[item.c] || '').trim();
    if (correct.length < 3) continue;
    if (hasWordBoundary(q, correct)) {
      addIssue(lessonId, 'quiz', `quiz[${index}] answer leak in q: "${correct}"`);
    }
    const hint = (item.hint_ru || '').trim();
    if (hint) {
      if (hasWordBoundary(hint, correct)) {
        addWarn(lessonId, 'quiz', `quiz[${index}] answer leak in hint_ru: "${correct}"`);
      } else {
        for (const word of correct.split(/\s+/)) {
          const stripped = word.replace(/[^a-zA-Zа-яёА-ЯЁ]/g, '');
          if (stripped.length >= 5 && hasWordBoundary(hint, stripped)) {
            addWarn(lessonId, 'quiz', `quiz[${index}] answer word leak in hint_ru: "${stripped}"`);
          }
        }
      }
    }
  }
}

// Detects [TRANSLATE] questions where hint_ru just restates the question-stem term
// (e.g., q = "[TRANSLATE] How to translate 'удобный'?" and hint_ru = "Удобный").
// Such a hint is pedagogically useless — it only repeats what the learner already sees.
// Not an answer leak (the English answer isn't shown); always addWarn, all courses.
function checkTranslateHintDuplicate(lesson) {
  const lessonId = lesson.id;
  const termRe = /['"]([^'"]{2,})['"]/g;
  for (const [index, item] of (lesson.quiz || []).entries()) {
    const q = item.q || '';
    if (!q.includes('[TRANSLATE]')) continue;
    const hint = (item.hint_ru || '').trim();
    if (!hint) continue;
    const hintLow = hint.toLowerCase().replace(/[.,!?]+$/, '');
    termRe.lastIndex = 0;
    let m;
    while ((m = termRe.exec(q)) !== null) {
      if (hintLow === m[1].trim().toLowerCase()) {
        addWarn(lessonId, 'quiz', `quiz[${index}] hint_ru "${hint}" just restates question term '${m[1]}'`);
        break;
      }
    }
  }
}

const SNOWBALL_ALLOWLIST = new Set([
  'a','an','the','this','that','these','those','some','any','all','each','every',
  'and','or','but','if','so','as','than','though','unless','since','whether',
  'in','on','at','for','with','by','from','of','to','about','up','down','out',
  'off','into','onto','over','under','through','between','around','near',
  'until','after','before','during','without','within','along','back','next',
  'not','no','yes','how','what','where','when','who','which','why',
  'very','too','also','just','now','here','there','then','still','already','yet',
  'much','more','most','less','few','little','many','both','either','neither',
  'am','is','are','was','were','be','been','being',
  'have','has','had','do','does','did','will','shall',
  'can','could','may','might','must','should','would',
  "isn't","aren't","wasn't","weren't","haven't","hasn't","hadn't",
  "don't","doesn't","didn't","won't","wouldn't","can't","couldn't","shouldn't",
  'i','you','he','she','it','we','they','me','him','her','us','them',
  'my','your','his','its','our','their','myself','yourself',
  "i'm","i've","i'd","i'll","you're","you've","you'd","you'll",
  "he's","she's","it's","we're","we've","we'd","we'll",
  "they're","they've","they'd","they'll","let's","that's","there's",
  'one','two','three','four','five','six','seven','eight','nine','ten',
  'get','got','go','went','come','came','see','saw','say','said',
  'know','knew','think','thought','want','need','like','make','made',
  'take','took','give','put','use','try','help','keep','let',
  'okay','ok','please','thank','thanks','sorry','hello','hi','bye',
  'well','right','sure','great','oh','ah','hey','good',
]);

function extractContentWords(text) {
  if (!text) return [];
  const words = [];
  const re = /[a-zA-Z']+/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const word = match[0];
    const lower = word.toLowerCase().replace(/^'|'$/g, '');
    if (lower.length < 3) continue;
    if (/^[A-Z]/.test(word) && match.index > 0) {
      const preceding = text.slice(0, match.index).trimEnd();
      if (preceding.length > 0 && !/[.!?]$/.test(preceding)) continue;
    }
    words.push(lower);
  }
  return words;
}

function stemVariants(word) {
  const forms = new Set([word]);
  if (word.endsWith('ies') && word.length > 4) forms.add(word.slice(0, -3) + 'y');
  if (word.endsWith('s') && word.length > 3) forms.add(word.slice(0, -1));
  if (word.endsWith('es') && word.length > 4) forms.add(word.slice(0, -2));
  if (word.endsWith('ed') && word.length > 4) {
    forms.add(word.slice(0, -2));
    forms.add(word.slice(0, -1));
  }
  if (word.endsWith('ing') && word.length > 5) {
    forms.add(word.slice(0, -3));
    forms.add(word.slice(0, -3) + 'e');
  }
  return forms;
}

// A snowball violation is a content word used in a dialogue / [TRANSLATE] option that
// is taught as an explicit vocabulary card in a LATER lesson (used-before-introduced) —
// exactly the defect release_plan flagged (e.g. "strawberry" spoken in early dialogues
// but first carded in B1 L5). Words never carded anywhere are assumed background
// vocabulary and are NOT flagged; this is what keeps the check precise instead of
// drowning in common glue words ("because", "better", "going").
// SEVERITY (owner decision 2026-06-11, §A): flagStrict — A1 warn, A2/B1 hard fail.
// Task 4.5 completed 2026-06-11: all 7 pre-existing A2 violations fixed in dialogues.
// requirements.md R6, design.md §5.
function snowballViolation(word, order) {
  if (SNOWBALL_ALLOWLIST.has(word)) return false;
  let earliest;
  for (const v of [word, ...stemVariants(word)]) {
    const o = taughtAt.get(v);
    if (o !== undefined && (earliest === undefined || o < earliest)) earliest = o;
  }
  return earliest !== undefined && earliest > order;
}

function checkSnowball(lesson, order) {
  const lessonId = lesson.id;
  for (const [idx, line] of (lesson.dialogue || []).entries()) {
    for (const word of extractContentWords(line.en || '')) {
      if (snowballViolation(word, order)) {
        flagStrict(lessonId, 'snowball', `dialogue[${idx}] uses "${word}" before it is taught (carded in a later lesson)`);
      }
    }
  }
  for (const [idx, item] of (lesson.quiz || []).entries()) {
    if (typeof item.q !== 'string' || !item.q.includes('[TRANSLATE]')) continue;
    for (const opt of (item.opts || [])) {
      for (const word of extractContentWords(opt)) {
        if (snowballViolation(word, order)) {
          flagStrict(lessonId, 'snowball', `quiz[${idx}] translate opt "${opt}" uses "${word}" before it is taught`);
        }
      }
    }
  }
}

// Forms-format grammar: {forms:{positive,negative,question}} — A1 L1–7 and all A2/B1.
function checkGrammarForms(lessonId, grammar) {
  // intro/cultural/note are part of the rich forms layout; hard for A2/B1, warn for A1
  checkLocalizedFields(lessonId, grammar, ['intro', 'cultural', 'note'], 'grammar', true);

  let exampleCount = 0;
  for (const formKey of FORM_KEYS) {
    const form = grammar.forms[formKey];
    if (!form) {
      addIssue(lessonId, 'grammar', `missing forms.${formKey}`);
      continue;
    }

    checkLocalizedFields(lessonId, form, ['label', 'rule'], `grammar:${formKey}`, false);

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
        if (!hasText(row[`tr_${lang}`])) flagStrict(lessonId, 'grammar', `${prefix} missing tr_${lang}`);
      }
    }
  }

  if (exampleCount < 10) {
    addIssue(lessonId, 'grammar', `has ${exampleCount} grammar examples, expected at least 10`);
  }
}

// Tables-format grammar: {tables:[{title,rows}], examples} — A1 L8–15 only (legacy).
function checkGrammarTables(lessonId, grammar) {
  let exampleCount = 0;
  if (!Array.isArray(grammar.tables) || grammar.tables.length === 0) {
    addIssue(lessonId, 'grammar', 'tables format declared but tables array is empty');
  } else {
    for (const [ti, tbl] of grammar.tables.entries()) {
      const rows = tbl.rows || tbl.table;
      if (!hasText(tbl.title)) addIssue(lessonId, 'grammar', `tables[${ti}] missing title`);
      if (!Array.isArray(rows) || rows.length === 0) {
        addIssue(lessonId, 'grammar', `tables[${ti}] has no rows`);
        continue;
      }
      exampleCount += rows.length;
      for (const [ri, row] of rows.entries()) {
        const prefix = `tables[${ti}].rows[${ri}]`;
        for (const key of ['subj', 'verb', 'example', 'transcr']) {
          if (!hasText(row[key])) addIssue(lessonId, 'grammar', `${prefix} missing ${key}`);
        }
        for (const lang of LANGS) {
          if (!hasText(row[`tr_${lang}`])) flagStrict(lessonId, 'grammar', `${prefix} missing tr_${lang}`);
        }
      }
    }
  }
  if (Array.isArray(grammar.examples)) exampleCount += grammar.examples.length;
  if (exampleCount < 10) {
    addIssue(lessonId, 'grammar', `has ${exampleCount} grammar examples, expected at least 10`);
  }
}

function checkGrammar(lesson) {
  const lessonId = lesson.id;
  const grammar = lesson.grammar;
  if (!grammar || typeof grammar !== 'object') {
    addIssue(lessonId, 'grammar', 'missing grammar object');
    return;
  }

  // title is required in every course and every format
  checkLocalizedFields(lessonId, grammar, ['title'], 'grammar', false);

  const hasForms = grammar.forms && typeof grammar.forms === 'object';
  const hasTables = Array.isArray(grammar.tables) && grammar.tables.length > 0;

  if (hasForms) {
    checkGrammarForms(lessonId, grammar);
  } else if (hasTables) {
    // tables format is legacy A1-only; A2/B1 must use the rich forms layout
    if (STRICT) {
      addIssue(lessonId, 'grammar', 'uses legacy tables format; A2/B1 require the forms layout');
    } else {
      checkGrammarTables(lessonId, grammar);
    }
  } else {
    addIssue(lessonId, 'grammar', 'missing both forms and tables');
  }
}

const globalWords = new Map();

// taughtAt: normalized word/stem → global lesson order it is FIRST carded (lower=earlier).
// Built across every PRIOR course then this one, so the snowball check can distinguish
// "used before it is taught" (violation) from "taught here" from "never carded"
// (background vocabulary, not flagged). requirements.md R6.1, design.md §5.
const taughtAt = new Map();
let _order = 0;
function recordTaught(words) {
  _order += 1;
  const here = _order;
  for (const w of words || []) {
    if (!hasText(w.en)) continue;
    const norm = w.en.trim().toLowerCase();
    for (const tok of [norm, ...norm.split(/\s+/)]) {
      if (tok.length < 2) continue;
      if (!taughtAt.has(tok)) taughtAt.set(tok, here);
    }
  }
  return here;
}

const PRIOR_SNAPSHOTS = {
  a1: [],
  a2: ['./lessons_data.js'],
  b1: ['./lessons_data.js', './lessons_data_a2.js'],
};
for (const snap of (PRIOR_SNAPSHOTS[course] || [])) {
  try {
    for (const les of require(snap)) recordTaught(les.words);
  } catch (e) {
    console.error(`  (snowball seed: could not load ${snap}: ${e.message})`);
  }
}

// Record this course's lessons (continuing the global order) and remember each
// lesson's order so the snowball pass below can compare against it.
const lessonOrder = new Map();
for (const lesson of LESSONS) lessonOrder.set(lesson.id, recordTaught(lesson.words));

for (const lesson of LESSONS) {
  checkWordCoverage(lesson);
  checkDialogue(lesson);
  checkQuiz(lesson);
  checkGrammar(lesson);
  checkAnswerLeaks(lesson);
  checkTranslateHintDuplicate(lesson);
  checkSnowball(lesson, lessonOrder.get(lesson.id));

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

if (warnings.length) {
  console.log(`ADVANCED_AUDIT_WARN ${warnings.length} (known ${course.toUpperCase()} gaps, do not block release)`);
  for (const warning of warnings) console.log('  ⚠ ' + warning);
}

if (issues.length) {
  console.log(`ADVANCED_AUDIT_FAIL ${issues.length}`);
  for (const issue of issues) console.log(issue);
  process.exitCode = 1;
} else {
  console.log('ADVANCED_AUDIT_OK');
}
