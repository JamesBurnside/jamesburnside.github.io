import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useTheme } from "@mui/material";

const HEADER_SIDE_ITEM_WIDTH = 100;

export const Header = () => {
  const isDarkTheme = useTheme().palette.mode === 'dark';
  const themeContext = useContext(ThemeContext);

  return (
    <Box sx={{ flexGrow: 1 }} role="header">
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box textAlign="start" sx={{ width: HEADER_SIDE_ITEM_WIDTH }}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="change theme"
            value={isDarkTheme ? 'dark' : 'light'}
            onChange={(_, newTheme) => themeContext.setTheme(newTheme)}
          >
            <ToggleButton value="dark">Dark</ToggleButton>
            <ToggleButton value="light">Light</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          sx={{ flex: 1 }}
        >
          <Link href="/">James Burnside</Link>
        </Typography>
        <Box textAlign="end" sx={{ width: HEADER_SIDE_ITEM_WIDTH }}>
          <a href="https://github.com/JamesBurnside" target="_blank" rel="noreferrer">
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </a>
          <a href="https://www.linkedin.com/in/jameseburnside/" target="_blank" rel="noreferrer">
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </a>
        </Box>
      </Toolbar>
    </Box>
  );
};