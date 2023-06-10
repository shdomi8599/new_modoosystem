import { STATUS_ITEMS } from "@/datas/constants/constants";
import styled from "styled-components";

interface Props {
  text: string;
}

const TableRequestStatusItem = ({ text }: Props) => {
  const color = STATUS_ITEMS.find((data) => data.name === text)?.color;
  return (
    <Box color={color}>
      <div className="dot-style"></div>
      <span>{text ? text : "처리 전"}</span>
    </Box>
  );
};

export default TableRequestStatusItem;

type BoxProps = {
  color?: string;
};

const Box = styled.div<BoxProps>`
  display: flex;
  gap: 4px;
  position: relative;

  .dot-style {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: -14px;
    top: 4.5px;
    background-color: ${({ color }) => (color ? color : "red")};
  }
`;
