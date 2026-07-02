# Project Firefly ✦

An interactive studio portfolio for **Ankita Thatte** — UI/UX Product Designer, architect turned designer, Pune, India.

This is not a website with a hero section. It's Ankita's creative studio: she just stepped away, and visitors discover her work, process, awards and personality by exploring the objects in the room.

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## The experience

| Object | Opens |
| --- | --- |
| 💻 Laptop (magnetic hover, boot animation) | Projects — Evalix AI (flagship), MoneyMinds, ShiftCare, Experiments |
| 📓 Notebook | Design process (a sticky note falls out: “Everything starts with a question.”) |
| 🏆 Trophy shelf | Awards as flippable collectible cards |
| ☕ Coffee mug | About Ankita (coffee-stain reveal) |
| 🛂 Passport | Travel as design field research |
| 🎮 Controller | Play Mode — what games taught her about interaction |
| 🎨 Paint palette | Painting, sketching, visual storytelling |
| 📚 Bookshelf | Career journey as chapters (no boring timeline) |
| 📝 Sticky notes | Peelable UX principles |
| ✈️ Paper plane | Contact + the goodbye moment |
| 🐈 The cat | One of 11 — find all hidden rescue cats to meet the whole squad |

## Features

- **Explore / Recruiter Mode** — immersive studio vs. fast skimmable one-pager
- **⚡ View in 2 minutes** — the whole portfolio, compressed
- **Why Mode** — annotations explaining the design decisions behind the site itself
- **Exploration progress** — “You’ve discovered X% of Ankita’s world” (persisted)
- **Hidden cat hunt** — 11 rescue cats tucked around the site, with a warm finale
- **Living studio** — drifting clouds, dust motes, swaying plant, lamp glow, ear twitches, occasional cat walks with paw prints
- **Fully responsive** — the studio restacks into tappable object cards on mobile
- **Accessible** — keyboard navigable, aria labels on every object, visible focus states, `prefers-reduced-motion` respected everywhere, no essential info hidden behind playful interactions

## Stack

React 18 · Vite · Tailwind CSS v4 · Framer Motion. No heavy assets — every illustration is hand-written SVG/CSS.

## Structure

```
src/
  data/content.js          ← every word of copy, in one place
  context/StudioContext.jsx← progress, modes, hidden-cat state (localStorage)
  components/
    studio/                ← the scene, object SVGs, mobile restack
    modals/                ← projects, process, awards, about, contact…
    shared/                ← modal shell, Why-Mode tags, hidden cats
    ControlDock.jsx        ← mode toggles, progress, cat toasts
    RecruiterView.jsx      ← the skimmable version
```
