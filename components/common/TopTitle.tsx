import { useRouter } from "next/router";
import styled from "styled-components";

const TopTitle = ({ name }: { name: string }) => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <Box className="top-title">
      <div>{asPath !== "/information/greetings" && <span>▶ {name}</span>}</div>
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
