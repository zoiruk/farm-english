// classify_translation_review.js — adds 'likely' column to Category 1 table,
// sorts 'review' rows first, moves 'loanword' rows to a compact list at bottom.
// Run: node scratch/classify_translation_review.js
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'specs', 'translation_review.md');
const text = fs.readFileSync(FILE, 'utf8');

// ── Classification set ────────────────────────────────────────────────────────
// 'loanword': internationally shared — legitimately identical in kz and kg
// Everything else defaults to 'review' (native/grammatical, may differ)
const LOANWORDS = new Set([
  // Personal / travel documents
  'паспорт','виза',
  // Farm / workplace loanwords from Russian/French
  'секатор','шланг','антисептик','кран','бригадир','механик','микроавтобус',
  'лагерь','офис','бейджик','маска','пестицид','трактор','пальто','жилет',
  'электр','газ','телефон',
  // Accommodation items (Russian loanwords)
  'шкаф','раковина','матрас','розетка','душ','Wi-Fi','каска',
  // Food — clear loanwords
  'банан','макарон','печенье','торт','паб',
  // Shopping / payments
  'чек','фунт / пенс','карта','банк','банкомат','супермаркет','кафе',
  'такси','вокзал','автобус',
  // Medical loanwords
  'парацетамол','таблетка','доза','рецепт','крем','клиника','палата',
  'стетоскоп','пульс','ибупрофен','рентген','диагноз',
  'фармацевт','температура','антибиотик','аллергия','витамин','капсула','спрей',
  // Finance
  'банкнот','банкир','пайыз','базар','код','ставка','квитанция','реквизиттер',
  // Transport
  'экспресс','вагон','кондуктор','маршрут картасы','терминал',
  'жол/рельс','автобус станциясы','транспорт картасы','проводник',
  'автобус (алыс)',
  // Digital / tech
  'Wi-Fi','браузер','профиль','тред','аккаунт','хэштег','оператор',
  'роуминг','динамик','ПИН-код','онлайн','чат','реквизиттер','филиал','блок',
  // Legal / formal
  'трибунал','апелляция','санкция','иммиграция','декларация','сертификат',
  // Culture / soft skills
  'диплом','чемодан','прогресс','юмор','фестиваль','акцент','диалект',
  'этикет','интеграция','бонус','стандарт','команда',
  // B1 specifics
  'Англия','Шотландия','Уэльс','хмель','виза',
]);

function classify(field, word) {
  // Grammar forms / examples / quiz fields: always review
  // These are instructional text where Kazakh/Kyrgyz may phrase differently
  if (/grammar\.(forms|examples|rule|note|title)/.test(field)) return 'review';
  if (/quiz\[/.test(field)) return 'review';
  // Grammar sentence examples (e.g. "Мен Ахмад")
  if (/grammar\./.test(field)) return 'review';
  return LOANWORDS.has(word) ? 'loanword' : 'review';
}

// ── Parse file ────────────────────────────────────────────────────────────────
const lines = text.split('\n');

// Find the Category 1 section start (used as replacement boundary)
const cat1Start = lines.findIndex(l => l.startsWith('## Category 1:'));
// Find the table header line
const tableStart = lines.findIndex(l => l.startsWith('| file | lesson | field'));

const rows = [];
let tableEnd = tableStart + 2; // skip header + separator
while (tableEnd < lines.length && lines[tableEnd].startsWith('|')) {
  const parts = lines[tableEnd].split('|').map(s => s.trim()).filter(Boolean);
  if (parts.length >= 4) {
    rows.push({
      file:   parts[0],
      lesson: parts[1],
      field:  parts[2],
      text:   parts[3],
      note:   parts[4] || 'identical to .kg',
    });
  }
  tableEnd++;
}

rows.forEach(r => { r.likely = classify(r.field, r.text); });

const reviewRows   = rows.filter(r => r.likely === 'review');
const loanwordRows = rows.filter(r => r.likely === 'loanword');

console.log(`Total rows parsed: ${rows.length}`);
console.log(`  review:   ${reviewRows.length}`);
console.log(`  loanword: ${loanwordRows.length}`);
if (reviewRows.length + loanwordRows.length !== rows.length)
  throw new Error('classify mismatch!');

// ── Build output ──────────────────────────────────────────────────────────────
function makeRow(r) {
  return `| ${r.file} | ${r.lesson} | ${r.field} | ${r.text} | ${r.likely} | ${r.note} |`;
}

const newHeader = '| file | lesson | field | current text | likely | note |';
const newSep    = '|------|--------|-------|--------------|--------|------|';

const reviewTable = [newHeader, newSep, ...reviewRows.map(makeRow)].join('\n');
const loanwordList = loanwordRows.map(r =>
  `- \`${r.file}\` L${r.lesson} \`${r.field}\` → \`${r.text}\``
).join('\n');

const newCat1Section = `## Category 1: kz === kg (possible copy-paste)

Fields where the Kazakh (\`kz\`) value is **identical** to the Kyrgyz (\`kg\`) value in the same object.
These may be copy-paste errors where Kazakh was never separately translated.

### Needs native-speaker review (${reviewRows.length} rows)

Everyday words, numbers, grammar examples — Kazakh and Kyrgyz typically differ here:

${reviewTable}

### Likely loanwords (${loanwordRows.length} rows)

International/Russian borrowings — probably legitimately identical; confirm with a speaker:

${loanwordList}`;

// Splice: keep everything before ## Category 1, replace the section,
// then keep everything from the first non-table line after the table.
const beforeCat1 = lines.slice(0, cat1Start).join('\n').trimEnd();
const afterCat1  = lines.slice(tableEnd).join('\n').trimStart();

const output = beforeCat1 + '\n\n' + newCat1Section + '\n\n' + afterCat1;
fs.writeFileSync(FILE, output);
console.log('Written:', FILE);
