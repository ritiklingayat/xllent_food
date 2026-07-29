/**
 * =============================================================================
 * Authentication Feature
 * =============================================================================
 *
 * Public API
 *
 * Import everything related to authentication from this file instead of
 * importing individual files throughout the application.
 *
 * Example:
 *
 * import {
 *   useAuth,
 *   useLogin,
 *   loginSchema,
 *   ROLES
 * } from "@/features/auth";
 *
 * =============================================================================
 */

/* -------------------------------------------------------------------------- */
/* API */
/* -------------------------------------------------------------------------- */

export * from "./api/authApi";

/* -------------------------------------------------------------------------- */
/* Services */
/* -------------------------------------------------------------------------- */

export * from "./services/authService";

/* -------------------------------------------------------------------------- */
/* Hooks */
/* -------------------------------------------------------------------------- */

export { default as useAuth } from "./hooks/useAuth";
export * from "./hooks/useAuth";
export * from "./hooks/useLogin";
export * from "./hooks/useLogout";

/* -------------------------------------------------------------------------- */
/* Store */
/* -------------------------------------------------------------------------- */

export {
  default as authReducer,
  initialize,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  updateAccessToken,
  updateRefreshToken,
  setPermissions,
  clearError,
  selectAuth,
  selectUser,
  selectRole,
  selectPermissions,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError
} from "./store/authSlice";

/* -------------------------------------------------------------------------- */
/* Schemas */
/* -------------------------------------------------------------------------- */

export {
  default as loginSchema,
  emailSchema,
  passwordSchema,
  loginDefaultValues,
  LOGIN_FIELDS,
  validateLogin
} from "./schemas/loginSchema";

/* -------------------------------------------------------------------------- */
/* Constants */
/* -------------------------------------------------------------------------- */

export * from "./constants/roles";
export * from "./constants/permissions";

/* -------------------------------------------------------------------------- */
/* Utilities */
/* -------------------------------------------------------------------------- */

export * from "./utils/tokenStorage";

/* -------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------- */

export { default as LoginForm } from "./components/LoginForm";
export { default as PasswordField } from "./components/PasswordField";
export { default as ForgotPasswordForm } from "./components/ForgotPasswordForm";

/* -------------------------------------------------------------------------- */
/* Pages */
/* -------------------------------------------------------------------------- */

export { default as LoginPage } from "./pages/Login";
export { default as ForgotPasswordPage } from "./pages/ForgotPassword";
export { default as ResetPasswordPage } from "./pages/ResetPassword";

/* -------------------------------------------------------------------------- */
/* Routes */
/* -------------------------------------------------------------------------- */

export * from "./routes/authRoutes";