import { useRouter } from "next/router";
import { useEffect } from "react";

import { getAdminCheck } from "@/util/api";

const useCheckAdmin = () => {
  const router = useRouter();
  useEffect(() => {
    getAdminCheck().catch(() => {
      alert("관리자만 접근할 수 있습니다.");
      router.push("/");
    });
  }, []);
};

export default useCheckAdmin;
