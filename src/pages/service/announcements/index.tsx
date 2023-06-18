import { Announcement } from "@/types/pageData";
import { generatePaginationProps } from "@/util/ssr";

import PaginationPage from "@/components/page/PaginationPage";
import { QueryClient, dehydrate } from "react-query";
import { REACT_QUERY_OPTIONS } from "@/datas/constants/constants";
import { getPageData } from "@/util/api";

const endPoint = "announcements";
const initialPage = 1;
const initialSize = 10;

const AnnouncementPage = () => PaginationPage<Announcement>({ endPoint });
export default AnnouncementPage;

export async function getServerSideProps() {
  const queryClient = new QueryClient(REACT_QUERY_OPTIONS);

  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getPageData<Announcement>(endPoint, initialPage, initialSize)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
