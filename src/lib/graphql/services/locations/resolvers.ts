import { getLocation, getLocationMarketplace } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		location: async (_, { id }, { token }) => {
			const { location } = await getLocation(id, token);

			return { ...location, id: location.symbol };
		}
	},
	Mutation: {},
	Ship: {
		location: async ({ location: { id } }, _, { token }) => {
			const { location } = await getLocation(id, token);
			return { ...location, id: location.symbol };
		}
	},
	Location: {
		marketplace: async ({ id }, _, { token }) => {
			const { marketplace } = await getLocationMarketplace(id, token);
			return marketplace;
		}
	}
};
