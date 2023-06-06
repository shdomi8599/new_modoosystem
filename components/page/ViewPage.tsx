import { Announcement } from "@/types/pageData";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getData } from "@/util/api/rest-api";
import styled from "styled-components";

const ViewPage = <T extends Announcement>(endPoint: string) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [endPoint, "view", id],
    queryFn: () => getData<T>(endPoint, id as string),
  });
  console.log(data);
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  if (isLoading) return <div>로딩중입니다.</div>;
  return <Box>조회페이지</Box>;
};

const Box = styled.div``;

export default ViewPage;
