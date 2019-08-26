import { baseUrl } from "../../config.json";
import http from "./httpService";
const apiEndPoint = baseUrl.concat("vehiclebooking/");
export async function getVehiclesBookings() {
  return http.get(apiEndPoint);
}
export async function getRenterVehiclesBookings(id) {
  return http.get(apiEndPoint + id);
}
export async function updateVehiclesBookings(id, vehicleBookingData) {
  return http.put(apiEndPoint + id, vehicleBookingData);
}
export async function getVehicleBooking(id) {
  return http.get(apiEndPoint + "vehiclebooking/" + id);
}
export async function confirmVehicleBooking(id) {
  return http.put(apiEndPoint + "confirmbooking/" + id);
}
