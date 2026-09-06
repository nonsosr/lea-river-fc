# Lea River FC

Static site for Lea River FC — Sunday league, Hackney & Leyton Division 3,
home games at Hackney Marshes.

Plain HTML, one stylesheet, ~70 lines of JavaScript. No build step, no
framework, no dependencies. Deploys to GitHub Pages on push to `main`.

Live at https://leariverfc.co.uk

## Running locally

```bash
python3 -m http.server 8000
```

## The design

**Pink is the field, not the trim.** The badge pink is used as a large
surface with black type on it, rather than as an accent on a dark page.
Black on `#FE6C7F` measures 7.7:1, so this is also the more legible
arrangement — white on pink only manages 2.7:1 and is never used.

| Token | Value | Where |
|---|---|---|
| `--pink` | `#FE6C7F` | Hero, page headers. Black type only |
| `--pink-wash` | `#FFE9ED` | Alternating section bands |
| `--pink-deep` | `#C9304A` | Links on white (5.2:1) |
| `--black` | `#000000` | Type, masthead, footer, rules |
| `--grey` | `#5A5A64` | Secondary text (6.8:1) |

**Type is Archivo**, one family across its width axis. Headings run wide
and heavy (`wdth 112, wght 800`) like a shirt number; body text sits at
normal width. Set via `font-variation-settings`, so if you add a heading
use an existing class rather than a bare `font-weight`.

**Deliberately absent:** border-radius (zero declarations), drop shadows,
gradients, all-caps eyebrow labels, and hover animations on cards. The one
piece of motion is the hero settling on load, and it is disabled under
`prefers-reduced-motion`.

## Updating after a match

**Home page hero** — `index.html`, the `.field` block. Change the opponent
in `.field__who`, the `.field__where` line, and the `<time datetime>`. The
countdown reads that datetime, so it is the only date to edit. There is a
comment in the file saying the same thing.

**Last result band** — the `.band` block just below. Three lines: label,
score, note.

**Fixtures page** — `fixtures.html`. Fixtures are a real `<table>`. To turn
a fixture into a result, swap the score cell:

```html
<!-- not played -->
<td class="fx-c-score"><span class="score score--tbc">v</span></td>

<!-- played -->
<td class="fx-c-score"><span class="score score--w" aria-label="Won 3 to 1">3–1</span></td>
```

`--w` win (pink fill), `--d` draw (white fill), `--l` loss (black fill).
Fill differs as well as colour, so the result is legible without colour
vision. Keep the `aria-label` accurate — it is what a screen reader reads.

Move `class="is-next"` to whichever row is the next game.

## Files

```
index.html  fixtures.html  news.html  club.html  contact.html
css/style.css      all styles and tokens
js/main.js         menu + countdown
images/            web-sized assets only
brand/             full-res badge masters, NOT served
.github/workflows/deploy.yml
```

`brand/` stays out of the served site — those files are ~500 KB each.
When adding match photos, resize to roughly display width and keep under
~200 KB. Meaningful images need `alt` text; decorative ones take `alt=""`.

## Still to confirm

Marked on the page with a bordered "to confirm" tag. Search for `class="tbc"`.

- Club email address
- Hackney Marshes pitch number
- Squad and committee names

Before publishing player names or photos, get their permission. No phone
numbers, home addresses or dates of birth. Under-18s need written parental
consent.

## There is no contact form

The old form posted nowhere, which is worse than not having one. The
contact page points at Instagram and TikTok instead. If you want a real
form later, Formspree or Netlify Forms will do it without a backend —
add a privacy note if you do.

## Accessibility

WCAG 2.2 AA. Checked: semantic landmarks and real table markup, heading
order, skip link, keyboard nav with a visible focus ring, contrast on
every colour pair, no horizontal overflow at 320px, full content without
JavaScript, and reduced-motion respected.

Re-check contrast if you change any colour token.

## Privacy

No analytics, cookies, trackers or embeds. Google Fonts is the only
third-party request.
