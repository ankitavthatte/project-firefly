// Every word on the site lives here so copy edits never touch components.

export const identity = {
  name: 'Ankita Thatte',
  role: 'Product Designer',
  location: 'Pune, India',
  experience:
    '10+ years across architecture and digital product design — currently the sole designer behind a live enterprise AI SaaS platform.',
  positioning: 'I turn confusing products into clear, thoughtful, and delightful experiences.',
  heroLine: 'I turn complex products into clear, delightful experiences.',
  heroSub:
    'Most recently: sole designer across 300+ screens of an enterprise AI platform. This studio is my portfolio — everything on the desk opens, so feel free to look around.',
  about:
    'I’m Ankita, an architect turned UI/UX Product Designer who loves turning confusing products into clear, thoughtful, and delightful experiences. I design digital products because they can create faster impact, larger impact, and better everyday experiences for people.',
  aboutExtra:
    'I’m curious by nature, always asking why, and I can’t leave a bad experience unredesigned.',
  personality:
    'Outside work, I’m a traveler, gamer, creator, book lover, painting and sketching enthusiast, and cat mom to 11 adopted rescue cats.',
  tags: ['Traveler', 'Gamer', 'Creator', 'Book Lover', 'Painter', 'Sketcher', 'Cat Mom'],
  tools: [
    'Figma',
    'Design Systems',
    'UX Research',
    'Prototyping',
    'Claude Code',
    'ChatGPT',
    'GitHub',
    'AI-first workflows',
  ],
  email: 'ankitavthatte@gmail.com',
  // The resume PDF lives in public/ — renderers prefix it with BASE_URL.
  resumeFile: 'Ankita_Thatte_CV.pdf',
  // Primary links stay professional: LinkedIn, Behance, resume. The doodle
  // account lives where it has context — inside Paint & Pixels.
  links: [
    { label: 'Email', href: 'mailto:ankitavthatte@gmail.com', note: 'ankitavthatte@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ankita-thatte', note: 'linkedin.com/in/ankita-thatte', external: true },
    { label: 'Behance', href: 'https://www.behance.net/ankitathatte', note: 'behance.net/ankitathatte', external: true },
    { label: 'Resume', file: 'Ankita_Thatte_CV.pdf', note: 'PDF · view, download or share the link' },
  ],
}

