/**
 * check_sync.js — snapshot integrity gate.
 * For each course, extracts the LESSONS array directly from the served HTML file and
 * deep-compares it to the scratch/lessons_data*.js snapshot that the audit scripts read.
 * If a snapshot drifts from its HTML, every audit result for that course is about
 * content users never see (the A1 stale-snapshot bug, release_plan §1.2.1) — so this
 * runs FIRST in the audit gate.
 *
 * Usage:  node scratch/check_sync.js
 * Exits 1 if any snapshot diverges from its HTML.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const COURSES = [
  { name: 'a1', html: 'a1.html', snapshot: 'lessons_data.js' },
  { name: 'a2', html: 'a2.html', snapshot: 'lessons_data_a2.js' },
  { name: 'b1', html: 'b1.html', snapshot: 'lessons_data_b1.js' },
];

// String-aware bracket matcher: finds the end ] of the LESSONS array, ignoring
// brackets inside string literals and honouring backslash escapes.
function extractLessons(html) {
  const start = html.indexOf('const LESSONS');
  if (start === -1) throw new Error('LESSONS declaration not found');
  const open = html.indexOf('[', start);
  if (open === -1) throw new Error('LESSONS opening bracket not found');

  let depth = 0, inString = null, escaped = false, end = -1;
  for (let i = open; i < html.length; i++) {
    const ch = html[i];
    if (inString) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) throw new Error('LESSONS closing bracket not found');
  // eslint-disable-next-line no-new-func
  return new Function('return ' + html.slice(open, end + 1))();
}

let anyFailed = false;

for (const { name, html, snapshot } of COURSES) {
  const htmlPath = path.join(ROOT, html);
  const snapPath = path.join(__dirname, snapshot);

  if (!fs.existsSync(htmlPath)) { console.log(`[skip] ${name}: ${html} not found`); continue; }
  if (!fs.existsSync(snapPath)) { console.log(`[FAIL] ${name}: snapshot ${snapshot} missing`); anyFailed = true; continue; }

  let fromHtml, fromSnap;
  try {
    fromHtml = extractLessons(fs.readFileSync(htmlPath, 'utf8'));
  } catch (e) {
    console.log(`[FAIL] ${name}: cannot extract LESSONS from ${html} — ${e.message}`);
    anyFailed = true;
    continue;
  }
  delete require.cache[require.resolve(snapPath)];
  fromSnap = require(snapPath);

  const a = JSON.stringify(fromHtml);
  const b = JSON.stringify(fromSnap);
  if (a === b) {
    console.log(`[ok]   ${name}: snapshot matches ${html} (${fromHtml.length} lessons)`);
  } else {
    anyFailed = true;
    console.log(`[FAIL] ${name}: snapshot ${snapshot} DIVERGES from ${html}`);
    const n = Math.max(fromHtml.length, fromSnap.length);
    for (let i = 0; i < n; i++) {
      if (JSON.stringify(fromHtml[i]) !== JSON.stringify(fromSnap[i])) {
        const h = fromHtml[i], s = fromSnap[i];
        console.log(`         lesson ${i + 1} differs (html.name_ru="${h && h.name_ru}" snapshot.name_ru="${s && s.name_ru}")`);
      }
    }
  }
}

if (anyFailed) {
  console.log('\n❌ SNAPSHOT SYNC FAILED — regenerate snapshots from HTML before auditing.');
  process.exitCode = 1;
} else {
  console.log('\n✅ All snapshots are byte-identical to their HTML.');
}
