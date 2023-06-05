import { api } from "../api";

export const getData = async <T>(
  endPoint: string,
  page: number,
  size: number
): Promise<{ data: T[]; totalElements: number }> => {
  return await api(`api/${endPoint}?page=${page}&size=${size}`).then(
    (res) => res.data
  );
};
