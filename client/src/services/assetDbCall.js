import http from "./httpServices";
import config from "../config";

const connectApiEndpoint = config.apiUrl + "/connect";

export async function connect(db) {
  const data = await http.post(connectApiEndpoint, { db });
  return data;
}
