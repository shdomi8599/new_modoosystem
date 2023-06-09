import { Button, Result } from "antd";
import { useRouter } from "next/router";

const Custom404Page = () => {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="잘못된 접근입니다."
      extra={
        <Button onClick={() => router.push("/")} type="primary">
          홈으로
        </Button>
      }
    />
  );
};

export default Custom404Page;
