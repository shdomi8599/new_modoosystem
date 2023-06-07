import { NextApiRequest, NextApiResponse } from "next";
import { getDbAllData } from "@/util/firebase";

export interface paginationHandlerResponse<T> {
  data: T[];
  totalElements: number;
}

export const paginationHandler =
  <T>(endPoint: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<paginationHandlerResponse<T>>
  ) => {
    const apiData = await getDbAllData<T>(endPoint);
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

export const singleViewHandler =
  <T extends { id: number }>(endPoint: string) =>
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
