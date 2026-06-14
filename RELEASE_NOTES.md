# FarmEnglish — Release Notes v1.0

> Offline-first English learning app for Central Asian seasonal farm workers (UK Seasonal Worker Visa).  
> Stack: vanilla HTML + CSS + JS, zero external runtime dependencies, hosted on GitHub Pages.

---

## What was built — phases 0–7

### Phase 0 — Initial scaffold
Basic structure, first two A1 lessons, initial UI layout.

### Phase 1 — A1 Golden Standard (`7291a03`)
- 15 lessons, all data inline in `a1.html`
- 5 languages: RU / UZ / TJ / KG / KZ
- Grammar: 3-form conjugation tables (positive / negative / question) for L1–7; legacy `tables` format adapter for L8–15 (`getGrammarModel`)
- Self-hosted Material Symbols font (`assets/fonts/material-symbols-outlined.woff2`) — no CDN
- Advanced audit gate: word count (30/lesson), dialogue lines (10/lesson), quiz questions (10/lesson), Cyrillic transcription format, speaker roles, lesson names

### Phase 2 — A2 course + PWA (`3f2ad61`, `d5f517a`)
- `a2.html`: A1→A2, 15 lessons, same inline-data format
- PWA: `manifest.json`, service worker with stale-while-revalidate + offline navigation fallback
- Unified audit gate (`audit_all.js`) covering all three courses

### Phase 3 — Quiz integrity (`5e5c2c6`, `a4b687c`)
- Fisher-Yates shuffle for quiz options — order randomises each session
- Fixed 10 answer-leak instances across A1 (correct answer always in position 0)
- Audit checks: permanent answer-leak detection, Snowball vocabulary progression (no word used before its introducing lesson)

### Phase 4 — B1 draft + snowball fixes (`d535c31`, `275237a`)
- B1: 6 lessons drafted on `b1-dev` branch, gitignored in `master` until production-ready
- Snowball violations fixed in A2 and B1; `checkSnowball` switched to `flagStrict`

### Phase 5 — Certificates + Phrasebook UX (`6c18401`, `3a4d58a`, `d9fe46d`)
- Certificate mechanism for A2 (mirrors A1): generate, print, persist to localStorage
- Phrasebook navigation button added to hub
- Unified `fe_words` word-count algorithm across all three courses (consistent `localStorage` key)

### Phase 6 — A2 content quality + audit hardening (`d6c701f`, `7e29992`, `e279b7f`, `9028afc`)
- A2 L14: replaced low-relevance vocabulary with worker-relevant date/time terms
- Emoji diversity ≥ 80 % enforced across all A2 lessons; 24 abstract-concept words replaced with Material Symbol icons (`e: ''`)
- Four new audit checks: speaker-role validation, lesson-name completeness, Cyrillic-transcription format, emoji diversity; synthetic fixture tests added
- Fixed KZ hub title: `үчүн` (Kyrgyz) → `үшін` (Kazakh)

### Phase 7 — Final sprint (faze `7d567a2`–`0b24abe`)
- **7.1** Docs synced: README, `specs/product.md`, `specs/tasks.md`, `powers/farmenglish-dev/POWER.md`
- **7.2** Accessibility: removed `* { outline: none }` → `:focus-visible` rule; removed `maximum-scale=1.0 / user-scalable=no` from viewport meta; language modal: `role="dialog"` + `aria-modal` + `aria-labelledby`; language options: `role="option"` / `tabindex="0"` / `aria-selected` / Enter–Space keydown handlers
- **7.3** Five inline language maps removed from `index.html` → moved to `translations.js` (7 new keys × 5 locales = 35 entries); zero inline map objects remain in `index.html`
- **7.4** Dead code removed from `a1.html`: unused `MODS` array, unreachable OLD FORMAT FALLBACK `else` branch (proven unreachable: all 15 lessons produce `g.forms` through `getGrammarModel`), phantom `|| 450` fallback in certificate JS and HTML template → `0`; same phantom `|| 180` fixed in `b1.html` on `b1-dev`

---

