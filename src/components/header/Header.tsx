import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { Spin } from "antd";

import whiteLogo from "../../../public/logo/white_logo.png";
import { ROUTER } from "@/datas/data/data";
import { HEADER_ITEMS } from "@/datas/constants/constants";
import { headerNavState, isAdminLoginedState } from "@/recoil/recoil";
import { useOffResize } from "@/hooks/useOffResize";
import useRouterLoading from "@/hooks/useRouterLoading";
import { getAdminCheck } from "@/util/api";

import TopTitle from "../common/TopTitle";
import HeadTitle from "../common/HeadTitle";
import NavItem from "./NavItem";
import ModalNavItem from "./ModalNavItem";

const Header = () => {
  const router = useRouter();
  const { asPath } = router;
  const { product } = router.query;

  function findCurrentPageName() {
    const page =
      ROUTER.find((data) => asPath === data.href) ||
      ROUTER.find((data) => asPath.includes(data.href));
    return page?.name || (product as string);
  }
  const currentPageName = findCurrentPageName();

  const [headerNav, setHeaderNav] = useRecoilState(headerNavState);
  useOffResize(960, "up", setHeaderNav);

  const navHandler = () => {
    setHeaderNav(!headerNav);
  };

  const [, setIsAdminLogined] = useRecoilState(isAdminLoginedState);

  useEffect(() => {
    setHeaderNav(false);
    const token = localStorage.getItem("token");
    if (token) {
      getAdminCheck()
        .then(() => {
          setIsAdminLogined(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, [router]);

  const { routerLoading } = useRouterLoading();
  return (
    <>
      <HeadTitle
        name={
          currentPageName ? `모두시스템 - ${currentPageName}` : "모두시스템"
        }
      />
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
      {routerLoading && (
        <Loading>
          <Spin />
        </Loading>
      )}
      <TopTitle name={currentPageName} />
    </>
  );
};

export default Header;

const Loading = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
`;

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
