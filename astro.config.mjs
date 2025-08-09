import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
// Node helpers to scan content frontmatter for hidden posts
import { readdirSync, readFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// Build a Set of blog slugs that include the tag 'hidden-post' in frontmatter.
function getHiddenPostSlugs() {
  const slugs = new Set();
  try {
    const root = fileURLToPath(new URL('.', import.meta.url));
    const blogDir = join(root, 'src', 'content', 'blog');
    const files = readdirSync(blogDir, { withFileTypes: true });
    for (const f of files) {
      if (!f.isFile()) continue;
      const ext = extname(f.name).toLowerCase();
      if (!['.md', '.mdx', '.markdown'].includes(ext)) continue;
      const raw = readFileSync(join(blogDir, f.name), 'utf8');
      const fmMatch = raw.match(/^---\s*([\s\S]*?)\s*---/);
      if (!fmMatch) continue;
      const fm = fmMatch[1];
      // crude detection of 'hidden-post' in YAML frontmatter tags
      if (/tags\s*:\s*\[[^\]]*hidden-post[^\]]*\]/i.test(fm) || /(^|\n)\s*-\s*hidden-post(\s*#.*)?$/im.test(fm)) {
        slugs.add(basename(f.name, ext));
      }
    }
  } catch {
    // ignore
  }
  return slugs;
}

const hiddenSlugs = getHiddenPostSlugs();

// https://astro.build/config
export default defineConfig({
  site: 'https://briancarlo.pages.dev',
  integrations: [
    mdx(),
    react(),
    sitemap({
      // Exclude hidden blog posts from the generated sitemap
      serialize(item) {
        for (const slug of hiddenSlugs) {
          if (item.url.endsWith(`/blog/${slug}/`)) {
            return undefined; // skip this entry
          }
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
