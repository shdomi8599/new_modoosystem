import { InstallStatus } from "@/types/pageData";
import { createPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "installStatuses";

const handler = createPageApiHandler<InstallStatus>(endPoint);

export default handler;
