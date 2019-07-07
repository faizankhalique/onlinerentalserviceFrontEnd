import http from "./httpService";
import { baseUrl } from "../../config.json";
import jwtDecode from "jwt-decode";
const apiEndpoint = baseUrl.concat("auth/");
const tokenKey = "token";
async function loginUser(user) {
  const response = await http.post(apiEndpoint, user);
  if (response) {
    const { data: jwt, status } = response;
    loginWithJwt(jwt);
    return status;
  }
}
function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
function logoutUser() {
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  const jwt = localStorage.getItem(tokenKey);
  return jwt;
}
function getCurrentUser() {
  try {
    const jwt = getJwt();
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}
export default {
  loginUser,
  loginWithJwt,
  logoutUser,
  getJwt,
  getCurrentUser
};
