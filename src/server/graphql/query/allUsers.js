import gql from 'graphql-tag';

export const users = 'users: [User!]!';

export default gql`
  query {
    users {
      id
      name
      email
      sessionToken
      isVerified
      admin
      agent
      createdDate
    }
  }
`;
