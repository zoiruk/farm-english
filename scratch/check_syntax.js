/**
 * check_syntax.js — verify every INLINE <script> block in the HTML files parses.
 *
 * The data audits (audit.js / advanced_audit.js) validate lesson CONTENT but never
 * compile the page's JavaScript. A regression like an unbalanced brace (which broke
 * a1's render on prod, SEV-1, commit 7d567a2) passes every data check yet leaves the
 * app blank. This closes that gap: each inline script block is compiled with
 * vm.Script (parse only, no execution) so a syntax error fails the gate.
 *
 * Usage:
 *   node scratch/check_syntax.js                 # scan index/a1/a2/b1 in repo root
 *   node scratch/check_syntax.js path/to.html    # scan specific file(s) — used for the
 *                                                 # broken-fixture self-demo
 * Exits 1 if any block fails to parse.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DEFAULTS = ['index.html', 'a1.html', 'a2.html', 'b1.html'].map(f => path.join(ROOT, f));
const argv = process.argv.slice(2);
const FILES = argv.length ? argv.map(f => path.resolve(f)) : DEFAULTS;

// Inline <script> blocks only — skip <script src="..."> (external, no body to parse).
const SCRIPT_RE = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

let failed = 0, checked = 0, scannedFiles = 0;

for (const fp of FILES) {
  if (!fs.existsSync(fp)) { console.log(`[skip] ${path.basename(fp)} not found`); continue; }
  scannedFiles++;
  const html = fs.readFileSync(fp, 'utf8');
  const name = path.basename(fp);
  let m, idx = 0;
  while ((m = SCRIPT_RE.exec(html)) !== null) {
    idx++;
    checked++;
    const startLine = html.slice(0, m.index).split('\n').length;
    try {
      new vm.Script(m[1], { filename: `${name}#script${idx}` });
      console.log(`[ok]   ${name} script#${idx} (HTML line ~${startLine}) parses`);
    } catch (e) {
      failed++;
      console.error(`[FAIL] ${name} script#${idx} (HTML line ~${startLine}): ${e.name}: ${e.message}`);
    }
  }
}

console.log(`\nScanned ${checked} inline <script> block(s) across ${scannedFiles} file(s).`);
if (failed) {
  console.error(`❌ ${failed} block(s) failed to parse.`);
  process.exitCode = 1;
} else {
  console.log('✅ All inline scripts parse.');
}
