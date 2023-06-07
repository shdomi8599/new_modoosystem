import { Reference } from "@/types/pageData";
import { singleViewHandler } from "@/util/api/apiHandler";
const endPoint = "references";

const handler = singleViewHandler<Reference>(endPoint);

export default handler;
