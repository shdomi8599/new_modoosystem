import { dehydrate, QueryClient } from "react-query";
import { BRANCH_COLUMNS_DATA } from "@/constants/constants";
import usePagination from "@/hooks/usePagination";
import { getData } from "@/util/react-query";
import { BranchContent } from "@/types";
import TableContent from "@/components/table/TableContent";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const mainQueryKey = "reference";

const ReferencePage = () => {
  const {
    page,
    size,
    handlePageChange,
    data,
    totalElements,
    isLoading,
    isError,
  } = usePagination<BranchContent>({ mainQueryKey });
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <>
      {isLoading ? (
        <TableSkeleton />
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
export default ReferencePage;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([mainQueryKey, 1], () =>
    getData(mainQueryKey, 1, 10)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
