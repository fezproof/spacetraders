import { getMe } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		me: async (_, __, { user }) => {
			const me = await getMe(user?.token);
			return me.user;
		}
	}
};
