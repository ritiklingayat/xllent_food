const USER_KEY = "xllent_users";

export const getUsers = () => {
  return JSON.parse(
    localStorage.getItem(USER_KEY)
  ) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(users)
  );
};

export const addUser = (user) => {
  const users = getUsers();

  users.push(user);

  saveUsers(users);
};