import { InstallStatus } from "@/types/pageData";
import { getDbAllData } from "@/util/firebase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiData = await getDbAllData<InstallStatus>("installStatuses");
  const { page, size } = req.query;
  const startIndex = (Number(page) - 1) * Number(size);
  const endIndex = startIndex + Number(size);
  const data = apiData.slice(startIndex, endIndex).map((data, idx) => {
    return {
      ...data,
      key: idx,
    };
  });

  const totalElements = apiData.length;
  res.status(200).json({ data, totalElements });
};

export default handler;
