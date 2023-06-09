import { Answer } from "@/types/pageData";
import styled from "styled-components";

const AnswerBox = ({ answers }: { answers: Answer[] }) => {
  return (
    <Box className="answer-box">
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

export default AnswerBox;

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
