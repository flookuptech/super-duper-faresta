import http from "services/httpServices";
import config from "../../config";

const authApiUrlToResetPassword = config.authApiUrl + "/forgotPassword/reset";

export function forgotPassword(email) {
  const url = authApiUrlToResetPassword;
  const result = http.post(url, { email });
  return result;
}
