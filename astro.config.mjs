import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Every page is rendered on request so the session can be checked
  output: 'server',
  // Sessions are handled by Better Auth in D1, so Astro's KV-backed sessions are not needed
  session: false,
  integrations: [svelte()],
  // No image transforms: avoids provisioning a Cloudflare Images binding
  adapter: cloudflare({ imageService: 'passthrough' })
});
