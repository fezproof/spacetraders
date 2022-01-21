import { fetchSpacetraders } from '$lib/api';
import type { LocationType } from '$lib/graphql/generated/resolvers';
import DataLoader from 'dataloader';

interface LocationData {
	symbol: string;
	type: LocationType;
	name: string;
	x: number;
	y: number;
	allowsConstruction: boolean;
	traits: [string];
}

interface SystemLocationResponse {
	locations: LocationData[];
}

export const getSystemLocations = async (
	systemId: string,
	token: string
): Promise<SystemLocationResponse> =>
	fetchSpacetraders({
		path: `/systems/${systemId}/locations`,
		headers: { Authorization: `Bearer ${token}` }
	});

interface LocationResponse {
	location: LocationData;
}

export const getLocationInfo = async (
	locationId: string,
	token: string
): Promise<LocationResponse> =>
	fetchSpacetraders({
		path: `/locations/${locationId}`,
		headers: { Authorization: `Bearer ${token}` }
	});

const locationCache = new Map();

export const createLocationDataLoader = (
	token: string
): DataLoader<string, LocationData> =>
	new DataLoader<string, LocationData>(
		async (ids) => {
			const locationPromises = ids.map((id) => getLocationInfo(id, token));

			const locationResponses = await Promise.all(locationPromises);

			return locationResponses.map((response) =>
				response.location
					? response.location
					: new Error('location data not found')
			);
		},
		{
			cacheMap: locationCache
		}
	);
