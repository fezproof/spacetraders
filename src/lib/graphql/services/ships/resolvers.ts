import { getMyShips } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {},
	Mutation: {},
	Account: {
		ships: async (_, __, { user }) => {
			const { ships } = await getMyShips(user?.token);

			return ships.map((ship) => ({ ...ship, location: { id: ship.location } }));
		}
	}
};
