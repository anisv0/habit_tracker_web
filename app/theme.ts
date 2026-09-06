"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A0D18",
      dark: "#3A090D",
      light: "#6E1A22",
      contrastText: "#FFFCF7",
    },
    secondary: {
      main: "#C6A15B",
      dark: "#A8863F",
      light: "#DCC08A",
      contrastText: "#2E1A16",
    },
    background: {
      default: "#F2E7D6",
      paper: "#FFFCF7",
    },
    text: {
      primary: "#2E1A16",
      secondary: "#6B5744",
    },
    divider: "#E3D2B9",
    success: { main: "#4E7A52" },
    error: { main: "#A33A3A" },
  },

  typography: {
    fontFamily: "var(--font-inter)",
    h1: { fontWeight: 700, fontSize: "2.5rem", letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.01em" },
    h3: { fontWeight: 700, fontSize: "1.5rem" },
    h4: { fontWeight: 600, fontSize: "1.25rem" },
    h5: { fontWeight: 600, fontSize: "1.125rem" },
    h6: { fontWeight: 600, fontSize: "1rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: "none" },
  },

  shape: { borderRadius: 12 },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 20, paddingBlock: 10 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E3D2B9",
          boxShadow: "0 1px 2px rgba(46,26,22,0.06)",
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10, backgroundColor: "#FFFCF7" },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "primary" },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16 } },
    },
  },
});

export default theme;
