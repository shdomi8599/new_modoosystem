import styled from "styled-components";
import { Descriptions } from "antd";

import { Product } from "@/types";

const Product = ({ category }: { category: Product[] }) => {
  return (
    <>
      {category?.map(
        ({ src, specification, name, outline, characteristic }, idx) => (
          <Box key={idx}>
            <div className="top">
              <div className="img-box">
                <img src={src} alt="product" />
              </div>
              <div className="content-box">
                <Descriptions column={8} title="사양" bordered>
                  {specification.map((spec) => (
                    <Descriptions.Item
                      key={spec.name}
                      span={8}
                      label={spec.name}
                    >
                      {spec.content}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </div>
            </div>
            <div className="bottom">
              <Descriptions column={8} title="상품 소개" bordered>
                <Descriptions.Item span={8} label="이름">
                  {name}
                </Descriptions.Item>
                <Descriptions.Item span={8} label="개요">
                  {outline}
                </Descriptions.Item>
                {characteristic && (
                  <Descriptions.Item span={8} label="특징">
                    {characteristic.map((text, idx) => (
                      <>
                        {text}
                        <br key={idx} />
                      </>
                    ))}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          </Box>
        )
      )}
    </>
  );
};

export default Product;

const Box = styled.div`
  width: 85%;
  min-height: 500px;
  margin: 100px 0px;

  .ant-descriptions-row {
    .ant-descriptions-item-label {
      min-width: 80px;
    }
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 60px;
    margin-bottom: 40px;

    @media (max-width: 960px) {
      flex-direction: column;
      align-items: center;
    }

    .img-box {
      flex: 1;
      width: 300px;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .content-box {
      flex: 3;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
  }
`;
