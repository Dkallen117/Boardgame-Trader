import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      username
      listings {
        title
        description
        price
        quantity
        img
      }
    }
  }
`;

export const QUERY_ALL_LISTINGS = gql`
  query {
  	listings {
      _id
      title
      description
      quantity
      price
      available
      genre
      seller {
        username
      }
      img
    }
  }
`

export const QUERY_SINGLE_LISTING = gql`
  query listing($listingId:ID!) {
    listing(listingId:$listingId){
      _id
      title
      description
      quantity
      price
      available
      genre
      seller {
        username
      }
      img
    }
  }
`

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
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
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
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
`;
