import http from "./httpService";
import { baseUrl } from "../../config.json";
const apiEndpoint = baseUrl.concat("users/");
export async function getUsers() {
  return http.get(apiEndpoint);
}
export async function getUser(id) {
  return http.get(apiEndpoint + "/" + id);
}
export async function updateUser(id, user) {
  return http.put(apiEndpoint + "/" + id, user);
}
export async function registerUser(user) {
  // user.accountType = "admin";
  return http.post(apiEndpoint, user);
}
export async function deleteUser(id) {
  return http.delete(apiEndpoint.concat(id.trim()));
}
