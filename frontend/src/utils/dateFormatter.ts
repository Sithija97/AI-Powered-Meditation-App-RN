import dayjs from "dayjs";
import "dayjs/locale/en";

export const formatDate = (date: string) => {
  const dateObject = dayjs(date);
  const formattedDate = dateObject.format("DD/MM/YYYY");
  return formattedDate;
};
