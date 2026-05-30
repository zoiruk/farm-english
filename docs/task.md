# Task List — Critical Tech Debt Clean-up

- `[x]` **Prep & Git Configuration**
  - `[x]` Add `a1.html.bak` to `.gitignore` (already ignored via *.bak)
- `[x]` **Design System Reference**
  - `[x]` Update unified tokens in `specs/design.md`
- `[x]` **Main Hub Updates (index.html)**
  - `[x]` Unify and merge `:root` blocks
  - `[x]` Implement try/catch on `localStorage.getItem` for `JSON.parse`
  - `[x]` Implement try/catch on `localStorage.setItem` writes
- `[x]` **A0-A1 Lesson Page Updates (a1.html)**
  - `[x]` Unify `:root` blocks and remove duplicate Expressive block at line 1242
  - `[x]` Replace hardcoded `#e87830` color references in CSS with `var(--c-accent)`
  - `[x]` Replace hardcoded `#0075de` color references in CSS with `var(--ne-primary)`
  - `[x]` Replace hardcoded `#1a1a2e` color references in CSS with `var(--ne-ink)`
  - `[x]` Move button style overrides (including disabled state) to CSS and remove inline styles in JS
  - `[x]` Add local translation keys for storage full errors
  - `[x]` Implement safe `localStorage` helper functions
  - `[x]` Integrate safe helper functions across all reads/writes
- `[x]` **Verification**
  - `[x]` Run content/structure validation audits (`node scratch/audit.js && ...`)
  - `[x]` Manually test in browser (visual checks & exception tests)

