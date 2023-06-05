import { dehydrate, QueryClient } from "react-query";
import { BRANCH_COLUMNS_DATA } from "@/constants/constants";
import usePagination from "@/hooks/usePagination";
import { BranchContent } from "@/types";
import TableContent from "@/components/table/TableContent";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { getData } from "@/util/api/rest-api";
const initialPage = 1;
const initialSize = 10;
const endPoint = "board";

const BoardPage = () => {
  const {
    page,
    size,
    handlePageChange,
    data,
    totalElements,
    isLoading,
    isError,
  } = usePagination<BranchContent>({ endPoint });
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <>
      {isLoading ? (
        <TableSkeleton size={size} />
      ) : (
        data &&
        totalElements && (
          <TableContent
            dataSource={data}
            columns={BRANCH_COLUMNS_DATA}
            page={page}
            size={size}
            handlePageChange={handlePageChange}
            totalElements={totalElements}
          />
        )
      )}
    </>
  );
};
export default BoardPage;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getData(endPoint, initialPage, initialSize)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
