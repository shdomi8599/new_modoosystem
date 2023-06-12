import { singleViewHandler } from "@/handler/common";

import { Board } from "@/types/pageData";

const endPoint = "boards";

const handler = singleViewHandler<Board>(endPoint);

export default handler;
