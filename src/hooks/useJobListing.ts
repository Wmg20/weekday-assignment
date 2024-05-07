import { useRef, useCallback, useMemo } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const useJobListing = (fetchJobs: any, MAX_POST_PAGE: any) => {
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

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
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
