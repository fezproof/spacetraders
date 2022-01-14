import { getMyShips } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {},
	Mutation: {},
	Account: {
		ships: async (_, __, { token }) => {
			const { ships } = await getMyShips(token);

			return ships.map((ship) => ({ ...ship, location: { id: ship.location } }));
		}
	}
};