export const projects = [
  {
    id: 'evalix',
    name: 'Evalix AI',
    flagship: true,
    tagline: 'Enterprise AI assessment platform, redesigned from scratch.',
    metaphor: 'A futuristic education lab where every screen earns its place.',
    color: 'lavender',
    summary:
      'Redesigned Evalix AI as the sole designer, working across research, interviews, information architecture, admin and candidate portals, reports, analytics, and 300+ screens.',
    stats: [
      { value: 'Sole', label: 'Designer, end to end' },
      { value: '300+', label: 'Screens designed' },
      { value: '8', label: 'Report types' },
      { value: '2', label: 'Portals — Admin & Candidate' },
    ],
    chips: [
      'UX research & interviews',
      'Information architecture',
      'Assessment platform',
      'Dashboards & analytics',
      'Question banks',
      'Users & submissions',
      'Dark mode',
      'Responsive design',
      'AI × EdTech',
    ],
    story: [
      {
        title: 'The mess',
        body: 'An enterprise assessment platform that had grown feature by feature, with no design ownership. Admins got lost, candidates got anxious, and reports buried the answers people actually needed.',
      },
      {
        title: 'The why',
        body: 'Before drawing a single screen, I interviewed admins, recruiters and candidates. The real problem wasn’t missing features — it was missing hierarchy. Everyone could do everything, so nobody could do anything quickly.',
      },
      {
        title: 'The rebuild',
        body: 'I restructured the entire information architecture, then designed both portals from scratch: assessment authoring, question banks, live monitoring, submissions, user management, settings — and a reporting suite of 8 report types that leads with insight, not data.',
      },
      {
        title: 'The result',
        body: 'A coherent, enterprise-grade design system across 300+ screens with full dark mode and responsive layouts. I represented Evalix AI at the Delhi ET Education Summit — presenting the product I had redesigned end to end.',
      },
    ],
    highlight: 'Represented Evalix AI at the Delhi ET Education Summit.',
  },
  {
    id: 'moneyminds',
    name: 'MoneyMinds',
    tagline: 'Gamified financial literacy that people actually finish.',
    metaphor: 'A playful coin-city where every lesson feels like a level.',
    color: 'sun',
    summary:
      'A gamified financial literacy experience designed to make money concepts approachable, engaging, and rewarding.',
    stats: [
      { value: 'End-to-end', label: 'research to visual design' },
      { value: 'XP & streaks', label: 'reward system design' },
      { value: 'Mascot', label: 'character & brand design' },
      { value: '7 boards', label: 'documented case study' },
    ],
    chips: ['Gamification', 'Learning modules', 'Reward loops', 'Mascot design', 'Education UX'],
    story: [
      {
        title: 'The mess',
        body: 'Financial literacy content is everywhere — and abandoned everywhere. Dense jargon and guilt-driven advice make people close the tab.',
      },
      {
        title: 'The why',
        body: 'People don’t fail to learn about money because it’s hard. They fail because it’s boring and intimidating. The design goal became: make progress feel visible and wins feel earned.',
      },
      {
        title: 'The rebuild',
        body: 'Courses became journeys with a mascot guide, XP, streaks and unlockable rewards. Each module is small enough to finish in a coffee break, and celebrations are tuned to support learning — not distract from it.',
      },
    ],
    media: [
      { type: 'image', src: 'projects/moneyminds/intro.jpg' },
      { type: 'video', src: 'projects/moneyminds/demo.mp4', caption: 'App walkthrough' },
      {
        type: 'board',
        label: 'Research to screens — the full board',
        srcs: Array.from({ length: 7 }, (_, i) => `projects/moneyminds/board-${i + 1}.jpg`),
      },
    ],
  },
  {
    id: 'shiftcare',
    name: 'ShiftCare',
    tagline: 'Healthcare scheduling without the whiteboard chaos.',
    metaphor: 'A tiny hospital planning board where every shift clicks into place.',
    color: 'mint',
    summary:
      'A healthcare scheduling product focused on simplifying staff planning, shift visibility, and operational workflows.',
    stats: [
      { value: 'End-to-end', label: 'UX case study' },
      { value: 'Shift board', label: 'coverage readable at a glance' },
      { value: 'Conflict alerts', label: 'gaps flagged before they happen' },
      { value: '35 pages', label: 'of process — full PDF below' },
    ],
    chips: ['Healthcare workflows', 'Shift planning', 'Operational UX', 'Scheduling systems', 'Clarity under pressure'],
    story: [
      {
        title: 'The mess',
        body: 'Hospital coordinators juggling staff availability, ward coverage and last-minute swaps — often across spreadsheets, phone calls and sticky notes.',
      },
      {
        title: 'The why',
        body: 'In healthcare, a scheduling mistake isn’t an inconvenience — it’s an uncovered ward. The interface had to make gaps impossible to miss and changes impossible to lose.',
      },
      {
        title: 'The rebuild',
        body: 'A shift board designed for scanning: coverage states you can read from across the room, conflict warnings before they become problems, and workflows that respect how chaotic a hospital day actually is.',
      },
    ],
    media: [
      {
        type: 'board',
        label: 'The case study — the essentials',
        // Curated cut: problem → research → ideation → IA/flows → testing →
        // before/after → final screens → accessibility → reflection.
        // All 35 pages remain in the PDF below.
        srcs: [3, 8, 10, 14, 17, 19, 20, 22, 25, 28, 30, 31, 33].map(
          (n) => `projects/shiftcare/slide-${String(n).padStart(2, '0')}.jpg`,
        ),
        deck: true,
      },
    ],
    pdfHref: 'projects/shiftcare/shiftcare-case-study.pdf',
  },
]

