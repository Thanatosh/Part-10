import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          url
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_AUTHENTICATED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
