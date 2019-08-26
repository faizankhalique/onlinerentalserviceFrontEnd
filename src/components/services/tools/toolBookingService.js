import { baseUrl } from "../../../config.json";
import http from "./../httpService";
const apiEndPoint = baseUrl.concat("toolbooking/");
export async function getToolRentRequests() {
  return http.get(apiEndPoint + "toolRentRequests");
}
export async function getToolBookings() {
  return http.get(apiEndPoint + "toolbookings");
}
export async function getRenterToolRentRequests(id) {
  return http.get(apiEndPoint + "toolRentRequest/" + id);
}
export async function getRenterToolBookings(id) {
  return http.get(apiEndPoint + "toolbookings/" + id);
}
export async function addToolRentRequest(toolRentRequest) {
  return await http.post(apiEndPoint + "toolRentRequest", toolRentRequest);
}
export async function approvedToolRentRequest(id) {
  return await http.put(apiEndPoint + "approvedrentrequest/" + id);
}
export async function updateToolBooking(id, toolBookingData) {
  return http.put(apiEndPoint + id, toolBookingData);
}
export async function deleteToolRentRequest(id) {
  return await http.delete(apiEndPoint + id);
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
export async function getRenterToolBooking(id) {
  return http.get(apiEndPoint + "/" + id);
}
export async function confirmToolBooking(id) {
  return http.put(apiEndPoint + "confirmbooking/" + id);
}
