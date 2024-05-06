import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { HourglassBottom } from "@mui/icons-material";

import JobCardActions from "@/components/job-search/JobCardActions";
import JobSalarySection from "@/components/job-search/JobSalarySection";
import CompanyInfo from "@/components/job-search/CompanyInfo";
import JobDescription from "@/components/job-search/JobDescription";

export interface JobCardProps {
  title?: string;
  company: string;
  location: string;
  description: string;
  experience: string;
  applyLink: string;
  logoUrl: any;
  jobRole: string;
  maxExp: number;
  minExp: number;
  minJdSalary?: number;
  maxJdSalary?: number;
  salaryCurrencyCode: string;
}

const JobCard = ({
  company,
  location,
  description,
  experience,
  applyLink,
  logoUrl,
  jobRole,
  minExp,
  minJdSalary,
  maxJdSalary,
  salaryCurrencyCode,
}: JobCardProps) => {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 2 }} elevation={0}>
      <CardContent>
        <Chip
          variant="outlined"
          label="Posted 16 days ago"
          icon={<HourglassBottom sx={{ p: 0.5 }} />}
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              fontSize: 12,
              fontWeight: 300,
            },
          }}
        />

        <CompanyInfo
          logoUrl={logoUrl}
          company={company}
          jobRole={jobRole}
          location={location}
          applyLink={applyLink}
        />

        <JobSalarySection
          minJdSalary={minJdSalary}
          maxJdSalary={maxJdSalary}
          salaryCurrencyCode={salaryCurrencyCode}
        />

        <JobDescription description={description} />

        <Box mb={2} mt={2}>
          <Typography
            gutterBottom
            variant="body2"
            fontWeight={500}
            color="textSecondary"
          >
            Minimum Experience
          </Typography>
          <Typography variant="body2" fontWeight={400} color="textPrimary">
            {experience ? `${minExp} years` : "NA"}
          </Typography>
        </Box>

        <JobCardActions applyLink={applyLink} />
      </CardContent>
    </Card>
  );
};

export default JobCard;
