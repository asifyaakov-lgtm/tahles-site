import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeGuideComponents } from './src/plugins/rehype-guide-components.mjs';
import { readdirSync, readFileSync } from 'node:fs';

// Guides whose publishDate is still in the future (Israel time) are built but unlisted:
// keep them out of the sitemap too (they are also noindex). Mirrors src/lib/guides.ts.
const now = Date.now();
const unlistedGuides = readdirSync('./src/content/guides')
  .filter((f) => f.endsWith('.md'))
  .filter((f) => {
    const fm = readFileSync(`./src/content/guides/${f}`, 'utf8').split('---')[1] ?? '';
    const date = fm.match(/^publishDate:\s*(\S+)/m)?.[1];
    return date && Date.parse(date) > now;
  })
  .map((f) => f.replace(/\.md$/, ''));

// https://astro.build/config
export default defineConfig({
  site: 'https://tahles.ai',
  output: 'static',
  trailingSlash: 'never',
  // /tools and /privacy are unfinished placeholders: kept out of the sitemap (and noindex on the pages).
  integrations: [sitemap({ filter: (page) => !/\/(tools|privacy)\/?$/.test(page) && !unlistedGuides.some((s) => page.endsWith(`/guides/${s}`)) })],
  markdown: {
    // Syntax highlighting is disabled on purpose: the only fenced code blocks this site uses
    // are ```prompt blocks, which rehypeGuideComponents turns into copy-to-clipboard boxes -
    // Shiki would otherwise consume the `language-prompt` class before our plugin sees it.
    syntaxHighlight: false,
    rehypePlugins: [rehypeGuideComponents],
  },
});
