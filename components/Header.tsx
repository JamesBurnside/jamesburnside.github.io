import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { Tooltip, Zoom } from "@mui/material";
import { ThemeSwitcher } from "./ThemeSwitcher";

const HEADER_SIDE_ITEM_WIDTH = 100;
export const HEADER_HEIGHT_REM = 4;

export const Header = () => {
  return (
    <Box
      component="header"
      sx={{ flexGrow: 1, height: `${HEADER_HEIGHT_REM}rem` }}
    >
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box textAlign="start" sx={{ width: HEADER_SIDE_ITEM_WIDTH }}>
          <ThemeSwitcher />
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
          <SocialHeaderButton
            href="https://github.com/JamesBurnside"
            ariaLabel="James Burnside GitHub profile"
            tooltipText="Follow me on GitHub"
          >
            <GitHubIcon />
          </SocialHeaderButton>
          <SocialHeaderButton
            href="https://www.linkedin.com/in/jameseburnside/"
            ariaLabel="James Burnside LinkedIn profile"
            tooltipText="Contact me on LinkedIn"
          >
            <LinkedInIcon />
          </SocialHeaderButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

const SocialHeaderButton = (props: {
  href: string;
  ariaLabel: string;
  tooltipText: string;
  children: React.ReactNode;
}) => (
  <Tooltip
    TransitionComponent={Zoom}
    title={props.tooltipText}
    placement="bottom"
    arrow
  >
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      aria-label={props.ariaLabel}
    >
      <IconButton component="div" role="presentation" tabIndex={-1}>
        {props.children}
      </IconButton>
    </a>
  </Tooltip>
);
