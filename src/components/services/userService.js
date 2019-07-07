import http from "./httpService";
import { baseUrl } from "../../config.json";
const apiEndpoint = baseUrl.concat("users/");
export async function getUsers() {
  return http.get(apiEndpoint);
}
export async function registerUser(user) {
  // user.accountType = "admin";
  return http.post(apiEndpoint, user);
}
export async function deleteUser(id) {
  return http.delete(apiEndpoint.concat(id.trim()));
}
