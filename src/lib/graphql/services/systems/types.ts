export const types = /* GraphQL */ `
	type System {
		id: ID!
		name: String
		x: Int
		y: Int
	}

	extend type Query {
		system(id: ID!): System
	}
`;
