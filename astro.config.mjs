import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Every page is rendered on request so the session can be checked
  output: 'server',
  integrations: [svelte()],
  adapter: cloudflare()
});
