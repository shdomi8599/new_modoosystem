import { Announcement } from "@/types/pageData";
import { getData, getPageData } from "../api/rest-api";
import { QueryClient, dehydrate } from "react-query";

export const generatePaginationProps = async <T extends Announcement>(
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

export const generateViewProps = async <T extends Announcement>(
  endPoint: string,
  id: string
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, id], () =>
    getData<T>(endPoint, id)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
