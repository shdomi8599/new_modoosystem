import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

import { getPageData } from "@/util/api";

import useRouterLoading from "./useRouterLoading";

type PageProps<T> = { data: T[]; totalElements: number };

const useInfinite = <T,>(
  endPoint: string,
  page_limit: number,
  category: string
) => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    endPoint,
    async ({ pageParam = 1 }) =>
      getPageData<T>(endPoint, pageParam, page_limit, category),
    {
      getNextPageParam: (lastPage: PageProps<T>, allPages: PageProps<T>[]) => {
        if (lastPage.data.length < page_limit) {
          return null;
        }
        return allPages.length + 1;
      },
    }
  );

  useEffect(() => {
    onRouterLoading();
    refetch();
  }, [category]);

  useEffect(() => {
    if (!isFetching) {
      offRouterLoading();
    }
  }, [isFetching]);

  return {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  };
};
export default useInfinite;
