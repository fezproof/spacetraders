import { getLeaderboard, getStatus } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

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
	},
	Game: {
		leaderboard: async (_, __, { user }) => {
			const { netWorth } = await getLeaderboard(user?.token);
			return netWorth;
		}
	}
};
