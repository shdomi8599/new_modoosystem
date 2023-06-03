import styled from "styled-components";

const Footer = () => {
  return (
    <Box>
      <div className="logo-box">로고</div>
      <div className="content-box">
        <div>
          <div>information</div>
          <div></div>
        </div>
      </div>
    </Box>
  );
};
export default Footer;

const Box = styled.footer`
  height: 120px;
  background-color: var(--main-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-box {
    padding-left: calc((100% - 1280px) / 2);
  }

  .content-box {
    padding-right: calc((100% - 1280px) / 2);
  }
`;
