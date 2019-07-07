export function writeCookie(name, value, ttl) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + "=" + encodeURIComponent(value);
  cookie += "; max-age=" + ttl;
  document.cookie = cookie;
}

export function readCookie(name) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}
