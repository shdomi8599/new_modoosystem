import { infiniteHandler } from "@/handler";
import { InstallStatus } from "@/types/pageData";

const endPoint = "installStatuses";

const handler = infiniteHandler<InstallStatus>(endPoint);

export default handler;
