import styled from "styled-components";

const TopTitle = ({ name }: { name: string }) => {
  return (
    <Box className="top-title">
      <div>▶ {name}</div>
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
  }
`;
