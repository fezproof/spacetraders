import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemFlightPlans } from './data';

export const resolvers: Resolvers = {
	Query: {
		flightPlan: async (_, { id, systemId }, { user }) => {
			const { flightPlans } = await getSystemFlightPlans(systemId, user?.token);

			const { departure, destination, ...flightPlan } = flightPlans.find(
				({ id: flightId }) => id === flightId
			);

			if (!flightPlan) return null;

			return {
				...flightPlan,
				owner: { username: flightPlan.username },
				departure: { id: departure },
				destination: {
					id: destination
				},
				ship: { id: flightPlan.shipId, type: flightPlan.shipType }
			};
		}
	},
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
