import { DatePicker, Space } from "antd";
import { useState } from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";

const Calendar = () => {
  const [date, setDate] = useState<string | null>(null);
  const handleChange = (value: Dayjs | null) => {
    value && setDate(value.locale("ko").format("YYYY-MM-DD h:mm A"));
  };
  return (
    <Space>
      <DatePicker onChange={handleChange} />
    </Space>
  );
};

export default Calendar;
