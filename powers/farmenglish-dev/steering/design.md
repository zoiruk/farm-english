# FarmEnglish — Design System

FarmEnglish uses an **80% Material Design 3 Expressive / 20% Neural Expressive** visual language. Styles are inline `<style>` blocks inside each HTML file — no external CSS framework.

## CSS Variable Tokens

Always use variables — never hardcode color or shadow values.

### Color Tokens (`:root`)

| Variable | Value | Use |
|----------|-------|-----|
| `--ne-primary` | `#1a73e8` | Buttons, links, active states, hero gradient |
| `--ne-primary-2` | `#8ab4f8` | Gradients, tints |
| `--ne-violet` | `#7c4dff` | Hero gradient end, premium |
| `--ne-cyan` | `#12b5cb` | B1 level, secondary accents |
| `--ne-green` | `#1aae39` | A2 level, success |
| `--ne-amber` | `#f9ab00` | Warnings |
| `--ne-coral` | `#e87830` | A1 level accent |
| `--ne-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth exits |
| `--ne-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy interactions |
| `--bg` | `#eef3fb` | Page background |
| `--card` | `rgba(255,255,255,0.9)` | Glassmorphic card surface |
| `--card-solid` | `#ffffff` | Opaque cards, modals |
| `--text` | `#1b1b1f` | Headings, body text |
| `--text2` | `#4a4d52` | Descriptions, labels |
| `--text3` | `#69707c` | Placeholders, disabled |
| `--border` | `rgba(26,115,232,0.14)` | Primary-tinted borders |
| `--radius` | `22px` | Standard card radius |

### Shadow Tokens

```css
--card-shadow:
  0 1px 2px rgba(60, 64, 67, 0.06),
  0 10px 28px rgba(66, 133, 244, 0.10);   /* blue-tinted, not neutral gray */

--card-shadow-hover:
  0 2px 8px rgba(60, 64, 67, 0.08),
  0 16px 38px rgba(66, 133, 244, 0.16);
```

### CEFR Level Colors

| Level | Variable | Value |
|-------|----------|-------|
| A0–A1 | `--c-a1` | `#e87830` (coral/orange) |
| A2 | `--c-a2` | `#1aae39` (green) |
| B1 | `--c-b1` | `#12b5cb` (cyan) |
| B2 | `--c-b2` | `#1a73e8` (blue) |
| C1 | `--c-c1` | `#7c4dff` (violet) |
| C2 | `--c-c2` | `#5f6368` (muted) |

## Icon System

FarmEnglish uses a **hybrid iconography system**:

| Use | System |
|-----|--------|
| UI chrome (nav, checkboxes, progress) | Material Symbols Outlined — **self-hosted** `woff2` |
| Vocabulary words | System emoji |

### Material Symbols Setup (self-hosted only)

```css
@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('assets/fonts/material-symbols-outlined.woff2') format('woff2');
  font-display: block;
}

.icon {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  user-select: none;
}
```

Usage: `<span class="icon">arrow_back</span>`

**Never** use `fonts.googleapis.com` or any CDN for icons.

## Typography

- Font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- No external fonts — offline-first constraint
- Minimum font size: **14px**
- Headings: `font-weight: 800–900`
- Body: `font-weight: 400`, `line-height: 1.5`

## Layout

- App container: `.app { max-width: 430px; margin: 0 auto; }`
- All content padded `16px` horizontally
- Background mesh gradients on `body`:

```css
background:
  linear-gradient(135deg, rgba(26,115,232,0.08), transparent 34%),
  linear-gradient(225deg, rgba(18,181,203,0.08), transparent 32%),
  var(--bg);
```

## Key Component Patterns

### Hero Banner
```css
background: linear-gradient(145deg, #1a73e8 0%, #4285f4 50%, #7c4dff 100%);
border-radius: 28px;
box-shadow: 0 1px 2px rgba(26,115,232,0.16), 0 18px 42px rgba(66,133,244,0.24);
```

### Cards (Glassmorphic)
```css
background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,255,255,0.82));
border: 1px solid rgba(26,115,232,0.12);
border-radius: 22px;
backdrop-filter: blur(14px);
box-shadow: var(--card-shadow);
```

### Level Card Accent Strip
Use `::before` pseudo-element — **not** `border-left`:
```css
.lv-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  background: currentColor;
  opacity: 0.9;
}
```

### Badges / Pill Labels
```css
border-radius: 999px;
background: color-mix(in srgb, currentColor 12%, white);
padding: 5px 10px;
font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
```

### Spring Hover on Cards
```css
transition: transform 0.22s var(--ne-spring), box-shadow 0.22s ease;
/* hover: */ transform: translateY(-2px);
/* active: */ transform: scale(0.985);
```

### Sticky Header (Frosted Glass)
```css
background: rgba(248,250,255,0.78);
border-bottom: 1px solid rgba(26,115,232,0.08);
backdrop-filter: blur(12px);
```

### Bottom Sheet Modal
```css
border-radius: 28px 28px 0 0;
background: rgba(255,255,255,0.94);
box-shadow: 0 -18px 48px rgba(15,23,42,0.18);
animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Radius Scale

| Use | Value |
|-----|-------|
| Hero, modal top corners | `28px` |
| Standard cards | `22px` (`--radius`) |
| Stat pills, lang options | `18px` |
| Icon floats | `16px` |
| Pill buttons, badges, logo | `999px` |

## Spacing

Base unit: `8px`. Scale: `4, 8, 12, 16, 18, 20, 24, 28px`.

## Touch & Mobile

- Touch targets: minimum `44×44px` (`min-height: 42px` on interactive elements)
- Mobile-first: 320px minimum, optimized for 375–430px
- App capped at `430px`
- `-webkit-tap-highlight-color: transparent` on all interactive elements

## Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
- Color is never the sole indicator of state — always pair with text/icon
- Minimum contrast ratio 4.5:1 for body text

## What NOT to Do

- Do not hardcode `#1a73e8`, `#e87830` etc. — always use CSS variables
- Do not use `border-left` for level card accents — use `::before` pseudo-element
- Do not use neutral gray shadows — shadows must have blue tint (`rgba(66,133,244,...)`)
- Do not load external fonts — offline-first requires system font stack
- Do not use `--ne-radius-xl/lg/md/sm` variable names — FarmEnglish uses `--radius` and numeric values
