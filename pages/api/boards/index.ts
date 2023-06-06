import { Board } from "@/types/pageData";
import { createPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "boards";

const handler = createPageApiHandler<Board>(endPoint);

export default handler;
