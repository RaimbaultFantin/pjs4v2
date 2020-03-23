import { createContext } from "react";

interface HeightContextAttributes {
  screenHeight: number;
  navbar: number;
  bottomnav: number;
}

export const HeightContext = createContext<HeightContextAttributes>({
  screenHeight: 0,
  navbar: 0,
  bottomnav: 0
});
