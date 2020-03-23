import { createContext } from "react";

interface CurrentTitlePageContextAttributes {
  title: string;
  setTitle: (title: string) => void;
}

export const CurrentTitlePageContext = createContext<
  CurrentTitlePageContextAttributes
>({
  title: "",
  setTitle: title => {}
});
