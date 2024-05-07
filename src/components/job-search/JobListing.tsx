"use client";

import { useState } from "react";
import { Box } from "@mui/material";

import useJobListing from "@/hooks/useJobListing";
import Loader from "@/components/constants/Loader";
import { useJobFilter } from "@/hooks/useJobFilter";
import JobListLoader from "@/components/job-search/JobListLoader";
import JobFilterForm, { Filters } from "@/components/job-search/JobFilterForm";
import JobCardList from "@/components/job-search/JobCardList";

const MAX_POST_PAGE = 10;

export interface JobListDetailsTypes {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
}

const fetchJobs = async ({ pageParam = 0 }: { pageParam: number }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: MAX_POST_PAGE,
    offset: pageParam * MAX_POST_PAGE,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    requestOptions
  );

  const data = (await response.json()) as any;
  console.log(data);
  const { jdList, totalCount } = data;

  // Assuming jdList contains the todos
  return { jdList, totalCount };
};

export default function JobListing() {
  const [filterData, setFilterData] = useState<any>();

  const { error, isFetching, isLoading, allJobs, lastElementRef } =
    useJobListing(fetchJobs, MAX_POST_PAGE);

  const { filteredJobs } = useJobFilter(allJobs, filterData);

  const handleFilterChange = (filters: Filters) => {
    setFilterData(filters);
    console.log(filters);
  };

  if (isLoading) return <Loader />;

  if (error) return <h1> Oh no there was an erro </h1>;

  return (
    <Box
      sx={{
        pt: {
          md: 4,
          sm: 3,
          xs: 2,
        },
      }}
    >
      <JobFilterForm onFilterChange={handleFilterChange} />
      <JobCardList
        filteredJobs={filteredJobs}
        lastElementRef={lastElementRef}
      />
      <JobListLoader isFetching={isFetching} />
    </Box>
  );
}
