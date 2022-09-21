import Tooltip from "@mui/material/Tooltip";

export const MarkdownLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip placement="top" title={href} arrow>
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
