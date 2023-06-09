import { Announcement, Board, Reference } from "@/types/pageData";
import { MyQuery } from "@/types";
import ViewPage from "@/components/page/ViewPage";
import { generateViewProps } from "@/util/ssr";
import { adminEndPointState } from "@/recoil/recoil";
import { useRecoilState } from "recoil";
import useCheckAdmin from "@/hooks/useCheckAdmin";

/**
 * react-query dehydratedState를 사용하다보니 최초 데이터 없이
 * ViewPage 컴포넌트 안에서 사용되는 데이터의 구조분해에 실패하여,
 * 어쩔수없이 admin페이지에서도 SSR을 강제로 사용하게되는 상황이 와버렸다.
 * 다른 해결책을 찾기 전까진 일단 현상유지하고 나중에 리팩토링을 해야겠다.
 */

const AdminViewPage = () => {
  useCheckAdmin();
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
