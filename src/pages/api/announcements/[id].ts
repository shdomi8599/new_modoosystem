import { singleViewHandler } from "@/handler";
import { Announcement } from "@/types/pageData";

const endPoint = "announcements";

const handler = singleViewHandler<Announcement>(endPoint);

export default handler;
