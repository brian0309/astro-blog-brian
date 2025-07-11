# 🌟 Best Practices for Astro + Tailwind Projects

## 1. Styling Approach
- **Utility‑first mindset**: Use Tailwind’s atomic classes (`text-center`, `sm:text-left`, etc.) for modular, expressive styles.
- **Consistent class order**: Format classes by layout → spacing → typography → decoration. Leverage ESLint or Prettier plugins for automated sorting.
- **Semantic utility bundles**: When repeated, combine classes with `@apply` in Tailwind CSS files to create reusable utilities.

## 2. Tailwind Customization
- **Centralize tokens**: Define colors, spacing, and breakpoints in `tailwind.config` or via CSS‑first config in Tailwind 4+.
- **Use `@config` in global CSS**: For newer setups, import Tailwind via CSS and reference `tailwind.config` using `@config` to maintain centralized theming :contentReference[oaicite:1]{index=1}.
- **Class sorting tools**: Enable Tailwind CSS IntelliSense and use plugins like `eslint-plugin-tailwindcss` to maintain healthy order.

## 3. Scoped vs Global Styles
- **Component isolation**: Let Astro auto‑scope component styles. Use `<style is:global>` only for intentional global overrides :contentReference[oaicite:2]{index=2}.
- **Markdown styling**: Prefer the Typography plugin to style Markdown content semantically, wrapping with `prose` or `prose dark:prose-invert` :contentReference[oaicite:3]{index=3}.

## 4. Responsive & Themed Design
- **Mobile‑first workflows**: Use responsive prefixes (`sm:`, `md:`, `lg:`) to scale styles progressively.
- **Uniform theming**: Keep breakpoints, colors, and spacing centralized to ensure consistency across components.

## 5. Hydration & Performance
- **Limit JS islands**: Add interactivity only where needed—use directives like `client:idle`, `client:visible`, or `client:load`.
- **Optimize CSS output**: Tailwind’s JIT and Astro’s purging ensure lean builds. Keep an eye on Core Web Vitals (LCP, CLS, FID).

## 6. Accessibility
- **Mark up semantically**: Use `<nav>`, `<main>`, `<button>`, etc. Ensure proper ARIA labels.
- **Keyboard & focus support**: Test tab navigation, manage focus states, and ensure skip links exist.

## 7. SEO & Metadata
- **Meta component**: Create a reusable `<SEO>` component to manage `<title>`, `<meta>`, and canonical tags consistently.

## 8. Code Quality
- **Linting & formatting**: Adopt ESLint + `eslint-plugin-tailwindcss` and Prettier with `prettier-plugin-tailwindcss`.
- **Modular components**: Break UI into focused Astro components; reuse utility bundles via `@apply`.
- **Testing strategy**: Write unit tests for logic, and use tools like Cypress for user interaction flows.

## 9. CSS Specificity
- **Avoid `!important`**: Instead, use config or semantic classes. Reserve `!important` for genuine overrides.
- **Global overrides**: Use scoped selectors or utility overrides—not blanket `!important`.

## 10. Maintenance & Review
- **Code reviews**: Enforce utility order, consistency, and reuse in PR reviews.
- **Refactor frequently**: Clean up duplicate utilities and outdated patterns as the codebase grows.

---

### ✅ Quick Checklist
| Task                                 | ✅ |
|--------------------------------------|----|
| Utility-first class organization     | ☐  |
| Tailwind config / CSS-first import  | ☐  |
| Scoped component CSS                 | ☐  |
| Markdown styled via Typography       | ☐  |
| Responsive design with breakpoints   | ☐  |
| Minimal hydration                   | ☐  |
| Accessibility compliance            | ☐  |
| Shared SEO component                | ☐  |
| Linting + formatting tools           | ☐  |
| Testing strategy in place           | ☐  |
| Ongoing refactor/review schedule     | ☐  |

---

### How to Use This Document
1. **Review** before building new UI.
2. **Include** this with your team’s documentation or README.
3. **Adapt** per your project's complexity and needs.
