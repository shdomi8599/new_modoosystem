import { NextApiRequest, NextApiResponse } from "next";
import branchData from "@/dummy/branch.json";
import { BranchContent } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: BranchContent[]; totalElements: number }>
) {
  const { page, size } = req.query;
  const startIndex = (Number(page) - 1) * Number(size);
  const endIndex = startIndex + Number(size);
  const data = branchData.slice(startIndex, endIndex);
  const totalElements = branchData.length;
  res.status(200).json({ data, totalElements });
}
