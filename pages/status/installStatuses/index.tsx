import { useEffect, useRef } from "react";
import styled from "styled-components";
import useInfinite from "@/hooks/useInfinite";
import { Card, Skeleton, Spin } from "antd";
import { InstallStatus } from "@/types/pageData";

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
  }, [target.current, data?.pageParams]);

  const skeletonCard = Array(4).fill(1);
  const flatData = data?.pages.flatMap((page) => page.data);

  if (error) return <div>잠시 후에 다시 시도해주세요.</div>;
  if (isLoading) return <Spin />;
  return (
    <>
      <Box>
        <div className="page-box">
          {flatData?.map((data) => (
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={data.src[0]} />}
            />
          ))}
          {isFetching &&
            skeletonCard.map((x, i) => (
              <Card style={{ width: 240 }} key={i}>
                <Skeleton avatar active />
              </Card>
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
  .page-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 16px;
    gap: 16px;
    @media (max-width: 1300px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 960px) {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }
`;
