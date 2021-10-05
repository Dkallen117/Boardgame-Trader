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