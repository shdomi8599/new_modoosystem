import HeadTitle from "@/components/common/HeadTitle";
import WarningForm from "@/components/warning/WarningForm";
import useRouterLoading from "@/hooks/useRouterLoading";
import { getCheckMaster } from "@/util/api";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const AdminPage = () => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const [isMaster, setIsMaster] = useState(false);
  const [id, setId] = useState("");
  const idHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const [password, setPassword] = useState("");
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const checkSecretEvent = () => {
    const data = { id, password };
    onRouterLoading();
    getCheckMaster(data)
      .then(() => {
        offRouterLoading();
        setIsMaster(true);
      })
      .catch(() => {
        offRouterLoading();
        alert("비밀번호를 확인해주세요.");
      });
  };
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      checkSecretEvent();
    }
  };
  return (
    <>
      <HeadTitle name="모두시스템 - 관리자" />
      {isMaster ? (
        <Box>관리자입니다.</Box>
      ) : (
        <WarningForm
          idHandler={idHandler}
          onIdInput={true}
          passwordHandler={passwordHandler}
          handleKeyPress={handleKeyPress}
          checkSecretEvent={checkSecretEvent}
        />
      )}
    </>
  );
};
export default AdminPage;

const Box = styled.div``;
