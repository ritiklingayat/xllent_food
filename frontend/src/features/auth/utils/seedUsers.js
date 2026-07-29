const USER_KEY = "xllent_users";

/* ==========================================
   Default Users
========================================== */

const DEFAULT_USERS = [
  {
    id: "USR001",
    name: "Super Admin",
    email: "superadmin@xllentfoods.com",
    password: "Super@123",
    role: "SUPER_ADMIN",
    mobile: "9876543210",
    status: "Active",
    profileImage: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "USR002",
    name: "Admin",
    email: "admin@xllentfoods.com",
    password: "Admin@123",
    role: "ADMIN",
    mobile: "9876543211",
    status: "Active",
    profileImage: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "USR003",
    name: "Area Sales Manager",
    email: "asm@xllentfoods.com",
    password: "Asm@123",
    role: "ASM",
    mobile: "9876543212",
    status: "Active",
    profileImage: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "USR004",
    name: "Sales Officer",
    email: "so@xllentfoods.com",
    password: "So@123",
    role: "SO",
    mobile: "9876543213",
    status: "Active",
    profileImage: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/* ==========================================
   Seed Users
========================================== */

export default function seedUsers() {
  try {
    const existingUsers = JSON.parse(
      localStorage.getItem(USER_KEY)
    );

    // Don't overwrite existing users
    if (
      Array.isArray(existingUsers) &&
      existingUsers.length > 0
    ) {
      return existingUsers;
    }

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(DEFAULT_USERS)
    );

    window.dispatchEvent(
      new Event("usersUpdated")
    );

    console.log(
      "✅ Default users seeded successfully."
    );

    return DEFAULT_USERS;
  } catch (error) {
    console.error(
      "❌ Failed to seed users:",
      error
    );

    return [];
  }
}

/* ==========================================
   Force Reset Users (Development Only)
========================================== */

export const resetSeedUsers = () => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(DEFAULT_USERS)
  );

  window.dispatchEvent(
    new Event("usersUpdated")
  );

  console.log(
    "🔄 Default users reset successfully."
  );

  return DEFAULT_USERS;
};