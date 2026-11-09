// Generates the D1 migration with Better Auth tables from the shared auth options.
// Run: npm run auth:schema   then apply: npm run db:migrate:local / db:migrate:remote
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, writeFileSync } from 'node:fs';
import { getMigrations } from 'better-auth/db/migration';
import { authOptions } from '../src/lib/auth-options.ts';

const { compileMigrations } = await getMigrations({
	...authOptions,
	database: new DatabaseSync(':memory:')
});

mkdirSync('migrations', { recursive: true });
writeFileSync('migrations/0001_better_auth.sql', (await compileMigrations()) + '\n');
console.log('Written migrations/0001_better_auth.sql');
