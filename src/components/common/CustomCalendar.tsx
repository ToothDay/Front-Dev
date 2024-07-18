"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/CustomCalendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type CustomCalendarProps = {
  value: Value;
  onChange: (value: Value) => void;
};

const CustomCalendar = ({ value, onChange }: CustomCalendarProps) => {
  return (
    <Calendar
      onChange={onChange}
      value={value}
      locale="ko-KR"
      formatDay={(locale, date) =>
        date.toLocaleString("en", { day: "numeric" })
      }
      calendarType="gregory"
      showNeighboringMonth={false}
      next2Label={null}
      prev2Label={null}
      minDetail="year"
    />
  );
};

export default CustomCalendar;
