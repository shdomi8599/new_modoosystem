import HeadTitle from "@/components/common/HeadTitle";
import PaginationPage from "@/components/page/PaginationPage";
import WarningForm from "@/components/warning/WarningForm";
import useCustomForm from "@/hooks/useCustomForm";
import useRouterLoading from "@/hooks/useRouterLoading";
import { Announcement, Board, Reference } from "@/types/pageData";
import { getCheckMaster } from "@/util/api";
import { useState } from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import { TAB_ITEMS } from "@/datas/constants/constants";

const AdminPage = () => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const { id, password, idHandler, passwordHandler } = useCustomForm();
  const [isMaster, setIsMaster] = useState(false);
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

  const [endPoint, setEndPoint] = useState("boards");

  const onChange = (key: string) => {
    setEndPoint(key);
  };

  return (
    <>
      <HeadTitle name="모두시스템 - 관리자" />
      {isMaster ? (
        <>
          <Box>
            <Tabs defaultActiveKey="1" items={TAB_ITEMS} onChange={onChange} />
          </Box>
          <PaginationPage<Board | Announcement | Reference>
            endPoint={endPoint}
          />
        </>
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

const Box = styled.div`
  width: 90%;
`;
