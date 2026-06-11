# FarmEnglish — Project Contract

Free, offline-first English learning app for seasonal farm workers from Central Asia (Seasonal Worker Visa UK).
Full steering docs: `.kiro/steering/` (content, design, i18n, conventions, product, structure).

## Hard Constraints (never violate)

- **Zero external dependencies** — no npm, no bundler, no CDN, no `fonts.googleapis.com`
- **Vanilla HTML + CSS + JS (ES6+)** — no framework, no TypeScript, no ES modules
- Everything works offline; hosted on GitHub Pages (static files only)

## Key Files

```
index.html      ← Hub: level selection, progress, phrasebook
a1.html         ← A0–A1 (15 lessons, all data inline)
a2.html         ← A1–A2 (15 lessons, all data inline)
b1.html         ← A2–B1 (6 lessons draft, all data inline)
translations.js ← Shared i18n for index.html only
scratch/        ← One-off audit/build scripts (Node.js, not served)
.kiro/steering/ ← Steering docs (full rules for content/design/i18n)
```

## Lesson Data Format (inside `LESSONS` array in each HTML file)

```javascript
{
  id: 1, mod: 1,
  name_ru, name_uz, name_tj, name_kg, name_kz,
  cefr: 'am/is/are · Pronouns',
  grammar: {
    title_ru/uz/tj/kg, rule_ru/uz/tj/kg, note_ru/uz/tj/kg,
    forms: {
      positive: { title, table: [{en, transcr, ru, uz, tj, kg, kz}] },
      negative: { title, table: [...] },
      question:  { title, table: [...] }
    },
    examples: [{en, transcr, ru, uz, tj, kg, kz}]  // ≥10
  },
  words: [   // exactly 30
    { e: '👋', en: 'Hello', pn: '/həˈləʊ/', transcr: 'хэ-ЛОУ', ru, uz, tj, kg, kz }
  ],
  dialogue: [  // exactly 10 lines, strict m/w alternation
    { s: 'm', en, transcr, ru, uz, tj, kg, kz }
    // s: 'm'=manager, 'w'=worker, 'c'=cashier, 'd'=doctor
  ],
  quiz: [  // exactly 10 questions
    { q: '[COMPLETE] "I ___ Ahmad."', opts: ['am','is','are','be'], c: 0 }
    // prefix: [COMPLETE] fill-in-blank, [TRANSLATE] translation
  ]
}
```

## Audit — REQUIRED Before Every Commit

```bash
node scratch/audit_all.js
```

Runs all three scripts (audit, advanced_audit, check_duplicates) for all three courses (a1/a2/b1).
A lesson is release-ready only when **all checks pass with zero errors (exit 0)**.

## Code Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Functions | `camelCase` | `spk()`, `render()` |
| Private helpers | `_camelCase` | `_buildCard()` |
| localStorage keys | `fe_snake_case` | `fe_lang`, `fe_a1` |
| CSS classes | `kebab-case` | `lv-card`, `stat-pill` |
| i18n keys | `snake_case` + prefix | `level_a1_title` |

- `const` over `let`; never `var`
- No `eval()`, `new Function()`, `document.write()`
- Use `onclick="fn()"` for event handlers in templates (not anonymous lambdas)

## localStorage Keys

```
fe_lang        → 'ru'|'uz'|'tj'|'kg'|'kz'  — use setLang(code), never write directly
fe_a1/a2/b1    → JSON array of completed lesson IDs
fe_streak      → consecutive study days (string)
fe_last_date   → ISO date of last session
fe_words       → total words learned (string)
fe_cert_a1_*   → certificate data
```

## Web Speech API

```javascript
function spk(text, rate = 0.88) {
  if (!speechSynthesis) return;      // always guard
  speechSynthesis.cancel();          // always cancel before speaking
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = rate;
  speechSynthesis.speak(u);
}
```

## i18n

- `index.html` → `t('key')` from `translations.js`; lesson files → `TR[lang]['key']` from inline `TR`
- All content fields must have all 5 languages: `ru`, `uz`, `tj`, `kg`, `kz`
- Russian is the master locale; add `ru` first, then all others
- Never hardcode user-visible strings

## Design System (brief; full spec in `.kiro/steering/design.md`)

- CSS variables only — never hardcode `#1a73e8`, `#e87830` etc.
- Shadows must have blue tint (`rgba(66,133,244,...)`) — not neutral gray
- Level card accent: `::before` pseudo-element, **not** `border-left`
- Icons: `<span class="icon">arrow_back</span>` via self-hosted `assets/fonts/material-symbols-outlined.woff2`
- Never `<link>` to Google Fonts or any CDN
- System font stack only (no Inter/Lora from CDN)
- Touch targets: minimum `44×44px`; app max-width: `430px`

## Data Safety

- `LESSONS` array lives inside HTML files — Git resets can destroy it irreversibly
- **Commit after every successfully audited lesson**
- Use `scratch/` scripts for bulk changes — never manual find-replace on large blocks
- Before risky Git ops, export current `LESSONS` to a backup JSON
