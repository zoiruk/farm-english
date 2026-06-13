// fix_a2_icon_fields.js — add icon: 'SYMBOL' after e: '' for 24 abstract words
// and update the words-tab render in a2.html.
// Run: node scratch/fix_a2_icon_fields.js
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'a2.html');
let html = fs.readFileSync(FILE, 'utf8');
const le = html.includes('\r\n') ? '\r\n' : '\n';
const INDENT = '                        '; // 24 spaces (6×4)

// Icon assignments — unique within each lesson, semantically meaningful
const ICON_MAP = {
  // L1 — payroll abstract
  'gross':               'receipt_long',
  'net':                 'payments',
  'basic':               'work',
  'tax code':            'pin',
  'deduct':              'remove',
  // L4
  'ibuprofen':           'medication',
  // L5 — pharmacy (5 unique)
  'antibiotic':          'biotech',
  'vitamin':             'nutrition',
  'capsule':             'medical_services',
  'spray':               'air',
  'dosage':              'schedule',
  // L6
  'overhead':            'electrical_services',
  // L7 — neighbourhood (5 unique)
  'district':            'map',
  'pavement':            'road',
  'avenue':              'signpost',
  'square':              'crop_square',
  'intersection':        'traffic',
  // L8
  'extension':           'phone_forwarded',
  'dial':                'dialpad',
  'pick up the phone':   'call',
  // L10
  'zero-hours contract': 'work_history',
  // L11
  'clause':              'gavel',
  'terms':               'description',
  'penalty clause':      'policy',
};

// ── Step 1: insert icon field ─────────────────────────────────────────────────
let insertCount = 0;
let skipCount = 0;

for (const [wordEn, symbol] of Object.entries(ICON_MAP)) {
  // Pattern: the e:'' line immediately followed by en:'WORD'
  const needle = `"e": "",${le}${INDENT}"en": "${wordEn}"`;
  const replacement = `"e": "",${le}${INDENT}"icon": "${symbol}",${le}${INDENT}"en": "${wordEn}"`;

  if (!html.includes(needle)) {
    console.warn(`WARN: needle not found for "${wordEn}"`);
    skipCount++;
    continue;
  }
  // Make sure we only replace once per word
  const count = html.split(needle).length - 1;
  if (count > 1) {
    console.warn(`WARN: "${wordEn}" matches ${count} times — skipping`);
    skipCount++;
    continue;
  }
  html = html.replace(needle, replacement);
  insertCount++;
}

console.log(`icon fields inserted: ${insertCount}/${Object.keys(ICON_MAP).length} (skipped: ${skipCount})`);
if (skipCount > 0) process.exit(1);

// ── Step 2: update render at the words tab ────────────────────────────────────
// Old: ${w.e || '📗'}
// New: ${w.e ? w.e : (w.icon ? '<span class="icon">'+w.icon+'</span>' : '📗')}
const OLD_RENDER = `\${w.e || '📗'}`;
const NEW_RENDER = `\${w.e ? w.e : (w.icon ? '<span class="icon">'+w.icon+'</span>' : '📗')}`;

if (!html.includes(OLD_RENDER)) {
  console.error('ERROR: render fallback pattern not found in a2.html');
  process.exit(1);
}
html = html.replace(OLD_RENDER, NEW_RENDER);
console.log('Render fallback updated.');

// ── Write ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(FILE, html);
console.log('a2.html updated successfully.');
