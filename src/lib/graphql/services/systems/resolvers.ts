import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {
		system: async (_, { id }, { dataloaders }) => {
			const system = await dataloaders.system.load(id);

			return { id: system.symbol, name: system.name };
		}
	},
	System: {
		name: async ({ id }, _, { dataloaders }) => {
			const system = await dataloaders.system.load(id);

			return system.name;
		}
	}
};
