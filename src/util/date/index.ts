import "dayjs/locale/ko";
import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).locale("ko").format("YYYY-MM-DD A h:mm");
};
