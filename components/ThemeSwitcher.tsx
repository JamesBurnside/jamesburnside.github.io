import React, { useEffect } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { IconButton, styled, useTheme } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <HiddenWhenLargeBp>
        <DarkLightToggleIconButton
          isDarkTheme={isDarkTheme}
          onThemeChange={() => {
            themeContext.setTheme(isDarkTheme ? "light" : "dark");
          }}
        />
      </HiddenWhenLargeBp>
      <HiddenWhenSmallBp>
        <ThemeSwitcherButtons
          isDarkTheme={isDarkTheme}
          onThemeChange={() => {
            themeContext.setTheme(isDarkTheme ? "light" : "dark");
          }}
        />
      </HiddenWhenSmallBp>
    </>
  );
};

const HiddenWhenSmallBp = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const HiddenWhenLargeBp = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const DarkLightToggleIconButton = (props: {
  isDarkTheme: boolean;
  onThemeChange: () => void;
}) => (
  <IconButton onClick={props.onThemeChange} color="inherit" sx={{}}>
    {props.isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>
);

const ThemeSwitcherButtons = (props: {
  isDarkTheme: boolean;
  onThemeChange: () => void;
}) => (
  <ToggleButtonGroup
    color="primary"
    exclusive
    aria-label="change theme"
    value={props.isDarkTheme ? "dark" : "light"}
    onChange={props.onThemeChange}
  >
    <ToggleButton value="dark">Dark</ToggleButton>
    <ToggleButton value="light">Light</ToggleButton>
  </ToggleButtonGroup>
);
