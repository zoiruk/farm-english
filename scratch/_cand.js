// Candidate vetting for a new B1 lesson: duplicate cards + "used-early" snowball risk.
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');

// all carded words (en, lowercased) across the curriculum so far
const carded = new Set();
[a1, a2, b1].forEach(C => C.forEach(l => l.words.forEach(w => carded.add(w.en.trim().toLowerCase()))));

// tokens used as BACKGROUND text in any dialogue / quiz q / quiz opts so far
const usedTokens = new Set();
const addTokens = (s) => String(s || '').toLowerCase().split(/[^a-z']+/).forEach(t => { t = t.replace(/^'|'$/g, ''); if (t.length >= 3) usedTokens.add(t); });
[a1, a2, b1].forEach(C => C.forEach(l => {
  (l.dialogue || []).forEach(d => addTokens(d.en));
  (l.quiz || []).forEach(q => { addTokens(q.q); (q.opts || []).forEach(addTokens); });
}));

const stem = (w) => [w, w.replace(/ies$/, 'y'), w.replace(/es$/, ''), w.replace(/s$/, ''), w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/ed$/, ''), w.replace(/ed$/, 'e')];
const usedEarly = (w) => stem(w).some(s => usedTokens.has(s));

const candidates = process.argv.slice(2);
let ok = 0;
for (const c of candidates) {
  const lc = c.toLowerCase();
  const tokens = lc.split(/\s+/);
  const dup = carded.has(lc);
  // a single-token card whose token already appears as background text = snowball risk
  const risky = tokens.filter(t => t.length >= 3 && usedEarly(t) && !carded.has(t));
  let status = 'OK ';
  if (dup) status = 'DUP';
  else if (risky.length) status = 'RISK';
  if (status === 'OK ') ok++;
  console.log(`${status}\t${c}${risky.length ? '  (early-use token: ' + risky.join(',') + ')' : ''}`);
}
console.log(`\n${ok}/${candidates.length} clean`);
