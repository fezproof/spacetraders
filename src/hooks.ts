import { getMe } from '$lib/api';
import { getTokenFromCookie } from '$lib/auth/cookie';
import type { GetSession, Handle } from '@sveltejs/kit';

interface UserData {
	username: string;
	token: string;
}

export interface Locals {
	user?: UserData;
}

export interface Session {
	user?: UserData;
}

export const handle: Handle<Locals> = async ({ event, resolve }) => {
	const { request, locals } = event;
	try {
		const token = getTokenFromCookie(request.headers.get('cookie'));
		locals.user = undefined;
		if (token) {
			const { user } = await getMe(token);
			if (user) {
				locals.user = { username: user.username, token };
			}
		}
		return resolve(event);
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
};

export const getSession: GetSession<Locals, Session> = async (request) => {
	return {
		user: request.locals.user
	};
};
