import { baseUrl } from "../../config.json";
import http from "./httpService";
// import authService from "./authService.js";

const apiEndPoint = baseUrl.concat("vehiclerequest/");
export async function getVehiclesRequests() {
  return http.get(apiEndPoint);
}
export async function addVehicleRequest(vehicleRequest) {
  // const user = authService.getCurrentUser();
  // vehicleRequest.requester = user._id;
  return await http.post(apiEndPoint, vehicleRequest);
}
export async function getOwnerVehiclesRequests(id) {
  return http.get(apiEndPoint + "/ownerequests/" + id);
}
export async function approvedVehicleRequest(id, vehicleRequest) {
  return await http.put(apiEndPoint + id.trim(), vehicleRequest);
}
export async function updateVehicleRequest(id, vehicleRequest) {
  console.log("called......");
  return await http.put(
    apiEndPoint + "updatevehiclerequest/" + id,
    vehicleRequest
  );
}
export async function deleteVehicleRequest(id) {
  return await http.delete(apiEndPoint + id.trim());
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
