import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://restaurante-donjuan-web.pages.dev',
  devToolbar: {enabled: false},
  integrations: [sitemap({ lastmod: new Date('2026-06-16') }), tailwind()],
});