import { getMe } from '$lib/api';

export const resolvers = {
	Query: {
		me: async () => {
			const me = await getMe();
			console.log(me);
			return me.user;
		}
	}
};
