import { Announcement } from "@/types/pageData";
import { createPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "announcements";

const handler = createPageApiHandler<Announcement>(endPoint);

export default handler;
