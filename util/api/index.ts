import axios from "axios";

export const api = axios.create({
  baseURL: "https://new-modoosystem-shdomi8599.vercel.app",
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
