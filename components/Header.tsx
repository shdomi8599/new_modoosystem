import styled from "styled-components";
import whiteLogo from "../public/logo/white_logo.png";
import Image from "next/image";
import { HEADER_NAV } from "@/contants";
import NavItem from "./NavItem";
import { FaBars } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { headerNavState } from "@/recoil/atom";

const Header = () => {
  const [headerNav, setHeaderNav] = useRecoilState(headerNavState);
  return (
    <Box>
      <div className="logo-box">
        <Image src={whiteLogo} alt="logo" width={260} />
      </div>
      <nav className="nav-box">
        <ul>
          {HEADER_NAV.map((item) => (
            <NavItem key={item.name} name={item.name} content={item.content} />
          ))}
        </ul>
      </nav>
      <div className="modal-nav">
        <FaBars />
      </div>
    </Box>
  );
};

export default Header;

const Box = styled.header`
  width: 100%;
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  background-color: var(--main-color);

  .logo-box {
    padding-left: calc((100% - 1280px) / 2);
    @media (max-width: 1280px) {
      padding-left: 12px;
    }
    img {
      cursor: pointer;
    }
  }

  .nav-box {
    height: 100%;
    padding-right: calc((100% - 1280px) / 2);
    > ul {
      height: 100%;
      display: flex;
    }
    @media (max-width: 960px) {
      display: none;
    }
  }

  .modal-nav {
    padding-right: 20px;
    > svg {
      cursor: pointer;
      color: white;
      font-size: 32px;
    }
    @media (min-width: 960px) {
      display: none;
    }
  }
`;
