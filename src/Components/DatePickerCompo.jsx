import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const recurrenceOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const DatePickerCompo = ({ onDatesChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [recurrence, setRecurrence] = useState("daily");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    const dates = generateRecurringDates(date, recurrence);
    onDatesChange(dates);

  };

  const handleRecurrenceChange = (selectedOption) => {
    setRecurrence(selectedOption.value);
    const dates = generateRecurringDates(selectedDate, selectedOption.value);
    onDatesChange(dates);
  };

  // to format a date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateRecurringDates = (startDate, recurrence) => {
    const dates = [formatDate(startDate)];
    let currentDate = new Date(startDate);


    switch (recurrence) {
      case "daily":
        for (let i = 1; i < 7; i++) {
          currentDate.setDate(currentDate.getDate() + 1);
          dates.push(formatDate(new Date(currentDate)));
        }
        break;

      case "weekly":
        for (let i = 1; i < 4; i++) {
          currentDate.setDate(currentDate.getDate() + 7);
          dates.push(formatDate(new Date(currentDate)));
        }
        break;

      case "monthly":
        for (let i = 1; i < 12; i++) {
          currentDate.setMonth(currentDate.getMonth() + 1);
          dates.push(formatDate(new Date(currentDate)));
        }
        break;

      case "yearly":
        for (let i = 1; i < 5; i++) {
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          dates.push(formatDate(new Date(currentDate)));
        }
        break;

      default:
        break;
    }

    return dates;
  };

  return (
    <div className="max-w-md mx-auto mb-4 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          
        />
      </div>

      <div className="recurrence-selector">
        <label className="block text-gray-600 mb-2">Recurrence</label>
        <Select
          options={recurrenceOptions}
          onChange={handleRecurrenceChange}
          isSearchable={false}
          defaultValue={recurrenceOptions[0]} 
          className="w-full "
        />
      </div>
    </div>
  );
};

export default DatePickerCompo;