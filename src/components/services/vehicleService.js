import { baseUrl } from "../../config.json";
import http from "./httpService";
const apiEndPoint = baseUrl.concat("vehicles/");
export async function getVehicles() {
  return http.get(apiEndPoint);
}
export async function getVehicle(id) {
  return http.get(apiEndPoint + id);
}
export async function addVehicle(vehicle) {
  return await http.post(apiEndPoint, vehicle);
}
