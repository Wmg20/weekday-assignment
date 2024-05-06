import { Filters } from "@/components/job-search/JobFilterForm";
import { JobListDetailsTypes } from "@/components/job-search/JobListing";
import { useEffect, useMemo, useState } from "react";

export const useJobFilter = (
  data: JobListDetailsTypes[],
  filterData: Filters
) => {
  const [filteredJobs, setFilteredJobs] = useState<JobListDetailsTypes[]>([]);

  useEffect(() => {
    const filterJobs = () => {
      return data.filter((job) => {
        // Early return for null values
        if (!job || typeof job !== "object") {
          return false;
        }

        // Check for null values in the filtered fields
        if (
          (filterData?.companyName && !job.companyName) ||
          (filterData?.location && !job.location) ||
          (filterData?.salary && !job.minJdSalary) ||
          (filterData?.minExperience && !job.minExp)
        ) {
          return false;
        }

        // Check companyName
        if (
          filterData?.companyName &&
          job.companyName.toLowerCase() !== filterData.companyName.toLowerCase()
        ) {
          return false;
        }

        // Check location against jobModes
        if (filterData?.jobModes?.title && typeof job.location === "string") {
          const remoteModeSelected =
            filterData.jobModes.title.toLowerCase() === "remote";

          // Check if "Remote" mode is selected and the job is not remote
          if (remoteModeSelected && job.location.toLowerCase() !== "remote") {
            return false; // Exclude non-remote jobs if "Remote" mode is selected
          }

          // Check if "Remote" mode is not selected and the job is remote
          if (!remoteModeSelected && job.location.toLowerCase() === "remote") {
            return false; // Exclude remote jobs if "Remote" mode is not selected
          }
        }

        // Check jobRole against jobRoles
        if (
          filterData?.jobRoles?.length &&
          typeof job.jobRole === "string" &&
          !filterData.jobRoles.some(
            (role) => role.title.toLowerCase() === job.jobRole.toLowerCase()
          )
        ) {
          return false;
        }

        // Check location
        if (
          filterData?.location &&
          job.location.toLowerCase() !== filterData.location.toLowerCase()
        ) {
          return false;
        }

        // Check salary
        if (
          filterData?.salary?.range &&
          job.minJdSalary &&
          job.minJdSalary <= parseInt(filterData.salary.range)
        ) {
          return false;
        }

        // Check minimum experience
        if (
          filterData?.minExperience?.years &&
          job.minExp &&
          job.minExp > parseInt(filterData.minExperience.years)
        ) {
          return false;
        }

        return true;
      });
    };

    const filteredResult = filterJobs();
    setFilteredJobs(filteredResult);
  }, [data, filterData]);

  return { filteredJobs };
};
