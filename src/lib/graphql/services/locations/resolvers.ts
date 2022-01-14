import { getLocation, getLocationMarketplace } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemLocations } from './data';

export const resolvers: Resolvers = {
	Query: {
		location: async (_, { id }, { user }) => {
			const { location } = await getLocation(id, user?.token);

			return { ...location, id: location.symbol };
		}
	},
	Mutation: {},
	Ship: {
		location: async ({ location: { id } }, _, { user }) => {
			const { location } = await getLocation(id, user?.token);
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
		marketplace: async ({ id }, _, { user }) => {
			const { marketplace } = await getLocationMarketplace(id, user?.token);
			return marketplace;
		}
	}
};
