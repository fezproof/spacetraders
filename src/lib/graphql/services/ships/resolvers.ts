import { getMyShips } from '$lib/api';
import type { Resolvers } from '$lib/graphql/generated/resolvers';

export const resolvers: Resolvers = {
	Query: {},
	Mutation: {},
	Account: {
		ships: async (_, __, { user }) => {
			const { ships } = await getMyShips(user?.token);

			return ships.map((ship) => ({
				...ship,
				location: { id: ship.location }
			}));
		}
	},
	Location: {
		myShips: async ({ id: locationId }, _, { user }) => {
			const { ships } = await getMyShips(user.token);
			if (ships) {
				return ships
					.filter(({ location }) => location === locationId)
					.map(({ id, location, ...rest }) => ({
						id,
						location: { id: location },
						...rest
					}));
			}
			return null;
		}
	},
	Ship: {
		loadingSpeed: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.loadingSpeed;
		},
		class: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.class;
		},
		maxCargo: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.maxCargo;
		},
		speed: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.speed;
		},
		manufacturer: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.manufacturer;
		},
		plating: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.plating;
		},
		weapons: async ({ type }, _, { dataloaders }) => {
			const ship = await dataloaders.shipInfo.load(type);

			return ship.weapons;
		}
	}
};
