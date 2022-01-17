import { getMe } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';
import seedRandom from 'seedrandom';

export const resolvers: Resolvers = {
	Account: {
		colour: ({ username }) => {
			const rng = seedRandom(username);
			const colour = rng() * 0xffffff;
			return Math.floor(colour);
		}
	},
	Query: {
		me: async (_, __, { user }) => {
			const me = await getMe(user?.token);
			return me.user;
		}
	}
};
