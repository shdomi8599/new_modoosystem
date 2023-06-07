import { paginationHandler } from "@/handler";
import { InstallStatus } from "@/types/pageData";

const endPoint = "installStatuses";

const handler = paginationHandler<InstallStatus>(endPoint);

export default handler;
