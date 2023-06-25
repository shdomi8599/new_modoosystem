import styled from "styled-components";
import { useRouter } from "next/router";

const TopTitle = ({ name }: { name: string }) => {
  const router = useRouter();

  const { asPath } = router;

  const isName = ["/information/greetings", "/"].includes(asPath);

  return (
    <Box className="top-title">
      <div>{!isName && <span>▶ {name}</span>}</div>
    </Box>
  );
};

export default TopTitle;

const Box = styled.div`
  width: 100%;
  display: flex;
  font-weight: 700;
  padding-top: 120px;
  div {
    padding: 0px calc((100% - 1280px) / 2);
    margin-left: 10px;
    height: 16px;
  }
`;
