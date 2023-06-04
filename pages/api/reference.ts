import { NextApiRequest, NextApiResponse } from "next";
import branchData from "@/dummy/branch.json";
import { BranchContent } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BranchContent[]>
) {
  res.status(200).json(branchData);
}
