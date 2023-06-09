import styled from "styled-components";
import { Button, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { FormItem } from "@/types";
import { postBoard } from "@/util/api";
import { useRouter } from "next/router";
import useRouterLoading from "@/hooks/useRouterLoading";
import { useState } from "react";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const { TextArea } = Input;

const CreatePage = () => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const router = useRouter();
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: FormItem) => {
    onRouterLoading();
    const data = { ...values, secret };
    postBoard(data)
      .then(() => {
        alert("게시글이 등록되었습니다.");
        router.back();
      })
      .catch(() => {
        offRouterLoading();
        alert("잠시 후에 다시 시도해주세요.");
      });
  };

  const [secret, setSecret] = useState(false);
  const onChange = (e: CheckboxChangeEvent) => {
    setSecret(e.target.checked);
  };

  return (
    <Box>
      <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
        <Form.Item label="옵션">
          <Checkbox onChange={onChange}>비밀글</Checkbox>
        </Form.Item>
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
          <Input maxLength={15} />
        </Form.Item>
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
  @media (max-width: 576px) {
    width: 90%;
  }
`;
