import React from "react";
import { Typography, Box } from "@mui/material";
import JobDetailsModal from "@/components/job-search/JobDetailsModal";

interface JobDescriptionProps {
  description: string | undefined;
}

const JobDescription = ({ description }: JobDescriptionProps) => {
  return (
    <Box position="relative">
      <Typography gutterBottom variant="body1" color={"textPrimary"}>
        About Company:
      </Typography>
      <Typography variant="body2" color={"textSecondary"} component="p">
        {description?.substring(0, 400)}
      </Typography>
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={8}
        sx={{
          background:
            "linear-gradient( rgba(255,255,255,0), rgba(255,255,255,1) 60%)",
          zIndex: 2,
        }}
      >
        <JobDetailsModal jobDescription={description} />
      </Box>
    </Box>
  );
};

export default JobDescription;
