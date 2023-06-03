import { HeaderItem } from "@/types";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const NavItem = ({ name, content }: HeaderItem) => {
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

  width: 140px;
  cursor: pointer;
  font-size: 20px;

  > ul {
    width: 100%;
    position: absolute;
    top: 88px;
    flex-direction: column;
    background: var(--sub-color);
    padding: 8px;
    border-radius: 0.4em;

    :after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-bottom-color: var(--sub-color);
      border-top: 0;
      margin-left: -20px;
      margin-top: -20px;
    }
    > li {
      padding: 12px 0px;
      width: 100%;
      text-align: center;
      :hover {
        background: #000000;
        border-radius: 8px;
      }
      a {
        font-size: 18px;
        color: white;
      }
    }
  }
`;
