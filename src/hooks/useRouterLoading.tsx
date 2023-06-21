import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { routerLoadingState } from "@/recoil/recoil";

const useRouterLoading = () => {
  const [routerLoading, setRouterLoading] = useRecoilState(routerLoadingState);

  const onRouterLoading = useCallback(() => {
    setRouterLoading(true);
  }, []);

  const offRouterLoading = useCallback(() => {
    setRouterLoading(false);
  }, []);

  return { offRouterLoading, onRouterLoading, routerLoading };
};

export default useRouterLoading;
