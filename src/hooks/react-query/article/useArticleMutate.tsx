import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { errorAlert, successAlert } from "@/components/alert/Alert";
import { postArticle } from "@/util/api";
import { FormItem } from "@/types";

import useRouterLoading from "../../useRouterLoading";

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

  return {
    postArticleMutate,
    onRouterLoading,
  };
};

export default useArticleMutate;
