import styled from "styled-components";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { adminEndPointState } from "@/recoil/recoil";
import { Board } from "@/types/pageData";

import useRouterLoading from "@/hooks/useRouterLoading";

interface Props<T> {
  text: string;
  data: T;
}

const TableTitleItem = <T extends { id: number }>({ text, data }: Props<T>) => {
  const router = useRouter();

  const { asPath } = router;

  const isAdminPage = asPath.includes("admin");
  const { id } = data;
  const { answers, secret } = data as T extends Board ? T : never;

  const isAnswer = answers?.length && answers?.length > 1;

  const { onRouterLoading } = useRouterLoading();

  const [adminEndPoint] = useRecoilState(adminEndPointState);

  const moveView = () => {
    onRouterLoading();

    if (isAdminPage) {
      return router.push(`${asPath}/${adminEndPoint}/${id}`);
    }

    router.push(`${asPath}/${id}`);
  };

  return (
    <Box onClick={moveView}>
      <span>{text}</span>
      {isAnswer && <span className="tag">답변완료</span>}
      {secret && <span className="tag red">비밀글</span>}
    </Box>
  );
};

export default TableTitleItem;

const Box = styled.span`
  display: flex;
  gap: 4px;
  cursor: pointer;
  .tag {
    font-size: 11px;
    background-color: #e9e9e9;
    padding: 2px;
    color: #25bb25;
    border-radius: 5px;
  }
  .red {
    color: red;
  }
`;
