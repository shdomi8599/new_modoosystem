import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { CheckForm, RequestForm } from "@/types";
import { formatDate } from "@/util/date";
import {
  deleteDbData,
  getDbAllData,
  getDbAllDataAndId,
  getDbDataByDocName,
  updateDbData,
} from "@/util/firebase";
import {
  Announcement,
  Board,
  Reference,
  paginationHandlerResponse,
} from "@/types/pageData";

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

        await deleteDbData(endPoint as string, targetId as string)
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

          await updateDbData("requestForm", targetId as string, newData)
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

          await updateDbData("boards", targetId as string, newData)
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

          await updateDbData("boards", targetId as string, newData)
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
