// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), sitemap()],
  output: 'server'
});