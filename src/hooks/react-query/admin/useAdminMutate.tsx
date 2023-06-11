import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import { isAdminLoginedState } from "@/recoil/recoil";
import { errorAlert, successAlert } from "@/components/alert/Alert";
import {
  deleteAdminAnswer,
  deleteAdminArticle,
  postAdminAnswer,
  postAdminLogin,
  updateAdminRequest,
} from "@/util/api";

import useRouterLoading from "../../useRouterLoading";

const useAdminMutate = () => {
  const router = useRouter();

  const setIsAdminLogined = useSetRecoilState(isAdminLoginedState);

  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const postAdminLoginMutate = useMutation(
    (data: { id: string; password: string }) => postAdminLogin(data),
    {
      onSuccess: (res: { token: string }) => {
        successAlert("로그인되었습니다.", "관리자");

        localStorage.setItem("token", res.token);

        setIsAdminLogined(true);

        offRouterLoading();
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
        successAlert("성공적으로 변경되었습니다.", "처리상태");

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

  const postAdminAnswerMutate = useMutation(
    (params: { id: string; content: string }) => postAdminAnswer(params),
    {
      onSuccess: () => {
        successAlert("작성되었습니다.", "답변");

        router.back();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "답변 작성");

        offRouterLoading();
      },
    }
  );

  const deleteAdminAnswerMutate = useMutation(
    (params: { id: string; answerId: number }) => deleteAdminAnswer(params),
    {
      onSuccess: () => {
        successAlert("삭제되었습니다.", "답변");

        router.back();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "답변 삭제");

        offRouterLoading();
      },
    }
  );

  return {
    postAdminLoginMutate,
    updateAdminRequestMutate,
    deleteAdminArticleMutate,
    postAdminAnswerMutate,
    deleteAdminAnswerMutate,
    onRouterLoading,
  };
};

export default useAdminMutate;
