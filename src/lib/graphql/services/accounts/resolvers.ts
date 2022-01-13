import { getMe } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		me: async () => {
			const me = await getMe();
			console.log(me);
			return me.user;
		}
	}
};
