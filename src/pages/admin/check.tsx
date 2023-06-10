import RequestCheckPage from "@/components/page/RequestCheckPage";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import { adminRequestIdState } from "@/recoil/recoil";
import { useRecoilValue } from "recoil";

const CheckPage = () => {
  useCheckAdmin();
  const adminRequestId = useRecoilValue(adminRequestIdState);
  return <RequestCheckPage adminRequestId={adminRequestId} />;
};

export default CheckPage;
