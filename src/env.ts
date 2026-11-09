import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	BETTER_AUTH_SECRET: {
		description: 'Secret used to sign session cookies (at least 32 chars)',
		schema: (value) => {
			if (!value || value.length < 32) throw new Error('BETTER_AUTH_SECRET must be at least 32 characters');
			return value;
		}
	},
	BETTER_AUTH_URL: {
		description: 'Public URL of the app',
		schema: (value) => value || 'http://localhost:5173'
	},
	DATABASE_PATH: {
		description: 'Path to the SQLite database file',
		schema: (value) => value || 'auth.sqlite'
	}
});
