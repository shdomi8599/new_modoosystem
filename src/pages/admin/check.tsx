import { useRecoilValue } from "recoil";

import { adminRequestIdState } from "@/recoil/recoil";

import RequestCheckPage from "@/components/page/RequestCheckPage";
import useCheckAdmin from "@/hooks/useCheckAdmin";

const CheckPage = () => {
  useCheckAdmin();

  const adminRequestId = useRecoilValue(adminRequestIdState);

  return <RequestCheckPage adminRequestId={adminRequestId} />;
};

export default CheckPage;
