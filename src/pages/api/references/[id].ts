import { singleViewHandler } from "@/handler";
import { Reference } from "@/types/pageData";

const endPoint = "references";

const handler = singleViewHandler<Reference>(endPoint);

export default handler;
