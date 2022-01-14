import { getMe } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		me: async (_, __, { token }) => {
			const me = await getMe(token);
			console.log(me);
			return me.user;
		}
	}
};
