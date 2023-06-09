import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { CheckForm } from "@/types";
import { formatDate } from "@/util/date";
import {
  addDbData,
  deleteDbData,
  getDbAllData,
  getDbAllDataAndId,
  getDbDataByDocName,
} from "@/util/firebase";
import {
  Announcement,
  Board,
  InstallStatus,
  Reference,
} from "@/types/pageData";

export interface paginationHandlerResponse<T> {
  data: T[];
  totalElements: number;
}

export const paginationHandler =
  <T extends Board | Announcement | Reference>(endPoint: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<paginationHandlerResponse<T>>
  ) => {
    const apiData = await getDbAllData<T>(endPoint);
    const { page, size, category, searchVal } = req.query;
    const startIndex = (Number(page) - 1) * Number(size);
    const endIndex = startIndex + Number(size);
    const searchData =
      category === "undefined" || !category
        ? apiData
        : apiData.filter((data) => {
            if (category === "title") {
              return data.title.includes(searchVal as string);
            }
            if (category === "content") {
              return data.content.includes(searchVal as string);
            }
            if (category === "author") {
              return data.author.includes(searchVal as string);
            }
          });
    const data = searchData
      .map((data, idx) => {
        return {
          ...data,
          key: idx,
        };
      })
      .sort((x, y) => y.id - x.id)
      .slice(startIndex, endIndex);
    const totalElements = searchData.length;
    res.status(200).json({ data, totalElements });
  };

export const infiniteHandler =
  <T extends InstallStatus>(endPoint: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<paginationHandlerResponse<T>>
  ) => {
    const apiData = await getDbAllData<T>(endPoint);
    const { page, size } = req.query;
    const startIndex = (Number(page) - 1) * Number(size);
    const endIndex = startIndex + Number(size);
    const data = apiData
      .map((data, idx) => {
        return {
          ...data,
          key: idx,
        };
      })
      .sort((x, y) => y.id - x.id)
      .slice(startIndex, endIndex);
    const totalElements = apiData.length;
    res.status(200).json({ data, totalElements });
  };

export const singleViewHandler =
  <T extends Board | Announcement | Reference>(endPoint: string) =>
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

export const checkSecretHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, password } = req.body;
    const endPoint = "boards";
    const apiData = await getDbAllDataAndId<Board>(endPoint);
    const findData = apiData.find(
      (data) =>
        data.docData.id === Number(id) && data.docData.password === password
    );
    if (findData) {
      res.status(200).json("success");
    } else {
      res.status(404).json("failed");
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

export const articleCreateHandler =
  (endPoint: string) => async (req: NextApiRequest, res: NextApiResponse) => {
    const apiData = await getDbAllData<Board | Announcement | Reference>(
      endPoint
    );
    const sortData = apiData.sort((x, y) => y.id - x.id);
    const id = sortData[0].id + 1;
    const createAt = formatDate(String(new Date()));
    const data = req.body;
    const postData = {
      ...data,
      id,
      createAt,
    };
    addDbData(endPoint, postData)
      .then(() => res.status(200).json("success"))
      .catch(() => res.status(404).json("failed"));
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

export const adminLoginHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, password } = req.body;
    const apiData = await getDbDataByDocName<{ id: string; password: string }>(
      "admin",
      "admin"
    );
    if (id === apiData.id && password === apiData.password) {
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ id }, secretKey as string);
      return res.status(200).json({ token });
    }
    res.status(404).json("failed");
  };

export const adminCheckHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey as string);
        if (decoded) {
          return res.status(200).json("success");
        }
      } catch (error) {
        res.status(401).json("failed"); // 토큰이 유효하지 않은 경우
        return;
      }
    }
    res.status(404).json("failed");
  };

export const adminArticleDeleteHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, endPoint } = req.query;
    const apiData = await getDbAllDataAndId<Board | Announcement | Reference>(
      endPoint as string
    );
    const findData = apiData.find((data) => data.docData.id === Number(id));
    const targetId = findData?.docId;
    deleteDbData(endPoint as string, targetId as string)
      .then(() => res.status(200).json("success"))
      .catch(() => res.status(404).json("failed"));
  };
