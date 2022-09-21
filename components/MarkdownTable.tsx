import { Paper, Table, TableContainer } from "@mui/material";

export const MarkdownTable = (props: any) => {
  return (
    <TableContainer component={Paper}>
      <Table {...props} />
    </TableContainer>
  );
};
