import { useInfiniteQuery } from "react-query";

import { getPageData } from "@/util/api";

type PageProps<T> = { data: T[]; totalElements: number };

const useInfinite = <T,>(endPoint: string, page_limit: number) => {
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      endPoint,
      async ({ pageParam = 1 }) =>
        getPageData<T>(endPoint, pageParam, page_limit),
      {
        getNextPageParam: (
          lastPage: PageProps<T>,
          allPages: PageProps<T>[]
        ) => {
          if (lastPage.data.length < page_limit) {
            return null;
          }
          return allPages.length + 1;
        },
      }
    );
  return {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};
export default useInfinite;
