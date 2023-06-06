import { Announcement } from "@/types/pageData";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props<T> {
  text: string;
  data: T;
}

const TableTitleItem = <T extends Announcement>({ text, data }: Props<T>) => {
  const router = useRouter();
  const { asPath } = router;
  const { id } = data;
  const moveView = () => {
    router.push(`${asPath}/${id}`);
  };
  return <Box onClick={moveView}>{text}</Box>;
};

export default TableTitleItem;

const Box = styled.span`
  cursor: pointer;
`;
