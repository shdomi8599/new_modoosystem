import { singleViewHandler } from "@/handler/common";
import { Announcement } from "@/types/pageData";

const endPoint = "announcements";

const handler = singleViewHandler<Announcement>(endPoint);

export default handler;
