import { Announcement } from "@/types/pageData";
import { getData } from "../api/rest-api";
import { QueryClient, dehydrate } from "react-query";

export const generatePaginationProps = async <T extends Announcement>(
  endPoint: string,
  initialPage: number,
  initialSize: number
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, initialPage], () =>
    getData<T>(endPoint, initialPage, initialSize)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
