export function setUserToken(token: string) {
  localStorage.setItem("userToken", JSON.stringify(token));
}

export function removeUserToken() {
  localStorage.removeItem("userToken");
}

export function getUserToken() {
  const token = localStorage ? localStorage.getItem("userToken") : null;
  return token ? JSON.parse(token) : null;
}
