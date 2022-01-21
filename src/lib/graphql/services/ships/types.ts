export const types = /* GraphQL */ `
	type Cargo {
		good: String
		quantity: Int
		totalVolume: Int
	}

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
		x: Int
		y: Int
	}

	extend type FlightPlan {
		ship: Ship
	}

	extend type Account {
		ships: [Ship]
	}
`;
