// fix_b1_l4.js — Task 6.2: replace B1 L4 trash vocab with finance-relevant terms
// Monzo→overdraft, card details→insurance, chat support→refund, phone call→statement
// Run: node scratch/fix_b1_l4.js
'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'b1.html');
let html = fs.readFileSync(filePath, 'utf8');
const le = html.includes('\r\n') ? '\r\n' : '\n';
html = html.replace(/[ \t]+\r\n/g, '\r\n').replace(/[ \t]+\n/g, '\n');

const replacements = [
  {
    old: 'Monzo',
    e: '💳', en: 'overdraft', pn: '/ˈəʊvədrɑːft/', transcr: 'оувэдрафт',
    ru: 'овердрафт', uz: 'overdraft', tj: 'овердрафт',
    kg: 'овердрафт', kz: 'овердрафт'
  },
  {
    old: 'card details',
    e: '🛡️', en: 'insurance', pn: '/ɪnˈʃʊərəns/', transcr: 'иншуэрэнс',
    ru: 'страховка', uz: "sug'urta", tj: 'суғурта',
    kg: 'камсыздандыруу', kz: 'сақтандыру'
  },
  {
    old: 'chat support',
    e: '🔄', en: 'refund', pn: '/ˈriːfʌnd/', transcr: 'рифанд',
    ru: 'возврат денег', uz: 'pulni qaytarish', tj: 'баргардонидани пул',
    kg: 'акча кайтаруу', kz: 'ақша қайтару'
  },
  {
    old: 'phone call',
    e: '📄', en: 'statement', pn: '/ˈsteɪtmənt/', transcr: 'стэйтмэнт',
    ru: 'выписка из банка', uz: "bank ko'chirmasi", tj: 'иқтибоси бонк',
    kg: 'банк выпискасы', kz: 'банк үзіндісі'
  }
];

function buildWordObj(w) {
  const f = '                        '; // 24 spaces
  const c = '                  }';       // 18 spaces
  return [
    '{',
    f + '"e": "' + w.e + '",',
    f + '"en": "' + w.en + '",',
    f + '"pn": "' + w.pn + '",',
    f + '"transcr": "' + w.transcr + '",',
    f + '"ru": "' + w.ru + '",',
    f + '"uz": "' + w.uz + '",',
    f + '"tj": "' + w.tj + '",',
    f + '"kg": "' + w.kg + '",',
    f + '"kz": "' + w.kz + '"',
    c
  ].join(le);
}

const l4start = html.indexOf('"id": 4,');
if (l4start === -1) { console.error('L4 not found'); process.exit(1); }
const wsStart = html.indexOf('"words":', l4start);
const wsEnd = html.indexOf('],', wsStart) + 2;
let wordsBlock = html.slice(wsStart, wsEnd);

for (const w of replacements) {
  const enPat = '"en": "' + w.old + '"';
  const enIdx = wordsBlock.indexOf(enPat);
  if (enIdx === -1) { console.error('Word not found: ' + w.old); process.exit(1); }

  const objStart = wordsBlock.lastIndexOf('{', enIdx);
  const kzIdx = wordsBlock.indexOf('"kz":', enIdx);
  const objEnd = wordsBlock.indexOf('}', kzIdx) + 1;

  wordsBlock = wordsBlock.slice(0, objStart) + buildWordObj(w) + wordsBlock.slice(objEnd);
  console.log('  ' + w.old + ' → ' + w.en);
}

html = html.slice(0, wsStart) + wordsBlock + html.slice(wsEnd);
fs.writeFileSync(filePath, html, 'utf8');
console.log('Done.');
