import React from "react";
import Link from "next/link";
import { Button, Stack, Avatar } from "@mui/material";
import { Bolt } from "@mui/icons-material";

interface JobCardActions {
  applyLink: string;
}

const JobCardActions = ({ applyLink }: any) => {
  return (
    <Stack gap={2}>
      <Button
        size="large"
        fullWidth
        LinkComponent={Link}
        disableElevation
        variant="contained"
        color="primary"
        href={applyLink}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          color: "common.black",
          fontWeight: 400,
        }}
        startIcon={<Bolt htmlColor="orange" />}
      >
        Easy Apply
      </Button>
      <Button
        size="large"
        fullWidth
        LinkComponent={Link}
        disableElevation
        variant="contained"
        color="secondary"
        href={applyLink}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          color: "common.white",
          fontWeight: 400,
        }}
        startIcon={
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "cenetr",
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 26,
                height: 26,
                fontSize: "16px",
                fontWeight: 400,
              }}
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Avatar
              sx={{
                width: 26,
                height: 26,
                fontSize: "16px",
                fontWeight: 400,
              }}
              alt="Travis Howard"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </span>
        }
      >
        Ask for referral
      </Button>
    </Stack>
  );
};

export default JobCardActions;
