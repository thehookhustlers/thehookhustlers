# THE HOOK HUSTLERS — PREMIUM THEME PATCH GUIDE
## How to Apply the New Theme to ALL Pages

### Files Delivered:
1. `theme.css`   — Shared CSS (replaces ALL inline :root + body styles)
2. `theme.js`    — Shared JS (replaces ALL inline cursor/particle/reveal scripts)
3. `home.html`   — Fully rethemed homepage

---

### Apply to EVERY other page (about, contact, pricing, investors, startups, login, signup, help, reviews, privacy, terms):

#### STEP 1 — Replace the <head> style block
Remove the entire `<style>` block that starts with `:root {` and all embedded CSS variables.

Replace it with:
```html
<link rel="stylesheet" href="theme.css"/>
```

Keep any **page-specific** CSS that isn't in theme.css (e.g. `.about-mission`, `.founder-section-about`).

#### STEP 2 — Replace ALL inline color references
Use Find & Replace across all files:

| OLD value | NEW CSS variable |
|---|---|
| `#050508` / `#080810` | `var(--void)` / `var(--deep)` |
| `#d4a843` / `#f0c060` | `var(--gold)` / `var(--gold2)` |
| `#1a6cff` | `var(--blue)` |
| `rgba(212,168,67,...)` | Use `var(--gold-d)` / `var(--gold-g)` |
| `rgba(26,108,255,...)` | Use `var(--blue-d)` / `var(--blue-g)` |
| `rgba(0,208,132,...)` | Use `var(--emerald-d)` / `var(--emerald-g)` |
| `rgba(230,57,70,...)`  | Use `var(--crimson-d)` / `var(--crimson-g)` |

New spectrum variables available:
- `var(--crimson)` / `var(--crimson2)` — #ff1a3c / #ff4d6a
- `var(--purple)` / `var(--purple2)` — #9d00ff / #c44dff
- `var(--emerald)` / `var(--emerald2)` — #00ff88 / #00cc6a
- `var(--blue)` / `var(--blue2)` — #0088ff / #4db8ff
- `var(--gold)` / `var(--gold2)` — #ffb700 / #ffd966

#### STEP 3 — Replace nav logo gradient
Old: `linear-gradient(135deg,var(--gold),var(--gold2),var(--blue))`
New: `linear-gradient(135deg, var(--crimson), var(--purple2), var(--blue2))`

#### STEP 4 — Replace nav button classes
Old: `.nav-btn-gold` → New: `.nav-btn-primary`

#### STEP 5 — Replace font import
Old: `Bebas Neue + Cormorant Garamond + Rajdhani`
New: Add `Orbitron` to the Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Orbitron:wght@400;500;600;700;800&family=Rajdhani:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet"/>
```

#### STEP 6 — Replace ALL inline scripts at bottom
Remove the long inline `<script>` block at the bottom of each page.
Replace with:
```html
<script src="theme.js"></script>
```

#### STEP 7 — Update sec-label style
Old labels were just `color:var(--gold)`.
New: `color:var(--emerald)` with the `::before` line decoration (handled by theme.css .sec-label class).

#### STEP 8 — Glass card upgrades
Replace `.vc-card`, `.value-card`, `.flip-front` backgrounds:
Old: `background:var(--card)` → New: `background:var(--glass);backdrop-filter:blur(16px)`
Old borders with gold → New borders with `rgba(157,0,255,0.15)`

#### STEP 9 — Update `.nav-btn-gold` references
Find: `class="nav-btn nav-btn-gold"` → Replace: `class="nav-btn nav-btn-primary"`

---

### Color Accent Assignment per page:
- **home.html** — All spectrum colors
- **startups.html** — Crimson + Emerald  
- **investors.html** — Blue + Purple
- **about.html** — Purple + Gold
- **contact.html** — Emerald + Blue
- **pricing.html** — Purple + Crimson
- **login/signup** — Crimson + Purple

---

### Quick verification checklist:
- [ ] `<link rel="stylesheet" href="theme.css"/>` in `<head>`
- [ ] Orbitron font imported
- [ ] `<script src="theme.js"></script>` just before `</body>`
- [ ] `.nav-btn-gold` replaced with `.nav-btn-primary`
- [ ] `cursor:none` on body (theme.css handles this)
- [ ] Old `<style id="global-mobile-fix">` block REMOVED (theme.css has this)
- [ ] `#particles` canvas present in body
- [ ] `#cursor` and `#cursor-ring` divs present
