import { Board } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
import { generatePaginationProps } from "@/util/ssr";

const initialPage = 1;
const initialSize = 10;
const endPoint = "boards";

const BoardPage = () => PaginationPage<Board>({endPoint});
export default BoardPage;

export async function getServerSideProps() {
  return generatePaginationProps<Board>(endPoint, initialPage, initialSize);
}
