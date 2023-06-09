import HeadTitle from "@/components/common/HeadTitle";
import { Button, Input, Result } from "antd";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const AdminPage = () => {
  const [id, setId] = useState("");
  const idHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const [password, setPassword] = useState("");
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
    }
  };
  return (
    <>
      <HeadTitle name="모두시스템 - 관리자" />
      <Box>
        <Result
          status="warning"
          title="아이디와 비밀번호를 입력해주세요."
          extra={
            <div className="result-item">
              <Input
                type="id"
                onKeyDown={handleKeyPress}
                onChange={passwordHandler}
                placeholder="아이디 입력"
              />
              <Input
                type="password"
                onKeyDown={handleKeyPress}
                onChange={passwordHandler}
                placeholder="비밀번호 입력"
              />
              <Button onClick={() => {}} type="primary" key="console">
                확인
              </Button>
            </div>
          }
        />
      </Box>
    </>
  );
};
export default AdminPage;

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
