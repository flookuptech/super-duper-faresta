import http from "./httpServices";
import config from "../config";

const apiUrlToSearchAsset = config.apiUrl + "/search";

export function searchQuery(query) {
  const url = apiUrlToSearchAsset + "?query=" + query;
  const result = http.get(url);
  return result;
}

export default {
  searchQuery
};
