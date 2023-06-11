import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { SetStateAction } from "react";

import { errorAlert, successAlert } from "@/components/alert/Alert";
import { deleteBoard, postCheckSecretBoard } from "@/util/api";

import useRouterLoading from "../../useRouterLoading";

interface Props {
  setIsSecret: (value: SetStateAction<boolean | undefined>) => void;
}

const useBoardsMutate = ({ setIsSecret }: Props) => {
  const router = useRouter();
  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const postCheckSecretBoardMutate = useMutation(
    (params: {
      id: string;
      data: {
        id: string;
        password: string;
      };
    }) => postCheckSecretBoard(params),
    {
      onSuccess: () => {
        setIsSecret(false);
        offRouterLoading();
      },
      onError: () => {
        errorAlert("비밀번호를 확인해주세요.", "게시글");
        offRouterLoading();
      },
    }
  );

  const deleteBoardMutate = useMutation(
    (params: { id: string; password: string }) => deleteBoard(params),
    {
      onSuccess: () => {
        successAlert("성공적으로 삭제되었습니다.", "게시글이");
        router.back();
      },
      onError: () => {
        errorAlert("비밀번호를 확인해주세요.", "게시글");
        offRouterLoading();
      },
    }
  );

  return {
    postCheckSecretBoardMutate,
    deleteBoardMutate,
    onRouterLoading,
  };
};

export default useBoardsMutate;
