import { BRANCH_COLUMNS_DATA } from "@/constants/constants";
import usePagination from "@/hooks/usePagination";
import { BranchContent } from "@/types";
import { api } from "@/util/api";
import TableContent from "@/components/table/TableContent";

const ReferencePage = ({ data }: { data: BranchContent[] }) => {
  const { page, size, pagedData, handlePageChange } = usePagination(data);

  return (
    <TableContent
      dataSource={pagedData}
      columns={BRANCH_COLUMNS_DATA}
      page={page}
      size={size}
      handlePageChange={handlePageChange}
      totalElements={data.length}
    />
  );
};
export default ReferencePage;

export async function getServerSideProps() {
  const branchData = await api("api/reference").then((res) => res.data);
  return {
    props: {
      data: branchData,
    },
  };
}
