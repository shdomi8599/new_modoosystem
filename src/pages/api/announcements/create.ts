import { articleCreateHandler } from "@/handler";
const endPoint = "announcements";

const handler = articleCreateHandler(endPoint);

export default handler;
