import styled from "styled-components";
import { useRouter } from "next/router";

import { PRODUCTS_CATEGORIES } from "@/datas/constants/products";
import { INSTALL_CATEGORY } from "@/datas/constants/constants";

import Product from "@/components/product/Product";

const ProductPage = () => {
  const router = useRouter();
  const { product } = router.query;

  const index = INSTALL_CATEGORY.findIndex((data) => data === product);
  const category = PRODUCTS_CATEGORIES[index];

  return (
    <Box>
      {product === "주차부스" ? (
        <div>준비 중입니다.</div>
      ) : (
        <Product category={category} />
      )}
    </Box>
  );
};
export default ProductPage;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
