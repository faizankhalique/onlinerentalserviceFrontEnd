import axios from "axios";
// import authService from "./authService";
import { toast } from "react-toastify";
axios.defaults.headers.common["x-auth-token"] =
  localStorage.getItem("token") || "";
axios.interceptors.response.use(null, error => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("error", error);
    toast.error("" + error);
    return;
  } else {
    return Promise.reject(error);
  }
});
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
export default http;
