import * as React from "react";
import Box from "@mui/material/Box";

export const FOOTER_HEIGHT_REM = 2;
export const FOOTER_MARGIN_TOP_REM = 2;

export const Footer = () => {
  return (
    <Box component="footer" sx={{ flexGrow: 1, borderTop: 1, borderColor: "divider", textAlign: "center", height: `${FOOTER_HEIGHT_REM}rem` }} mt={`${FOOTER_MARGIN_TOP_REM}rem`}>
    </Box>
  );
};
