import { useRouter } from "next/router";

import CreatePage from "@/components/page/CreatePage";
import useCheckAdmin from "@/hooks/useCheckAdmin";

const AdminCreatePage = () => {
  useCheckAdmin();
  const router = useRouter();
  const { category } = router.query;
  return <CreatePage endPoint={category as string} />;
};

export default AdminCreatePage;
