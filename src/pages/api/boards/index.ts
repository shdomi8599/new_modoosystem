import { paginationHandler } from "@/handler/common";

import { Board } from "@/types/pageData";

const endPoint = "boards";

const handler = paginationHandler<Board>(endPoint);

export default handler;
