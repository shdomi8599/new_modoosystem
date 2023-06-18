import { Announcement } from "@/types/pageData";
import { generatePaginationProps } from "@/util/ssr";

import PaginationPage from "@/components/page/PaginationPage";

const endPoint = "announcements";
const initialPage = 1;
const initialSize = 10;

const AnnouncementPage = () => PaginationPage<Announcement>({ endPoint });
export default AnnouncementPage;

export async function getServerSideProps() {
  return generatePaginationProps<Announcement>(
    endPoint,
    initialPage,
    initialSize
  );
}
