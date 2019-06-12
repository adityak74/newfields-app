import gql from 'graphql-tag';

export const signInWithToken = 'signInWithToken(email: String!, password: String!, isAdmin: Boolean!, sessionToken: String!): SignInWithTokenResponse!';

export const signInWithTokenResponse = `
  type SignInWithTokenResponse {
    user: User!
  }
`;

export default gql`
  mutation signInWithToken($email: String!, $password: String!, $isAdmin: Boolean!, $sessionToken: String!) {
    signInWithToken(email: $email, password: $password, isAdmin: $isAdmin, sessionToken: $sessionToken) {
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
