import { defineMiddleware } from 'astro:middleware';
import { auth } from './lib/auth';
import { localizeHref } from './paraglide/runtime.js';
import { paraglideMiddleware } from './paraglide/server.js';

export const onRequest = defineMiddleware((context, next) =>
	// Detects the locale and strips the /en prefix: the code below sees /login, never /en/login
	paraglideMiddleware(context.request, async ({ request }) => {
		const session = await auth.api.getSession({ headers: request.headers });
		context.locals.user = session?.user ?? null;
		context.locals.session = session?.session ?? null;

		// Redirects keep the current locale (/en/login stays English)
		const { pathname } = new URL(request.url);
		if (pathname === '/' && !context.locals.user) return context.redirect(localizeHref('/login'));
		if (pathname === '/login' && context.locals.user) return context.redirect(localizeHref('/'));

		return next(request);
	})
);
