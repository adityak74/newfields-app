import userType from './query/user';
import formType from './query/form';

import { admins } from './query/allAdmins';
import { agents } from './query/allAgents';
import { forms } from './query/allForms';
import { users } from './query/allUsers';

import { addAdmin, addAdminResponse } from './mutation/addAdmin';
import { authorizeAgent, authorizeAgentResponse } from './mutation/authorizeAgent';
import { signIn, signInResponse } from './mutation/signIn';
import { signInWithToken, signInWithTokenResponse } from './mutation/signInWithToken';
import { signUp, signUpResponse } from './mutation/signUp';
import { changePassword, changePasswordResponse } from './mutation/changePassword';
import { updateProgress, updateProgressResponse } from './mutation/updateProgress';
import { forgotPassword, forgotPasswordResponse } from './mutation/forgotPassword';
import { verifyEmail, verifyEmailResponse } from './mutation/verifyEmail';

export default `
  ${authorizeAgentResponse}
  ${updateProgressResponse}
  ${changePasswordResponse}
  ${forgotPasswordResponse}
  ${addAdminResponse}
  ${signInResponse}
  ${signInWithTokenResponse}
  ${signUpResponse}
  ${verifyEmailResponse}
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
    ${signInWithToken}
    ${signUp}
    ${verifyEmail}
    ${changePassword}
    ${forgotPassword}
    ${updateProgress}
  }
`;
