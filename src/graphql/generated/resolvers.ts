import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  readonly __typename?: 'Account';
  readonly credits: Scalars['Int'];
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

export type Game = {
  readonly __typename?: 'Game';
  readonly status?: Maybe<Scalars['String']>;
};

export type Location = {
  readonly __typename?: 'Location';
  readonly allowsConstruction?: Maybe<Scalars['Boolean']>;
  readonly dockedShips?: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  readonly marketplace?: Maybe<ReadonlyArray<Maybe<MarketRecord>>>;
  readonly name?: Maybe<Scalars['String']>;
  readonly traits?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly type?: Maybe<Scalars['String']>;
  readonly x?: Maybe<Scalars['Int']>;
  readonly y?: Maybe<Scalars['Int']>;
};

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
  readonly game?: Maybe<Game>;
  readonly location?: Maybe<Location>;
  readonly me?: Maybe<Account>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};

export type Ship = {
  readonly __typename?: 'Ship';
  readonly cargo?: Maybe<ReadonlyArray<Cargo>>;
  readonly class?: Maybe<Scalars['String']>;
  readonly flightPlanId?: Maybe<Scalars['ID']>;
  readonly id: Scalars['ID'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cargo: ResolverTypeWrapper<Cargo>;
  Game: ResolverTypeWrapper<Game>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Location: ResolverTypeWrapper<Location>;
  MarketRecord: ResolverTypeWrapper<MarketRecord>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Ship: ResolverTypeWrapper<Ship>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Boolean: Scalars['Boolean'];
  Cargo: Cargo;
  Game: Game;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Location: Location;
  MarketRecord: MarketRecord;
  Mutation: {};
  Query: {};
  Ship: Ship;
  String: Scalars['String'];
};

export type AccountResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  credits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  joinedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ships?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Ship']>>>, ParentType, ContextType>;
  structureCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CargoResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Cargo'] = ResolversParentTypes['Cargo']> = {
  good?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalVolume?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  allowsConstruction?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dockedShips?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  marketplace?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['MarketRecord']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  traits?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  x?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketRecordResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['MarketRecord'] = ResolversParentTypes['MarketRecord']> = {
  pricePerUnit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  purchasePricePerUnit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sellPricePerUnit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  spread?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volumePerUnit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryLocationArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
};

export type ShipResolvers<ContextType = unknown, ParentType extends ResolversParentTypes['Ship'] = ResolversParentTypes['Ship']> = {
  cargo?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Cargo']>>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flightPlanId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxCargo?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  plating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  spaceAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weapons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  x?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = unknown> = {
  Account?: AccountResolvers<ContextType>;
  Cargo?: CargoResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  MarketRecord?: MarketRecordResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Ship?: ShipResolvers<ContextType>;
};

