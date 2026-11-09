import type { Handle } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/env';
import { auth } from '#lib/server/auth.ts';

// Create user/session/account tables on startup if they don't exist yet
if (!building) {
	await (await auth.$context).runMigrations();
}

export const handle: Handle = async ({ event, resolve }) => {
	if (!building) {
		const session = await auth.api.getSession({ headers: event.request.headers });
		event.locals.user = session?.user ?? null;
		event.locals.session = session?.session ?? null;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
