interface SystemLocationResponse {
	locations: {
		symbol: string;
		type: string;
		name: string;
		x: number;
		y: number;
		allowsConstruction: boolean;
		traits: [string];
	}[];
}

export const getSystemLocations = async (
	systemId: string,
	token: string
): Promise<SystemLocationResponse> =>
	fetch(`https://api.spacetraders.io/systems/${systemId}/locations`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((r) => r.json());
