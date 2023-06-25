import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Collapse, Input, Spin } from "antd";
import { useQuery } from "react-query";
import { AiFillFileText } from "react-icons/ai";

import { Announcement, Board, Reference } from "@/types/pageData";
import { isAdminLoginedState } from "@/recoil/recoil";
import { useRecoilState } from "recoil";
import { confirmAlert } from "../alert/Alert";
import { getData } from "@/util/api";

import HeadTitle from "../common/HeadTitle";
import AnswerViewBox from "../answer/AnswerViewBox";
import WarningForm from "../warning/WarningForm";
import useCustomForm from "@/hooks/useCustomForm";
import AnswerCreateBox from "../answer/AnswerCreateBox";
import useBoardsMutate from "@/hooks/react-query/boards/useBoardsMutate";
import useAdminMutate from "@/hooks/react-query/admin/useAdminMutate";

import { MyQuery } from "@/types";

const { Panel } = Collapse;

const ViewPage = <T,>({ endPoint }: { endPoint: string }) => {
  const router = useRouter();

  const [isAdminLogined] = useRecoilState(isAdminLoginedState);

  const { id } = router.query as MyQuery;

  const isReference = router.asPath.includes("references");
  const isBoard = router.asPath.includes("boards");

  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [endPoint, "view", id],
    queryFn: () => getData<T>(endPoint, id),
  });

  const { title, content, createAt, author } = data as T extends Announcement
    ? T
    : never;
  const { link } = data as T extends Reference ? T : never;
  const { answers, secret } = data as T extends Board ? T : never;

  const [isSecret, setIsSecret] = useState(secret);

  const { passwordHandler, password } = useCustomForm();

  const { deleteAdminArticleMutate } = useAdminMutate();

  const { postCheckSecretBoardMutate, deleteBoardMutate } = useBoardsMutate({
    setIsSecret,
  });

  const checkSecretEvent = () => {
    const data = {
      password,
      id: id as string,
    };

    postCheckSecretBoardMutate.mutate({ id: id, data });
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter" && isSecret) {
      return checkSecretEvent();
    }

    if (e.key === "Enter") {
      deleteEvent();
    }
  };

  const deleteEvent = () => {
    confirmAlert("정말 삭제하시겠습니까?", "게시글 삭제가").then(() => {
      deleteBoardMutate.mutate({ id: id, password });
    });
  };

  const adminDeleteEvent = () => {
    confirmAlert("정말 삭제하시겠습니까?", "게시글 삭제가").then(() => {
      deleteAdminArticleMutate.mutate({ endPoint, id: id });
    });
  };

  useEffect(() => {
    if (isAdminLogined) {
      setIsSecret(false);
    }
  }, []);

  if (isError) return <div>잠시 후에 다시 시도해주세요.</div>;
  return (
    <>
      <HeadTitle name={title} />
      <Box>
        {isLoading ? (
          <Spin />
        ) : isSecret ? (
          <WarningForm
            handleKeyPress={handleKeyPress}
            passwordHandler={passwordHandler}
            checkSecretEvent={checkSecretEvent}
          />
        ) : (
          <>
            {(isBoard || isAdminLogined) && (
              <div className="btn-box">
                {isAdminLogined ? (
                  <Button onClick={adminDeleteEvent}>삭제하기</Button>
                ) : (
                  <Collapse defaultActiveKey={[]}>
                    <Panel className="panel" header="삭제하기" key="1">
                      <Input
                        type="password"
                        onKeyDown={handleKeyPress}
                        onChange={passwordHandler}
                        placeholder="비밀번호 입력"
                      />
                      <Button onClick={deleteEvent}>삭제</Button>
                    </Panel>
                  </Collapse>
                )}
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
            {isAdminLogined && isBoard && <AnswerCreateBox />}
            {(isAdminLogined || isBoard) && answers && (
              <AnswerViewBox answers={answers} />
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
  min-height: 600px;
  margin-top: 20px;
  margin-bottom: 32px;
  gap: 40px;
  position: relative;
  .panel {
    width: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    .ant-collapse-header {
      width: 100%;
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
