import { useRouter } from "next/router";

import CreatePage from "@/components/page/CreatePage";
import useCheckAdmin from "@/hooks/useCheckAdmin";

import { MyQuery } from "@/types";

const AdminCreatePage = () => {
  useCheckAdmin();

  const router = useRouter();

  const { category } = router.query as MyQuery;

  return <CreatePage endPoint={category} />;
};

export default AdminCreatePage;
