import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { debounce } from "@/utils/debounceUtils";

interface JobRole {
  title: string;
}

interface minExperienceYear {
  years: string;
}

interface JobSalary {
  range: string;
}

interface JobMode {
  title: string;
}

export interface Filters {
  companyName?: string;
  location?: string;
  jobRoles?: JobRole[];
  jobModes?: JobMode;
  minExperience?: minExperienceYear;
  salary?: JobSalary;
}

const jobRoles: JobRole[] = [
  { title: "Frontend" },
  { title: "Backend" },
  { title: "FullStack" },
  { title: "IOS" },
  { title: "Flutter" },
  { title: "React Native" },
];

const minExperienceYear: minExperienceYear[] = [
  { years: "1" },
  { years: "2" },
  { years: "3" },
  { years: "4" },
  { years: "5" },
  { years: "6" },
  { years: "7" },
  { years: "8" },
  { years: "9" },
  { years: "10" },
];

const jobSalary: JobSalary[] = [
  { range: "0L" },
  { range: "10L" },
  { range: "20L" },
  { range: "30L" },
  { range: "40L" },
  { range: "50L" },
];

const jobMode: JobMode[] = [{ title: "Remote" }, { title: "On-Site" }];

const JobFilterForm: React.FC<{
  onFilterChange: (filters: Filters) => void;
}> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    companyName: "",
    location: "",
    jobRoles: [],
    jobModes: { title: "" },
    minExperience: { years: "" },
    salary: { range: "" },
  });

  const handleAutocompleteChange = (
    event: ChangeEvent<{}>,
    newValue: any,
    id: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: newValue,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Trigger job search when user hit enter button or submit form
    e.preventDefault();
    onFilterChange(filters);
  };

  const debouncedFilterChange = debounce(onFilterChange, 300);

  useEffect(() => {
    debouncedFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Box mb={4}>
      <form onSubmit={handleFormSubmit}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          sx={{
            flexWrap: {
              lg: "wrap",
              md: "wrap",
              sm: "wrap",
              xs: "wrap",
            },
          }}
        >
          {/* Job Role  */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: {
                sm: "150px",
                xs: "100%",
              },
              fontSize: 14,
            }}
            hiddenLabel
          >
            <Autocomplete
              multiple
              size="small"
              id="tags-outlined-roles"
              options={jobRoles}
              defaultValue={[]}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={(event, newValue) =>
                handleAutocompleteChange(event, newValue, "jobRoles")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  key={params.id}
                  placeholder={filters?.jobRoles?.length === 0 ? "Role" : ""}
                  sx={{
                    "& ::placeholder": {
                      fontSize: 14,
                      verticalAlign: "middle",
                    },
                    "& input": {
                      mt: "-2.5px",
                      height: 30,
                      fontSize: 14,
                    },
                  }}
                />
              )}
            />
          </FormControl>

          {/* Number of employees  */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: {
                sm: "220px",
                xs: "100%",
              },
            }}
            hiddenLabel
          >
            <Autocomplete
              size="small"
              id="tags-outlined-minExperience"
              options={minExperienceYear}
              getOptionLabel={(option) => option.years}
              filterSelectedOptions
              onChange={(event, newValue) =>
                handleAutocompleteChange(event, newValue, "minExperience")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Minimum Experience"
                  sx={{
                    "& ::placeholder": {
                      fontSize: 14,
                      verticalAlign: "middle",
                    },
                    "& input": {
                      mt: "-2.5px",
                      height: 30,
                      fontSize: 14,
                    },
                  }}
                />
              )}
            />
          </FormControl>

          {/* Job Role Mode  */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: {
                sm: "150px",
                xs: "100%",
              },
            }}
            hiddenLabel
          >
            <Autocomplete
              // multiple
              size="small"
              id="tags-outlined-modes"
              options={jobMode}
              // defaultValue={[]}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={(event, newValue) =>
                handleAutocompleteChange(event, newValue, "jobModes")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  key={params.id}
                  placeholder="Remote"
                  sx={{
                    "& ::placeholder": {
                      fontSize: 14,
                      verticalAlign: "middle",
                    },
                    "& input": {
                      mt: "-2.5px",
                      height: 30,
                      fontSize: 14,
                    },
                  }}
                />
              )}
            />
          </FormControl>

          {/* Minimum base pay */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: {
                sm: "250px",
                xs: "100%",
              },
            }}
            hiddenLabel
          >
            <Autocomplete
              size="small"
              id="tags-outlined-salary"
              options={jobSalary}
              getOptionLabel={(option) => option.range}
              filterSelectedOptions
              onChange={(event, newValue) =>
                handleAutocompleteChange(event, newValue, "salary")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Minimum Base Pay salary"
                  sx={{
                    "& ::placeholder": {
                      fontSize: 14,
                      verticalAlign: "middle",
                    },
                    "& input": {
                      mt: "-2.5px",
                      height: 30,
                      fontSize: 14,
                    },
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: {
                sm: "150px",
                xs: "100%",
              },
            }}
            hiddenLabel
          >
            <TextField
              fullWidth
              placeholder="Company Name"
              name="companyName"
              type="search"
              value={filters.companyName}
              onChange={handleInputChange}
              sx={{
                "& ::placeholder": {
                  fontSize: 14,
                  verticalAlign: "middle",
                },
                "& input": {
                  height: "11.5px",
                },
              }}
            />
          </FormControl>

          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: {
                sm: "150px",
                xs: "100%",
              },
            }}
            hiddenLabel
          >
            <TextField
              fullWidth
              placeholder="Location"
              name="location"
              value={filters.location}
              type="search"
              onChange={handleInputChange}
              sx={{
                "& ::placeholder": {
                  fontSize: 14,
                  verticalAlign: "middle",
                },
                "& input": {
                  height: "11.5px",
                },
              }}
            />
          </FormControl>
        </Box>
        <Button type="submit" sx={{ display: "none" }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default JobFilterForm;
