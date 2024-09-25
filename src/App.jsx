import React, { useState } from "react";
import './app.css'
import DatePickerCompo from "./Components/DatePickerCompo";

const App = () => {
  const [dates, setDates] = useState([]);

  const handleDatesChange = (newDates) => {
    setDates(newDates);
  };

  return (
    <div>
      <h1 className="text-xl m-2">Recurring Date Picker</h1>
      <DatePickerCompo onDatesChange={handleDatesChange} />

      <div>
        <h3>Selected Dates:</h3>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;