export const types = /* GraphQL */ `
	scalar BigInt

	type Rank {
		username: String
		netWorth: BigInt
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
