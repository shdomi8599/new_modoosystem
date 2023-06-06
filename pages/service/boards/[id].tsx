import { useRouter } from "next/router";
import { Board } from "@/types/pageData";
import { getData } from "@/util/api/rest-api";
import { QueryClient, dehydrate, useQuery } from "react-query";
import styled from "styled-components";
import { MyQuery } from "@/types";
const endPoint = "boards";

const ViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery<Board>({
    queryKey: [endPoint, "view", id],
    queryFn: () => getData<Board>(endPoint, id as string),
  });
  console.log(data);
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return <Box>조회페이지</Box>;
};

const Box = styled.div``;
export default ViewPage;

export async function getServerSideProps({ query }: { query: MyQuery }) {
  const { id } = query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([endPoint, id], () =>
    getData<Board>(endPoint, id)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
