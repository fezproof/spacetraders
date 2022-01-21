import { getMe } from '$lib/api';
import { SESSION_COOKIE_ID } from '$lib/auth/cookie';
import type { RequestHandler } from '@sveltejs/kit';
import { serialize } from 'cookie';

export const post: RequestHandler<Record<string, never>> = async ({
	request
}) => {
	const body = await request.formData();
	const token = body.get('token') as string;
	const user = await getMe(token);

	if (!user.user) {
		return {
			status: 401,
			body: {
				message: 'Incorrect user token'
			}
		};
	}

	return {
		status: 302,
		headers: {
			'set-cookie': serialize(SESSION_COOKIE_ID, token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // one week
			}),
			location: '/'
		},
		body: {
			message: 'Successfully signed in'
		}
	};
};
