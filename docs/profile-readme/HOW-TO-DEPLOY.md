# Deploying your GitHub profile README

Your GitHub profile README lives in a **special repository whose name exactly matches your username**. GitHub then renders its `README.md` at the top of [github.com/ankitavthatte](https://github.com/ankitavthatte).

## Steps

1. Create a **new public repository** named exactly **`ankitavthatte`** (same as your username). GitHub will show a hint: _"You found a secret! ankitavthatte/ankitavthatte is a ✨special✨ repository."_
2. Add a `README.md` to it — copy the contents of [`README.md`](./README.md) in this folder.
3. Commit. Your profile updates immediately.

> If the repo already exists, just replace its `README.md` with the new one.

## Design rationale (why it's built this way)

Applied straight from [`../github-profiles-analysis.md`](../github-profiles-analysis.md):

- **Landing page, not résumé.** A stranger can state your specialty in ~5 seconds: _Senior Product Designer who makes complex systems obvious._ No wall of every tool you've touched.
- **Creative-Coder / Builder archetype.** Work-first, cohesive terracotta palette matching your studio brand — craft is the competency being judged, so the profile itself is a sample of it.
- **One value proposition, then current focus, then work.** The "Currently" block keeps it alive; the work table gives each project a one-line _what_ + _your role_.
- **No stats cards.** Your story isn't code-commit volume, so a `github-readme-stats` widget would undercut, not help. The CTA routes to the richer artifact — your portfolio.
- **Badges carry information only.** Tools you'd want to be hired for (Figma, Design Systems, UX Research, Accessibility, AI-first). No "Made with ♥" vanity badges.
- **Accessibility named explicitly** — a senior-judgment signal most designers don't show on GitHub.

## Things to personalise before publishing

- **Portfolio URL** — points to `https://ankitathatte.com`, your custom domain (already set as the website on your GitHub account). Swap if you'd rather link the interactive studio directly.
- **Pin the matching repos** on your profile (Settings → Customize your pins) so the "Selected work" table and your pinned repos tell the same story.
- **Optional:** add a real profile avatar and a one-line bio in GitHub's profile settings — they sit right beside the README.
