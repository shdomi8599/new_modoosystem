import { Reference } from "@/types/pageData";
import { createApiHandler } from "@/util/api/apiHandler";
const endPoint = "references";

const handler = createApiHandler<Reference>(endPoint);

export default handler;
