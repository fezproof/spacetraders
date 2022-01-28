export const types = /* GraphQL */ `
	type MarketRecord {
		symbol: String!
		name: String
		volumePerUnit: Int
		pricePerUnit: Int
		spread: Int
		purchasePricePerUnit: Int
		sellPricePerUnit: Int
		quantityAvailable: Int
	}

	enum LocationType {
		PLANET
		MOON
		ASTEROID
		GAS_GIANT
		WORMHOLE
		NEBULA
	}

	type Location {
		id: ID!
		type: LocationType
		name: String
		x: Int
		y: Int
		allowsConstruction: Boolean
		traits: [String]
		dockedShips: Int
		marketplace: [MarketRecord]
		size: Float
	}

	union LocationParent = Location | System

	extend type Location {
		parent: LocationParent
	}

	extend type System {
		locations: [Location]
	}

	extend type FlightPlan {
		destination: Location
		departure: Location
	}

	extend type Query {
		location(id: ID!): Location
	}
`;
