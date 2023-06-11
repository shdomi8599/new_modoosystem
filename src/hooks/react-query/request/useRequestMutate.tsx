import { useMutation } from "react-query";
import { SetStateAction } from "react";

import { postCheckRequest, postRequest } from "@/util/api";
import { errorAlert } from "@/components/alert/Alert";
import { CheckForm, RequestForm } from "@/types";

import useRouterLoading from "../../useRouterLoading";

interface Props {
  setSuccess?: (value: SetStateAction<boolean>) => void;
  setFormId?: (value: SetStateAction<string>) => void;
  setRequestData?: (value: SetStateAction<CheckForm | undefined>) => void;
}

const useRequestMutate = ({ setSuccess, setFormId, setRequestData }: Props) => {
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
        errorAlert("신청번호를 확인해주세요.", "견적조회");
        offRouterLoading();
      },
    }
  );

  return {
    postRequestMutate,
    postCheckRequestMutate,
    onRouterLoading,
  };
};

export default useRequestMutate;
