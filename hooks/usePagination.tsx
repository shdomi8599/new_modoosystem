import { getData } from "@/util/api/rest-api";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

interface Props {
  endPoint: string;
}

const usePagination = <T extends {}>({ endPoint }: Props) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

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
    queryKey: [endPoint, page],
    queryFn: () => getData(endPoint, page, size),
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
