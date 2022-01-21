import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import { accountResolvers, accountTypes } from './services/accounts';
import { baseResolvers, baseTypes } from './services/base';
import { flightPlanResolvers, flightPlanTypes } from './services/flightPlans';
import { locationResolvers, locationTypes } from './services/locations';
import type { createLocationDataLoader } from './services/locations/data';
import { shipResolvers, shipTypes } from './services/ships';
import { systemResolvers, systemTypes } from './services/systems';

export const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [
		baseTypes,
		accountTypes,
		shipTypes,
		locationTypes,
		systemTypes,
		flightPlanTypes
	],
	resolvers: [
		baseResolvers,
		accountResolvers,
		shipResolvers,
		locationResolvers,
		systemResolvers,
		flightPlanResolvers
	]
});

export interface Context {
	user?: {
		token: string;
		username: string;
	};
	dataloaders: {
		location: ReturnType<typeof createLocationDataLoader>;
	};
}
