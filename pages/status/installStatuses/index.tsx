import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInfinite from "@/hooks/useInfinite";
import { Card, Spin } from "antd";
import { InstallStatus } from "@/types/pageData";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import CategoryItem from "@/components/category/CategoryItem";
const { Meta } = Card;

const endPoint = "installStatuses";
const page_limit = 4;

const InstallationPage = () => {
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfinite<InstallStatus>(endPoint, page_limit);

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

  const flatData = data?.pages.flatMap((page) => page.data);
  console.log(flatData);

  if (error) return <div>잠시 후에 다시 시도해주세요.</div>;
  if (isLoading) return <Spin />;
  return (
    <>
      <Box>
        <div className="page-box">
          {flatData?.map((data, idx) => (
            <Card
              key={idx}
              className="card"
              hoverable
              cover={<img alt="install" src={data.src[0]} />}
            >
              <Meta title={data.title} />
              <CategoryItem categori={data.categori} />
            </Card>
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
      .ant-card-cover {
        height: 80%;
        img {
          width: 100%;
          height: 100%;
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
