import styled from "styled-components";
import { useState } from "react";
import { Radio, RadioChangeEvent, Spin } from "antd";

import { InstallStatus } from "@/types/pageData";
import { INSTALL_CATEGORY } from "@/datas/constants/constants";

import useInfinitePagination from "@/hooks/useInfinitePagination";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import CardSkeleton from "@/components/skeleton/CardSkeleton";
import InstallStatusesCard from "@/components/card/InstallStatusesCard";

const endPoint = "installStatuses";
const page_limit = 4;

const InstallationPage = () => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e: RadioChangeEvent) => {
    setCategory(e.target.value);
  };

  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfinitePagination<InstallStatus>(endPoint, page_limit, category);

  const flatData = data?.pages.flatMap((page) => page.data);

  const { target } = useIntersectionObserver<InstallStatus>({
    fetchNextPage,
    hasNextPage,
    data,
  });

  if (error) return <div>잠시 후에 다시 시도해주세요.</div>;
  if (isLoading) return <Spin />;
  return (
    <>
      <Box>
        <Radio.Group value={category} onChange={handleCategoryChange}>
          {["전체", ...INSTALL_CATEGORY].map((data) => (
            <Radio.Button key={data} value={data === "전체" ? "" : data}>
              {data}
            </Radio.Button>
          ))}
        </Radio.Group>
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
    min-height: 550px;
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
