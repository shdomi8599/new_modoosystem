import { Announcement, Board, Reference } from "@/types/pageData";
import { deleteBoard, getData } from "@/util/api";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Button, Collapse, Input, Spin, Result } from "antd";
import styled from "styled-components";
import HeadTitle from "../common/HeadTitle";
import { AiFillFileText } from "react-icons/ai";
import React, { ChangeEvent, useState } from "react";
import useRouterLoading from "@/hooks/useRouterLoading";
import AnswerBox from "../answer/AnswerBox";

const { Panel } = Collapse;

const ViewPage = <T,>(endPoint: string) => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [endPoint, "view", id],
    queryFn: () => getData<T>(endPoint, id as string),
  });

  const isReference = router.asPath.includes("references");
  const isBoard = router.asPath.includes("boards");
  const { title, content, createAt, author } = data as T extends Announcement
    ? T
    : never;
  const { link } = data as T extends Reference ? T : never;
  const { answers, secret } = data as T extends Board ? T : never;

  const [isSecret, setIsSecret] = useState(secret);
  const [password, setPassword] = useState("");
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const deleteEvent = () => {
    onRouterLoading();
    deleteBoard(Number(id), password)
      .then(() => {
        alert("성공적으로 삭제되었습니다.");
        router.back();
      })
      .catch(() => {
        offRouterLoading();
        alert("비밀번호를 확인해주세요.");
      });
  };

  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <>
      <HeadTitle name={title} />
      <Box>
        {isLoading ? (
          <Spin />
        ) : isSecret ? (
          <Result
            status="warning"
            title="비밀번호를 입력해주세요."
            extra={
              <div className="result-item">
                <Input onChange={passwordHandler} placeholder="비밀번호 입력" />
                <Button type="primary" key="console">
                  확인
                </Button>
              </div>
            }
          />
        ) : (
          <>
            {isBoard && (
              <div className="btn-box">
                <Collapse defaultActiveKey={[]}>
                  <Panel className="panel" header="삭제하기" key="1">
                    <Input
                      onChange={passwordHandler}
                      placeholder="비밀번호 입력"
                    />
                    <Button onClick={deleteEvent}>삭제</Button>
                  </Panel>
                </Collapse>
              </div>
            )}
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
            {isBoard && answers && <AnswerBox answers={answers} />}
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
  min-height: 600px;
  margin-top: 20px;
  margin-bottom: 32px;
  gap: 40px;
  position: relative;

  .ant-result {
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .result-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
      input {
        min-width: 180px;
        width: 30%;
      }
    }
  }

  .btn-box {
    position: absolute;
    right: 0px;
    top: -70px;
    .ant-collapse-content-box {
      display: flex;
      gap: 8px;
    }
  }

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
    white-space: pre-line;
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
`;

export default ViewPage;
