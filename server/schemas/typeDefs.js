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

  type Message {
    id: ID!
    user: String!
    text: String!
  }

  input ListingInput {
    title: String
    description: String
    quantity: Int
    price: Float
    genre: String
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
    messages: [Message!]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addListing(listing: ListingInput!): Listing
    editListing(listingId: ID!, listingInput: ListingInput!): Listing
    removeListing(listingId: ID!): User
    addFavorite(listingId: ID!): User
    removeFavorite(listingId: ID!): User
    postMessage(username: String!, text: String!): ID!
    removeUser: User
  }

  type Subscription {
    messages: [Message!]
  }
`;

module.exports = typeDefs;