## Known limitations — v1

### B1 course
- **8 of a planned 12 lessons exist** on `b1-dev` (authoring L7–L12 in progress, 2026-06-14):
  - L7 "Собеседование и повышение" — Present Perfect Continuous (Module 3)
  - L8 "Несчастный случай на ферме" — Past Perfect (Module 4)
  - Each passes the full audit gate (8/8: counts, snowball, no duplicates) on `b1-dev`.
- Tracked on `b1-dev` branch; **not deployed to production** — hub card is permanently locked.
- **Deployment gated on translation review (owner decision 2026-06-14):** lessons are authored as
  AI drafts now, but B1 will NOT be merged/deployed until native speakers review the existing
  backlog (254 fields) + each new lesson's ~320 draft fields. See `specs/translation_review.md`.
- Will be promoted to `master` only when all 12 lessons are complete, natively translated, audited,
  with MODS finalised to 12 and the completion banner bound to `LESSONS.length`.

### Translations — pending native-speaker review
File: `specs/translation_review.md` — 254 flagged fields total.

| Category | Count | Description |
|----------|-------|-------------|
| Cat 1 — needs review | 54 rows | `kz` value identical to `kg` — likely copy-paste in everyday/grammar words |
| Cat 1 — likely loanwords | 123 rows | International/Russian borrowings; probably legitimately identical, confirm with speaker |
| Cat 2 — mixed script | 77 rows | Uzbek fields mixing Cyrillic and Latin characters |
| Cat 3 — no Cyrillic | 0 rows | Clean |

No translation fix has been applied in code — this is a content audit for a native-speaker pass.

---

## Deployment rules

**Any push that changes `a1.html`, `a2.html`, `index.html`, `translations.js`, or `sw.js` MUST bump `CACHE_VERSION` in `sw.js` in the same push** (e.g. `v3` → `v4`).

- **Why:** the service worker serves these via stale-while-revalidate from a versioned cache (`farmenglish-<version>`). `sw.js` itself only re-installs when its bytes change, so without a version bump returning users keep the old cached copy and **never receive the change**. This caused two production incidents:
  - the SEV-1 blank a1 fix (`f472514`) reached no one until the `v1→v2` bump (`923e3fa`);
  - the high-contrast Back button reached no one until the `v2→v3` bump (`64c60db`).
- **Mechanism:** the bump is the documented kill-switch (`sw.js` header). The new SW's `activate` purges old caches and re-precaches fresh copies; `install` uses `new Request(url, {cache:'reload'})` to bypass the browser HTTP cache (GH Pages `max-age` window).
- **Verify after push:** `curl` the live `sw.js` for the new version, then a returning-user probe (persistent profile) — old cache evicted, new asset served. Clean-profile / `127.0.0.1` probes do **not** exercise the SW path and can falsely report success.
- Fonts/icons (`.woff2`/`.png`) are cache-first and effectively immutable — no bump needed unless replaced.

Current live `CACHE_VERSION`: **`v3`**.

### Icons — partial emoji legacy
- `a1.html`: all 450 word-card icons are emoji (no Material Symbol replacement planned unless visual consistency becomes a requirement)
- `a2.html`: 426 emoji + 24 Material Symbol icons (abstract concepts already replaced in phase 6)
- No functional impact; emoji render consistently on all target platforms (Android 8+, iOS 14+)

### a1 `--c-accent` variable cycle (deferred — deliberate, not a hidden bug)
- `a1.html` `:root` defines `--c-a1: var(--c-accent)` **and** `--c-accent: var(--c-a1)` — a circular reference, so `var(--c-accent)` resolves to empty throughout a1 (measured in-browser).
- **Scope: ~24 `var(--c-accent)` uses across a1** render colorless — orange accents fall back to transparent backgrounds / inherited text (also affects `--ne-coral` and `--c-a1`, which alias it). a1 has shipped this way; the blue-without-orange look is the **de-facto appearance users already see**.
- **Decision (owner, 2026-06-14): do NOT fix now.** Restoring the orange is a visual change to a live, in-use course and needs a dedicated before/after review of all 24 elements — not a drive-by edit.
- The one *user-blocking* symptom — the invisible `.speak-btn` "Слушать" (white text on the transparent fallback) — was fixed in isolation via a concrete `--c-a1-strong: #b5560f` token (commit `b714949`, white-on-fill 4.88:1), **without** touching the cycle. The Back-button and 🔊 contrast fixes (commits `bcc7319`/`b714949`, b1-dev `ffa05ef`) are likewise independent of the cycle.

