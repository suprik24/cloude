import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { auth } from '#lib/server/auth.ts';
import type { Actions, PageServerLoad } from './$types';

const messages: Record<string, string> = {
	INVALID_EMAIL_OR_PASSWORD: 'Неверная почта или пароль',
	INVALID_EMAIL: 'Некорректная почта',
	PASSWORD_TOO_SHORT: 'Пароль должен быть не короче 8 символов',
	USER_ALREADY_EXISTS: 'Пользователь с такой почтой уже есть',
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Пользователь с такой почтой уже есть'
};

function readForm(data: FormData) {
	return {
		email: String(data.get('email') ?? '').trim(),
		password: String(data.get('password') ?? '')
	};
}

function toMessage(error: unknown) {
	if (error instanceof APIError) {
		const code = (error.body as { code?: string } | undefined)?.code;
		return (code && messages[code]) || error.message;
	}
	throw error;
}

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/');
};

export const actions = {
	signIn: async ({ request }) => {
		const { email, password } = readForm(await request.formData());
		try {
			await auth.api.signInEmail({ body: { email, password } });
		} catch (error) {
			return fail(400, { mode: 'signIn', email, message: toMessage(error) });
		}
		redirect(303, '/');
	},

	signUp: async ({ request }) => {
		const { email, password } = readForm(await request.formData());
		try {
			await auth.api.signUpEmail({ body: { email, password, name: email.split('@')[0] } });
		} catch (error) {
			return fail(400, { mode: 'signUp', email, message: toMessage(error) });
		}
		redirect(303, '/');
	}
} satisfies Actions;
