import ReactDatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker(props: DatePickerProps) {
  return (
    <ReactDatePicker
      {...props}
      className={`p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
      calendarClassName="custom-datepicker"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
}
