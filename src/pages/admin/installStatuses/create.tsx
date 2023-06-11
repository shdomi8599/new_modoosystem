import styled from "styled-components";
import { Button, Form, Input, Select, Space } from "antd";

import { FormItem } from "@/types";
import useRouterLoading from "@/hooks/useRouterLoading";
import { INSTALL_CATEGORY } from "@/datas/constants/constants";
import useCheckAdmin from "@/hooks/useCheckAdmin";

const endPoint = "installStatuses";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const { Option } = Select;

const AdminCreatePage = () => {
  useCheckAdmin();
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: FormItem) => {
    onRouterLoading();
    console.log(values);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Box>
      <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="제목"
          rules={[
            {
              required: true,
              message: "제목을 입력해주세요.",
            },
          ]}
        >
          <Input maxLength={40} />
        </Form.Item>
        <Form.Item
          name="categori"
          label="카테고리"
          rules={[
            {
              required: true,
              message: "카테고리를 선택해주세요.",
            },
          ]}
        >
          <Select
            mode="multiple"
            className="select"
            placeholder="카테고리를 선택해주세요."
            onChange={handleChange}
            optionLabelProp="label"
          >
            {INSTALL_CATEGORY.map((category) => (
              <Option key={category} value={category} label={category}>
                <Space>{category}</Space>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="btn-box">
          <Button type="primary" htmlType="submit">
            작성하기
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};
export default AdminCreatePage;

const Box = styled.div`
  margin: 20px 0px;
  width: 90%;
  .ant-row {
    display: flex;
    justify-content: center;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
`;
