import useCheckAdmin from "@/hooks/useCheckAdmin";
import { InstallStatus } from "@/types/pageData";
import { getData } from "@/util/api";
import { Spin, Tag } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";

const AdminViewPage = () => {
  useCheckAdmin();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery<InstallStatus>({
    queryKey: ["installStatuses", "view", id],
    queryFn: () => getData<InstallStatus>("installStatuses", id as string),
  });

  if (isLoading) return <Spin />;
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <Box>
      <div className="top">{data?.title}</div>
      <div className="middle">
        <div className="category-box">
          {data?.categori.map((data) => (
            <Tag>{data}</Tag>
          ))}
        </div>
      </div>
      <div className="bottom">
        {data?.src.map((src) => (
          <div className="img-box">
            <img src={src} alt="img" />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default AdminViewPage;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  margin: 40px 0px;
  max-width: 360px;
  flex-wrap: wrap;
  .top {
    font-weight: 700;
    font-size: 20px;
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
