import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String! $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;