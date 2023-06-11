import styled from "styled-components";
import { Button, Tabs } from "antd";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import HeadTitle from "@/components/common/HeadTitle";
import PaginationPage from "@/components/page/PaginationPage";
import WarningForm from "@/components/warning/WarningForm";
import useCustomForm from "@/hooks/useCustomForm";
import { Announcement, Board, Reference } from "@/types/pageData";
import { TAB_ITEMS } from "@/datas/constants/constants";
import { adminEndPointState, isAdminLoginedState } from "@/recoil/recoil";
import AdminPaginationPage from "@/components/page/AdminPaginationPage";
import useAdminMutate from "@/hooks/react-query/admin/useAdminMutate";
import { confirmAlert } from "@/components/alert/Alert";

const AdminPage = () => {
  const router = useRouter();
  const [isAdminLogined, setIsAdminLogined] =
    useRecoilState(isAdminLoginedState);
  const { postAdminLoginMutate, onRouterLoading } = useAdminMutate();
  const { id, password, idHandler, passwordHandler } = useCustomForm();

  const checkSecretEvent = () => {
    onRouterLoading();
    const data = { id, password };
    postAdminLoginMutate.mutate(data);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      checkSecretEvent();
    }
  };

  const [adminEndPoint, setAdminEndPoint] = useRecoilState(adminEndPointState);
  const onChange = (key: string) => {
    setAdminEndPoint(key);
  };

  const adminLogout = () => {
    confirmAlert("정말 로그아웃 하시겠습니까?", "로그아웃이").then(() => {
      localStorage.removeItem("token");
      setIsAdminLogined(false);
      router.push("/");
    });
  };

  const moveCreate = () => {
    confirmAlert("이동하시겠습니까?", "글쓰기가").then(() =>
      router.push(`/admin/${adminEndPoint}/create`)
    );
  };

  return (
    <>
      <HeadTitle name="모두시스템 - 관리자" />
      {isAdminLogined ? (
        <>
          <Box>
            <Tabs
              defaultActiveKey={adminEndPoint}
              items={TAB_ITEMS}
              onChange={onChange}
            />
            <div className="btn-box">
              {adminEndPoint !== "request" && (
                <Button onClick={moveCreate}>글쓰기</Button>
              )}
              <Button onClick={adminLogout}>로그아웃</Button>
            </div>
          </Box>
          {adminEndPoint === "request" ||
          adminEndPoint === "installStatuses" ? (
            <AdminPaginationPage endPoint={adminEndPoint} />
          ) : (
            <PaginationPage<Board | Announcement | Reference>
              endPoint={adminEndPoint}
            />
          )}
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
  position: relative;
  width: 90%;
  margin-top: 20px;

  .btn-box {
    position: absolute;
    right: 0px;
    top: 0px;
    display: flex;
    gap: 16px;
  }
`;
