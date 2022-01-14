export const types = /* GraphQL */ `
	type Rank {
		username: String
		netWorth: Int
		rank: Int
	}

	type Game {
		status: String!
		leaderboard: [Rank!]
	}

	type Query {
		game: Game!
	}

	type Mutation {
		game: Game
	}
`;
