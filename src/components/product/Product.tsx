import styled from "styled-components";
import { Descriptions } from "antd";

import { Product } from "@/types";

const Product = ({ category }: { category: Product[] }) => {
  return (
    <>
      {category?.map((data) => (
        <Box>
          <div className="top">
            <div className="img-box">
              <img src={data.src} alt="product" />
            </div>
            <div className="content-box">
              <Descriptions column={8} title="사양" bordered>
                {data.specification.map((spec) => (
                  <Descriptions.Item span={8} label={spec.name}>
                    {spec.content}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </div>
          <div className="bottom">
            <Descriptions column={8} title="상품 소개" bordered>
              <Descriptions.Item span={8} label="이름">
                {data.name}
              </Descriptions.Item>
              <Descriptions.Item span={8} label="개요">
                {data.outline}
              </Descriptions.Item>
              {data.characteristic && (
                <Descriptions.Item span={8} label="특징">
                  {data.characteristic.map((text) => (
                    <>
                      {text}
                      <br />
                    </>
                  ))}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        </Box>
      ))}
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
