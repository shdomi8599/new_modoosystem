import { Reference } from "@/types/pageData";
import { createPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "references";

const handler = createPageApiHandler<Reference>(endPoint);

export default handler;
