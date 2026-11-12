# Shiva ❤️ Rasika — Wedding Invitation Website

A premium, cinematic, single-page wedding invitation built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build step — open `index.html` and it runs.

## What's inside

```
Wedding/
├── index.html      → all page structure & sections
├── style.css        → full design system (tokens, layout, animation)
├── main.js           → all interactivity, driven entirely by config.js
├── config.js          → every piece of text/date/number — edit ONLY this file to update content
├── README.md
├── /images            → drop your real photos here (see below)
├── /music              → background music + temple bell sound
├── /icons               → favicon + PWA manifest
└── /fonts                 → reserved, currently loaded via Google Fonts CDN
```

## 1. Add your real photos

Nine images are referenced by filename in `config.js` under `heroSlides` and `story`:

```
couple1.JPG   couple2.JPG   couple3.JPG
0B5A1764.JPG  0B5A1769.JPG  0B5A2009.JPG
0B5A2011.JPG  0B5A2019.JPG  0B5A2062.JPG
```

No photo files were uploaded with this request, so the site currently renders elegant **gradient/monogram placeholders** in the hero slider, story timeline, and gallery, so the layout, motion, and lightbox all work out of the box.

To go live with real photos:

1. Copy your actual JPGs into `/images/` using the exact filenames above (or update the paths in `config.js`).
2. In `main.js`, inside `buildHeroSlider()`, `buildStory()` (via `config.js` `story[].image`), and `buildGallery()`, replace the placeholder `<div class="ph">` markup with `<img src="...">` or set `style.backgroundImage` — each spot has a one-line comment marking exactly where to swap it in.
3. In `renderLightbox()` in `main.js`, swap the placeholder SVG `src` for `galleryImages[lightboxIndex]`.

## 2. Add music

Place:
- `music/wedding.mp3` — looping background track, starts after the envelope opens
- `music/temple-bell.mp3` — short bell sound played on splash and envelope-open

Both are optional — if missing, the player UI still works, just silently (browsers block autoplay with sound until user interaction in some cases, which is expected and handled gracefully).

## 3. Edit any content

Everything — names, dates, venue, events, family names, RSVP number, Instagram handle, quotes — lives in **`config.js`**. Nothing is hardcoded in `index.html` or `main.js`. Open `config.js`, change values, save, refresh.

## 4. RSVP & sharing

- RSVP form and the floating share button both open **WhatsApp** pre-filled with a message, using the number in `config.js → rsvp.whatsappNumber`.
- "Download Invitation" in the share menu opens the browser print dialog (choose "Save as PDF") since generating a styled PDF client-side needs no extra library this way.

## 5. Deploying

This is fully static. Drag the `Wedding` folder into Netlify/Vercel, or upload via FTP to any host — no server or build step required. All third-party libraries (GSAP, AOS, Swiper, Particles.js, FontAwesome, Google Fonts) load from CDN, so an internet connection is needed for those; everything else works offline.

## 6. Browser support

Modern evergreen browsers (Chrome, Safari, Edge, Firefox). Reduced-motion preference is respected — heavy animation is disabled automatically for users who request it at the OS level.
