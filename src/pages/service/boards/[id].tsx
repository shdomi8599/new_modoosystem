import ViewPage from "@/components/page/ViewPage";

import { Board } from "@/types/pageData";
import { MyQuery } from "@/types";
import { generateViewProps } from "@/util/ssr";

const endPoint = "boards";

const BoardViewPage = () => ViewPage<Board>({ endPoint });
export default BoardViewPage;

export async function getServerSideProps({ query }: { query: MyQuery }) {
  const { id } = query;
  return generateViewProps<Board>(endPoint, id);
}
