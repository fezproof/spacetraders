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
	status?: Maybe<Scalars['String']>;
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
	game?: Maybe<Game>;
	location?: Maybe<Location>;
	me?: Maybe<Account>;
};

export type QueryLocationArgs = {
	id: Scalars['ID'];
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
	game?:
		| { __typename?: 'Game'; status?: string | null | undefined }
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
