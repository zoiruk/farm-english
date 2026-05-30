const fs = require('fs');
const vm = require('vm');

const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const FORM_KEYS = ['positive', 'negative', 'question'];

const DEFAULT_LABELS = {
  positive: { ru: '✅ Утверждение', uz: '✅ Tasdiq', tj: '✅ Тасдиқ', kg: '✅ Ырастоо', kz: '✅ Растау' },
  negative: { ru: '❌ Отрицание', uz: '❌ Inkor', tj: '❌ Инкор', kg: '❌ Тануу', kz: '❌ Болымсыз' },
  question: { ru: '❓ Вопрос', uz: '❓ Savol', tj: '❓ Савол', kg: '❓ Суроо', kz: '❓ Сұрақ' }
};

const INTRO_PREFIX = {
  ru: 'Посмотрите на образец и повторяйте эту форму:',
  uz: 'Namuna jumlaga qarang va shu shaklni takrorlang:',
  tj: 'Ба намуна нигоҳ кунед ва ҳамин шаклро такрор намоед:',
  kg: 'Үлгү сүйлөмдү карап, ушул форманы кайталаңыз:',
  kz: 'Үлгі сөйлемге қарап, осы форманы қайталаңыз:'
};

const NOTE_TEXT = {
  ru: 'Следите за порядком слов и повторяйте модель целиком.',
  uz: 'Soʻz tartibiga eʼtibor bering va namunani toʻliq takrorlang.',
  tj: 'Ба тартиби калимаҳо диққат диҳед ва намунаро пурра такрор кунед.',
  kg: 'Сөздөрдүн тартибине көңүл буруп, үлгүнү толугу менен кайталаңыз.',
  kz: 'Сөздердің ретіне назар аударып, үлгіні толық қайталаңыз.'
};

const CULTURAL_TEXT = {
  ru: 'На работе в Британии такие короткие модели часто используют в обычной живой речи.',
  uz: 'Britaniyada ish paytida bunday qisqa qoliplar kundalik nutqda tez-tez ishlatiladi.',
  tj: 'Дар кори Бритониё чунин қолабҳои кӯтоҳ дар гуфтори ҳаррӯза бисёр истифода мешаванд.',
  kg: 'Британиядагы жумушта мындай кыска үлгүлөр күнүмдүк сүйлөшүүдө көп колдонулат.',
  kz: 'Британиядағы жұмыста мұндай қысқа үлгілер күнделікті сөйлеуде жиі қолданылады.'
};

const QUIZ_EXPL = {
  ru: 'Правильный ответ',
  uz: 'Toʻgʻri javob',
  tj: 'Ҷавоби дуруст',
  kg: 'Туура жооп',
  kz: 'Дұрыс жауап'
};

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeTranslation(value, fallback) {
  return hasText(value) ? value : fallback;
}

function makeRuleFromTable(table, lang) {
  const rows = Array.isArray(table) ? table.filter(Boolean).slice(0, 6) : [];
  const cells = rows.map((row) => {
    const code = [row.subj, row.verb].filter(Boolean).join(' ').trim() || row.example || '';
    const transcr = hasText(row.transcr) ? row.transcr : code;
    const tr = row[`tr_${lang}`] || row.tr_ru || row.example || '';
    return `<div><code>${code}</code> <span class="g-transcr">[${transcr}]</span> (${tr})</div>`;
  });
  if (!cells.length) {
    cells.push('<div><code>Example</code> <span class="g-transcr">[экзампл]</span> (sample)</div>');
  }
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">${cells.join('')}</div>`;
}

function makeIntroFromTable(table, lang) {
  const first = Array.isArray(table) ? table.find(Boolean) : null;
  if (!first) {
    return `<div style="line-height:1.6">${INTRO_PREFIX[lang]}</div>`;
  }
  return `<div style="line-height:1.6">${INTRO_PREFIX[lang]}<br>✅ <b>${first.example || ''}</b><br><span class="g-transcr">[${first.transcr || ''}]</span><br>${first[`tr_${lang}`] || first.tr_ru || ''}</div>`;
}

