import axios from "axios";

import { request } from "./request";

// todo: add authentication
const server = axios.create({
  baseURL: "https://continuance-server.herokuapp.com"
});

export async function newContact(data) {
  return await request(server.post("/contact", data));
}

export async function getContactList(limit, offset) {
  const data = { params: { limit, offset } };
  return await request(server.get("/contact", data));
}

export async function getCompanyList() {
  return await request(server.get("/company"));
}
