import useCheckAdmin from "@/hooks/useCheckAdmin";
import { InstallStatus } from "@/types/pageData";
import { getData } from "@/util/api";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";

const AdminViewPage = () => {
  useCheckAdmin();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery<InstallStatus>({
    queryKey: ["installStatuses", "view", id],
    queryFn: () => getData<InstallStatus>("installStatuses", id as string),
  });
  if (isLoading) return <Spin />;
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return <Box>조회페이지</Box>;
};

export default AdminViewPage;

const Box = styled.div``;
