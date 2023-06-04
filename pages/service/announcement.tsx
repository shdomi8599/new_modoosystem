import { BRANCH_COLUMNS_DATA } from "@/constants/constants";
import usePagination from "@/hooks/usePagination";
import { BranchContent } from "@/types";
import { api } from "@/util/api";
import TableContent from "@/components/table/TableContent";

const AnnouncementPage = ({ data }: { data: BranchContent[] }) => {
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
export default AnnouncementPage;

export async function getServerSideProps() {
  const branchData = await api("api/announcement").then((res) => res.data);
  return {
    props: {
      data: branchData,
    },
  };
}
