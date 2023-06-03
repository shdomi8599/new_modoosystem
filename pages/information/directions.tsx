import HeadTitle from "@/components/common/HeadTitle";
import KakaoMap from "@/components/kakao/KakaoMap";
import { DIRECTIONS_PUBLIC } from "@/constants/constants";
import styled from "styled-components";

const DirectionsPage = () => {
  return (
    <>
      <HeadTitle name="모두시스템 - 찾아오시는 길" />
      <Box>
        <div className="map-box">
          <KakaoMap />
        </div>
        <div className="content-box">
          <div className="top">
            <div className="title">차량</div>
            <div>
              주차공간이 협소합니다. 인근 공영주차장을 이용하시거나 가급적
              대중교통을 이용해주세요.
            </div>
          </div>
          <div className="bottom">
            <div className="title">대중교통</div>
            <div className="content">
              {DIRECTIONS_PUBLIC.map((data) => (
                <div className="item">
                  <div className="title">※{data.name}※</div>
                  <div className="content">
                    {data.content.map((data) => (
                      <div>{data}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
  gap: 60px;
  height: 800px;
  .map-box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50%;
  }
  .content-box {
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 60px;
    .top {
      > .title {
        color: #e62e2e;
        margin-bottom: 40px;
        font-size: 20px;
      }
    }
    .bottom {
      > .title {
        color: #3c3cdf;
        margin-bottom: 40px;
        font-size: 20px;
      }
      > .content {
        padding-left: 24px;
        .item {
          margin-bottom: 40px;
          > .title {
            margin-bottom: 20px;
          }
          > .content {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        }
      }
    }
  }
`;
