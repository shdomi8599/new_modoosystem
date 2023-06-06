import { Reference } from "@/types/pageData";
import { createViewPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "references";

const handler = createViewPageApiHandler<Reference>(endPoint);

export default handler;
