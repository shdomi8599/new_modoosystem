import { Announcement } from "@/types/pageData";
import { paginationHandler } from "@/util/api/apiHandler";
const endPoint = "announcements";

const handler = paginationHandler<Announcement>(endPoint);

export default handler;
