import useCheckAdmin from "@/hooks/useCheckAdmin";
import { useRouter } from "next/router";
import styled from "styled-components";

const AdminCreatePage = () => {
  useCheckAdmin();
  const router = useRouter();
  return <Box>작성</Box>;
};

export default AdminCreatePage;

const Box = styled.div``;
