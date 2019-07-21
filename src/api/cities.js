import axios from "axios";

import { request } from "./request";

const cities = axios.create({
  baseURL: "https://api.teleport.org/api/cities",
  params: {
    templated: true
  }
});

export async function getCities(address) {
  const data = { params: { search: address } };
  return await request(cities.get("", data));
}
