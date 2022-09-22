import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

export const MarkdownLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip placement="top" title={href} arrow TransitionComponent={Zoom}>
      <a
        style={{ textDecoration: "underline" }}
        target="_blank"
        href={href}
        rel="noreferrer"
      >
        {children}
      </a>
    </Tooltip>
  );
};
