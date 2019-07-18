import axios from "axios";

const server = axios.create({
  baseURL: "https://continuance-server.herokuapp.com"
});

export function getContactList(limit, offset) {
  return server.get("/contact", { params: { limit, offset } });
}
