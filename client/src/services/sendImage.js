import http from "./httpServices";
import config from "../config";

const imageUploadUrl = config.apiUrl + "/imageUpload";
const imageUploadUrlAuditor = config.apiUrl + "/imageUpload/auditorFileUpload";

export function sendImage(data) {
  const result = http.post(sendImageApiUrl, data);
  return result;
}

export default {
  sendImage
};
