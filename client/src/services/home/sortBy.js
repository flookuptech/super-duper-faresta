import http from "services/httpServices";
import config from "../../config";

const apiUrlToGetAssets = config.apiUrl + "/getAssets";

export function getSortedAssets(fields) {
  const url =
    apiUrlToGetAssets + "/sortAssetsBy?sortBy=" + JSON.stringify(fields);
  const result = http.post(url);
  return result;
}
