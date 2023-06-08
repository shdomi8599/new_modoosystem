import { Board } from "@/types/pageData";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props<T> {
  text: string;
  data: T;
}

const TableTitleItem = <T extends { id: number }>({ text, data }: Props<T>) => {
  const router = useRouter();
  const { asPath } = router;
  const { id } = data;
  const { answers } = data as T extends Board ? T : never;
  const moveView = () => {
    router.push(`${asPath}/${id}`);
  };
  return (
    <Box onClick={moveView}>
      <span>{text}</span>
      {answers && <span className="tag">답변완료</span>}
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
`;
