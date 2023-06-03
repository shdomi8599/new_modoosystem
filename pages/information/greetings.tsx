import Image from "next/image";
import styled, { keyframes } from "styled-components";
import logo from "@/public/logo/white_logo.png";
import HeadTitle from "@/components/common/HeadTitle";

const GreetingsPage = () => {
  return (
    <>
      <HeadTitle name="모두시스템 - 인사말" />
      <Box>
        <Background className="bg" />
        <Background className="bg bg2" />
        <Background className="bg bg3" />
        <div className="box">
          <div className="text-box">
            <p>
              주차관제 전문회사 모두시스템입니다.
              <br />
              먼저 저희 홈페이지를 방문해주셔서
              <br />
              진심으로 감사드립니다.
            </p>
            <p>
              저희 회사는 주차차단기, 주차권발행기 등을
              <br /> 이용하여 최적의 주차관리를 추구하는
              <br />
              "주차관제 시스템 전문회사" 입니다.
            </p>
            <p>
              아파트, 관공서, 주차장, 공장, 교회, 빌라 병원 등
              <br />
              주차관제가 필요한 곳이라면 어디든지 직접 찾아가
              <br />
              성실한 현장조사를 바탕으로 최적의 주차관리가 되도록
              <br />
              고객님께 성심을 다 할 것을 약속드립니다.
            </p>
            <p>
              제품의 철저한 품질보증은 물론,
              <br />
              완벽한 시공, 신속한 A/S를 통하여 고객님이
              <br />
              만족 할 수 있도록 최선의 노력을 다 하겠습니다.
              <br />한 번의 만남이 소중한 인연이 될 수 있도록
              <br />
              변치 않는 모두시스템이 되겠습니다.
              <br />
              감사합니다.
            </p>
          </div>
          <div className="symbol-box">
            <Image src={logo} alt="logo" width={500} />
          </div>
        </div>
      </Box>
    </>
  );
};

export default GreetingsPage;

const Box = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;

  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;

    @media (max-width: 768px) {
      justify-content: center;
    }

    .text-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      color: white;
      width: 50%;
      height: 100%;
      font-size: 20px;
      word-wrap: break-word;
      line-height: 1.5;
      font-weight: 100;
      padding-top: 48px;
      text-align: center;
      @media (max-width: 960px) {
        width: 100%;
        font-size: 16px;
      }
      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    .symbol-box {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 960px) {
        display: none;
      }
      img {
        width: 50%;
        height: auto;
      }
    }
  }
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const Background = styled.div`
  animation: ${slideAnimation} 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #0e0039 50%, #000000 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.7;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;

  &.bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  &.bg3 {
    animation-duration: 5s;
  }
`;
