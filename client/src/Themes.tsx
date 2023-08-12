import { ThemeOptions } from "@mui/material/styles";

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#00e5ff",
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
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#101010",
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
      main: "#2196f3",
    },
    secondary: {
      main: "#067d8a",
    },
    background: {
      default: "#fff",
      paper: "#eee",
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
          cursor: "pointer",
          backgroundColor: "#f1f1f1",
          "&:hover": {
            boxShadow:
              "0px 2px 4px -1px rgba(0, 0, 0,0.2), 0px 4px 5px 0px rgba(0, 0, 0,0.14), 0px 1px 10px 0px rgba(0, 0, 0,0.12)",
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
