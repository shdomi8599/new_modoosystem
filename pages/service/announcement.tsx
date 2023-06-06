import { dehydrate, QueryClient } from "react-query";
import { getData } from "@/util/api/rest-api";
import { Announcement } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
const initialPage = 1;
const initialSize = 10;
const endPoint = "announcements";

const AnnouncementPage = () => PaginationPage<Announcement>(endPoint);
export default AnnouncementPage;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getData<Announcement>(endPoint, initialPage, initialSize)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
