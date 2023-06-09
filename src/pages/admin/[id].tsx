import { Announcement, Board, Reference } from "@/types/pageData";
import { MyQuery } from "@/types";
import ViewPage from "@/components/page/ViewPage";
import { generateViewProps } from "@/util/ssr";
import { adminEndPointState } from "@/recoil/recoil";
import { useRecoilState } from "recoil";

const AdminViewPage = () => {
  const [adminEndPoint] = useRecoilState(adminEndPointState);
  return ViewPage<Board | Announcement | Reference>({
    endPoint: adminEndPoint,
  });
};

export default AdminViewPage;

export async function getServerSideProps({ query }: { query: MyQuery }) {
  const { id, endPoint } = query;
  return generateViewProps<Board | Announcement | Reference>(
    endPoint as string,
    id
  );
}
