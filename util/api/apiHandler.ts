import { NextApiRequest, NextApiResponse } from "next";
import { getDbAllData } from "@/util/firebase";
import { Announcement } from "@/types/pageData";

interface CreateHandlerResponse<T> {
  data: T[];
  totalElements: number;
}
export const createPageApiHandler =
  <T extends Announcement>(endPoint: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<CreateHandlerResponse<T>>
  ) => {
    const apiData = await getDbAllData<T>(endPoint);
    const { page, size } = req.query;
    const startIndex = (Number(page) - 1) * Number(size);
    const endIndex = startIndex + Number(size);
    const data = apiData.slice(startIndex, endIndex).map((data) => {
      const { id } = data;
      return {
        ...data,
        key: id,
      };
    });

    const totalElements = apiData.length;
    res.status(200).json({ data, totalElements });
  };
