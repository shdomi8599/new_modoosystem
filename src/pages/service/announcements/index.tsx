import { Announcement } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
import { generatePaginationProps } from "@/util/ssr";

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
