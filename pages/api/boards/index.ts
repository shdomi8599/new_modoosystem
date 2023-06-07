import { Board } from "@/types/pageData";
import { paginationHandler } from "@/util/api/apiHandler";
const endPoint = "boards";

const handler = paginationHandler<Board>(endPoint);

export default handler;
