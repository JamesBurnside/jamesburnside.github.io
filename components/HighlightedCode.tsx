/// Adapted from: https://github.com/mui/material-ui/blob/master/docs/src/modules/components/HighlightedCode.js

import * as React from "react";
import PropTypes from "prop-types";
import copy from "clipboard-copy";
import prism from "../lib/prism";
import { useCodeCopy } from "../utils/codecopy";
import MarkdownElement from "./MarkdownElement";

const HighlightedCode = (props: any) => {
  const {
    copyButtonHidden = true,
    copyButtonProps,
    children: code,
    component: Component = MarkdownElement,
    ...other
  } = props;
  const language = props.className?.replace(/language-/, "") || "";
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);
  const [copied, setCopied] = React.useState(false);
  const [key, setKey] = React.useState("Ctrl + ");
  const handlers = useCodeCopy();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const macOS = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      if (macOS) {
        setKey("⌘");
      }
    }
  }, []);
  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
    return undefined;
  }, [copied]);

  return (
    <Component {...other}>
      <div tabIndex={-1} className="MuiCode-root" {...handlers as any}>
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: renderedCode }}
        />
        {!copyButtonHidden && (
          <button
            {...copyButtonProps}
            aria-label="Copy the code"
            type="button"
            className="MuiCode-copy"
            onClick={async () => {
              setCopied(true);
              await copy(code);
            }}
          >
            {copied ? "Copied" : "Copy"}&nbsp;
            <span className="MuiCode-copyKeypress">
              <span>(Or</span> {key}C<span>)</span>
            </span>
          </button>
        )}
      </div>
    </Component>
  );
};

HighlightedCode.propTypes = {
  code: PropTypes.string,
  component: PropTypes.elementType,
  copyButtonHidden: PropTypes.bool,
  copyButtonProps: PropTypes.object,
  sx: PropTypes.object,
  className: PropTypes.string,
};

export default HighlightedCode;
