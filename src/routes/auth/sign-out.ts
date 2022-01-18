import { SESSION_COOKIE_ID } from '$lib/auth/cookie';
import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';

export const post: RequestHandler = async () => {
	return {
		status: 301,
		headers: {
			'set-cookie': serialize(SESSION_COOKIE_ID, '', {
				path: '/',
				expires: new Date(0)
			}),
			location: '/'
		}
	};
};
