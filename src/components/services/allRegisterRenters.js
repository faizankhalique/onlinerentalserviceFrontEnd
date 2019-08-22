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
export async function addToolBooking(toolBookingData) {
  return http.post(apiEndPoint + "addtoolbooking", toolBookingData);
}
export async function createHousePayment(renterId, housePayment) {
  return http.put(apiEndPoint + "createhousePayment/" + renterId, housePayment);
}
export async function addHousePayment(renterId, housePayment) {
  return http.put(apiEndPoint + "addhousePayment/" + renterId, housePayment);
}
export async function getRenterHousePayment(renterId) {
  return http.get(apiEndPoint + "renterhousePayments/" + renterId);
}
//----------------------------------------
export async function createShopPayment(renterId, housePayment) {
  return http.put(apiEndPoint + "createshopPayment/" + renterId, housePayment);
}
export async function addShopPayment(renterId, housePayment) {
  return http.put(apiEndPoint + "addshopPayment/" + renterId, housePayment);
}
export async function getRenterShopPayment(renterId) {
  return http.get(apiEndPoint + "rentershopPayments/" + renterId);
}
