import { NextApiRequest, NextApiResponse } from "next";
import { formatDate } from "@/util/date";
import { getDbAllData } from "@/util/firebase";
import { Board } from "@/types/pageData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Board[]; totalElements: number }>
) {
  const boardsData = await getDbAllData<Board>("boards");
  const { page, size } = req.query;
  const startIndex = (Number(page) - 1) * Number(size);
  const endIndex = startIndex + Number(size);
  const data = boardsData.slice(startIndex, endIndex).map((data) => {
    const { id, createAt } = data;
    return {
      ...data,
      key: id,
      createdAt: formatDate(createAt),
    };
  });
  const totalElements = boardsData.length;
  res.status(200).json({ data, totalElements });
}
