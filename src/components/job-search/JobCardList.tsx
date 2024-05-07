import React from "react";
import { Grid } from "@mui/material";

import JobCard from "@/components/job-search/JobCard";
import { JobListDetailsTypes } from "./JobListing";

interface JobCardListProps {
  filteredJobs: JobListDetailsTypes[];
  lastElementRef: any;
}

const JobCardList = ({ filteredJobs, lastElementRef }: JobCardListProps) => {
  return (
    <>
      <Grid container spacing={4} position="relative">
        {filteredJobs.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={item.jdUid}>
            <JobCard
              title={item.companyName}
              description={item.jobDetailsFromCompany}
              applyLink={item.jdLink}
              company={item.companyName}
              experience={item.maxExp}
              location={item.location}
              logoUrl={item.logoUrl}
              jobRole={item.jobRole}
              maxExp={item.maxExp}
              minExp={item.minExp}
              minJdSalary={item.minJdSalary}
              maxJdSalary={item.maxJdSalary}
              salaryCurrencyCode={item.salaryCurrencyCode}
            />
            {index === filteredJobs.length - 1 && (
              <div ref={lastElementRef}></div>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobCardList;
