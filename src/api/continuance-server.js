import axios from "axios";

import { requestWithAuth } from "./request";

const server = axios.create({
  baseURL: "https://continuance-server.herokuapp.com"
});

export async function newContact(data) {
  const config = {
    method: "POST",
    url: "/contact",
    data: data
  };
  return await requestWithAuth(server, config);
}

export async function getContactList(limit, offset) {
  const config = {
    method: "GET",
    url: "/contact",
    params: { limit, offset }
  };
  return await requestWithAuth(server, config);
}

export async function searchContacts(search) {
  const config = {
    method: "GET",
    url: "/contact/search",
    params: { search }
  };
  return await requestWithAuth(server, config);
}

export async function getCompanyList() {
  const config = {
    method: "GET",
    url: "/company"
  };
  return await requestWithAuth(server, config);
}
