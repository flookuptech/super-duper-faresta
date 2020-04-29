import http from "./httpServices";

const userKey = "User";
const token = "token";

http.setToken(getToken());

export function getToken() {
  return localStorage.getItem(token);
}

export function getUser() {
  return localStorage.getItem(userKey);
}

export default {
  getUser,
};
