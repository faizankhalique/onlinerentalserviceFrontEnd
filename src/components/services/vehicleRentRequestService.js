import { baseUrl } from "../../config.json";
import http from "./httpService";
import authService from "./authService.js";
const apiEndPoint = baseUrl.concat("vehiclerentrequest/");
export async function getVehiclesRentRequests() {
  return http.get(apiEndPoint);
}
export async function getApprovedVehiclesRentRequests() {
  return http.get(apiEndPoint + "approved/");
}
export async function getRenterVehiclesRequests(id) {
  return http.get(apiEndPoint + id);
}
export async function addVehicleRentRequest(vehicleRentRequest) {
  const user = authService.getCurrentUser();
  vehicleRentRequest.requester = user._id;
  return await http.post(apiEndPoint, vehicleRentRequest);
}
export async function updateVehicleRentRequest(id, vehicleRentRequest) {
  return await http.put(apiEndPoint + id.trim(), vehicleRentRequest);
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
