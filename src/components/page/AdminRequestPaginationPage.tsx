import usePagination from "@/hooks/usePagination";
import TableContent from "@/components/table/TableContent";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { REQUEST_COLUMNS_DATA } from "@/datas/constants/constants";
import { RequestForm } from "@/types";
const endPoint = "request";

const AdminRequestPaginationPage = () => {
  const {
    page,
    size,
    handlePageChange,
    data,
    totalElements,
    isLoading,
    isError,
  } = usePagination<RequestForm>({ endPoint });

  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;

  return (
    <>
      {isLoading ? (
        <TableSkeleton size={size} />
      ) : (
        <TableContent<RequestForm>
          dataSource={data as RequestForm[] | []}
          columns={REQUEST_COLUMNS_DATA}
          page={page}
          size={size}
          handlePageChange={handlePageChange}
          totalElements={totalElements as number}
        />
      )}
    </>
  );
};

export default AdminRequestPaginationPage;
