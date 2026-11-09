import { defineMiddleware } from 'astro:middleware';
import { auth } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
	const session = await auth.api.getSession({ headers: context.request.headers });
	context.locals.user = session?.user ?? null;
	context.locals.session = session?.session ?? null;

	const { pathname } = context.url;
	if (pathname === '/' && !context.locals.user) return context.redirect('/login');
	if (pathname === '/login' && context.locals.user) return context.redirect('/');

	return next();
});
