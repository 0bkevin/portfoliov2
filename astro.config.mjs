// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    sitemap({
      filter: (page) => !page.endsWith('/me/who-is-kevin-bravo'),
    }),
  ],
  output: 'server',
  trailingSlash: 'never',
  adapter: cloudflare(),
  site: 'https://kevinbravo.com',
});
