import { useState, useEffect } from "react";

const usePagination = <T extends {}>(
  initialPage = 1,
  initialSize = 10,
  data: T[]
) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
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
