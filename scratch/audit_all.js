/**
 * audit_all.js — unified audit gate.
 * Runs all three audit scripts against all three courses.
 * Exits with code 1 if any check fails.
 *
 * Usage:
 *   node scratch/audit_all.js
 */

const { spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCRATCH = __dirname;

const CHECKS = [
  { script: 'audit.js',            args: ['a1'], label: 'audit          a1' },
  { script: 'audit.js',            args: ['a2'], label: 'audit          a2' },
  { script: 'audit.js',            args: ['b1'], label: 'audit          b1' },
  { script: 'advanced_audit.js',   args: ['a1'], label: 'advanced_audit a1' },
  { script: 'advanced_audit.js',   args: ['a2'], label: 'advanced_audit a2' },
  { script: 'advanced_audit.js',   args: ['b1'], label: 'advanced_audit b1' },
  { script: 'check_duplicates.js', args: ['all'], label: 'check_duplicates (all courses)' },
];

let anyFailed = false;

for (const { script, args, label } of CHECKS) {
  const result = spawnSync('node', [path.join(SCRATCH, script), ...args], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const pass = result.status === 0;
  if (!pass) anyFailed = true;
  const tag = pass ? '✅ PASS' : '❌ FAIL';
  console.log(`[${tag}] ${label}`);
  if (result.stdout && result.stdout.trim()) {
    result.stdout.trim().split('\n').forEach(l => console.log('       ' + l));
  }
  if (result.stderr && result.stderr.trim()) {
    result.stderr.trim().split('\n').forEach(l => console.error('  ERR  ' + l));
  }
}

console.log('');
if (anyFailed) {
  console.log('❌  AUDIT GATE FAILED — fix errors above before committing.');
  process.exitCode = 1;
} else {
  console.log('✅  AUDIT GATE PASSED — all checks green.');
}
