import { createContext } from "react";

export const ThemeContext = createContext({
  setTheme: (newTheme: 'dark' | 'light') => { }
});