import Box from "@mui/material/Box";
import { slugify } from "../utils/slugify";

const BaseHeading = (props: {slug: string; children: React.ReactNode }) => {
  return (
    <Box
      onClick={() => {
        (window.location as any) = `#${props.slug}`
      }}
      id={props.slug}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: 'fit-content',
        ':hover': {
          textDecoration: 'underline',
          '::before': {
            content: '"#"',
            position: "absolute",
            left: "-1.5rem",
            width: "1rem",
            textAlign: "end",
          }
        },
      }}>
        {props.children}
    </Box>
  )
}

export const MarkdownH1 = (props: { children: string }) => {
  return <h1><BaseHeading slug={slugify(props.children)}>{props.children}</BaseHeading></h1>;
};

export const MarkdownH2 = (props: { children: string }) => {
  return <h2><BaseHeading slug={slugify(props.children)}>{props.children}</BaseHeading></h2>;
};

export const MarkdownH3 = (props: { children: string }) => {
  return <h3><BaseHeading slug={slugify(props.children)}>{props.children}</BaseHeading></h3>;
};

export const MarkdownH4 = (props: { children: string }) => {
  return <h4><BaseHeading slug={slugify(props.children)}>{props.children}</BaseHeading></h4>;
};

export const MarkdownH5 = (props: { children: string }) => {
  return <h5><BaseHeading slug={slugify(props.children)}>{props.children}</BaseHeading></h5>;
};

export const MarkdownH6 = (props: { children: string }) => {
  return <h6><BaseHeading slug={slugify(props.children)}>{props.children}</BaseHeading></h6>;
};
