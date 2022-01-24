import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import type { Dataloaders } from './dataloaders';
import { accountResolvers, accountTypes } from './services/accounts';
import { baseResolvers, baseTypes } from './services/base';
import { flightPlanResolvers, flightPlanTypes } from './services/flightPlans';
import { locationResolvers, locationTypes } from './services/locations';
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
	dataloaders: Dataloaders;
	user?: {
		token: string;
		username: string;
	};
}
