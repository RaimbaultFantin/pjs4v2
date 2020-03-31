import { createContext } from "react";

interface TokenContextAttributes {
  token: string | null;
  setToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextAttributes>({
  token: "",
  setToken: token => {}
});