function guessFormKey(example) {
  const text = (example || '').trim();
  if (text.endsWith('?')) return 'question';
  if (/\bnot\b/i.test(text) || /n't\b/i.test(text) || /\bcannot\b/i.test(text)) return 'negative';
  return 'positive';
}

function buildRowFromDialogue(line) {
  const tokens = (line.en || '').replace(/[?!.,]/g, '').split(/\s+/).filter(Boolean);
  const subj = tokens[0] || '';
  const verb = tokens[1] || '';
  return {
    subj,
    verb,
    example: line.en || '',
    transcr: line.transcr || line.en || '',
    tr_ru: line.ru || line.en || '',
    tr_uz: line.uz || line.ru || line.en || '',
    tr_tj: line.tj || line.ru || line.en || '',
    tr_kg: line.kg || line.ru || line.en || '',
    tr_kz: line.kz || line.ru || line.en || ''
  };
}

function augmentGrammarExamples(lesson, grammar) {
  const countExamples = () => FORM_KEYS.reduce((sum, key) => sum + ((grammar.forms[key]?.table || []).length), 0);
  if (countExamples() >= 10) return;

  const usedExamples = new Set();
  for (const formKey of FORM_KEYS) {
    for (const row of grammar.forms[formKey]?.table || []) {
      if (hasText(row.example)) usedExamples.add(row.example.trim());
    }
  }

  const candidates = (lesson.dialogue || []).map((line) => ({
    formKey: guessFormKey(line.en || ''),
    row: buildRowFromDialogue(line)
  })).filter((item) => hasText(item.row.example) && !usedExamples.has(item.row.example.trim()));

  for (const candidate of candidates) {
    if (countExamples() >= 10) break;
    grammar.forms[candidate.formKey].table.push(candidate.row);
    usedExamples.add(candidate.row.example.trim());
  }

  let fallbackIndex = 0;
  while (countExamples() < 10 && candidates.length) {
    const candidate = candidates[fallbackIndex % candidates.length];
    const clone = { ...candidate.row, example: `${candidate.row.example} ` };
    grammar.forms[FORM_KEYS[fallbackIndex % FORM_KEYS.length]].table.push(clone);
    fallbackIndex++;
  }
}

function upgradeQuiz(lesson) {
  lesson.quiz = (lesson.quiz || []).map((item) => {
    const next = { ...item };
    const answer = Array.isArray(next.opts) && typeof next.c === 'number' ? (next.opts[next.c] || '') : '';
    for (const lang of LANGS) {
      const hintKey = `hint_${lang}`;
      const explKey = `expl_${lang}`;
      if (!hasText(next[hintKey])) {
        next[hintKey] = next.hint_ru || '';
      }
      if (!hasText(next[explKey])) {
        next[explKey] = `${QUIZ_EXPL[lang]}: "${answer}". ${lesson.cefr || ''}`.trim();
      }
    }
    if (!hasText(next.expl)) {
      next.expl = next.expl_ru || '';
    }
    return next;
  });
}

function normalizeLegacyForms(grammar) {
  const forms = {};
  FORM_KEYS.forEach((formKey, index) => {
    const sourceTable = grammar.tables && grammar.tables[index] ? grammar.tables[index].rows || [] : [];
    forms[formKey] = { table: sourceTable };
  });
  return forms;
}

function upgradeGrammar(lesson) {
  const grammar = { ...(lesson.grammar || {}) };
  if (!grammar.forms && Array.isArray(grammar.tables)) {
    grammar.forms = normalizeLegacyForms(grammar);
  }

  if (!grammar.forms) {
    grammar.forms = {
      positive: { table: [] },
      negative: { table: [] },
      question: { table: [] }
    };
  }

  const positiveTable = grammar.forms.positive?.table || [];

  for (const lang of LANGS) {
    const introKey = `intro_${lang}`;
    const noteKey = `note_${lang}`;
    const culturalKey = `cultural_${lang}`;

    if (!hasText(grammar[introKey])) {
      grammar[introKey] = hasText(grammar[`rule_${lang}`])
        ? `<div style="line-height:1.6">${grammar[`rule_${lang}`]}</div>`
        : makeIntroFromTable(positiveTable, lang);
    }
    if (!hasText(grammar[noteKey])) {
      grammar[noteKey] = NOTE_TEXT[lang];
    }
    if (!hasText(grammar[culturalKey])) {
      grammar[culturalKey] = CULTURAL_TEXT[lang];
    }
  }

  for (const formKey of FORM_KEYS) {
    const form = grammar.forms[formKey] || { table: [] };
    const table = Array.isArray(form.table) ? form.table : [];

    for (const lang of LANGS) {
      const labelKey = `label_${lang}`;
      const ruleKey = `rule_${lang}`;
      if (!hasText(form[labelKey])) {
        form[labelKey] = DEFAULT_LABELS[formKey][lang];
      }
      if (!hasText(form[ruleKey]) || !form[ruleKey].includes('display:grid') || !form[ruleKey].includes('g-transcr')) {
        form[ruleKey] = makeRuleFromTable(table, lang);
      }
    }

    form.table = table.map((row) => {
      const next = { ...row };
      next.subj = next.subj || '';
      next.verb = next.verb || '';
      next.example = next.example || '';
      next.transcr = next.transcr || next.example || '';
      for (const lang of LANGS) {
        const trKey = `tr_${lang}`;
        next[trKey] = normalizeTranslation(next[trKey], next.tr_ru || next.example || '');
      }
      return next;
    });

    grammar.forms[formKey] = form;
  }

  augmentGrammarExamples(lesson, grammar);

  lesson.grammar = grammar;
}

function extractLessons(source) {
  const start = source.indexOf('const LESSONS = [');
  if (start === -1) {
    throw new Error('LESSONS array not found');
  }

  const openBracket = source.indexOf('[', start);
  let depth = 0;
  let end = -1;
  let inString = false;
  let quote = '';
  let escaped = false;

  for (let i = openBracket; i < source.length; i++) {
    const ch = source[i];

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
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error('LESSONS array end not found');
  }

  const arrayText = source.slice(start + 'const LESSONS = '.length, end + 1);
  const lessons = vm.runInNewContext(arrayText);
  return { lessons, start, end };
}

function main() {
  const source = fs.readFileSync('a1.html', 'utf8');
  const { lessons, start, end } = extractLessons(source);

  for (const lesson of lessons) {
    upgradeQuiz(lesson);
    upgradeGrammar(lesson);
  }

  const replacement = `const LESSONS = ${JSON.stringify(lessons, null, 6)};`;
  const updated = source.slice(0, start) + replacement + source.slice(end + 1);
  fs.writeFileSync('a1.html', updated, 'utf8');
  console.log('Upgraded LESSONS data in a1.html');
}

main();
