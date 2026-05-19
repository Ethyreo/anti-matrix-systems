# AI Agent Context: The Anti Matrix Project

## Vault Links

- [[00 Home/Vault Map]]
- [[05 Mirror/Anti Matrix Mirror Index]]

Welcome to The Anti Matrix Project website repository! This file serves as the definitive onboarding and context guide for any incoming AI Agent working on this codebase.

---

## Mission Overview
The Anti Matrix Project is the professional consulting practice of **Gurman Singh**, a solo consultant helping startups and small-scale businesses transition from chaotic growth to operational clarity. The practice focuses on:
- Startup Growth Systems (internal processes, org pipelines, OKRs)
- Investor Strategy & Fundraising (pitch decks, models, dashboards)
- Automation & AI Stack Integration (workflow simplifications, intelligence)
- Business & Revenue Operations (pricing models, financial alignment)

This codebase is directly synced and hosted via **Lovable.dev**. Any changes pushed here will be immediately deployed.

---

## Tech Stack & Architecture
This is a high-performance, single-page React application built on **Vite** and **TypeScript**:

- **Framework:** React 18 + Vite (SPA)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom HSL theme tokens
- **UI Components:** Shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **Routing:** React Router v6

### Directory Layout
- `src/components/` - Standard React UI components (Shadcn primitives in `ui/`).
- `src/components/AnimatedBackground.tsx` - Custom background grid with cyber glow effects.
- `src/components/JourneyCards.tsx` - Interactive, infinite-scroll carousel documenting Gurman's founder journey (clothing brand rogue liberation, pine and thatch hospitality, Influcreate creator agency, Zelto/AdPushup CEO staff).
- `src/hooks/use-parallax.tsx` - Highly optimized, RAF-throttled scroll handler for parallax animations.
- `src/pages/Index.tsx` - Main page compiling all services, process, case studies, about, resources, and contact sections.
- `docs/` - Performance and optimization audit trackers.

---

## Design System Tokens
To maintain visual premium quality, all styling must adhere strictly to the established theme defined in `src/index.css`:

### Color Palette
- **Background:** `hsl(220 15% 8%)` (Rich dark base)
- **Foreground:** `hsl(40 15% 95%)` (Warm white text)
- **Primary:** `hsl(200 80% 55%)` (Cyber cyan for call-to-actions)
- **Secondary:** `hsl(35 85% 60%)` (Amber/gold for visual accents)
- **Muted:** `hsl(220 12% 15%)` (Card background base)
- **Border:** `hsl(220 12% 20%)` (Soft grid dividers)

### Special Effects & Gradients
- **Cyber Gradient:** `linear-gradient(135deg, hsl(200 80% 55%), hsl(220 75% 60%))` (applied via `.text-gradient-cyber`)
- **Amber Gradient:** `linear-gradient(135deg, hsl(35 85% 60%), hsl(25 90% 65%))` (applied via `.text-gradient-amber`)
- **Cyber Glow Shadow:** `0 0 40px hsl(200 80% 55% / 0.2)` (applied via `.glow-cyber`)

---

## Performance, Accessibility & SEO
The site is highly optimized targeting Lighthouse scores of **≥ 90/95** across all categories:

1. **Image Optimizations:** Alt text is fully descriptive. Dimensions are explicit to prevent Cumulative Layout Shifts (CLS). Logo image is preloaded in `index.html`.
2. **Scroll Performance:** Parallax scroll computations are throttled via `requestAnimationFrame` and passive listeners to eliminate forced synchronous layouts and maintain **60fps** (INP < 150ms).
3. **Accessibility:** Complete global support for `prefers-reduced-motion: reduce`. Focus rings are visible on all interactive components. Text contrast meets WCAG AA standards (≥ 4.5:1).
4. **SEO:** Pre-configured with rich JSON-LD schema (Organization, WebSite, Service graphs) in `index.html`, canonical urls, complete social sharing cards, crawlable `robots.txt`, and automated `sitemap.xml`.

---

## Guidelines & Rules for AI Agents

> [!IMPORTANT]
> **Adhere strictly to Theme Tokens**
> NEVER use direct utility tailwind colors like `text-white`, `bg-black`, or `text-gray-500`. Always use semantic tokens like `text-foreground`, `bg-background`, or `text-muted-foreground`.

> [!TIP]
> **Keep Animation Performance Healthy**
> When introducing interactive animations, make sure they support `prefers-reduced-motion` and are throttled appropriately. Avoid direct DOM manipulations; batch changes via state or CSS properties.

> [!CAUTION]
> **Clean Commits & Lovable Sync**
> Write concise, descriptive commit messages. Since this repository is hosted on Lovable, ensure the build compiles cleanly and has no TypeScript/ESLint warnings before committing.
