const AUTH_KEY = "xllent_auth";

/* ==========================================
   Safe JSON Parse
========================================== */

const parseJSON = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Invalid auth data:", error);
    return null;
  }
};

/* ==========================================
   Save Logged In User
========================================== */

export const setAuthUser = (user) => {
  if (!user) return;

  // Never store password
  const authUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    mobile: user.mobile || "",
    profileImage: user.profileImage || "",
    status: user.status || "Active",
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(authUser)
  );

  window.dispatchEvent(
    new Event("authChanged")
  );
};

/* ==========================================
   Get Logged In User
========================================== */

export const getAuthUser = () => {
  return parseJSON(
    localStorage.getItem(AUTH_KEY)
  );
};

/* ==========================================
   Update Logged In User
========================================== */

export const updateAuthUser = (updates = {}) => {
  const currentUser = getAuthUser();

  if (!currentUser) return null;

  const updatedUser = {
    ...currentUser,
    ...updates,
  };

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(updatedUser)
  );

  window.dispatchEvent(
    new Event("authChanged")
  );

  return updatedUser;
};

/* ==========================================
   Authentication
========================================== */

export const isAuthenticated = () => {
  return !!getAuthUser();
};

/* ==========================================
   Role
========================================== */

export const getUserRole = () => {
  return getAuthUser()?.role || null;
};

export const hasRole = (...roles) => {
  const role = getUserRole();
  return roles.includes(role);
};

export const isSuperAdmin = () =>
  hasRole("SUPER_ADMIN");

export const isAdmin = () =>
  hasRole("ADMIN");

export const isASM = () =>
  hasRole("ASM");

export const isSO = () =>
  hasRole("SO");

/* ==========================================
   Logout
========================================== */

export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);

  window.dispatchEvent(
    new Event("authChanged")
  );
};

/* ==========================================
   Clear Session
========================================== */

export const clearSession = () => {
  logoutUser();
};