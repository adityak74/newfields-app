import gql from 'graphql-tag';

export const addAdmin = 'addAdmin(name: String!, email: String!, password: String!): AddAdminResponse!';

export const addAdminResponse = `
  type AddAdminResponse {
    id: ID!
    name: String!
    email: String!
  }
`;

export default gql`
    mutation addAdmin($name: String!, $email: String!, $password: String!) {
      addAdmin(name: $name, email: $email, password: $password) {
        id
        name
        email
      }
    }
`;
