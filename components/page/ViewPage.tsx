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
  const { answers } = data as T extends Board ? T : never;

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
                <span>작성일</span> : <span>{createAt}</span>
              </div>
              <div>
                <span>작성자</span> :{" "}
                <span className={author === "관리자" ? "master" : ""}>
                  {author}
                </span>
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
        {isBoard && (
          <div className="answer-box">
            <div className="title">답변</div>
            <div className="content">
              {answers ? (
                answers.map((answer) => (
                  <div className="answer">
                    <div className="top">
                      <div>
                        <span>작성일</span> : {answer.createAt}
                      </div>
                      <div>
                        <span>작성자</span> :{" "}
                        <span className="master">관리자</span>
                      </div>
                    </div>
                    <div className="bottom">{answer.content}</div>
                  </div>
                ))
              ) : (
                <div>확인 후, 빠른 시일 안에 답변드리겠습니다. 감사합니다.</div>
              )}
            </div>
          </div>
        )}
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin-top: 20px;
  margin-bottom: 32px;
  gap: 40px;
  .master {
    color: red;
  }
  > .title {
    font-weight: 700;
    font-size: 24px;
  }
  > .sub {
    display: flex;
    gap: 20px;
    opacity: 0.5;
    font-size: 14px;
    span {
      font-weight: 700;
    }
  }
  > .content {
    flex: 1;
    line-height: 24px;
  }
  > .link {
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

  .answer-box {
    border-top: 1px solid #dddcdc;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    .title {
      font-weight: 700;
      font-size: 18px;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 40px;
      .answer {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .top {
          display: flex;
          gap: 20px;
          opacity: 0.5;
          font-size: 14px;
          span {
            font-weight: 700;
          }
        }
      }
    }
  }
`;

export default ViewPage;
