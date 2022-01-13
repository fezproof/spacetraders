import { getStatus } from '$lib/api';
import type { Resolvers } from 'src/graphql/generated/resolvers';

export const resolvers: Resolvers = {
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
