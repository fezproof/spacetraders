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
	fetch(`https://api.spacetraders.io/systems/${systemId}`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((r) => r.json());
