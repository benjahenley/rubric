# Rubric — Brand & Site Guide

Single-page landing site for **Rubric**, a collaborative advertising agency based in Buenos Aires, Argentina. This document defines the visual and editorial identity. Stay inside it. If you think a deviation is justified, ask first.

## Stack

- **React Router v7** (framework mode, SSR)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-first config in [app/app.css](app/app.css) via `@theme`. There is no `tailwind.config.js`. Custom tokens (colors, fonts, animations) live in `@theme` and are consumed as `bg-rubric-red`, `font-display`, `animate-fade-up`, etc.
- **Fonts**: loaded from Google Fonts in [app/root.tsx](app/root.tsx) (`Bebas Neue` + `DM Sans`).

## Brand voice

- **Language**: Spanish (Argentina). Use `vos` / second-person plural informal. Examples: *"Contanos en qué estás"*, *"Seleccioná un servicio"*. Do **not** translate to neutral Spanish or English.
- **Tone**: confident, terse, design-forward. Short sentences. Italics on a single keyword for emphasis (`<em>servicio</em>`, `<em>marca</em>`).
- **Tagline**: *"Todo lo que hace tu marca comunica. Y si comunica, nos gusta hacerlo."*
- **Positioning line**: *"Agencia de publicidad colaborativa — Buenos Aires, Argentina"* (always uppercase, tracked, red).
- **Period punctuation**: section headlines and the hero wordmark end in a period rendered in `text-rubric-red` (`RUBRIC.`, `hacemos.`, `marca.`). Keep this.

## Color palette

Defined in [app/app.css](app/app.css#L7-L11) — never hardcode hex; always use the token.

| Token | Hex | Use |
|---|---|---|
| `rubric-black` | `#0a0a0a` | Primary dark background (hero, servicios, contacto, footer) |
| `rubric-white` | `#f5f0e8` | Default text on dark; light section background (clientes) |
| `rubric-cream` | `#ede8de` | Warmer light background (nosotros, light case cards) |
| `rubric-red` | `#c8341a` | Single accent color — CTAs, periods, labels, hover states, accent case cards |
| `rubric-red-dark` | `#9e2612` | Hover state for red CTAs |

Rules:
- **One accent only.** Never introduce a second accent color.
- Translucent text uses `rgba(245,240,232,…)` on dark and `rgba(10,10,10,…)` on light. Common alphas: `0.5` (muted body), `0.7–0.8` (secondary text), `0.08–0.12` (borders/dividers).
- Section backgrounds alternate **black → cream → black → white → black**. Preserve that rhythm when adding sections.

## Typography

- **`font-display`** = Bebas Neue. Used for headlines, hero wordmark, stat numbers, case names, nav logo. Always tight: `leading-none` or `leading-[0.9]`, slight negative tracking on the hero (`tracking-[-0.01em]`).
- **`font-sans`** = DM Sans. Body, labels, form inputs, nav links. Light weight (`font-light`) is the default for body copy.
- **Headline scale**: `text-[clamp(3rem,7vw,7rem)]` for section H2s, larger clamps for hero (`14vw`) and contacto (`12vw`). Use `clamp()`, not fixed sizes.
- **Labels / eyebrows**: `text-[0.72rem] font-medium tracking-[0.2em] uppercase` — usually red on dark, `opacity-50` on light.
- **Italics**: only for single-word emphasis inside headlines, or for the tagline-style intro paragraphs. Don't italicize whole paragraphs.

## Layout & spacing

- **Side padding**: `px-16` desktop, `px-8` at `max-[900px]`.
- **Section vertical padding**: `py-32` desktop, `py-20` at `max-[900px]`. The contacto and inicio sections use `min-h-screen` instead.
- **Breakpoint**: there is effectively one — `max-[900px]`. Two-column grids collapse to one. Don't introduce md/lg breakpoints; match the existing arbitrary-value pattern.
- **Grid pattern for cards**: thin separators using `gap-[2px]` (cases) or `border-r/border-b` with `rgba(…,0.1)` (services). No rounded corners anywhere — `rounded-none` is enforced on form controls.

## Components & patterns

### Navbar
Fixed, `mix-blend-difference` so it inverts over any background. Logo on the left (`font-display`, RUBRIC text — to be replaced with image asset), section links on the right hidden below 640px. See [app/routes/home.tsx](app/routes/home.tsx).

### CTA button
`bg-rubric-red` → `hover:bg-rubric-red-dark`, `px-8 py-4`, uppercase, tracked, with a `→` glyph. Square corners. No shadows.

### Form inputs
Square (`rounded-none`), translucent fill `bg-[rgba(245,240,232,0.05)]`, border `rgba(245,240,232,0.12)`, focus state switches border + bg to red tint. Labels are uppercase eyebrows above the field.

### Reveal-on-scroll
Use the `revealClass` constant + `data-reveal` attribute. The `IntersectionObserver` in [app/routes/home.tsx](app/routes/home.tsx) toggles `opacity-0 translate-y-5` → `opacity-100 translate-y-0`. Don't add a new animation lib.

### Hero
Outline wordmark behind the hero (`-webkit-text-stroke`, transparent fill, ~6% opacity) is part of the identity. Keep it.

## What NOT to do

- Don't reintroduce `cursor: crosshair` or any custom cursor — it was deliberately removed.
- Don't add rounded corners, drop shadows, gradients, or glassmorphism. The aesthetic is flat editorial.
- Don't add a second accent color, secondary buttons in other colors, or "info / warning / success" semantic colors.
- Don't switch to a UI kit (shadcn, Radix, Headless UI). Inputs and buttons are plain HTML styled with Tailwind utilities.
- Don't translate copy to neutral Spanish or English.
- Don't add new fonts. Bebas Neue + DM Sans only.
- Don't use SVG icons in body content. The visual language is type, color, and whitespace. Arrow glyphs (`→`, `↗`) are typed characters.
- Don't introduce md:/lg:/xl: breakpoints. Use `max-[900px]:` to match existing code.
