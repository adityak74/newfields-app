import gql from 'graphql-tag';

export const admins = 'admins: [User!]!';

export default gql`
  query {
    admins {
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
