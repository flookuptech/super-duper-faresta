import http from "services/httpServices";
import config from "../../config";

const authApiUrlToUserStatus = config.authApiUrl + "/userStatus/changeStatus";

export function changeUserStatus(user) {
  const url = authApiUrlToUserStatus;
  const result = http.post(url, { user });
  return result;
}
