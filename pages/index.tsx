import Head from "next/head";
import { Button, DatePicker, Space } from "antd";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function Home() {
  const [date, setDate] = useState<Dayjs | null>(null);
  const handleChange = (value: Dayjs | null) => {
    setDate(value);
    console.log(date?.format("YYYY-MM-DD"));
  };
  return (
    <>
      <Head>
        <title>모두시스템</title>
      </Head>
      <main>
        <nav></nav>
        <div>
          <Space>
            <DatePicker onChange={handleChange} />
            <Button type="primary">Primary Button</Button>
          </Space>
        </div>
      </main>
    </>
  );
}
