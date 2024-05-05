"use client";

import { Lexend } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const lexend = Lexend({
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#55efc4",
          light: "##33c9dc",
          dark: "#1de9b6",
          contrastText: "#fff",
        },
        secondary: {
          main: "#4943da",
          light: "#64b5f6",
          dark: "#0e7fe1",
          contrastText: "#fff",
        },
      },
    },
  },

  typography: {
    fontFamily: lexend.style.fontFamily,
  },
});

export default theme;
