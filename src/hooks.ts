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
	const token = getTokenFromCookie(request.headers.cookie);

	try {
		if (token) {
			// const { user } = await getMe(token);
			// if (user) {
			request.locals.user = { username: 'test', token };
			return resolve(request);
			// }
		}
	} catch (error) {
		throw new Error('Failed to get user'.concat(error.message));
	}

	request.locals.user = undefined;
	return resolve(request);
};

export const getSession: GetSession<Locals, unknown, Session> = async (
	request
) => {
	return {
		user: request.locals.user
	};
};
