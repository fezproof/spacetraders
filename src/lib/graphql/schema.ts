import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import { baseResolvers, baseTypes } from './services/base';
import { accountResolvers, accountTypes } from './services/accounts';
import { shipResolvers, shipTypes } from './services/ships';
import { locationResolvers, locationTypes } from './services/locations';
import { systemResolvers, systemTypes } from './services/systems';
import { flightPlanResolvers, flightPlanTypes } from './services/flightPlans';

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
}
