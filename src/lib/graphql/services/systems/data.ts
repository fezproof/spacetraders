import { limitedFetch } from '$lib/utils/rateLimiting';

export interface SystemInfo {
	symbol: string;
	name: string;
}

export interface SystemInfoResponse {
	system: SystemInfo;
}

export const getSystemInfo = (
	systemId: string,
	token: string
): Promise<SystemInfoResponse> =>
	limitedFetch(`https://api.spacetraders.io/systems/${systemId}`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((r) => r.json());
