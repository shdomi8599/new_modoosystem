import { QueryClient, dehydrate } from "react-query";

import { getData, getPageData } from "../api";

export const generatePaginationProps = async <T>(
  endPoint: string,
  initialPage: number,
  initialSize: number
) => {
  const queryClient = new QueryClient();
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, "view", id], () =>
    getData<T>(endPoint, id)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
