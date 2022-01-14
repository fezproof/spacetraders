export const types = /* GraphQL */ `
	type System {
		id: ID!
		name: String
	}

	extend type Query {
		system(id: ID!): System
	}
`;
