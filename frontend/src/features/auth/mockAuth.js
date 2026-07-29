const users = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@xllentfoods.com",
    password: "Admin@123",
    role: "SUPER_ADMIN",
  },
  {
    id: 2,
    name: "Admin",
    email: "manager@xllentfoods.com",
    password: "Admin@123",
    role: "ADMIN",
  },
];

export const login = (email, password) => {
  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  return user;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};