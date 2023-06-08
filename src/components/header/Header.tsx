import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentPageNameState, headerNavState } from "@/recoil/recoil";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import whiteLogo from "@/public/logo/white_logo.png";
import { useOffResize } from "@/hooks/useOffResize";
import { ROUTER } from "@/datas/data/data";
import TopTitle from "../common/TopTitle";
import { HEADER_ITEMS } from "@/datas/constants/constants";
import HeadTitle from "../common/HeadTitle";
import NavItem from "./NavItem";
import ModalNavItem from "./ModalNavItem";

const Header = () => {
  const router = useRouter();
  const { asPath } = router;
  const { product } = router.query;
  const pageName = ROUTER.find((data) => asPath.includes(data.href))?.name;
  const [currentPageName, setCurrentPageName] =
    useRecoilState(currentPageNameState);
  useEffect(() => {
    pageName && setCurrentPageName(pageName);
  }, [pageName, setCurrentPageName]);
  const [headerNav, setHeaderNav] = useRecoilState(headerNavState);
  useOffResize(960, "up", setHeaderNav);

  const navHandler = () => {
    setHeaderNav(!headerNav);
  };

  useEffect(() => {
    setHeaderNav(false);
  }, [router, setHeaderNav]);
  return (
    <>
      <HeadTitle name={`모두시스템 - ${currentPageName}`} />
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
            {HEADER_ITEMS.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                content={item.content}
              />
            ))}
          </ul>
        </nav>
        <div className="modal-btn-box">
          <FaBars onClick={navHandler} />
        </div>
        <nav className="modal-nav">
          <ul className="modal-nav-list">
            {HEADER_ITEMS.map((item) => (
              <ModalNavItem
                key={item.name}
                name={item.name}
                content={item.content}
              />
            ))}
          </ul>
        </nav>
      </Box>
      <TopTitle name={product ? product : pageName} />
    </>
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
    margin-left: 8px;
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
    right: ${(props) => (props.headerNav ? "0" : "-70%")};
    padding: 20px;
    background-color: var(--main-color);
    .modal-nav-list {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
`;
