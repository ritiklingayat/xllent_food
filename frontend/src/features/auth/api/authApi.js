/**
 * ============================================================================
 * Xllent Foods
 * Authentication API Layer
 * ============================================================================
 *
 * Currently uses mock authService.
 * Later replace with Axios API calls.
 *
 */


import authService from "@/services/authService";



/**
 * Login API
 */

export const loginApi = async (
  credentials
) => {

  return await authService.login(
    credentials
  );

};





/**
 * Logout API
 */

export const logoutApi = async () => {

  return await authService.logout();

};





/**
 * Current User API
 */

export const getCurrentUserApi =
async () => {

  return authService.getCurrentUser();

};





/**
 * Forgot Password API
 */

export const forgotPasswordApi =
async (
  email
) => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        500
      )
  );


  return {

    success:true,

    message:
      `Password reset link sent to ${email}`,

  };

};





/**
 * Reset Password API
 */

export const resetPasswordApi =
async ({
  token,
  password,
}) => {


  await new Promise(
    (resolve)=>
      setTimeout(
        resolve,
        500
      )
  );


  return {

    success:true,

    message:
      "Password reset successfully.",

  };

};