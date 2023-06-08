import HeadTitle from "@/components/common/HeadTitle";
import { useRouter } from "next/router";
import styled from "styled-components";

const ProductPage = () => {
  const router = useRouter();
  const { product } = router.query;
  return (
    <>
      <HeadTitle name={`모두시스템 - ${product}`} />
      <Box>상품</Box>
    </>
  );
};
export default ProductPage;

const Box = styled.div``;
