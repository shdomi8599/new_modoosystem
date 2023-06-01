import styled from "styled-components";
import blackLogo from "../public/logo/black_logo.png";
import whiteLogo from "../public/logo/white_logo.png";
import Image from "next/image";
import { HEADER_NAV } from "@/contants";
import NavItem from "./NavItem";

const Header = () => {
  return (
    <Box>
      <div className="logo-box">
        <Image src={blackLogo} alt="logo" width={260} />
      </div>
      <nav className="nav-box">
        <ul>
          {HEADER_NAV.map((item) => (
            <NavItem key={item.name} name={item.name} content={item.content} />
          ))}
        </ul>
      </nav>
    </Box>
  );
};

export default Header;

const Box = styled.header`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  padding: 0px calc((100% - 1280px) / 2);

  .nav-box {
    > ul {
      display: flex;
      gap: 24px;
    }
  }
`;
