import KakaoMap from "@/components/kakao/KakaoMap";
import styled from "styled-components";

const DirectionsPage = () => {
  return (
    <Box>
      <KakaoMap />
    </Box>
  );
};
export default DirectionsPage;

const Box = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;
