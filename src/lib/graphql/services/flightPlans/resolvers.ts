import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemLocations } from '../locations/data';
import { getSystemFlightPlans } from './data';

export const resolvers: Resolvers = {
	Query: {
		flightPlan: async (_, { id, systemId }, { user }) => {
			const { flightPlans } = await getSystemFlightPlans(systemId, user?.token);

			const { departure, destination, ...flightPlan } = flightPlans.find(
				({ id: flightId }) => id === flightId
			);

			if (!flightPlan) return null;

			const { locations } = await getSystemLocations(systemId, user?.token);

			const departureLocation = locations.find(
				(location) => location.symbol === departure
			);
			const destinationLocation = locations.find(
				(location) => location.symbol === destination
			);

			return {
				...flightPlan,
				owner: { username: flightPlan.username },
				departure: { ...departureLocation, id: departure },
				destination: {
					...destinationLocation,
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
			const { locations } = await getSystemLocations(id, user?.token);
			const activeFlights = flightPlans.map(
				({ id, arrivesAt, createdAt, departure, destination, username }) => {
					const departureLocation = locations.find(
						(location) => location.symbol === departure
					);
					const destinationLocation = locations.find(
						(location) => location.symbol === destination
					);

					return {
						id,
						arrivesAt,
						createdAt,
						owner: { username },
						departure: { ...departureLocation, id: departure },
						destination: {
							...destinationLocation,
							id: destination
						}
					};
				}
			);
			return activeFlights;
		}
	}
};
