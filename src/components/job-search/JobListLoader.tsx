import React from "react";
import { Box, Chip } from "@mui/material";

const JobListLoader = ({ isFetching }: any) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(255, 255, 255, 0.5)"
      my={1.5}
    >
      <Chip
        sx={{ width: 120 }}
        label={isFetching ? "Fetching jobs..." : "No more jobs"}
      />
    </Box>
  );
};

export default JobListLoader;
