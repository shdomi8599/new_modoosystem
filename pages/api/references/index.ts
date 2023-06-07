import { Reference } from "@/types/pageData";
import { paginationHandler } from "@/util/api/apiHandler";
const endPoint = "references";

const handler = paginationHandler<Reference>(endPoint);

export default handler;
