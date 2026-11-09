import { DatabaseSync } from 'node:sqlite';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL, DATABASE_PATH } from '$app/env/private';

export const auth = betterAuth({
	// Built-in Node SQLite: a single file on disk, no native build step on Windows
	database: new DatabaseSync(DATABASE_PATH),
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8
	},
	// Lets server-side form actions set the session cookie
	plugins: [sveltekitCookies(getRequestEvent)]
});
