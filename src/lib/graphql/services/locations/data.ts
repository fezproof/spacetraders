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
	location?: LocationResult;
	error?: string;
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
			const keySet = new Set(keys);

			const locationPromises: Array<
				Promise<GetLocationResponse['location'] | Error>
			> = [];

			for (const key of keySet) {
				locationPromises.push(
					getLocation(key, token)
						.then((r) => {
							return r?.location ? r.location : new Error(r.error);
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
		},
		{
			batchScheduleFn: (callback) => setTimeout(callback),
			cacheKeyFn: (key) => `Location:${key}`,
			cacheMap,
			cache: true
		}
	);
