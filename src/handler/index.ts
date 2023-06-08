import { NextApiRequest, NextApiResponse } from "next";
import {
  addDbData,
  deleteDbData,
  getDbAllData,
  getDbAllDataAndId,
} from "@/util/firebase";
import { v4 as uuidv4 } from "uuid";
import { CheckForm } from "@/types";
import { Board } from "@/types/pageData";
import { formatDate } from "@/util/date";

export interface paginationHandlerResponse<T> {
  data: T[];
  totalElements: number;
}

export const paginationHandler =
  <T extends { id: number }>(endPoint: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<paginationHandlerResponse<T>>
  ) => {
    const apiData = await getDbAllData<T>(endPoint);
    const { page, size } = req.query;
    const startIndex = (Number(page) - 1) * Number(size);
    const endIndex = startIndex + Number(size);
    const data = apiData
      .slice(startIndex, endIndex)
      .map((data, idx) => {
        return {
          ...data,
          key: idx,
        };
      })
      .sort((x, y) => y.id - x.id);
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

export const requestHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    const id = uuidv4();
    const postData = { ...data, id };
    addDbData("requestForm", postData).then(() => res.status(200).json(id));
  };

export const requestCheckHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { requestId } = req.body;
    const apiData = await getDbAllData<CheckForm>("requestForm");
    const findData = apiData.find((data) => data.id === requestId);
    res.status(200).json(findData);
  };

export const boardsCreateHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const endPoint = "boards";
    const apiData = await getDbAllData<Board>(endPoint);
    const sortData = apiData.sort((x, y) => y.id - x.id);
    const id = sortData[0].id + 1;
    const createAt = formatDate(String(new Date()));
    const data = req.body;
    const postData = {
      ...data,
      id,
      createAt,
    };
    addDbData(endPoint, postData).then(() => res.status(200).json("success"));
  };

export const boardsDeleteHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, password } = req.query;
    const endPoint = "boards";
    const apiData = await getDbAllDataAndId<Board>(endPoint);
    const findData = apiData.find(
      (data) =>
        data.docData.id === Number(id) && data.docData.password === password
    );
    const targetId = findData?.docId;
    deleteDbData(endPoint, targetId as string)
      .then(() => res.status(200).json("success"))
      .catch(() => res.status(404).json("failed"));
  };
