import http from "./httpServices";
import config from "../config";

const apiUrlToGetReportsData = config.apiUrl + "/reports";

export function getReportsData() {
  const result = http.get(apiUrlToGetReportsData + "/all");
  return result;
}

export function getReportsDataVerifiedOnly() {
  const result = http.get(apiUrlToGetReportsData + "/verifiedStatus");
  return result;
}

export function getAuditorRemarksOnly() {
  const result = http.get(apiUrlToGetReportsData + "/auditorRemarksOnly");
  return result;
}

export function getJuniorRemarksOnly() {
  const result = http.get(apiUrlToGetReportsData + "/juniorRemarksOnly");
  return result;
}

export default {
  getReportsData,
  getReportsDataVerifiedOnly,
  getAuditorRemarksOnly,
  getJuniorRemarksOnly
};
