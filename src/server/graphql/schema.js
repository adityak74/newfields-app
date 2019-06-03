export default `
  type AuthorizeAgentResponse {
    agentID: ID!,
    isVerified: Int!
  }
  type UpdateProgressResponse {
    formUID: ID!,
    processingStatus: Int!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    isVerified: Int!,
    admin: Int!,
    agent: Int!,
    sessionToken: String,
    createdDate: String,
  }
  type Query {
    users: [User!]!,
    admins: [User!]!,
    agents: [User!]!,
  }
  type Mutation {
    authorizeAgent(agentId: ID!): AuthorizeAgentResponse!
    updateProgress(formID: ID!, progressStatusCode: Int!): UpdateProgressResponse!
  }
`;
