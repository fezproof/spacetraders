import { getLocation, getLocationMarketplace } from '$lib/api';

export const resolvers = {
	Query: {
		location: async (_, { id }) => {
			const { location } = await getLocation(id);

			return { ...location, id: location.symbol };
		}
	},
	Mutation: {},
	Ship: {
		location: async ({ location: locationId }) => {
			const { location } = await getLocation(locationId);
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
