// Shared by the Vite plugin (astro.config.mjs) and `npm run i18n:compile`.
import { defineConfig } from '@inlang/paraglide-js';

export default defineConfig({
	outdir: './src/paraglide',
	// URL decides the locale; cookie and base locale are fallbacks
	strategy: ['url', 'cookie', 'baseLocale'],
	// ru (base) has no prefix: /login ; en is prefixed: /en/login
	// The prefixed pattern must come first so it is matched before the catch-all
	urlPatterns: [
		{
			pattern: '/',
			localized: [
				['en', '/en'],
				['ru', '/']
			]
		},
		{
			pattern: '/:path(.*)?',
			localized: [
				['en', '/en/:path(.*)?'],
				['ru', '/:path(.*)?']
			]
		}
	],
	// Better Auth endpoints are not localized
	routeStrategies: [{ match: '/api/:path(.*)?', exclude: true }]
});
