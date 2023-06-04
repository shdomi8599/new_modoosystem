import { useState, useEffect } from "react";

const usePagination = <T extends {}>(
  data: T[]
) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [pagedData, setPagedData] = useState<T[]>([]);

  useEffect(() => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const newData = data.slice(startIndex, endIndex);
    setPagedData(newData);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page, size, data]);

  const handlePageChange = (newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  };

  return {
    page,
    size,
    pagedData,
    handlePageChange,
  };
};

export default usePagination;
