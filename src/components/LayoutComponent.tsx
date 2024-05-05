import React from "react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme/theme";
import { Container } from "@mui/material";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <CssVarsProvider theme={theme}>
        <Container maxWidth="xl">{children}</Container>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
};

export default LayoutComponent;
