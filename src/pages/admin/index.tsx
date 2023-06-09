import HeadTitle from "@/components/common/HeadTitle";
import PaginationPage from "@/components/page/PaginationPage";
import WarningForm from "@/components/warning/WarningForm";
import useCustomForm from "@/hooks/useCustomForm";
import useRouterLoading from "@/hooks/useRouterLoading";
import { Announcement, Board, Reference } from "@/types/pageData";
import { postAdminLogin } from "@/util/api";
import styled from "styled-components";
import { Button, Tabs } from "antd";
import { TAB_ITEMS } from "@/datas/constants/constants";
import { useRecoilState } from "recoil";
import { adminEndPointState, isAdminLoginedState } from "@/recoil/recoil";
import { useRouter } from "next/router";

const AdminPage = () => {
  const router = useRouter();
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const { id, password, idHandler, passwordHandler } = useCustomForm();
  const [isAdminLogined, setIsAdminLogined] =
    useRecoilState(isAdminLoginedState);
  const checkSecretEvent = () => {
    const data = { id, password };
    onRouterLoading();
    postAdminLogin(data)
      .then((res: { token: string }) => {
        offRouterLoading();
        localStorage.setItem("token", res.token);
        setIsAdminLogined(true);
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

  const [adminEndPoint, setAdminEndPoint] = useRecoilState(adminEndPointState);
  const onChange = (key: string) => {
    if (key === "requestForm") {
      return;
    }
    setAdminEndPoint(key);
  };

  const adminLogout = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      alert("정상적으로 로그아웃 되었습니다.");
      localStorage.removeItem("token");
      setIsAdminLogined(false);
      router.push("/");
    }
  };

  const moveCreate = () => {
    router.push(`/admin/${adminEndPoint}/create`);
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
              <Button onClick={moveCreate}>글쓰기</Button>
              <Button onClick={adminLogout}>로그아웃</Button>
            </div>
          </Box>
          <PaginationPage<Board | Announcement | Reference>
            endPoint={adminEndPoint}
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
