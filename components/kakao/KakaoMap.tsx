import Script from "next/script";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d9c8da4f69cb2eaf68d388c57d8b31af&autoload=false`;
const center = { lat: 37.501496, lng: 127.140322 };

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map level={1} center={center} style={{ width: "75%", height: "100%" }}>
        <MapMarker position={{ lat: 37.501495, lng: 127.140322 }}>
          <Marker>모두시스템</Marker>
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;

const Marker = styled.div`
  padding: 6px 42px;
`;
