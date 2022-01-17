export const types = /* GraphQL */ `
	type Account {
		credits: Int
		joinedAt: String
		shipCount: Int
		structureCount: Int
		username: String!
		colour: Int
	}

	extend type FlightPlan {
		owner: Account
	}

	extend type Query {
		me: Account
	}
`;
