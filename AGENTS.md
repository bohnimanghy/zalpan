<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Zalpan

Standalone marketing site for **Zalpan** — a restaurant operating system
(POS & billing, kitchen display, inventory, QR ordering, CRM, vendor
management, analytics, AI forecasting). A Bohniman product, but its **own site,
own repo, own domain** — split out of the bohniman.ai monorepo.

- Repo: `github.com/bohnimanghy/zalpan`
- Sibling of `bohniman.ai` under `d:/Projects/bohniman-website/`
- Stack: Next.js 16.2.10 (App Router, Turbopack) + Tailwind CSS v4, TypeScript

## Design source

The reference design lives in the bohniman.ai repo:
`bohniman.ai/design/claude-design/Design_Update/Zalpan.dc.html` (the `.dc.html`
is the clean, no-JS version). The interactive bits (comparison table, FAQ, AI
cards, tour panels) were **JS-injected in the design and not in the package** —
their content was authored to match, not copied.

## Structure

- `src/app/layout.tsx` — Bricolage Grotesque (display) + IBM Plex Sans/Mono
  fonts; site metadata. No shared chrome — the page carries its own.
- `src/app/globals.css` — Zalpan palette as `:root` CSS vars (`--or`, `--or2`,
  `--charcoal`, `--cream`, `--paper`, `--zline`, `--green`, `--zmuted`,
  `--zink`), the `z*` keyframes, and the `[data-reveal]` scroll-reveal styles.
- `src/app/page.tsx` — the whole page: own sticky header + charcoal footer, then
  hero → problem → platform → workflow → tour → AI → outcomes → use cases →
  devices → comparison → social proof → pricing → FAQ → final CTA. FAQ uses
  native `<details>` (no JS). Contains `QrMock` (real scannable QR via `qrcode`).
- `src/components/ZalpanTour.tsx` — the only client island (tab state).
- `src/components/Reveal.tsx` — IntersectionObserver scroll-reveal.

Display headings use `style={{ fontFamily: DISPLAY }}` (Bricolage). Colors are
mostly inline styles referencing the `:root` vars.

## Known follow-ups (from the split)

- **Outcomes section shows `[X]` / `[X]%` placeholders** — the design left them
  blank. Fill with real numbers.
- **QR** encodes `https://zalpan.com`; **footer/back-links** point to
  `https://bohniman.com`. Update when real domains are confirmed.
- bohniman.ai links to this site via `productHref` (its Zalpan product has
  `externalUrl: "https://zalpan.com"`). Keep that URL in sync.

## Develop

```bash
npm install
npm run dev            # :3000 — use -p 3001 if bohniman.ai's dev server is up
npm run build          # verify prod build before pushing
```

## Deploy & push

Same credential system as bohniman.ai: `GITHUB_TOKEN` in `.env.local`
(gitignored). `origin` is the clean HTTPS URL and the account lacks direct
push, so push with the token inline:

```bash
TOKEN=$(grep '^GITHUB_TOKEN=' .env.local | cut -d= -f2- | tr -d '\r"')
git push "https://x-access-token:${TOKEN}@github.com/bohnimanghy/zalpan.git" main
```

Do NOT `git push -u <tokenized-url>` — it writes the token into `.git/config`.
If hosted on Vercel like bohniman.ai, note Vercel occasionally drops the GitHub
webhook; an empty commit (`git commit --allow-empty`) re-triggers the deploy.
