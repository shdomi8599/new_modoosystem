import { NavContent } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useRouter } from "next/router";

type Props = {
  name: string;
  content: NavContent;
};

const ModalNavItem = ({ name, content }: Props) => {
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const navHandler = () => {
    setNav(!nav);
  };

  useEffect(() => {
    setNav(false);
  }, [router]);
  return (
    <Box nav={nav}>
      <div onClick={navHandler} className="title">
        <div>{name}</div>
        <div>
          <TbTriangleInvertedFilled className="bar-icon" />
        </div>
      </div>
      {nav && (
        <ul className="content">
          {content.map((content) => (
            <li key={content.name}>
              <Link href={content.href}>{content.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};
export default ModalNavItem;

type BoxProps = {
  nav: boolean;
};

const Box = styled.li<BoxProps>`
  .title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    .bar-icon {
      transform: ${({ nav }) => (nav ? "rotate(180deg)" : "rotate(0deg)")};
    }
  }
  .content {
    font-size: 14px;
    padding-top: 28px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    li {
      a {
        display: block;
        width: 100%;
      }
    }
  }
`;
