import usePagination from "@/hooks/usePagination";
import TableContent from "@/components/table/TableContent";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import {
  INSTALL_STATUSES_COLUMNS_DATA,
  REQUEST_COLUMNS_DATA,
} from "@/datas/constants/constants";
import { RequestForm } from "@/types";
import { InstallStatus } from "@/types/pageData";

const AdminPaginationPage = ({ endPoint }: { endPoint: string }) => {
  const {
    page,
    size,
    handlePageChange,
    data,
    totalElements,
    isLoading,
    isError,
  } = usePagination<RequestForm | InstallStatus>({ endPoint });

  const columns =
    endPoint === "request"
      ? REQUEST_COLUMNS_DATA
      : INSTALL_STATUSES_COLUMNS_DATA;

  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;

  return (
    <>
      {isLoading ? (
        <TableSkeleton size={size} />
      ) : (
        data && (
          <TableContent<RequestForm | InstallStatus>
            dataSource={data}
            columns={columns}
            page={page}
            size={size}
            handlePageChange={handlePageChange}
            totalElements={totalElements as number}
          />
        )
      )}
    </>
  );
};

export default AdminPaginationPage;
