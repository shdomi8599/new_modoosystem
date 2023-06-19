import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import { FormItem } from "@/types";
import useArticleMutate from "@/hooks/react-query/article/useArticleMutate";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const { TextArea } = Input;

const CreatePage = ({ endPoint }: { endPoint: string }) => {
  const router = useRouter();

  const { asPath } = router;

  const isBoardPage = asPath.includes("boards");
  const isAdminPage = asPath.includes("admin");
  const isReferencePage = asPath.includes("references");

  const initialValues = isAdminPage
    ? {
        ["author"]: "관리자",
      }
    : {};

  const { postArticleMutate } = useArticleMutate();

  const [form] = Form.useForm();

  const [secret, setSecret] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setSecret(e.target.checked);
  };

  const onFinish = (values: FormItem) => {
    const data = { ...values, secret };

    postArticleMutate.mutate({ endPoint, data });
  };

  return (
    <Box>
      <Form
        initialValues={initialValues}
        form={form}
        {...layout}
        name="control-hooks"
        onFinish={onFinish}
      >
        {isBoardPage && (
          <Form.Item label="옵션">
            <Checkbox onChange={onChange}>비밀글</Checkbox>
          </Form.Item>
        )}
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
          name="author"
          label="이름"
          rules={[
            {
              required: true,
              message: "이름을 입력해주세요.",
            },
          ]}
        >
          <Input disabled={isAdminPage ? true : false} maxLength={15} />
        </Form.Item>
        {isBoardPage && (
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요.",
              },
            ]}
          >
            <Input type="password" maxLength={15} />
          </Form.Item>
        )}
        {isReferencePage && (
          <Form.Item name="link" label="링크">
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="content"
          label="내용"
          rules={[
            {
              required: true,
              message: "내용을 입력해주세요.",
            },
          ]}
        >
          <TextArea rows={8} />
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
export default CreatePage;

const Box = styled.div`
  margin: 20px 0px;
  width: 90%;
  .ant-row {
    display: flex;
    justify-content: center;
  }
  textarea {
    resize: none;
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
