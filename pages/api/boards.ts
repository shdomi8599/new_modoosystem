import { Board } from "@/types/pageData";
import { createApiHandler } from "@/util/api/apiHandler";
const endPoint = "boards";

const handler = createApiHandler<Board>(endPoint);

export default handler;
