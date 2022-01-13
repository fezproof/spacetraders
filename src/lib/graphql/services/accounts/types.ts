export const types = `#graphql
  type Account {
    credits: Int!
    joinedAt: String
    shipCount: Int
    structureCount: Int
    username: String!
  }

  extend type Query {
    me: Account
  }
`;
