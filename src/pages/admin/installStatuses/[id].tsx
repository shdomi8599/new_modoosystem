import { Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import useCheckAdmin from "@/hooks/useCheckAdmin";
import useRouterLoading from "@/hooks/useRouterLoading";
import { InstallStatus } from "@/types/pageData";
import { getData } from "@/util/api";

const AdminViewPage = () => {
  useCheckAdmin();

  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);

  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const { data, isError } = useQuery<InstallStatus>({
    queryKey: ["installStatuses", "view", id],
    queryFn: () => getData<InstallStatus>("installStatuses", id as string),
  });

  const handleImageLoad = () => {
    setLoading(true);
  };

  useEffect(() => {
    onRouterLoading();
    if (loading) {
      offRouterLoading();
    }
  }, [loading]);

  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <Box>
      <div className="top">{data?.title}</div>
      <div className="middle">
        <div className="category-box">
          {data?.categori.map((data) => (
            <Tag key={data}>{data}</Tag>
          ))}
        </div>
      </div>
      <div className="bottom">
        {data?.src.map((src, idx) => {
          if (idx === data.src.length - 1) {
            return (
              <div key={idx} className="img-box">
                <img onLoad={handleImageLoad} src={src} alt="img" />
              </div>
            );
          }
          return (
            <div key={idx} className="img-box">
              <img src={src} alt="img" />
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default AdminViewPage;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 40px 0px;
  max-width: 360px;
  flex-wrap: wrap;
  .top {
    font-weight: 700;
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .category-box {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .img-box {
      width: 250px;
      height: 250px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
