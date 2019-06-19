import gql from 'graphql-tag';

export const verifyEmail = 'verifyEmail(email: String!, token: String!): VerifyEmailResponse!';

export const verifyEmailResponse = `
  type VerifyEmailResponse {
    user: User!
  }
`;

export default gql`
  mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
      user {
        isVerified
      }
    }
  }
`;
