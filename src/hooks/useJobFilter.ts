import { useEffect, useState } from "react";

import { Filters } from "@/components/job-search/JobFilterForm";
import { JobListDetailsTypes } from "@/components/job-search/JobListing";

export const useJobFilter = (
  data: JobListDetailsTypes[],
  filterData: Filters
) => {
  const [filteredJobs, setFilteredJobs] = useState<JobListDetailsTypes[]>([]);

  useEffect(() => {
    const filterJobs = () => {
      return data.filter((job) => {
        if (!job || typeof job !== "object") {
          return false;
        }

        if (
          filterData?.companyName &&
          job.companyName.toLowerCase() !== filterData.companyName.toLowerCase()
        ) {
          return false;
        }

        if (
          filterData?.jobModes &&
          filterData.jobModes.length > 0 &&
          job.location &&
          typeof job.location === "string"
        ) {
          const jobLocation = job.location.toLowerCase();
          if (
            !filterData.jobModes.some(
              (mode) => mode.title.toLowerCase() === jobLocation
            )
          ) {
            return false;
          }
        }

        if (
          filterData?.jobRoles &&
          filterData.jobRoles.length > 0 &&
          job.jobRole &&
          typeof job.jobRole === "string"
        ) {
          const jobType = job.jobRole.toLowerCase();
          if (
            !filterData.jobRoles.some(
              (role) => role.title.toLowerCase() === jobType
            )
          ) {
            return false;
          }
        }

        if (
          filterData?.location &&
          job.location.toLowerCase() !== filterData.location.toLowerCase()
        ) {
          return false;
        }

        if (filterData?.salary && filterData.salary.range && job.minJdSalary) {
          const filterSalary = parseInt(filterData.salary.range);
          if (job.minJdSalary <= filterSalary) {
            return false; // Exclude jobs with salaries below the filter range
          }
        }

        return true;
      });
    };

    const filteredResult = filterJobs();
    setFilteredJobs(filteredResult);
    console.log("use job filter");
  }, [data, filterData]);

  return { filteredJobs };
};
