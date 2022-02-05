import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
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
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation addListing($listingInput: ListingInput!) {
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

export const EDIT_LISTING = gql`
  mutation editListing($listingId: ID!, $listingInput: ListingInput!) {
    editListing(listingId: $listingId, listingInput: $listingInput) {
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
    removeListing(listingId: $listingId) {
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

export const ADD_FAVORITE = gql`
mutation addFavorite($listingId: ID!) {
  addFavorite(listingId: $listingId) {
    favorites {
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

export const REMOVE_FAVORITE = gql`
mutation removeFavorite($listingId: ID!) {
  removeFavorite(listingId: $listingId) {
    favorites {
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
export const GET_MESSAGES = gql`
  subscription {
    messages {
      _id
      username
      text
    }
  }
`

export const POST_MESSAGE = gql`
  mutation($username:String!, $text:String!){
    postMessage(username:$username,text:$text)
  }
`