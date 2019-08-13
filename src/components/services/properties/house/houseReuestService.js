import http from "../../httpService";
import { baseUrl } from "../../../../config.json";
const apiEndPoint = baseUrl.concat("houses/");
export async function getHouses() {
  return await http.get(apiEndPoint);
}
export async function getHouse(id) {
  return http.get(apiEndPoint + id);
}
export async function addHouseRequest(houseRequest) {
  return await http.post(apiEndPoint + "houserequest", houseRequest);
}
export async function getHouseRequests() {
  return await http.get(apiEndPoint + "houserequest");
}
export async function getOwnerHouseRequests(id) {
  return await http.get(apiEndPoint + "ownerhouserequest/" + id);
}
export async function approvedHouseRequest(id) {
  return await http.put(
    apiEndPoint.concat("approvedhouserequest/").concat(id),
    {
      aa: ""
    }
  );
}
export async function updateHouseRequest(id, houseRequest) {
  return await http.put(
    apiEndPoint.concat("updatehouserequest/").concat(id),
    houseRequest
  );
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
export async function deleteHouseRequest(id) {
  return http.delete(apiEndPoint + id);
}
