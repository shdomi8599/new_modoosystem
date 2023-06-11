import useRouterLoading from "../../useRouterLoading";
import { useMutation } from "react-query";
import {
  deleteAdminArticle,
  postAdminLogin,
  updateAdminRequest,
} from "@/util/api";
import { errorAlert, successAlert } from "@/components/alert/Alert";
import { useRouter } from "next/router";
import { isAdminLoginedState } from "@/recoil/recoil";
import { useSetRecoilState } from "recoil";

const useAdminMutate = () => {
  const router = useRouter();
  const setIsAdminLogined = useSetRecoilState(isAdminLoginedState);
  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const postAdminLoginMutate = useMutation(
    (data: { id: string; password: string }) => postAdminLogin(data),
    {
      onSuccess: (res: { token: string }) => {
        offRouterLoading();
        localStorage.setItem("token", res.token);
        setIsAdminLogined(true);
      },
      onError: () => {
        errorAlert("비밀번호를 확인해주세요.", "관리자 로그인");
        offRouterLoading();
      },
    }
  );

  const updateAdminRequestMutate = useMutation(
    (data: { status: string; requestId: string }) => updateAdminRequest(data),
    {
      onSuccess: () => {
        successAlert("성공적으로 변경되었습니다.", "처리상태가");
        router.back();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "처리상태");
        offRouterLoading();
      },
    }
  );

  const deleteAdminArticleMutate = useMutation(
    (params: { endPoint: string; id: string }) => deleteAdminArticle(params),
    {
      onSuccess: () => {
        successAlert("삭제되었습니다.", "게시글");
        router.back();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "게시글 삭제");
        offRouterLoading();
      },
    }
  );

  return {
    postAdminLoginMutate,
    updateAdminRequestMutate,
    deleteAdminArticleMutate,
    onRouterLoading,
  };
};

export default useAdminMutate;
