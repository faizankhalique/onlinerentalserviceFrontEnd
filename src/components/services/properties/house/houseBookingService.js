import { baseUrl } from "../../../../config.json";
import http from "../../httpService";
const apiEndPoint = baseUrl.concat("housebooking/");
export async function getHouseRentRequests() {
  return http.get(apiEndPoint + "houserentrequests");
}
export async function getRenterHouseRentRequests(id) {
  return http.get(apiEndPoint + "houserentrequest/" + id);
}
export async function getRenterHouseBookings(id) {
  return http.get(apiEndPoint + "housebookings/" + id);
}
export async function addHouseRentRequest(shopRentRequest) {
  return await http.post(apiEndPoint + "houserentrequest", shopRentRequest);
}
export async function approvedHouseRentRequest(id) {
  return await http.put(apiEndPoint + "approvedrentrequest/" + id);
}
export async function updateHouseBooking(id, houseBookingData) {
  return http.put(apiEndPoint + id, houseBookingData);
}
export async function deleteHouseRentRequest(id) {
  return await http.delete(apiEndPoint + id);
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
export async function getRenterHouseBooking(id) {
  return http.get(apiEndPoint + "/" + id);
}