---

## Future work

1. **Translation review (blocks B1 completion)** — native-speaker pass on the 254 existing
   flagged fields (54 Cat-1 KZ/KG divergence, 123 Cat-1 loanwords, 77 Cat-2 mixed-script UZ) PLUS
   L7's 320 new draft fields; update lesson data, re-run audit.
2. **B1 completion** — lessons 8–12 (L7 already drafted as sample), audit gate, merge `b1-dev` →
   `master`, unlock hub card. **Deferred until item 1 is done** (owner decision 2026-06-14).
3. **Material Symbols migration for A1** — optional: replace emoji word icons with MS icons for visual consistency with A2 abstract-word cards. Low priority; emoji are functional.
4. **B2 / C1 levels** — hub cards exist (locked); no content planned yet.
5. **Analytics / feedback** — currently zero telemetry by design; if user research is needed, add privacy-respecting event logging without external SDK.
6. **Integration with 6oy.uk** — link to FarmEnglish from the Telegram Mini App (cross-traffic between the two platforms).

---

## Release checklist

### Closed — verified by code / emulation / audit

| Item | How verified |
|------|-------------|
| All lessons pass 8-check audit gate (word count, dialogue, quiz, transcription, speaker roles, lesson names, emoji diversity, Snowball) | `node scratch/audit_all.js` — 8/8 green |
| Quiz options shuffle each session (Fisher-Yates) | Code review + emulator |
| No answer leaks (correct answer not always at index 0) | Audit check permanent |
| Snowball violations = 0 in A1 and A2 | Audit check |
| Certificate generates, persists, and prints for A1 and A2 | Browser emulator |
| PWA installs; service worker caches all assets | DevTools → Application |
| Offline navigation fallback active | DevTools → Network throttle → Offline |
| TTS guard: no crash when `speechSynthesis` absent | Code guard `if (!speechSynthesis) return` |
| `user-scalable=no` / `maximum-scale=1.0` removed from viewport | `index.html` line 6 confirmed |
| Language modal: `role="dialog"`, `aria-modal`, `aria-labelledby` | Code diff |
| Language options: `role="option"`, `tabindex="0"`, `aria-selected`, Enter/Space keyboard | Code diff |
| `:focus-visible` outline restored (`* { outline: none }` removed) | Code diff |
| Inline language maps removed from `index.html` (grep = 0) | Confirmed |
| Phantom fallback values (`|| 450`, `|| 180`, `|| 0` HTML placeholder) | Code diff |
| KZ title preposition corrected (`үшін`) | Code diff + commit `9028afc` |
| `b1-dev`: `|| 180` phantom fixed in certificate | Commit `c3bc1d4` |

### Pending — requires owner on a real device

| Item | What to check |
|------|--------------|
| TalkBack / VoiceOver — language modal | Open modal, swipe through options; screen reader should announce `role=option`, language name, and `aria-selected` state |
| TalkBack / VoiceOver — focus trap | Modal should confine focus; closing with back gesture should return focus to lang button |
| Pinch-zoom | Open `index.html` in browser on device; pinch-zoom should be freely scalable |
| TTS voice quality | Tap any word in a lesson; British English voice (`en-GB`) should read it aloud at reduced rate |
| Offline full flow | Enable Airplane mode after first load; navigate A1 → open lesson → complete quiz — should work end-to-end |
| PWA install prompt | Open site in Chrome on Android; "Add to Home Screen" prompt should appear |
| Certificate print | Complete all 15 A1 lessons → generate certificate → confirm print layout is correct on device |