// Media shapes: { type: 'board', srcs: [slices] } renders a seamless tall case-study
// board (deck: true adds gaps between separate slides); { type: 'image' | 'video', src }.
export const experiments = [
  {
    id: 'irctc',
    name: 'IRCTC Connect',
    note: 'Reimagining India’s busiest booking flow with calm defaults.',
    intro:
      'India’s train booking app, redesigned end to end — starting with a heuristic evaluation of the existing experience, then rebuilding the flows for the millions who book in a hurry.',
    media: [
      { type: 'board', label: 'The redesign', srcs: Array.from({ length: 6 }, (_, i) => `projects/irctc/redesign-${i + 1}.jpg`) },
      { type: 'board', label: 'The heuristic evaluation', srcs: Array.from({ length: 3 }, (_, i) => `projects/irctc/heuristic-${i + 1}.jpg`) },
    ],
  },
  {
    id: 'chownow',
    name: 'ChowNow',
    note: 'Food ordering flows, reduced to their happiest path.',
    intro:
      'A food delivery app crafted around one promise: order from different restaurants in one seamless flow. Branding, user flows, onboarding, and UI — the whole meal.',
    media: [
      { type: 'video', src: 'projects/chownow/demo.mp4', caption: 'App walkthrough' },
      { type: 'board', label: 'The case study', srcs: Array.from({ length: 6 }, (_, i) => `projects/chownow/board-${i + 1}.jpg`) },
    ],
  },
  {
    id: 'nook',
    name: 'The Nook',
    note: 'Café & co-working brand identity, drawn with love.',
    intro:
      'A full brand identity for a café and co-working space — logo, illustration style, signage, packaging and merch, all drawn by hand first.',
    media: [
      {
        type: 'board',
        label: 'Brand identity',
        srcs: [
          'projects/nook/nook-01.jpg',
          'projects/nook/nook-02.jpg',
          'projects/nook/nook-03.jpg',
          'projects/nook/nook-04.jpg',
          'projects/nook/nook-05.jpg',
          'projects/nook/nook-06.gif',
          'projects/nook/nook-07.jpg',
          'projects/nook/nook-08.jpg',
          'projects/nook/nook-09.jpg',
          'projects/nook/nook-10.jpg',
          'projects/nook/nook-11.jpg',
        ],
        deck: true,
      },
    ],
  },
  {
    id: 'logofolio',
    name: 'Logofolio',
    note: 'Eight brands, eight personalities — a logo collection.',
    intro:
      'Selected logo and identity work: cosmetics, cycling, legal, wellness, audio, tech, coffee and craft. Every mark starts with the brand’s one true sentence.',
    media: [
      { type: 'board', label: 'The collection', srcs: Array.from({ length: 5 }, (_, i) => `projects/logofolio/board-${i + 1}.jpg`) },
    ],
  },
  { name: 'Vfort', note: 'Security product exploration — trust as a visual language.' },
  { name: 'Niyantrac', note: 'Control-and-monitoring dashboard concepts.' },
  { name: 'Luma', note: 'Light, ambient interface experiments.' },
]

// The architecture years. Items use the same media shapes as experiments —
// add a media array to an item and it becomes a clickable gallery.
export const archive = {
  intro:
    'Before pixels, there were buildings. This folder is being unpacked — the drawings are real, the scanner is slow.',
  items: [
    {
      id: 'sketches',
      name: 'Live Sketches',
      note: 'Drawn on location — streets, facades, and people who wouldn’t sit still.',
    },
    {
      id: 'auroville',
      name: 'Time at Auroville',
      note: 'Living and learning in the experimental township — architecture at human scale.',
    },
    {
      id: 'architecture',
      name: 'Architecture Work',
      note: 'The studio years — plans, models and buildings that taught me systems thinking.',
    },
  ],
}

// Card-back photos live in public/awards/<id>.jpg — cards render fine without them.
export const awards = [
  {
    id: 'totq',
    title: 'Team of the Quarter',
    detail: 'Q2 2026 · Cloud.in',
    color: 'coral',
    note: 'Great products are rarely built alone. Proud to have won this with my team.',
    photo: 'awards/totq.jpg',
  },
  {
    id: 'eotq',
    title: 'Employee of the Quarter',
    detail: 'Q1 2026 · Cloud.in',
    color: 'sun',
    note: 'For taking ownership of design end to end — and never leaving a “why” unanswered.',
    photo: 'awards/eotq.jpg',
  },
  {
    id: 'fnp',
    title: 'FNP Global Designathon 2025',
    detail: '3rd Place, international',
    color: 'lavender',
    note: 'Designing under pressure is a sport. This podium finish was a global one.',
    photo: 'awards/fnp.jpg',
  },
  {
    id: 'summit',
    title: 'Delhi ET Education Summit',
    detail: 'Represented Evalix AI',
    color: 'mint',
    note: 'Presented the product I redesigned end to end, in front of the education industry.',
    photo: 'awards/summit.jpg',
  },
]

export const processSteps = [
  {
    title: 'Research',
    body: 'Interviews, shadowing, support tickets, analytics. I collect the questions before I collect the answers.',
    scribble: 'Who is this really for?',
  },
  {
    title: 'User Flows',
    body: 'Map the journey before the screens. If the flow is confused, no visual polish will save it.',
    scribble: 'Shortest path to “done”.',
  },
  {
    title: 'Wireframes',
    body: 'Low fidelity, high honesty. Structure gets argued about here, cheaply, before pixels get precious.',
    scribble: 'Boxes first, beauty later.',
  },
  {
    title: 'Visual Design',
    body: 'Systems, not screens. Tokens, components and hierarchy that scale from screen 1 to screen 300.',
    scribble: 'Make it feel alive.',
  },
  {
    title: 'Testing',
    body: 'Watch real people use it. Every awkward pause is a design note I didn’t have to guess.',
    scribble: 'The user is always right about the problem.',
  },
  {
    title: 'Iteration',
    body: 'Ship, learn, refine. A design is never finished — it’s just currently its best version.',
    scribble: 'v2 is where the magic is.',
  },
]

