import * as Cookies from "js-cookie";
import { User } from "../../App";

export const setSessionCookie = (session: User) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const getSessionCookie = (): User | null => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return null;
  } else {
    let { id, email, mdp, isCoach } = JSON.parse(sessionCookie);
    return new User(id, email, mdp, isCoach);
  }
};

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
