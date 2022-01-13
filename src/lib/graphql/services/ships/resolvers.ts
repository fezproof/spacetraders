import { getMyShips } from '$lib/api';
import type { Resolvers } from 'src/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {},
	Mutation: {},
	Account: {
		ships: async () => {
			const { ships } = await getMyShips();

			return ships.map((ship) => ({ ...ship, location: { id: ship.location } }));
		}
	}
};
