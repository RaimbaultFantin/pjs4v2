import * as Cookies from "js-cookie";

export const setTokenCookie = (token: string) => {
  Cookies.remove("token");
  Cookies.set("token", token, { expires: 14 });
};

export const getToken = () => {
  const token = Cookies.get("token");

  if (token === undefined) {
    return null;
  } else {
    return token;
  }
};
