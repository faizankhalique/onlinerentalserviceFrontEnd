import http from "./httpService";
import { baseUrl } from "../../config.json";
const apiEndPoint = baseUrl.concat("registerdproducts/");
export async function getOwnersDetails() {
  return await http.get(apiEndPoint + "all");
}
export async function getOwnerDetails(id) {}
export async function addOwner(id) {
  return await http.post(apiEndPoint, { owner: id });
}
export async function addOwnerVehicle(ownerId, vehicleId) {
  return await http.post(apiEndPoint + "/addvehicle", { ownerId, vehicleId });
}
