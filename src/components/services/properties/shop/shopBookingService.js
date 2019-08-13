import { baseUrl } from "../../../../config.json";
import http from "../../httpService";
const apiEndPoint = baseUrl.concat("shopbooking/");
export async function getShopRentRequests() {
  return http.get(apiEndPoint + "shopRentRequests");
}
export async function getRenterShopRentRequests(id) {
  return http.get(apiEndPoint + "shopRentRequest/" + id);
}
export async function getRenterShopBookings(id) {
  return http.get(apiEndPoint + "shopbookings/" + id);
}
export async function addShopRentRequest(shopRentRequest) {
  return await http.post(apiEndPoint + "shopRentRequest", shopRentRequest);
}
export async function approvedShopRentRequest(id) {
  return await http.put(apiEndPoint + "approvedrentrequest/" + id);
}
export async function updateShopBooking(id, shopBookingData) {
  return http.put(apiEndPoint + id, shopBookingData);
}
export async function deleteShopRentRequest(id) {
  return await http.delete(apiEndPoint + id);
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
