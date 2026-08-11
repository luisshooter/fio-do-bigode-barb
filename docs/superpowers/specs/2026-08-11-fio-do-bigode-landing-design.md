# Design: Landing Page — Barbearia Fio do Bigode

## Overview

One-page animated marketing site for Barbearia Fio do Bigode, a real barbershop in Pato Branco-PR active since 2015 (10 years). Source of truth for brand voice and content is the shop's own Instagram (`@fiodobigodebarbearia`, 4008 followers, 251 posts) — this is not a from-scratch brand invention, it's a digital front door for an existing, recognized local business.

**Creative direction: "Selo Old School"** (Direction A of 3 proposed). The shop's own profile picture is already a circular anniversary badge reading "FIO DO BIGODE / 10 ANOS / 2015–2025 / OLDSCHOOL" with crossed lines and gold-on-black lettering, and one of their Instagram Highlights is literally named "Schorem" (a globally known traditional wet-shave barbershop in Rotterdam, tattoo-flash/rockabilly register). The design leans into that existing identity rather than inventing a new one: stamp/badge/seal visual language, black + brass-gold + aged cream, ornate Victorian-flourish display type (matching the shop's real wordmark logo), traditional-barbershop imagery (straight razor, rotary phone motif already used in their own Highlight covers).

This project sits in `C:\Projetos Pine\`, alongside another barbershop project (`sheikh-barbearia` — leather/steel/ember minimalist system, Big Shoulders + Oswald type, beveled-metal depth). This design is deliberately built on a different visual vocabulary end to end (stamp/print vs. metal/bevel, gold vs. ember, ornate serif vs. condensed sans, sharp corners vs. rounded-md) so the two sites don't read as reskins of each other.

## Content Source (from Instagram, verified live)

- **Name:** Barbearia Fio do Bigode
- **Owner:** Jefferson Natalicio Santos da Silva
- **Address:** Rua Jaciretã, 17 - Centro, Pato Branco - PR
- **WhatsApp:** 46 99112-3543
- **Landline:** 46 3225-8653
- **Bio link:** `abre.ai/fiodobigode` (link shortener — likely a booking tool; not wired in as primary CTA per user decision, WhatsApp is primary. Can be added later as secondary CTA if the user wants it investigated.)
- **Anniversary:** 10 years, 2015–2025
- **Tone from recent posts:** festive/community-oriented (Natal, Páscoa, "Rumo aos 10 anos"), casual local-shop voice, not corporate
- **Hours:** not published on Instagram. Placeholder generic text ("Segunda a Sábado — confirme o horário pelo WhatsApp") ships at launch; user will supply exact hours to replace it.

## Assets

- `logo-transparent.png` — fixed wordmark logo ("BARBEARIA FIO DO BIGODE DESDE 2015", ornate Victorian-flourish lettering, white ink, real alpha transparency). Source file was a Gemini-generated PNG with fake transparency (alpha channel uniformly 255, transparency faked via baked gray checkerboard in the pixels — same failure mode previously seen on the Sheikh Barbearia logo). Fixed via a luminance-threshold alpha key (not the usual chroma/saturation key, because this logo's ink is white/grayscale, which a saturation-based key can't distinguish from a grayscale checkerboard): pixels above ~230 luminance → opaque white, below ~140 → fully transparent, smoothstep ramp between for anti-aliased edges. Verified by compositing onto a dark background — clean edges, no checker residue, no gray halo.
- Gallery photos: not yet present. User will manually save 6–10 photos from the shop's Instagram feed/stories into the project folder (automated download was blocked by the browser tool's own privacy guard against extracting signed CDN URLs — not worked around). Gallery section ships with real layout/animation wired up against placeholder images until those land, swapped in without structural changes.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion (animation)
- Static single-page site, no backend. Deploy target: Vercel or Netlify (decide at ship time).

## Visual System

### Colors
| Token | Value | Use |
|---|---|---|
| `ink` | `#0d0c0a` | Base background (warm near-black, not cool gray) |
| `paper` | `#f2e8d5` | Aged-cream text/surface on dark grounds |
| `brass` | `#c9a227` | Single accent — CTAs, active states, small highlights. Sampled from the shop's real badge gold; final hex confirmed against gallery/logo assets during build. |
| barber-pole red/white/blue | literal graphic motif only | Used only as an actual pole-stripe illustration (e.g. divider or FAB detail), never as a UI/text/background color |

**One Accent Rule:** brass gold is the only color used for interactive/actionable elements. If a new state needs color, it's brass or it's wrong — mirrors the discipline used on the sibling Sheikh project, applied to a different hue so the two sites don't converge.

### Typography
- **Display** (hero headline, section titles): Fraunces, weight 900, uppercase-or-mixed per the logo's own case usage. Ornate/high-contrast serif — echoes the flourish lettering in the real logo. Explicitly not a condensed sans (that's the sibling project's language).
- **Body:** Work Sans, regular/medium. Clean grotesk for legibility — old-school poster technique of ornate display + plain body.
- **Label/kicker:** Work Sans, medium, uppercase, tracked out (`0.25em`+), brass color.

