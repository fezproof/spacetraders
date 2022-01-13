import { getLocation, getLocationMarketplace } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		location: async (_, { id }) => {
			const { location } = await getLocation(id);

			return { ...location, id: location.symbol };
		}
	},
	Mutation: {},
	Ship: {
		location: async ({ location: { id } }) => {
			const { location } = await getLocation(id);
			return { ...location, id: location.symbol };
		}
	},
	Location: {
		marketplace: async ({ id }) => {
			const { marketplace } = await getLocationMarketplace(id);
			return marketplace;
		}
	}
};
