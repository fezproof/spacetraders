export const types = /* GraphQL */ `
	type MarketRecord {
		symbol: String
		volumePerUnit: Int
		pricePerUnit: Int
		spread: Int
		purchasePricePerUnit: Int
		sellPricePerUnit: Int
		quantityAvailable: Int
	}

	type Location {
		id: ID!
		type: String
		name: String
		x: Int!
		y: Int!
		allowsConstruction: Boolean
		traits: [String]
		dockedShips: Int
		marketplace: [MarketRecord]
	}

	extend type Ship {
		location: Location
	}

	extend type System {
		locations: [Location!]
	}

	extend type FlightPlan {
		destination: Location
		departure: Location
	}

	extend type Query {
		location(id: ID!): Location
	}
`;
