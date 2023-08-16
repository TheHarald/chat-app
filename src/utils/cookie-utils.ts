import { TOKEN_EXPIRED_DAYS } from "@/types/root-constants";

export function setCookie(name: string, value: string) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + TOKEN_EXPIRED_DAYS * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
