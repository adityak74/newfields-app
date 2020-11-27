import gql from 'graphql-tag';

export const changePassword = 'changePassword(password: String!): ChangePasswordResponse!';

export const changePasswordResponse = `
  type ChangePasswordResponse {
    user: User!
  }
`;

export default gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      user {
        id
      }
    }
  }
`;
