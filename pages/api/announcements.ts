import { Announcement } from "@/types/pageData";
import { createApiHandler } from "@/util/api/apiHandler";
const endPoint = "announcements";

const handler = createApiHandler<Announcement>(endPoint);

export default handler;
