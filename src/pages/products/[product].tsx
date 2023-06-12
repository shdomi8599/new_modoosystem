import styled from "styled-components";

import Product from "@/components/product/Product";
import { PRODUCTS_CATEGORIES } from "@/datas/constants/products";
import { useRouter } from "next/router";
import { INSTALL_CATEGORY } from "@/datas/constants/constants";

const ProductPage = () => {
  const router = useRouter();

  const product = router.query.product;
  const index = INSTALL_CATEGORY.findIndex((data) => data === product);

  const category = PRODUCTS_CATEGORIES[index];

  return (
    <Box>
      <Product category={category} />
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
