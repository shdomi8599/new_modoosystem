import { CheckForm } from "@/types";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { postCheckRequest } from "@/util/api";
import { useState } from "react";
import { FORM_ITEMS } from "@/datas/constants/constants";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const CheckPage = () => {
  const [data, setData] = useState<CheckForm>();
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: { requestId: string }) => {
    postCheckRequest(values).then((res) => {
      if (res) {
        setData(res);
      } else {
        return alert("의뢰번호를 확인해주세요.");
      }
    });
  };

  //의뢰번호 까먹는다면 연락처를 통해 찾을수있도록 마련???
  return (
    <>
      {data ? (
        <CheckBox>
          {FORM_ITEMS.map((item) => (
            <div key={item.name} className="item">
              <div className="name">{item.name}</div>
              <div className="content">{data[item.id]}</div>
            </div>
          ))}
        </CheckBox>
      ) : (
        <Box>
          <Form
            form={form}
            {...layout}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="requestId"
              label="의뢰번호"
              rules={[
                {
                  required: true,
                  message: "의뢰번호를 입력해주세요.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="btn-box">
              <Button type="primary" htmlType="submit">
                확인
              </Button>
            </Form.Item>
          </Form>
        </Box>
      )}
    </>
  );
};
export default CheckPage;

const CheckBox = styled.div`
  width: 210px;
  border: 1px solid #e9e6e6;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  gap: 20px;
  .item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .name {
      font-weight: 700;
    }
    .content {
      font-size: 14px;
    }
  }
`;

const Box = styled.div`
  width: 100%;
  .ant-row {
    display: flex;
    justify-content: center;
    input {
      width: 80%;
      @media (max-width: 576px) {
        width: 100%;
      }
    }
  }
  .btn-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 576px) {
    width: 90%;
  }
`;
