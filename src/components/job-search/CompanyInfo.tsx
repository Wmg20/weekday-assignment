import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface CompanyInfoProps {
  logoUrl: string;
  company: string;
  jobRole: string;
  location: string;
  applyLink: string;
}

const CompanyInfo = ({
  logoUrl,
  company,
  jobRole,
  location,
  applyLink,
}: CompanyInfoProps) => {
  return (
    <Box mt={2}>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Image
          src={logoUrl}
          alt="logo"
          height={50}
          width={50}
          style={{ borderRadius: 4 }}
        />

        <Box>
          <Typography
            component={"a"}
            variant="body1"
            fontWeight={600}
            color={"textSecondary"}
            href={applyLink}
            sx={{ textDecoration: "none", cursor: "pointer" }}
          >
            {company}
          </Typography>

          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography
              variant="body2"
              color={"textPrimary"}
              sx={{ textTransform: "uppercase" }}
            >
              {jobRole}
            </Typography>
            <Typography color={"textSecondary"} component={"span"}>
              •
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textTransform: "capitalize" }}
            >
              {location}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CompanyInfo;
