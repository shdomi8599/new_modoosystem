import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Button } from "antd";

import { Answer } from "@/types/pageData";
import { isAdminLoginedState } from "@/recoil/recoil";
import useAdminMutate from "@/hooks/react-query/admin/useAdminMutate";
import { confirmAlert } from "../alert/Alert";

const AnswerViewBox = ({ answers }: { answers: Answer[] }) => {
  const router = useRouter();

  const isAdminLogined = useRecoilValue(isAdminLoginedState);

  const { deleteAdminAnswerMutate } = useAdminMutate();

  const { id } = router.query;

  const isAnswer = answers?.length && answers?.length > 1;

  const adminDeleteEvent = (answerId: number) => {
    confirmAlert("정말 삭제하시겠습니까?", "답변 삭제를").then(() => {
      const data = {
        id: id as string,
        answerId,
      };

      deleteAdminAnswerMutate.mutate(data);
    });
  };

  return (
    <Box>
      <div className="title">답변</div>
      <div className="content">
        {isAnswer ? (
          answers.map((answer, idx) => (
            <div key={idx} className="answer">
              <div className="top">
                <div>
                  <span>작성일</span> : {answer.createAt}
                </div>
                <div>
                  <span>작성자</span> : <span className="master">관리자</span>
                </div>
                {isAdminLogined && (
                  <div>
                    <Button onClick={() => adminDeleteEvent(answer.id)}>
                      삭제하기
                    </Button>
                  </div>
                )}
              </div>
              <div className="bottom">{answer.content}</div>
            </div>
          ))
        ) : (
          <div>확인 후, 빠른 시일 안에 답변드리겠습니다. 감사합니다.</div>
        )}
      </div>
    </Box>
  );
};

export default AnswerViewBox;

const Box = styled.div`
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
        align-items: center;
        span {
          font-weight: 700;
        }
      }
      .bottom {
        line-height: 24px;
      }
    }
  }
`;
