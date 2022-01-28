import { getLocationMarketplace } from '$lib/api';
import { LocationType, Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemLocations } from './data';

export const resolvers: Resolvers = {
	Query: {
		location: async (_, { id }, { dataloaders }) => {
			const location = await dataloaders.location.load(id);

			return { ...location, id: location.symbol };
		}
	},
	Mutation: {},
	System: {
		locations: async ({ id }, _, { user, dataloaders }) => {
			const { locations } = await getSystemLocations(id, user?.token);

			return locations.map((location) => {
				if (location) {
					const locationResult = {
						...location,
						id: location.symbol
					};
					dataloaders.location.prime(locationResult.id, locationResult);
					return locationResult;
				}
				return null;
			});
		}
	},
	Location: {
		name: async ({ id }, _, { dataloaders }) => {
			const { name } = await dataloaders.location.load(id);

			return name;
		},
		type: async ({ id }, _, { dataloaders }) => {
			const { type } = await dataloaders.location.load(id);

			return type;
		},
		traits: async ({ id }, _, { dataloaders }) => {
			const { traits } = await dataloaders.location.load(id);

			return traits;
		},
		allowsConstruction: async ({ id }, _, { dataloaders }) => {
			const { allowsConstruction } = await dataloaders.location.load(id);

			return allowsConstruction;
		},
		// dockedShips: async ({ id }, _, { dataloaders }) => {
		// 	const { dockedShips } = await dataloaders.location.load(id);
		// 	return dockedShips;
		// },
		x: async ({ id }, _, { dataloaders }) => {
			const { x } = await dataloaders.location.load(id);

			return x;
		},
		y: async ({ id }, _, { dataloaders }) => {
			const { y } = await dataloaders.location.load(id);

			return y;
		},
		marketplace: async ({ id }, _, { user }) => {
			const { marketplace } = await getLocationMarketplace(id, user?.token);
			return marketplace;
		},
		parent: async ({ id, type }) => {
			const segments = id.split('-');
			if (segments.length === 2 || type === LocationType.Wormhole)
				return { id: segments[0], __typename: 'System' as const };

			if (segments.length > 2)
				return {
					id: segments.slice(0, segments.length - 1).join('-'),
					__typename: 'Location' as const
				};

			throw new Error(`Failed to find parent for location ${id}`);
		},
		size: async ({ id }, _, { dataloaders }) => {
			const { type } = await dataloaders.location.load(id);
			if (!type) return 1;

			return LOCATION_SIZES[type];
		}
	}
};

export const LOCATION_SIZES: Record<LocationType, number> = {
	ASTEROID: 0.5,
	MOON: 0.5,
	GAS_GIANT: 3,
	PLANET: 1,
	NEBULA: 5,
	WORMHOLE: 1
};
