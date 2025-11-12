# The Anti Matrix Project — Startup Consultant

> Building systems that help startups scale with clarity

Expert consulting in operations, strategy, and intelligent automation for founders before and after funding.

## Project info

**URL**: https://lovable.dev/projects/23bdcf54-5899-4e61-8728-e50be2ad49fd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/23bdcf54-5899-4e61-8728-e50be2ad49fd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 📊 Performance & Lighthouse

### Running Lighthouse Audits Locally

```bash
# Install Lighthouse CLI globally (if not already installed)
npm install -g lighthouse

# Run audit on development server
npm run dev
# Then in another terminal:
lighthouse http://localhost:8080 --view

# Run audit with specific categories
lighthouse http://localhost:8080 --only-categories=performance,accessibility,seo --view

# Generate JSON report for analysis
lighthouse http://localhost:8080 --output=json --output-path=./lighthouse-report.json
```

### Performance Targets & Monitoring

| Metric | Target | Priority |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 🔴 Critical |
| **FCP** (First Contentful Paint) | < 1.8s | 🔴 Critical |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 🟡 High |
| **INP** (Interaction to Next Paint) | < 200ms | 🟡 High |
| **Performance Score** | ≥ 90 | 🔴 Critical |
| **Accessibility Score** | ≥ 95 | 🔴 Critical |
| **SEO Score** | ≥ 95 | 🟡 High |

### Implemented Optimizations

✅ **Image Optimization** (fixes: `image-alt`, width/height attributes)
- Added descriptive alt text to all images
- Specified dimensions to prevent CLS
- Logo preload for faster LCP

✅ **Scroll Performance** (fixes: `forced-reflow-insight`, INP)
- RAF-throttled parallax calculations
- Respects `prefers-reduced-motion`
- Passive event listeners

✅ **SEO & Structured Data** (fixes: `structured-data`, `meta-description`, `canonical`)
- Complete JSON-LD with Organization, WebSite, and Service schemas
- Canonical URLs and proper meta tags
- robots.txt and sitemap.xml

✅ **Accessibility** (fixes: `color-contrast`, `prefers-reduced-motion`)
- WCAG AA compliant color contrast
- Reduced motion support
- Semantic HTML structure

### Image Pipeline Best Practices

When adding new images to the project:

1. **Specify dimensions** to prevent layout shifts:
   ```tsx
   <img src={logo} alt="Description" width="128" height="128" />
   ```

2. **Use descriptive alt text** for accessibility:
   ```tsx
   // ✅ Good
   alt="Company logo - startup consulting services"
   
   // ❌ Bad
   alt="logo" or alt=""
   ```

3. **Lazy load** below-the-fold images:
   ```tsx
   <img src={image} loading="lazy" decoding="async" />
   ```

4. **Preload only LCP image** (already configured in index.html):
   ```html
   <link rel="preload" as="image" href="/hero-image.png" fetchpriority="high">
   ```

### CSS & Animation Performance

**Reduced Motion Support:**
All animations automatically respect user preferences via CSS:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Parallax Optimization:**
- Uses `requestAnimationFrame` to batch scroll calculations
- Avoids forced reflows by reading scroll position once per frame
- Disables parallax entirely for users with reduced motion preference

### Performance Monitoring in CI/CD

Recommended GitHub Actions workflow:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: 'https://preview--anti-matrix-systems.lovable.app/'
          uploadArtifacts: true
```

## 🎨 Design System

All colors use HSL format and semantic tokens defined in `src/index.css`:

**Color Palette:**
- **Primary:** `hsl(200 80% 55%)` - Cyan/blue for CTAs and brand elements
- **Secondary:** `hsl(35 85% 60%)` - Amber/gold for accents
- **Background:** `hsl(220 15% 8%)` - Dark base
- **Foreground:** `hsl(40 15% 95%)` - Light text
- **Muted:** `hsl(220 12% 15%)` - Muted surfaces
- **Border:** `hsl(220 12% 20%)` - Border colors

**Design Principles:**
1. **Never use direct colors** like `text-white`, `bg-black`, `text-gray-500`
2. **Always use semantic tokens** from the design system
3. **All colors must be HSL** for consistency
4. **Customize Shadcn components** with variants, don't override inline

**Gradients & Effects:**
```css
--gradient-cyber: linear-gradient(135deg, hsl(200 80% 55%), hsl(220 75% 60%));
--gradient-amber: linear-gradient(135deg, hsl(35 85% 60%), hsl(25 90% 65%));
--shadow-glow: 0 0 40px hsl(200 80% 55% / 0.2);
```

## 🔍 SEO & Structured Data

### Implemented SEO Features

✅ **Meta Tags** (all pages)
- Title < 60 characters
- Meta description < 160 characters  
- Canonical URLs
- Open Graph tags (Facebook/LinkedIn)
- Twitter Card tags

✅ **Structured Data (JSON-LD)**
Located in `index.html`:
- `Organization` - Company info
- `WebSite` - Site metadata
- `ProfessionalService` - Service offerings

✅ **Crawlability**
- `robots.txt` - Crawler instructions
- `sitemap.xml` - URL discovery
- `lang="en"` attribute on HTML

### SEO Checklist for New Pages

When adding new routes/pages:
- [ ] Add unique `<title>` tag
- [ ] Add unique meta description
- [ ] Update `sitemap.xml`
- [ ] Add canonical URL
- [ ] Consider adding page-specific structured data

## ♿ Accessibility

### Compliance Standards

- **WCAG 2.1 Level AA** compliant
- **Keyboard navigation** for all interactive elements
- **Screen reader** friendly with semantic HTML
- **Color contrast** ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- **Visible focus indicators** on all interactive elements

### Accessibility Features

✅ **Semantic HTML**
- Proper heading hierarchy (single `h1` per page)
- `<nav>`, `<main>`, `<section>`, `<article>` elements
- Form labels associated with inputs

✅ **Images**
- Descriptive alt text for meaningful images
- Empty alt (`alt=""`) for decorative images
- Width/height attributes to prevent layout shifts

✅ **Motion & Animations**
- Respects `prefers-reduced-motion: reduce`
- Smooth scroll can be disabled
- Parallax disabled for reduced motion users

✅ **Interactive Elements**
- Keyboard accessible (Tab, Enter, Space)
- ARIA labels where semantic HTML insufficient
- No `tabindex` values > 0

### Testing Accessibility

```bash
# Automated testing with axe-core
npm install -D @axe-core/cli
npx axe https://preview--anti-matrix-systems.lovable.app

