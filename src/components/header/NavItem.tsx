import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import useRouterLoading from "@/hooks/useRouterLoading";
import useSearch from "@/hooks/useSearch";
import { HeaderItem } from "@/types";
import { useRecoilValue } from "recoil";
import { adminEndPointState } from "@/recoil/recoil";

const NavItem = ({ name, content }: HeaderItem) => {
  const router = useRouter();

  const { resetSearch } = useSearch();
  const { offRouterLoading, onRouterLoading } = useRouterLoading();

  const adminEndPoint = useRecoilValue(adminEndPointState);
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const offHover = () => {
    setHover(false);
  };

  useEffect(() => {
    resetSearch();
    offRouterLoading();
  }, [router, adminEndPoint]);

  return (
    <Box className="flex-center" onMouseEnter={onHover} onMouseLeave={offHover}>
      <div>{name}</div>
      {hover && (
        <ul className="flex-center">
          {content.map(({ name, href }) => (
            <li key={name}>
              <Link onClick={onRouterLoading} href={href}>
                {name}
              </Link>
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
