import { singleViewHandler } from "@/handler/common";

import { InstallStatus } from "@/types/pageData";

const endPoint = "installStatuses";

const handler = singleViewHandler<InstallStatus>(endPoint);

export default handler;
