function login(username, password) {
  if (username === "guest" && password === "guest") {
    return {
      username: "guest",
      first_name: "Guest",
      last_name: "User"
    };
  }
  return { error: "Incorrect username or password" };
}

export default login;
