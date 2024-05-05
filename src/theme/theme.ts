"use client";

import { Lexend } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const lexend = Lexend({
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  cssVarPrefix: "md-demo",
  typography: {
    fontFamily: lexend.style.fontFamily,
  },
});

export default theme;
