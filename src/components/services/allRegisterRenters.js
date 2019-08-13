import { baseUrl } from "../../config.json";
import http from "./httpService";

const apiEndPoint = baseUrl.concat("allregisterrenters/");
export async function getRentersDetails() {
  return await http.get(apiEndPoint + "all");
}
export async function getRenterDetails(id) {
  return await http.get(apiEndPoint + id);
}
export async function addVehiclesBooking(vehicleBookingData) {
  return http.post(apiEndPoint + "/addvehiclebooking", vehicleBookingData);
}
export async function addHouseBooking(houseBookingData) {
  return http.post(apiEndPoint + "/addhousebooking", houseBookingData);
}
export async function addShopBooking(shopBookingData) {
  return http.post(apiEndPoint + "/addshopbooking", shopBookingData);
}
