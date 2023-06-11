import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Spin } from "antd";

import useInfinite from "@/hooks/useInfinite";
import { InstallStatus } from "@/types/pageData";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import InstallStatusesCard from "@/components/card/InstallStatusesCard";

const endPoint = "installStatuses";
const page_limit = 4;

const InstallationPage = () => {
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfinite<InstallStatus>(endPoint, page_limit);

  const flatData = data?.pages.flatMap((page) => page.data);

  //무한 스크롤 effect
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (target.current && !hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [data?.pageParams, fetchNextPage, hasNextPage]);

  if (error) return <div>잠시 후에 다시 시도해주세요.</div>;
  if (isLoading) return <Spin />;
  return (
    <>
      <Box>
        <div className="page-box">
          {flatData?.map((data, idx) => (
            <InstallStatusesCard data={data} key={idx} />
          ))}
          {isFetching && <CardSkeleton size={4} />}
        </div>
      </Box>
      <Observer ref={target}>
        {!hasNextPage && <div>마지막 데이터입니다.</div>}
      </Observer>
    </>
  );
};
export default InstallationPage;

const Box = styled.div`
  margin: 40px 0px;
  width: 90%;
  .page-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 16px;
    gap: 20px;
    flex-wrap: wrap;
    @media (max-width: 1150px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card {
      position: relative;
      width: 240px;
      height: 240px;
      .tag-box {
        position: absolute;
        left: 0px;
        bottom: 50px;
        span {
          margin-right: 4px;
          cursor: pointer;
        }
      }
      .category-box {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: black;
        color: white;
        border-radius: 5px;
        padding: 4px;
        text-align: center;
      }
      .ant-card-cover {
        height: 80%;
        img {
          width: 100%;
          height: 100%;
        }
        .spin-box {
          position: absolute;
          background-color: #000000;
          opacity: 0.5;
          height: 80%;
          width: 240px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .ant-card-body {
        height: 20%;
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const Observer = styled.div`
  height: 100px;
`;
