import { getLocationMarketplace } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemLocations } from './data';

export const resolvers: Resolvers = {
	Query: {
		location: async (_, { id }, { dataloaders }) => {
			const location = await dataloaders.location.load(id);

			return { ...location, id: location.symbol };
		}
	},
	Mutation: {},
	Ship: {
		location: async ({ location: { id } }, _, { dataloaders }) => {
			const location = await dataloaders.location.load(id);

			return { ...location, id: location.symbol };
		}
	},
	System: {
		locations: async ({ id }, _, { user }) => {
			const { locations } = await getSystemLocations(id, user?.token);
			return locations.map((location) => ({
				...location,
				id: location.symbol
			}));
		}
	},
	Location: {
		name: async ({ id }, _, { dataloaders }) => {
			const location = await dataloaders.location.load(id);
			return location.name;
		},
		traits: async ({ id }, _, { dataloaders }) => {
			const location = await dataloaders.location.load(id);
			return location.traits;
		},
		type: async ({ id }, _, { dataloaders }) => {
			const location = await dataloaders.location.load(id);
			return location.type;
		},
		x: async ({ id }, _, { dataloaders }) => {
			const location = await dataloaders.location.load(id);
			return location.x;
		},
		y: async ({ id }, _, { dataloaders }) => {
			const location = await dataloaders.location.load(id);
			return location.y;
		},
		marketplace: async ({ id }, _, { user }) => {
			const { marketplace } = await getLocationMarketplace(id, user?.token);
			return marketplace;
		}
	}
};
