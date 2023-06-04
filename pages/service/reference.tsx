import TableContent from "@/components/table/TableContent";
import branch from "@/dummy/branch.json";
import { BRANCH_COLUMNS_DATA } from "@/constants/constants";
import usePagination from "@/hooks/usePagination";

const ReferencePage = () => {
  const { page, size, pagedData, handlePageChange } = usePagination(branch);

  return (
    <>
      <TableContent
        dataSource={pagedData}
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
