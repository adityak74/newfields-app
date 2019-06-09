import gql from 'graphql-tag';

export const agents = 'agents: [User!]!';

export default gql`
  query {
    agents {
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
