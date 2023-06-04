import TableContent from "@/components/table/TableContent";
import branch from "@/dummy/branch.json";
import { BRANCH_COLUMNS_DATA } from "@/constants/constants";
import { useEffect, useState } from "react";
import { BranchContent } from "@/types";

const ReferencePage = () => {
  //페이지 및 표시 데이터
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setSize(size);
  };

  const initialData = branch.slice((page - 1) * size, page * size);

  const [data, setData] = useState<BranchContent[]>(initialData);

  useEffect(() => {
    const newData = branch.slice((page - 1) * size, page * size);
    setData(newData);
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [page, size, branch]);

  return (
    <>
      <TableContent
        dataSource={data}
        columns={BRANCH_COLUMNS_DATA}
        page={page}
        size={size}
        handlePageChange={handlePageChange}
        totalElements={branch.length}
      />
    </>
  );
};
export default ReferencePage;
