import axios from "axios";
import { decamelizeKeys as toSnakeCase } from "humps";

import { request } from "./request";

const auth = axios.create({
  baseURL: "https://wexel-auth.herokuapp.com"
});

export async function login(username, password) {
  const data = {
    username: username,
    password: password
  };
  return await request(auth.post("/login", data));
}

export async function refresh(jwt, refreshToken) {
  const data = toSnakeCase({ refreshToken });
  const config = {
    headers: {
      Authorization: "Bearer " + jwt
    }
  };
  return await request(auth.post("/refresh", data, config));
}

export async function logout(jwt, refreshToken) {
  const data = toSnakeCase({ refreshToken });
  const config = {
    headers: {
      Authorization: "Bearer " + jwt
    }
  };
  return await request(auth.post("/logout", data, config));
}
