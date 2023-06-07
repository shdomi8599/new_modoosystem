import { paginationHandler } from "@/handler";
import { Announcement } from "@/types/pageData";

const endPoint = "announcements";

const handler = paginationHandler<Announcement>(endPoint);

export default handler;
