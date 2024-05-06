import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface JobSalaryProps {
  minJdSalary: number | undefined;
  maxJdSalary: number | undefined;
  salaryCurrencyCode: string | undefined;
}

const JobSalary = ({
  minJdSalary,
  maxJdSalary,
  salaryCurrencyCode,
}: JobSalaryProps) => {
  const salaryCurrencyIcon = salaryCurrencyCode === "USD" ? "$" : "₹";
  return (
    <Box my={2}>
      <Typography
        component={"div"}
        variant="body2"
        fontWeight={400}
        color={"textSecondary"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <span>Estimated Salary:</span>
        <span>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            flexWrap={"wrap"}
          >
            <Stack direction="row" alignItems="center">
              {minJdSalary && salaryCurrencyIcon}
              <span>{minJdSalary || "NA"}</span>
            </Stack>
            -
            <Stack direction="row" alignItems="center">
              {maxJdSalary && salaryCurrencyIcon}
              <span>{maxJdSalary}</span>
            </Stack>
            LPA
            <CheckBoxIcon htmlColor="#00d26a" />
          </Stack>
        </span>
      </Typography>
    </Box>
  );
};

export default JobSalary;
