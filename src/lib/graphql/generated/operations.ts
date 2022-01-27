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
	/** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
	BigInt: any;
};

export type Account = {
	__typename?: 'Account';
	colour?: Maybe<Scalars['Int']>;
	credits?: Maybe<Scalars['Int']>;
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

export type FlightPlan = {
	__typename?: 'FlightPlan';
	arrivesAt?: Maybe<Scalars['String']>;
	createdAt?: Maybe<Scalars['String']>;
	departure?: Maybe<Location>;
	destination?: Maybe<Location>;
	flightCode?: Maybe<Scalars['String']>;
	id: Scalars['ID'];
	owner?: Maybe<Account>;
	ship?: Maybe<Ship>;
};

export type Game = {
	__typename?: 'Game';
	leaderboard?: Maybe<Array<Rank>>;
	status: Scalars['String'];
};

export type Location = {
	__typename?: 'Location';
	allowsConstruction?: Maybe<Scalars['Boolean']>;
	dockedShips?: Maybe<Scalars['Int']>;
	id: Scalars['ID'];
	marketplace?: Maybe<Array<Maybe<MarketRecord>>>;
	myShips?: Maybe<Array<Maybe<Ship>>>;
	name?: Maybe<Scalars['String']>;
	parent?: Maybe<LocationParent>;
	traits?: Maybe<Array<Maybe<Scalars['String']>>>;
	type?: Maybe<LocationType>;
	x?: Maybe<Scalars['Int']>;
	y?: Maybe<Scalars['Int']>;
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
	flightPlan?: Maybe<FlightPlan>;
	game: Game;
	location?: Maybe<Location>;
	me?: Maybe<Account>;
	system?: Maybe<System>;
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
	__typename?: 'Rank';
	netWorth?: Maybe<Scalars['BigInt']>;
	rank?: Maybe<Scalars['Int']>;
	username?: Maybe<Scalars['String']>;
};

export type Ship = {
	__typename?: 'Ship';
	cargo?: Maybe<Array<Cargo>>;
	class?: Maybe<Scalars['String']>;
	flightPlanId?: Maybe<Scalars['ID']>;
	id: Scalars['ID'];
	loadingSpeed?: Maybe<Scalars['Int']>;
	manufacturer?: Maybe<Scalars['String']>;
	maxCargo?: Maybe<Scalars['Int']>;
	plating?: Maybe<Scalars['Int']>;
	position?: Maybe<ShipPosition>;
	spaceAvailable?: Maybe<Scalars['Int']>;
	speed?: Maybe<Scalars['Int']>;
	type?: Maybe<Scalars['String']>;
	weapons?: Maybe<Scalars['Int']>;
};

export type ShipPosition = FlightPlan | Location;

export type System = {
	__typename?: 'System';
	activeFlights?: Maybe<Array<Maybe<FlightPlan>>>;
	id: Scalars['ID'];
	locations?: Maybe<Array<Maybe<Location>>>;
	name?: Maybe<Scalars['String']>;
	x?: Maybe<Scalars['Int']>;
	y?: Maybe<Scalars['Int']>;
};

export type FlightPlanDetailsQueryVariables = Exact<{
	flightPlanId: Scalars['ID'];
	systemId: Scalars['ID'];
}>;

export type FlightPlanDetailsQuery = {
	__typename?: 'Query';
	flightPlan?:
		| {
				__typename?: 'FlightPlan';
				id: string;
				flightCode?: string | null | undefined;
				owner?:
					| {
							__typename?: 'Account';
							username: string;
							colour?: number | null | undefined;
					  }
					| null
					| undefined;
				ship?:
					| {
							__typename?: 'Ship';
							id: string;
							type?: string | null | undefined;
					  }
					| null
					| undefined;
				destination?:
					| {
							__typename?: 'Location';
							id: string;
							name?: string | null | undefined;
							x?: number | null | undefined;
							y?: number | null | undefined;
					  }
					| null
					| undefined;
				departure?:
					| {
							__typename?: 'Location';
							id: string;
							name?: string | null | undefined;
							x?: number | null | undefined;
							y?: number | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
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
		leaderboard?:
			| Array<{
					__typename?: 'Rank';
					rank?: number | null | undefined;
					username?: string | null | undefined;
					netWorth?: any | null | undefined;
			  }>
			| null
			| undefined;
	};
};

export type LocationDetailsQueryVariables = Exact<{
	locationId: Scalars['ID'];
}>;

export type LocationDetailsQuery = {
	__typename?: 'Query';
	location?:
		| {
				__typename?: 'Location';
				id: string;
				name?: string | null | undefined;
				type?: LocationType | null | undefined;
				traits?: Array<string | null | undefined> | null | undefined;
				x?: number | null | undefined;
				y?: number | null | undefined;
				marketplace?:
					| Array<
							| {
									__typename?: 'MarketRecord';
									symbol?: string | null | undefined;
									volumePerUnit?: number | null | undefined;
									pricePerUnit?: number | null | undefined;
									quantityAvailable?: number | null | undefined;
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
									position?:
										| {
												__typename?: 'FlightPlan';
												id: string;
												arrivesAt?: string | null | undefined;
										  }
										| {
												__typename?: 'Location';
												id: string;
												x?: number | null | undefined;
												y?: number | null | undefined;
										  }
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

export type SystemDataQueryVariables = Exact<{
	systemId: Scalars['ID'];
}>;

export type SystemDataQuery = {
	__typename?: 'Query';
	system?:
		| {
				__typename?: 'System';
				id: string;
				name?: string | null | undefined;
				locations?:
					| Array<
							| {
									__typename?: 'Location';
									id: string;
									type?: LocationType | null | undefined;
									name?: string | null | undefined;
									x?: number | null | undefined;
									y?: number | null | undefined;
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

export type SystemFlightsQueryVariables = Exact<{
	systemId: Scalars['ID'];
}>;

export type SystemFlightsQuery = {
	__typename?: 'Query';
	system?:
		| {
				__typename?: 'System';
				id: string;
				activeFlights?:
					| Array<
							| {
									__typename?: 'FlightPlan';
									id: string;
									createdAt?: string | null | undefined;
									arrivesAt?: string | null | undefined;
									owner?:
										| {
												__typename?: 'Account';
												username: string;
												colour?: number | null | undefined;
										  }
										| null
										| undefined;
									departure?:
										| {
												__typename?: 'Location';
												id: string;
												type?: LocationType | null | undefined;
												x?: number | null | undefined;
												y?: number | null | undefined;
										  }
										| null
										| undefined;
									destination?:
										| {
												__typename?: 'Location';
												id: string;
												type?: LocationType | null | undefined;
												x?: number | null | undefined;
												y?: number | null | undefined;
										  }
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

export type LocationDataFragment = {
	__typename?: 'Location';
	id: string;
	type?: LocationType | null | undefined;
	name?: string | null | undefined;
	x?: number | null | undefined;
	y?: number | null | undefined;
};

export type SystemFlightPlanFragment = {
	__typename?: 'FlightPlan';
	id: string;
	createdAt?: string | null | undefined;
	arrivesAt?: string | null | undefined;
	owner?:
		| {
				__typename?: 'Account';
				username: string;
				colour?: number | null | undefined;
		  }
		| null
		| undefined;
	departure?:
		| {
				__typename?: 'Location';
				id: string;
				type?: LocationType | null | undefined;
				x?: number | null | undefined;
				y?: number | null | undefined;
		  }
		| null
		| undefined;
	destination?:
		| {
				__typename?: 'Location';
				id: string;
				type?: LocationType | null | undefined;
				x?: number | null | undefined;
				y?: number | null | undefined;
		  }
		| null
		| undefined;
};

export const LocationDataFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'LocationData' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Location' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'x' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'y' } }
				]
			}
		}
	]
} as unknown as DocumentNode<LocationDataFragment, unknown>;
export const SystemFlightPlanFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'SystemFlightPlan' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'FlightPlan' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'arrivesAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'owner' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'username' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'colour' } }
							]
						}
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'departure' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'x' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'y' } }
							]
						}
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'destination' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'x' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'y' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SystemFlightPlanFragment, unknown>;
export const FlightPlanDetailsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'FlightPlanDetails' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'flightPlanId' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'systemId' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'flightPlan' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'flightPlanId' }
								}
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'systemId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'systemId' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'flightCode' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'owner' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'username' }
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'colour' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'ship' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'type' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'destination' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'x' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'y' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'departure' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'x' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'y' } }
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
} as unknown as DocumentNode<
	FlightPlanDetailsQuery,
	FlightPlanDetailsQueryVariables
>;
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
export const LocationDetailsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LocationDetails' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'locationId' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'location' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'locationId' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'marketplace' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'symbol' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'volumePerUnit' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'pricePerUnit' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'quantityAvailable' }
											}
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'traits' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'x' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'y' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	LocationDetailsQuery,
	LocationDetailsQueryVariables
>;
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
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'position' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'InlineFragment',
															typeCondition: {
																kind: 'NamedType',
																name: { kind: 'Name', value: 'Location' }
															},
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'id' }
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'x' }
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'y' }
																	}
																]
															}
														},
														{
															kind: 'InlineFragment',
															typeCondition: {
																kind: 'NamedType',
																name: { kind: 'Name', value: 'FlightPlan' }
															},
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'id' }
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'arrivesAt' }
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
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MyShipsQuery, MyShipsQueryVariables>;
export const SystemDataDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'SystemData' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'systemId' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'system' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'systemId' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'locations' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'FragmentSpread',
												name: { kind: 'Name', value: 'LocationData' }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...LocationDataFragmentDoc.definitions
	]
} as unknown as DocumentNode<SystemDataQuery, SystemDataQueryVariables>;
export const SystemFlightsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'SystemFlights' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'systemId' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'system' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'systemId' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'activeFlights' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'FragmentSpread',
												name: { kind: 'Name', value: 'SystemFlightPlan' }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...SystemFlightPlanFragmentDoc.definitions
	]
} as unknown as DocumentNode<SystemFlightsQuery, SystemFlightsQueryVariables>;
