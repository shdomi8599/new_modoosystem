import { getPageData } from "@/util/api";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import useSearch from "./useSearch";

interface Props {
  endPoint: string;
}

const usePagination = <T,>({ endPoint }: Props) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search } = useSearch();
  const { searchVal, category } = search;
  const queryKey = searchVal
    ? [endPoint, page, category, searchVal]
    : [endPoint, page];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page, size]);

  const handlePageChange = (newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  };
  const { data, isLoading, isError } = useQuery<{
    data: T[];
    totalElements: number;
  }>({
    queryKey,
    queryFn: () => getPageData<T>(endPoint, page, size, category, searchVal),
  });

  return {
    page,
    size,
    handlePageChange,
    data: data?.data,
    totalElements: data?.totalElements,
    isLoading,
    isError,
  };
};

export default usePagination;
