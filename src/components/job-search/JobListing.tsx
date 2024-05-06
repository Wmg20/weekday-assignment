"use client";

import { Box, Grid } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import JobCard from "@/components/job-search/JobCard";
import JobListLoader from "@/components/job-search/JobListLoader";
import Loader from "@/components/constants/Loader";
import JobFilterForm, { Filters } from "./JobFilterForm";
import { useJobFilter } from "@/hooks/useJobFilter";

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
  maxJdSalary: number | null;
  minExp: number;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
  // numberOfEmployees?: string;
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

  const observer = useRef<IntersectionObserver>();
  const queryClient = useQueryClient();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: ({ pageParam }) => fetchJobs({ pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage * MAX_POST_PAGE < lastPage.totalCount
          ? nextPage
          : undefined;
      },
      initialPageParam: 0,
    });

  const allJobs = useMemo(() => {
    // Flatten the data
    return (
      data?.pages.reduce(
        (acc: any, page: any) => acc.concat(page.jdList),
        []
      ) ?? []
    );
  }, [data]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      // Create a new IntersectionObserver instance whenever filteredJobs changes
      const newObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      // Disconnect the previous observer
      if (observer.current) observer.current.disconnect();

      // Assign the new observer to the current ref
      observer.current = newObserver;

      // Observe the new node
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const handleFilterChange = (filters: Filters) => {
    setFilterData(filters);
    console.log(filters);

    // Invalidate the query to trigger a refetch
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const { filteredJobs } = useJobFilter(allJobs, filterData);

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
      <Grid container spacing={4} position={"relative"}>
        {filteredJobs &&
          filteredJobs.map((item: any, index: number) => (
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

              <div
                ref={
                  index === filteredJobs.length - 1 ? lastElementRef : undefined
                }
              />
            </Grid>
          ))}
      </Grid>

      <JobListLoader isFetching={isFetching} />
    </Box>
  );
}
