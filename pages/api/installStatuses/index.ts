import { InstallStatus } from "@/types/pageData";
import { paginationHandler } from "@/util/api/apiHandler";
const endPoint = "installStatuses";

const handler = paginationHandler<InstallStatus>(endPoint);

export default handler;
