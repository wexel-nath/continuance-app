export const getUserFromJwt = token => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { error: "invalid jwt" };
  }
  // todo: validate signature

  const base64Url = parts[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const claims = JSON.parse(atob(base64));

  // check jwt expiry
  const timestamp = Math.floor(Date.now() / 1000);
  const expiry = claims["exp"];
  if (timestamp > expiry) {
    return { error: "expired jwt" };
  }

  return { jwtUser: claims["user"] };
};
