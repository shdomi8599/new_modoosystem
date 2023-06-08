import { useState } from "react";
import styled from "styled-components";
import { Button, DatePicker, Form, Input, Space } from "antd";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import DaumPostcodeEmbed from "react-daum-postcode";
import { KakaoAdress, FormItem, RequestForm } from "@/types";
import { postRequest } from "@/util/api";
import { useRouter } from "next/router";
import Link from "next/link";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const RequestPage = () => {
  const router = useRouter();
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
    const data: RequestForm = {
      ...address,
      ...values,
      date: date ? date : "",
    };
    postRequest(data)
      .then((res: string) => {
        setSuccess(true);
        setFormId(res);
      })
      .catch(() => alert("잠시 후에 다시 시도해주세요."));
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
            <Input />
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
        <div className="success-message">
          <div>신청해주셔서 감사합니다.</div>
          <div>고객님의 신청번호는 {formId}입니다.</div>
          <div>신청번호를 통해 조회하실 수 있습니다.</div>
          <Button>
            <Link href={"/request/check"}>신청확인</Link>
          </Button>
        </div>
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
  .success-message {
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
  }
  .ant-row {
    display: flex;
    justify-content: center;
  }
  .upload-label {
    margin-top: 8px;
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
