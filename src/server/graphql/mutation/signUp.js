import gql from 'graphql-tag';

export const signUp = 'signUp(name: String!, email: String!, password: String!, isAgent: Boolean!): SignUpResponse!';

export const signUpResponse = `
  type SignUpResponse {
    user: User!
  }
`;

export default gql`
  mutation signUp($name: String!, $email: String!, $password: String!, $isAgent: Boolean!) {
    signUp(name: $name, email: $email, password: $password, isAgent: $isAgent) {
      user {
        id
        name
        email
        sessionToken
        isVerified
        admin
        agent
        createdDate
        userId: id
      }
    }
  }
`;
