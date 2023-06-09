import CreatePage from "@/components/page/CreatePage";
import { useRouter } from "next/router";

const AdminCreatePage = () => {
  const router = useRouter();
  const { category } = router.query;
  return <CreatePage endPoint={category as string} />;
};

export default AdminCreatePage;
