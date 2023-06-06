import { Announcement } from "@/types/pageData";
import styled from "styled-components";

interface Props<T> {
  text: string;
  data: T;
}

const TableTitleItem = <T extends Announcement>({ text, data }: Props<T>) => {
  return <Box>{text}</Box>;
};

export default TableTitleItem;

const Box = styled.span`
  cursor: pointer;
`;
