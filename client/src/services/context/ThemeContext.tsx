import { createContext } from "react";
interface ThemeContextAttributes {
  hightDark: string;
  mediumDark: string;
  lightDark: string; //border
  white: string;
  hightRed: string;
  darkRed: string;
  blue: string;
}
export const ThemeContext = createContext<ThemeContextAttributes>({
  hightDark: "#23272a",
  mediumDark: "#2c2f33",
  lightDark: "#7d7d7d", //border
  white: "white",
  hightRed: "#f50057",
  darkRed: "#880e4f",
  blue: "#42a5f5"
});
