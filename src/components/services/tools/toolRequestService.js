import { baseUrl } from "../../../config.json";
import http from "./../httpService";
const apiEndPoint = baseUrl.concat("tools/");
export async function getTools() {
  return await http.get(apiEndPoint);
}
export async function getTool(id) {
  return http.get(apiEndPoint + id);
}
export async function addToolRequest(toolRequest) {
  return await http.post(apiEndPoint + "toolrequest", toolRequest);
}
export async function getToolRequests() {
  return await http.get(apiEndPoint + "toolrequest");
}
export async function getOwnerToolRequests(id) {
  return await http.get(apiEndPoint + "ownertoolrequest/" + id);
}
export async function approvedToolRequest(id) {
  return await http.put(apiEndPoint.concat("approvedtoolrequest/").concat(id), {
    aa: ""
  });
}
export async function updateToolRequest(id, toolRequest) {
  return await http.put(
    apiEndPoint.concat("updatetoolrequest/").concat(id),
    toolRequest
  );
}
export async function sendEmail(emailData) {
  return await http.post(baseUrl.concat("sendemail/"), emailData);
}
export async function deleteToolRequest(id) {
  return http.delete(apiEndPoint + id);
}
