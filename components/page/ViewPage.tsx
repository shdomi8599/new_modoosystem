import { Announcement, Board, Reference } from "@/types/pageData";
import { getData } from "@/util/api";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Spin } from "antd";
import styled from "styled-components";
import HeadTitle from "../common/HeadTitle";
import { AiFillFileText } from "react-icons/ai";

const ViewPage = <T extends Announcement>(endPoint: string) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [endPoint, "view", id],
    queryFn: () => getData<T>(endPoint, id as string),
  });

  const isReference = router.asPath.includes("references");
  const isBoard = router.asPath.includes("boards");
  const { title, content, createAt, author } = data as Announcement;
  const { link } = data as T extends Reference ? T : never;
  const { password } = data as T extends Board ? T : never;
  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <>
      <HeadTitle name={title} />
      <Box>
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <div className="title">{title}</div>
            <div className="sub">
              <div>
                <span>작성일</span> : {createAt}
              </div>
              <div>
                <span>작성자</span> : {author}
              </div>
            </div>
            <div className="content">{content}</div>
            {isReference && (
              <div className="link">
                <a target="_blank" href={link}>
                  <span className="icon">
                    <AiFillFileText />
                    {link}
                  </span>
                </a>
              </div>
            )}
          </>
        )}
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  gap: 40px;
  .title {
    font-weight: 700;
    font-size: 24px;
  }
  .sub {
    display: flex;
    gap: 20px;
    opacity: 0.5;
    font-size: 14px;
    span {
      font-weight: 700;
    }
  }
  .content {
    flex: 1;
    line-height: 24px;
  }
  .link {
    a {
      cursor: pointer;
      color: blue;
      .icon {
        font-size: 16px;
        display: flex;
        align-items: center;
        svg {
          color: black;
        }
      }
    }
  }
`;

export default ViewPage;
