import { useRouter } from "next/router";
import { useEffect } from "react";

import { getAdminCheck } from "@/util/api";
import { errorAlert } from "@/components/alert/Alert";

const useCheckAdmin = () => {
  const router = useRouter();
  
  useEffect(() => {
    getAdminCheck().catch(() => {
      errorAlert("접근할 수 없습니다.", "관리자페이지");

      router.push("/");
    });
  }, []);
};

export default useCheckAdmin;
