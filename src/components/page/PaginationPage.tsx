import usePagination from "@/hooks/usePagination";
import TableContent from "@/components/table/TableContent";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { COLUMNS_DATA } from "@/datas/constants/constants";

const PaginationPage = <T extends object>({
  endPoint,
}: {
  endPoint: string;
}) => {
  const {
    page,
    size,
    handlePageChange,
    data,
    totalElements,
    isLoading,
    isError,
  } = usePagination<T>({ endPoint });

  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;

  return (
    <>
      {isLoading ? (
        <TableSkeleton size={size} />
      ) : (
        <TableContent<T>
          dataSource={data as T[] | []}
          columns={COLUMNS_DATA}
          page={page}
          size={size}
          handlePageChange={handlePageChange}
          totalElements={totalElements as number}
        />
      )}
    </>
  );
};

export default PaginationPage;
