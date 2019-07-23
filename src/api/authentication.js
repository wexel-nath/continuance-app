import axios from "axios";
import { decamelizeKeys as toSnakeCase } from "humps";

import { request, requestWithAuth, makeAuthRequest } from "./request";

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

export async function refresh(refreshToken) {
  const config = {
    method: "POST",
    url: "/refresh",
    data: toSnakeCase({ refreshToken })
  };
  return await makeAuthRequest(auth, config);
}

export async function logout(refreshToken) {
  const config = {
    method: "POST",
    url: "/logout",
    data: toSnakeCase({ refreshToken })
  };
  return await requestWithAuth(auth, config);
}

export async function getUser() {
  const config = {
    method: "GET",
    url: "/user"
  };
  return await requestWithAuth(auth, config);
}

export async function changePassword(newPassword) {
  const config = {
    method: "POST",
    url: "/change-password",
    data: toSnakeCase({ newPassword })
  };
  return await requestWithAuth(auth, config);
}
