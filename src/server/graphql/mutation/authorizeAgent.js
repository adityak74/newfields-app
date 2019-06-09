import gql from 'graphql-tag';

export const authorizeAgent = 'authorizeAgent(agentId: ID!): AuthorizeAgentResponse!';

export const authorizeAgentResponse = `
  type AuthorizeAgentResponse {
    agentID: ID!,
    isVerified: Int!
  }
`;

export default gql`
    mutation authorizeAgent($agentId: ID!) {
      authorizeAgent(agentId: $agentId) {
        agentID
        isVerified
      }
    }
`;
