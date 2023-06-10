import { CheckForm } from "@/types";
import styled from "styled-components";
import { Button, Form, Input, Descriptions } from "antd";
import { postCheckRequest } from "@/util/api";
import { useEffect, useState } from "react";
import { FORM_ITEMS } from "@/datas/constants/constants";
import useRouterLoading from "@/hooks/useRouterLoading";
import { useRecoilState } from "recoil";
import { isAdminLoginedState } from "@/recoil/recoil";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const RequestCheckPage = ({ adminRequestId }: { adminRequestId?: string }) => {
  const [isAdminLogined] = useRecoilState(isAdminLoginedState);
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  const [data, setData] = useState<CheckForm>();
  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: { requestId: string }) => {
    onRouterLoading();
    postCheckRequest(values).then((res) => {
      if (res) {
        offRouterLoading();
        setData(res);
      } else {
        offRouterLoading();
        return alert("신청번호를 확인해주세요.");
      }
    });
  };

  useEffect(() => {
    if (adminRequestId) onFinish({ requestId: adminRequestId });
  }, [isAdminLogined]);

  return (
    <>
      {data ? (
        <CheckBox>
          <Descriptions bordered title="견적신청조회">
            {FORM_ITEMS.map((item) => (
              <Descriptions.Item key={item.name} label={item.name}>
                {data[item.id] ? data[item.id] : "정보없음"}
              </Descriptions.Item>
            ))}
          </Descriptions>
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
              label="신청번호"
              rules={[
                {
                  required: true,
                  message: "신청번호를 입력해주세요.",
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
export default RequestCheckPage;

const CheckBox = styled.div`
  width: 80%;
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
