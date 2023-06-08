import { CheckForm, RequestForm } from "@/types";
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";

export const api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPageData = async <T>(
  endPoint: string,
  page: number,
  size: number
): Promise<{ data: T[]; totalElements: number }> => {
  return await api(`api/${endPoint}?page=${page}&size=${size}`).then(
    (res) => res.data
  );
};

export const getData = async <T>(endPoint: string, id: string): Promise<T> => {
  return await api(`api/${endPoint}/${id}`).then((res) => res.data);
};

export const postRequest = async (data: RequestForm): Promise<string> => {
  return await api
    .post(`api/request`, data)
    .then((res) => res.data)
    .catch(() => alert("잠시 후에 다시 시도해주세요."));
};

export const postCheckRequest = async (data: {
  requestId: string;
}): Promise<CheckForm> => {
  return await api.post(`api/request/check`, data).then((res) => res.data);
};
