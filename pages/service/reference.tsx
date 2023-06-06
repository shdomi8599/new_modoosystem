import { dehydrate, QueryClient } from "react-query";
import { getData } from "@/util/api/rest-api";
import { Reference } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
const initialPage = 1;
const initialSize = 10;
const endPoint = "references";

const ReferencePage = () => PaginationPage<Reference>(endPoint);
export default ReferencePage;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getData<Reference>(endPoint, initialPage, initialSize)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
