import type { IntrospectionQuery } from 'graphql';
export default {
	__schema: {
		queryType: {
			name: 'Query'
		},
		mutationType: {
			name: 'Mutation'
		},
		subscriptionType: null,
		types: [
			{
				kind: 'OBJECT',
				name: 'Account',
				fields: [
					{
						name: 'colour',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'credits',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'joinedAt',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'shipCount',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'ships',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'OBJECT',
								name: 'Ship',
								ofType: null
							}
						},
						args: []
					},
					{
						name: 'structureCount',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'username',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Cargo',
				fields: [
					{
						name: 'good',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'quantity',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'totalVolume',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'FlightPlan',
				fields: [
					{
						name: 'arrivesAt',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'createdAt',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'departure',
						type: {
							kind: 'OBJECT',
							name: 'Location',
							ofType: null
						},
						args: []
					},
					{
						name: 'destination',
						type: {
							kind: 'OBJECT',
							name: 'Location',
							ofType: null
						},
						args: []
					},
					{
						name: 'flightCode',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'id',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					},
					{
						name: 'owner',
						type: {
							kind: 'OBJECT',
							name: 'Account',
							ofType: null
						},
						args: []
					},
					{
						name: 'ship',
						type: {
							kind: 'OBJECT',
							name: 'Ship',
							ofType: null
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Game',
				fields: [
					{
						name: 'leaderboard',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'NON_NULL',
								ofType: {
									kind: 'OBJECT',
									name: 'Rank',
									ofType: null
								}
							}
						},
						args: []
					},
					{
						name: 'status',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Location',
				fields: [
					{
						name: 'allowsConstruction',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'dockedShips',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'id',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					},
					{
						name: 'marketplace',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'OBJECT',
								name: 'MarketRecord',
								ofType: null
							}
						},
						args: []
					},
					{
						name: 'myShips',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'OBJECT',
								name: 'Ship',
								ofType: null
							}
						},
						args: []
					},
					{
						name: 'name',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'parent',
						type: {
							kind: 'UNION',
							name: 'LocationParent',
							ofType: null
						},
						args: []
					},
					{
						name: 'traits',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					},
					{
						name: 'type',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'x',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'y',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'UNION',
				name: 'LocationParent',
				possibleTypes: [
					{
						kind: 'OBJECT',
						name: 'Location'
					},
					{
						kind: 'OBJECT',
						name: 'System'
					}
				]
			},
			{
				kind: 'OBJECT',
				name: 'MarketRecord',
				fields: [
					{
						name: 'pricePerUnit',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'purchasePricePerUnit',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'quantityAvailable',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'sellPricePerUnit',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'spread',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'symbol',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'volumePerUnit',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Mutation',
				fields: [
					{
						name: 'game',
						type: {
							kind: 'OBJECT',
							name: 'Game',
							ofType: null
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Query',
				fields: [
					{
						name: 'flightPlan',
						type: {
							kind: 'OBJECT',
							name: 'FlightPlan',
							ofType: null
						},
						args: [
							{
								name: 'id',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any'
									}
								}
							},
							{
								name: 'systemId',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any'
									}
								}
							}
						]
					},
					{
						name: 'game',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'Game',
								ofType: null
							}
						},
						args: []
					},
					{
						name: 'location',
						type: {
							kind: 'OBJECT',
							name: 'Location',
							ofType: null
						},
						args: [
							{
								name: 'id',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any'
									}
								}
							}
						]
					},
					{
						name: 'me',
						type: {
							kind: 'OBJECT',
							name: 'Account',
							ofType: null
						},
						args: []
					},
					{
						name: 'system',
						type: {
							kind: 'OBJECT',
							name: 'System',
							ofType: null
						},
						args: [
							{
								name: 'id',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any'
									}
								}
							}
						]
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Rank',
				fields: [
					{
						name: 'netWorth',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'rank',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'username',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'Ship',
				fields: [
					{
						name: 'cargo',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'NON_NULL',
								ofType: {
									kind: 'OBJECT',
									name: 'Cargo',
									ofType: null
								}
							}
						},
						args: []
					},
					{
						name: 'class',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'flightPlanId',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'id',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					},
					{
						name: 'loadingSpeed',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'location',
						type: {
							kind: 'OBJECT',
							name: 'Location',
							ofType: null
						},
						args: []
					},
					{
						name: 'manufacturer',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'maxCargo',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'plating',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'spaceAvailable',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'speed',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'type',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'weapons',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'x',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'y',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'OBJECT',
				name: 'System',
				fields: [
					{
						name: 'activeFlights',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'OBJECT',
								name: 'FlightPlan',
								ofType: null
							}
						},
						args: []
					},
					{
						name: 'id',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any'
							}
						},
						args: []
					},
					{
						name: 'locations',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'OBJECT',
								name: 'Location',
								ofType: null
							}
						},
						args: []
					},
					{
						name: 'name',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'x',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					},
					{
						name: 'y',
						type: {
							kind: 'SCALAR',
							name: 'Any'
						},
						args: []
					}
				],
				interfaces: []
			},
			{
				kind: 'SCALAR',
				name: 'Any'
			}
		],
		directives: []
	}
} as unknown as IntrospectionQuery;
