import { Reference } from "@/types/pageData";
import PaginationPage from "@/components/page/PaginationPage";
import { createPaginationPage } from "@/util/ssr/createPaginationPage";
const initialPage = 1;
const initialSize = 10;
const endPoint = "references";

const ReferencePage = () => PaginationPage<Reference>(endPoint);
export default ReferencePage;

export async function getServerSideProps() {
  return createPaginationPage<Reference>(endPoint, initialPage, initialSize);
}
