import { Announcement } from "@/types/pageData";
import { createViewPageApiHandler } from "@/util/api/apiHandler";
const endPoint = "announcements";

const handler = createViewPageApiHandler<Announcement>(endPoint);

export default handler;
