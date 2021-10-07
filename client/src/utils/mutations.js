import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(username: $name, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String! $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation addListing($listingInput: ListingInput) {
    addListing(listing: $listingInput) {
      _id
      title
      description
      quantity
      price
      available
      genre
      img
    }
  }
`

export const REMOVE_LISTING = gql`
  mutation removeListing($listingId: ID!) {
    removeListing(listing: $listingId) {
      listings {
        _id
        title
        description
        quantity
        price
        available
        genre
        img
      }
    }
  }
`