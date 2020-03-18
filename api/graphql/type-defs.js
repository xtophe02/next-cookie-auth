const {gql} = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    hello: String
    viewer: User
  }
  type Mutation {
    signIn(input: SignInInput!): User
    signUp(input: SignUpInput!): User
    signOut: Boolean!
  }
  type User {
    id: ID!
    email: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  input SignUpInput {
    email: String!
    password: String!
  }
`;

module.exports = {typeDefs}