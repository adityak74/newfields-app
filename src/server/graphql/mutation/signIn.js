import gql from 'graphql-tag';

export const signIn = 'signIn(email: String!, password: String!, isAdmin: Boolean!): SignInResponse!';

export const signInResponse = `
  type SignInResponse {
    user: User!
  }
`;

export default gql`
  mutation signIn($email: String!, $password: String!, $isAdmin: Boolean!) {
    signIn(email: $email, password: $password, isAdmin: $isAdmin) {
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
