/// Adapted from: https://github.com/mui/material-ui/blob/master/docs/src/modules/components/HighlightedCode.js

import * as React from "react";
import prism from "../lib/prism";
import { Box, useTheme } from "@mui/material";

export const HighlightedCode = (props: {
  className: string;
  children: string;
}) => {
  const { children: code } = props;
  const language = props.className?.replace(/language-/, "") || undefined;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);

  return (
    <CodeStyleWrap isInline={!language}>
      <code
        className={`language${language ? `-${language}` : ""}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: renderedCode }}
      />
    </CodeStyleWrap>
  );
};

const CodeStyleWrap = (props: { children: React.ReactNode; isInline: boolean }) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        ...captionStyles,
        color: theme.palette.text.primary,
        backgroundColor: props.isInline ? theme.palette.grey[theme.palette.mode === 'dark' ? 800: 200] : undefined,
        fontFamily: fontFamilyCode,
        fontWeight: 400,
        '& code[class*="language-"]': {
          // Avoid layout jump after hydration (style injected by prism)
          ...captionStyles,
          backgroundColor: blueDark[800],
          WebkitFontSmoothing: "subpixel-antialiased",
          WebkitOverflowScrolling: "touch", // iOS momentum scrolling.
          maxHeight: "400px",
          colorScheme: "dark",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: blueDark[700],
          margin: theme.spacing(0, 'auto'),
          padding: theme.spacing(2),
          direction: "ltr",
          overflow: "auto",
        },
      }}
    >
      {props.children}
    </Box>
  );
};

const fontFamilyCode = [
  "Consolas",
  "Menlo",
  "Monaco",
  "Andale Mono",
  "Ubuntu Mono",
  "monospace",
].join(",");

const blueDark = {
  50: "#E2EDF8",
  100: "#CEE0F3",
  200: "#91B9E3",
  300: "#5090D3",
  main: "#5090D3",
  400: "#265D97",
  500: "#1E4976",
  600: "#173A5E",
  700: "#132F4C", // contrast 13.64:1
  800: "#001E3C",
  900: "#0A1929",
};

const captionStyles = {
  display: "inline-block",
  fontSize: "0.8125rem",
  lineHeight: 18 / 12,
  letterSpacing: 0,
};
