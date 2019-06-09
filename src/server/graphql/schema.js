import userType from './query/user';
import formType from './query/form';

import { admins } from './query/allAdmins';
import { agents } from './query/allAgents';
import { forms } from './query/allForms';
import { users } from './query/allUsers';

import { addAdmin, addAdminResponse } from './mutation/addAdmin';
import { authorizeAgent, authorizeAgentResponse } from './mutation/authorizeAgent';
import { signIn, signInResponse } from './mutation/signIn';
import { signUp, signUpResponse } from './mutation/signUp';
import { changePassword, changePasswordResponse } from './mutation/changePassword';
import { updateProgress, updateProgressResponse } from './mutation/updateProgress';


export default `
  ${authorizeAgentResponse}
  ${updateProgressResponse}
  ${changePasswordResponse}
  ${addAdminResponse}
  ${signInResponse}
  ${signUpResponse}
  ${userType}
  ${formType}
  type Query {
    ${users}
    ${admins}
    ${agents}
    ${forms}
  }
  type Mutation {
    ${addAdmin}
    ${authorizeAgent}
    ${signIn}
    ${signUp}
    ${changePassword}
    ${updateProgress}
  }
`;
