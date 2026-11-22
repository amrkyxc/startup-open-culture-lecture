# Satbayev Finance Club — Open Lecture Landing

Static GitHub Pages landing page for the open lecture **«Стартап-культура среди
молодёжи»**, 24 November 2026, Satbayev University.

Design direction: oversized editorial typography, floating "inflatable" 3D
objects, cream + deep purple + gold. Motion throughout (scroll reveals, pointer
tilt, parallax, floating objects, countdown ticks).

## Files

```
index.html    markup
styles.css    design system + animations
script.js     countdown, calendar link, registration link, motion
assets/       logo (4 PNG variants), 3D art, favicon
```

Open `index.html` directly or serve the folder with any static server
(`python -m http.server`).

## Sections

1. Hero — date / time / venue, two calls to action, floating 3D ring
2. Scrolling ticker
3. Live countdown to 24 November 2026, 18:30 (Asia/Almaty, UTC+5)
4. About the lecture + article link
5. Programme — three topics
6. Venue — Satbayev University, map link
7. Registration — Google Form
8. Google Calendar — prefilled event link
9. Footer — navigation and social links (Instagram, LinkedIn, Telegram)

## Registration

The Google Form link lives in **one place**:

```js
// script.js
const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScL1pAco0ZeOuVj1EyYTgW5xnfCZUb_mMDqFp2DAVoLZS4p1Q/viewform";
```

Every «Зарегистрироваться» / «Открыть Google Форму» button picks it up and opens
in a new tab. If the constant ever contains `REPLACE_ME`, the buttons show a
hint instead of opening a broken page.

### Form checklist
- Fields: имя и фамилия, email, телефон, университет, курс/статус, откуда узнали.
- Responses → «Связать с таблицей» (Google Sheets) for an automatic list.
- Enable «Собирать адреса электронной почты» if you want verified emails.

## Social links

In the footer (`index.html`):

- Instagram — https://www.instagram.com/satbayev.finance.club
- LinkedIn — https://www.linkedin.com/company/122553996/
- Telegram — https://t.me/+34JW7Z6GcUg3YTI6

## Logo

The real club logo was converted from `assets/SAVE_20260408_011937.jpg`
(white artwork on black) into transparent PNGs:

| File | Use |
| --- | --- |
| `assets/logo-mark-dark.png` | header mark on cream |
| `assets/logo-mark-white.png` | light-background alternative |
| `assets/logo-dark.png` | full lockup for light surfaces |
| `assets/logo-white.png` | full lockup in the footer |

To swap the logo, replace these files keeping the same names and roughly the
same proportions. The original JPG is kept in `assets/` as the source.

## 3D artwork

The floating objects in the hero are custom ray-marched renders (signed distance
fields + one shared lighting setup), saved as transparent WebP cutouts so all
objects look like one family of glossy "inflatable" models:

- `assets/3d-torus.webp` — purple torus that hovers at the top right
- `assets/3d-sphere-gold.webp` — gold sphere, left edge
- `assets/3d-sphere-green.webp` — sage sphere, bottom right
- `assets/3d-capsule-purple.webp` — lilac capsule, bottom centre

Background art comes from Pexels (free to use under the
[Pexels license](https://www.pexels.com/license/)):

- `3d-curves.jpg` — Pexels photo **33797645**, About section art
- `3d-venue.jpg` — Pexels photo **33797642**, Venue background

Images are served locally (not hotlinked), so the page works offline and on
GitHub Pages without external requests.

## Motion

- Hero headline rise-in, staggered by line
- Rendered 3D objects: gentle float, sway, and mouse parallax on the hero
- Scroll progress bar and shrinking sticky header
- Scroll reveals (`IntersectionObserver`) with staggered programme cards
- Pointer tilt on programme cards
- Countdown digit tick, animated gradient on countdown / registration cards
- Ticker, pulsing dots and rings, Ken Burns on the venue image, button shine
- `prefers-reduced-motion: reduce` turns all of it off and shows content immediately

## Event details

- Date: Tuesday, 24 November 2026
- Time: 18:30–20:00, Almaty time (UTC+5)
- Venue: Satbayev University, 22 Satpaev Street, Almaty, Kazakhstan
- Auditorium: TBA
- Admission: free, seats limited

## Publish

GitHub → repository → **Add file → Upload files**, drag the contents of this
folder (`index.html`, `script.js`, `styles.css`, `assets/`) and commit.
Then Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

## Notes

- The Google Calendar button opens a prefilled event; the visitor saves it and
  chooses the notification in the form. Behaviour depends on Google Calendar
  and device settings.
- No build step, no dependencies, no tracking scripts.
