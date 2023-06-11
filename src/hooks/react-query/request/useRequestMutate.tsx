import useRouterLoading from "../../useRouterLoading";
import { useMutation } from "react-query";
import { postRequest } from "@/util/api";
import { RequestForm } from "@/types";
import { errorAlert } from "@/components/alert/Alert";
import { SetStateAction } from "react";

interface Props {
  setSuccess: (value: SetStateAction<boolean>) => void;
  setFormId: (value: SetStateAction<string>) => void;
}

const useRequestMutate = ({ setSuccess, setFormId }: Props) => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();

  const postRequestMutate = useMutation(
    (data: RequestForm) => postRequest(data),
    {
      onSuccess: (id: string) => {
        setFormId(id);
        setSuccess(true);
        offRouterLoading();
      },
      onError: () => {
        errorAlert("잠시 후에 다시 시도해주세요.", "견적의뢰");
        offRouterLoading();
      },
    }
  );

  return { postRequestMutate, onRouterLoading };
};

export default useRequestMutate;
