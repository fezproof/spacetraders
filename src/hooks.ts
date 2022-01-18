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

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	try {
		const token = getTokenFromCookie(request.headers.cookie);
		request.locals.user = undefined;
		if (token) {
			const { user } = await getMe(token);
			if (user) {
				request.locals.user = { username: user.username, token };
			}
		}
		return resolve(request);
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify(error),
			headers: {}
		};
	}
};

export const getSession: GetSession<Locals, unknown, Session> = async (
	request
) => {
	return {
		user: request.locals.user
	};
};
