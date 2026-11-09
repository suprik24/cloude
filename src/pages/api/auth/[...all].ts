import type { APIRoute } from 'astro';
import { auth } from '../../../lib/auth';

// All Better Auth endpoints: sign-up, sign-in, sign-out, session
export const ALL: APIRoute = ({ request }) => auth.handler(request);
