const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    favorites: [Listing]
    listings: [Listing]
  }

  type Listing {
    _id: ID
    title: String
    description: String
    quantity: Int
    price: Float
    available: Boolean
    genre: String
    seller: User
    img: String
  }

  input ListingInput {
    title: String
    description: String
    quantity: Int
    price: Float
    genre: String
    seller: ID
    img: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    listings: [Listing]!
    user(userId: ID!): User
    listing(listingId: ID!): Listing
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addListing(listing: ListingInput!): Listing
    removeListing(listingId: ID!): User
    removeUser: User
  }
`;

module.exports = typeDefs;
