import useRouterLoading from "@/hooks/useRouterLoading";
import { adminRequestIdState } from "@/recoil/recoil";
import { RequestForm } from "@/types";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";

interface Props {
  text: string;
  data: RequestForm;
}

const TableRequestTitleItem = ({ text, data }: Props) => {
  const router = useRouter();
  const { asPath } = router;
  const { onRouterLoading } = useRouterLoading();
  const [, setAdminRequestId] = useRecoilState(adminRequestIdState);
  const moveView = () => {
    onRouterLoading();
    setAdminRequestId(data.id);
    router.push(`${asPath}/check`);
  };
  return (
    <Box onClick={moveView}>
      <span>{text}</span>
    </Box>
  );
};

export default TableRequestTitleItem;

const Box = styled.div`
  display: flex;
  gap: 4px;
  cursor: pointer;
  justify-content: center;
`;
