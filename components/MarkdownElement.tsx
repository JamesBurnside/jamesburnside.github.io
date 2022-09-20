/// Adapted from: https://github.com/mui/material-ui/blob/master/docs/src/components/markdown/MarkdownElement.tsx

import * as React from "react";
import clsx from "clsx";
import {
  // alpha,
  // darken,
  styled,
} from "@mui/material/styles";

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
  display: 'inline-block',
  fontSize: '0.8125rem',
  lineHeight: 18 / 12,
  letterSpacing: 0,
  fontWeight: 700,
}

const Root = styled("div")(({ theme }) => {
  return {
    ...captionStyles,
    color: theme.palette.text.primary,
    '& code[class*="language-"]': {
      // Avoid layout jump after hydration (style injected by prism)
      ...captionStyles,
      backgroundColor: blueDark[800],
      fontFamily: fontFamilyCode,
      fontWeight: 400,
      WebkitFontSmoothing: "subpixel-antialiased",
      WebkitOverflowScrolling: "touch", // iOS momentum scrolling.
      maxHeight: '400px',
      colorScheme: 'dark',
      borderRadius: theme.shape.borderRadius,
      border: '1px solid',
      borderColor: blueDark[700],
      margin: theme.spacing(0, 'auto'),
      padding: theme.spacing(2),
      direction: "ltr",
      overflow: "auto",
    },
  };
});

type MarkdownElementProps = {
  renderedMarkdown: string;
} & Omit<JSX.IntrinsicElements["div"], "ref">;

const MarkdownElement = React.forwardRef<HTMLDivElement, MarkdownElementProps>(
  function MarkdownElement(props, ref) {
    const { className, renderedMarkdown, ...other } = props;
    const more: Record<string, unknown> = {};

    if (typeof renderedMarkdown === "string") {
      // workaround for https://github.com/facebook/react/issues/17170
      // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
      more.dangerouslySetInnerHTML = { __html: renderedMarkdown };
    }

    return (
      <Root
        className={clsx("markdown-body", className)}
        {...more}
        {...other}
        ref={ref}
      />
    );
  }
);

export default MarkdownElement;
