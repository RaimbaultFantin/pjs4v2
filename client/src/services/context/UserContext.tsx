import { createContext } from "react";
export class User {
  //public id: number;
  public email: string;
  public firstname: string;
  public familyname: string;
  constructor(email: string, firstname: string, familyname: string) {
    this.email = email;
    this.firstname = firstname;
    this.familyname = familyname;
  }
}

interface UserContextAttributes {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextAttributes>({
  user: new User("", "", ""),
  setUser: user => {}
});
