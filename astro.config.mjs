import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeGuideComponents } from './src/plugins/rehype-guide-components.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://tahles.ai',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    // Syntax highlighting is disabled on purpose: the only fenced code blocks this site uses
    // are ```prompt blocks, which rehypeGuideComponents turns into copy-to-clipboard boxes -
    // Shiki would otherwise consume the `language-prompt` class before our plugin sees it.
    syntaxHighlight: false,
    rehypePlugins: [rehypeGuideComponents],
  },
});
