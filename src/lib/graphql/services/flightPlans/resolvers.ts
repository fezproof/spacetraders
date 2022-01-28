import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemFlightPlans } from './data';
import seedRandom from 'seedrandom';

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
				ship: {
					id: flightPlan.shipId,
					type: flightPlan.shipType,
					flightPlanId: flightPlan.id
				}
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
	},
	FlightPlan: {
		flightCode: async ({ id, ship }) => {
			const flightCode = ship?.type?.length ? ship.type.substring(0, 2) : 'UK';

			const rng = seedRandom(id);
			const flightNum = rng() * 9999;

			return flightCode.concat('-', Math.floor(flightNum).toString());
		}
	}
};
