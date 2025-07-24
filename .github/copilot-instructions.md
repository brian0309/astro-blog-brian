# Brian Carlo's Astro Blog - AI Coding Agent Instructions

## Project Architecture

This is a **hybrid Astro + React blog** built with Tailwind CSS, featuring:
- **Static-first with islands**: Astro handles static rendering; React components add interactivity via `client:load` directives
- **Content-driven**: Blog posts live in `src/content/blog/` as Markdown/MDX files with Zod schema validation
- **Custom design system**: Extended Tailwind config with brand colors (`primary`, `lightGray`, `softGray`) and `blue-pink-gradient`

## Key Patterns & Conventions

### Component Architecture
- **Astro components** (`.astro`): Layout, static UI, and server-side logic
- **React components** (`.jsx`): Interactive features like `HoverEffects`, `ThemeToggle`, `MobileSidebar`
- **Hydration strategy**: Use `client:load` sparingly; prefer static-first approach

### Styling Approach
- **Utility-first Tailwind**: Follow existing class order (layout → spacing → typography → decoration)
- **Custom utilities**: Use `bg-blue-pink-gradient` for CTAs, brand colors for text (`text-primary`, `text-lightGray`)
- **Responsive patterns**: Mobile-first with `md:` breakpoints (320px → 768px+ desktop)
- **Dark mode**: Class-based toggle via `ThemeToggle.jsx` with localStorage persistence

### Content Management
```typescript
// Blog posts schema in src/content/config.ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});
```

### Layout System
- **BaseLayout.astro**: Root template with theme script, Header/Footer wrapper
- **Slot architecture**: `<slot name="effects" />` for interactive overlays, `<slot name="head" />` for page-specific meta
- **Navigation**: Responsive header with mobile sidebar (`MobileSidebar.jsx` + `HamburgerButton.jsx`)

## Developer Workflows

### Essential Commands
```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Static build for production
npm run preview  # Preview production build locally
```

### File Organization
- **Pages**: `src/pages/` → routes (index.astro, blog/index.astro, about.astro)
- **Components**: Grouped by purpose (`common/`, `effects/`)
- **Layouts**: Shared templates (`BaseLayout.astro`, `BlogPost.astro`)
- **Content**: Blog posts in `src/content/blog/` with frontmatter validation

## Project-Specific Considerations

### Interactive Elements
- **HoverEffects.jsx**: Mouse-following blur effect on homepage, requires `client:load`
- **Theme persistence**: Theme state managed in localStorage with SSR-safe inline script
- **Glass morphism**: Header uses backdrop-blur effects via `GlassHeader.jsx`

### Content Strategy
- **Blog collection**: Auto-sorted by `pubDate`, accessible via `getCollection('blog')`
- **SEO-ready**: BaseHead component handles meta tags, RSS feed at `/rss.xml`
- **Typography**: Uses Atkinson font with `@tailwindcss/typography` for blog content

### Deployment Target
- **Cloudflare Pages**: Site configured for `https://briancarlo.pages.dev`
- **Static output**: No server-side rendering, fully pre-built

## Code Quality Standards

- **TypeScript**: Enabled for `.astro` and `.ts` files with strict type checking
- **Tailwind organization**: Consistent utility order per `.clinerules/rule.md`
- **Accessibility**: Semantic HTML with ARIA labels, keyboard navigation support
- **Performance**: Minimal JavaScript, optimized images, client-side hydration only where needed

When making changes, maintain the utility-first styling approach, respect the component boundaries between Astro/React, and preserve the mobile-first responsive design patterns.
