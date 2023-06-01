import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { headerNavState } from "@/recoil";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import whiteLogo from "../../public/logo/white_logo.png";
import { useOffResize } from "@/hooks/useOffResize";
import { HEADER_NAV } from "@/contants";
import ModalNavItem from "./ModalNavItem";
import NavItem from "./NavItem";

const Header = () => {
  const router = useRouter();
  const [headerNav, setHeaderNav] = useRecoilState(headerNavState);
  useOffResize(960, "up", setHeaderNav);

  const navHandler = () => {
    setHeaderNav(!headerNav);
  };

  //라우터 변경 시, 네비가 off되도록
  useEffect(() => {
    setHeaderNav(false);
  }, [router]);
  return (
    <Box headerNav={headerNav}>
      <div className="logo-box">
        <Image
          onClick={() => router.push("/")}
          src={whiteLogo}
          alt="logo"
          width={260}
        />
      </div>
      <nav className="nav-box">
        <ul>
          {HEADER_NAV.map((item) => (
            <NavItem key={item.name} name={item.name} content={item.content} />
          ))}
        </ul>
      </nav>
      <div className="modal-btn-box">
        <FaBars onClick={navHandler} />
      </div>
      <nav className="modal-nav">
        <ul className="modal-nav-list">
          {HEADER_NAV.map((item) => (
            <ModalNavItem
              key={item.name}
              name={item.name}
              content={item.content}
            />
          ))}
        </ul>
      </nav>
    </Box>
  );
};

export default Header;

type BoxProps = {
  headerNav: boolean;
};

const Box = styled.header<BoxProps>`
  width: 100%;
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  background-color: var(--main-color);

  * {
    color: white;
  }

  .logo-box {
    @media (max-width: 1280px) {
      padding-left: 12px;
    }
    padding-left: calc((100% - 1280px) / 2);
    img {
      cursor: pointer;
    }
  }

  .nav-box {
    @media (max-width: 960px) {
      display: none;
    }
    height: 100%;
    padding-right: calc((100% - 1280px) / 2);
    > ul {
      height: 100%;
      display: flex;
    }
  }

  .modal-btn-box {
    @media (min-width: 960px) {
      display: none;
    }
    padding-right: 20px;
    > svg {
      cursor: pointer;
      color: white;
      font-size: 32px;
    }
  }

  .modal-nav {
    position: fixed;
    top: 104px;
    transition: 1.2s;
    width: 40%;
    height: 100%;
    right: ${(props) => (props.headerNav ? "0" : "-50%")};
    padding: 20px;
    background-color: var(--main-color);
    .modal-nav-list {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
`;
