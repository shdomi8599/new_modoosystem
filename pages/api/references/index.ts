import { paginationHandler } from "@/handler";
import { Reference } from "@/types/pageData";

const endPoint = "references";

const handler = paginationHandler<Reference>(endPoint);

export default handler;
