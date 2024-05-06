import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <CircularProgress size={24} />
    </Box>
  );
};

export default Loader;
