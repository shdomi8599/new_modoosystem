import useRouterLoading from "../../useRouterLoading";
import { useMutation } from "react-query";
import { deleteAdminArticle, postArticle } from "@/util/api";
import { errorAlert, successAlert } from "@/components/alert/Alert";
import { useRouter } from "next/router";
import { FormItem } from "@/types";

const useArticleMutate = () => {
  const router = useRouter();
  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const postArticleMutate = useMutation(
    (params: { endPoint: string; data: FormItem }) => postArticle(params),
    {
      onSuccess: () => {
        successAlert("등록되었습니다.", "게시글");
        router.back();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "견적의뢰");
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
    postArticleMutate,
    deleteAdminArticleMutate,
    onRouterLoading,
  };
};

export default useArticleMutate;
