// update_ms_font.js — download a new Material Symbols Outlined subset
// that includes both the existing icons and the 24 new word icons.
// Run: node scratch/update_ms_font.js
// Replaces assets/fonts/material-symbols-outlined.woff2
'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const ICONS = [
  // existing (used in app UI)
  'arrow_back', 'arrow_forward', 'bar_chart', 'chat_bubble',
  'check', 'chevron_right', 'menu_book', 'volume_up',
  // L1 — payroll abstract terms
  'receipt_long', 'payments', 'work', 'pin', 'remove',
  // L4 — health
  'medication',
  // L5 — pharmacy
  'biotech', 'nutrition', 'air', 'schedule', 'medical_services',
  // L6 — workplace
  'electrical_services',
  // L7 — neighbourhood
  'map', 'road', 'signpost', 'crop_square', 'traffic',
  // L8 — phone
  'phone_forwarded', 'dialpad', 'call',
  // L10 — contracts
  'work_history',
  // L11 — legal
  'gavel', 'description', 'policy',
];

// icon_names must be sorted alphabetically for the API to return 200
const ICONS_SORTED = [...ICONS].sort();
const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' +
  ':opsz,wght,FILL,GRAD@24,400,0,0&display=block&icon_names=' +
  ICONS_SORTED.join(',');

function get(url, headers) {
  return new Promise((resolve, reject) => {
    const opts = Object.assign(new URL(url), { headers });
    https.get(opts, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(get(res.headers.location, headers));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  // Step 1: fetch CSS to get the woff2 URL
  console.log('Fetching CSS subset URL…');
  const cssRes = await get(CSS_URL, {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/css',
  });
  if (cssRes.status !== 200) {
    throw new Error('CSS request failed: HTTP ' + cssRes.status);
  }
  const css = cssRes.body.toString('utf8');

  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
  if (!match) {
    console.error('CSS response:\n', css.slice(0, 500));
    throw new Error('Could not find woff2 URL in CSS response');
  }
  const woff2Url = match[1];
  console.log('woff2 URL:', woff2Url);

  // Step 2: download the woff2
  console.log('Downloading woff2…');
  const fontRes = await get(woff2Url, {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': 'https://fonts.googleapis.com/',
  });
  if (fontRes.status !== 200) {
    throw new Error('Font download failed: HTTP ' + fontRes.status);
  }

  const outPath = path.join(__dirname, '..', 'assets', 'fonts', 'material-symbols-outlined.woff2');
  const oldSize = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0;
  fs.writeFileSync(outPath, fontRes.body);
  console.log(`Saved: ${outPath}`);
  console.log(`Size: ${oldSize} bytes → ${fontRes.body.length} bytes`);
  console.log(`Icons included (${ICONS.length}): ${ICONS.join(', ')}`);
})().catch(e => { console.error(e.message); process.exit(1); });
