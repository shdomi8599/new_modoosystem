import ViewPage from "@/components/page/ViewPage";

import { Reference } from "@/types/pageData";
import { MyQuery } from "@/types";
import { generateViewProps } from "@/util/ssr";

const endPoint = "references";

const ReferenceViewPage = () => ViewPage<Reference>({ endPoint });

export default ReferenceViewPage;

export async function getServerSideProps({ query }: { query: MyQuery }) {
  const { id } = query;
  return generateViewProps<Reference>(endPoint, id);
}
