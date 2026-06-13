// fix_a2_l14.js — Task 6.2: replace L14 trash vocab with worker-relevant date terms
// fortnight→payday, fiscal year→arrival, dawn→lunchtime, dusk→departure
// Run: node scratch/fix_a2_l14.js
'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'a2.html');
let html = fs.readFileSync(filePath, 'utf8');
const le = html.includes('\r\n') ? '\r\n' : '\n';
html = html.replace(/[ \t]+\r\n/g, '\r\n').replace(/[ \t]+\n/g, '\n');

const replacements = [
  {
    old: 'fortnight',
    e: '💵', en: 'payday', pn: '/ˈpeɪdeɪ/', transcr: 'пэйдэй',
    ru: 'день зарплаты', uz: 'maosh kuni', tj: 'рӯзи маош',
    kg: 'айлык алган күн', kz: 'жалақы күні'
  },
  {
    old: 'fiscal year',
    e: '✈️', en: 'arrival', pn: '/əˈraɪvl/', transcr: 'эрайвл',
    ru: 'приезд', uz: 'kelish', tj: 'расидан',
    kg: 'жетүү', kz: 'жету'
  },
  {
    old: 'dawn',
    e: '🍽️', en: 'lunchtime', pn: '/ˈlʌntʃtaɪm/', transcr: 'ланчтайм',
    ru: 'обеденный перерыв', uz: 'tushlik vaqti', tj: 'вақти нӯшта',
    kg: 'түшкү тамак убакыты', kz: 'түскі ас уақыты'
  },
  {
    old: 'dusk',
    e: '🛫', en: 'departure', pn: '/dɪˈpɑːtʃə/', transcr: 'дипачэ',
    ru: 'отъезд', uz: 'ketish', tj: 'рафтан',
    kg: 'кетүү', kz: 'кету'
  }
];

function buildWordObj(w) {
  const f = '                        '; // 24 spaces for fields
  const c = '                  }';       // 18 spaces for closing }
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

const l14start = html.indexOf('"id": 14,');
if (l14start === -1) { console.error('L14 not found'); process.exit(1); }
const wsStart = html.indexOf('"words":', l14start);
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
