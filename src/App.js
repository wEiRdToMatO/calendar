import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    
    <div className="container">
      <header><h1>Учебный календарь</h1></header>
      <div className="sidenav">

      </div>
      <div className="calendar-container">
        <p>Выбранная дата: {date.toLocaleDateString()}</p>
          <Calendar
            onChange={onChange}
            value={date}
          />
      </div>  
    </div>
  );
}

export default App;