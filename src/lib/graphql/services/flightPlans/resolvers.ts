import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemFlightPlans } from './data';

export const resolvers: Resolvers = {
	Query: {},
	Mutation: {},
	System: {
		activeFlights: async ({ id }, _, { user }) => {
			const { flightPlans } = await getSystemFlightPlans(id, user?.token);
			const activeFlights = flightPlans.map(
				({ id, arrivesAt, createdAt, departure, destination, username }) => {
					return {
						id,
						arrivesAt,
						createdAt,
						owner: { username },
						departure: { id: departure },
						destination: {
							id: destination
						}
					};
				}
			);
			return activeFlights;
		}
	}
};
