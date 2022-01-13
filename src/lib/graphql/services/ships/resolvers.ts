import { getMyShips } from '$lib/api';

export const resolvers = {
	Query: {},
	Mutation: {},
	Account: {
		ships: async () => {
			const ships = await getMyShips();

			return ships.ships;
		}
	}
};
