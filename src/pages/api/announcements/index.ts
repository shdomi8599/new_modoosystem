import { paginationHandler } from "@/handler/common";

import { Announcement } from "@/types/pageData";

const endPoint = "announcements";

const handler = paginationHandler<Announcement>(endPoint);

export default handler;
