import gql from 'graphql-tag';

export const updateProgress = 'updateProgress(formID: ID!, progressStatusCode: Int!): UpdateProgressResponse!';

export const updateProgressResponse = `
  type UpdateProgressResponse {
    formUID: ID!,
    processingStatus: Int!
  }
`;

export default gql`
  mutation updateProgress($formID: ID!, $progressStatusCode: Int!) {
    updateProgress(formID: $formID, progressStatusCode: $progressStatusCode) {
      formUID
      processingStatus
    }
  }
`;
