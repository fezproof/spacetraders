import { getLeaderboard, getStatus } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { BigIntResolver } from 'graphql-scalars';

export const resolvers: Resolvers = {
	BigInt: BigIntResolver,
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
