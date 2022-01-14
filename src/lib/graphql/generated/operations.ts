import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Account = {
	__typename?: 'Account';
	credits: Scalars['Int'];
	joinedAt?: Maybe<Scalars['String']>;
	shipCount?: Maybe<Scalars['Int']>;
	ships?: Maybe<Array<Maybe<Ship>>>;
	structureCount?: Maybe<Scalars['Int']>;
	username: Scalars['String'];
};

export type Cargo = {
	__typename?: 'Cargo';
	good?: Maybe<Scalars['String']>;
	quantity?: Maybe<Scalars['Int']>;
	totalVolume?: Maybe<Scalars['Int']>;
};

export type Game = {
	__typename?: 'Game';
	leaderboard: Array<Rank>;
	status: Scalars['String'];
};

export type Location = {
	__typename?: 'Location';
	allowsConstruction?: Maybe<Scalars['Boolean']>;
	dockedShips?: Maybe<Scalars['Int']>;
	id: Scalars['ID'];
	marketplace?: Maybe<Array<Maybe<MarketRecord>>>;
	name?: Maybe<Scalars['String']>;
	traits?: Maybe<Array<Maybe<Scalars['String']>>>;
	type?: Maybe<Scalars['String']>;
	x?: Maybe<Scalars['Int']>;
	y?: Maybe<Scalars['Int']>;
};

export type MarketRecord = {
	__typename?: 'MarketRecord';
	pricePerUnit?: Maybe<Scalars['Int']>;
	purchasePricePerUnit?: Maybe<Scalars['Int']>;
	quantityAvailable?: Maybe<Scalars['Int']>;
	sellPricePerUnit?: Maybe<Scalars['Int']>;
	spread?: Maybe<Scalars['Int']>;
	symbol?: Maybe<Scalars['String']>;
	volumePerUnit?: Maybe<Scalars['Int']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	game?: Maybe<Game>;
};

export type Query = {
	__typename?: 'Query';
	game: Game;
	location?: Maybe<Location>;
	me?: Maybe<Account>;
};

export type QueryLocationArgs = {
	id: Scalars['ID'];
};

export type Rank = {
	__typename?: 'Rank';
	netWorth?: Maybe<Scalars['Int']>;
	rank?: Maybe<Scalars['Int']>;
	username?: Maybe<Scalars['String']>;
};

export type Ship = {
	__typename?: 'Ship';
	cargo?: Maybe<Array<Cargo>>;
	class?: Maybe<Scalars['String']>;
	flightPlanId?: Maybe<Scalars['ID']>;
	id: Scalars['ID'];
	location?: Maybe<Location>;
	manufacturer?: Maybe<Scalars['String']>;
	maxCargo?: Maybe<Scalars['Int']>;
	plating?: Maybe<Scalars['Int']>;
	spaceAvailable?: Maybe<Scalars['Int']>;
	speed?: Maybe<Scalars['Int']>;
	type?: Maybe<Scalars['String']>;
	weapons?: Maybe<Scalars['Int']>;
	x?: Maybe<Scalars['Int']>;
	y?: Maybe<Scalars['Int']>;
};

export type GameStateQueryVariables = Exact<{ [key: string]: never }>;

export type GameStateQuery = {
	__typename?: 'Query';
	game: { __typename?: 'Game'; status: string };
};

export type LeaderboardQueryVariables = Exact<{ [key: string]: never }>;

export type LeaderboardQuery = {
	__typename?: 'Query';
	game: {
		__typename?: 'Game';
		leaderboard: Array<{
			__typename?: 'Rank';
			rank?: number | null | undefined;
			username?: string | null | undefined;
			netWorth?: number | null | undefined;
		}>;
	};
};

export type MyShipsQueryVariables = Exact<{ [key: string]: never }>;

export type MyShipsQuery = {
	__typename?: 'Query';
	me?:
		| {
				__typename?: 'Account';
				username: string;
				ships?:
					| Array<
							| {
									__typename?: 'Ship';
									id: string;
									class?: string | null | undefined;
									type?: string | null | undefined;
									spaceAvailable?: number | null | undefined;
									cargo?:
										| Array<{
												__typename?: 'Cargo';
												good?: string | null | undefined;
												quantity?: number | null | undefined;
												totalVolume?: number | null | undefined;
										  }>
										| null
										| undefined;
							  }
							| null
							| undefined
					  >
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export const GameStateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GameState' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'game' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'status' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GameStateQuery, GameStateQueryVariables>;
export const LeaderboardDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Leaderboard' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'game' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'leaderboard' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'rank' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'username' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'netWorth' }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LeaderboardQuery, LeaderboardQueryVariables>;
export const MyShipsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'MyShips' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'me' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'username' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'ships' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'class' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'cargo' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'good' }
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'quantity' }
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'totalVolume' }
														}
													]
												}
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'spaceAvailable' }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MyShipsQuery, MyShipsQueryVariables>;
