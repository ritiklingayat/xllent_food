/**
 * =============================================================================
 * Token Storage Utility
 * =============================================================================
 * Centralized authentication token management.
 *
 * Responsibilities:
 * - Store access token
 * - Store refresh token
 * - Retrieve tokens
 * - Remove tokens
 * - Check authentication
 * - Persist user session
 *
 * NOTE:
 * For maximum security in production, prefer storing refresh tokens in
 * HttpOnly secure cookies managed by the backend. This implementation
 * supports local development and JWT-based authentication.
 * =============================================================================
 */

const STORAGE_KEYS = Object.freeze({
  ACCESS_TOKEN: "xllent_access_token",
  REFRESH_TOKEN: "xllent_refresh_token"
});

/**
 * Save authentication tokens
 *
 * @param {Object} tokens
 * @param {string} tokens.accessToken
 * @param {string} tokens.refreshToken
 */
export const saveAuthTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
};

/**
 * Get access token
 *
 * @returns {string|null}
 */
export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Get refresh token
 *
 * @returns {string|null}
 */
export const getRefreshToken = () => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Remove authentication tokens
 */
export const clearAuthTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Check authentication status
 *
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return Boolean(getAccessToken());
};

/**
 * Replace only the access token
 *
 * Used after successful refresh token API.
 *
 * @param {string} accessToken
 */
export const updateAccessToken = (accessToken) => {
  if (!accessToken) return;

  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
};

/**
 * Replace only the refresh token
 *
 * @param {string} refreshToken
 */
export const updateRefreshToken = (refreshToken) => {
  if (!refreshToken) return;

  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

/**
 * Get both authentication tokens
 *
 * @returns {{accessToken: string|null, refreshToken: string|null}}
 */
export const getAuthTokens = () => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken()
});

/**
 * Clear complete browser authentication state.
 *
 * Useful during logout or when the refresh token expires.
 */
export const clearAuthSession = () => {
  clearAuthTokens();

  // Reserved for future cleanup:
  // sessionStorage.clear();
  // indexedDB cleanup
  // cached user preferences
};

/**
 * Export storage keys for Axios interceptors if needed.
 */
export { STORAGE_KEYS };