# FarmEnglish — Content Rules (Pedagogical Standards)

All lesson content must pass three automated audits before being considered release-ready.

## Lesson Minimums (Hard Requirements)

| Field | Requirement |
|-------|-------------|
| `words` | Exactly **30** per lesson |
| `dialogue` | Exactly **10** lines per lesson |
| `quiz` | Exactly **10** questions per lesson |
| Grammar examples | **≥ 10** across all three form tables combined |
| Grammar forms | All three **must** exist: `positive`, `negative`, `question` |
| Each form | Must have a `table` array (not empty) |

## Vocabulary Rules

- Every word must have all fields: `e` (emoji), `en`, `pn` (IPA), `transcr` (Cyrillic), `ru`, `uz`, `tj`, `kg`, `kz`
- No grouped entries like `"wage / pay"` — each word is a single entry
- **Snowball Rule**: A word must not appear in `words` of more than one lesson across the entire course
- Words must be realistic and relevant to farm/camp/UK-life scenarios — no generic textbook vocabulary

### Emoji vs Material Symbol Decision Rule

1. If the word has a direct, colorful, unambiguous emoji → **use emoji** (e.g., `🍓` strawberry, `🚜` tractor)
2. If no suitable emoji exists or the closest one misleads → **use a Material Symbol** (e.g., `inventory_2` for *punnet*, `badge` for *NI number*)
3. When using a Material Symbol for vocabulary, set `e: ''` in the word object

## Grammar Rules

- One grammar rule per lesson (mapped to CEFR A0–A1 topics)
- Three mandatory forms: ✅ Positive / ❌ Negative / ❓ Question
- Each form has a `table` array: `{en, transcr, ru, uz, tj, kg, kz}`
- Cyrillic transcription (`transcr`) is required on every grammar table row and example
- Explanations must assume **zero prior knowledge** — no linguistic terminology
- Include a `note_*` field with a common mistake warning (⚠️)
- All examples must use farm/worker context — never generic sentences

## Dialogue Rules

- Exactly 10 lines per lesson
- Speakers: `m` (manager), `w` (worker), `c` (cashier), `d` (doctor)
- **Strict alternation**: must alternate between `m`/`w` (or appropriate pair) — no two consecutive lines from the same speaker
- Every line must have: `s`, `en`, `transcr` (Cyrillic), `ru`, `uz`, `tj`, `kg`, `kz`
- Scenarios must be realistic farm/camp situations — not invented social chit-chat

## Quiz Rules

- Exactly 10 questions per lesson
- Every question `q` must be prefixed with a tag:
  - `[COMPLETE]` — fill-in-the-blank: `[COMPLETE] "I ___ Ahmad."`
  - `[TRANSLATE]` — translation question
- 4 answer options (`opts` array), one correct (`c` = index 0–3)
- Questions must only use vocabulary already introduced in current or previous lessons (Snowball Rule)

## Snowball Rule (Critical)

Every word used in dialogue, grammar examples, and quiz questions must already appear in the `words` array of the current lesson or any previous lesson. Using unknown words is a critical audit error.

Run `node scratch/advanced_audit.js` to check.

## Localization Completeness

All content fields must be provided in all 5 languages: `ru`, `uz`, `tj`, `kg`, `kz`. Missing any language key is an audit error.

Grammar fields use language-suffixed keys: `title_ru`, `title_uz`, `title_tj`, `title_kg` (kz may share kg as fallback).

## Audit Workflow (Mandatory Before Every Commit)

```bash
node scratch/audit.js && node scratch/check_duplicates.js && node scratch/advanced_audit.js
```

A lesson is only release-ready when all three audits pass with **zero errors**.

## Content Philosophy

- Target audience has **zero English** — assume nothing is known
- All content grounded in real seasonal worker life: farm equipment, PPE, payslips, camp accommodation, health, transport, UK culture
- Cultural notes explain concepts that don't exist in the learner's native language (articles, "to be" verb, etc.)
- British English throughout — `en-GB` spelling and pronunciation
