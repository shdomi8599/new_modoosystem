import { useEffect, useState } from "react";
import styled from "styled-components";
import { KAKAO_SDK_URL } from "@/config";
import { DIRECTIONS_PUBLIC } from "@/constants/constants";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import HeadTitle from "@/components/common/HeadTitle";
import TopTitle from "@/components/common/TopTitle";
//맵 좌표
const center = { lat: 37.501496, lng: 127.140322 };

const DirectionsPage = () => {
  //스크립트 파일보다 랜더링이 먼저되는 바람에 카카오 맵이 보이지 않아,
  //load를 상태로 관리하여 카카오 맵이 랜더링될 수 있도록 수정함
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const handleMapLoad = () => {
      setIsMapLoaded(true);
    };

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.onload = handleMapLoad;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isMapLoaded) return <div>로딩중입니다.</div>;

  return (
    <>
      <HeadTitle name="모두시스템 - 찾아오시는 길" />
      <Box>
        <div className="map-box">
          <Map
            level={1}
            center={center}
            style={{ width: "100%", height: "100%" }}
          >
            <MapMarker position={center}>
              <div className="marker">모두시스템</div>
            </MapMarker>
          </Map>
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
                <div className="item" key={data.name}>
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
  padding-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 60px;
  height: 800px;
  width: 75%;
  .map-box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .marker {
      padding: 12px 42px;
    }
  }
  .content-box {
    width: 100%;
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
