import { singleViewHandler } from "@/handler";
import { InstallStatus } from "@/types/pageData";

const endPoint = "installStatuses";

const handler = singleViewHandler<InstallStatus>(endPoint);

export default handler;