### Shapes & Depth
- Corners: sharp to barely-rounded (`rounded-none`–`rounded-sm`, ~2-4px) on all content containers. Full circles reserved for intentional badge/seal/FAB elements only (matches the shop's real circular badge) — no `rounded-md`-everywhere default.
- Depth: single soft "lifted paper" shadow (one shadow, no bevel/inset-highlight system) — a printed card lifted off a surface, not a beveled metal edge. This is the deliberate point of difference from the sibling project's bevel system.
- Signature divider component (**SeloReveal**): a small circular medallion (crossed-razor glyph) centered on a thin dotted rule, used between major sections. Animates in once per section with a "stamp hit": scale 1.15→1, rotate −4°→0°, opacity 0→1, easeOut with slight overshoot. Reused across every section boundary instead of each section owning its own divider — same structural role as the sibling project's SteelSeam, different material metaphor (stamp vs. seam).

### Motion
All motion respects `prefers-reduced-motion` (disabled/replaced with instant state, no exceptions).
- **Stamp-in:** section titles, service-list rows, and cards enter with the SeloReveal scale/rotate/fade above.
- **Hero badge rotation:** the circular badge mark in the hero spins slowly and continuously (very slow, ambient — not attention-grabbing), pauses under reduced motion.
- **Paper grain:** a subtle low-opacity noise/grain texture over dark sections, static (not animated) — sets print/paper mood without a performance cost.
- **Gallery (Polaroid tilt):** photos sit at small random rotations at rest; hover/focus straightens (`rotate: 0`) and lifts (`scale: 1.03`, shadow grows).
- **Service list:** each row's dotted leader line (between service name and price) draws in (width 0→100%) as it scrolls into view.
- **WhatsApp FAB:** circular, fixed bottom-right, brass background, gentle pulse ring (paused under reduced motion) — same functional role as the sibling project's FAB, distinct visual (stamp/medallion ring vs. that project's ember pulse).

## Sections (page structure, top to bottom)

1. **Header** — fixed, transparent over hero then solid `ink` + blur on scroll. Logo wordmark left (bare PNG, no frame/circle — matches how the sibling project treats its own logo). Nav: Sobre / Serviços / Galeria / Localização. WhatsApp button right, always visible.
2. **Hero** — full-bleed `ink` background with paper grain. Circular badge mark (slow rotation), logo wordmark, one-line tagline (drawn from the shop's own voice, not invented corporate copy), WhatsApp CTA styled as a stamped/embossed button, subtle scroll-down cue.
3. **Sobre / História** — "Desde 2015" story, 10-year framing. Split layout: Polaroid-tilted photo + copy. Crossed-razor SeloReveal divider above.
4. **Serviços** — barbershop menu-board list: service name, dotted leader, price. Stagger-reveals on scroll.
5. **Galeria** — grid of Polaroid-tilt photos sourced from the shop's real Instagram content (placeholder until user supplies files per Assets section above).
6. **Localização** — address, phone numbers (tap-to-call + tap-to-WhatsApp), hours (placeholder text until user supplies real hours), embedded map.
7. **Footer** — logo mark, Instagram link, WhatsApp, phone, copyright line.
8. **WhatsApp FAB** — persistent floating action button across the whole page, opens WhatsApp deep link (`https://wa.me/5546991123543`) with a pre-filled greeting message.

**Explicitly excluded:** a testimonials/reviews section. No real customer reviews were collected during research, and inventing quotes for a real business would be misleading. Easy to add later if the user supplies real review screenshots or text.

## Data / Integration

No backend, no forms, no user data collection. The only "integration" is WhatsApp deep links (`wa.me`) built from the shop's real number, used on: header CTA, hero CTA, floating FAB, and the localização section's phone line. No environment variables or secrets involved.

## Error Handling & Edge Cases

- Missing/failed gallery images: layout must not break — fixed-aspect-ratio containers with a graceful `ink`/`paper`-toned fallback fill, not broken-image icons.
- Reduced motion: every animation listed above has a static equivalent (see Motion section) — not a blanket "disable everything" but a deliberate reduced state per component.
- Small viewports: single-column stacking for hero, about, services, gallery grid (2-col minimum on mobile), and localização; nav collapses to a simple mobile menu (shop only has 4 links, no need for a complex drawer system).

## Testing / Verification Scope

Static marketing site — no unit test suite planned. Verification before shipping:
- Manual visual QA at mobile/tablet/desktop breakpoints
- `prefers-reduced-motion` toggle check (OS-level) confirms every animated element degrades correctly
- WhatsApp deep links open correctly with the pre-filled message on both desktop web and mobile
- Lighthouse pass (performance/accessibility/best practices) before handoff
- Contrast check on brass-on-ink and paper-on-ink text pairings (WCAG AA minimum for body text)

## Open Items (tracked, not blocking)

- Exact brass-gold hex to be confirmed once more brand assets (gallery photos) are available — `#c9a227` is a placeholder sampled by eye from the Instagram badge.
- Business hours — user to supply; generic placeholder text ships until then.
- Gallery photos — user to manually add 6–10 files to the project folder; placeholders ship until then.
- `abre.ai/fiodobigode` bio link — not investigated further per user's WhatsApp-first decision; can be revisited if the user wants a secondary booking CTA.