# Manual testing checklist:
# 1. Navigate entire site using only keyboard
# 2. Test with screen reader (NVDA, JAWS, VoiceOver)
# 3. Verify color contrast with browser devtools
# 4. Enable "prefers-reduced-motion" and check animations
```

## 📦 Tech Stack

This project is built with:

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui (built on Radix UI primitives)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Routing:** React Router v6
- **State:** TanStack Query (React Query)

### Project Structure

```
src/
├── assets/           # Static assets (images, logos)
│   ├── amp-logo.png
│   └── amp-logo-white.png
├── components/       # React components
│   ├── ui/          # Shadcn UI primitives
│   ├── AnimatedBackground.tsx
│   ├── DiagonalFlowBackground.tsx
│   ├── Navigation.tsx
│   └── ...          # Feature components
├── hooks/           # Custom React hooks
│   ├── use-parallax.tsx
│   └── use-scroll-animation.tsx
├── pages/           # Route pages
│   ├── Index.tsx
│   └── NotFound.tsx
├── lib/             # Utilities
│   └── utils.ts
├── index.css        # Design system & global styles
└── main.tsx         # App entry point

public/
├── favicon.png      # Site favicon
├── robots.txt       # SEO crawler instructions
└── sitemap.xml      # SEO sitemap

docs/
└── lighthouse-fixes.md  # Performance optimization tracking
```

## 🚀 Deployment

Simply open [Lovable](https://lovable.dev/projects/23bdcf54-5899-4e61-8728-e50be2ad49fd) and click on Share → Publish.

### Production Checklist

Before deploying:
- [ ] Run Lighthouse audit and verify scores
- [ ] Test with "prefers-reduced-motion" enabled
- [ ] Verify all images have alt text
- [ ] Check meta tags and structured data
- [ ] Test keyboard navigation
- [ ] Verify mobile responsiveness
- [ ] Check console for errors

## 🤝 Custom Domain

Yes, you can connect a custom domain!

To connect a domain, navigate to **Project → Settings → Domains** and click **Connect Domain**.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📈 Performance Monitoring

### Recommended Tools

- **Lighthouse CI** - Automated performance testing in CI/CD
- **WebPageTest** - Detailed performance analysis
- **Chrome DevTools** - Performance profiling and debugging
- **Google Search Console** - SEO monitoring

### Key Metrics to Monitor

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint) < 2.5s
   - FID/INP (First Input Delay / Interaction to Next Paint) < 200ms
   - CLS (Cumulative Layout Shift) < 0.1

2. **Loading Performance**
   - Time to First Byte (TTFB) < 600ms
   - First Contentful Paint (FCP) < 1.8s
   - Time to Interactive (TTI) < 3.8s

3. **Bundle Size**
   - Total JavaScript < 200KB (gzipped)
   - Total CSS < 50KB (gzipped)
   - Images optimized (AVIF/WebP)

## 📝 Documentation

- **Lighthouse Fixes:** See `docs/lighthouse-fixes.md` for detailed optimization tracking
- **Project URL:** [lovable.dev/projects/23bdcf54-5899-4e61-8728-e50be2ad49fd](https://lovable.dev/projects/23bdcf54-5899-4e61-8728-e50be2ad49fd)
- **Live Preview:** [preview--anti-matrix-systems.lovable.app](https://preview--anti-matrix-systems.lovable.app)

## 🙏 Credits

**Design & Development:** Built with [Lovable](https://lovable.dev)  
**Founder:** Gurman Singh  
**Company:** The Anti Matrix Project  

© Gurman Singh — All Rights Reserved

---

**Building systems for startup growth. Let's design yours.**
