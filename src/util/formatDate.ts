import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatKoreaDate = (date: Date): string => {
  return format(date, "yyyy년 MM월 dd일 EEEE", { locale: ko });
};

export const formatIsoDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
