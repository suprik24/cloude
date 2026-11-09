import { createAuthClient } from 'better-auth/svelte';

// Talks to /api/auth/* on the same origin
export const authClient = createAuthClient();

const messages: Record<string, string> = {
	INVALID_EMAIL_OR_PASSWORD: 'Неверная почта или пароль',
	INVALID_EMAIL: 'Некорректная почта',
	PASSWORD_TOO_SHORT: 'Пароль должен быть не короче 8 символов',
	USER_ALREADY_EXISTS: 'Пользователь с такой почтой уже есть',
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Пользователь с такой почтой уже есть'
};

export function errorMessage(error: { code?: string; message?: string }) {
	return (error.code && messages[error.code]) || error.message || 'Что-то пошло не так';
}
