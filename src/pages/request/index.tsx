import { useState } from "react";
import styled from "styled-components";
import { Button, DatePicker, Form, Input, Result, Space } from "antd";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import DaumPostcodeEmbed from "react-daum-postcode";
import { KakaoAdress, FormItem, RequestForm } from "@/types";
import { postRequest } from "@/util/api";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useRouterLoading from "@/hooks/useRouterLoading";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const { TextArea } = Input;

const RequestPage = () => {
  const { onRouterLoading, offRouterLoading } = useRouterLoading();
  //날짜 추출
  const [date, setDate] = useState<string | null>(null);
  const handleChange = (value: Dayjs | null) => {
    value && setDate(value.locale("ko").format("YYYY-MM-DD"));
  };

  //주소 추출
  const [address, setAddress] = useState<KakaoAdress>({
    address: "",
    zonecode: "",
  });
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const handle = {
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },
    selectAddress: (data: KakaoAdress) => {
      const { address, zonecode } = data;
      setAddress({ address, zonecode });
      setOpenPostcode(false);
    },
  };

  //폼 제출 확인
  const [success, setSuccess] = useState(false);
  //폼 신청 후, 신청 아이디
  const [formId, setFormId] = useState("");

  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: FormItem) => {
    onRouterLoading();
    const id = uuidv4();
    const data: RequestForm = {
      ...address,
      ...values,
      date: date ? date : "",
      id,
      status: "처리 전",
    };
    postRequest(data)
      .then((res: string) => {
        setSuccess(true);
        setFormId(res);
        offRouterLoading();
      })
      .catch(() => {
        offRouterLoading();
        alert("잠시 후에 다시 시도해주세요.");
      });
  };
  return (
    <Box>
      {!success ? (
        <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="회사명/성함"
            rules={[
              {
                required: true,
                message: "회사명/성함을 입력해주세요.",
              },
            ]}
          >
            <Input maxLength={15} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="연락처"
            rules={[
              {
                required: true,
                message: "연락처를 입력해주세요.",
              },
            ]}
          >
            <Input maxLength={11} />
          </Form.Item>
          <Form.Item label="주소">
            {address.address === "" && (
              <Button onClick={handle.clickButton}>
                {openPostcode ? "취소" : "찾기"}
              </Button>
            )}
            {openPostcode && address.address === "" && (
              <DaumPostcodeEmbed
                className="daumPostCode"
                onComplete={handle.selectAddress}
                autoClose={false}
              />
            )}
            {address.address !== "" && (
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  style={{ width: "20%" }}
                  disabled
                  defaultValue={address.zonecode}
                />
                <Input
                  style={{ width: "80%" }}
                  disabled
                  defaultValue={address.address}
                />
              </Space.Compact>
            )}
          </Form.Item>
          <Form.Item
            name="detailAddress"
            label="상세주소"
            rules={[
              {
                required: true,
                message: "상세주소를 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="방문 희망일">
            <DatePicker placeholder="날짜 선택" onChange={handleChange} />
          </Form.Item>
          <Form.Item name="requirement" label="요구사항">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="btn-box">
            <Button type="primary" htmlType="submit">
              신청하기
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Result
          status="success"
          title="신청해주셔서 감사합니다."
          subTitle={
            <div>
              고객님의 신청번호는{" "}
              <span className="result-form-id">{formId}</span>입니다.
            </div>
          }
          extra={[
            <Button type="primary" key="console">
              <Link onClick={onRouterLoading} href={"/request/check"}>
                신청확인
              </Link>
            </Button>,
          ]}
        />
      )}
    </Box>
  );
};
export default RequestPage;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px 0px;
  .result-form-id {
    font-weight: bold;
  }
  .ant-row {
    display: flex;
    justify-content: center;
  }
  textarea {
    resize: none;
  }
  form {
    width: 100%;
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
  .daumPostCode {
    z-index: 2;
  }
  @media (max-width: 576px) {
    width: 90%;
  }
`;
