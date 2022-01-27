export const types = /* GraphQL */ `
	type Cargo {
		good: String
		quantity: Int
		totalVolume: Int
	}
	union ShipPosition = Location | FlightPlan

	type Ship {
		id: ID!
		cargo: [Cargo!]
		class: String
		flightPlanId: ID
		manufacturer: String
		maxCargo: Int
		plating: Int
		spaceAvailable: Int
		speed: Int
		type: String
		weapons: Int
		loadingSpeed: Int
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
