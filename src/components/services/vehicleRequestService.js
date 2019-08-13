import { baseUrl } from "../../config.json";
import http from "./httpService";
import authService from "./authService.js";
const apiEndPoint = baseUrl.concat("vehiclerequest/");
export async function getVehiclesRequests() {
  return http.get(apiEndPoint);
}
export async function addVehicleRequest(VehicleRequest) {
  const user = authService.getCurrentUser();
  VehicleRequest.requester = user._id;
  return await http.post(apiEndPoint, VehicleRequest);
}
export async function getOwnerVehiclesRequests(id) {
  return http.get(apiEndPoint + "/ownerequests/" + id);
}
export async function updateVehicleRequest(id) {
  return await http.put(apiEndPoint + id.trim());
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
