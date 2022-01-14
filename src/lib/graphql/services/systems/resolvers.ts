import type { Resolvers } from '$lib/graphql/generated/resolvers';
import { getSystemInfo } from './data';

export const resolvers: Resolvers = {
	Query: {
		system: async (_, { id }, { user }) => {
			const { system } = await getSystemInfo(id, user?.token);

			return { id: system.symbol, name: system.name };
		}
	}
};
