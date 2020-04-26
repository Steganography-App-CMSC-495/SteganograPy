import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

const Primary = "#307FE2";
const PrimaryDark = "#083D77";
const Secondary = "#212020";
const Warning = "#FFFF82";
const Success = "#23CE6B";
const Danger = "#FE4A49";
const Info = "#F4F4F4";
const DangerDark = "#BA274A";
// const Grey = "#F4F4F4";
const SubTitle = "#858C91";
const White = "#FFFFFF";

const theme = createMuiTheme({
  palette: {
    background: {
      default: Info,
    },
    common: {
      white: White,
    },
    primary: {
      main: Primary,
      dark: PrimaryDark,
    },
    secondary: {
      main: Secondary,
    },
    warning: {
      main: Warning,
    },
    error: {
      main: Danger,
      dark: DangerDark,
    },
    grey: {
      50: SubTitle,
      100: Info,
    },
    success: {
      main: Success,
    },
  },
  typography: {
    fontFamily: "El Messiri",
    h1: {
      //   fontSize: "22px",
      //   lineHeight: "32px",
      color: Secondary,
    },
    //     h2: {
    //       fontSize: "22px",
    //       lineHeight: "32px",
    //     },
    //     h3: {
    //       fontSize: "22px",
    //       lineHeight: "28px",
    //     },
    //     h4: {
    //       fontSize: "18px",
    //       lineHeight: "28px",
    //     },
    body2: {
      color: White,
      fontSize: "14px",
      lineHeight: "26px",
    },
    //     body2: {
    //       fontSize: "13px",
    //       lineHeight: "26px",
    //     },
    //     button: {
    //       fontSize: "14px",
    //       textTransform: "uppercase",
    //     },
  },
});

export default function Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
