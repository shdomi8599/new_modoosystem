import RequestCheckPage from "@/components/page/RequestCheckPage";
import { adminRequestIdState } from "@/recoil/recoil";
import { useRecoilValue } from "recoil";

const CheckPage = () => {
  const adminRequestId = useRecoilValue(adminRequestIdState);
  return <RequestCheckPage adminRequestId={adminRequestId} />;
};

export default CheckPage;
