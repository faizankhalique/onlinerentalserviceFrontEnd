import http from "./httpService";
import { baseUrl } from "../../config.json";
const apiEndpoint = baseUrl.concat("reports/");
export async function getProductsData() {
  return http.get(apiEndpoint + "/productsdata");
}
export async function getAllMonthsPrfits() {
  return http.get(apiEndpoint + "/allmonthsprofits");
}
