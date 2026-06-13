---
name: "farmenglish-dev"
displayName: "FarmEnglish Developer Guide"
description: "Complete developer guide for the FarmEnglish platform — a free English learning app for seasonal farm workers in the UK. Covers lesson data format, audit workflow, design system, i18n rules, and code conventions."
keywords: ["farmenglish", "lesson", "cefr", "audit", "localization", "farm", "seasonal-worker"]
---

# FarmEnglish Developer Guide

## Overview

FarmEnglish is a **zero-budget, offline-first** English learning web platform for seasonal agricultural workers in the UK (Seasonal Worker Visa). It helps workers from Central Asia (Uzbekistan, Tajikistan, Kyrgyzstan, Kazakhstan) survive and adapt from day one on the farm.

The entire app is **vanilla HTML + CSS + JS** — no framework, no bundler, no npm. Everything runs directly in the browser and is hosted on GitHub Pages. All lesson data lives inline inside HTML files.

## Available Steering Files

- **content** — Pedagogical rules: lesson minimums, vocabulary/grammar/dialogue/quiz requirements, Snowball Rule, audit workflow
- **design** — Design system: Material 3 Expressive tokens, CSS variables, component patterns, icon system
- **i18n** — Internationalization: supported languages, TR object, translation keys, localization completeness rules

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5 + CSS3 + JavaScript (ES6+) — no framework, no bundler |
| Audio | Web Speech API (`en-GB`, rate 0.88) |
| Storage | `localStorage` only — no backend, no database |
| Hosting | GitHub Pages — static files only |
| Icons/Images | Emoji (vocabulary) + Material Symbols Outlined self-hosted `woff2` (UI chrome) |
| Lesson data | JSON inline in `<script>` tags inside HTML files |
| Localization | `translations.js` (for `index.html`), inline `TR` object (for lesson files) |

No build step, no npm, no package.json. Everything runs directly in the browser.

## Project Structure

```
/
├── index.html          ← Hub: level selection, progress, phrasebook
├── a1.html             ← A0–A1 course (15 lessons, all data inline)
├── a2.html             ← A1–A2 course (15 lessons, all data inline)
├── b1.html             ← A2–B1 course (6 lessons, all data inline)
├── translations.js     ← Shared i18n object for index.html (5 languages)
├── get_quiz.py         ← Utility: quiz generation helper
├── swap.py             ← Utility script
│
├── doc/                ← CEFR course outline PDFs (reference only, not served)
├── specs/              ← Detailed project documentation (not served)
├── scratch/            ← One-off build/fix/audit scripts (Node.js, not served)
│   ├── audit.js        ← Validates lesson structure, word/dialogue counts
│   ├── advanced_audit.js ← Snowball rule, phonetics, quiz tags, dialogue alternation
│   ├── check_duplicates.js ← Checks for duplicate words across lessons
│   ├── build_l*.js     ← Scripts that built individual lessons
│   └── fix_*.js        ← One-off data repair scripts
└── artifacts/
    └── implementation_plan.md
```

### Architecture: Hub-and-Spoke

- **Hub** (`index.html`): Entry point. Shows all CEFR levels, progress stats, phrasebook. Uses external `translations.js`.
- **Spokes** (`a1.html`, `a2.html`, `b1.html` etc.): Self-contained lesson pages. Each file contains ALL lesson data inline as a `LESSONS` JS array. No external data fetching.
- Navigation: Lesson pages have a floating back button (iOS-style chevron) returning to the hub.

### Lesson Page Internal Navigation

Users move through tabs sequentially:
1. Grammar → 2. Words → 3. Dialogue → 4. Quiz → Completion screen

Navigation uses a tab bar (Grammar / Words / Dialogue / Quiz) with "Next →" buttons to advance between tabs.

## Course Structure

| Level | File | Status | Focus |
|-------|------|--------|-------|
| A0–A1 "First Days on the Farm" | `a1.html` | ✅ MVP (15 lessons) | Survival, shifts, numbers, safety |
| A2 "Life in the Camp" | `a2.html` | ✅ Phase 2 (15 lessons) | Payslip, transport, shops, daily life |
| B1 "Solving Problems" | `b1.html` | 🚧 Phase 3 draft (6 lessons) | Rights, conflicts, H&S |
| B2–C2 | future files | 🔒 Later | — |

Levels unlock sequentially: A1 is always open; each subsequent level unlocks when the previous is 100% complete (`fe_a1.length >= 15`, etc.).

## Lesson Data Format

Each lesson is a JS object in the `LESSONS` array inside the level HTML file:

