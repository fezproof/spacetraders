import type {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig
} from 'graphql';
import type { Context } from '$lib/graphql/schema';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
	[X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
	BigInt: any;
};

export type Account = {
	readonly __typename?: 'Account';
	readonly colour?: Maybe<Scalars['Int']>;
	readonly credits?: Maybe<Scalars['Int']>;
	readonly joinedAt?: Maybe<Scalars['String']>;
	readonly shipCount?: Maybe<Scalars['Int']>;
	readonly ships?: Maybe<ReadonlyArray<Maybe<Ship>>>;
	readonly structureCount?: Maybe<Scalars['Int']>;
	readonly username: Scalars['String'];
};

export type Cargo = {
	readonly __typename?: 'Cargo';
	readonly good?: Maybe<Scalars['String']>;
	readonly quantity?: Maybe<Scalars['Int']>;
	readonly totalVolume?: Maybe<Scalars['Int']>;
};

export type FlightPlan = {
	readonly __typename?: 'FlightPlan';
	readonly arrivesAt?: Maybe<Scalars['String']>;
	readonly createdAt?: Maybe<Scalars['String']>;
	readonly departure?: Maybe<Location>;
	readonly destination?: Maybe<Location>;
	readonly flightCode?: Maybe<Scalars['String']>;
	readonly id: Scalars['ID'];
	readonly owner?: Maybe<Account>;
	readonly ship?: Maybe<Ship>;
};

export type Game = {
	readonly __typename?: 'Game';
	readonly leaderboard?: Maybe<ReadonlyArray<Rank>>;
	readonly status: Scalars['String'];
};

export type Location = {
	readonly __typename?: 'Location';
	readonly allowsConstruction?: Maybe<Scalars['Boolean']>;
	readonly dockedShips?: Maybe<Scalars['Int']>;
	readonly id: Scalars['ID'];
	readonly marketplace?: Maybe<ReadonlyArray<Maybe<MarketRecord>>>;
	readonly myShips?: Maybe<ReadonlyArray<Maybe<Ship>>>;
	readonly name?: Maybe<Scalars['String']>;
	readonly parent?: Maybe<LocationParent>;
	readonly traits?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
	readonly type?: Maybe<LocationType>;
	readonly x?: Maybe<Scalars['Int']>;
	readonly y?: Maybe<Scalars['Int']>;
};

export type LocationParent = Location | System;

export enum LocationType {
	Asteroid = 'ASTEROID',
	GasGiant = 'GAS_GIANT',
	Moon = 'MOON',
	Nebula = 'NEBULA',
	Planet = 'PLANET',
	Wormhole = 'WORMHOLE'
}

export type MarketRecord = {
	readonly __typename?: 'MarketRecord';
	readonly pricePerUnit?: Maybe<Scalars['Int']>;
	readonly purchasePricePerUnit?: Maybe<Scalars['Int']>;
	readonly quantityAvailable?: Maybe<Scalars['Int']>;
	readonly sellPricePerUnit?: Maybe<Scalars['Int']>;
	readonly spread?: Maybe<Scalars['Int']>;
	readonly symbol?: Maybe<Scalars['String']>;
	readonly volumePerUnit?: Maybe<Scalars['Int']>;
};

export type Mutation = {
	readonly __typename?: 'Mutation';
	readonly game?: Maybe<Game>;
};

export type Query = {
	readonly __typename?: 'Query';
	readonly flightPlan?: Maybe<FlightPlan>;
	readonly game: Game;
	readonly location?: Maybe<Location>;
	readonly me?: Maybe<Account>;
	readonly system?: Maybe<System>;
};

export type QueryFlightPlanArgs = {
	id: Scalars['ID'];
	systemId: Scalars['ID'];
};

export type QueryLocationArgs = {
	id: Scalars['ID'];
};

export type QuerySystemArgs = {
	id: Scalars['ID'];
};