export const principles = [
  { text: 'Ask why.', color: 'coral' },
  { text: 'Make complexity feel simple.', color: 'sun' },
  { text: 'Motion should have meaning.', color: 'mint' },
  { text: 'Delight should support usability.', color: 'sky' },
  { text: 'Design is what people remember feeling.', color: 'lavender' },
]

// detail = employer · dates, straight from the CV, so reviewers can place
// each chapter in time without leaving the page.
export const chapters = [
  {
    title: 'Architecture',
    detail: 'Venkatramanan Associates & other firms · 2017–2024',
    color: 'wood',
    body: 'Trained as an architect (BArch, 2015). Learned that every structure is really a set of human decisions — circulation, light, hierarchy. Buildings taught me systems thinking before I knew the term.',
  },
  {
    title: 'The Turn to UX',
    detail: 'Tamarind Design Studio, Pune · 2024–2025',
    color: 'coral',
    body: 'Realized a building changes one street; a digital product can change millions of days. Led research and usability testing across EdTech and SaaS products — the craft transferred, the impact multiplied.',
  },
  {
    title: 'Product Design',
    detail: 'Hostin Services (Cloud.in), Pune · 2025–present',
    color: 'sky',
    body: 'From screens to systems. Sole designer on Evalix AI, a live enterprise assessment platform — owning research, flows, IA, visual language, a full design system and hand-off.',
  },
  {
    title: 'AI-first Workflows',
    color: 'lavender',
    body: 'Designing with AI tools daily — Figma, Claude Code, ChatGPT — to prototype faster, explore wider and reserve human time for the judgment calls machines can’t make.',
  },
  {
    title: 'What’s Next',
    color: 'mint',
    body: 'Products that feel alive. Teams that sweat the details. Experiences people describe with a smile. That’s the work I want to keep doing — ideally with yours.',
  },
]

export const travel = {
  intro:
    'Travel is my field research. New cities are unfamiliar interfaces — signage, queues, ticket machines, street food ordering rituals. I collect the patterns that work and the frustrations that don’t.',
  stamps: [
    { place: 'Mountains', note: 'Where the best product ideas arrive uninvited.' },
    { place: 'Old cities', note: 'Wayfinding lessons older than any design system.' },
    { place: 'Local markets', note: 'Masterclasses in information density done right.' },
    { place: 'Long trains', note: 'Sketchbook time. No wifi, best thinking.' },
  ],
}

export const playMode = {
  line: 'Games taught me that good interaction is feedback, timing, reward, and curiosity.',
  lessons: [
    { title: 'Feedback', body: 'Every action deserves a response. Games never leave you wondering if the button worked.' },
    { title: 'Timing', body: 'The same animation feels great at 200ms and broken at 800ms. Rhythm is a design material.' },
    { title: 'Reward', body: 'Progress you can feel. Games celebrate small wins — products should too.' },
    { title: 'Curiosity', body: 'The best tutorials are the ones you don’t notice. Let people discover, don’t lecture them.' },
  ],
}

export const palette = {
  intro: 'Before pixels, there was paint. Making things with my hands keeps my eye honest.',
  loves: [
    { title: 'Painting', body: 'Color mixing taught me more about UI palettes than any hex-code generator.' },
    { title: 'Sketching', body: 'Fastest prototyping tool ever invented. Battery life: excellent.' },
    { title: 'Visual storytelling', body: 'Every case study is a story. Every dashboard is one too — most just forget the plot.' },
    { title: 'Content creation', body: 'Making things and putting them into the world, on repeat.' },
  ],
}

export const drawer = {
  intro: 'Every studio has one drawer of almost-finished things. You found mine.',
  items: [
    { emoji: '📄', title: 'Résumé', note: 'This drawer copy has coffee on it — take the clean PDF instead.', cta: true },
    { emoji: '✏️', title: 'Three dried-out pens', note: 'Kept for sentimental reasons. They sketched the first Evalix flows.' },
    { emoji: '🧵', title: 'One very important sketch', note: 'Folded four times. Every good product starts as a bad drawing.' },
    { emoji: '🍬', title: 'Emergency toffees', note: 'For user interviews that run long.' },
  ],
}

