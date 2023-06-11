import { useRecoilState } from "recoil";

import { routerLoadingState } from "@/recoil/recoil";

const useRouterLoading = () => {
  const [routerLoading, setRouterLoading] = useRecoilState(routerLoadingState);

  const onRouterLoading = () => {
    setRouterLoading(true);
  };

  const offRouterLoading = () => {
    setRouterLoading(false);
  };

  return { offRouterLoading, onRouterLoading, routerLoading };
};

export default useRouterLoading;
