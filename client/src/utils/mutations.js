import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(username: $name, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
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