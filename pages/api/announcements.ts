import { NextApiRequest, NextApiResponse } from "next";
import { formatDate } from "@/util/date";
import { getDbAllData } from "@/util/firebase";
import { Announcement } from "@/types/pageData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Announcement[]; totalElements: number }>
) {
  const announcementsData = await getDbAllData<Announcement>("announcements");
  const { page, size } = req.query;
  const startIndex = (Number(page) - 1) * Number(size);
  const endIndex = startIndex + Number(size);
  const data = announcementsData.slice(startIndex, endIndex).map((data) => {
    const { id, createAt } = data;
    return {
      ...data,
      key: id,
      createdAt: formatDate(createAt),
    };
  });
  const totalElements = announcementsData.length;
  res.status(200).json({ data, totalElements });
}
