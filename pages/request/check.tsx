import { FormItem } from "@/types";
import styled from "styled-components";
import { Button, Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const CheckPage = () => {
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: FormItem) => {
    console.log(values);
  };
  return (
    <Box>
      <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="request-number"
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
            신청하기
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};
export default CheckPage;

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
