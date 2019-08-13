import http from "../../httpService";
import { baseUrl } from "../../../../config.json";
const apiEndPoint = baseUrl.concat("shops/");
export async function getShops() {
  return await http.get(apiEndPoint);
}
export async function getShop(id) {
  return http.get(apiEndPoint + id);
}
export async function addShopRequest(shopRequest) {
  return await http.post(apiEndPoint + "shoprequest", shopRequest);
}
export async function getShopRequests() {
  return await http.get(apiEndPoint + "shoprequest");
}
export async function getOwnerShopRequests(id) {
  return await http.get(apiEndPoint + "ownershoprequest/" + id);
}
export async function approvedShopRequest(id) {
  return await http.put(apiEndPoint.concat("approvedshoprequest/").concat(id), {
    aa: ""
  });
}
export async function updateShopRequest(id, shopRequest) {
  return await http.put(
    apiEndPoint.concat("updateshoprequest/").concat(id),
    shopRequest
  );
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
export async function deleteShopRequest(id) {
  return http.delete(apiEndPoint + id);
}
