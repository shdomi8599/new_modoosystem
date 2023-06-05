import { NextApiRequest, NextApiResponse } from "next";
import { formatDate } from "@/util/date";
import { getDbAllData } from "@/util/firebase";
import { Reference } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Reference[]; totalElements: number }>
) {
  const referencesData = await getDbAllData<Reference>("references");
  const { page, size } = req.query;
  const startIndex = (Number(page) - 1) * Number(size);
  const endIndex = startIndex + Number(size);
  const data = referencesData.slice(startIndex, endIndex).map((data) => {
    const { id, createdAt } = data;
    return {
      ...data,
      key: id,
      createdAt: formatDate(createdAt),
    };
  });
  const totalElements = referencesData.length;
  res.status(200).json({ data, totalElements });
}
