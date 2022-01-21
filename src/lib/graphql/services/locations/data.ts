import { fetchSpacetraders } from '$lib/api';
import type { LocationType } from '$lib/graphql/generated/resolvers';

interface SystemLocationResponse {
	locations: {
		symbol: string;
		type: LocationType;
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
	fetchSpacetraders({
		path: `/systems/${systemId}/locations`,
		headers: { Authorization: `Bearer ${token}` }
	});
