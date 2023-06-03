import { KAKAO_SDK_URL } from "@/config";
import Script from "next/script";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
const center = { lat: 37.501496, lng: 127.140322 };

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map level={1} center={center} style={{ width: "75%", height: "100%" }}>
        <MapMarker position={center}>
          <Marker>모두시스템</Marker>
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;

const Marker = styled.div`
  padding: 12px 42px;
`;
