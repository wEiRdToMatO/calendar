import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h1>Учебный календарь</h1>
      <Calendar
        onChange={onChange}
        value={date}
      />
      <p>Выбранная дата: {date.toLocaleDateString()}</p>
    </div>
  );
}

export default App;