import { paginationHandler } from "@/handler/common";

import { Reference } from "@/types/pageData";

const endPoint = "references";

const handler = paginationHandler<Reference>(endPoint);

export default handler;
