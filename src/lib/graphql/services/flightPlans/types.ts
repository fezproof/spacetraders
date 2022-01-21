export const types = /* GraphQL */ `
	type FlightPlan {
		id: ID!
		createdAt: String
		arrivesAt: String
	}

	extend type System {
		activeFlights: [FlightPlan]
	}

	extend type Query {
		flightPlan(id: ID!, systemId: ID!): FlightPlan
	}
`;
