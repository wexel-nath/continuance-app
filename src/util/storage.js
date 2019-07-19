const JWT = "JWT";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export function setJwt(value) {
  localStorage.setItem(JWT, value);
}

export function getJwt() {
  return localStorage.getItem(JWT);
}

export function setRefresh(value) {
  localStorage.setItem(REFRESH_TOKEN, value);
}

export function getRefresh() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function clearTokens() {
  return localStorage.clear();
}
