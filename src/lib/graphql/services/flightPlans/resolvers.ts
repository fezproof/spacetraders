import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemFlightPlans } from './data';

export const resolvers: Resolvers = {
	Query: {},
	Mutation: {},
	System: {
		activeFlights: async ({ id }, _, { user }) => {
			const { flightPlans } = await getSystemFlightPlans(id, user?.token);
			return flightPlans.map(({ id, departure, destination }) => ({
				id,
				departure: { id: departure },
				destination: { id: destination }
			}));
		}
	}
};
