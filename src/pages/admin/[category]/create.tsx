import CreatePage from "@/components/page/CreatePage";
import { useRouter } from "next/router";

const AdminCreatePage = () => {
  const router = useRouter();
  const { endPoint } = router.query;
  return <CreatePage endPoint={endPoint as string} />;
};

export default AdminCreatePage;
