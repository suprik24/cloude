import { DatabaseSync } from 'node:sqlite';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';

export const auth = betterAuth({
	// Built-in Node SQLite: a single file on disk, no native build step on Windows
	database: new DatabaseSync(env.DATABASE_PATH || 'auth.sqlite'),
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8
	},
	// Lets server-side form actions set the session cookie
	plugins: [sveltekitCookies(getRequestEvent)]
});
