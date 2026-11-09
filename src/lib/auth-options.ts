import type { BetterAuthOptions } from 'better-auth';

// Shared by the app (src/lib/auth.ts) and the schema generator (scripts/generate-auth-schema.ts)
export const authOptions = {
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8
	}
} satisfies BetterAuthOptions;
