# Tailwind CSS v4 Upgrade Checklist

This checklist outlines the steps to upgrade the Astro blog from Tailwind CSS v3 to v4.

## 1. Pre-upgrade Steps

- [x] Review the official Astro guide for upgrading Tailwind.
- [x] Review the GitHub discussion for potential issues and solutions.

## 2. Dependency Management

- [x] Install `@tailwindcss/vite`.
- [x] Install `tailwindcss@next`.
- [x] Uninstall `@astrojs/tailwind`.
- [ ] Update `package.json` to reflect the changes.

## 3. Configuration Update

- [x] Remove the `@astrojs/tailwind` integration from `astro.config.mjs`.
- [x] Add the `@tailwindcss/vite` plugin to `astro.config.mjs`.
- [x] Update `tailwind.config.cjs` to be compatible with v4. This includes:
    - [x] Using `@import` in the CSS file instead of `content` array.
    - [ ] Ensuring `darkMode: 'class'` is correctly configured if needed.
    - [ ] Migrating custom theme values.

## 4. CSS Updates

- [x] Update `src/styles/global.css` to use `@import "tailwindcss";`.
- [x] Add `@layer` directives for base, components, and utilities if needed for custom styles.
- [x] Ensure `global.css` is imported correctly in `src/layouts/BaseLayout.astro`. The GitHub discussion suggests that importing it directly in the Astro component is better than `@import` within another CSS file.

## 5. Verification

- [x] Run `npm run dev` to start the dev server.
- [x] Check for any build errors.
- [x] Verify that existing styles are applied correctly.
- [x] Test dark mode functionality.
- [x] Check responsive design.
- [x] Review the browser console for any errors.

## 6. Dark Mode Fixes

- [x] Added universal utility classes (.bg-main, .text-main, .text-secondary, .border-main, .icon-light/.icon-dark)
- [x] Updated Header/GlassHeader component to use new utilities
- [x] Updated Footer component to use new utilities  
- [x] Updated MobileSidebar component to use new utilities
- [x] Updated HeaderLink component to use new utilities
- [x] Updated SpeechBubble component to use separate light/dark images
- [x] Enhanced "see my work" button with hover effects

## 7. Post-upgrade Cleanup

- [ ] Remove this checklist file.
- [ ] Commit the changes.
