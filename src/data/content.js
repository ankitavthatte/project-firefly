// Every word on the site lives here so copy edits never touch components.

export const identity = {
  name: 'Ankita Thatte',
  role: 'UI/UX Designer · Product Designer · Architect turned UX Designer',
  location: 'Pune, India',
  positioning: 'I turn confusing products into clear, thoughtful, and delightful experiences.',
  heroLine: 'Welcome. I was just here. Feel free to look around.',
  heroSub: 'I design digital products that turn messy experiences into clear, delightful journeys.',
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
  links: [
    { label: 'Email', href: 'mailto:ankitavthatte@gmail.com', note: 'ankitavthatte@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ankita-thatte', note: 'linkedin.com/in/ankita-thatte', external: true },
    { label: 'Behance', href: 'https://www.behance.net/ankitathatte', note: 'behance.net/ankitathatte', external: true },
    { label: 'Instagram', href: 'https://www.instagram.com/ankitathatte', note: '@ankitathatte', external: true },
    { label: 'Doodles & Content', href: 'https://www.instagram.com/punedoodlerr', note: '@punedoodlerr', external: true },
    { label: 'Resume', href: 'mailto:ankitavthatte@gmail.com?subject=Résumé%20request', note: 'One email away' },
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
      { value: 'Mascot', label: 'led learning journey' },
      { value: 'Modules', label: 'bite-sized courses' },
      { value: 'Rewards', label: 'streaks & collectibles' },
      { value: 'Fun', label: 'without losing rigor' },
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
      { value: 'Staff', label: 'scheduling for hospitals' },
      { value: 'Shifts', label: 'planned at a glance' },
      { value: 'Ops', label: 'clarity for coordinators' },
      { value: 'Calm', label: 'UX for stressful work' },
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
  },
]

export const experiments = [
  { name: 'IRCTC Redesign', note: 'Reimagining India’s busiest booking flow with calm defaults.' },
  { name: 'Vfort', note: 'Security product exploration — trust as a visual language.' },
  { name: 'Niyantrac', note: 'Control-and-monitoring dashboard concepts.' },
  { name: 'Luma', note: 'Light, ambient interface experiments.' },
  { name: 'ChowNow', note: 'Food ordering flows, reduced to their happiest path.' },
]

// Card-back photos live in public/awards/<id>.jpg — cards render fine without them.
export const awards = [
  {
    id: 'totq',
    title: 'Team of the Quarter',
    detail: 'Q2 2026',
    color: 'coral',
    note: 'Great products are rarely built alone. Proud to have won this with my team.',
    photo: 'awards/totq.jpg',
  },
  {
    id: 'eotq',
    title: 'Employee of the Quarter',
    detail: 'Q1 2026',
    color: 'sun',
    note: 'For taking ownership of design end to end — and never leaving a “why” unanswered.',
    photo: 'awards/eotq.jpg',
  },
  {
    id: 'fnp',
    title: 'FNP Global Designathon 2025',
    detail: '3rd Place',
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

export const chapters = [
  {
    title: 'Architecture',
    color: 'wood',
    body: 'Trained as an architect. Learned that every structure is really a set of human decisions — circulation, light, hierarchy. Buildings taught me systems thinking before I knew the term.',
  },
  {
    title: 'The Turn to UX',
    color: 'coral',
    body: 'Realized a building changes one street; a digital product can change millions of days. Traded concrete for components — the craft transferred, the impact multiplied.',
  },
  {
    title: 'Product Design',
    color: 'sky',
    body: 'From screens to systems. Owning research, flows, IA, visual language and hand-off — most recently across an entire enterprise platform as sole designer.',
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
    { emoji: '📄', title: 'Résumé', note: 'The real one is an email away — this drawer copy has coffee on it.', cta: true },
    { emoji: '✏️', title: 'Three dried-out pens', note: 'Kept for sentimental reasons. They sketched the first Evalix flows.' },
    { emoji: '🧵', title: 'One very important sketch', note: 'Folded four times. Every good product starts as a bad drawing.' },
    { emoji: '🍬', title: 'Emergency toffees', note: 'For user interviews that run long.' },
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
