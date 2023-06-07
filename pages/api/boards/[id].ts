import { Board } from "@/types/pageData";
import { singleViewHandler } from "@/util/api/apiHandler";
const endPoint = "boards";

const handler = singleViewHandler<Board>(endPoint);

export default handler;
