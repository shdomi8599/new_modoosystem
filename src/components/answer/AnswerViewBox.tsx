import useRouterLoading from "@/hooks/useRouterLoading";
import { isAdminLoginedState } from "@/recoil/recoil";
import { Answer } from "@/types/pageData";
import { deleteAdminAnswer } from "@/util/api";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const AnswerViewBox = ({ answers }: { answers: Answer[] }) => {
  const router = useRouter();
  const { id } = router.query;
  const isAdminLogined = useRecoilValue(isAdminLoginedState);
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const adminDeleteEvent = (answerId: number) => {
    if (confirm("정말 답변을 삭제하시겠습니까?")) {
      onRouterLoading();
      deleteAdminAnswer(id as string, answerId)
        .then(() => {
          alert("답변이 삭제되었습니다.");
          router.push("/admin").then(() => router.reload());
        })
        .catch(() => {
          alert("잠시 후에 다시 시도해주세요.");
          offRouterLoading();
        });
    }
  };
  return (
    <Box>
      <div className="title">답변</div>
      <div className="content">
        {answers ? (
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
