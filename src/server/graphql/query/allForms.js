import gql from 'graphql-tag';

export const forms = 'forms: [Form!]';

export default gql`
  query {
    forms {
      id
      userId
      name
      email
      formUID
      formRefNumber
      formNumber
      status
      processingStatus
      createDate
      updateDate
    }
  }
`;