export type Rank = {
	readonly __typename?: 'Rank';
	readonly netWorth?: Maybe<Scalars['BigInt']>;
	readonly rank?: Maybe<Scalars['Int']>;
	readonly username?: Maybe<Scalars['String']>;
};

export type Ship = {
	readonly __typename?: 'Ship';
	readonly cargo?: Maybe<ReadonlyArray<Cargo>>;
	readonly class?: Maybe<Scalars['String']>;
	readonly flightPlanId?: Maybe<Scalars['ID']>;
	readonly id: Scalars['ID'];
	readonly loadingSpeed?: Maybe<Scalars['Int']>;
	readonly location?: Maybe<Location>;
	readonly manufacturer?: Maybe<Scalars['String']>;
	readonly maxCargo?: Maybe<Scalars['Int']>;
	readonly plating?: Maybe<Scalars['Int']>;
	readonly spaceAvailable?: Maybe<Scalars['Int']>;
	readonly speed?: Maybe<Scalars['Int']>;
	readonly type?: Maybe<Scalars['String']>;
	readonly weapons?: Maybe<Scalars['Int']>;
	readonly x?: Maybe<Scalars['Int']>;
	readonly y?: Maybe<Scalars['Int']>;
};

export type System = {
	readonly __typename?: 'System';
	readonly activeFlights?: Maybe<ReadonlyArray<Maybe<FlightPlan>>>;
	readonly id: Scalars['ID'];
	readonly locations?: Maybe<ReadonlyArray<Maybe<Location>>>;
	readonly name?: Maybe<Scalars['String']>;
	readonly x?: Maybe<Scalars['Int']>;
	readonly y?: Maybe<Scalars['Int']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Account: ResolverTypeWrapper<Account>;
	BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	Cargo: ResolverTypeWrapper<Cargo>;
	FlightPlan: ResolverTypeWrapper<FlightPlan>;
	Game: ResolverTypeWrapper<Game>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	Int: ResolverTypeWrapper<Scalars['Int']>;
	Location: ResolverTypeWrapper<
		Omit<Location, 'parent'> & {
			parent?: Maybe<ResolversTypes['LocationParent']>;
		}
	>;
	LocationParent: ResolversTypes['Location'] | ResolversTypes['System'];
	LocationType: LocationType;
	MarketRecord: ResolverTypeWrapper<MarketRecord>;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	Rank: ResolverTypeWrapper<Rank>;
	Ship: ResolverTypeWrapper<Ship>;
	String: ResolverTypeWrapper<Scalars['String']>;
	System: ResolverTypeWrapper<System>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Account: Account;
	BigInt: Scalars['BigInt'];
	Boolean: Scalars['Boolean'];
	Cargo: Cargo;
	FlightPlan: FlightPlan;
	Game: Game;
	ID: Scalars['ID'];
	Int: Scalars['Int'];
	Location: Omit<Location, 'parent'> & {
		parent?: Maybe<ResolversParentTypes['LocationParent']>;
	};
	LocationParent:
		| ResolversParentTypes['Location']
		| ResolversParentTypes['System'];
	MarketRecord: MarketRecord;
	Mutation: {};
	Query: {};
	Rank: Rank;
	Ship: Ship;
	String: Scalars['String'];
	System: System;
};

export type AccountResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = {
	colour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	credits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	joinedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	shipCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	ships?: Resolver<
		Maybe<ReadonlyArray<Maybe<ResolversTypes['Ship']>>>,
		ParentType,
		ContextType
	>;
	structureCount?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
	name: 'BigInt';
}