```javascript
{
  id: 1,
  mod: 1,                    // Module grouping (1–6)
  name_ru: '...', name_uz: '...', name_tj: '...', name_kg: '...', name_kz: '...',
  cefr: 'am/is/are · Pronouns',

  grammar: {
    title_ru/uz/tj/kg: '...',
    rule_ru/uz/tj/kg: '...',
    note_ru/uz/tj/kg: '...',
    forms: {
      positive: { title: '...', table: [{en, transcr, ru, uz, tj, kg, kz}] },
      negative: { title: '...', table: [...] },
      question: { title: '...', table: [...] }
    },
    examples: [{en, transcr, ru, uz, tj, kg, kz}]  // min 10
  },

  words: [   // exactly 30 per lesson
    { e: '👋', en: 'Hello', pn: '/həˈləʊ/', transcr: 'хэ-ЛОУ', ru, uz, tj, kg, kz }
  ],

  dialogue: [  // exactly 10 lines, strict m/w alternation
    { s: 'm', en: '...', transcr: '...', ru, uz, tj, kg, kz }
    // s: 'm'=manager, 'w'=worker, 'c'=cashier, 'd'=doctor
  ],

  quiz: [  // exactly 10 questions
    { q: '[COMPLETE] "I ___ Ahmad."', opts: ['am','is','are','be'], c: 0 }
    // q prefix: [COMPLETE] for fill-in-blank, [TRANSLATE] for translation
  ]
}
```

## Audit Commands (Mandatory Before Every Commit)

```bash
# Basic structure + grammar forms + word/dialogue counts
node scratch/audit.js

# Check for duplicate words across lessons
node scratch/check_duplicates.js

# Snowball rule + phonetics + quiz tags + dialogue alternation
node scratch/advanced_audit.js

# Run all three at once — REQUIRED before every commit
node scratch/audit.js && node scratch/check_duplicates.js && node scratch/advanced_audit.js
```

**A lesson is only release-ready when all three audits pass with zero errors.**

## localStorage Keys

All app keys use the `fe_` prefix:

```
fe_a1          → JSON array of completed lesson IDs for A1
fe_a2          → JSON array of completed lesson IDs for A2
fe_lang        → Selected UI language: 'ru' | 'uz' | 'tj' | 'kg' | 'kz'
fe_streak      → Number of consecutive study days (integer as string)
fe_last_date   → ISO date string of last study session
fe_words       → Total words learned (integer as string)
fe_cert_a1_name / fe_cert_a1_date / fe_cert_a1_issued  → Certificate data
```

Never write to localStorage directly for language — use `setLang(code)` from `translations.js`.

## Web Speech API

```javascript
function spk(text, rate = 0.88) {
  if (!speechSynthesis) return;
  speechSynthesis.cancel();          // always cancel before speaking
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';                  // British accent
  u.rate = rate;                     // slower for beginners
  speechSynthesis.speak(u);
}
```

Always call `speechSynthesis.cancel()` before speaking to prevent overlap.
Browser support: Chrome Android ✅, Samsung Internet ✅, Safari iOS ✅, Firefox Android ⚠️ (partial).

## Code Conventions

### General
- Vanilla JS (ES6+) — no TypeScript, no framework, no bundler
- All scripts are plain `<script>` tags or external `.js` files
- Prefer `const` over `let`; never use `var`

### Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Functions | `camelCase` | `spk()`, `render()`, `changeLang()` |
| Private helpers | `_camelCase` | `_buildCard()` |
| localStorage keys | `fe_snake_case` | `fe_lang`, `fe_a1`, `fe_streak` |
| CSS classes | `kebab-case` | `lv-card`, `stat-pill`, `modal-overlay` |
| i18n keys | `snake_case` with prefix | `level_a1_title`, `quiz_ok_title` |
| Lesson data fields | short `snake_case` | `name_ru`, `title_uz`, `pn`, `transcr` |

### HTML Templates in JS
- Always use `t('key')` or `TR[lang]['key']` for user-visible text — never hardcode strings
- Use `onclick="functionName()"` for event handlers in templates — named functions only

### Error Handling
- Always guard Web Speech API: `if (!speechSynthesis) return;`
- Use `console.warn` for recoverable issues, `console.error` for unexpected failures
- Never `throw` from a render function — return a fallback HTML string instead

### What NOT to Do
- Do not use `eval()`, `new Function()`, or `document.write()`
- Do not add external JS libraries or CDN dependencies — app must work offline
- Do not use ES modules (`import`/`export`) — files are plain scripts
- Do not add npm dependencies — there is no build step
- Do not add `<link>` to `fonts.googleapis.com` or any external CDN

## Adding a New CEFR Level

1. Consult the corresponding PDF in `doc/` for lesson count and topics
2. Create the new HTML file following the exact structure of `a1.html`
3. Use an inline `TR` object (not `translations.js`) for full autonomy
4. Add the level card to `index.html` with the correct unlock condition
5. Update localStorage unlock logic: level unlocks when previous level's array length ≥ lesson count
6. Run all three audit scripts before committing

## Data Safety Rules

- The `LESSONS` array lives inside `a1.html` — Git resets can destroy it irreversibly
- **Commit after every successfully audited lesson or fix**
- Use `scratch/` scripts for bulk modifications to `LESSONS` (never manual find-replace on large blocks)
- Before risky Git operations, export the current `LESSONS` array to a backup JSON file