// The desk calendar — refresh the items every month; the month itself is
// derived from the real date in NowModal, so it can never go stale.
export const nowBoard = {
  items: [
    { label: 'Designing', text: 'Enterprise reporting & analytics patterns — the Evalix AI universe keeps growing.', color: 'coral' },
    { label: 'Learning', text: 'AI-first workflows — pushing Claude Code and Figma a little further every week.', color: 'lavender' },
    { label: 'Creating', text: 'Daily doodles and design content at @punedoodlerr', color: 'sun', href: 'https://www.instagram.com/punedoodlerr' },
    { label: 'Reading', text: 'Between books right now — send a recommendation via the paper plane.', color: 'mint' },
  ],
}

export const contact = {
  headline: 'Want to build something thoughtful, usable, and a little unforgettable?',
  cta: 'Let’s talk',
  goodbye: 'Thanks for exploring my little corner of the internet.',
}

export const whyNotes = {
  studio: 'This studio is the navigation. Curiosity makes people explore further than menus ever do.',
  laptop: 'Work opens from the laptop because work is the center of a designer’s studio — placement is hierarchy.',
  notebook: 'The process lives in a notebook because real process is messy, personal and hand-drawn first.',
  trophy: 'Awards sit on a shelf, slightly aside — visible, but never louder than the work.',
  mug: 'The about section hides in a coffee mug because people open up over coffee, not over headers.',
  cat: 'The cat adds life, not noise. Delight is rationed so it stays delightful.',
  controller: 'A controller, because interaction design and game feel are the same craft.',
  sticky: 'Sticky notes carry the philosophy — principles should be short enough to fit on one.',
  bookshelf: 'A bookshelf replaces the timeline. Careers read better as chapters than as dates.',
  passport: 'Travel earns a spot on the desk because observation is a designer’s raw material.',
  paletteObj: 'The paint palette is here because visual craft came before the pixels.',
  plane: 'Contact is a paper plane — reaching out should feel light, not like filling a form.',
  lamp: 'The lamp actually controls the light — motion with meaning. Also: the site is called Project Firefly. Try it.',
  drawer: 'Every studio has one drawer you’re not sure you should open. Curiosity gaps keep people exploring.',
  night: 'Night mode isn’t a theme toggle — it’s a reward. The fireflies are the site’s name, kept as a discovery.',
  calendar: 'The calendar shows this month, really. A portfolio that knows what month it is feels alive — freshness is credibility.',
  window: 'The window follows Pune’s real seasons — monsoon rain in July, winter haze in December. The studio lives in the same world you do.',
  afterHours: 'Arrive late and the studio is already asleep — the site meets you in your own timezone.',
  modal: 'Modals open with anticipation before reveal — a beat of tension makes content land.',
  recruiter: 'Recruiter Mode exists because respecting a reader’s time is also a design decision.',
  progress: 'Progress is shown gently — motivation without nagging.',
}

export const speedRun = [
  'Architect turned UI/UX Product Designer, based in Pune, India.',
  'Sole designer on Evalix AI — 300+ screens, 8 report types, admin + candidate portals, full research-to-handoff ownership.',
  'Designed MoneyMinds (gamified financial literacy) and ShiftCare (healthcare staff scheduling).',
  'Team of the Quarter Q2 2026 · Employee of the Quarter Q1 2026 · FNP Global Designathon 2025, 3rd Place.',
  'Represented Evalix AI at the Delhi ET Education Summit.',
  'Works AI-first: Figma, Claude Code, ChatGPT, GitHub, design systems, UX research, prototyping.',
  'Asks “why” before designing. Cannot leave a bad experience unredesigned.',
  'Cat mom to 11 adopted rescue cats. Products she designs feel alive — on purpose.',
]

export const catFacts = [
  'Cat 1 was the first rescue — the rest followed her home.',
  'Two of them supervise every Figma file from the desk.',
  'One only naps on printed wireframes. Low-fidelity sleeper.',
  'This one attends every user interview. Uninvited.',
  'Rescued during a monsoon. Now afraid of nothing.',
  'The quality-assurance cat. Walks across keyboards professionally.',
  'Prefers dark mode. Obviously.',
  'The shy one. Finding her means you explore thoroughly.',
  'Has strong opinions about coral vs. lavender.',
  'The elder statescat. Approves all final designs.',
  'Number eleven. You really did look everywhere.',
]