export type CargoResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Cargo'] = ResolversParentTypes['Cargo']
> = {
	good?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	totalVolume?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlightPlanResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['FlightPlan'] = ResolversParentTypes['FlightPlan']
> = {
	arrivesAt?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	createdAt?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	departure?: Resolver<
		Maybe<ResolversTypes['Location']>,
		ParentType,
		ContextType
	>;
	destination?: Resolver<
		Maybe<ResolversTypes['Location']>,
		ParentType,
		ContextType
	>;
	flightCode?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	owner?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
	ship?: Resolver<Maybe<ResolversTypes['Ship']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']
> = {
	leaderboard?: Resolver<
		Maybe<ReadonlyArray<ResolversTypes['Rank']>>,
		ParentType,
		ContextType
	>;
	status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
	allowsConstruction?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType
	>;
	dockedShips?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	marketplace?: Resolver<
		Maybe<ReadonlyArray<Maybe<ResolversTypes['MarketRecord']>>>,
		ParentType,
		ContextType
	>;
	myShips?: Resolver<
		Maybe<ReadonlyArray<Maybe<ResolversTypes['Ship']>>>,
		ParentType,
		ContextType
	>;
	name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	parent?: Resolver<
		Maybe<ResolversTypes['LocationParent']>,
		ParentType,
		ContextType
	>;
	traits?: Resolver<
		Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>,
		ParentType,
		ContextType
	>;
	type?: Resolver<
		Maybe<ResolversTypes['LocationType']>,
		ParentType,
		ContextType
	>;
	x?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	y?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationParentResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['LocationParent'] = ResolversParentTypes['LocationParent']
> = {
	__resolveType: TypeResolveFn<'Location' | 'System', ParentType, ContextType>;
};

export type MarketRecordResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['MarketRecord'] = ResolversParentTypes['MarketRecord']
> = {
	pricePerUnit?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	purchasePricePerUnit?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	quantityAvailable?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	sellPricePerUnit?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	spread?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	volumePerUnit?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	flightPlan?: Resolver<
		Maybe<ResolversTypes['FlightPlan']>,
		ParentType,
		ContextType,
		RequireFields<QueryFlightPlanArgs, 'id' | 'systemId'>
	>;
	game?: Resolver<ResolversTypes['Game'], ParentType, ContextType>;
	location?: Resolver<
		Maybe<ResolversTypes['Location']>,
		ParentType,
		ContextType,
		RequireFields<QueryLocationArgs, 'id'>
	>;
	me?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
	system?: Resolver<
		Maybe<ResolversTypes['System']>,
		ParentType,
		ContextType,
		RequireFields<QuerySystemArgs, 'id'>
	>;
};

export type RankResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Rank'] = ResolversParentTypes['Rank']
> = {
	netWorth?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
	rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShipResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['Ship'] = ResolversParentTypes['Ship']
> = {
	cargo?: Resolver<
		Maybe<ReadonlyArray<ResolversTypes['Cargo']>>,
		ParentType,
		ContextType
	>;
	class?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	flightPlanId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	loadingSpeed?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	location?: Resolver<
		Maybe<ResolversTypes['Location']>,
		ParentType,
		ContextType
	>;
	manufacturer?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	maxCargo?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	plating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	spaceAvailable?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	speed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	weapons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	x?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	y?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SystemResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes['System'] = ResolversParentTypes['System']
> = {
	activeFlights?: Resolver<
		Maybe<ReadonlyArray<Maybe<ResolversTypes['FlightPlan']>>>,
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	locations?: Resolver<
		Maybe<ReadonlyArray<Maybe<ResolversTypes['Location']>>>,
		ParentType,
		ContextType
	>;
	name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	x?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	y?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
	Account?: AccountResolvers<ContextType>;
	BigInt?: GraphQLScalarType;
	Cargo?: CargoResolvers<ContextType>;
	FlightPlan?: FlightPlanResolvers<ContextType>;
	Game?: GameResolvers<ContextType>;
	Location?: LocationResolvers<ContextType>;
	LocationParent?: LocationParentResolvers<ContextType>;
	MarketRecord?: MarketRecordResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Rank?: RankResolvers<ContextType>;
	Ship?: ShipResolvers<ContextType>;
	System?: SystemResolvers<ContextType>;
};
