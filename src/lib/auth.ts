import { betterAuth } from 'better-auth';
import { env } from 'cloudflare:workers';
import { authOptions } from './auth-options';

export const auth = betterAuth({
	...authOptions,
	// Cloudflare D1 binding from wrangler.jsonc
	database: env.DB,
	secret: env.BETTER_AUTH_SECRET
});
