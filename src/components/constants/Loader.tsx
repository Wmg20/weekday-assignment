import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor="rgba(255, 255, 255, 0.8)"
    >
      <CircularProgress size={24} />
    </Box>
  );
};

export default Loader;
