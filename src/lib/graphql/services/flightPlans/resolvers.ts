import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemLocations } from '../locations/data';
import { getSystemFlightPlans } from './data';

export const resolvers: Resolvers = {
	Query: {},
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
