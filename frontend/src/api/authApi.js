import api from "./axios";

/**
 * ============================================================
 * Xllent Foods ERP
 * Authentication API Service
 * ============================================================
 */

const BASE_URL = "/auth";

/**
 * ------------------------------------------------------------
 * Login
 * POST /auth/login
 * ------------------------------------------------------------
 */
export const login = async (credentials) => {
  const { data } = await api.post(
    `${BASE_URL}/login`,
    credentials
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Logout
 * POST /auth/logout
 * ------------------------------------------------------------
 */
export const logout = async () => {
  const { data } = await api.post(
    `${BASE_URL}/logout`
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Refresh Token
 * POST /auth/refresh-token
 * ------------------------------------------------------------
 */
export const refreshToken = async (refreshToken) => {
  const { data } = await api.post(
    `${BASE_URL}/refresh-token`,
    {
      refreshToken,
    }
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Current User Profile
 * GET /auth/me
 * ------------------------------------------------------------
 */
export const getProfile = async () => {
  const { data } = await api.get(
    `${BASE_URL}/me`
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Forgot Password
 * POST /auth/forgot-password
 * ------------------------------------------------------------
 */
export const forgotPassword = async (email) => {
  const { data } = await api.post(
    `${BASE_URL}/forgot-password`,
    {
      email,
    }
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Reset Password
 * POST /auth/reset-password
 * ------------------------------------------------------------
 */
export const resetPassword = async ({
  token,
  password,
  confirmPassword,
}) => {
  const { data } = await api.post(
    `${BASE_URL}/reset-password`,
    {
      token,
      password,
      confirmPassword,
    }
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Change Password
 * POST /auth/change-password
 * ------------------------------------------------------------
 */
export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  const { data } = await api.post(
    `${BASE_URL}/change-password`,
    {
      currentPassword,
      newPassword,
      confirmPassword,
    }
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Verify Email
 * POST /auth/verify-email
 * ------------------------------------------------------------
 */
export const verifyEmail = async (token) => {
  const { data } = await api.post(
    `${BASE_URL}/verify-email`,
    {
      token,
    }
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Resend Verification Email
 * POST /auth/resend-verification
 * ------------------------------------------------------------
 */
export const resendVerificationEmail = async (
  email
) => {
  const { data } = await api.post(
    `${BASE_URL}/resend-verification`,
    {
      email,
    }
  );

  return data;
};

/**
 * ------------------------------------------------------------
 * Export Auth API
 * ------------------------------------------------------------
 */

const authApi = {
  login,
  logout,
  refreshToken,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
};

export default authApi;