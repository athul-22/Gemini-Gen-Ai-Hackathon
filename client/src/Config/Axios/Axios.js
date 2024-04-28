import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.get["Content-Type"] = "application/json";
// axios.defaults.headers.get["Content-Type"] = "multipart/form-data";

export const Axios = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://crime-application-backend.vercel.app/",
});
