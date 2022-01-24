import { fetchSpacetraders } from '$lib/api';
import type { LocationType } from '$lib/graphql/generated/resolvers';
import type { CacheMap } from 'dataloader';
import DataLoader from 'dataloader';
interface LocationResult {
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
	location: LocationResult;
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

export const locationDataLoader = (
	token: string,
	cacheMap: CacheMap<string, Promise<LocationResult>>
): DataLoader<string, LocationResult> =>
	new DataLoader<string, LocationResult>(
		async (keys) => {
			const locationPromises: Array<Promise<GetLocationResponse | Error>> = [];

			for (const key of keys) {
				locationPromises.push(
					getLocation(key, token).catch((e) => new Error(e))
				);
			}

			const locationResults = await Promise.all(locationPromises);

			return locationResults.map((result) => {
				if (result instanceof Error || !result?.location) {
					return new Error('Failed to get location');
				}
				return result.location;
			});
		},
		{ batchScheduleFn: (callback) => setTimeout(callback), cacheMap }
	);
