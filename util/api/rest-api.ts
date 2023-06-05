import { api } from "../api";

export const getData = async <T>(
  endPoint: string,
  page: number,
  size: number
): Promise<T[]> => {
  return await api(`api/${endPoint}?page=${page}&size=${size}`).then(
    (res) => res.data
  );
};
