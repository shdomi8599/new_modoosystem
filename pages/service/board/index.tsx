import { Board } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
import { createPaginationPage } from "@/util/ssr/createPaginationPage";
const initialPage = 1;
const initialSize = 10;
const endPoint = "boards";

const BoardPage = () => PaginationPage<Board>(endPoint);
export default BoardPage;

export async function getServerSideProps() {
  return createPaginationPage<Board>(endPoint, initialPage, initialSize);
}
