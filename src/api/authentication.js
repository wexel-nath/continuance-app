import axios from "axios";
import { decamelizeKeys as toSnakeCase } from "humps";

const auth = axios.create({
  baseURL: "https://wexel-auth.herokuapp.com"
});

export function login(username, password) {
  return auth.post("/login", {
    username: username,
    password: password
  });
}

export function refresh(jwt, refreshToken) {
  const data = toSnakeCase({
    refreshToken
  });
  const config = {
    headers: {
      Authorization: "Bearer " + jwt
    }
  };
  return auth.post("/refresh", data, config);
}

export function logout(jwt, refreshToken) {
  const data = toSnakeCase({
    refreshToken
  });
  const config = {
    headers: {
      Authorization: "Bearer " + jwt
    }
  };
  return auth.post("/logout", data, config);
}
