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

export const createViewPageApiHandler =
  <T extends Announcement>(endPoint: string) =>
  async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const { id } = req.query;
    const apiData = await getDbAllData<T>(endPoint);
    const data = apiData.find((data) => String(data.id) === id);
    if (endPoint === "boards") {
      const boardData = { ...data, password: "" };
      const { password, ...rest } = boardData;
      res.status(200).json(rest as T);
    } else {
      res.status(200).json(data as T);
    }
  };
