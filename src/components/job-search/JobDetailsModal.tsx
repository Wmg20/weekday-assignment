"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    sm: "70%",
    xs: "90%",
  },
  height: {
    lg: "70%",
    md: "60%",
    sm: "50%",
    xs: "80%",
  },
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  p: 3,
  borderRadius: 4,
  overflowY: "scroll",
};

interface JobDetailsModalProps {
  jobDescription: string | undefined;
}

export default function JobDetailsModal({
  jobDescription,
}: JobDetailsModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button
          size="medium"
          variant="text"
          onClick={handleOpen}
          color="secondary"
          sx={{ textTransform: "none", fontWeight: 300 }}
        >
          Show more
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            align="center"
            fontWeight={500}
            sx={{ mb: 2 }}
          >
            Job Description
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color={"textPrimary"}
            sx={{ mt: 2 }}
          >
            About Company:
          </Typography>
          <Typography variant="body1" color={"textSecondary"}>
            About Company:
            {jobDescription}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
