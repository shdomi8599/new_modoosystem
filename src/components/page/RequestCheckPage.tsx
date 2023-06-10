import { CheckForm } from "@/types";
import styled from "styled-components";
import { Button, Form, Input, Descriptions, Radio } from "antd";
import { postCheckRequest, updateAdminRequest } from "@/util/api";
import { useEffect, useState } from "react";
import { FORM_ITEMS } from "@/datas/constants/constants";
import useRouterLoading from "@/hooks/useRouterLoading";
import { useRecoilState } from "recoil";
import { isAdminLoginedState } from "@/recoil/recoil";
import type { RadioChangeEvent } from "antd";
import { REQUEST_STATUS } from "@/datas/data/data";
import { useRouter } from "next/router";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const RequestCheckPage = ({ adminRequestId }: { adminRequestId?: string }) => {
  const router = useRouter();
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

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(data?.status as string);
  }, [data]);

  const onChange = (e: RadioChangeEvent) => {
    if (adminRequestId) {
      const data = { status: e.target.value, requestId: adminRequestId };
      updateAdminRequest(data)
        .then(() => {
          alert("성공적으로 변경되었습니다.");
          router.push("/admin").then(() => router.reload());
        })
        .catch(() => alert("잠시 후에 다시 시도해주세요."));
    }
  };
  return (
    <>
      {data ? (
        <>
          {isAdminLogined && (
            <AdminBox>
              <Radio.Group onChange={onChange} value={value}>
                {REQUEST_STATUS.map((data) => (
                  <Radio key={data} value={data}>
                    {data}
                  </Radio>
                ))}
              </Radio.Group>
            </AdminBox>
          )}
          <CheckBox>
            <Descriptions bordered title="견적신청조회">
              {FORM_ITEMS.map((item) => (
                <Descriptions.Item key={item.name} label={item.name}>
                  {data[item.id] ? data[item.id] : "정보없음"}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </CheckBox>
        </>
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

const AdminBox = styled.div``;

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
