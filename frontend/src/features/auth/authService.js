import { getUsers } from "@/features/dashboard/users/utils/userStorage";

/* ==========================================
   Helpers
========================================== */

const normalizeEmail = (email = "") =>
  email.trim().toLowerCase();

const sanitizeUser = (user) => {
  if (!user) return null;

  const { password, ...safeUser } = user;

  return safeUser;
};

/* ==========================================
   Login
========================================== */

export const loginUser = (email, password) => {
  if (!email?.trim()) {
    throw new Error("Email is required.");
  }

  if (!password?.trim()) {
    throw new Error("Password is required.");
  }

  const users = getUsers();

  if (!users.length) {
    throw new Error(
      "No users found. Please seed users first."
    );
  }

  const user = users.find(
    (item) =>
      normalizeEmail(item.email) ===
        normalizeEmail(email) &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (
    user.status &&
    user.status.toLowerCase() !== "active"
  ) {
    throw new Error(
      "Your account has been deactivated."
    );
  }

  return sanitizeUser(user);
};

/* ==========================================
   Logout
========================================== */

export const logoutUser = () => {
  localStorage.removeItem("xllent_auth");

  window.dispatchEvent(
    new Event("authChanged")
  );
};

/* ==========================================
   Get User By Email
========================================== */

export const getUserByEmail = (email) => {
  const users = getUsers();

  return (
    users.find(
      (user) =>
        normalizeEmail(user.email) ===
        normalizeEmail(email)
    ) || null
  );
};

/* ==========================================
   Email Exists
========================================== */

export const emailExists = (email) => {
  return !!getUserByEmail(email);
};

/* ==========================================
   Validate Credentials
========================================== */

export const validateCredentials = (
  email,
  password
) => {
  try {
    loginUser(email, password);
    return true;
  } catch {
    return false;
  }
};

/* ==========================================
   Change Password
========================================== */

export const changePassword = (
  email,
  currentPassword,
  newPassword
) => {
  const users = getUsers();

  const index = users.findIndex(
    (user) =>
      normalizeEmail(user.email) ===
      normalizeEmail(email)
  );

  if (index === -1) {
    throw new Error("User not found.");
  }

  if (
    users[index].password !== currentPassword
  ) {
    throw new Error(
      "Current password is incorrect."
    );
  }

  users[index].password = newPassword;
  users[index].updatedAt =
    new Date().toISOString();

  localStorage.setItem(
    "xllent_users",
    JSON.stringify(users)
  );

  window.dispatchEvent(
    new Event("usersUpdated")
  );

  return true;
};

/* ==========================================
   User Statistics
========================================== */

export const getUserStatistics = () => {
  const users = getUsers();

  return {
    total: users.length,
    active: users.filter(
      (u) =>
        !u.status ||
        u.status === "Active"
    ).length,
    inactive: users.filter(
      (u) =>
        u.status === "Inactive"
    ).length,
    admins: users.filter(
      (u) =>
        u.role === "ADMIN"
    ).length,
    asms: users.filter(
      (u) =>
        u.role === "ASM"
    ).length,
    salesOfficers: users.filter(
      (u) =>
        u.role === "SO"
    ).length,
  };
};