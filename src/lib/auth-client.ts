import { createAuthClient } from 'better-auth/svelte';
import { m } from '../paraglide/messages.js';

// Talks to /api/auth/* on the same origin
export const authClient = createAuthClient();

// Called at render time so the text follows the current locale
const messages: Record<string, () => string> = {
	INVALID_EMAIL_OR_PASSWORD: m.error_invalid_credentials,
	INVALID_EMAIL: m.error_invalid_email,
	PASSWORD_TOO_SHORT: m.error_password_too_short,
	USER_ALREADY_EXISTS: m.error_user_exists,
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: m.error_user_exists
};

export function errorMessage(error: { code?: string; message?: string }) {
	const message = error.code ? messages[error.code] : undefined;
	return message ? message() : error.message || m.error_generic();
}
