import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useCallback } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<'dark' | 'light'>(prefersDarkMode ? 'dark' : 'light');
  const themeContextValue = useMemo(() => ({
    setTheme
  }), [setTheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
