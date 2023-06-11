import useAdminMutate from "@/hooks/react-query/admin/useAdminMutate";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const { TextArea } = Input;

const AnswerCreateBox = () => {
  const router = useRouter();
  const { id } = router.query;
  const { postAdminAnswerMutate, onRouterLoading } = useAdminMutate();
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: { content: string }) => {
    onRouterLoading();
    const data = { ...values, id: id as string };
    postAdminAnswerMutate.mutate(data);
  };
  return (
    <Box>
      <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="content" label="답변작성">
          <TextArea placeholder="답변을 입력해주세요." rows={6} />
        </Form.Item>
        <Form.Item className="answer-btn-box">
          <Button type="primary" htmlType="submit">
            작성하기
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};

export default AnswerCreateBox;

const Box = styled.div`
  .ant-col-4 {
    text-align: start;
    flex: none;
  }
  .ant-col-14 {
    max-width: none;
    textarea {
      resize: none;
    }
  }
  .answer-btn-box {
    display: flex;
    justify-content: flex-end;
  }
`;
