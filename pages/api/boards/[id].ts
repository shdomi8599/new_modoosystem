import { Board } from "@/types/pageData";
import { createViewPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "boards";

const handler = createViewPageApiHandler<Board>(endPoint);

export default handler;
