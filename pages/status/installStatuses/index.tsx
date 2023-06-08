import { useEffect, useRef } from "react";
import styled from "styled-components";
import useInfinite from "@/hooks/useInfinite";
import { Card, Skeleton, Spin } from "antd";
import { InstallStatus } from "@/types/pageData";
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

  const skeletonCard = Array(4).fill(1);
  const flatData = data?.pages.flatMap((page) => page.data);

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
              cover={<img alt="example" src={data.src[0]} />}
            >
              <Meta title={data.title} />
            </Card>
          ))}
          {isFetching &&
            skeletonCard.map((x, i) => (
              <Skeleton className="skeleton" active />
            ))}
        </div>
      </Box>
      <div ref={target} className="observer"></div>
    </>
  );
};
export default InstallationPage;

const Box = styled.div`
  margin: 40px 0px;
  width: 90%;
  .skeleton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 240px;
  }
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
