import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { CheckForm, RequestForm } from "@/types";
import { formatDate } from "@/util/date";
import {
  addDbData,
  deleteDbData,
  getDbAllData,
  getDbAllDataAndId,
  getDbDataByDocName,
  updateDbData,
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
      .sort((x, y) => x.id - y.id)
      .slice(startIndex, endIndex);
    const totalElements = apiData.length;
    res.status(200).json({ data, totalElements });
  };

export const singleViewHandler =
  <T extends Board | Announcement | Reference | InstallStatus>(
    endPoint: string
  ) =>
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
    const data: RequestForm = req.body;
    addDbData("requestForm", data).then(() => res.status(200).json(data.id));
  };

export const requestCheckHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { requestId } = req.body;
    const apiData = await getDbAllData<CheckForm>("requestForm");
    const findData = apiData.find((data) => data.id === requestId);
    if (findData) {
      res.status(200).json(findData);
    } else {
      res.status(404).json("failed");
    }
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
      const exp = Math.floor(Date.now() / 1000) + 60 * 60;
      const token = jwt.sign({ id, exp }, secretKey as string);
      return res.status(200).json({ token });
    }
    res.status(404).json("failed");
  };

export const adminCheckHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const secretKey = process.env.SECRET_KEY;
      const decoded = jwt.verify(token, secretKey as string);
      if (decoded) {
        return res.status(200).json("success");
      } else {
        res.status(401).json("failed"); //토큰이 유효하지 않는 경우
      }
    } else {
      res.status(404).json("failed");
    }
  };

export const adminArticleDeleteHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, endPoint } = req.query;
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const apiData = await getDbAllDataAndId<Board | Announcement | Reference>(
        endPoint as string
      );
      const findData = apiData.find((data) => data.docData.id === Number(id));
      if (findData) {
        const targetId = findData?.docId;
        deleteDbData(endPoint as string, targetId as string)
          .then(() => res.status(200).json("success"))
          .catch(() => res.status(404).json("failed"));
      } else {
        res.status(404).json("failed");
      }
    } else {
      res.status(401).json("failed"); //토큰이 유효하지 않는 경우
    }
  };

export const adminRequestPaginationHandler =
  () =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<paginationHandlerResponse<RequestForm>>
  ) => {
    const endPoint = "requestForm";
    const apiData = await getDbAllData<RequestForm>(endPoint);
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
      .slice(startIndex, endIndex);
    const totalElements = apiData.length;
    res.status(200).json({ data, totalElements });
  };

export const adminRequestStatusHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      try {
        const { requestId, status } = req.body;
        const apiData = await getDbAllDataAndId<CheckForm>("requestForm");
        const findData = apiData.find((data) => data.docData.id === requestId);
        const targetId = findData?.docId;
        if (findData) {
          const newData = { ...findData.docData, status };
          updateDbData("requestForm", targetId as string, newData)
            .then(() => res.status(200).json("success"))
            .catch(() => res.status(404).json("failed"));
        } else {
          res.status(404).json("failed");
        }
      } catch (error) {
        res.status(401).json(error); // 토큰이 유효하지 않은 경우
      }
    } else {
      res.status(404).json("failed");
    }
  };

export const adminCreateAnswerHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      try {
        const { id, content } = req.body;
        const apiData = await getDbAllDataAndId<Board>("boards");
        const findData = apiData.find((data) => data.docData.id === Number(id));
        const targetId = findData?.docId;
        if (findData) {
          const createAt = formatDate(String(new Date()));
          const { answers } = findData.docData;
          const newData = {
            ...findData.docData,
            answers: answers
              ? [...answers, { content, createAt, id: answers.length + 1 }]
              : [{ content, createAt, id: 1 }],
          };
          updateDbData("boards", targetId as string, newData)
            .then(() => res.status(200).json("success"))
            .catch(() => res.status(404).json("failed"));
        } else {
          res.status(404).json("failed");
        }
      } catch (error) {
        res.status(401).json(error); // 토큰이 유효하지 않은 경우
      }
    } else {
      res.status(404).json("failed");
    }
  };

export const adminDeleteAnswerHandler =
  () => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      try {
        const { id, answerId } = req.query;
        const apiData = await getDbAllDataAndId<Board>("boards");
        const findData = apiData.find((data) => data.docData.id === Number(id));
        const targetId = findData?.docId;
        if (findData) {
          const { answers } = findData.docData;
          const newAnswers = answers?.filter(
            (answer) => answer.id !== Number(answerId)
          );
          const newData = {
            ...findData.docData,
            answers: newAnswers ? [...newAnswers] : answers,
          };
          updateDbData("boards", targetId as string, newData)
            .then(() => res.status(200).json("success"))
            .catch(() => res.status(404).json("failed"));
        } else {
          res.status(404).json("failed");
        }
      } catch (error) {
        res.status(401).json(error); // 토큰이 유효하지 않은 경우
      }
    } else {
      res.status(404).json("failed");
    }
  };
