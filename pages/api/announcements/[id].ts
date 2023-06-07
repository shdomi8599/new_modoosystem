import { Announcement } from "@/types/pageData";
import { singleViewHandler } from "@/util/api/apiHandler";
const endPoint = "announcements";

const handler = singleViewHandler<Announcement>(endPoint);

export default handler;
