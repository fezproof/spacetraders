export const types = `#graphql
  type Game {
    status: String
  }

  type Query {
    game: Game
  }

  type Mutation {
    game: Game
  }
`;
