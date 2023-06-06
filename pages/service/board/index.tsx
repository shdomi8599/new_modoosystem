import { dehydrate, QueryClient } from "react-query";
import { getData } from "@/util/api/rest-api";
import { Board } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
const initialPage = 1;
const initialSize = 10;
const endPoint = "boards";

const BoardPage = () => PaginationPage<Board>(endPoint);
export default BoardPage;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getData<Board>(endPoint, initialPage, initialSize)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
