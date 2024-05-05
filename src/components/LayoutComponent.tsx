"use client";

import React from "react";
import { Container } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import theme from "@/theme/theme";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <AppRouterCacheProvider>
      <CssVarsProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Container component={"main"} maxWidth="xl">
            {children}
          </Container>
        </QueryClientProvider>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
};

export default LayoutComponent;
