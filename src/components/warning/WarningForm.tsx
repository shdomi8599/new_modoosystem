import { Button, Input, Result } from "antd";

const WarningForm = ({
  handleKeyPress,
  passwordHandler,
  checkSecretEvent,
  onIdInput,
  idHandler,
}: any) => {
  return (
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
  );
};
export default WarningForm;
