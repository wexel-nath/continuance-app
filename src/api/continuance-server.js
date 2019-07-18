import axios from "axios";

// todo: add authentication
const server = axios.create({
  baseURL: "https://continuance-server.herokuapp.com"
});

export function newContact(data) {
  return server.post("/contact", data);
}

export function getContactList(limit, offset) {
  return server.get("/contact", { params: { limit, offset } });
}
