import gql from 'graphql-tag';

export const forgotPassword = 'forgotPassword(email: String!): ForgotPasswordResponse!';

export const forgotPasswordResponse = `
  type ForgotPasswordResponse {
    user: User!
  }
`;

export default gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      user {
        userId: id
      }
    }
  }
`;
