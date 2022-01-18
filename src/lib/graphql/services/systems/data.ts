import { fetchSpacetraders } from '$lib/api';

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
	fetchSpacetraders({
		path: `/systems/${systemId}`,
		headers: { Authorization: `Bearer ${token}` }
	});
