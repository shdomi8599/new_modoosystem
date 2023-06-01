import { NavContent } from "@/types";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  content: NavContent;
  name: string;
};

const NavItem = ({ name, content }: Props) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const offHover = () => {
    setHover(false);
  };
  return (
    <Box className="flex-center" onMouseEnter={onHover} onMouseLeave={offHover}>
      <div>{name}</div>
      {hover && (
        <ul className="flex-center">
          {content.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};
export default NavItem;

const Box = styled.li`
  flex-direction: column;
  position: relative;
  width: 128px;
  cursor: pointer;
  > ul {
    position: absolute;
    top: 16px;
    flex-direction: column;
  }
`;
