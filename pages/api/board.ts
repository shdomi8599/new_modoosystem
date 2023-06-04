import { NextApiRequest, NextApiResponse } from "next";
import branchData from "@/dummy/branch.json";
import { BranchContent } from "@/types";
import { formatDate } from "@/util/date";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: BranchContent[]; totalElements: number }>
) {
  const { page, size } = req.query;
  const startIndex = (Number(page) - 1) * Number(size);
  const endIndex = startIndex + Number(size);
  const data = branchData.slice(startIndex, endIndex).map((data) => {
    const { id, createdAt, updatedAt } = data;
    return {
      ...data,
      key: id,
      createdAt: formatDate(createdAt),
      updatedAt: formatDate(updatedAt),
    };
  });
  const totalElements = branchData.length;
  res.status(200).json({ data, totalElements });
}
