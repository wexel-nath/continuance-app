import axios from "axios";

export default axios.create({
  baseURL: "https://api.teleport.org/api/cities",
  params: {
    templated: true
  }
});
