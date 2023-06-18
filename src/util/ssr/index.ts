import { QueryClient, dehydrate } from "react-query";

import { getData, getPageData } from "../api";
import { REACT_QUERY_OPTIONS } from "@/datas/constants/constants";

export const generatePaginationProps = async <T>(
  endPoint: string,
  initialPage: number,
  initialSize: number
) => {
  const queryClient = new QueryClient(REACT_QUERY_OPTIONS);

  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getPageData<T>(endPoint, initialPage, initialSize)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const generateViewProps = async <T>(endPoint: string, id: string) => {
  const queryClient = new QueryClient(REACT_QUERY_OPTIONS);

  await queryClient.prefetchQuery([endPoint, "view", id], () =>
    getData<T>(endPoint, id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
