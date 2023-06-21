import styled from "styled-components";
import { Button, Input, Result } from "antd";
import { ChangeEvent } from "react";

interface Props {
  handleKeyPress: (e: { key: string }) => void;
  passwordHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  checkSecretEvent: () => void;
  onIdInput?: boolean;
  idHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WarningForm = ({
  handleKeyPress,
  passwordHandler,
  checkSecretEvent,
  onIdInput,
  idHandler,
}: Props) => {
  return (
    <Box>
      <Result
        status="warning"
        title="비밀번호를 입력해주세요."
        extra={
          <div className="result-item">
            {onIdInput && idHandler && (
              <Input
                type="id"
                onKeyDown={handleKeyPress}
                onChange={idHandler}
                placeholder="아이디 입력"
              />
            )}
            <Input
              type="password"
              onKeyDown={handleKeyPress}
              onChange={passwordHandler}
              placeholder="비밀번호 입력"
            />
            <Button onClick={checkSecretEvent} type="primary" key="console">
              확인
            </Button>
          </div>
        }
      />
    </Box>
  );
};
export default WarningForm;

const Box = styled.div`
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
`;
