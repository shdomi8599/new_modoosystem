import { useState } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, Space } from "antd";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import koKR from "antd/es/date-picker/locale/ko_KR";
import DaumPostcodeEmbed from "react-daum-postcode";
import { KakaoAdress, FormItem } from "@/types";
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
  //날짜 추출
  const [date, setDate] = useState<string | null>(null);
  const handleChange = (value: Dayjs | null) => {
    value && setDate(value.locale("ko").format("YYYY-MM-DD h:mm A"));
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

  //폼 데이터 관리
  const [form] = Form.useForm();
  const onFinish = (values: FormItem) => {
    console.log(values);
  };
  return (
    <Box>
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
          name="detail-address"
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
          <DatePicker
            locale={koKR}
            placeholder="날짜 선택"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item name="requirement" label="요구사항">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="참고자료"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div className="upload-label">파일 추가</div>
            </div>
          </Upload>
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
export default RequestPage;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px 0px;
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
