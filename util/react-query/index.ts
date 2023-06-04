import { api } from "../api";

export const getData = async (endPoint: string, page: number, size: number) => {
  return await api(`api/${endPoint}?page=${page}&size=${size}`).then(
    (res) => res.data
  );
};
