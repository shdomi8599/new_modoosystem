import { Reference } from "@/types/pageData";
import { generatePaginationProps } from "@/util/ssr";

import PaginationPage from "@/components/page/PaginationPage";

const endPoint = "references";
const initialPage = 1;
const initialSize = 10;

const ReferencePage = () => PaginationPage<Reference>({ endPoint });
export default ReferencePage;

export async function getServerSideProps() {
  return generatePaginationProps<Reference>(endPoint, initialPage, initialSize);
}
