import dayjs from "dayjs";
import "dayjs/locale/ko";

export const formatDate = (date: string) => {
  return dayjs(date).locale("ko").format("YYYY-MM-DD A h:mm");
};
