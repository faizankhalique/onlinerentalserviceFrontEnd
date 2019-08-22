import http from "../services/httpService";
import { baseUrl } from "../../config.json";
const apiEndPoint = baseUrl.concat("registerdproducts/");
export async function getOwnersDetails() {
  return await http.get(apiEndPoint + "all");
}
export async function getProductOwnerDetails(id) {
  return await http.get(apiEndPoint + id);
}
export async function getOwnerVehicles(id) {
  return await http.get(apiEndPoint + "ownervehicles/" + id);
}
export async function addOwner(id) {
  return await http.post(apiEndPoint, { owner: id });
}
export async function addOwnerVehicle(ownerId, vehicleId) {
  return await http.post(apiEndPoint + "addvehicle", { ownerId, vehicleId });
}
export async function addOwnerHouse(ownerId, houseId) {
  return await http.post(apiEndPoint + "addhouse", { ownerId, houseId });
}
export async function addOwnerShop(ownerId, shopId) {
  return await http.post(apiEndPoint + "addshop", { ownerId, shopId });
}
export async function addOwnerTool(ownerId, toolId) {
  return await http.post(apiEndPoint + "addtool", { ownerId, toolId });
}
export async function getOwnerHouses(id) {
  return await http.get(apiEndPoint + "ownerhouses/" + id);
}
export async function getOwnerShops(id) {
  return await http.get(apiEndPoint + "ownershops/" + id);
}
export async function getOwnerTools(id) {
  return await http.get(apiEndPoint + "ownertools/" + id);
}
