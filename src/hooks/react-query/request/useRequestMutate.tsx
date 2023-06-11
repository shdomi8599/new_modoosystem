import useRouterLoading from "../../useRouterLoading";
import { useMutation } from "react-query";
import { postCheckRequest, postRequest, updateAdminRequest } from "@/util/api";
import { CheckForm, RequestForm } from "@/types";
import { errorAlert, successAlert } from "@/components/alert/Alert";
import { SetStateAction } from "react";
import { useRouter } from "next/router";

interface Props {
  setSuccess?: (value: SetStateAction<boolean>) => void;
  setFormId?: (value: SetStateAction<string>) => void;
  setRequestData?: (value: SetStateAction<CheckForm | undefined>) => void;
}

const useRequestMutate = ({ setSuccess, setFormId, setRequestData }: Props) => {
  const router = useRouter();
  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const postRequestMutate = useMutation(
    (data: RequestForm) => postRequest(data),
    {
      onSuccess: (id: string) => {
        setFormId && setFormId(id);
        setSuccess && setSuccess(true);
        offRouterLoading();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "견적의뢰");
        offRouterLoading();
      },
    }
  );

  const postCheckRequestMutate = useMutation(
    (request: { requestId: string }) => postCheckRequest(request),
    {
      onSuccess: (data) => {
        setRequestData && setRequestData(data);
        offRouterLoading();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "견적조회");
        offRouterLoading();
      },
    }
  );

  const updateAdminRequestMutate = useMutation(
    (data: { status: string; requestId: string }) => updateAdminRequest(data),
    {
      onSuccess: () => {
        successAlert("성공적으로 변경되었습니다.", "처리상태가");
        router.push("/admin").then(() => router.reload());
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "처리상태");
        offRouterLoading();
      },
    }
  );

  return {
    postRequestMutate,
    postCheckRequestMutate,
    updateAdminRequestMutate,
    onRouterLoading,
  };
};

export default useRequestMutate;
