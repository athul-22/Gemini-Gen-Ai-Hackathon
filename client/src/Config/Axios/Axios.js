import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

export const Axios = axios.create({
  baseURL: "http://localhost:8080",
})
