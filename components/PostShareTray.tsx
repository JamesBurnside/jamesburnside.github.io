import { useEffect, useState } from "react";
import { IconButton, Stack, Tooltip, Zoom } from "@mui/material";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Link from "@mui/icons-material/Link";
import copy from "clipboard-copy";

export const PostShareTray = (): JSX.Element => {
  // Set window url after component mounts to avoid SSR issues
  const [windowUrl, setWindowUrl] = useState("");
  useEffect(() => {
    setWindowUrl(window.location.href);
  }, []);

  return (
    <Stack direction="row" spacing={-1}>
      <ExternalLinkShareButton
        icon={Twitter}
        tooltipText="Share on Twitter"
        shareUrl={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          windowUrl
        )}`}
      />
      <ExternalLinkShareButton
        icon={Facebook}
        tooltipText="Share on Facebook"
        shareUrl={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          windowUrl
        )}`}
      />
      <ExternalLinkShareButton
        icon={LinkedIn}
        tooltipText="Share on LinkedIn"
        shareUrl={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          windowUrl
        )}`}
      />
      <CopyToClipboardShareButton
        icon={Link}
        tooltipText="Copy link"
        shareUrl={windowUrl}
      />
    </Stack>
  );
};

const ExternalLinkShareButton = (props: {
  icon: (props: any) => JSX.Element;
  tooltipText: string;
  shareUrl: string;
}) => {
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={props.tooltipText}
      placement="top"
      arrow
    >
      <a
        aria-label={props.tooltipText}
        href={props.shareUrl}
        target="popup"
        rel="noreferrer"
        onClick={() =>
          window.open(props.shareUrl, "name", "width=600,height=400")
        }
      >
        <IconButton component="div" role="presentation" tabIndex={-1}>
          <props.icon fontSize="small" />
        </IconButton>
      </a>
    </Tooltip>
  );
};

const CopyToClipboardShareButton = (props: {
  icon: (props: any) => JSX.Element;
  tooltipText: string;
  shareUrl: string;
}) => {
  const [copyToClipboardClicked, setCopyToClipboardClicked] = useState(false);

  const runCopyToClipboard = () => {
    if (!copyToClipboardClicked) {
      setCopyToClipboardClicked(true);
      copy(props.shareUrl);
      setTimeout(() => {
        setCopyToClipboardClicked(false);
      }, 2000);
    }
  }

  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={
        copyToClipboardClicked ? "Copied to clipboard ✅" : props.tooltipText
      }
      placement="top"
      arrow
    >
      <a
        tabIndex={0}
        aria-label="Copy article link to clipboard"
        onClick={runCopyToClipboard}
        role="button"
        onKeyDown={(e: any) => e.key === "Enter" && runCopyToClipboard()}
      >
        <IconButton component="div" role="presentation" tabIndex={-1}>
          <props.icon fontSize="small" />
        </IconButton>
      </a>
    </Tooltip>
  );
};
