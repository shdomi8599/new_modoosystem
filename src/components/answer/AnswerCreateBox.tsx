import useRouterLoading from "@/hooks/useRouterLoading";
import { FormItem } from "@/types";
import { Button, Form, Input } from "antd";
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
  const { onRouterLoading } = useRouterLoading();
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: FormItem) => {
    // onRouterLoading();
  };
  return (
    <Box>
      <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="content" label="댓글작성">
          <TextArea placeholder="댓글을 입력해주세요." rows={6} />
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
