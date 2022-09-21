import { TestComponent } from "./testComponent";
import { HighlightedCode } from "./HighlightedCode";
import { MarkdownLink } from "./MarkdownLink";
import {
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
} from "./MarkdownHeadings";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MarkdownTable } from "./MarkdownTable";

export const markdownComponents = {
  TestComponent,
  pre: (props: any) => <pre>{props.children}</pre>,
  code: HighlightedCode,
  a: MarkdownLink,
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  h4: MarkdownH4,
  h5: MarkdownH5,
  h6: MarkdownH6,
  table: MarkdownTable,
  tr: TableRow,
  thead: TableHead,
  tbody: TableBody,
  td: TableCell,
  th: TableCell,
};
