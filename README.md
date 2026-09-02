# Lea River FC — Official Website

Static website for Lea River FC, a Sunday league club playing in the
Hackney & Leyton Sunday Football League, Division 3.

Plain HTML, CSS and ~70 lines of JavaScript. No build step, no framework,
no dependencies. Deploys to GitHub Pages on every push to `main`.

## Club details baked into the site

| | |
|---|---|
| League | Hackney & Leyton Sunday Football League, Division 3 |
| Founded | 2026 |
| Home venue | Hackney Marshes, London E9 |
| Kick-off | Sundays, 10:30 |
| Instagram | https://www.instagram.com/leariverfc/ |
| TikTok | https://www.tiktok.com/@leariverfc2026 |

## Running it locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and pick
   **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` publishes
   the site.

Your URL will be `https://<your-username>.github.io/<repo-name>/`.

**The repository must be public** on a free GitHub account — Pages only
builds from private repositories on Pro or higher. This is a public-facing
club site, so there is nothing here that needs hiding.

### After the first deploy

Two files have a placeholder URL that should be replaced with the real one:

- `sitemap.xml` — replace `REPLACE-WITH-YOUR-PAGES-URL` (5 occurrences)
- `robots.txt` — uncomment the `Sitemap:` line and fill in the URL

Optionally add `<link rel="canonical">` and an absolute `og:image` URL to
each page's `<head>` once the domain is settled.

## Editing content

Everything is hand-editable HTML in the root folder.

| File | Page |
|---|---|
| `index.html` | Home — next match, news, upcoming fixtures |
| `fixtures.html` | Full fixture list and results |
| `news.html` | News listing |
| `club.html` | About the club |
| `contact.html` | Contact and directions |

### Updating the next match (home page)

In `index.html`, edit the `.hero` block: the two team names, the crest, and
the `<time datetime="...">` value. The countdown reads its target straight
from that `datetime` attribute, so there is only one date to change.

### Adding a result

In `fixtures.html`, change a fixture's `<li>` from the upcoming form to a
result by swapping the middle span:

```html
<!-- upcoming -->
<span class="fixture-item__score fixture-item__score--upcoming" aria-hidden="true">v</span>

<!-- played -->
<span class="fixture-item__score" aria-label="2 – 1">2 – 1</span>
```

Then add a result class to the `<li>`: `fixture-item--win`,
`fixture-item--draw`, or `fixture-item--loss`. These colour the score
green, gold, or black. Keep the `aria-label` in sync with the score so
screen readers announce it correctly.

Delete the "No results yet" `.empty-state` block once real results exist.

### Adding a news article

Copy an existing `<article class="news-card">` block in `news.html` and
change the date, heading, and text. To feature it on the home page, copy it
into the `.news-grid` in `index.html` too.

## Images

`images/` holds only web-sized assets. `brand/` holds the full-resolution
badge masters and is **not served** — keep it that way so phones do not
download a 500 KB PNG.

Before adding match photos, resize them to roughly the width they display
at (around 800px for a news card) and keep each under ~200 KB.

Every meaningful image needs descriptive `alt` text. Decorative images take
`alt=""`.

## Design tokens

Colours, type, and spacing are CSS custom properties at the top of
`css/style.css`. Change them there rather than hunting through rules.

The palette comes from the badge:

| Token | Value | Use |
|---|---|---|
| `--rosa` | `#FE6C7F` | Badge pink. Accents on dark backgrounds, surfaces. **Never** white text on it (2.7:1) |
| `--rosa-deep` | `#C9304A` | Links and buttons on light backgrounds (5.1:1, passes AA) |
| `--nero` | `#14141E` | Headers, footers, hero |
| `--oro` | `#B8934A` | "TBC" placeholder badges |

Fonts are Barlow Condensed (headings) and Source Sans 3 (body), from
Google Fonts.

## Still to confirm

Search the HTML for `placeholder-label` to find these. They render as gold
TBC badges so they are obvious on the page.

- Club email address (6 places)
- Hackney Marshes pitch number (3 places)
- Squad and committee names (1 place)

Before publishing any player names or photographs, get their permission.
Do not publish phone numbers, home addresses, or dates of birth. If any
player is under 18, get written parental consent first.

## Accessibility

Built to WCAG 2.2 AA. Verified: semantic landmarks, logical heading order,
skip link, keyboard-operable nav with a 3px visible focus ring, contrast
ratios checked against the palette, `prefers-reduced-motion` respected, no
horizontal overflow at 320px, and full content available with JavaScript
disabled.

Please re-check contrast if you change `--rosa` or `--rosa-deep`.

## Privacy

No analytics, no cookies, no trackers, no third-party embeds, and no
contact form posting to an external service. The only third-party request
is Google Fonts. If you want analytics later, pick something
cookie-free and add a privacy notice.
