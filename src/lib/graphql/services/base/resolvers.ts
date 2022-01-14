import { getLeaderboard, getStatus } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		game: async () => {
			const { status } = await getStatus();
			return { status };
		}
	},
	Mutation: {
		game: async () => {
			const { status } = await getStatus();
			return { status };
		}
	},
	Game: {
		leaderboard: async (_, __, { user }) => {
			const { netWorth } = await getLeaderboard(user?.token);
			return netWorth;
		}
	}
};
