import { fetchSpacetraders, SpacetradersError } from '$lib/api';
import type { LocationType } from '$lib/graphql/generated/resolvers';

export interface LocationResult {
	symbol: string;
	type: LocationType;
	name: string;
	x: number;
	y: number;
	allowsConstruction: boolean;
	traits: [string];
}

interface SystemLocationResponse {
	locations: LocationResult[];
}

interface GetLocationResponse {
	location?: LocationResult;
	error?: SpacetradersError;
}

export const getLocation = async (
	locationId: string,
	token: string
): Promise<GetLocationResponse> =>
	fetchSpacetraders({
		path: `/locations/${locationId}`,
		headers: { Authorization: `Bearer ${token}` }
	});

export const getSystemLocations = async (
	systemId: string,
	token: string
): Promise<SystemLocationResponse> =>
	fetchSpacetraders({
		path: `/systems/${systemId}/locations`,
		headers: { Authorization: `Bearer ${token}` }
	});

export const batchGetLocations =
	(token: string) =>
	async (keys: string[]): Promise<Array<LocationResult | Error>> => {
		const keySet = new Set(keys);

		const locationPromises: Array<
			Promise<GetLocationResponse['location'] | Error>
		> = [];

		for (const key of keySet) {
			locationPromises.push(
				getLocation(key, token)
					.then((r) => {
						return r?.location ? r.location : new Error(r?.error.message);
					})
					.catch((e) => new Error(e))
			);
		}

		const locationResults = await Promise.all(locationPromises);

		return keys.map((key) => {
			const location =
				locationResults.find((location) => {
					if (!(location instanceof Error)) {
						return location.symbol === key;
					}
					return false;
				}) ?? new Error(`Location ${key} not found`);

			return location;
		});
	};
