import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { getPageData } from "@/util/api";
import { adminEndPointState } from "@/recoil/recoil";

import useSearch from "./useSearch";

interface Props {
  endPoint: string;
}

const usePagination = <T,>({ endPoint }: Props) => {
  const [adminEndPoint] = useRecoilState(adminEndPointState);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { search } = useSearch();
  const { searchVal, category } = search;

  const queryKey = searchVal
    ? [endPoint, page, category, searchVal]
    : [endPoint, page];

  const handlePageChange = useCallback((newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  }, []);

  const { data, isLoading, isError, refetch } = useQuery<{
    data: T[];
    totalElements: number;
  }>({
    queryKey,
    queryFn: () => getPageData<T>(endPoint, page, size, category, searchVal),
  });

  useEffect(() => {
    setPage(1);
  }, [adminEndPoint]);

  useEffect(() => {
    refetch();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [size, page]);

  return {
    page,
    size,
    handlePageChange,
    data: data?.data,
    totalElements: data?.totalElements,
    isLoading,
    isError,
    refetch,
  };
};

export default usePagination;
