import { ThemeOptions } from "@mui/material/styles";

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#00f3ff",
    },
    secondary: {
      main: "#8689DC",
    },
    background: {
      default: "#000011",
      paper: "#000000",
    },
    text: {
      primary: "#c5c5c5",
      secondary: "#efefef",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: { textDecoration: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          gap: "0.1rem",
          "&:hover": {
            boxShadow: "0px 3px 0px -1px rgb(134,137,220)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #2a2a2a",
        },
      },
    },
  },
};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#00f3ff",
    },
    secondary: {
      main: "#8689DC",
    },
    background: {
      default: "#eeeeee",
      paper: "#fefefe",
    },
    text: {
      primary: "#324b4d",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#324b4d",
          textDecoration: "none",
          "&:active": { color: "inherit" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          gap: "0.1rem",
          "&:hover": {
            boxShadow:
              "0px 5px 5px -3px rgba(0, 0, 0,0.2), 0px 8px 10px 1px rgba(0, 0, 0,0.14), 0px 3px 14px 2px rgba(0, 0, 0,0.12)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#324b4d",
        },
      },
    },
  },
};
