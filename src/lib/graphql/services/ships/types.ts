export const types = /* GraphQL */ `
	type Cargo {
		good: String
		quantity: Int
		totalVolume: Int
	}
	union ShipPosition = Location | FlightPlan

	type Ship {
		id: ID!
		type: String!
		manufacturer: String
		class: String
		cargo: [Cargo!]
		maxCargo: Int
		spaceAvailable: Int
		loadingSpeed: Int
		speed: Int
		plating: Int
		weapons: Int
		position: ShipPosition
	}

	extend type FlightPlan {
		ship: Ship
	}

	extend type Account {
		ships: [Ship]
	}

	extend type Location {
		myShips: [Ship]
	}
`;
