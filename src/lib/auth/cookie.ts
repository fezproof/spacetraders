import { parse } from 'cookie';

export const SESSION_COOKIE_ID = 'st_token';

export const getTokenFromCookie = (cookie?: string): string | undefined => {
	if (!cookie) return undefined;
	const cookies = parse(cookie);
	return cookies[SESSION_COOKIE_ID];
};
