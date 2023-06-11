import { Announcement } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
import { generatePaginationProps } from "@/util/ssr";

const initialPage = 1;
const initialSize = 10;
const endPoint = "announcements";

const AnnouncementPage = () => PaginationPage<Announcement>({endPoint});
export default AnnouncementPage;

export async function getServerSideProps() {
  return generatePaginationProps<Announcement>(
    endPoint,
    initialPage,
    initialSize
  );
}
