import { Announcement } from "@/types/pageData";
import { MyQuery } from "@/types";
import ViewPage from "@/components/page/ViewPage";
import { generateViewProps } from "@/util/ssr";
const endPoint = "announcements";

const AnnouncementViewPage = () => ViewPage<Announcement>(endPoint);

export default AnnouncementViewPage;

export async function getServerSideProps({ query }: { query: MyQuery }) {
  const { id } = query;
  return generateViewProps<Announcement>(endPoint, id);
}
