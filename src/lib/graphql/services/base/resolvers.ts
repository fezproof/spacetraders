import { getStatus } from '$lib/api';

export const resolvers = {
	Query: {
		game: async () => {
			return getStatus();
		}
	},
	Mutation: {
		game: async () => {
			return getStatus();
		}
	}
};
