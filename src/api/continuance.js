import axios from "axios";

import { request, requestWithAuth } from "./request";

const continuance = axios.create({
  baseURL: "https://continuance-server.herokuapp.com"
});

export async function getHealth() {
  return await request(continuance.get("/healthz"));
}

export async function newContact(data) {
  const config = {
    method: "POST",
    url: "/contact",
    data: data
  };
  return await requestWithAuth(continuance, config);
}

export async function getContactList(page) {
  const config = {
    method: "GET",
    url: "/contact",
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function getContactById(contactId) {
  const config = {
    method: "GET",
    url: `/contact/${contactId}`
  };
  return await requestWithAuth(continuance, config);
}

export async function searchContacts(search) {
  const config = {
    method: "GET",
    url: "/search/contact",
    params: { search }
  };
  return await requestWithAuth(continuance, config);
}

export async function getCompanyList() {
  const config = {
    method: "GET",
    url: "/company"
  };
  return await requestWithAuth(continuance, config);
}
