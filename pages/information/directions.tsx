import HeadTitle from "@/components/common/HeadTitle";
import KakaoMap from "@/components/kakao/KakaoMap";
import styled from "styled-components";

const DirectionsPage = () => {
  return (
    <>
      <HeadTitle name="모두시스템 - 찾아오시는 길" />
      <Box>
        <div className="map-box">
          <KakaoMap />
        </div>
        <div className="content-box">설명 적을거</div>
      </Box>
    </>
  );
};
export default DirectionsPage;

const Box = styled.div`
  padding-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 80px;
  height: 100%;
  .map-box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50%;
  }
  .content-box {
  }
`;
