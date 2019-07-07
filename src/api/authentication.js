import axios from "axios";

const auth = axios.create({
  baseURL: "https://wexel-auth.herokuapp.com"
});

export function login(username, password) {
  return auth.post("/login", {
    username: username,
    password: password
  });
}
