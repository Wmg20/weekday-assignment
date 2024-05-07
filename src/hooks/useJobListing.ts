import { useRef, useCallback, useMemo, useEffect } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useJobFilter } from "./useJobFilter";
import { debounce } from "@mui/material";

const useJobListing = (fetchJobs: any, MAX_POST_PAGE: any, filterData: any) => {
  const observer = useRef<IntersectionObserver>();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["jobs"],
      queryFn: ({ pageParam }) => fetchJobs({ pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage * MAX_POST_PAGE < lastPage.totalCount
          ? nextPage
          : undefined;
      },
      initialPageParam: 0,
      placeholderData: keepPreviousData,
    });

  const allJobs = useMemo(() => {
    return data?.pages.reduce((acc, page) => acc.concat(page.jdList), []) ?? [];
  }, [data]);

  const { filteredJobs } = useJobFilter(allJobs, filterData);

  console.log(filteredJobs.length);

  // If no data found initially while filters are applied it will call to fetch next page
  const shouldFetchNextPage = useCallback(() => {
    if (filterData && filteredJobs.length === 0 && hasNextPage && !isFetching) {
      fetchNextPage();
      console.log("Fetching next page as no data found on current page");
    }
  }, [filteredJobs, hasNextPage, isFetching, fetchNextPage, filterData]);

  useEffect(() => {
    shouldFetchNextPage();
  }, [shouldFetchNextPage]);

  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;

      const newObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (observer.current) observer.current.disconnect();
      observer.current = newObserver;

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    allJobs,
    lastElementRef,
  };
};

export default useJobListing;
