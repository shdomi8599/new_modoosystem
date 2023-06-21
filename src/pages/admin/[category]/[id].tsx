import { useRecoilState } from "recoil";

import { MyQuery } from "@/types";
import { Announcement, Board, Reference } from "@/types/pageData";
import { generateViewProps } from "@/util/ssr";
import { adminEndPointState } from "@/recoil/recoil";

import ViewPage from "@/components/page/ViewPage";
import useCheckAdmin from "@/hooks/useCheckAdmin";

/**
 * 최초 데이터 없이 ViewPage 컴포넌트 안에서 사용되는 데이터를 구조분해를
 * 시도하는 바람에 에러가 발생하여, 어쩔수없이 admin페이지에서도 SSR을
 * 강제로 사용하게되는 상황이 와버렸다. 다른 해결책을 찾기 전까진 일단
 * 현상유지하고 나중에 리팩토링을 해봐야겠다.
 * 생각난 해결방법
 * 1. 데이터를 옵셔널체이닝으로 변경한다.
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
  const { id, category } = query;
  return generateViewProps<Board | Announcement | Reference>(
    category as string,
    id
  );
}
