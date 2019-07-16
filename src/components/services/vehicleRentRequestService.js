import { baseUrl } from "../../config.json";
import http from "./httpService";
import authService from "./authService.js";
const apiEndPoint = baseUrl.concat("vehiclerentrequest/");
export async function getVehiclesRequests() {
  return http.get(apiEndPoint);
}
export async function addVehicleRentRequest(vehicleRentRequest){
  const user = authService.getCurrentUser();
  vehicleRentRequest.requester = user._id;
  return await http.post(apiEndPoint, vehicleRentRequest);
}
